import assert from "node:assert/strict";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  armInitial,
  armTarget,
  eulerZYX,
  planarForward,
  planarJacobian,
  planarInverseStep,
  poseError,
  solveLinear3,
} = await jiti.import("../src/lib/math-lab/robotics.ts");
const { roboticsWeek4Chapters } = await jiti.import(
  "../src/data/learning/robotics-week4.ts",
);
const close = (a, b, eps = 1e-9) =>
  assert(Math.abs(a - b) < eps, `${a} != ${b}`);
const vectorClose = (a, b, eps) => a.forEach((v, i) => close(v, b[i], eps));
const mul = (a, b) =>
  a.map((row) =>
    b[0].map((_, j) => row.reduce((s, v, k) => s + v * b[k][j], 0)),
  );
const transpose = (a) => a[0].map((_, i) => a.map((row) => row[i]));
const det = (a) =>
  a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
  a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
  a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
const identity = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
// Rotation invariants, noncommutativity, and both gimbal-lock branches.
for (const [roll, pitch, yaw] of [
  [0.4, 0.8, -1.2],
  [0, Math.PI / 2, 0.2],
  [2, -Math.PI / 2, -0.7],
]) {
  const r = eulerZYX(roll, pitch, yaw);
  vectorClose(mul(transpose(r), r).flat(), identity.flat());
  close(det(r), 1);
}
for (const pitch of [Math.PI / 2, -Math.PI / 2]) {
  const yawShift = pitch > 0 ? 0.2 : -0.2;
  vectorClose(
    eulerZYX(0.3, pitch, 0.1).flat(),
    eulerZYX(0.5, pitch, 0.1 + yawShift).flat(),
  );
}
assert(
  Math.max(
    ...eulerZYX(0.3, 0.8, 0.1)
      .flat()
      .map((v, i) => Math.abs(v - eulerZYX(0.5, 0.8, 0.3).flat()[i])),
  ) > 0.05,
);
const rx = eulerZYX(Math.PI / 2, 0, 0),
  rz = eulerZYX(0, 0, Math.PI / 2);
vectorClose(mul(mul(rx, rz), [[1], [0], [0]]).flat(), [0, 0, 1]);
vectorClose(mul(mul(rz, rx), [[1], [0], [0]]).flat(), [0, 1, 0]);

// Check geometric examples independently of the matrix derivation.
for (const [q, pose] of [
  [
    [0, 0, 0],
    [2.5, 0, 0],
  ],
  [
    [0, -Math.PI / 2, Math.PI / 2],
    [1.5, -1, 0],
  ],
  [[0, Math.PI / 2, 0], armTarget],
  [[Math.PI / 2, -Math.PI / 2, Math.PI / 2], armTarget],
  [
    [Math.PI / 2, 0, 0],
    [0, 2.5, Math.PI / 2],
  ],
])
  vectorClose(planarForward(q).pose, pose);

// Finite differences independently check every Jacobian column in nonspecial configurations.
const h = 1e-6;
for (const q of [
  [0.2, 0.7, -0.4],
  [-1.3, -0.8, 2.1],
  [0.5, 1.2, 0.7],
  [0, 0, 0],
]) {
  const j = planarJacobian(q);
  for (let c = 0; c < 3; c++) {
    const hi = q.map((v, i) => v + (i === c ? h : 0)),
      lo = q.map((v, i) => v - (i === c ? h : 0));
    const a = planarForward(hi).pose,
      b = planarForward(lo).pose;
    for (let row = 0; row < 3; row++)
      close(j[row][c], (a[row] - b[row]) / (2 * h), 1e-8);
  }
  close(det(j), Math.sin(q[1]));
  // Independent homogeneous D-H chain agrees with the geometric implementation.
  let chain = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  q.forEach((angle, i) => {
    const c = Math.cos(angle),
      s = Math.sin(angle),
      length = [1, 1, 0.5][i];
    chain = mul(chain, [
      [c, -s, 0, length * c],
      [s, c, 0, length * s],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  });
  const pose = planarForward(q).pose;
  vectorClose([chain[0][3], chain[1][3]], pose.slice(0, 2));
  close(chain[0][0], Math.cos(pose[2]));
  close(chain[1][0], Math.sin(pose[2]));
}

// Fixed numerical fixtures were independently recomputed from the lecture.
const first = planarInverseStep(armInitial, armTarget);
vectorClose(
  first,
  [-0.1547005383792515, 0.7320508075688772, -0.5773502691896257],
);
let q = armInitial.map((v, i) => v + first[i]);
vectorClose(q, [-0.1547005383792515, 1.779248358765475, -0.053751493591327]);
const second = planarInverseStep(q, armTarget);
vectorClose(
  second,
  [0.155134088080229, -0.196958681398325, 0.041824593318096],
  1e-8,
);
q = q.map((v, i) => v + second[i]);
close(
  Math.hypot(...poseError(planarForward(q).pose, armTarget).slice(0, 2)),
  0.0119322229106358,
);
for (let k = 0; k < 2; k++) {
  const d = planarInverseStep(q, armTarget);
  q = q.map((v, i) => v + d[i]);
}
assert(Math.hypot(...poseError(planarForward(q).pose, armTarget)) < 1e-6);
assert.equal(planarInverseStep([0, 0, 0], armTarget), null);
assert.equal(
  solveLinear3(
    [
      [1, 2, 3],
      [2, 4, 6],
      [0, 1, 2],
    ],
    [1, 2, 3],
  ),
  null,
);
for (const initial of [armInitial, [0, 0, 0]]) {
  const d = planarInverseStep(initial, armTarget, 0.1);
  assert(d?.every(Number.isFinite));
  const next = initial.map((v, i) => v + d[i]);
  assert(
    Math.hypot(...poseError(planarForward(next).pose, armTarget)) <
      Math.hypot(...poseError(planarForward(initial).pose, armTarget)),
  );
}
close(
  poseError([0, 0, (179 * Math.PI) / 180], [0, 0, (-179 * Math.PI) / 180])[2],
  (2 * Math.PI) / 180,
);
assert.equal(roboticsWeek4Chapters.length, 8);
assert.equal(
  roboticsWeek4Chapters.reduce((sum, c) => sum + c.checks.length, 0),
  26,
);
console.log(
  "Robotics: rotation invariants, both IK branches, finite-difference Jacobians, D-H chain, lecture Newton steps, singular and damped cases passed.",
);
