import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { createJiti } from "jiti";
import katex from "katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { coreStudy } = await jiti.import(
  "../src/data/learning/deep-learning-exam-core.ts",
);
const formulas = Object.values(coreStudy).flatMap((set) => set.formulas);
const exercises = Object.values(coreStudy).flatMap((set) => set.exercises);
assert.equal(formulas.length, 15);
assert.equal(exercises.length, 8);
const byId = Object.fromEntries(
  exercises.map((exercise) => [exercise.id, exercise]),
);
let numericChecks = 0;
const close = (actual, expected, tolerance = 2e-7) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} != ${expected}`,
  );
  numericChecks++;
};
const finiteGradient = (fn, params, step = 1e-5) =>
  params.map((_, i) => {
    const plus = [...params];
    const minus = [...params];
    plus[i] += step;
    minus[i] -= step;
    return (fn(plus) - fn(minus)) / (2 * step);
  });
const compareVector = (actual, expected) => {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, i) => close(value, expected[i]));
};
// Bind independently calculated values to the actual text that will be displayed.
function shown(id, value, digits, field = "answer") {
  const token = value.toFixed(digits);
  assert.ok(
    byId[id][field].includes(token),
    `${id}: displayed ${field} lacks ${token}`,
  );
  numericChecks++;
}

// Hinge: independently evaluate both active and inactive regions, including L2.
for (const [x, expectedLoss, expectedGradient] of [
  [[1, 2], 1.005, [-0.96, -2.02, -1]],
  [[10, 0], 0.005, [0.04, -0.02, 0]],
]) {
  const objective = ([a, b, bias]) =>
    Math.max(0, 1 - (a * x[0] + b * x[1] + bias)) + 0.1 * (a * a + b * b);
  close(objective([0.2, -0.1, 0]), expectedLoss);
  compareVector(finiteGradient(objective, [0.2, -0.1, 0]), expectedGradient);
  shown("core-ex-hinge", expectedLoss, 3);
  expectedGradient
    .slice(0, 2)
    .forEach((value) => shown("core-ex-hinge", value, 2));
}

// Gradient descent: derive gradients by central differences, then evaluate updates.
const regression = ([w, b]) => (2 * w + b - 3) ** 2 / 2;
const regressionGradient = finiteGradient(regression, [0, 0]);
compareVector(regressionGradient, [-6, -3]);
for (const [rate, expectedLoss, digits] of [
  [0.1, 1.125, 3],
  [1, 72, 0],
]) {
  const updated = regressionGradient.map((gradient) => -rate * gradient);
  close(regression(updated), expectedLoss);
  shown("core-ex-descent", regression(updated), digits);
}
close(Math.ceil(1000 / 128), 8);
close(1000 % 128, 104);
assert.ok(byId["core-ex-descent"].answer.includes("末批 104"));

// Softmax: numerical derivatives of the scalar loss with respect to six weights
// and three biases; no use of the p-y formula in this independent route.
const classify = (params) => {
  const logits = [0, 1, 2].map(
    (i) => params[2 * i] + 2 * params[2 * i + 1] + params[6 + i],
  );
  const max = Math.max(...logits);
  const exps = logits.map((value) => Math.exp(value - max));
  const denominator = exps.reduce((a, b) => a + b, 0);
  return {
    logits,
    probabilities: exps.map((value) => value / denominator),
    loss: Math.log(denominator) + max - logits[1],
  };
};
const initialClassify = Array(9).fill(0);
const classGradient = finiteGradient(
  (params) => classify(params).loss,
  initialClassify,
);
compareVector(classGradient, [
  1 / 3,
  2 / 3,
  -2 / 3,
  -4 / 3,
  1 / 3,
  2 / 3,
  1 / 3,
  -2 / 3,
  1 / 3,
]);
const updatedClassify = classify(
  classGradient.map((gradient) => -0.1 * gradient),
);
compareVector(updatedClassify.logits, [-0.2, 0.4, -0.2]);
shown("core-ex-softmax", updatedClassify.probabilities[1], 6);
shown("core-ex-softmax", updatedClassify.loss, 6);

// Six-weight BP: only a scalar objective, independently differentiated numerically.
const weights = [0.5, 1.5, 2.3, 3, 1, 1];
const prediction = (w) =>
  w[4] * (w[0] + 0.5 * w[1]) + w[5] * (w[2] + 0.5 * w[3]);
const networkLoss = (w) => (prediction(w) - 4) ** 2 / 2;
const networkGradient = finiteGradient(networkLoss, weights);
compareVector(networkGradient, [1.05, 0.525, 1.05, 0.525, 1.3125, 3.99]);
const updatedWeights = weights.map((w, i) => w - 0.1 * networkGradient[i]);
compareVector(updatedWeights, [0.395, 1.4475, 2.195, 2.9475, 0.86875, 0.601]);
close(prediction(updatedWeights), 3.1768328125);
close(networkLoss(updatedWeights), 0.3388021092883301);
shown("core-ex-six-weight", networkLoss(weights), 5);
// Decimal arithmetic from the displayed update, not noisy finite differences.
const exactStep = [0.395, 1.4475, 2.195, 2.9475, 0.86875, 0.601];
shown("core-ex-six-weight", prediction(exactStep), 10);
shown("core-ex-six-weight", networkLoss(exactStep), 10);

// Two-sample mean regression, plus the unaveraged weight regularizer.
const batchObjective = ([a, b, c]) =>
  ((a + 2 * b + c) ** 2 + (3 * a + 4 * b + c - 1) ** 2) / 4 +
  0.1 * (a * a + b * b);
const batchParameters = [1, -1, 0.5];
const batchGradient = finiteGradient(batchObjective, batchParameters);
compareVector(batchGradient, [-2.3, -3.7, -1]);
const batchUpdated = batchParameters.map(
  (value, i) => value - 0.1 * batchGradient[i],
);
compareVector(batchUpdated, [1.23, -0.63, 0.6]);
shown("core-ex-batch", batchObjective(batchParameters), 3);
shown("core-ex-batch", batchObjective(batchUpdated), 5);

// Activations and the sigmoid graph: central differences, including x as a variable.
close(finiteGradient(([z]) => Math.log1p(Math.exp(z)), [0])[0], 0.5);
close(finiteGradient(([z]) => Math.tanh(z), [0])[0], 1);
close(finiteGradient(([w]) => Math.max(0, 2 * w - 3), [1])[0], 0);
close(finiteGradient(([w]) => Math.max(0, 2 * w - 3), [2])[0], 2);
compareVector(
  finiteGradient(([w, b, x]) => 1 / (1 + Math.exp(-(w * x + b))), [0, 0, 1]),
  [0.25, 0.25, 0],
);
assert.ok(byId["core-ex-activation"].answer.includes("h'(1)=0"));
assert.ok(byId["core-ex-activation"].answer.includes("h'(2)=2"));
assert.ok(byId["core-ex-autodiff"].answer.includes("(-1/4,-1/4,-1/4)"));
assert.ok(
  byId["core-ex-autodiff"].answer.includes(
    "\\partial_wf=1/4,\\partial_bf=1/4,\\partial_xf=0",
  ),
);
assert.ok(byId["core-ex-generalization"].answer.startsWith("选 A"));

// Parse every math fragment through the same Markdown math conventions, then KaTeX.
let mathCount = 0;
const parser = unified().use(remarkParse).use(remarkMath);
function checkMarkdown(text, label) {
  function walk(node) {
    if (node.type === "math" || node.type === "inlineMath") {
      assert.doesNotThrow(
        () =>
          katex.renderToString(node.value, {
            throwOnError: true,
            displayMode: node.type === "math",
            strict: "error",
          }),
        `${label}: ${node.value}`,
      );
      mathCount++;
    }
    node.children?.forEach(walk);
  }
  walk(parser.parse(text));
}
const figures = new Set();
for (const record of [...formulas, ...exercises]) {
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") checkMarkdown(value, `${record.id}.${key}`);
  }
  if (record.figure) {
    figures.add(record.figure.src);
    assert.ok(
      existsSync(
        fileURLToPath(
          new URL(`../public${record.figure.src}`, import.meta.url),
        ),
      ),
      record.figure.src,
    );
  }
}
assert.equal(figures.size, 4);
console.log(
  `Core review: ${formulas.length} formulas, ${exercises.length} exercises, ${figures.size} SVG figures; ${numericChecks} independent numeric/content checks and ${mathCount} KaTeX fragments passed.`,
);
