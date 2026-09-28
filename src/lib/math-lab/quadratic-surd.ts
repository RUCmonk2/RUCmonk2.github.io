type Rational = { n: bigint; d: bigint };
export type Surd = { a: Rational; b: Rational };
const abs = (n: bigint) => (n < 0n ? -n : n);
function rat(n: bigint, d = 1n): Rational {
  if (!d) throw new Error("除数不能为零。");
  if (abs(n).toString(2).length > 512 || abs(d).toString(2).length > 512)
    throw new Error("中间计算的数字过大，请简化式子。");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  let a = abs(n),
    b = d;
  while (b) [a, b] = [b, a % b];
  return { n: n / a, d: d / a };
}
const radd = (a: Rational, b: Rational) =>
  rat(a.n * b.d + b.n * a.d, a.d * b.d);
const rneg = (a: Rational) => rat(-a.n, a.d);
const rmul = (a: Rational, b: Rational) => rat(a.n * b.n, a.d * b.d);
const rdiv = (a: Rational, b: Rational) => rat(a.n * b.d, a.d * b.n);
const rtext = (a: Rational, latex: boolean) =>
  a.d === 1n ? String(a.n) : latex ? `\\frac{${a.n}}{${a.d}}` : `${a.n}/${a.d}`;

/** Exact a + b√d arithmetic. Each generated radical question fixes one squarefree d. */
export function quadraticField(radicand?: number) {
  if (radicand !== undefined && ![2, 3, 5, 7].includes(radicand))
    throw new Error("不支持这个根式题型。");
  const d = rat(BigInt(radicand ?? 0));
  const number = (n: bigint, denominator = 1n): Surd => ({
    a: rat(n, denominator),
    b: rat(0n),
  });
  const isZero = (v: Surd) => v.a.n === 0n && v.b.n === 0n;
  const isOne = (v: Surd) => v.a.n === v.a.d && v.b.n === 0n;
  const neg = (v: Surd): Surd => ({ a: rneg(v.a), b: rneg(v.b) });
  const add = (v: Surd, w: Surd): Surd => ({
    a: radd(v.a, w.a),
    b: radd(v.b, w.b),
  });
  const mul = (v: Surd, w: Surd): Surd => ({
    a: radd(rmul(v.a, w.a), rmul(d, rmul(v.b, w.b))),
    b: radd(rmul(v.a, w.b), rmul(v.b, w.a)),
  });
  function div(v: Surd, w: Surd): Surd {
    const norm = radd(rmul(w.a, w.a), rneg(rmul(d, rmul(w.b, w.b))));
    const numerator = mul(v, { a: w.a, b: rneg(w.b) });
    return { a: rdiv(numerator.a, norm), b: rdiv(numerator.b, norm) };
  }
  function root(n: number): Surd {
    if (!Number.isSafeInteger(n) || n < 0 || n > 10000)
      throw new Error("根号内请填 0 到 10000 的整数，例如 sqrt(2) 或 √2。");
    const integer = Math.round(Math.sqrt(n));
    if (integer * integer === n) return number(BigInt(integer));
    if (!radicand)
      throw new Error(
        "这道题要求有理系数答案。练习无理数时，请选择进阶模式里的根式题。",
      );
    const scale = Math.round(Math.sqrt(n / radicand));
    if (scale * scale * radicand !== n)
      throw new Error(`本题支持 √${radicand} 及其同类根式；请先化简根号。`);
    return { a: rat(0n), b: rat(BigInt(scale)) };
  }
  function sign(v: Surd) {
    const sa = v.a.n < 0n ? -1 : v.a.n > 0n ? 1 : 0,
      sb = v.b.n < 0n ? -1 : v.b.n > 0n ? 1 : 0;
    if (!sa) return sb;
    if (!sb || sa === sb) return sa;
    const comparison = radd(rmul(v.a, v.a), rneg(rmul(d, rmul(v.b, v.b))));
    return comparison.n > 0n ? sa : comparison.n < 0n ? sb : 0;
  }
  function text(v: Surd, latex = false) {
    if (!v.b.n) return rtext(v.a, latex);
    const coefficient =
      abs(v.b.n) === v.b.d ? "" : rtext({ n: abs(v.b.n), d: v.b.d }, latex);
    const radical =
      coefficient + (latex ? `\\sqrt{${radicand}}` : `sqrt(${radicand})`);
    return v.a.n
      ? `(${rtext(v.a, latex)}${v.b.n < 0n ? "-" : "+"}${radical})`
      : (v.b.n < 0n ? "-" : "") + radical;
  }
  const equal = (v: Surd, w: Surd) =>
    v.a.n === w.a.n && v.a.d === w.a.d && v.b.n === w.b.n && v.b.d === w.b.d;
  return { number, isZero, isOne, neg, add, mul, div, root, sign, text, equal };
}
export type QuadraticField = ReturnType<typeof quadraticField>;
