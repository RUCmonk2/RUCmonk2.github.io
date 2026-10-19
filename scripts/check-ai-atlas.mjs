import assert from "node:assert/strict";

import { createJiti } from "jiti";
import katex from "katex";
const jiti = createJiti(import.meta.url);
const { aiNodes, aiDomains, aiRoutes, prerequisitesOf } = await jiti.import(
  "../src/data/ai-atlas/index.ts",
);
assert.equal(aiDomains.length, 14);
assert.equal(aiNodes.length, 194);
assert.equal(aiRoutes.length, 6);
const ids = new Set(aiNodes.map((n) => n.id));
assert.equal(ids.size, aiNodes.length, "Duplicate concept IDs");
const domains = new Set(aiDomains.map((d) => d.id));
let formulas = 0,
  edges = 0;
for (const node of aiNodes) {
  assert(domains.has(node.domain), node.id);
  assert(["foundation", "core", "research"].includes(node.level), node.id);
  assert(["shared", "specialist"].includes(node.scope), node.id);
  for (const key of ["summary", "why", "example", "pitfall"])
    assert(node[key]?.trim().length > 12, `${node.id}: ${key} too short`);
  assert(node.title.zh && node.title.en, node.id);
  assert.equal(node.mastery.length, 2, node.id);
  assert(
    node.mastery.every((x) => x.length > 8),
    `${node.id}: mastery`,
  );
  assert(node.sources.length > 0, node.id);
  for (const source of node.sources) {
    assert(source.title, node.id);
    assert.equal(
      new URL(source.url).protocol,
      "https:",
      `${node.id}: source URL`,
    );
  }
  for (const key of ["prerequisites", "related"]) {
    const refs = node[key] ?? [];
    assert.equal(
      new Set(refs).size,
      refs.length,
      `${node.id}: duplicate ${key}`,
    );
    for (const ref of refs) {
      assert(ids.has(ref), `${node.id}: unknown ${ref}`);
      assert.notEqual(ref, node.id, `${node.id}: self reference`);
    }
  }
  edges += node.prerequisites.length;
  if (node.formula) {
    katex.renderToString(node.formula, { throwOnError: true, strict: "error" });
    formulas++;
  }
}
const visiting = new Set(),
  visited = new Set();
function visit(id, path = []) {
  assert(!visiting.has(id), `Prerequisite cycle: ${[...path, id].join(" → ")}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const pre of aiNodes.find((n) => n.id === id).prerequisites)
    visit(pre, [...path, id]);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) {
  visit(id);
  assert(!prerequisitesOf(id).includes(id));
}
for (const d of aiDomains)
  assert(
    aiNodes.filter((n) => n.domain === d.id).length >= 10,
    `${d.id}: coverage`,
  );
for (const r of aiRoutes) {
  assert.equal(new Set(r.nodes).size, r.nodes.length, r.id);
  for (const id of r.nodes) assert(ids.has(id), `${r.id}: unknown ${id}`);
}
const { conceptLayout, connector } = await jiti.import(
  "../src/components/ai-atlas/layout.ts",
);
for (const d of aiDomains) {
  const nodes = aiNodes.filter((n) => n.domain === d.id),
    points = conceptLayout(nodes);
  assert.equal(points.length, nodes.length);
  for (let i = 0; i < points.length; i++)
    for (let k = i + 1; k < points.length; k++)
      assert(
        Math.hypot(points[i].x - points[k].x, points[i].y - points[k].y) >= 200,
        `${d.id}: crowded nodes`,
      );
}
// Orthogonal prerequisite edges must not enter unrelated concept cards.
for (const domain of aiDomains) {
  const nodes = aiNodes.filter((n) => n.domain === domain.id),
    points = conceptLayout(nodes),
    byId = new Map(points.map((p) => [p.id, p]));
  for (const target of nodes)
    for (const source of target.prerequisites.filter((id) => byId.has(id))) {
      const path = connector(byId.get(source), byId.get(target.id), 0);
      const vertices = [...path.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)].map(
        (m) => ({ x: Number(m[1]), y: Number(m[2]) }),
      );
      for (let i = 1; i < vertices.length; i++)
        for (const obstacle of points.filter(
          (p) => p.id !== source && p.id !== target.id,
        )) {
          const a = vertices[i - 1],
            b = vertices[i];
          const overlaps =
            Math.min(a.x, b.x) < obstacle.x + 130 &&
            Math.max(a.x, b.x) > obstacle.x - 130 &&
            Math.min(a.y, b.y) < obstacle.y + 55 &&
            Math.max(a.y, b.y) > obstacle.y - 55;
          assert(!overlaps, `${source} → ${target.id} crosses ${obstacle.id}`);
        }
    }
}
console.log(
  `AI atlas verified: ${aiNodes.length} concepts, ${aiDomains.length} domains, ${edges} acyclic prerequisites, ${formulas} formulas, ${aiRoutes.length} study paths.`,
);
