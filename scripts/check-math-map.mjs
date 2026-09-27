import assert from "node:assert/strict";

import { createJiti } from "jiti";
import katex from "katex";

const jiti = createJiti(import.meta.url);
const {
  mathMapDomains,
  mathMapNodes,
  mathMapEdges,
  mathMapPaths,
  mathMapSources,
} = await jiti.import("../src/data/math-map.ts");
const {
  layoutGraph,
  createGraphSimulation,
  snapshotSimulation,
  fitCamera,
  visibleLabels,
  labelBox,
  nodeTier,
  GRAPH_WIDTH,
  GRAPH_HEIGHT,
} = await jiti.import("../src/components/math-map/layout.ts");
const ids = new Set(mathMapNodes.map((node) => node.id));
const domains = new Set(mathMapDomains.map((domain) => domain.id));
const sources = new Set(mathMapSources.map((source) => source.id));
assert.equal(ids.size, mathMapNodes.length, "Concept ids must be unique");
assert.equal(domains.size, mathMapDomains.length);
let formulas = 0;
for (const node of mathMapNodes) {
  assert(domains.has(node.domain), `Unknown domain: ${node.id}`);
  for (const field of ["label", "blurb", "insight"]) {
    for (const locale of ["zh", "en"])
      assert(node[field][locale]?.trim(), `${node.id}: ${field}.${locale}`);
  }
  for (const formula of [node.formula, node.example].filter(Boolean)) {
    katex.renderToString(formula, {
      throwOnError: true,
      strict: "error",
      trust: false,
    });
    formulas++;
  }
  for (const id of node.sources ?? [])
    assert(sources.has(id), `Unknown reference: ${id}`);
  assert(
    mathMapEdges.some(
      (edge) => edge.source === node.id || edge.target === node.id,
    ),
    `Isolated concept: ${node.id}`,
  );
}
for (const domain of mathMapDomains) {
  assert(
    mathMapNodes.some((node) => node.domain === domain.id),
    `Empty subject: ${domain.id}`,
  );
  for (const id of domain.sources) assert(sources.has(id));
}
const edgeIds = new Set();
for (const edge of mathMapEdges) {
  assert(
    ids.has(edge.source) && ids.has(edge.target),
    `Dangling edge: ${JSON.stringify(edge)}`,
  );
  assert.notEqual(edge.source, edge.target);
  assert(["prereq", "related"].includes(edge.kind));
  const key = [edge.source, edge.target].sort().join("|");
  assert(!edgeIds.has(key), `Duplicate or contradictory relation: ${key}`);
  edgeIds.add(key);
}
// Suggested prerequisite arrows must not create circular study dependencies.
const visited = new Set(),
  visiting = new Set();
function visit(id) {
  assert(!visiting.has(id), `Prerequisite cycle at ${id}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const edge of mathMapEdges.filter(
    (e) => e.kind === "prereq" && e.source === id,
  ))
    visit(edge.target);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) visit(id);
for (const route of mathMapPaths) {
  assert.equal(new Set(route.nodes).size, route.nodes.length);
  for (const id of route.nodes)
    assert(ids.has(id), `Unknown route concept: ${id}`);
}
for (const locale of ["zh", "en"]) {
  const layout = layoutGraph(mathMapNodes, mathMapEdges, locale);
  assert.deepEqual(
    layout,
    layoutGraph(mathMapNodes, mathMapEdges, locale),
    "SSR layout must be deterministic",
  );
  const fitted = fitCamera(layout);
  for (const p of layout) {
    assert(Number.isFinite(p.x) && Number.isFinite(p.y));
    // The camera, not a hard wall in the force simulation, contains the map.
    const left = (p.x - p.width / 2) * fitted.zoom + fitted.x;
    const right = (p.x + p.width / 2) * fitted.zoom + fitted.x;
    const top = (p.y - 17) * fitted.zoom + fitted.y;
    const bottom = (p.y + 36) * fitted.zoom + fitted.y;
    assert(left > 0 && right < GRAPH_WIDTH, `Horizontal clipping: ${p.id}`);
    assert(top > 0 && bottom < GRAPH_HEIGHT, `Vertical clipping: ${p.id}`);
  }
  const overviewLabels = visibleLabels(
    layout,
    new Set(layout.filter((p) => nodeTier(p) === "hub").map((p) => p.id)),
    null,
  );
  assert(
    overviewLabels.size >= 5 && overviewLabels.size < layout.length / 2,
    "Overview should have a small set of readable landmarks",
  );
  const radii = layout.map((p) => p.radius);
  assert(
    Math.max(...radii) / Math.min(...radii) > 4,
    "The map needs a visible node hierarchy",
  );
  const labels = layout.filter((p) => overviewLabels.has(p.id)).map(labelBox);
  for (let i = 0; i < labels.length; i++)
    for (let j = i + 1; j < labels.length; j++) {
      const a = labels[i],
        b = labels[j];
      assert(
        a.right <= b.left ||
          b.right <= a.left ||
          a.bottom <= b.top ||
          b.bottom <= a.top,
        `Overlapping overview labels (${locale})`,
      );
    }
  for (const p of layout) {
    assert(
      visibleLabels(layout, ids, p.id).has(p.id),
      "The focused concept's label must always be visible",
    );
  }
  for (const subset of [layout, [layout[0]], []]) {
    const camera = fitCamera(subset);
    assert(Object.values(camera).every(Number.isFinite));
    assert(camera.zoom > 0);
  }
  const immutableLayout = structuredClone(layout);
  const immutableEdges = structuredClone(mathMapEdges);
  const simulation = createGraphSimulation(layout, mathMapEdges);
  const dragged = simulation.nodes()[0];
  // Drag beyond the old hard wall: the pin follows the pointer and the rest
  // of the network reacts through its links instead of remaining frozen.
  dragged.fx = -200;
  dragged.fy = 150;
  simulation.alphaTarget(0.12).tick(35);
  assert.equal(dragged.x, -200);
  assert.equal(dragged.y, 150);
  assert(
    simulation
      .nodes()
      .slice(1)
      .some(
        (p, i) => Math.hypot(p.x - layout[i + 1].x, p.y - layout[i + 1].y) > 1,
      ),
    "Dragging should move other nodes",
  );
  dragged.fx = null;
  dragged.fy = null;
  simulation.alpha(0.25).alphaTarget(0).tick(350);
  assert(
    simulation.alpha() < simulation.alphaMin(),
    "Released graph must cool to rest",
  );
  assert(
    snapshotSimulation(simulation).every(
      (p) => Number.isFinite(p.x) && Number.isFinite(p.y),
    ),
  );
  assert.deepEqual(
    layout,
    immutableLayout,
    "Simulation must not mutate render state",
  );
  assert.deepEqual(
    mathMapEdges,
    immutableEdges,
    "Simulation must not mutate source relations",
  );
}
console.log(
  `Math map verified: ${ids.size} bilingual concepts, ${mathMapEdges.length} relations, ${formulas} formulas, ${mathMapPaths.length} routes, deterministic layouts and drag physics.`,
);

// Trackpad zoom must cancel browser zoom only inside the diagram, preserve the
// world point under the fingers, and release every listener on unmount.
const { bindGraphGestures, zoomAt, MIN_ZOOM, MAX_ZOOM } = await jiti.import(
  "../src/components/math-map/gestures.ts",
);
const target = new EventTarget();
const surface = {
  addEventListener: target.addEventListener.bind(target),
  removeEventListener: target.removeEventListener.bind(target),
  getBoundingClientRect: () => ({
    left: 20,
    top: 10,
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT,
  }),
};
let camera = { x: 90, y: -30, zoom: 0.8 };
const initial = { ...camera };
const dispose = bindGraphGestures(surface, (update) => {
  camera = update(camera);
});
function emit(type, values) {
  const event = new Event(type, { cancelable: true, bubbles: true });
  Object.assign(event, values);
  target.dispatchEvent(event);
  return event;
}
const input = {
  clientX: 560,
  clientY: 440,
  deltaY: -20,
  deltaMode: 0,
  ctrlKey: false,
  metaKey: false,
};
assert.equal(
  emit("wheel", input).defaultPrevented,
  false,
  "Normal scrolling must pass through",
);
assert.deepEqual(camera, initial);
assert.equal(emit("wheel", { ...input, ctrlKey: true }).defaultPrevented, true);
assert(camera.zoom > initial.zoom);
for (const [axis, anchor] of [
  ["x", 540],
  ["y", 430],
])
  assert(
    Math.abs(
      (anchor - camera[axis]) / camera.zoom -
        (anchor - initial[axis]) / initial.zoom,
    ) < 1e-9,
    "Pinch must preserve the point under the fingers",
  );
assert.equal(zoomAt(initial, 100, { x: 0, y: 0 }).zoom, MAX_ZOOM);
assert.equal(zoomAt(initial, 0.0001, { x: 0, y: 0 }).zoom, MIN_ZOOM);
emit("gesturestart", { scale: 1 });
const safariInitial = { ...camera };
emit("gesturechange", { scale: 1.5, clientX: 560, clientY: 440 });
assert(Math.abs(camera.zoom - safariInitial.zoom * 1.5) < 1e-9);
const safariZoom = camera.zoom;
emit("wheel", { ...input, ctrlKey: true });
assert.equal(
  camera.zoom,
  safariZoom,
  "Do not apply Safari gesture and wheel twice",
);
emit("gestureend", {});
dispose();
assert.equal(
  emit("wheel", { ...input, ctrlKey: true }).defaultPrevented,
  false,
  "Unmount must release the browser zoom listener",
);
console.log(
  "Graph gestures verified: scoped cancellation, pointer anchor, limits, Safari and cleanup.",
);

// A quick pass must leave the current selection alone; sustained intent commits
// once. Exercise cancellation races, keyboard/pointer target changes and zoom.
const { createDwellFocus, DWELL_MS } = await jiti.import(
  "../src/components/math-map/dwell.ts",
);
let now = 0;
const tasks = new Set();
const schedule = (callback, delay) => {
  const task = { callback, due: now + delay };
  tasks.add(task);
  return () => tasks.delete(task);
};
function advance(ms) {
  now += ms;
  for (const task of [...tasks]) {
    if (task.due > now) continue;
    tasks.delete(task);
    task.callback();
  }
}
const committed = [];
let waiting = null;
const dwell = createDwellFocus(
  (id) => committed.push(id),
  (id) => {
    waiting = id;
  },
  schedule,
);
dwell.enter("nabla");
advance(DWELL_MS - 1);
assert.deepEqual(committed, [], "Passing a node must not change focus early");
dwell.cancel();
advance(1);
assert.deepEqual(
  committed,
  [],
  "Leaving before the deadline cancels selection",
);
assert.equal(waiting, null);
dwell.enter("gradient");
advance(300);
dwell.enter("gradient");
advance(DWELL_MS - 300);
assert.deepEqual(
  committed,
  ["gradient"],
  "Movement within one node must not restart its dwell timer",
);
assert.equal(waiting, null);
dwell.cancel();
assert.deepEqual(
  committed,
  ["gradient"],
  "Leaving a committed node must keep its focus",
);
dwell.enter("nabla");
const stale = [...tasks][0].callback;
dwell.enter("logdet");
stale();
assert.deepEqual(
  committed,
  ["gradient"],
  "An obsolete timer cannot steal the new target",
);
advance(DWELL_MS);
assert.deepEqual(committed, ["gradient", "logdet"]);
const unbindDwellZoom = bindGraphGestures(surface, () => {}, dwell.cancel);
dwell.enter("inverse");
emit("wheel", { ...input, ctrlKey: true });
advance(DWELL_MS);
assert.deepEqual(
  committed,
  ["gradient", "logdet"],
  "Zooming cancels pending focus",
);
unbindDwellZoom();
dwell.enter("inverse");
const late = [...tasks][0].callback;
dwell.dispose();
late();
advance(DWELL_MS);
assert.deepEqual(
  committed,
  ["gradient", "logdet"],
  "Unmount cannot commit a pending selection",
);
console.log(
  "Dwell focus verified: delay, quick pass, persistence, target changes, zoom cancellation and cleanup.",
);
