import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  axisQuaternion,
  eulerQuaternion,
  multiplyQuaternions,
  normalizeQuaternion,
  quaternionMatrix,
  rotateVector,
  rotationDistance,
  slerpQuaternion,
} = await jiti.import("../src/lib/math-lab/rotations.ts");
const { eulerZYX } = await jiti.import("../src/lib/math-lab/robotics.ts");

const close = (actual, expected, tolerance = 1e-10) =>
  assert(
    Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance,
    `${actual} != ${expected} (tolerance ${tolerance})`,
  );
const vectorClose = (actual, expected, tolerance) => {
  assert.equal(actual.length, expected.length);
  actual.forEach((entry, index) => close(entry, expected[index], tolerance));
};
const negative = (q) => q.map((entry) => -entry);
const matrixProduct = (a, b) =>
  a.map((row) =>
    b[0].map((_, column) =>
      row.reduce((sum, entry, index) => sum + entry * b[index][column], 0),
    ),
  );
const transpose = (matrix) =>
  matrix[0].map((_, column) => matrix.map((row) => row[column]));
const determinant = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
  m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
  m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
const identity = [1, 0, 0, 0];
const identityMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

// Fixtures establish handedness, component order, and actual physical angles.
const x90 = axisQuaternion([1, 0, 0], 90);
const z90 = axisQuaternion([0, 0, 1], 90);
vectorClose(z90, [Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
vectorClose(rotateVector(z90, [1, 0, 0]), [0, 1, 0]);
vectorClose(rotateVector(x90, [0, 1, 0]), [0, 0, 1]);
vectorClose(
  rotateVector(axisQuaternion([1, 0, 0], 180), [0, 1, 0]),
  [0, -1, 0],
);
vectorClose(axisQuaternion([0, 0, 15], 90), z90);

// Raw Hamilton multiplication preserves scale and is not commutative.
vectorClose(multiplyQuaternions([2, 0, 0, 0], [3, 0, 0, 0]), [6, 0, 0, 0]);
const xThenZ = multiplyQuaternions(z90, x90);
const zThenX = multiplyQuaternions(x90, z90);
vectorClose(rotateVector(xThenZ, [1, 0, 0]), [0, 1, 0]);
vectorClose(rotateVector(zThenX, [1, 0, 0]), [0, 0, 1]);
close(rotationDistance(xThenZ, zThenX), 120);

// Independent existing trigonometric matrices validate Euler conversions,
// including both singular branches; invariants use non-axis-aligned inputs.
for (const angles of [
  [0, 0, 0],
  [30, 60, 10],
  [30, 90, 10],
  [-50, -90, 160],
  [113, -37, 242],
  [720, 360, -180],
]) {
  const q = eulerQuaternion(angles);
  const matrix = quaternionMatrix(q);
  const expected = eulerZYX(...angles.map((angle) => (angle * Math.PI) / 180));
  vectorClose(matrix.flat(), expected.flat());
  vectorClose(matrixProduct(transpose(matrix), matrix).flat(), identityMatrix);
  close(determinant(matrix), 1);
  for (const vector of [
    [2, -3, 4],
    [-0.7, 1.8, 0.2],
    [0, 0, 0],
  ]) {
    close(Math.hypot(...rotateVector(q, vector)), Math.hypot(...vector));
    vectorClose(rotateVector(q, vector), rotateVector(negative(q), vector));
  }
  close(rotationDistance(q, negative(q)), 0);
  vectorClose(quaternionMatrix(negative(q)).flat(), matrix.flat());
  vectorClose(
    quaternionMatrix(q.map((entry) => entry * 7)).flat(),
    matrix.flat(),
  );
}

// The course's +90-degree lock keeps roll-yaw fixed; the -90 branch keeps their sum.
close(
  rotationDistance(
    eulerQuaternion([30, 90, 10]),
    eulerQuaternion([50, 90, 30]),
  ),
  0,
);
close(
  rotationDistance(
    eulerQuaternion([30, -90, 10]),
    eulerQuaternion([50, -90, -10]),
  ),
  0,
);
assert(
  rotationDistance(
    eulerQuaternion([30, 60, 10]),
    eulerQuaternion([50, 60, 30]),
  ) > 1,
);

// Compose arbitrary rotations independently at matrix and vector levels.
const first = axisQuaternion([1, 2, -3], 137);
const second = axisQuaternion([-2, 1, 4], -71);
const composed = multiplyQuaternions(second, first);
vectorClose(
  quaternionMatrix(composed).flat(),
  matrixProduct(quaternionMatrix(second), quaternionMatrix(first)).flat(),
);
vectorClose(
  rotateVector(composed, [2, 3, -1]),
  rotateVector(second, rotateVector(first, [2, 3, -1])),
);

// Preserve the representative continuously over 360 and 720 degrees.
vectorClose(axisQuaternion([0, 1, 0], 0), identity);
vectorClose(axisQuaternion([0, 1, 0], 360), negative(identity));
vectorClose(axisQuaternion([0, 1, 0], 720), identity);
vectorClose(normalizeQuaternion([-3, 0, 0, 0]), negative(identity));
for (let angle = 0; angle < 720; angle += 1) {
  const a = axisQuaternion([1, 2, 3], angle);
  const b = axisQuaternion([1, 2, 3], angle + 1);
  close(Math.hypot(...a), 1);
  assert(a.reduce((sum, value, index) => sum + value * b[index], 0) > 0.99);
  close(rotationDistance(a, b), 1);
}

// Extremely scaled valid inputs still normalize without overflow or underflow.
vectorClose(
  normalizeQuaternion([1e308, 1e308, 1e308, 1e308]),
  [0.5, 0.5, 0.5, 0.5],
);
vectorClose(normalizeQuaternion([1e-320, 0, 0, 0]), identity);
vectorClose(axisQuaternion([0, 0, 1e308], 90), z90);

// SLERP has normalized endpoints and constant physical angular increments.
for (const [a, b] of [
  [identity, axisQuaternion([1, 2, 3], 152)],
  [first, second],
  [axisQuaternion([0, 0, 1], 170), axisQuaternion([0, 0, 1], -170)],
  [negative(identity), z90],
  [first, negative(second)],
  [identity, axisQuaternion([0, 1, 0], 180)],
  [identity, axisQuaternion([0, 1, 0], 0.000001)],
]) {
  const total = rotationDistance(a, b);
  vectorClose(slerpQuaternion(a, b, 0), normalizeQuaternion(a));
  close(rotationDistance(slerpQuaternion(a, b, 1), b), 0);
  let previous = slerpQuaternion(a, b, 0);
  for (let step = 1; step <= 20; step++) {
    const current = slerpQuaternion(a, b, step / 20);
    close(Math.hypot(...current), 1);
    close(rotationDistance(previous, current), total / 20);
    close(rotationDistance(a, current), (total * step) / 20);
    previous = current;
  }
}
close(
  rotationDistance(
    axisQuaternion([0, 0, 1], 170),
    axisQuaternion([0, 0, 1], -170),
  ),
  20,
);
for (const t of [0, 0.001, 0.25, 0.5, 0.99, 1]) {
  vectorClose(slerpQuaternion(first, first, t), first);
  vectorClose(slerpQuaternion(first, negative(first), t), first);
  vectorClose(
    slerpQuaternion(
      first.map((v) => v * 5),
      first.map((v) => -v * 3),
      t,
    ),
    first,
  );
}

// Public APIs reject invalid data explicitly instead of producing NaN geometry.
const invalidQuaternions = [
  [0, 0, 0, 0],
  [NaN, 0, 0, 1],
  [1, Infinity, 0, 0],
  [1, 0, 0],
];
for (const invalid of invalidQuaternions) {
  for (const operation of [
    () => normalizeQuaternion(invalid),
    () => quaternionMatrix(invalid),
    () => rotateVector(invalid, [1, 0, 0]),
    () => multiplyQuaternions(invalid, identity),
    () => multiplyQuaternions(identity, invalid),
    () => slerpQuaternion(invalid, identity, 0.5),
    () => slerpQuaternion(identity, invalid, 0.5),
    () => rotationDistance(invalid, identity),
    () => rotationDistance(identity, invalid),
  ])
    assert.throws(operation, RangeError);
}
for (const invalid of [
  [0, 0, 0],
  [NaN, 0, 1],
  [0, Infinity, 1],
  [1, 0],
])
  assert.throws(() => axisQuaternion(invalid, 90), RangeError);
for (const invalid of [NaN, Infinity, -Infinity]) {
  assert.throws(() => axisQuaternion([1, 0, 0], invalid), RangeError);
  assert.throws(() => eulerQuaternion([0, invalid, 0]), RangeError);
  assert.throws(() => rotateVector(identity, [0, invalid, 0]), RangeError);
}
for (const invalid of [NaN, Infinity, -0.1, 1.1])
  assert.throws(() => slerpQuaternion(identity, z90, invalid), RangeError);

console.log(
  "Rotations: conventions, independent Euler matrices, rotation invariants, composition order, sign equivalence, 360/720 continuity, shortest-path constant-speed SLERP, degenerate endpoints, and invalid inputs passed.",
);
