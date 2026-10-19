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
const { aiKnowledgeAtlas } = await jiti.import(
  "../src/data/ai-atlas/knowledge-atlas.ts",
);
assert.equal(aiKnowledgeAtlas.nodes.length, aiNodes.length);
assert(ids.has(aiKnowledgeAtlas.defaultNode));
const sourceIds = new Set(aiKnowledgeAtlas.sources.map((source) => source.id));
for (const node of aiKnowledgeAtlas.nodes) {
  const original = aiNodes.find((item) => item.id === node.id);
  if (!node.formula)
    assert.notEqual(
      node.preview?.zh,
      node.blurb.zh,
      `${node.id}: duplicated preview`,
    );
  assert(node.shortLabel?.zh && node.shortLabel?.en, `${node.id}: map labels`);
  assert(
    node.inlineLesson?.beginner.includes(original.summary),
    `${node.id}: explanation missing`,
  );
  assert(
    node.inlineLesson?.beginner.includes(original.example),
    `${node.id}: example missing`,
  );
  assert(
    original.mastery.every((goal) => node.inlineLesson?.formal.includes(goal)),
    `${node.id}: mastery missing`,
  );
  assert(
    node.inlineLesson?.formal.includes(original.pitfall),
    `${node.id}: conditions missing`,
  );
  assert.equal(
    node.inlineLesson.intro.beginner.zh,
    original.summary,
    `${node.id}: preview is not concept-specific`,
  );
  assert(
    node.sources.every((id) => sourceIds.has(id)),
    `${node.id}: missing source`,
  );
}
const pairs = new Set();
for (const edge of aiKnowledgeAtlas.edges) {
  assert(ids.has(edge.source) && ids.has(edge.target));
  const pair = [edge.source, edge.target].sort().join(":");
  assert(!pairs.has(pair), `Repeated relationship: ${pair}`);
  pairs.add(pair);
}
assert.equal(
  aiKnowledgeAtlas.edges.filter((edge) => edge.kind === "prereq").length,
  edges,
);
for (const domain of aiDomains) {
  const center = aiKnowledgeAtlas.centers[domain.id];
  assert(
    Number.isFinite(center?.x) && Number.isFinite(center?.y),
    `${domain.id}: center`,
  );
}
const { layoutGraph, fitCamera, visibleLabels, nodeTier } = await jiti.import(
  "../src/components/math-map/layout.ts",
);
for (const locale of ["zh", "en"]) {
  const points = layoutGraph(
    aiKnowledgeAtlas.nodes,
    aiKnowledgeAtlas.edges,
    locale,
    aiKnowledgeAtlas.centers,
  );
  assert.equal(points.length, aiNodes.length);
  assert(points.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)));
  const camera = fitCamera(points);
  assert(camera.zoom > 0);
  const shown = visibleLabels(
    points.filter((p) => nodeTier(p) === "hub"),
    new Set(points.filter((p) => nodeTier(p) === "hub").map((p) => p.id)),
    null,
    1 / Math.min(1, camera.zoom),
  );
  assert(
    shown.size >= 6 && shown.size < 45,
    `${locale}: overview should reveal a readable selection of names`,
  );
  for (let i = 0; i < points.length; i++)
    for (let k = i + 1; k < points.length; k++) {
      const a = points[i],
        b = points[k];
      assert(
        Math.hypot(a.x - b.x, a.y - b.y) > a.radius + b.radius + 6,
        `${locale}: ink nodes overlap`,
      );
    }
}
console.log(
  `AI atlas verified: ${aiNodes.length} concepts, ${aiDomains.length} domains, ${edges} acyclic prerequisites, ${formulas} formulas, ${aiRoutes.length} study paths; ink-map labels, relations and complete inline notes verified.`,
);
