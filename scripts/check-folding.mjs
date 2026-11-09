import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { getGeometry, applyFold, boardsEqual, generatePuzzle, findHint } =
  await jiti.import("../src/lib/math-lab/folding.ts");

const started = performance.now();
const shapes = ["square", "rectangle", "triangle"];
const tolerance = 1e-7;
const samePoint = (a, b) => Math.hypot(a.x - b.x, a.y - b.y) < tolerance;
const area = (vertices) =>
  Math.abs(
    vertices.reduce((sum, point, i) => {
      const next = vertices[(i + 1) % vertices.length];
      return sum + point.x * next.y - next.x * point.y;
    }, 0) / 2,
  );

// Use a projection onto the line, independently of the engine's cell lookup.
function reflect(point, [a, b]) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy);
  return { x: 2 * (a.x + t * dx) - point.x, y: 2 * (a.y + t * dy) - point.y };
}

function side(point, [a, b]) {
  return (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
}

const hash = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const oldGeometryHashes = {
  square: "9a3bcf377c9428ea2c38a7e66662ba9510fbd2c28d13e7dfb7856e6b448d7ca8",
  rectangle: "30b71219212399443c34c48f5748a1ebe122f63df24a38dc979d664c8ae2c546",
  triangle: "b92802f083e2bdba904e5c9858a033641257fb7030c1c2585d7b53038ddb5a95",
};
// Captured from the actual v1 implementation before adding full diagonal families.
const oldPuzzleHashes = [
  [
    "square",
    1,
    "942bc7e9b24387fe09c485142532eb5bac86f45eab760e0994643768c28e188c",
  ],
  [
    "square",
    3,
    "5009879bdc15644e3775896a1f5c6cf8362949bb38703d72f6ff6e0f83e1e84e",
  ],
  [
    "square",
    5,
    "424025e3bbaab4998c09cfba7b08fbbd3670885ae928b33901f42c000a5275e2",
  ],
  [
    "rectangle",
    1,
    "e6d021e0e07ec40882589338e6867efc86fa68e69e3c5d60bfc73a30036ff71e",
  ],
  [
    "rectangle",
    3,
    "bf66334c53b90fe35df9ba2ca0d9597d5a9dcfe875593d6c653b7ffe93d95858",
  ],
  [
    "rectangle",
    5,
    "2ffd5186de7d5825449a9b30120edba2b7b18efdfc55a30f279db69a9b4aff4f",
  ],
  [
    "triangle",
    1,
    "33671fb5664fdd688f19316f35aa064e97d7cc4be194d12357209103bb61c846",
  ],
  [
    "triangle",
    3,
    "24064fc30c630f48f96287bb7572016b0fcdcdb844e59355fee2a0be5ab07d01",
  ],
  [
    "triangle",
    5,
    "03ab12b438b3a1051bf01e1df49b3953da4d1a28443cb7c0ff3d5938552d9a58",
  ],
];
for (const shape of shapes) {
  assert.equal(
    hash(getGeometry(shape, 4, 1).actions),
    oldGeometryHashes[shape],
    `${shape}: original v1 geometry retained`,
  );
  for (let size = 3; size <= 7; size++) {
    const old = getGeometry(shape, size, 1);
    const latest = getGeometry(shape, size, 2);
    assert.deepEqual(
      getGeometry(shape, size),
      latest,
      "new geometry defaults to v2",
    );
    for (const action of old.actions)
      assert.deepEqual(
        latest.actions.find((candidate) => candidate.id === action.id),
        action,
        `${shape}/${size}/${action.id}: old IDs and mappings remain valid in v2`,
      );
  }
}
for (const [shape, level, expected] of oldPuzzleHashes) {
  const puzzle = generatePuzzle(
    { seed: "version-one-regression", shape, size: 4, level },
    1,
  );
  const { initial, target, solution, states } = puzzle;
  assert.equal(puzzle.version, 1);
  // Old boards are now playable using v2 moves, so the old minimum proof no
  // longer applies. Only this one metadata bit may differ from the old snapshot.
  assert(
    [false, true].some(
      (shortest) =>
        hash({ initial, target, solution, states, shortest }) === expected,
    ),
    `${shape}/${level}: original v1 board, target and replay retained`,
  );
  assert.equal(
    puzzle.shortest,
    puzzle.solution.length === 1,
    "v1 minimum claims are conservative with newly available moves",
  );
}

function diagonalKey([a, b]) {
  const dx = b.x - a.x,
    dy = b.y - a.y;
  if (Math.abs(dx) < tolerance || Math.abs(dy) < tolerance) return null;
  assert(Math.abs(Math.abs(dx) - Math.abs(dy)) < tolerance);
  return dx * dy > 0
    ? `rise:${Math.round(a.y - a.x)}`
    : `fall:${Math.round(a.x + a.y)}`;
}
const polygonKey = (vertices) =>
  vertices
    .map((p) => `${Math.round(p.x * 1e7)},${Math.round(p.y * 1e7)}`)
    .sort()
    .join(";");
let checkedDiagonalLines = 0;
for (const shape of ["square", "rectangle"]) {
  for (let size = 3; size <= 7; size++) {
    const geometry = getGeometry(shape, size, 2);
    const drawnLines = new Map();
    for (const cell of geometry.cells)
      for (let i = 0; i < cell.vertices.length; i++) {
        const line = [
          cell.vertices[i],
          cell.vertices[(i + 1) % cell.vertices.length],
        ];
        const key = diagonalKey(line);
        if (key) drawnLines.set(key, line);
      }
    const cellsByPolygon = new Map(
      geometry.cells.map((cell) => [polygonKey(cell.vertices), cell.id]),
    );
    const actual = new Map();
    for (const action of geometry.actions) {
      const key = diagonalKey(action.line);
      if (!key) continue;
      assert(
        drawnLines.has(key),
        `${shape}/${size}: each diagonal follows the drawn mesh`,
      );
      if (!actual.has(key)) actual.set(key, []);
      actual.get(key).push(action);
    }
    for (const [key, line] of drawnLines) {
      const expectedMappings = [];
      for (const sign of [-1, 1]) {
        const source = geometry.cells.filter(
          (cell) => side(cell.center, line) * sign > tolerance,
        );
        if (!source.length || source.length === geometry.cells.length) continue;
        const mapping = source.map((cell) => [
          cell.id,
          cellsByPolygon.get(
            polygonKey(cell.vertices.map((p) => reflect(p, line))),
          ),
        ]);
        if (mapping.every(([, target]) => target !== undefined))
          expectedMappings.push(mapping);
      }
      const actions = actual.get(key) ?? [];
      assert.equal(
        actions.length,
        expectedMappings.length,
        `${shape}/${size}/${key}: include every legal side and no clipped side`,
      );
      for (const mapping of expectedMappings)
        assert(
          actions.some(
            (action) =>
              JSON.stringify(action.mapping) === JSON.stringify(mapping),
          ),
          `${shape}/${size}/${key}: complete independent reflected mapping`,
        );
      if (expectedMappings.length) checkedDiagonalLines++;
      if (shape === "square")
        assert(
          expectedMappings.length > 0,
          `${shape}/${size}/${key}: every drawn diagonal has a legal side`,
        );
    }
    if (shape === "square") {
      const allLines = new Set(
        geometry.actions.map((action) => {
          const diagonal = diagonalKey(action.line);
          if (diagonal) return diagonal;
          return Math.abs(action.line[0].x - action.line[1].x) < tolerance
            ? `vertical:${action.line[0].x}`
            : `horizontal:${action.line[0].y}`;
        }),
      );
      assert.equal(
        actual.size,
        4 * size - 2,
        `${size}×${size}: full diagonal family`,
      );
      assert.equal(
        allLines.size,
        6 * size - 4,
        `${size}×${size}: full geometric crease count`,
      );
    }
  }
}

let checkedActions = 0;
for (const version of [1, 2]) {
  for (const shape of shapes) {
    for (let size = 3; size <= 7; size++) {
      const geometry = getGeometry(shape, size, version);
      assert.equal(geometry.shape, shape);
      assert.equal(geometry.size, size);
      const expectedCount =
        shape === "rectangle" ? 4 * size * (size + 2) : 4 * size ** 2;
      assert.equal(
        geometry.cells.length,
        expectedCount,
        `${shape}/${size}: cell count`,
      );
      assert(
        geometry.actions.length >= 3,
        `${shape}/${size}: needs usable folds`,
      );
      assert.equal(
        new Set(geometry.actions.map((a) => a.id)).size,
        geometry.actions.length,
      );
      const expectedArea =
        shape === "triangle"
          ? ((2 * size) ** 2 * Math.sqrt(3)) / 4
          : size * (shape === "rectangle" ? size + 2 : size);
      const actualArea = geometry.cells.reduce(
        (sum, cell) => sum + area(cell.vertices),
        0,
      );
      assert(
        Math.abs(actualArea - expectedArea) < tolerance,
        `${shape}/${size}: tiled area`,
      );
      geometry.cells.forEach((cell, id) => {
        assert.equal(cell.id, id);
        assert.equal(cell.vertices.length, 3);
        assert(area(cell.vertices) > tolerance);
        for (const p of [...cell.vertices, cell.center]) {
          assert(Number.isFinite(p.x) && Number.isFinite(p.y));
          assert(p.x >= -tolerance && p.x <= geometry.width + tolerance);
          assert(p.y >= -tolerance && p.y <= geometry.height + tolerance);
        }
      });

      for (const action of geometry.actions) {
        checkedActions++;
        assert(action.label.length > 0);
        assert(
          !samePoint(...action.line),
          `${action.id}: nondegenerate fold line`,
        );
        assert(action.mapping.length > 0);
        const sources = new Set(action.mapping.map(([from]) => from));
        const destinations = new Set(action.mapping.map(([, to]) => to));
        assert.equal(sources.size, action.mapping.length);
        assert.equal(destinations.size, action.mapping.length);
        assert.deepEqual(
          [...sources].sort((a, b) => a - b),
          [...action.source].sort((a, b) => a - b),
        );
        assert(
          [...sources].every((id) => !destinations.has(id)),
          `${action.id}: source is retained`,
        );
        let sourceSign;
        for (const [from, to] of action.mapping) {
          const src = geometry.cells[from];
          const dest = geometry.cells[to];
          assert(src && dest, `${action.id}: source/target inside board`);
          const sign = Math.sign(side(src.center, action.line));
          sourceSign ??= sign;
          assert.equal(sign, sourceSign, `${action.id}: one source half-plane`);
          assert(sign !== 0);
          assert(side(dest.center, action.line) * sign < -tolerance);
          assert(
            samePoint(reflect(src.center, action.line), dest.center),
            `${action.id}: reflected centroid`,
          );
          for (const vertex of src.vertices) {
            const reflected = reflect(vertex, action.line);
            assert(
              dest.vertices.some((p) => samePoint(p, reflected)),
              `${action.id}: whole reflected triangle`,
            );
          }
        }
        // Whole half-plane selection must neither clip nor silently drop a cell.
        for (const cell of geometry.cells) {
          const signs = cell.vertices.map((p) => side(p, action.line));
          assert(
            !(
              signs.some((v) => v > tolerance) &&
              signs.some((v) => v < -tolerance)
            ),
            `${action.id}: no split cells`,
          );
          assert.equal(
            sources.has(cell.id),
            side(cell.center, action.line) * sourceSign > tolerance,
          );
        }
        const original = Object.freeze(
          geometry.cells.map((cell) => cell.id % 5),
        );
        const folded = applyFold(original, action);
        assert.equal(folded.length, original.length);
        assert.notEqual(folded, original);
        for (const [from, to] of action.mapping)
          assert.equal(folded[to], original[from]);
        for (let i = 0; i < original.length; i++) {
          if (!destinations.has(i)) assert.equal(folded[i], original[i]);
        }
        assert.deepEqual(
          applyFold(folded, action),
          folded,
          `${action.id}: covering twice is idempotent`,
        );
        const beforeA = Array(original.length).fill(0);
        const beforeB = beforeA.slice();
        beforeB[action.mapping[0][1]] = 1;
        assert(!boardsEqual(beforeA, beforeB));
        assert.deepEqual(
          applyFold(beforeA, action),
          applyFold(beforeB, action),
          `${action.id}: overwritten information is lost`,
        );
      }
    }
  }
}

// A small independent breadth-first oracle, with no engine search helpers.
function oracleDistance(geometry, initial, target, maxDepth) {
  if (JSON.stringify(initial) === JSON.stringify(target)) return 0;
  let frontier = [initial];
  const visited = new Set([initial.join(",")]);
  for (let depth = 1; depth <= maxDepth; depth++) {
    const next = [];
    for (const board of frontier) {
      for (const action of geometry.actions) {
        const candidate = board.slice();
        for (const [from, to] of action.mapping) candidate[to] = board[from];
        const key = candidate.join(",");
        if (visited.has(key)) continue;
        if (candidate.every((v, i) => v === target[i])) return depth;
        visited.add(key);
        next.push(candidate);
      }
    }
    frontier = next;
  }
  return null;
}

let checkedPuzzles = 0;
let checkedShortest = 0;
for (const version of [1, 2]) {
  for (const shape of shapes) {
    for (let level = 1; level <= 5; level++) {
      for (const size of [3, 7]) {
        for (const seed of ["fold-check-a", "折叠可复现-b"]) {
          const config = { seed, shape, size, level };
          const puzzle = generatePuzzle(config, version);
          const geometry = getGeometry(shape, config.size, version);
          const context = `v${version}/${shape}/${size}/${level}/${seed}`;
          checkedPuzzles++;
          assert.equal(puzzle.version, version);
          assert.deepEqual(puzzle.config, config);
          assert.equal(puzzle.initial.length, geometry.cells.length);
          assert.equal(puzzle.target.length, geometry.cells.length);
          assert(
            !boardsEqual(puzzle.initial, puzzle.target),
            `${context}: nontrivial target`,
          );
          assert(puzzle.solution.length >= 1 && puzzle.solution.length <= 8);
          assert.equal(puzzle.states.length, puzzle.solution.length + 1);
          assert.deepEqual(puzzle.states[0], puzzle.initial);
          assert(
            puzzle.initial.every((c) => Number.isInteger(c) && c >= 0 && c < 5),
          );
          assert(
            puzzle.target.every((c) => Number.isInteger(c) && c >= 0 && c < 5),
          );
          assert(
            new Set(puzzle.target).size >= 2,
            `${context}: avoid monochrome target`,
          );
          let board = puzzle.initial;
          const seen = new Set([board.join(",")]);
          puzzle.solution.forEach((id, index) => {
            const action = geometry.actions.find(
              (candidate) => candidate.id === id,
            );
            assert(action, `${context}: solution contains a legal action`);
            const next = applyFold(board, action);
            assert(
              !boardsEqual(board, next),
              `${context}: no ineffective step`,
            );
            assert(!seen.has(next.join(",")), `${context}: no cycle`);
            seen.add(next.join(","));
            assert.deepEqual(
              next,
              puzzle.states[index + 1],
              `${context}: step replay`,
            );
            board = next;
          });
          assert.deepEqual(
            board,
            puzzle.target,
            `${context}: solution reaches target`,
          );
          if (puzzle.shortest && puzzle.solution.length <= 3) {
            const shortest = oracleDistance(
              geometry,
              puzzle.initial,
              puzzle.target,
              puzzle.solution.length,
            );
            assert.equal(
              shortest,
              puzzle.solution.length,
              `${context}: verified minimum`,
            );
            checkedShortest++;
          }
          if (size === 3 && level === 1 && seed === "fold-check-a") {
            // Interleave another seed to detect hidden mutable random-generator state.
            generatePuzzle({ ...config, seed: "unrelated-seed" }, version);
            assert.deepEqual(
              generatePuzzle(config, version),
              puzzle,
              `${context}: deterministic across calls`,
            );
            assert.deepEqual(
              findHint(geometry, puzzle.target, puzzle.target, 2, 1000),
              [],
            );
            const hint = findHint(
              geometry,
              puzzle.initial,
              puzzle.target,
              2,
              1000,
            );
            assert(
              Array.isArray(hint) && hint.length > 0,
              `${context}: reachable hint`,
            );
            let hinted = puzzle.initial;
            for (const id of hint) {
              const action = geometry.actions.find(
                (candidate) => candidate.id === id,
              );
              assert(action);
              hinted = applyFold(hinted, action);
            }
            assert.deepEqual(hinted, puzzle.target);
            const zeros = Array(geometry.cells.length).fill(0);
            const impossible = zeros.slice();
            impossible[0] = 1;
            assert.equal(
              findHint(geometry, zeros, impossible, 2, 1000),
              null,
              `${context}: cannot invent colors`,
            );
          }
        }
      }
    }
  }
}

assert.deepEqual(
  generatePuzzle(validDefault()),
  generatePuzzle(validDefault(), 2),
  "new puzzles default to v2",
);
function validDefault() {
  return { seed: "default-version", shape: "square", size: 3, level: 1 };
}

// Public URL fields must be validated before costly geometry or search work.
for (const size of [0, 2, 8, 3.5, NaN]) {
  assert.throws(() => getGeometry("square", size), RangeError);
}
assert.throws(() => getGeometry("circle", 3), RangeError);
const validConfig = { seed: "validation", shape: "square", size: 3, level: 1 };
for (const version of [0, 3, 1.5, NaN]) {
  assert.throws(() => getGeometry("square", 3, version), RangeError);
  assert.throws(() => generatePuzzle(validConfig, version), RangeError);
}
for (const seed of ["", "x".repeat(513), 42]) {
  assert.throws(() => generatePuzzle({ ...validConfig, seed }), RangeError);
}
for (const level of [0, 6, 1.5]) {
  assert.throws(() => generatePuzzle({ ...validConfig, level }), RangeError);
}
const hintGeometry = getGeometry("square", 3);
const hintBoard = Array(hintGeometry.cells.length).fill(0);
const otherBoard = hintBoard.map((_, index) => Number(index === 0));
assert.equal(findHint(hintGeometry, hintBoard, otherBoard, 3, 0), null);
assert.equal(findHint(hintGeometry, hintBoard, otherBoard, 0, 1000), null);
assert.throws(
  () => findHint(hintGeometry, hintBoard, otherBoard, -1, 1000),
  RangeError,
);
assert.throws(
  () => findHint(hintGeometry, hintBoard, otherBoard, 3, -1),
  RangeError,
);
assert.throws(() => findHint(hintGeometry, [], otherBoard), RangeError);

assert(
  checkedShortest >= 3,
  "basic levels should have verified shortest solutions",
);
console.log(
  `Folding checks passed: 30 versioned geometries, ${checkedActions} legal folds, ${checkedDiagonalLines} complete v2 diagonal lines, ${checkedPuzzles} puzzles, ${checkedShortest} shortest-path oracles, 12 original v1 fingerprints (${((performance.now() - started) / 1000).toFixed(2)}s).`,
);
