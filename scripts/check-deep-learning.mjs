import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const {
  evaluateBackprop,
  initialBackpropWeights,
  stepBackprop,
  canDisplayBackprop,
} = await jiti.import("../src/lib/math-lab/backprop.ts");
const { deepLearningWeek4Chapters } = await jiti.import(
  "../src/data/learning/deep-learning-week4.ts",
);
const close = (a, b, epsilon = 1e-8) =>
  assert(Math.abs(a - b) < epsilon, `${a} != ${b}`);
const vectorClose = (a, b, epsilon) => {
  assert.equal(a.length, b.length);
  a.forEach((value, i) => close(value, b[i], epsilon));
};
// Fixed independent lesson fixtures: output, six gradients, and a simultaneous step.
const initial = Object.freeze(initialBackpropWeights("linear"));
const forward = evaluateBackprop(initial, "linear");
vectorClose(forward.h, [1.25, 3.8]);
close(forward.prediction, 5.05);
close(forward.loss, 0.55125);
vectorClose(forward.gradients, [1.05, 0.525, 1.05, 0.525, 1.3125, 3.99]);
const updated = stepBackprop(initial, "linear", 0.1);
vectorClose(updated, [0.395, 1.4475, 2.195, 2.9475, 0.86875, 0.601]);
close(evaluateBackprop(updated, "linear").prediction, 3.1768328125);
close(evaluateBackprop(updated, "linear").loss, 0.3388021092883301);
vectorClose(stepBackprop(initial, "linear", 0), initial);
// Independent scalar loss; checks multiple signs and both ReLU branches away from kinks.
function loss(w, relu) {
  const activate = (x) => (relu ? Math.max(0, x) : x);
  return (
    (w[4] * activate(w[0] + w[1] / 2) + w[5] * activate(w[2] + w[3] / 2) - 4) **
      2 /
    2
  );
}
for (const scenario of ["linear", "relu"]) {
  for (const weights of [
    initialBackpropWeights(scenario),
    [0.7, -0.2, -1.2, 0.3, -0.4, 0.8],
    [-0.5, -0.7, -0.6, -0.4, 1.1, -0.3],
  ]) {
    const result = evaluateBackprop(weights, scenario);
    result.gradients.forEach((gradient, i) => {
      const plus = [...weights],
        minus = [...weights];
      plus[i] += 1e-5;
      minus[i] -= 1e-5;
      close(
        gradient,
        (loss(plus, scenario === "relu") - loss(minus, scenario === "relu")) /
          2e-5,
      );
    });
  }
}
const gated = evaluateBackprop(initialBackpropWeights("relu"), "relu");
vectorClose(gated.gates, [0, 1]);
vectorClose(
  [gated.gradients[0], gated.gradients[1], gated.gradients[4]],
  [0, 0, 0],
);
vectorClose(
  evaluateBackprop([0, 0, 0, 0, 1, 1], "relu").gradients,
  [0, 0, 0, 0, 0, 0],
);
assert.throws(() => stepBackprop(initial, "linear", NaN));
assert.throws(() => stepBackprop(initial, "linear", -0.1));
assert.throws(() => evaluateBackprop([1, 2], "linear"));
assert.throws(() => evaluateBackprop([Infinity, 0, 0, 0, 0, 0], "linear"));
assert(!canDisplayBackprop([1e9, 1e9, 1, 1, 1, 1], "linear"));
assert(!canDisplayBackprop([NaN, 0, 0, 0, 0, 0], "linear"));
// Mean loss + L2: independent finite differences include the bias broadcast.
const batchObjective = ([a, b, c]) => {
  const residuals = [
    [1, 2, 0],
    [3, 4, 1],
  ].map(([x, y, target]) => a * x + b * y + c - target);
  return (
    residuals.reduce((sum, value) => sum + (value * value) / 4, 0) +
    0.1 * (a * a + b * b)
  );
};
const params = [1, -1, 0.5];
close(batchObjective(params), 0.825);
const batchGradient = params.map((_, i) => {
  const plus = [...params],
    minus = [...params];
  plus[i] += 1e-5;
  minus[i] -= 1e-5;
  return (batchObjective(plus) - batchObjective(minus)) / 2e-5;
});
vectorClose(batchGradient, [-2.3, -3.7, -1]);
close(
  batchObjective(params.map((value, i) => value - 0.1 * batchGradient[i])),
  0.42043,
);
// Sigmoid graph: retain negative sensitivities until the negation node.
const localDerivativesReverse = [-0.25, 1, 1, -1, 1];
const sensitivities = [1];
for (const derivative of localDerivativesReverse)
  sensitivities.push(sensitivities.at(-1) * derivative);
vectorClose(sensitivities, [1, -0.25, -0.25, -0.25, 0.25, 0.25]);
const sigmoid = (w, b) => 1 / (1 + Math.exp(-(w + b)));
close((sigmoid(1e-5, 0) - sigmoid(-1e-5, 0)) / 2e-5, 0.25);
close((sigmoid(0, 1e-5) - sigmoid(0, -1e-5)) / 2e-5, 0.25);
const jacobian = [
    [4, 1],
    [3, 2],
  ],
  v = [1, -1],
  u = [1, 2];
vectorClose(
  jacobian.map((row) => row.reduce((sum, x, i) => sum + x * v[i], 0)),
  [3, 1],
);
vectorClose(
  [0, 1].map((i) => jacobian.reduce((sum, row, j) => sum + row[i] * u[j], 0)),
  [10, 5],
);
// Execute the exact published Python snippet, not a handwritten duplicate.
const chapter = deepLearningWeek4Chapters.find(
  (c) => c.id === "gradient-check",
);
const snippets = [...chapter.body.matchAll(/```python\n([\s\S]*?)```/g)];
assert.equal(snippets.length, 1);
const output = execFileSync("python3", ["-"], {
  input: snippets[0][1],
  encoding: "utf8",
  timeout: 10000,
});
assert.equal(output.trim().split("\n").length, 6);
assert.equal(deepLearningWeek4Chapters.length, 7);
const checks = deepLearningWeek4Chapters.reduce(
  (sum, c) => sum + c.checks.length,
  0,
);
assert.equal(checks, 25);
console.log(
  `Deep learning checked: six-weight finite differences, simultaneous update, ReLU gates, batch averaging + L2, sigmoid signs, JVP/VJP, published Python snippet; ${checks} week-four self-checks.`,
);
