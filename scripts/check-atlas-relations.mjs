import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { atlasRelationsFor } = await jiti.import(
  "../src/components/math-map/relations.ts",
);
const { getSubjectAtlas } = await jiti.import(
  "../src/data/k12-subjects/atlas.ts",
);

const nodes = Object.freeze(
  ["foundation", "current", "next", "peer-a", "peer-b", "isolated"].map(
    (id) =>
      Object.freeze({
        id,
        domain: "test",
        label: { zh: id, en: id },
        blurb: { zh: id, en: id },
        formula: "",
        insight: { zh: id, en: id },
      }),
  ),
);
const edges = Object.freeze(
  [
    { source: "current", target: "next", kind: "prereq" },
    { source: "peer-a", target: "current", kind: "related" },
    { source: "foundation", target: "peer-a", kind: "prereq" },
    { source: "foundation", target: "current", kind: "prereq" },
    { source: "current", target: "peer-b", kind: "related" },
  ].map(Object.freeze),
);
function ids(groups) {
  return Object.fromEntries(
    Object.entries(groups).map(([kind, concepts]) => [
      kind,
      concepts.map((concept) => concept.id),
    ]),
  );
}

// A middle lesson must distinguish its incoming and outgoing prerequisites.
assert.deepEqual(ids(atlasRelationsFor("current", nodes, edges)), {
  before: ["foundation"],
  after: ["next"],
  related: ["peer-a", "peer-b"],
});
assert.deepEqual(ids(atlasRelationsFor("next", nodes, edges)), {
  before: ["current"],
  after: [],
  related: [],
});

// Reversing the storage order of an undirected edge cannot change the UI group.
const relatedReversed = edges.map((edge) =>
  edge.kind === "related"
    ? { ...edge, source: edge.target, target: edge.source }
    : edge,
);
assert.deepEqual(
  ids(atlasRelationsFor("current", nodes, relatedReversed)),
  ids(atlasRelationsFor("current", nodes, edges)),
);
for (const id of ["isolated", "missing"])
  assert.deepEqual(ids(atlasRelationsFor(id, nodes, edges)), {
    before: [],
    after: [],
    related: [],
  });
assert.deepEqual(
  ids(
    atlasRelationsFor("current", nodes, [
      { source: "current", target: "missing", kind: "prereq" },
      { source: "current", target: "current", kind: "related" },
    ]),
  ),
  { before: [], after: [], related: [] },
);

// Regression: work–energy is a foundation for mechanical-energy conservation,
// never a later topic that must first study conservation.
const physics = getSubjectAtlas("physics", "high");
const work = "high-conservation-1";
const conservation = "high-conservation-2";
assert(physics.nodes.some((node) => node.id === work));
assert(physics.nodes.some((node) => node.id === conservation));
const workRelations = ids(
  atlasRelationsFor(work, physics.nodes, physics.edges),
);
assert(
  workRelations.after.includes(conservation),
  "Mechanical-energy conservation belongs in Continue to for work–energy",
);
assert(
  !workRelations.before.includes(conservation),
  "Mechanical-energy conservation must not appear in Build on for work–energy",
);
const conservationRelations = ids(
  atlasRelationsFor(conservation, physics.nodes, physics.edges),
);
assert(conservationRelations.before.includes(work));
assert(!conservationRelations.after.includes(work));

console.log(
  "Atlas relations passed: prerequisite direction, symmetric related edges, and the physics work–energy regression.",
);
