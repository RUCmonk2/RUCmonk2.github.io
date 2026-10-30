import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import katex from "katex";

const read = (name) =>
  JSON.parse(
    readFileSync(
      new URL(
        `../src/data/physics-midterm/mock-exam/${name}.json`,
        import.meta.url,
      ),
      "utf8",
    ),
  );
const questions = [...read("mcq").questions, ...read("written").questions];
assert.deepEqual(
  questions.map((question) => question.id),
  Array.from({ length: 20 }, (_, index) => index + 1),
);
assert.equal(
  questions.reduce((sum, question) => sum + question.points, 0),
  100,
);
for (const [type, count, total] of [
  ["single", 12, 36],
  ["multiple", 4, 16],
  ["experiment", 1, 12],
  ["written", 3, 36],
]) {
  const group = questions.filter((question) => question.type === type);
  assert.equal(group.length, count, `${type} count`);
  assert.equal(
    group.reduce((sum, question) => sum + question.points, 0),
    total,
    `${type} points`,
  );
}
const diagramSource = readFileSync(
  new URL("../src/components/physics/mock-exam-diagram.tsx", import.meta.url),
  "utf8",
);
const supportedDiagrams = new Set(
  [...diagramSource.matchAll(/case "([^"]+)"/g)].map((match) => match[1]),
);
let formulas = 0;
function checkText(text, label) {
  assert.equal(typeof text, "string", label);
  assert.ok(
    !Array.from(text).some(
      (char) =>
        char.charCodeAt(0) < 32 && ![9, 10, 13].includes(char.charCodeAt(0)),
    ),
    `${label} contains control characters`,
  );
  assert.equal(
    (text.match(/(?<!\\)\$/g) || []).length % 2,
    0,
    `${label} has unpaired math delimiters`,
  );
  for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)) {
    katex.renderToString(match[1] ?? match[2], {
      throwOnError: true,
      strict: "error",
      trust: false,
    });
    formulas++;
  }
}
for (const question of questions) {
  for (const field of ["prompt", "title", "topic", "pitfall", "difficulty"])
    checkText(question[field], `${question.id}:${field}`);
  question.analysis.forEach((text) =>
    checkText(text, `${question.id}:analysis`),
  );
  if (question.diagram !== "none")
    assert.ok(
      supportedDiagrams.has(question.diagram),
      `Missing diagram ${question.diagram}`,
    );
  if (question.table) {
    for (const row of question.table.rows)
      assert.equal(
        row.length,
        question.table.headers.length,
        `${question.id}: table width`,
      );
    [...question.table.headers, ...question.table.rows.flat()].forEach((text) =>
      checkText(text, `${question.id}: table`),
    );
  }
  if (question.options) {
    assert.deepEqual(Object.keys(question.options), ["A", "B", "C", "D"]);
    assert.ok(/^[A-D]+$/.test(question.answer));
    assert.equal(new Set(question.answer).size, question.answer.length);
    if (question.type === "single") assert.equal(question.answer.length, 1);
    else assert.ok(question.answer.length >= 2);
    Object.values(question.options).forEach((text) =>
      checkText(text, `${question.id}:option`),
    );
  } else {
    assert.equal(
      question.parts.reduce((sum, part) => sum + part.points, 0),
      question.points,
      `${question.id}: part points`,
    );
    for (const part of question.parts) {
      assert.equal(
        part.rubric.reduce((sum, item) => sum + item.points, 0),
        part.points,
        `${question.id}(${part.label}): rubric points`,
      );
      [
        part.question,
        part.answer,
        ...part.steps,
        ...part.rubric.map((item) => item.criterion),
      ].forEach((text) => checkText(text, `${question.id}(${part.label})`));
    }
  }
}
console.log(
  `Physics mock exam: 20 questions / 100 points; every part and rubric balanced; ${formulas} strict formulas; all referenced diagrams available.`,
);
