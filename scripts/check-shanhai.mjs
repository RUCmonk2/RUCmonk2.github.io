import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  shanhaiNodes: nodes,
  shanhaiEdges: edges,
  shanhaiRoutes: routes,
} = await jiti.import("../src/data/shanhai.ts");
const { createShanhaiPhysics } = await jiti.import(
  "../src/components/shanhai/layout.ts",
);
const ids = new Set(nodes.map((node) => node.id));
assert.equal(
  ids.size,
  nodes.length,
  "Node IDs must be unique for shared links",
);
for (const node of nodes) {
  assert.match(node.id, /^[a-z][a-z0-9-]*$/);
  for (const field of [
    "name",
    "pinyin",
    "chapter",
    "quote",
    "translation",
    "reading",
  ])
    assert(node[field]?.trim(), `${node.id} lacks ${field}`);
  const source = new URL(node.sourceUrl);
  assert.equal(source.protocol, "https:");
  assert.equal(source.hostname, "zh.wikisource.org");
  assert(
    node.x >= 50 && node.x <= 1050 && node.y >= 50 && node.y <= 690,
    `${node.id} lies outside the map`,
  );
  assert(
    edges.some((edge) => edge.source === node.id || edge.target === node.id),
    `${node.id} has no reading connection`,
  );
}
const relationKeys = new Set();
for (const edge of edges) {
  assert(
    ids.has(edge.source) && ids.has(edge.target),
    `Dangling edge: ${JSON.stringify(edge)}`,
  );
  assert.notEqual(edge.source, edge.target);
  assert(edge.label.trim());
  const key = `${edge.source}:${edge.target}:${edge.label}`;
  assert(!relationKeys.has(key), `Repeated relation: ${key}`);
  relationKeys.add(key);
}
for (const route of routes) {
  assert(route.title && route.description && route.nodes.length > 1);
  assert.equal(new Set(route.nodes).size, route.nodes.length);
  for (const id of route.nodes)
    assert(ids.has(id), `${route.id} links to missing entry ${id}`);
}
assert(nodes.find((node) => node.id === "jiuweihu")?.reading.includes("后世"));
assert(nodes.find((node) => node.id === "niuyang")?.reading.includes("柢山"));
assert(edges.filter((edge) => edge.label.includes("对读")).length > 0);

// A shareable atlas must open consistently, keep its text/data intact, and leave
// room to distinguish neighboring entries. These check the resulting map rather
// than the force engine's particular strength or iteration settings.
const sourceBeforeLayout = JSON.stringify({ nodes, edges });
const firstLayout = createShanhaiPhysics(nodes, edges);
const secondLayout = createShanhaiPhysics(nodes, edges);
try {
  assert.deepEqual(
    firstLayout.initial,
    secondLayout.initial,
    "The same atlas must have a deterministic initial layout",
  );
  assert.equal(
    JSON.stringify({ nodes, edges }),
    sourceBeforeLayout,
    "Layout simulation must not mutate source entries or relations",
  );
  assert.deepEqual(new Set(Object.keys(firstLayout.initial)), ids);
  for (const [index, node] of nodes.entries()) {
    const position = firstLayout.initial[node.id];
    assert(
      Number.isFinite(position.x) && Number.isFinite(position.y),
      `${node.id} has a non-finite layout position`,
    );
    const halfLabelWidth = (node.name.length * 21) / 2;
    assert(
      position.x >= halfLabelWidth &&
        position.x + halfLabelWidth <= 1100 &&
        position.y >= 28 &&
        position.y + 55 <= 740,
      `${node.id} or its reading label lies outside the initial map`,
    );
    for (const other of nodes.slice(index + 1)) {
      const otherPosition = firstLayout.initial[other.id];
      assert(
        Math.hypot(
          position.x - otherPosition.x,
          position.y - otherPosition.y,
        ) >= 70,
        `${node.id} and ${other.id} are too close to distinguish comfortably`,
      );
    }
  }
} finally {
  firstLayout.simulation.stop();
  secondLayout.simulation.stop();
}
console.log(
  `Shanhaijing: ${nodes.length} complete entries, ${edges.length} valid relations, ${routes.length} reading routes; deterministic layout, intact sources, visible labels, and node spacing verified.`,
);
