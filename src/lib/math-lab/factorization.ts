export type Fraction = { n: bigint; d: bigint };
export type Polynomial = Fraction[];
type Expr =
  | { kind: "number"; value: Fraction }
  | { kind: "x" }
  | { kind: "neg"; value: Expr }
  | { kind: "add" | "sub" | "mul" | "div"; left: Expr; right: Expr }
  | { kind: "pow"; base: Expr; power: number };
const abs = (x: bigint) => (x < 0n ? -x : x);
function gcd(a: bigint, b: bigint): bigint {
  a = abs(a);
  b = abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}
function rational(n: bigint, d = 1n): Fraction {
  if (!d) throw new Error("除数不能为零。");
  if (abs(n).toString(2).length > 1024 || abs(d).toString(2).length > 1024)
    throw new Error("中间计算的数字过大，请简化式子后再输入。");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
const zero = () => rational(0n);
const add = (a: Fraction, b: Fraction) =>
  rational(a.n * b.d + b.n * a.d, a.d * b.d);
const neg = (a: Fraction) => rational(-a.n, a.d);
const mul = (a: Fraction, b: Fraction) => rational(a.n * b.n, a.d * b.d);
const div = (a: Fraction, b: Fraction) => rational(a.n * b.d, a.d * b.n);
function trim(p: Polynomial) {
  while (p.length > 1 && !p[p.length - 1].n) p.pop();
  return p;
}
function plus(a: Polynomial, b: Polynomial, subtract = false) {
  return trim(
    Array.from({ length: Math.max(a.length, b.length) }, (_, i) =>
      add(a[i] ?? zero(), subtract ? neg(b[i] ?? zero()) : (b[i] ?? zero())),
    ),
  );
}
function times(a: Polynomial, b: Polynomial) {
  if (a.length + b.length > 10)
    throw new Error("这道练习只需要低次多项式，请检查指数。");
  const p = Array.from({ length: a.length + b.length - 1 }, zero);
  a.forEach((x, i) =>
    b.forEach((y, j) => (p[i + j] = add(p[i + j], mul(x, y)))),
  );
  return trim(p);
}
function evaluate(expr: Expr): Polynomial {
  if (expr.kind === "number") return [expr.value];
  if (expr.kind === "x") return [zero(), rational(1n)];
  if (expr.kind === "neg") return evaluate(expr.value).map(neg);
  if (expr.kind === "pow") {
    const base = evaluate(expr.base);
    let p = [rational(1n)];
    for (let i = 0; i < expr.power; i++) p = times(p, base);
    return p;
  }
  const a = evaluate(expr.left),
    b = evaluate(expr.right);
  if (expr.kind === "add" || expr.kind === "sub")
    return plus(a, b, expr.kind === "sub");
  if (expr.kind === "mul") return times(a, b);
  if (b.length !== 1)
    throw new Error("本练习的答案只接受多项式，不能用含 x 的式子作分母。");
  return trim(a.map((value) => div(value, b[0])));
}
function parse(source: string): Expr {
  if (source.length > 240) throw new Error("答案过长，请只输入分解后的式子。");
  const normalized = source
    .replace(/[×·]/g, "*")
    .replace(/[−–]/g, "-")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/\s/g, "")
    .toLowerCase();
  if (!normalized) throw new Error("先输入一个式子，例如 (x+2)(x+3)。");
  const tokens = normalized.match(/\d+(?:\.\d+)?|x|[()+\-*/^]/g) ?? [];
  if (tokens.join("") !== normalized)
    throw new Error("请使用数字、x、括号和 + - * / ^；不用输入等号。");
  let pos = 0,
    depth = 0;
  const peek = () => tokens[pos];
  function atom(): Expr {
    if (++depth > 24) throw new Error("括号层数过多，请简化书写。");
    let value: Expr;
    const token = tokens[pos++];
    if (token === "x") value = { kind: "x" };
    else if (token === "(") {
      value = sum();
      if (tokens[pos++] !== ")")
        throw new Error("括号没有配对，请检查左右括号。");
    } else if (token && /^\d/.test(token)) {
      if (token.length > 12) throw new Error("数字过大，请核对题目。");
      const [a, b = ""] = token.split(".");
      value = {
        kind: "number",
        value: rational(BigInt(a + b), 10n ** BigInt(b.length)),
      };
    } else throw new Error("这里缺少数字、x 或一对括号。");
    depth--;
    return value;
  }
  function power(): Expr {
    let value = atom();
    if (peek() === "^") {
      pos++;
      const token = tokens[pos++];
      if (!token || !/^[0-6]$/.test(token))
        throw new Error("本练习只接受 0 到 6 的整数指数。");
      value = { kind: "pow", base: value, power: Number(token) };
    }
    return value;
  }
  function unary(): Expr {
    if (peek() === "+" || peek() === "-") {
      const sign = tokens[pos++];
      if (++depth > 24) throw new Error("符号过多，请简化书写。");
      const value = unary();
      depth--;
      return sign === "-" ? { kind: "neg", value } : value;
    }
    return power();
  }
  function term(): Expr {
    let value = unary();
    while (
      peek() === "*" ||
      peek() === "/" ||
      peek() === "x" ||
      peek() === "(" ||
      /^\d/.test(peek() ?? "")
    ) {
      const token = peek(),
        explicit = token === "*" || token === "/";
      if (explicit) pos++;
      value = {
        kind: token === "/" ? "div" : "mul",
        left: value,
        right: unary(),
      };
    }
    return value;
  }
  function sum(): Expr {
    let value = term();
    while (peek() === "+" || peek() === "-") {
      const token = tokens[pos++];
      value = {
        kind: token === "+" ? "add" : "sub",
        left: value,
        right: term(),
      };
    }
    return value;
  }
  const result = sum();
  if (pos !== tokens.length)
    throw new Error("式子未读完，请检查括号与运算符。");
  return result;
}
function factors(expr: Expr): Polynomial[] {
  // Collapse constant subtrees before expanding powers, so nested powers of 1
  // cannot create exponentially many irrelevant factors.
  const value = evaluate(expr);
  if (value.length === 1) return [value];
  if (expr.kind === "mul")
    return [...factors(expr.left), ...factors(expr.right)];
  if (expr.kind === "neg") return [[rational(-1n)], ...factors(expr.value)];
  if (expr.kind === "pow")
    return Array.from({ length: expr.power }, () => factors(expr.base)).flat();
  if (expr.kind === "div" && evaluate(expr.right).length === 1)
    return [
      ...factors(expr.left),
      [div(rational(1n), evaluate(expr.right)[0])],
    ];
  return [evaluate(expr)];
}
function squareRoot(n: bigint): bigint | null {
  if (n < 0n) return null;
  if (n < 2n) return n;
  let x = n,
    y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x * x === n ? x : null;
}
function reducible(p: Polynomial) {
  p = trim([...p]);
  const degree = p.length - 1;
  if (degree < 2) return false;
  // A pure monomial is already a product written with an exponent.
  if (p.slice(0, -1).every((c) => c.n === 0n)) return false;
  if (degree > 2) return true;
  const [c, b, a] = p,
    disc = add(mul(b, b), neg(mul(rational(4n), mul(a, c))));
  return squareRoot(disc.n) !== null && squareRoot(disc.d) !== null;
}
const equal = (a: Polynomial, b: Polynomial) =>
  a.length === b.length &&
  a.every((value, i) => value.n === b[i].n && value.d === b[i].d);
export function polynomialText(coefficients: readonly number[]): string {
  const terms = coefficients
    .map((c, i) => {
      if (!c) return "";
      const magnitude = Math.abs(c),
        body =
          (i && magnitude === 1 ? "" : String(magnitude)) +
          (i === 0 ? "" : i === 1 ? "x" : "x^" + i);
      return (c < 0 ? "-" : "+") + body;
    })
    .filter(Boolean)
    .reverse()
    .join("");
  return terms.replace(/^\+/, "") || "0";
}
function fractionText(value: Fraction) {
  return value.d === 1n
    ? String(value.n)
    : String(value.n) + "/" + String(value.d);
}
function polynomialPreview(p: Polynomial) {
  return (
    p
      .map((value, i) =>
        !value.n
          ? ""
          : (value.n < 0n ? "-" : "+") +
            (i && abs(value.n) === value.d
              ? ""
              : value.d === 1n
                ? String(abs(value.n))
                : "\\frac{" + abs(value.n) + "}{" + value.d + "}") +
            (i === 0 ? "" : i === 1 ? "x" : "x^" + i),
      )
      .filter(Boolean)
      .reverse()
      .join("")
      .replace(/^\+/, "") || "0"
  );
}
export type CheckResult = {
  status: "correct" | "incomplete" | "incorrect" | "invalid";
  message: string;
  expanded?: string;
};
export type FactorizationBlanks = {
  multiplier: string;
  factors: [
    { coefficient: string; constant: string },
    { coefficient: string; constant: string },
  ];
};
export function checkFactorizationBlanks(
  input: FactorizationBlanks,
  coefficients: readonly number[],
): CheckResult {
  const values = [
    input.multiplier,
    ...input.factors.flatMap((factor) => [factor.coefficient, factor.constant]),
  ].map((value) => value.trim().replace(/[−–]/g, "-"));
  if (values.some((value) => !value))
    return { status: "invalid", message: "请先把所有空格填好。" };
  if (
    values.some(
      (value) => !/^[+-]?\d+(?:\.\d+)?(?:\/[+-]?\d+(?:\.\d+)?)?$/.test(value),
    )
  )
    return {
      status: "invalid",
      message: "每个空里只填一个数，可以是负数或分数。",
    };
  const [k, a, b, c, d] = values;
  return checkFactorization(
    `(${k})((${a})x+(${b}))((${c})x+(${d}))`,
    coefficients,
  );
}
export function checkFactorization(
  input: string,
  coefficients: readonly number[],
): CheckResult {
  try {
    const ast = parse(input),
      actual = evaluate(ast),
      expected = trim(coefficients.map((n) => rational(BigInt(n))));
    const expanded = polynomialPreview(actual);
    if (!equal(actual, expected)) {
      const degree = Math.max(actual.length, expected.length) - 1;
      let differing = degree;
      while (
        differing > 0 &&
        actual[differing]?.n === (expected[differing]?.n ?? 0n) &&
        actual[differing]?.d === (expected[differing]?.d ?? 1n)
      )
        differing--;
      const term =
        differing === 0
          ? "常数项"
          : differing === 1
            ? "x 项"
            : "x^" + differing + " 项";
      return {
        status: "incorrect",
        expanded,
        message:
          "展开后，" +
          term +
          "的系数应为 " +
          fractionText(expected[differing] ?? zero()) +
          "，你的结果是 " +
          fractionText(actual[differing] ?? zero()) +
          "。回看这一项由哪些乘积组成。",
      };
    }
    const parts = factors(ast);
    if (parts.some(reducible))
      return {
        status: "incomplete",
        expanded,
        message:
          "数值关系正确，但还有因式能在有理数范围内继续分解。试着提公因式或再用一次公式。",
      };
    if (
      parts.filter((p) => p.length > 1).length < 2 &&
      expected.length > 2 &&
      expected.slice(0, -1).some((c) => c.n !== 0n)
    )
      return {
        status: "incomplete",
        expanded,
        message: "式子相等，但还没有写成完成分解的乘积形式。",
      };
    return {
      status: "correct",
      expanded,
      message:
        "分解正确，而且已经分解到有理系数范围内不可再分的因式。因式的先后顺序不影响答案。",
    };
  } catch (error) {
    return {
      status: "invalid",
      message:
        error instanceof Error ? error.message : "暂时无法读取这个式子。",
    };
  }
}
export type FactorKind =
  "common" | "difference" | "square" | "quadratic" | "mixed";
export const factorKinds: {
  id: FactorKind;
  title: string;
  description: string;
}[] = [
  {
    id: "common",
    title: "提公因式",
    description: "寻找每一项共有的数字和字母因式。",
  },
  {
    id: "difference",
    title: "平方差",
    description: "先辨认两个平方，再检查中间是减号。",
  },
  {
    id: "square",
    title: "完全平方",
    description: "检查首尾平方与中间的两倍乘积。",
  },
  {
    id: "quadratic",
    title: "二次三项式",
    description: "寻找积等于常数项、和等于一次项系数的两个数。",
  },
  {
    id: "mixed",
    title: "综合分解",
    description: "先提公因式，再看括号里能否继续分解。",
  },
];
export type FactorQuestion = {
  seed: number;
  kind: FactorKind;
  difficulty: 1 | 2 | 3;
  coefficients: number[];
  answer: string;
  hints: string[];
  steps: string[];
  lessonId: string;
};
export function makeFactorQuestion(
  seed: number,
  kind: FactorKind,
  difficulty: 1 | 2 | 3,
): FactorQuestion {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const integer = (min: number, max: number) =>
    min + Math.floor(random() * (max - min + 1));
  const bound = difficulty === 1 ? 5 : difficulty === 2 ? 9 : 12;
  const signed = () =>
    integer(1, bound) * (difficulty > 1 && random() < 0.5 ? -1 : 1);
  const a = signed(),
    b = signed(),
    k = integer(2, difficulty === 3 ? 9 : 5);
  const factor = (n: number) => "(x" + (n < 0 ? "" : "+") + n + ")";
  let coefficients: number[],
    answer: string,
    hints: string[],
    steps: string[],
    lessonId: string;
  if (kind === "common") {
    const power = difficulty === 3 ? 2 : 1,
      c = difficulty === 1 ? 1 : integer(1, 4),
      constant = a;
    coefficients = Array.from({ length: power + 2 }, () => 0);
    coefficients[power] = k * constant;
    coefficients[power + 1] = k * c;
    // Make the extracted integer content maximal, so the reference answer models complete extraction.
    const g = Number(gcd(BigInt(c), BigInt(constant))),
      outside = k * g,
      insideC = c / g,
      insideB = constant / g;
    answer =
      String(outside) +
      (power === 1 ? "x" : "x^2") +
      "(" +
      polynomialText([insideB, insideC]) +
      ")";
    hints = [
      "先找各项系数的最大公因数，再找共有的最低次幂。",
      "各项都有 " + outside + (power === 1 ? "x" : "x^2") + " 这个因式。",
      "分别用每一项除以共同因式，把所得结果写进同一个括号。",
    ];
    steps = [
      "系数共有因数 " +
        outside +
        "，字母部分共有 x" +
        (power === 1 ? "" : "^2") +
        "。",
      "分别相除后得到 " + polynomialText([insideB, insideC]) + "。",
      "写成 " + answer + "，再展开核对每一项。",
    ];
    lessonId = "factor-common";
  } else if (kind === "difference") {
    const c = Math.abs(a);
    coefficients = [-c * c, 0, 1];
    answer = factor(-c) + factor(c);
    hints = [
      "这是两个平方相减。",
      "x^2 是 x 的平方，" + c * c + " 是 " + c + " 的平方。",
      "使用 A^2-B^2=(A-B)(A+B)，一加一减。",
    ];
    steps = [
      "识别 A=x，B=" + c + "。",
      "代入平方差公式，得到 " + answer + "。",
      "展开后中间两项抵消，常数项为 -" + c * c + "。",
    ];
    lessonId = "factor-identities";
  } else if (kind === "square") {
    coefficients = [a * a, 2 * a, 1];
    answer = factor(a) + "^2";
    hints = [
      "先检查首尾两项是否为平方。",
      "中间项系数 " + 2 * a + " 恰好等于 2×(" + a + ")。",
      "三项构成 (x" + (a < 0 ? "" : "+") + a + ") 的完全平方。",
    ];
    steps = [
      "常数项 " + a * a + "=" + Math.abs(a) + "^2。",
      "中间项是 2×x×(" + a + ")，符号决定括号中用加还是减。",
      "得到 " + answer + "。",
    ];
    lessonId = "factor-identities";
  } else {
    const scale = kind === "mixed" ? k : 1;
    coefficients = [scale * a * b, scale * (a + b), scale];
    answer = (scale === 1 ? "" : String(scale)) + factor(a) + factor(b);
    hints = [
      scale > 1
        ? "每一项都有数字公因式 " + scale + "，先把它提出。"
        : "寻找两个数，它们的和等于一次项系数，积等于常数项。",
      (scale > 1 ? "提出数字公因式后，需要两数之和为 " : "需要两数之和为 ") +
        (a + b) +
        "、乘积为 " +
        a * b +
        "。",
      "这两个数是 " + a + " 与 " + b + "；将它们分别放进两个一次因式。",
    ];
    steps = [
      scale > 1
        ? "提出 " +
          scale +
          "，括号内为 " +
          polynomialText([a * b, a + b, 1]) +
          "。"
        : "先读出一次项系数 " + (a + b) + " 与常数项 " + a * b + "。",
      a + "+(" + b + ")=" + (a + b) + "，" + a + "×(" + b + ")=" + a * b + "。",
      "得到 " + answer + "；展开的三项系数依次对应原题。",
    ];
    lessonId = "factor-quadratic";
  }
  return {
    seed: seed >>> 0,
    kind,
    difficulty,
    coefficients,
    answer,
    hints,
    steps,
    lessonId,
  };
}
export function parseQuestionLink(
  hash: string,
): { seed: number; kind: FactorKind; difficulty: 1 | 2 | 3 } | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const raw = params.get("q"),
    kind = params.get("type"),
    level = params.get("level");
  if (
    !raw ||
    !/^\d{1,10}$/.test(raw) ||
    Number(raw) > 4294967295 ||
    !factorKinds.some((item) => item.id === kind) ||
    !["1", "2", "3"].includes(level ?? "")
  )
    return null;
  return {
    seed: Number(raw),
    kind: kind as FactorKind,
    difficulty: Number(level) as 1 | 2 | 3,
  };
}
export function questionHash(
  q: Pick<FactorQuestion, "seed" | "kind" | "difficulty">,
) {
  return "q=" + q.seed + "&type=" + q.kind + "&level=" + q.difficulty;
}
