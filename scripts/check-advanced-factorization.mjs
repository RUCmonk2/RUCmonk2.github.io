import assert from "node:assert/strict";

import { createJiti } from "jiti";
import katex from "katex";

const jiti = createJiti(import.meta.url);
const {
  makeFactorQuestion,
  checkFactorQuestion,
  checkAdvancedBlanks,
  questionHash,
  parseQuestionLink,
} = await jiti.import("../src/lib/math-lab/factorization.ts");
const { advancedFactorKinds } = await jiti.import(
  "../src/lib/math-lab/advanced-factorization.ts",
);
const { checkAdvancedFactorization, expandPolynomial } = await jiti.import(
  "../src/lib/math-lab/multivariate-polynomial.ts",
);
const { factorLatex, factorStepSegments } = await jiti.import(
  "../src/lib/math-lab/math-text.ts",
);
function check(input, expression, atoms, status, radicand) {
  const result = checkAdvancedFactorization(input, {
    expression,
    atoms,
    radicand,
  });
  assert.equal(result.status, status, `${input}: ${JSON.stringify(result)}`);
  return result;
}
const cube = ["x^3-8", ["x-2", "x^2+2x+4"]];
check("(x-2)(x^2+2x+4)", ...cube, "correct");
check("(4+2x+x^2)(x/2-1)*2", ...cube, "correct");
check("(-x+2)(-x^2-2x-4)", ...cube, "correct");
check("x^3-8", ...cube, "incomplete");
check("(x-2)(x^2-2x+4)", ...cube, "incorrect");
check("(x^2-1)(x^2+2)", "x^4+x^2-2", ["x-1", "x+1", "x^2+2"], "incomplete");
check("(x-1)(x+1)(x^2+2)", "x^4+x^2-2", ["x-1", "x+1", "x^2+2"], "correct");
check("(x^2+1)^3", "x^6+3x^4+3x^2+1", ["x^2+1", "x^2+1", "x^2+1"], "correct");
check(
  "(x²+1)(x⁴+2x²+1)",
  "x^6+3x^4+3x^2+1",
  ["x^2+1", "x^2+1", "x^2+1"],
  "incomplete",
);
check("3x^2y(x-2y)", "3x^3y-6x^2y^2", ["x", "x", "y", "x-2y"], "correct");
check("xy(3x^2-6xy)", "3x^3y-6x^2y^2", ["x", "x", "y", "x-2y"], "incomplete");
check("(2x+3y)(3x-y)", "6x^2+7xy-3y^2", ["2x+3y", "3x-y"], "correct");
check("(2x-3y)(3x+y)", "6x^2+7xy-3y^2", ["2x+3y", "3x-y"], "incorrect");
check("(a+b-2c)(a+b+2c)", "a^2+2ab+b^2-4c^2", ["a+b-2c", "a+b+2c"], "correct");
check("(x+y)^2", "x^2+2xy+y^2", ["x+y", "x+y"], "correct");
check("(x-y)(x+y)", "x^2+2xy+y^2", ["x+y", "x+y"], "incorrect");
for (const source of [
  "1/0",
  "0/0",
  "x/y",
  "(x^2-y^2)/(x-y)",
  "(1/0)^0",
  "(x+1",
  "x^99",
  "alert(1)",
  "x=y",
  "(x+y+z+a+b+c)^8",
  "x^8*x^8",
])
  check(source, ...cube, "invalid");
const nested = (source) =>
  Array.from({ length: 20 }).reduce((s) => `(${s})^8`, source);
check(nested("1") + "(x-2)(x^2+2x+4)", ...cube, "correct");
check(nested("2"), ...cube, "invalid");
assert.equal(expandPolynomial("(x+y+z)(x-y-z)"), "x^2-y^2-2yz-z^2");
assert.equal(expandPolynomial("(2a-3b)(a+b)"), "2a^2-ab-3b^2");
// Same values on x=y would hide this error; exact monomial comparison must not.
check("(x+y)(x-y)", "x^2+xy-2y^2", ["x+2y", "x-y"], "incorrect");
const blankQuestion = {
  ...makeFactorQuestion(1, "multi-quadratic", 1),
  expression: "6x^2+7xy-3y^2",
  advanced: { atoms: ["2x+3y", "3x-y"], slots: 2, variables: ["x", "y"] },
};
assert.equal(
  checkAdvancedBlanks(["3x-y", "2x+3y"], blankQuestion).status,
  "correct",
);
assert.equal(
  checkAdvancedBlanks(["3x-y", ""], blankQuestion).status,
  "invalid",
);
assert.equal(checkAdvancedBlanks(["3x-y"], blankQuestion).status, "invalid");

const radical = ["x^2-2", ["x-sqrt(2)", "x+sqrt(2)"]];
for (const answer of [
  "(x-√2)(x+sqrt(2))",
  "(x-√8/2)(x+√18/3)",
  "(sqrt(2)x-2)(x/sqrt(2)+1)",
  "(x-√2)/(√2-1)*(x+√2)/(√2+1)",
])
  check(answer, ...radical, "correct", 2);
check("(x-1.41421356)(x+1.41421356)", ...radical, "incorrect", 2);
check("x^2-2", ...radical, "incomplete", 2);
check("(x-√3)(x+√3)", ...radical, "invalid", 2);
for (const invalid of [
  "(x-√2)(x+√2)/(√8-2√2)",
  "sqrt(x)",
  "√(-2)",
  "sqrt(2+0)",
  "√10001",
  "sqrt(2.0)",
  "(x-√2)(x+√2)/x",
])
  check(invalid, ...radical, "invalid", 2);
check("(x-√2)(x+√2)", ...radical, "invalid");
check("(x-√4)(x+√4)", "x^2-4", ["x-2", "x+2"], "correct");
check(
  "(x^2-2y^2)(x^2+2y^2)",
  "x^4-4y^4",
  ["x-√2y", "x+√2y", "x^2+2y^2"],
  "incomplete",
  2,
);
check(
  "(x-√2y)(x+√2y)(x^2+2y^2)",
  "x^4-4y^4",
  ["x-√2y", "x+√2y", "x^2+2y^2"],
  "correct",
  2,
);
assert.equal(
  expandPolynomial("(√2x+3y)(x-√2y)", 2),
  "sqrt(2)x^2+xy-3sqrt(2)y^2",
);
assert.equal(expandPolynomial("1/(√2-1)", 2), "(1+sqrt(2))");
assert.equal(expandPolynomial("(√2-2)x", 2), "-(2-sqrt(2))x");
assert.equal(expandPolynomial("(√2-1)x", 2), "(-1+sqrt(2))x");
const rootQuestion = makeFactorQuestion(0, "radical-difference", 1);
assert.equal(
  checkAdvancedBlanks(["x-√2", "x+sqrt(2)"], rootQuestion).status,
  "correct",
);
assert(
  factorStepSegments("先用 (sqrt(2))^2=2。").some(
    (p) => p.math && p.value.includes("\\sqrt{2}"),
  ),
);

function substituteGenerated(source, point) {
  // Only generator-owned expressions, never visitor input, enter this independent test evaluator.
  source = source.replace(
    /sqrt\((\d+)\)/g,
    (_, n) => `(${Math.sqrt(Number(n))})`,
  );
  assert(/^[xyzabc0-9+\-*/^().]+$/.test(source));
  const js = source
    .replaceAll("^", "**")
    .replace(/([0-9xyzabc)])(?=[xyzabc(])/g, "$1*")
    .replace(/[xyzabc]/g, (v) => `(${point[v]})`);
  return Function(`return (${js})`)();
}
let count = 0;
const families = new Set(),
  degrees = new Set();
for (const kind of advancedFactorKinds)
  for (const level of [1, 2, 3])
    for (let seed = 0; seed < 100; seed++) {
      const q = makeFactorQuestion(seed, kind.id, level);
      assert.deepEqual(q, makeFactorQuestion(seed, kind.id, level));
      assert.equal(
        checkFactorQuestion(q.answer, q).status,
        "correct",
        JSON.stringify(q),
      );
      assert.equal(
        checkFactorQuestion(q.expression, q).status,
        "incomplete",
        JSON.stringify(q),
      );
      assert.deepEqual(parseQuestionLink("#" + questionHash(q)), {
        seed,
        kind: kind.id,
        difficulty: level,
      });
      assert(q.advanced.atoms.length >= 2);
      families.add(q.advanced.variables.join(""));
      for (const exponent of q.expression.matchAll(/\^(\d+)/g))
        degrees.add(Number(exponent[1]));
      for (const source of [q.expression, q.answer, ...q.hints, ...q.steps]) {
        const segments =
          source === q.expression || source === q.answer
            ? [{ math: true, value: factorLatex(source) }]
            : factorStepSegments(source);
        for (const part of segments)
          if (part.math)
            katex.renderToString(part.value, {
              strict: "error",
              throwOnError: true,
              trust: false,
            });
      }
      for (const point of [
        { x: 0, y: 0, z: 0, a: 0, b: 0, c: 0 },
        { x: 1, y: 2, z: -3, a: 2, b: -1, c: 3 },
        { x: -2, y: 3, z: 1, a: -1, b: 4, c: 2 },
        { x: 3, y: -1, z: 2, a: 3, b: 2, c: -2 },
        { x: 2, y: 0, z: -1, a: 0, b: 3, c: 1 },
      ]) {
        const answerValue = substituteGenerated(q.answer, point);
        const expressionValue = substituteGenerated(q.expression, point);
        assert(
          Math.abs(answerValue - expressionValue) <=
            1e-10 *
              Math.max(1, Math.abs(answerValue), Math.abs(expressionValue)),
          JSON.stringify(q),
        );
      }
      // Reordering and redistributing scalar units do not change completeness.
      const shuffled = q.advanced.atoms
        .slice()
        .reverse()
        .map((p) => `(${p})`)
        .join("");
      const unitAnswer = `2(${q.answer})/2`;
      assert.equal(checkFactorQuestion(unitAnswer, q).status, "correct");
      assert.equal(
        checkAdvancedFactorization(shuffled, {
          expression: expandPolynomial(shuffled, q.advanced.radicand),
          radicand: q.advanced.radicand,
          atoms: q.advanced.atoms,
        }).status,
        "correct",
      );
      count++;
    }
assert(degrees.has(3) && degrees.has(4) && degrees.has(6));
assert(
  [...families].some((v) => v.includes("z")) &&
    [...families].some((v) => v.includes("c")),
);
console.log(
  `Advanced factorization verified: ${count} seeded questions, exact multivariate and radical comparisons, complete vs partial factors, six-degree examples, variable denominators, complexity limits and independent substitutions.`,
);
