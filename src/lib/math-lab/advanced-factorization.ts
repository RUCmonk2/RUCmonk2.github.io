import type { FactorQuestion } from "./factorization";
import { expandPolynomial } from "./multivariate-polynomial";

export const advancedFactorKinds = [
  {
    id: "cubes",
    title: "立方和与差",
    description: "认出两个立方，分解后保留有理数范围内不可再分的二次因式。",
  },
  {
    id: "higher",
    title: "高次换元",
    description: "把平方项看成一个整体，先换元分解，再还原并检查能否继续。",
  },
  {
    id: "grouping",
    title: "分组分解",
    description: "把四项分成两组，寻找相同的括号因式。",
  },
  {
    id: "multi-common",
    title: "多字母提公因式",
    description: "分别比较每个字母的最低次数，再提取共同的数字和字母因式。",
  },
  {
    id: "multi-quadratic",
    title: "二元二次式",
    description: "把一个字母暂时看作参数，用交叉相乘检查两个一次因式。",
  },
  {
    id: "multi-mixed",
    title: "多字母综合",
    description: "结合提公因式、整体代换和平方差，分解之后再检查每个括号。",
  },
  {
    id: "radical-difference",
    title: "根式平方差",
    description: "把非完全平方数写成根式的平方，在实数系数范围内继续分解。",
  },
  {
    id: "radical-quadratic",
    title: "根式系数分解",
    description:
      "保留根式的精确值，用提公因式与交叉相乘分解含无理数系数的式子。",
  },
] as const;
export type AdvancedFactorKind = (typeof advancedFactorKinds)[number]["id"];
export function isAdvancedKind(kind: string): kind is AdvancedFactorKind {
  return advancedFactorKinds.some((item) => item.id === kind);
}
function coprime(a: number, b: number) {
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a === 1;
}
export function makeAdvancedQuestion(
  seed: number,
  kind: AdvancedFactorKind,
  difficulty: 1 | 2 | 3,
): FactorQuestion {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const integer = (min: number, max: number) =>
    min + Math.floor(random() * (max - min + 1));
  const signed = () =>
    integer(1, difficulty === 1 ? 4 : 6) *
    (difficulty > 1 && random() < 0.5 ? -1 : 1);
  const [u, v, w] = (seed & 1) === 0 ? ["x", "y", "z"] : ["a", "b", "c"];
  const a = integer(2, 5),
    b = integer(1, 5),
    k = integer(2, 5),
    r = signed();
  const radicand = kind.startsWith("radical-")
    ? [2, 3, 5, 7][(seed >>> 1) % 4]
    : undefined;
  const factor = (source: string) =>
    "(" + expandPolynomial(source, radicand) + ")";
  let parts: string[],
    atoms: string[],
    hints: string[],
    steps: string[],
    lessonId = "factor-identities";
  if (kind === "radical-difference") {
    const root = `sqrt(${radicand})`,
      scale = difficulty === 2 ? integer(2, 4) : 1;
    const left = difficulty === 1 ? `${u}-${root}` : `${scale}${u}-${root}${v}`;
    const right =
      difficulty === 1 ? `${u}+${root}` : `${scale}${u}+${root}${v}`;
    atoms = [left, right];
    parts = [factor(left), factor(right)];
    if (difficulty === 3) {
      const positive = `${u}^2+${radicand}${v}^2`;
      parts.push(factor(positive));
      atoms.push(positive);
    }
    hints = [
      `这道题允许根式系数。${radicand} 不是整数的平方，却可以写成 (${root})^2。`,
      difficulty === 3
        ? `先将四次式分成 (${u}^2-${radicand}${v}^2)(${u}^2+${radicand}${v}^2)，再检查平方差因式。`
        : `把两项看成 A^2-B^2，其中 A=${scale}${u}，B=${root}${difficulty === 1 ? "" : v}。`,
      `使用 A^2-B^2=(A-B)(A+B)，得到 ${factor(left)}${factor(right)}；根式不要换成小数近似值。`,
    ];
    steps = [
      difficulty === 3
        ? `先用一次平方差公式，得到 (${u}^2-${radicand}${v}^2)(${u}^2+${radicand}${v}^2)。`
        : `将 ${radicand}${difficulty === 1 ? "" : v + "^2"} 写成 (${root}${difficulty === 1 ? "" : v})^2。`,
      `平方差因式可以继续写成 ${factor(left)}${factor(right)}。`,
      difficulty === 3
        ? `平方和 ${u}^2+${radicand}${v}^2 在实数系数范围内不可再分，所以最终结果为 ${parts.join("")}。`
        : `最终结果为 ${parts.join("")}，展开时两项含根号的交叉乘积正好抵消。`,
      `校验时使用 (${root})^2=${radicand}，而不是用有限小数代替根式。`,
    ];
  } else if (kind === "radical-quadratic") {
    const root = `sqrt(${radicand})`,
      offset = difficulty === 1 ? a : r;
    const signedB = difficulty > 1 && random() < 0.5 ? -b : b;
    const tail = difficulty === 3 ? v : "";
    const left = expandPolynomial(`${root}${u}+(${offset})${tail}`, radicand);
    const right = expandPolynomial(`${u}+(${signedB})${root}${tail}`, radicand);
    parts = [factor(left), factor(right)];
    atoms = [left, right];
    if (difficulty === 3) {
      parts.unshift(`${k}${w}`);
      atoms.unshift(w);
    }
    hints = [
      difficulty === 3
        ? `先提出共同因式 ${k}${w}，再把 ${v} 看作参数观察剩下的二次式。`
        : `观察首项与末项：根式也是一个精确的数，可以作为一次因式的系数。`,
      `试着让两个因式中 ${u} 的系数分别为 ${root} 和 1，另外两项分别为 ${offset}${tail} 和 (${signedB})${root}${tail}。`,
      `交叉项的系数来自 ${root}×(${signedB})${root}+(${offset})=${radicand! * signedB + offset}，其中 (${root})^2=${radicand}。`,
    ];
    steps = [
      difficulty === 3
        ? `先提取 ${k}${w}，剩下 ${expandPolynomial(factor(left) + factor(right), radicand)}。`
        : `把首项分成 (${root}${u})(${u})，末项分成 (${offset})×((${signedB})${root})。`,
      `选取两个一次因式 ${factor(left)} 和 ${factor(right)}。`,
      `交叉相乘后，${difficulty === 3 ? u + v : u} 项的系数是 ${radicand! * signedB + offset}；同时检查首项与末项。`,
      `因此原式=${parts.join("")}。根式因子的位置可以变化，但展开后的每一项都必须精确相等。`,
    ];
    lessonId = "factor-quadratic";
  } else if (kind === "cubes") {
    const scale = difficulty === 3 ? integer(2, 3) : 1,
      raw = signed(),
      c = coprime(scale, raw) ? raw : raw + Math.sign(raw);
    const linear = expandPolynomial(`${scale}${u}+(${c})`);
    const quadratic = expandPolynomial(
      `(${scale}${u})^2-(${scale}${u})(${c})+(${c})^2`,
    );
    parts = [factor(linear), factor(quadratic)];
    atoms = [linear, quadratic];
    hints = [
      "先把两项分别写成一个整体的立方；立方差可以看成加上一个负数的立方。",
      `取 A=${scale}${u}，B=${c}，使用 A^3+B^3=(A+B)(A^2-AB+B^2)。`,
      `一次因式为 ${linear}，二次因式的中间项与 B 的符号相反，最后一项始终为正。`,
    ];
    steps = [
      `原式是 (${scale}${u})^3+(${c})^3。`,
      `先写出 ${factor(linear)}，再得到 ${factor(quadratic)}。`,
      "后二次因式的判别式为负，在有理系数范围内不再分解。不要把立方公式与完全立方展开混淆。",
    ];
  } else if (kind === "higher") {
    const positive = `${u}^2+${a}`,
      negative = `${u}^2-${b * b}`;
    if (difficulty === 1) {
      parts = [factor(positive), factor(`${u}^2+${b}`)];
      atoms = [positive, `${u}^2+${b}`];
    } else {
      parts = [factor(`${u}-${b}`), factor(`${u}+${b}`), factor(positive)];
      atoms = [`${u}-${b}`, `${u}+${b}`, positive];
      if (difficulty === 3) {
        parts.push(factor(`${u}^2+${k}`));
        atoms.push(`${u}^2+${k}`);
      }
    }
    const tAnswer =
      difficulty === 1
        ? `(t+${a})(t+${b})`
        : `(t-${b * b})(t+${a})` + (difficulty === 3 ? `(t+${k})` : "");
    const tExpression = expandPolynomial(
      tAnswer.replaceAll("t", "x"),
    ).replaceAll("x", "t");
    hints = [
      `每一项中 ${u} 的次数都是偶数，可令 t=${u}^2。`,
      `换元后可以写成 ${tAnswer}，再把 t 换回去。`,
      difficulty === 1
        ? "还原后的两个二次因式都没有实数零点，在有理系数范围内无需继续。"
        : `还原后出现 ${negative}，它是平方差，还要再分解一次。`,
    ];
    steps = [
      `令 t=${u}^2，原式变成 ${tExpression}。`,
      difficulty === 3
        ? `代入 t=${b * b} 得到零，所以先提出 (t-${b * b})，商为 t^2+${a + k}t+${a * k}；再找和为 ${a + k}、积为 ${a * k} 的两个数。`
        : `关于 t 的二次式，寻找和为 ${difficulty === 1 ? a + b : a - b * b}、积为 ${difficulty === 1 ? a * b : -a * b * b} 的两个数。`,
      `换元后的分解是 ${tAnswer}。`,
      difficulty === 1
        ? `还原成 ${parts.join("")}，不能把 t 留在最终答案中。`
        : `把 t 还原成 ${u}^2，再将 ${negative} 分成 ${factor(`${u}-${b}`)}${factor(`${u}+${b}`)}。`,
      "其他带正数常数项的平方和因式在有理系数范围内不可再分。",
    ];
    lessonId = "factor-quadratic";
  } else if (kind === "grouping") {
    const scale = difficulty === 3 ? integer(2, 3) : 1,
      offset = coprime(scale, r) ? r : r + Math.sign(r),
      linear = expandPolynomial(`${scale}${u}+(${offset})`),
      quadratic = `${u}^2+${a}`;
    parts = [factor(linear), factor(quadratic)];
    atoms = [linear, quadratic];
    hints = [
      "按前三次、二次项为一组，一次项与常数项为另一组。",
      `前一组提出 ${u}^2，后一组提出 ${a}，两组都会留下 ${factor(linear)}。`,
      `把相同的括号当成一个整体，再提出这个整体。`,
    ];
    steps = [
      `分组后写成 ${u}^2${factor(linear)}+${a}${factor(linear)}。`,
      `两组共有 ${factor(linear)}，提出后剩下 ${quadratic}。`,
      `得到 ${parts.join("")}。平方和因式不能用平方差公式分解。`,
    ];
    lessonId = "factor-common";
  } else if (kind === "multi-common") {
    const p = difficulty === 1 ? 1 : 2,
      q = difficulty === 3 ? 2 : 1;
    const linear = expandPolynomial(
      `${u}+(${r})${v}` + (difficulty === 3 ? `+${b}${w}` : ""),
    );
    const common =
      `${k}${u}` + (p > 1 ? `^${p}` : "") + v + (q > 1 ? `^${q}` : "");
    parts = [common, factor(linear)];
    atoms = [
      ...Array.from({ length: p }, () => u),
      ...Array.from({ length: q }, () => v),
      linear,
    ];
    hints = [
      "数字系数和每一种字母分开看：字母取所有项中共有的最低次数。",
      `数字共有因数 ${k}，各项至少含有 ${u}^${p}${v}^${q}。`,
      `提出 ${common} 后，用每一项除以它，不能把其他字母也删掉。`,
    ];
    steps = [
      `各项的共同因式是 ${common}。`,
      `逐项相除，括号中得到 ${linear}。`,
      `写成 ${parts.join("")}。括号中是一次式，已经不能继续分解。`,
    ];
    lessonId = "factor-common";
  } else if (kind === "multi-quadratic") {
    const rawC = difficulty === 1 ? 1 : integer(2, 4),
      rawD = difficulty === 3 ? integer(2, 4) : 1,
      s = signed(),
      c = coprime(rawC, r) ? rawC : 5,
      d = coprime(rawD, s) ? rawD : 5;
    const left = expandPolynomial(`${c}${u}+(${r})${v}`),
      right = expandPolynomial(`${d}${u}+(${s})${v}`);
    parts = [factor(left), factor(right)];
    atoms = [left, right];
    hints = [
      `先把 ${v} 看作参数，按关于 ${u} 的二次式分解；最终仍需保留两个字母。`,
      `两个一次因式中 ${u} 的系数可取 ${c} 与 ${d}，${v} 的系数可取 ${r} 与 ${s}。`,
      `中间项由两次交叉乘积得到：${c}×(${s})+${d}×(${r})=${c * s + d * r}。`,
    ];
    steps = [
      `首项来自 (${c}${u})(${d}${u})，末项来自 (${r}${v})(${s}${v})。`,
      `交叉相乘得到的混合项系数为 ${c * s + d * r}。`,
      `所以原式=${parts.join("")}；不能只检查首尾两项而漏掉混合项。`,
    ];
    lessonId = "factor-quadratic";
  } else {
    if (difficulty === 1) {
      const left = expandPolynomial(`${u}+${v}-${b}${w}`),
        right = expandPolynomial(`${u}+${v}+${b}${w}`);
      parts = [factor(left), factor(right)];
      atoms = [left, right];
      hints = [
        `前三项构成 ${factor(`${u}+${v}`)}^2。`,
        `把 ${u}+${v} 当成整体 A，把 ${b}${w} 当成整体 B。`,
        "使用 A^2-B^2=(A-B)(A+B)，每个括号都要保留整个 A。",
      ];
      steps = [
        `整理成 ${factor(`${u}+${v}`)}^2-(${b}${w})^2。`,
        "对两个整体使用平方差公式。",
        `得到 ${parts.join("")}，两个因式都是多字母一次式。`,
      ];
    } else if (difficulty === 2) {
      const last = expandPolynomial(`${u}+(${r})${v}`);
      parts = [factor(`${u}-${v}`), factor(`${u}+${v}`), factor(last)];
      atoms = [`${u}-${v}`, `${u}+${v}`, last];
      hints = [
        `尝试分组，先找到 ${factor(last)} 这个共同括号。`,
        `提出共同括号后，会剩下 ${u}^2-${v}^2。`,
        "平方差还能分成一差一和；检查是否有重复因式，可以合写成幂。",
      ];
      steps = [
        `分组为 ${u}^2${factor(last)}-${v}^2${factor(last)}。`,
        `提出共同因式，得到 (${u}^2-${v}^2)${factor(last)}。`,
        `继续分解平方差，得到 ${parts.join("")}。`,
      ];
    } else {
      const scale = integer(2, 3),
        distance = coprime(scale, b) ? b : b + 1,
        last = expandPolynomial(`${u}+(${r})${w}`),
        left = expandPolynomial(`${scale}${u}-${distance}${v}`),
        right = expandPolynomial(`${scale}${u}+${distance}${v}`);
      parts = [`${k}${u}${v}`, factor(left), factor(right), factor(last)];
      atoms = [u, v, left, right, last];
      const difference = expandPolynomial(
        `(${scale}${u})^2-(${distance}${v})^2`,
      );
      hints = [
        `先提取数字和字母的共同因式 ${k}${u}${v}。`,
        `括号内按 ${w} 项与不含 ${w} 的项分组，可提出 ${factor(difference)}。`,
        `剩下的 ${difference} 是平方差，还要分成两个一次因式。`,
      ];
      steps = [
        `先提取 ${k}${u}${v}，再分组得到 ${factor(difference)}${factor(last)}。`,
        `将 ${difference} 看成 (${scale}${u})^2-(${distance}${v})^2。`,
        `应用平方差后，原式=${parts.join("")}。每个字母都保留到相应因式中。`,
      ];
    }
  }
  const answer = parts.join(""),
    expression = expandPolynomial(answer, radicand);
  return {
    seed: seed >>> 0,
    kind,
    difficulty,
    coefficients: [],
    expression,
    answer,
    hints,
    steps,
    lessonId,
    advanced: {
      atoms,
      radicand,
      slots: parts.length,
      variables: [...new Set(expression.match(/[xyzabc]/g))],
    },
  };
}
