import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { getGeometry } = await jiti.import("../src/lib/math-lab/folding.ts");
const { inferFold, pointInsideBoard, foldMatrix } = await jiti.import(
  "../src/lib/math-lab/folding-gesture.ts",
);

const near = (a, b, message) => assert(Math.abs(a - b) < 1e-7, message);
function samePoint(a, b, message) {
  near(a.x, b.x, message);
  near(a.y, b.y, message);
}
function reflect(point, [a, b]) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy);
  return { x: 2 * (a.x + t * dx) - point.x, y: 2 * (a.y + t * dy) - point.y };
}
const between = (a, b, fraction) => ({
  x: a.x + (b.x - a.x) * fraction,
  y: a.y + (b.y - a.y) * fraction,
});
function matrixPoint(matrix, p) {
  const values = matrix
    .match(/^matrix\(([^)]+)\)$/)?.[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  assert.equal(values?.length, 6, "SVG matrix contains six entries");
  assert(values.every(Number.isFinite));
  const [a, b, c, d, e, f] = values;
  return { x: a * p.x + c * p.y + e, y: b * p.x + d * p.y + f };
}
function checkResult(result) {
  assert(result, "a valid gesture is recognized");
  assert(Number.isFinite(result.progress));
  assert(result.progress >= 0 && result.progress <= 1);
  assert(
    Number.isFinite(result.landing.x) && Number.isFinite(result.landing.y),
  );
  assert.equal(typeof result.ready, "boolean");
  assert.equal(typeof result.allowed, "boolean");
  assert.equal(result.bisector.length, 2);
  if (!result.allowed) assert(!result.ready);
  return result;
}

const lineKey = (line) =>
  line
    .map((p) => `${p.x.toFixed(7)},${p.y.toFixed(7)}`)
    .sort()
    .join("/");
function signedDistance(point, line) {
  const [a, b] = line;
  return (
    ((b.y - a.y) * (point.x - a.x) - (b.x - a.x) * (point.y - a.y)) /
    Math.hypot(b.x - a.x, b.y - a.y)
  );
}

// Independent oracle: sum squared signed-distance differences at EVERY cell.
// This intentionally does not use the production mean/covariance shortcut.
function bisectorOracle(geometry, a, b) {
  const length = Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = between(a, b, 0.5);
  const normal = { x: (b.x - a.x) / length, y: (b.y - a.y) / length };
  const groups = new Map();
  for (const action of geometry.actions) {
    const key = lineKey(action.line);
    if (!groups.has(key))
      groups.set(key, { key, line: action.line, actions: [] });
    groups.get(key).actions.push(action);
  }
  let winner;
  let minimum = Infinity;
  for (const candidate of [...groups.values()].sort((x, y) =>
    x.key < y.key ? -1 : x.key > y.key ? 1 : 0,
  )) {
    const sums = [0, 0];
    for (const { center } of geometry.cells) {
      const ideal =
        (center.x - midpoint.x) * normal.x + (center.y - midpoint.y) * normal.y;
      const actual = signedDistance(center, candidate.line);
      sums[0] += (ideal - actual) ** 2;
      sums[1] += (ideal + actual) ** 2;
    }
    const error = Math.min(...sums) / geometry.cells.length;
    if (error < minimum - 1e-10) {
      winner = candidate;
      minimum = error;
    }
  }
  assert(winner);
  const grabSide = signedDistance(a, winner.line);
  const endSide = signedDistance(b, winner.line);
  const allowedAction = winner.actions.find((action) => {
    const sourceSide = signedDistance(
      geometry.cells[action.source[0]].center,
      winner.line,
    );
    return Math.abs(grabSide) > 1e-7
      ? sourceSide * grabSide > 0
      : sourceSide * endSide < 0;
  });
  return {
    ...winner,
    error: minimum,
    allowed: Boolean(allowedAction),
    allowedAction,
    midpoint,
    normal,
  };
}

function compareOracle(geometry, a, b, pixelsPerUnit = 100, previousId) {
  const expected = bisectorOracle(geometry, a, b);
  const result = checkResult(
    inferFold(geometry, a, b, pixelsPerUnit, previousId),
  );
  assert.equal(
    lineKey(result.action.line),
    expected.key,
    `nearest bisector line for ${geometry.shape}/${geometry.size}: ${JSON.stringify({ a, b })}`,
  );
  assert.equal(
    result.allowed,
    expected.allowed,
    "direction is checked only after selecting the nearest line",
  );
  if (expected.allowed)
    assert.equal(result.action.id, expected.allowedAction.id);
  samePoint(result.midpoint, expected.midpoint);
  samePoint(result.landing, reflect(a, expected.line));
  for (const point of result.bisector) {
    near(
      (point.x - expected.midpoint.x) * expected.normal.x +
        (point.y - expected.midpoint.y) * expected.normal.y,
      0,
      "displayed bisector is perpendicular to AB and passes its midpoint",
    );
  }
  if (expected.allowed) {
    const action = result.action;
    const creaseDistance =
      (action.line[0].x - a.x) * action.direction.x +
      (action.line[0].y - a.y) * action.direction.y;
    const travel =
      (b.x - a.x) * action.direction.x + (b.y - a.y) * action.direction.y;
    assert.equal(
      result.ready,
      Math.hypot(b.x - a.x, b.y - a.y) * pixelsPerUnit >= 28 &&
        (travel - creaseDistance) * pixelsPerUnit >= 4,
    );
  }
  return result;
}

const square = getGeometry("square", 4);
const examples = [
  { id: "d1:n", start: { x: 3.5, y: 0.5 }, end: { x: 0.5, y: 3.5 } },
  { id: "d1:p", start: { x: 0.5, y: 3.5 }, end: { x: 3.5, y: 0.5 } },
  { id: "d2:n", start: { x: 0.5, y: 0.5 }, end: { x: 3.5, y: 3.5 } },
  { id: "d2:p", start: { x: 3.5, y: 3.5 }, end: { x: 0.5, y: 0.5 } },
  { id: "h1:n", start: { x: 2.7, y: 0.2 }, end: { x: 2.7, y: 1.8 } },
  { id: "h3:p", start: { x: 1.3, y: 3.8 }, end: { x: 1.3, y: 2.2 } },
  { id: "v1:n", start: { x: 0.2, y: 2.7 }, end: { x: 1.8, y: 2.7 } },
  { id: "v3:p", start: { x: 3.8, y: 1.3 }, end: { x: 2.2, y: 1.3 } },
];
for (const example of examples) {
  for (const pixelsPerUnit of [40, 100]) {
    const result = checkResult(
      inferFold(square, example.start, example.end, pixelsPerUnit),
    );
    assert.equal(
      result.action.id,
      example.id,
      `${example.id}: arbitrary source start`,
    );
    samePoint(
      result.landing,
      example.end,
      `${example.id}: exact reflected landing`,
    );
    near(result.progress, 1);
    assert(
      result.ready,
      `${example.id}: full reflection commits at both scales`,
    );
    const beforeCrease = checkResult(
      inferFold(
        square,
        example.start,
        between(example.start, example.end, 0.45),
        pixelsPerUnit,
        example.id,
      ),
    );
    if (lineKey(beforeCrease.action.line) === lineKey(result.action.line))
      assert(
        !beforeCrease.ready,
        `${example.id}: no commit before crossing the selected crease`,
      );
    compareOracle(
      square,
      example.start,
      between(example.start, example.end, 0.45),
      pixelsPerUnit,
      example.id,
    );
  }
}

// Identical drag directions must still distinguish different parallel hinges.
for (const [endX, id] of [
  [1.75, "v1:n"],
  [3.75, "v2:n"],
]) {
  const result = checkResult(
    inferFold(square, { x: 0.25, y: 1.3 }, { x: endX, y: 1.3 }, 100),
  );
  assert.equal(result.action.id, id);
}

// A previously selected diagonal cannot lock a reversed or redirected gesture.
const start = { x: 3.5, y: 0.5 };
compareOracle(square, start, { x: 4.5, y: -0.5 }, 100, "d1:n");
const redirected = checkResult(
  inferFold(square, start, { x: 3.5, y: 3.5 }, 100, "d1:n"),
);
assert.equal(
  redirected.action.id,
  "h2:n",
  "direction changes choose a new hinge",
);
assert(redirected.ready);

// A real drag can finish outside the outline; only the grab point is constrained.
compareOracle(square, { x: 0.5, y: 0.5 }, { x: 5, y: 5 });

// Pointer jitter is a CSS-pixel threshold, independent of board units.
for (const pixelsPerUnit of [40, 100]) {
  const grab = { x: 0.25, y: 1.2 };
  assert.equal(
    inferFold(
      square,
      grab,
      { x: grab.x + 7.9 / pixelsPerUnit, y: grab.y },
      pixelsPerUnit,
    ),
    null,
  );
  assert(
    inferFold(
      square,
      grab,
      { x: grab.x + 8.1 / pixelsPerUnit, y: grab.y },
      pixelsPerUnit,
    ),
  );
}
assert.equal(inferFold(square, start, start, 100), null);
assert.equal(inferFold(square, start, { x: 0.5, y: 3.5 }, 0), null);
assert.equal(inferFold(square, start, { x: 0.5, y: 3.5 }, NaN), null);

// Exactly on a crease, the virtual grab distance prevents division by zero.
const onCrease = checkResult(
  inferFold(square, { x: 2, y: 2 }, { x: 1.6, y: 2.4 }, 100, "d1:n"),
);
assert.equal(onCrease.action.id, "d1:n");
samePoint(onCrease.landing, { x: 2, y: 2 });

// Small crossing alone is not enough; both distance and cross-line margins apply.
assert(
  !checkResult(
    inferFold(square, { x: 1.98, y: 1.3 }, { x: 2.1, y: 1.3 }, 100, "v2:n"),
  ).ready,
);
assert(
  !checkResult(
    inferFold(square, { x: 1.5, y: 1.3 }, { x: 2.02, y: 1.3 }, 100, "v2:n"),
  ).ready,
);
assert(
  checkResult(
    inferFold(square, { x: 1.5, y: 1.3 }, { x: 2.05, y: 1.3 }, 100, "v2:n"),
  ).ready,
);

const square3 = getGeometry("square", 3);
const legacySquare = getGeometry("square", 4, 1);
const legacySquare3 = getGeometry("square", 3, 1);
const regressions = [
  // In a 4×4 board, RMS prefers d2 (MSE .338990482) over v2 (.389996077).
  // The old angle-first rule chose v2:n for this ordinary, nonideal diagonal drag.
  {
    geometry: legacySquare,
    a: { x: 1.1, y: 0.6 },
    b: { x: 2.9, y: 1.4 },
    id: "d2:n",
    allowed: true,
  },
  // The old angle-first rule discarded d2 and incorrectly chose v1:n.
  {
    geometry: legacySquare3,
    a: { x: 0.5, y: 1.2 },
    b: { x: 2.5, y: 1.8 },
    id: "d2:n",
    allowed: true,
  },
  // x = 1.2 is nearest x = 1. Right-to-left is unavailable at that line;
  // do not silently move the user's intended hinge to x = 2.
  {
    geometry: legacySquare3,
    a: { x: 2.2, y: 1.5 },
    b: { x: 0.2, y: 1.5 },
    id: "v1:n",
    allowed: false,
  },
  {
    geometry: legacySquare,
    a: { x: 1.5, y: 2.5 },
    b: { x: 1.2, y: 3.1 },
    id: "h3:p",
    allowed: false,
  },
  {
    geometry: legacySquare,
    a: { x: 1.5, y: 2.5 },
    b: { x: 3, y: 3.2 },
    id: "v3:p",
    allowed: false,
  },
  // Exact tie: the stable geometric key wins, regardless of previous selection.
  {
    geometry: legacySquare,
    a: { x: 0.5, y: 1.3 },
    b: { x: 2.5, y: 1.3 },
    id: "v1:n",
    allowed: true,
  },
];
for (const { geometry, a, b, id, allowed } of regressions) {
  const baseline = compareOracle(geometry, a, b);
  assert.equal(baseline.action.id, id);
  assert.equal(baseline.allowed, allowed);
  for (const previousId of [
    undefined,
    "unknown-previous",
    ...geometry.actions.map((action) => action.id),
  ])
    assert.deepEqual(
      compareOracle(geometry, a, b, 100, previousId),
      baseline,
      "previous candidate cannot bias a geometric match",
    );
}

// Every mesh diagonal is now a candidate, including short off-center hinges.
// These exact landings must not be pulled toward either main diagonal.
const offsetCases = [
  {
    geometry: square,
    a: { x: 0.5, y: 1.5 },
    b: { x: 1.5, y: 2.5 },
    slope: -1,
    offset: 3,
  },
  {
    geometry: square,
    a: { x: 3.5, y: 2.5 },
    b: { x: 2.5, y: 1.5 },
    slope: -1,
    offset: 5,
  },
  {
    geometry: square,
    a: { x: 0.5, y: 2.5 },
    b: { x: 1.5, y: 1.5 },
    slope: 1,
    offset: 1,
  },
  {
    geometry: square,
    a: { x: 3.5, y: 1.5 },
    b: { x: 2.5, y: 2.5 },
    slope: 1,
    offset: -1,
  },
  {
    geometry: square3,
    a: { x: 0.5, y: 0.5 },
    b: { x: 1.5, y: 1.5 },
    slope: -1,
    offset: 2,
  },
  {
    geometry: getGeometry("rectangle", 4),
    a: { x: 0.5, y: 0.5 },
    b: { x: 2.5, y: 2.5 },
    slope: -1,
    offset: 3,
  },
];
for (const { geometry, a, b, slope, offset } of offsetCases) {
  for (const pixelsPerUnit of [40, 100]) {
    const result = compareOracle(geometry, a, b, pixelsPerUnit);
    assert(result.allowed);
    assert(result.ready);
    samePoint(result.landing, b);
    for (const point of result.action.line)
      near(
        slope === 1 ? point.y - point.x : point.x + point.y,
        offset,
        "selected exact off-center diagonal",
      );
  }
}

let randomState = 0x18af7231;
function random() {
  randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
  return randomState / 4294967296;
}
let oracleCases = 0;
let checkedActions = 0;
for (const shape of ["square", "rectangle", "triangle"]) {
  for (const size of [3, 4, 7]) {
    const geometry = getGeometry(shape, size);
    for (const cell of geometry.cells)
      assert(pointInsideBoard(geometry, cell.center));
    assert(!pointInsideBoard(geometry, { x: -0.01, y: geometry.height / 2 }));
    assert(
      !pointInsideBoard(geometry, {
        x: geometry.width + 0.01,
        y: geometry.height / 2,
      }),
    );
    assert(!pointInsideBoard(geometry, { x: geometry.width / 2, y: -0.01 }));
    assert(
      !pointInsideBoard(geometry, {
        x: geometry.width / 2,
        y: geometry.height + 0.01,
      }),
    );
    if (shape === "triangle") {
      assert(
        !pointInsideBoard(geometry, { x: 0.1, y: 0.1 }),
        "triangle bounding-box empty corner is outside",
      );
      assert(
        pointInsideBoard(geometry, {
          x: geometry.width / 2,
          y: geometry.height / 2,
        }),
      );
      assert.equal(
        inferFold(geometry, { x: 0.1, y: 0.1 }, { x: 3, y: 3 }, 100),
        null,
      );
    }
    for (const action of geometry.actions) {
      const centers = action.source.map((id) => geometry.cells[id].center);
      const origin = centers.reduce((best, point) => {
        const reflected = reflect(point, action.line);
        const reflectedBest = reflect(best, action.line);
        return Math.hypot(point.x - reflected.x, point.y - reflected.y) >
          Math.hypot(best.x - reflectedBest.x, best.y - reflectedBest.y)
          ? point
          : best;
      });
      const landing = reflect(origin, action.line);
      const result = checkResult(inferFold(geometry, origin, landing, 100));
      samePoint(
        reflect(origin, result.action.line),
        landing,
        `${shape}/${size}/${action.id}: correct inferred reflection`,
      );
      samePoint(result.landing, landing);
      assert(result.ready);
      checkedActions++;

      samePoint(
        matrixPoint(foldMatrix(action, 0), origin),
        origin,
        "animation begins at original position",
      );
      samePoint(
        matrixPoint(foldMatrix(action, 1), origin),
        landing,
        "animation ends at exact reflected position",
      );
      samePoint(
        matrixPoint(foldMatrix(action, 0.5), origin),
        between(origin, landing, 0.5),
        "edge-on position is the crease projection",
      );
      for (const progress of [0, 0.2, 0.5, 0.8, 1]) {
        for (const point of action.line)
          samePoint(
            matrixPoint(foldMatrix(action, progress), point),
            point,
            "hinge stays fixed throughout animation",
          );
      }
    }

    for (let sample = 0; sample < 200; sample++) {
      // Barycentric starts cover each board's real interior; B may be outside.
      const cell = geometry.cells[Math.floor(random() * geometry.cells.length)];
      const weights = [random() + 0.01, random() + 0.01, random() + 0.01];
      const sum = weights.reduce((a, b) => a + b, 0);
      const a = cell.vertices.reduce(
        (point, vertex, i) => ({
          x: point.x + (vertex.x * weights[i]) / sum,
          y: point.y + (vertex.y * weights[i]) / sum,
        }),
        { x: 0, y: 0 },
      );
      const b = {
        x: (random() * 1.4 - 0.2) * geometry.width,
        y: (random() * 1.4 - 0.2) * geometry.height,
      };
      if (Math.hypot(b.x - a.x, b.y - a.y) < 0.3) {
        sample--;
        continue;
      }
      const baseline = compareOracle(geometry, a, b);
      const zoomed = compareOracle(geometry, a, b, 40);
      assert.equal(
        zoomed.action.id,
        baseline.action.id,
        "scale changes pixel thresholds, never the nearest line",
      );
      assert.equal(zoomed.allowed, baseline.allowed);
      for (const action of geometry.actions)
        assert.deepEqual(
          inferFold(geometry, a, b, 100, action.id),
          baseline,
          "same endpoints ignore every previous candidate",
        );

      // Simulate two different curved trajectories ending at the same B.
      for (const bend of [-1, 1]) {
        let previous;
        for (const fraction of [0.2, 0.55, 0.8]) {
          const pointer = between(a, b, fraction);
          pointer.x += bend * (1 - fraction) * geometry.width * 0.2;
          pointer.y -= bend * (1 - fraction) * geometry.height * 0.15;
          previous = inferFold(geometry, a, pointer, 100, previous)?.action.id;
        }
        assert.deepEqual(
          inferFold(geometry, a, b, 100, previous),
          baseline,
          "drag trajectory cannot influence final selection",
        );
      }
      if (pointInsideBoard(geometry, b)) {
        const swapped = compareOracle(geometry, b, a);
        assert.equal(
          lineKey(swapped.action.line),
          lineKey(baseline.action.line),
          "swapping A/B keeps the geometric bisector",
        );
      }
      oracleCases++;
    }
  }
}

console.log(
  `Folding gesture checks passed: ${examples.length} directional fixtures and ${offsetCases.length} off-center v2 diagonals at two scales, ${checkedActions} exact reflections, ${regressions.length} legacy v1 regressions, ${oracleCases} randomized per-cell bisector oracles with history/path independence, hit areas, thresholds, and animation endpoints.`,
);
