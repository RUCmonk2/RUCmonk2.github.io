import assert from "node:assert/strict";

// Independent arithmetic and finite-difference checks for published worked examples.
// These do not claim to prove every mathematical statement in the lessons.
let checks = 0;
function close(actual, expected, tolerance = 1e-8) {
  assert(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
  checks++;
}
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const multiply = (a, b) =>
  a.map((row) => transpose(b).map((col) => dot(row, col)));
const det = (a) => a[0][0] * a[1][1] - a[0][1] * a[1][0];
const inverse = (a) =>
  [
    [a[1][1], -a[0][1]],
    [-a[1][0], a[0][0]],
  ].map((row) => row.map((x) => x / det(a)));
function matrixClose(a, b, tolerance) {
  a.forEach((row, i) => row.forEach((x, j) => close(x, b[i][j], tolerance)));
}
function directional(f, x, h) {
  const epsilon = 1e-5;
  return (
    (f(x.map((v, i) => v + epsilon * h[i])) -
      f(x.map((v, i) => v - epsilon * h[i]))) /
    (2 * epsilon)
  );
}

// Analysis: integral, convergent series, and Taylor approximation errors.
close(3 ** 2 + 3, 12);
close(4 - (3 + 3 / 4 + 3 / 16), 1 / 16);
assert(Math.abs(Math.exp(0.1) - 1.105) < 0.000186);
assert(Math.abs(Math.sin(0.2) - (0.2 - 0.2 ** 3 / 6)) < 0.2 ** 5 / 120);

// Multivariable: directional, Jacobian-chain, and Hessian worked answers.
const bowl = ([x, y]) => x * x + 2 * y * y;
close(directional(bowl, [1, 1], [3 / 5, 4 / 5]), 4.4);
close(bowl([1.006, 1.008]) - bowl([1, 1]), 0.044164);
const composed = ([x, y]) => (x * y) ** 2 + 3 * (x + y);
close(directional(composed, [1, 2], [1, 0]), 11);
close(directional(composed, [1, 2], [0, 1]), 7);
close(composed([1.01, 1.98]), 12.96920004);
close(dot([0.1, -0.2], [0, -0.7]) / 2, 0.07);

// Linear algebra: decomposition, trace cyclicity, projections.
matrixClose(
  multiply(
    [
      [2, 1],
      [1, 2],
    ],
    [[1], [1]],
  ),
  [[3], [3]],
);
close(
  det([
    [1, 2],
    [3, 4],
  ]),
  -2,
);
const ab = multiply(
  [
    [1, 2],
    [0, 3],
  ],
  [
    [4, 0],
    [5, 6],
  ],
);
const ba = multiply(
  [
    [4, 0],
    [5, 6],
  ],
  [
    [1, 2],
    [0, 3],
  ],
);
close(ab[0][0] + ab[1][1], 32);
close(ba[0][0] + ba[1][1], 32);
close(dot([1.5, 1.5], [0.5, -0.5]), 0);

// Matrix calculus: inverse derivative checked by central differences.
const x = [
    [2, 0],
    [0, 4],
  ],
  h = [
    [0.1, 0.2],
    [-0.3, 0.4],
  ];
const eps = 1e-5;
const plus = inverse(x.map((row, i) => row.map((v, j) => v + eps * h[i][j])));
const minus = inverse(x.map((row, i) => row.map((v, j) => v - eps * h[i][j])));
const finite = plus.map((row, i) =>
  row.map((v, j) => (v - minus[i][j]) / (2 * eps)),
);
const analytic = multiply(multiply(inverse(x), h), inverse(x)).map((row) =>
  row.map((v) => -v),
);
matrixClose(finite, analytic);
close(Math.log((2.02 * 2.97) / 6), -0.000100005, 1e-10);
const residual = [7 / 6 - 1, 5 / 3 - 2, 13 / 6 - 2];
close(dot(residual, residual), 1 / 6);
close(dot(residual, [1, 1, 1]), 0);
close(dot(residual, [0, 1, 2]), 0);
const vjpLoss = ([a, b]) => 2 * a * b - a - b;
close(directional(vjpLoss, [2, 3], [1, 0]), 5);
close(directional(vjpLoss, [2, 3], [0, 1]), 3);

// Groups: noncommuting generators and equivariant/non-equivariant layers.
const a = [
  [0, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
];
const b = [
  [0, 0, 1],
  [0, 0, 0],
  [-1, 0, 0],
];
const productAB = multiply(a, b),
  productBA = multiply(b, a);
matrixClose(
  productAB.map((row, i) => row.map((v, j) => v - productBA[i][j])),
  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ],
);
const swap = [
    [0, 1],
    [1, 0],
  ],
  w = [
    [2, 1],
    [1, 2],
  ];
matrixClose(multiply(w, swap), multiply(swap, w));
matrixClose(multiply(w, [[1], [3]]), [[5], [7]]);

// Probability and learning: independently reproduce the numerical examples.
close(0.09 / (0.09 + 0.495), 2 / 13);
close((0.01 * 0.9 ** 2) / (0.01 * 0.9 ** 2 + 0.99 * 0.05 ** 2), 0.7659574468);
close(0.5 * 100 + 0.3 * 200, 110);
close(0.5 * 100 ** 2 + 0.3 * 200 ** 2 - 110 ** 2, 4900);
close(0.7 ** 7 * 0.3 ** 3, 0.0022235661);
const entropy = (p) =>
  -p.reduce(
    (sum, value) => sum + (value === 0 ? 0 : value * Math.log(value)),
    0,
  );
const kl = (p, q) =>
  p.reduce(
    (sum, value, i) => sum + (value === 0 ? 0 : value * Math.log(value / q[i])),
    0,
  );
close(entropy([0.5, 0.5]), 0.6931471806);
close(kl([0.5, 0.5], [0.75, 0.25]), 0.1438410362);
close(kl([0.75, 0.25], [0.5, 0.5]), 0.1308120359);
const neuron = ([weight, bias]) =>
  (Math.max(0, weight * 2 + bias) - 3) ** 2 / 2;
close(directional(neuron, [1, -1], [1, 0]), -4);
close(directional(neuron, [1, -1], [0, 1]), -2);
close(neuron([1.4, -0.8]), 0.5);
const softmaxLoss = (z) =>
  Math.log(z.reduce((sum, value) => sum + Math.exp(value), 0)) - z[2];
const logits = [Math.log(2), 0, Math.log(3)];
close(softmaxLoss(logits), Math.log(2));
for (let i = 0; i < 3; i++)
  close(
    directional(
      softmaxLoss,
      logits,
      [0, 1, 2].map((j) => Number(i === j)),
    ),
    [1 / 3, 1 / 6, -1 / 2][i],
  );
console.log(
  `Math lesson worked examples: ${checks} numeric comparisons and Taylor error bounds passed.`,
);
