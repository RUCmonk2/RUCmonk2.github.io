import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { createJiti } from "jiti";
import katex from "katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { sequenceStudy, sequenceChapters } = await jiti.import(
  "../src/data/learning/deep-learning-exam-sequence.ts",
);
const parser = unified().use(remarkParse).use(remarkMath);
let mathCount = 0;
const figurePaths = new Set();
function visit(node, label) {
  if (node.type === "math" || node.type === "inlineMath") {
    katex.renderToString(node.value, {
      displayMode: node.type === "math",
      strict: "error",
      throwOnError: true,
    });
    mathCount++;
  }
  if (node.type === "text")
    assert(
      !/\\(?:frac|nabla|sum|partial|delta)|\b[a-zA-Z]_[a-zA-Z0-9]/.test(
        node.value,
      ),
      `${label}: raw formula ${node.value}`,
    );
  for (const child of node.children ?? []) visit(child, label);
}
for (const chapter of sequenceChapters) {
  assert(sequenceStudy[chapter.id]);
  visit(parser.parse(chapter.body), chapter.id);
}
const exercises = new Map();
let formulaCount = 0;
for (const [chapter, set] of Object.entries(sequenceStudy)) {
  formulaCount += set.formulas.length;
  for (const item of [...set.formulas, ...set.exercises]) {
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string")
        visit(parser.parse(value), `${chapter}/${item.id}/${key}`);
    }
    if (item.figure) figurePaths.add(item.figure.src);
  }
  for (const fig of set.figures ?? []) figurePaths.add(fig.src);
  for (const item of set.exercises) {
    assert(!exercises.has(item.id));
    exercises.set(item.id, item);
  }
}
assert.equal(formulaCount, 12);
assert.equal(exercises.size, 8);
assert.equal(figurePaths.size, 8);
for (const src of figurePaths) {
  const xml = await readFile(
    new URL(`../public${src}`, import.meta.url),
    "utf8",
  );
  assert(xml.includes("<title") && xml.includes("<desc"), src);
}

let numericalChecks = 0;
const close = (actual, expected, epsilon = 1e-8) => {
  assert(Math.abs(actual - expected) < epsilon, `${actual} != ${expected}`);
  numericalChecks++;
};
const vecClose = (a, b) => {
  assert.equal(a.length, b.length);
  a.forEach((v, i) => close(v, b[i]));
};
const answerHas = (id, fragments) => {
  const answer = exercises.get(id).answer;
  for (const fragment of fragments)
    assert(answer.includes(fragment), `${id}: ${fragment}`);
};
// Enumerate windows directly; independent of the displayed closed-form dimensions.
function convolve(input, kernel, stride) {
  const output = [];
  for (let r = 0; r + kernel.length <= input.length; r += stride) {
    const row = [];
    for (let c = 0; c + kernel[0].length <= input[0].length; c += stride) {
      let sum = 0;
      for (let u = 0; u < kernel.length; u++)
        for (let v = 0; v < kernel[0].length; v++)
          sum += input[r + u][c + v] * kernel[u][v];
      row.push(sum);
    }
    output.push(row);
  }
  return output;
}
const input = [
  [1, 2, 0],
  [0, 1, 3],
  [2, 1, 0],
];
const kernel = [
  [1, -1],
  [0, 2],
];
vecClose(convolve(input, kernel, 1).flat(), [1, 8, 1, -2]);
vecClose(convolve(input, kernel, 2).flat(), [1]);
answerHas("conv-window-practice", ["1&8", "1&-2", "唯一值为1"]);
const starts = [];
for (let i = 0; i + 3 <= 32 + 2; i += 2) starts.push(i);
close(starts.length, 16);
close(8 * (3 * 9 + 1), 224);
close(16 / 2, 8);
close(Math.max(1, 3, 2, 0), 3);
close([1, 3, 2, 0].reduce((a, b) => a + b) / 4, 1.5);
answerHas("conv-size-practice", ["16", "224", "参数0", "均值1.5"]);
close(192 * 32 * 25, 153600);
close(192 * 16 + 16 * 32 * 25, 15872);
close(192 * 32 * 25 + 32, 153632);
close(192 * 16 + 16 * 32 * 25 + 16 + 32, 15920);
answerHas("cnn-bottleneck-practice", [
  "153,600",
  "15,872",
  "153,632",
  "15,920",
]);
close((1 + 2) * 3, 9);
close(16 + 24 + 32 + 8, 80);
answerHas("cnn-residual-practice", ["9", "80"]);
close(4 * 3 + 4 * 4 + 4 + 2 * 4 + 2, 42);
answerHas("rnn-forward-practice", ["2.5", "42"]);
// Differentiate an independently unrolled scalar objective by central differences.
const loss = ([u, w]) => {
  const h1 = w;
  const h2 = u * h1 + 2 * w;
  return (h2 - 1) ** 2 / 2;
};
const parameters = [0.5, 1];
close(loss(parameters), 1.125);
for (const [i, expected] of [
  [0, 1.5],
  [1, 3.75],
]) {
  const plus = [...parameters],
    minus = [...parameters];
  plus[i] += 1e-5;
  minus[i] -= 1e-5;
  close((loss(plus) - loss(minus)) / 2e-5, expected);
}
close(0.5 * 1.5, 0.75);
answerHas("bptt-practice", ["1.125", "0.75", "3.75", "1.5"]);
const cNext = 0.5 * 2 + 0.25 * -0.4;
close(cNext, 0.9);
close(0.8 * Math.tanh(cNext), 0.5730382961592195);
answerHas("lstm-practice", ["0.9", "0.573038", "0.5"]);
const gruNext = (z) => (1 - z) * 0.6 + z * -0.2;
vecClose([gruNext(0.25), gruNext(0), gruNext(1)], [0.4, 0.6, -0.2]);
close((gruNext(0.25 + 1e-5) - gruNext(0.25 - 1e-5)) / 2e-5, -0.8);
const group = 4 * (3 + 4 + 1);
vecClose([group, 4 * group, 3 * group], [32, 128, 96]);
answerHas("gru-practice", ["0.4", "0.6", "−0.2", "32", "128", "96"]);
close(0.5 ** 10, 1 / 1024);
close(2 ** 10, 1024);
console.log(
  `CNN/RNN checked: 5 chapters, ${formulaCount} formula groups, ${exercises.size} exercises, ${figurePaths.size} SVGs, ${mathCount} math expressions, ${numericalChecks} independent numerical checks.`,
);
