import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const graph = await jiti.import("../src/lib/math-lab/graph-algorithms.ts");
const matrix = await jiti.import("../src/lib/math-lab/matrix-algorithms.ts");
const ids = (edges) => edges.map((e) => e.id).sort();
const weight = (edges) => edges.reduce((sum, e) => sum + e.w, 0);
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);
const matrixEqual = (a, b) => {
  assert.equal(a.length, b.length);
  a.forEach((row, i) => {
    assert.equal(row.length, b[i].length);
    row.forEach((x, j) => close(x, b[i][j]));
  });
};

const expected = ids(graph.kruskal(graph.classicGraph).kept);
assert.equal(weight(graph.kruskal(graph.classicGraph).kept), 17);
assert.deepEqual(ids(graph.prim(graph.classicGraph).kept), expected);
assert.deepEqual(ids(graph.boruvka(graph.classicGraph).kept), expected);
const kkt = graph.kargerKleinTarjan(graph.samplingGraph, 1);
assert.deepEqual(ids(kkt.kept), ids(graph.kruskal(graph.samplingGraph).kept));
assert.ok(
  kkt.steps.some(
    (step) =>
      step.title.en === "Delete an F-heavy edge" && step.active.includes("CI"),
  ),
);
for (let seed = 1; seed <= 60; seed++) {
  const nodes = Array.from({ length: (seed % 11) + 3 }, (_, i) => ({
    id: `v${i}`,
    x: 0,
    y: 0,
  }));
  let state = seed;
  const next = () => (state = (Math.imul(state, 1664525) + 1013904223) >>> 0);
  const edges = nodes.flatMap((a, i) =>
    nodes
      .slice(i + 1)
      .flatMap((b) =>
        next() % 4 === 0
          ? []
          : [{ id: a.id + b.id, u: a.id, v: b.id, w: (next() % 13) - 6 }],
      ),
  );
  const sample = { nodes, edges };
  const baseline = ids(graph.kruskal(sample).kept);
  assert.deepEqual(ids(graph.kargerKleinTarjan(sample, seed).kept), baseline);
  assert.deepEqual(ids(graph.boruvka(sample).kept), baseline);
}
const plan = graph.topological(graph.dagGraph);
assert.equal(plan.cyclic, false);
for (const e of graph.dagGraph.edges)
  assert.ok(plan.order.indexOf(e.u) < plan.order.indexOf(e.v));
assert.equal(graph.topological(graph.sccGraph).cyclic, true);
assert.deepEqual(graph.dagDistances(graph.dagGraph, "A").dist, {
  A: 0,
  B: 4,
  C: 2,
  D: 1,
  E: 5,
  F: 3,
});
assert.deepEqual(
  graph
    .tarjan(graph.sccGraph)
    .groups.map((g) => g.join(""))
    .sort(),
  ["ABC", "DE", "FG", "H"],
);
function reachable(tree, root, count) {
  const seen = new Set([root]);
  for (let i = 0; i < count; i++)
    for (const e of tree) if (seen.has(e.u)) seen.add(e.v);
  return seen.size === count;
}
function exhaustiveArborescence(g, root) {
  const options = g.nodes
    .filter((v) => v.id !== root)
    .map((v) => g.edges.filter((e) => e.v === v.id && e.u !== e.v));
  let best = Infinity;
  function choose(i, edges) {
    if (i === options.length) {
      if (reachable(edges, root, g.nodes.length))
        best = Math.min(best, weight(edges));
      return;
    }
    for (const e of options[i]) choose(i + 1, [...edges, e]);
  }
  choose(0, []);
  return best;
}
const tree = graph.arborescence(graph.directedTreeGraph, "R").kept;
assert.ok(tree);
assert.equal(weight(tree), 12);
assert.equal(
  weight(tree),
  exhaustiveArborescence(graph.directedTreeGraph, "R"),
);
for (const fixture of [
  graph.directedTreeGraph,
  graph.sccGraph,
  graph.dagGraph,
]) {
  for (const { id } of fixture.nodes) {
    const tree = graph.arborescence(fixture, id).kept;
    const best = exhaustiveArborescence(fixture, id);
    if (!Number.isFinite(best)) assert.equal(tree, null);
    else {
      assert.ok(tree);
      assert.equal(weight(tree), best);
      assert.ok(reachable(tree, id, fixture.nodes.length));
    }
  }
}

matrixEqual(
  matrix.multiply(matrix.multiplyExample.a, matrix.multiplyExample.b),
  [
    [-7, 19],
    [10, 5],
  ],
);
const { p, l, u } = matrix.pivotedLU(matrix.luExample);
matrixEqual(matrix.multiply(p, matrix.luExample), matrix.multiply(l, u));
assert.equal(p[0][1], 1);
assert.equal(p[1][2], 1);
close(l[1][0], 0.5);
matrixEqual(matrix.svdSteps(2).reconstructed, matrix.svdExample);
close(matrix.svdSteps(1).error, Math.sqrt(2));
const zero = matrix.twoColumnSVD([
  [0, 0],
  [0, 0],
  [0, 0],
]);
assert.deepEqual(zero.singular, [0, 0]);
matrixEqual(matrix.multiply(matrix.transpose(zero.u), zero.u), [
  [1, 0],
  [0, 1],
]);
console.log(
  "Algorithm lab examples, seeded minimum forests, rooted tree optima, and matrix reconstructions verified.",
);
