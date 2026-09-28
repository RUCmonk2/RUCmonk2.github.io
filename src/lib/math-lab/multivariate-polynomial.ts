import type { CheckResult } from "./factorization";
import {
  type QuadraticField,
  quadraticField,
  type Surd,
} from "./quadratic-surd";

type Polynomial = Map<string, Surd>;
type Expr =
  | { kind: "number"; value: Surd }
  | { kind: "variable"; name: string }
  | { kind: "neg"; value: Expr }
  | { kind: "add" | "sub" | "mul" | "div"; left: Expr; right: Expr }
  | { kind: "pow"; base: Expr; power: number };
const variables = ["x", "y", "z", "a", "b", "c"];
const constant = "0,0,0,0,0,0";
const isConstant = (p: Polynomial) =>
  p.size === 0 || (p.size === 1 && p.has(constant));
function setTerm(
  p: Polynomial,
  key: string,
  value: Surd,
  field: QuadraticField,
) {
  if (!field.isZero(value)) p.set(key, value);
  else p.delete(key);
  if (p.size > 128) throw new Error("展开项数过多，请简化式子。");
}
function parse(source: string, field: QuadraticField): Expr {
  if (source.length > 480) throw new Error("答案过长，请只输入分解后的式子。");
  const normalized = source
    .replace(/[×·]/g, "*")
    .replace(/[−–]/g, "-")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(
      /[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,
      (value) => "^" + [...value].map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)).join(""),
    )
    .replace(/\s/g, "")
    .toLowerCase()
    .replaceAll("sqrt", "√");
  if (!normalized) throw new Error("先填写因式，例如 (x-y)(x+y)。");
  const tokens = normalized.match(/\d+(?:\.\d+)?|[xyzabc]|[√()+\-*/^]/g) ?? [];
  if (tokens.join("") !== normalized)
    throw new Error(
      "请使用数字、x y z a b c、括号、√ 或 sqrt() 和 + - * / ^，不用输入等号。",
    );
  let pos = 0,
    depth = 0;
  const peek = () => tokens[pos];
  function atom(): Expr {
    if (++depth > 24) throw new Error("括号或符号层数过多，请简化书写。");
    const token = tokens[pos++];
    let result: Expr;
    if (variables.includes(token)) result = { kind: "variable", name: token };
    else if (token === "√") {
      const parenthesized = peek() === "(";
      if (parenthesized) pos++;
      const value = tokens[pos++];
      if (!value || !/^\d+$/.test(value) || value.length > 5)
        throw new Error("根号内请填非负整数，例如 sqrt(2) 或 √2。");
      if (parenthesized && tokens[pos++] !== ")")
        throw new Error("根号内只支持一个非负整数，例如 sqrt(2)。");
      result = { kind: "number", value: field.root(Number(value)) };
    } else if (token === "(") {
      result = sum();
      if (tokens[pos++] !== ")")
        throw new Error("括号没有配对，请检查左右括号。");
    } else if (token && /^\d/.test(token)) {
      if (token.length > 12) throw new Error("数字过大，请核对题目。");
      const [a, b = ""] = token.split(".");
      result = {
        kind: "number",
        value: field.number(BigInt(a + b), 10n ** BigInt(b.length)),
      };
    } else throw new Error("这里缺少数字、字母或一对括号。");
    depth--;
    return result;
  }
  function power(): Expr {
    const base = atom();
    if (peek() !== "^") return base;
    pos++;
    const exponent = tokens[pos++];
    if (!exponent || !/^[0-8]$/.test(exponent))
      throw new Error("请使用 0 到 8 的整数指数，例如 x^4。");
    return { kind: "pow", base, power: Number(exponent) };
  }
  function unary(): Expr {
    if (peek() !== "+" && peek() !== "-") return power();
    const sign = tokens[pos++];
    if (++depth > 24) throw new Error("括号或符号层数过多，请简化书写。");
    const value = unary();
    depth--;
    return sign === "-" ? { kind: "neg", value } : value;
  }
  function term(): Expr {
    let left = unary();
    while (
      peek() === "*" ||
      peek() === "/" ||
      peek() === "(" ||
      peek() === "√" ||
      variables.includes(peek()) ||
      /^\d/.test(peek() ?? "")
    ) {
      const token = peek();
      if (token === "*" || token === "/") pos++;
      left = { kind: token === "/" ? "div" : "mul", left, right: unary() };
    }
    return left;
  }
  function sum(): Expr {
    let left = term();
    while (peek() === "+" || peek() === "-") {
      const token = tokens[pos++];
      left = { kind: token === "+" ? "add" : "sub", left, right: term() };
    }
    return left;
  }
  const result = sum();
  if (pos !== tokens.length)
    throw new Error("式子未读完，请检查括号与运算符。");
  return result;
}
function evaluator(field: QuadraticField) {
  const { number: rational, add, mul, div, neg } = field;
  const scalar = (value: Surd): Polynomial =>
    new Map(field.isZero(value) ? [] : [[constant, value]]);
  const cache = new WeakMap<Expr, Polynomial>();
  let operations = 0;
  function times(a: Polynomial, b: Polynomial): Polynomial {
    const result: Polynomial = new Map();
    for (const [ka, va] of a)
      for (const [kb, vb] of b) {
        if (++operations > 60000)
          throw new Error("式子计算量过大，请用更简洁的因式形式。");
        const powers = ka
          .split(",")
          .map((n, i) => Number(n) + Number(kb.split(",")[i]));
        if (powers.reduce((s, n) => s + n, 0) > 12)
          throw new Error("本练习只接受总次数不超过 12 的多项式。");
        const key = powers.join(",");
        setTerm(
          result,
          key,
          add(result.get(key) ?? rational(0n), mul(va, vb)),
          field,
        );
      }
    return result;
  }
  function evaluate(expr: Expr): Polynomial {
    const cached = cache.get(expr);
    if (cached) return cached;
    let result: Polynomial;
    if (expr.kind === "number") result = scalar(expr.value);
    else if (expr.kind === "variable")
      result = new Map([
        [
          variables.map((v) => (v === expr.name ? 1 : 0)).join(","),
          rational(1n),
        ],
      ]);
    else if (expr.kind === "neg")
      result = new Map(
        [...evaluate(expr.value)].map(([key, value]) => [key, neg(value)]),
      );
    else if (expr.kind === "pow") {
      // Validate the base even for exponent zero. Cache before factor traversal.
      const base = evaluate(expr.base);
      result = scalar(rational(1n));
      for (let i = 0; i < expr.power; i++) result = times(result, base);
    } else {
      const a = evaluate(expr.left),
        b = evaluate(expr.right);
      if (expr.kind === "mul") result = times(a, b);
      else if (expr.kind === "div") {
        if (!isConstant(b))
          throw new Error("答案应为多项式，不能用含字母的式子作分母。");
        const divisor = b.get(constant) ?? rational(0n);
        const inverse = div(rational(1n), divisor);
        result = new Map(
          [...a].map(([key, value]) => [key, mul(value, inverse)]),
        );
      } else {
        result = new Map(a);
        for (const [key, value] of b)
          setTerm(
            result,
            key,
            add(
              result.get(key) ?? rational(0n),
              expr.kind === "sub" ? neg(value) : value,
            ),
            field,
          );
      }
    }
    cache.set(expr, result);
    return result;
  }
  function factors(expr: Expr): Polynomial[] {
    const value = evaluate(expr);
    if (isConstant(value)) return [];
    if (value.size === 1) {
      const powers = [...value.keys()][0].split(",").map(Number);
      return powers.flatMap((power, index) =>
        Array.from(
          { length: power },
          () =>
            new Map([
              [
                variables.map((_, i) => (i === index ? 1 : 0)).join(","),
                rational(1n),
              ],
            ]),
        ),
      );
    }
    if (expr.kind === "mul")
      return [...factors(expr.left), ...factors(expr.right)];
    if (expr.kind === "neg") return factors(expr.value);
    if (expr.kind === "pow")
      return Array.from({ length: expr.power }, () =>
        factors(expr.base),
      ).flat();
    if (expr.kind === "div") return factors(expr.left);
    return [value];
  }
  return { evaluate, factors };
}
function ordered(p: Polynomial) {
  return [...p].sort(([a], [b]) => {
    const pa = a.split(",").map(Number),
      pb = b.split(",").map(Number);
    const degree =
      pb.reduce((s, n) => s + n, 0) - pa.reduce((s, n) => s + n, 0);
    if (degree) return degree;
    for (let i = 0; i < variables.length; i++)
      if (pa[i] !== pb[i]) return pb[i] - pa[i];
    return 0;
  });
}
function monomial(key: string) {
  return key
    .split(",")
    .map((n, i) =>
      Number(n) === 0 ? "" : variables[i] + (Number(n) === 1 ? "" : "^" + n),
    )
    .join("");
}
function text(p: Polynomial, field: QuadraticField, latex = false) {
  return (
    ordered(p)
      .map(([key, value], i) => {
        const term = monomial(key),
          negative = field.sign(value) < 0;
        const magnitude = negative ? field.neg(value) : value;
        return (
          (negative ? "-" : i ? "+" : "") +
          (term && field.isOne(magnitude) ? "" : field.text(magnitude, latex)) +
          term
        );
      })
      .join("") || "0"
  );
}
function equal(a: Polynomial, b: Polynomial, field: QuadraticField) {
  return (
    a.size === b.size &&
    [...a].every(([key, v]) => {
      const w = b.get(key);
      return !!w && field.equal(v, w);
    })
  );
}
function signature(p: Polynomial, field: QuadraticField) {
  const entries = ordered(p),
    leading = entries[0][1];
  return entries
    .map(([key, value]) => key + ":" + field.text(field.div(value, leading)))
    .join(";");
}
/** Controlled generator expressions only; the parser also validates generated examples. */
export function expandPolynomial(source: string, radicand?: number) {
  const field = quadraticField(radicand);
  return text(evaluator(field).evaluate(parse(source, field)), field);
}
export function checkAdvancedFactorization(
  input: string,
  question: { expression: string; atoms: readonly string[]; radicand?: number },
): CheckResult {
  try {
    const field = quadraticField(question.radicand);
    const { number: rational } = field;
    const ast = parse(input, field),
      engine = evaluator(field),
      actual = engine.evaluate(ast),
      expected = engine.evaluate(parse(question.expression, field));
    const expanded = text(actual, field, true);
    if (!equal(actual, expected, field)) {
      const combined = new Map(expected);
      for (const [key, value] of actual)
        if (!combined.has(key)) combined.set(key, value);
      const key = ordered(combined).find(([key]) => {
        const a = actual.get(key) ?? rational(0n),
          b = expected.get(key) ?? rational(0n);
        return !field.equal(a, b);
      })![0];
      return {
        status: "incorrect",
        expanded,
        message: `展开后，${monomial(key) || "常数"}项的系数应为 ${field.text(expected.get(key) ?? rational(0n))}，你的结果是 ${field.text(actual.get(key) ?? rational(0n))}。请检查这一项的乘积与符号。`,
      };
    }
    // Generators supply irreducible factors over Q or the question’s Q(√d). Compare exact
    // polynomial factors modulo nonzero field units, never sampled values or
    // a degree heuristic. Products left inside a sum are still incomplete.
    const remaining = question.atoms.map((atom) =>
      signature(engine.evaluate(parse(atom, field)), field),
    );
    for (const factor of engine.factors(ast)) {
      const index = remaining.indexOf(signature(factor, field));
      if (index < 0)
        return {
          status: "incomplete",
          expanded,
          message:
            "式子相等，但还有一个括号可以继续分解。检查公因式、平方差或换元后的结构。",
        };
      remaining.splice(index, 1);
    }
    if (remaining.length)
      return {
        status: "incomplete",
        expanded,
        message: "式子相等，还需要把各个因式完整写出来。",
      };
    return {
      status: "correct",
      expanded,
      message: question.radicand
        ? "分解正确，根式计算完全相等，各因式已经不能继续分解。因式换序、根式化简和等价的常数倍写法都可以。"
        : "分解正确，已分解到有理系数范围内不可再分的因式。因式换序、相反数配对和等价的有理数倍写法都可以。",
    };
  } catch (error) {
    return {
      status: "invalid",
      message:
        error instanceof Error ? error.message : "暂时无法读取这个式子。",
    };
  }
}
