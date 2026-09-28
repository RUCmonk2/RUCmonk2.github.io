import assert from "node:assert/strict";

import { createJiti } from "jiti";
import katex from "katex";
const jiti = createJiti(import.meta.url);
const {
  checkFactorization,
  checkFactorizationBlanks,
  makeFactorQuestion,
  factorKinds,
  parseQuestionLink,
  questionHash,
} = await jiti.import("../src/lib/math-lab/factorization.ts");
const { factorStepSegments, factorLatex } = await jiti.import(
  "../src/lib/math-lab/math-text.ts",
);
const check = (input, coefficients, status) =>
  assert.equal(
    checkFactorization(input, coefficients).status,
    status,
    input + ": " + JSON.stringify(checkFactorization(input, coefficients)),
  );
check("(x+2)(x+3)", [6, 5, 1], "correct");
check("(x+3)*(x+2)", [6, 5, 1], "correct");
check("(-x-2)(-x-3)", [6, 5, 1], "correct");
check("2(x/2+1)(x+3)", [6, 5, 1], "correct");
check("(0.5x+1)(2x+6)", [6, 5, 1], "correct");
check("(x+1)(x+6)", [6, 5, 1], "incorrect");
check("x^2+5x+6", [6, 5, 1], "incomplete");
check("2(x^2+5x+6)", [12, 10, 2], "incomplete");
check("3x(2x+3)", [0, 9, 6], "correct");
check("4x^2(x-2)", [0, 0, -8, 4], "correct");
check("(x-4)^2", [16, -8, 1], "correct");
check("-(x-2)(x+2)", [4, 0, -1], "correct");
check("-x^2+4", [4, 0, -1], "incomplete");
check("(x^2-1)/(x-1)", [1, 1], "invalid");
check("1/0", [1], "invalid");
check("window.alert(1)", [1], "invalid");
check("x^99", [1], "invalid");
check("(x+2", [6, 5, 1], "invalid");
check("x/x", [1], "invalid");
check("(1/0)^0", [1], "invalid");
const checkBlanks = (values, coefficients, status) => {
  const [multiplier, a, b, c, d] = values;
  const result = checkFactorizationBlanks(
    {
      multiplier,
      factors: [
        { coefficient: a, constant: b },
        { coefficient: c, constant: d },
      ],
    },
    coefficients,
  );
  assert.equal(result.status, status, JSON.stringify({ values, result }));
};
checkBlanks(["1", "1", "2", "1", "3"], [6, 5, 1], "correct");
checkBlanks(["2", "1", "2", "1", "3"], [12, 10, 2], "correct");
checkBlanks(["1", "2", "4", "1", "3"], [12, 10, 2], "correct");
checkBlanks(["1", "1", "3", "2", "4"], [12, 10, 2], "correct");
checkBlanks(["1", "2", "1", "3", "2"], [2, 7, 6], "correct");
checkBlanks(["1", "1/2", "−1/2", "2", "6"], [-3, 2, 1], "correct");
checkBlanks(["1", "2", "2", "1", "3"], [12, 10, 2], "incorrect");
checkBlanks(["", "1", "2", "1", "3"], [12, 10, 2], "invalid");
checkBlanks(["2", "", "2", "1", "3"], [12, 10, 2], "invalid");
checkBlanks(["2", "1", "", "1", "3"], [12, 10, 2], "invalid");
checkBlanks(["1", "x", "2", "1", "3"], [6, 5, 1], "invalid");
checkBlanks(["1/0", "1", "2", "1", "3"], [6, 5, 1], "invalid");
const nested = (base, depth) =>
  Array.from({ length: depth }).reduce((value) => "(" + value + ")^6", base);
check(nested("2", 20), [1], "invalid");
check(nested("1", 20) + "(x+2)(x+3)", [6, 5, 1], "correct");
let generated = 0;
for (const kind of factorKinds)
  for (const level of [1, 2, 3])
    for (let seed = 0; seed < 150; seed++) {
      const q = makeFactorQuestion(seed, kind.id, level);
      assert.deepEqual(
        q,
        makeFactorQuestion(seed, kind.id, level),
        "deterministic question",
      );
      check(q.answer, q.coefficients, "correct");
      for (const text of [...q.hints, ...q.steps])
        for (const segment of factorStepSegments(text))
          if (segment.math)
            katex.renderToString(segment.value, {
              strict: "error",
              throwOnError: true,
              trust: false,
            });
      katex.renderToString(factorLatex(q.answer), {
        strict: "error",
        throwOnError: true,
      });
      const expanded = q.coefficients.map((c, i) => c + "*x^" + i).join("+");
      check(expanded, q.coefficients, "incomplete");
      assert.deepEqual(parseQuestionLink("#" + questionHash(q)), {
        seed,
        kind: kind.id,
        difficulty: level,
      });
      // Independent integer substitution checks the generator at five points.
      for (const x of [-3, -1, 0, 2, 7]) {
        const source = q.answer
          .replaceAll("^", "**")
          .replace(/(\d|x|\))(?=\(|x)/g, "$1*")
          .replaceAll("x", "(" + x + ")");
        // Only generated reference expressions are evaluated in this build-time test, never visitor input.
        const actual = Function("return (" + source + ")")();
        const expected = q.coefficients.reduce(
          (sum, c, i) => sum + c * x ** i,
          0,
        );
        assert.equal(actual + 0, expected + 0, "reference answer at x=" + x);
      }
      generated++;
    }
for (const hash of [
  "#q=-1&type=common&level=1",
  "#q=4294967296&type=square&level=2",
  "#q=1&type=unknown&level=1",
  "#q=1&type=square&level=5",
])
  assert.equal(parseQuestionLink(hash), null);
console.log(
  "Factor workshop verified: " +
    generated +
    " reproducible questions, exact rational answers, incomplete forms, invalid inputs, seed links and independent substitutions.",
);
