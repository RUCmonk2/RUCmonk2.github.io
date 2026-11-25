import { type Text, words } from "./graph-algorithms";

export type Matrix = number[][];
export type MatrixPanel = {
  name: string;
  values: Matrix;
  row?: number;
  column?: number;
};
export type MatrixStep = {
  title: Text;
  detail: Text;
  panels: MatrixPanel[];
  equation?: string;
};
export const multiplyExample = {
  a: [
    [2, -1, 3],
    [0, 4, 1],
  ],
  b: [
    [1, 2],
    [3, 0],
    [-2, 5],
  ],
};
export const luExample = [
  [0, 2, 1],
  [2, 1, 0],
  [1, 3, 1],
];
export const svdExample = [
  [2, 2],
  [1, -1],
  [0, 0],
];

const copy = (a: Matrix) => a.map((row) => [...row]);
const identity = (n: number) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );
export const transpose = (a: Matrix) =>
  a[0].map((_, column) => a.map((row) => row[column]));
export const number = (x: number) =>
  Math.abs(x) < 1e-10 ? "0" : String(Number(x.toPrecision(6)));

export function matrixEntry(value: number) {
  const magnitude = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  for (let denominator = 1; denominator <= 12; denominator++) {
    const numerator = Math.round(magnitude * denominator);
    if (Math.abs(numerator / denominator - magnitude) < 1e-10) {
      if (numerator === 0) return "0";
      return (
        sign +
        (denominator === 1 ? String(numerator) : `${numerator}/${denominator}`)
      );
    }
  }
  for (const [length, label] of [
    [Math.SQRT1_2, "√2/2"],
    [Math.SQRT2, "√2"],
    [2 * Math.SQRT2, "2√2"],
  ] as const) {
    if (Math.abs(magnitude - length) < 1e-10) return sign + label;
  }
  return number(value);
}

export function multiply(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length)
    throw new RangeError("Incompatible matrix sizes.");
  const columns = transpose(b);
  return a.map((row) =>
    columns.map((column) =>
      row.reduce((sum, entry, k) => sum + entry * column[k], 0),
    ),
  );
}

export function multiplySteps(i: number, j: number) {
  const { a, b } = multiplyExample,
    c = multiply(a, b),
    result = copy(c);
  const terms = a[i].map((x, k) => x * b[k][j]);
  const factors = a[i].map((x, k) => `(${x}) × (${b[k][j]})`);
  const panels: MatrixPanel[] = [
    { name: "A", values: a, row: i },
    { name: "B", values: b, column: j },
    { name: "C = AB", values: result, row: i, column: j },
  ];
  const steps: MatrixStep[] = [
    {
      title: words("取一行和一列", "Take one row and one column"),
      detail: words(
        `要算 C[${i + 1},${j + 1}]，取 A 的第 ${i + 1} 行、B 的第 ${j + 1} 列。这里用从 1 开始的下标。`,
        `For C[${i + 1},${j + 1}], use row ${i + 1} of A and column ${j + 1} of B. Indices start at 1.`,
      ),
      panels,
    },
  ];
  for (let k = 0; k < terms.length; k++)
    steps.push({
      title: words(`累加第 ${k + 1} 项`, `Add term ${k + 1}`),
      detail: words(
        `将第 ${k + 1} 对元素相乘，乘积 ${terms[k]} 加入部分和。`,
        `Multiply pair ${k + 1}; add its product ${terms[k]} to the running total.`,
      ),
      equation: `${factors.slice(0, k + 1).join(" + ")} = ${terms.slice(0, k + 1).reduce((sum, x) => sum + x, 0)}`,
      panels,
    });
  return steps;
}

export function pivotedLU(a: Matrix) {
  const size = a.length;
  if (!size || a.some((row) => row.length !== size))
    throw new RangeError("LU requires a square matrix.");
  const p = identity(size),
    l = identity(size),
    u = copy(a),
    steps: MatrixStep[] = [];
  const panels = (row?: number, column?: number): MatrixPanel[] => [
    { name: "P", values: copy(p) },
    { name: "L", values: copy(l) },
    { name: "U", values: copy(u), row, column },
  ];
  steps.push({
    title: words("初始化 P、L、U", "Initialize P, L, and U"),
    detail: words(
      "P 和 L 初始为单位矩阵，U 从 A 开始。",
      "Start P and L as identity matrices, and U as A.",
    ),
    panels: [{ name: "A", values: a }, ...panels()],
  });
  for (let k = 0; k < size; k++) {
    let pivot = k;
    for (let j = k + 1; j < size; j++)
      if (Math.abs(u[j][k]) > Math.abs(u[pivot][k])) pivot = j;
    if (u[pivot][k] === 0)
      throw new RangeError("This example requires a nonsingular matrix.");
    if (pivot !== k) {
      [u[k], u[pivot]] = [u[pivot], u[k]];
      [p[k], p[pivot]] = [p[pivot], p[k]];
      for (let j = 0; j < k; j++)
        [l[k][j], l[pivot][j]] = [l[pivot][j], l[k][j]];
      steps.push({
        title: words(
          `互换第 ${k + 1}、${pivot + 1} 行`,
          `Swap rows ${k + 1} and ${pivot + 1}`,
        ),
        detail: words(
          "把本列绝对值最大的主元换上来。P 记录换行，L 中已完成的列也随之交换。",
          "Bring up the largest remaining absolute pivot. Record the swap in P and swap the completed columns of L as well.",
        ),
        panels: panels(k, k),
      });
    }
    for (let i = k + 1; i < size; i++) {
      const entry = u[i][k],
        main = u[k][k],
        multiplier = entry / main;
      l[i][k] = multiplier;
      for (let j = k + 1; j < size; j++) u[i][j] -= multiplier * u[k][j];
      u[i][k] = 0;
      steps.push({
        title: words(
          `消去 U[${i + 1},${k + 1}]`,
          `Eliminate U[${i + 1},${k + 1}]`,
        ),
        detail: words(
          "将倍数记到 L 的相同位置，然后从当前行减去相应倍数的主元行。",
          "Store the multiplier in L. Subtract that multiple of the pivot row from the current row.",
        ),
        equation: `L[${i + 1},${k + 1}] = ${number(entry)} ÷ ${number(main)} = ${number(multiplier)};  R${i + 1} ← R${i + 1} − (${number(multiplier)})R${k + 1}`,
        panels: panels(i, k),
      });
    }
  }
  steps.push({
    title: words("重乘核对 PA = LU", "Multiply to check PA = LU"),
    detail: words(
      "P 乘 A 给出换过行的原矩阵。L 与 U 相乘，逐格得到同一个矩阵。",
      "PA is A with its rows permuted. Multiplying L by U gives the same matrix, entry by entry.",
    ),
    panels: [
      { name: "A", values: a },
      ...panels(),
      { name: "PA", values: multiply(p, a) },
      { name: "LU", values: multiply(l, u) },
    ],
  });
  return { p, l, u, steps };
}

export function twoColumnSVD(a: Matrix) {
  if (a.length < 2 || a.some((row) => row.length !== 2))
    throw new RangeError(
      "Use a matrix with two columns and at least two rows.",
    );
  const gram = multiply(transpose(a), a);
  const theta = Math.atan2(2 * gram[0][1], gram[0][0] - gram[1][1]) / 2;
  const cos = Math.cos(theta),
    sin = Math.sin(theta);
  const v = [
      [cos, sin],
      [sin, -cos],
    ],
    av = multiply(a, v);
  const singular = transpose(av).map((col) => Math.hypot(...col));
  const columns: number[][] = [];
  for (let i = 0; i < 2; i++) {
    if (singular[i] > Number.EPSILON * Math.max(...singular)) {
      columns.push(av.map((row) => row[i] / singular[i]));
    } else {
      singular[i] = 0;
      for (let basis = 0; basis < a.length; basis++) {
        const orth = a.map((_, j) => Number(j === basis));
        for (const previous of columns) {
          const projection = previous.reduce(
            (sum, x, j) => sum + x * orth[j],
            0,
          );
          for (let j = 0; j < orth.length; j++)
            orth[j] -= projection * previous[j];
        }
        const norm = Math.hypot(...orth);
        if (norm > 0.5) {
          columns.push(orth.map((x) => x / norm));
          break;
        }
      }
    }
  }
  return { gram, v, u: transpose(columns), singular };
}

export function svdSteps(rank: 1 | 2) {
  const a = svdExample;
  const { gram, v, u, singular } = twoColumnSVD(a);
  const sigma = [
    [singular[0], 0],
    [0, singular[1]],
  ];
  const subscript = rank === 1 ? "₁" : "₂";
  const retained = [
    [singular[0], 0],
    [0, rank === 2 ? singular[1] : 0],
  ];
  const reconstructed = multiply(multiply(u, retained), transpose(v));
  const error = Math.hypot(
    ...a.flatMap((row, i) => row.map((x, j) => x - reconstructed[i][j])),
  );
  const steps: MatrixStep[] = [
    {
      title: words("先乘出 AᵀA", "Form AᵀA"),
      detail: words(
        "原矩阵把 2 维输入送到 3 维输出。AᵀA 留在 2 维输入空间。",
        "A sends a two-dimensional input to three output coordinates. AᵀA acts in the two-dimensional input space.",
      ),
      panels: [
        { name: "A", values: a },
        { name: "AᵀA", values: gram },
      ],
    },
    {
      title: words("找出两个输入方向", "Find the two input directions"),
      detail: words(
        "AᵀA 的单位特征向量组成 V，特征值开平方就是奇异值。例子中 λ₁ = 8、λ₂ = 2。",
        "The unit eigenvectors of AᵀA form V. Square roots of eigenvalues are singular values. Here λ₁ = 8 and λ₂ = 2.",
      ),
      equation: "v₁ = (1,1)ᵀ / √2,  v₂ = (1,−1)ᵀ / √2;  σ₁ = 2√2,  σ₂ = √2",
      panels: [
        { name: "AᵀA", values: gram },
        { name: "V", values: v },
        { name: "Σ", values: sigma },
      ],
    },
    {
      title: words("把输入方向送过 A", "Send the directions through A"),
      detail: words(
        "Avᵢ 的长度是 σᵢ，除以 σᵢ 得到输出单位方向 uᵢ。下面是 3×2 的薄 SVD。",
        "Avᵢ has length σᵢ. Dividing by its positive singular value gives the output unit direction uᵢ. This is the thin 3×2 SVD.",
      ),
      equation: "Av₁ = (2√2,0,0)ᵀ;  Av₂ = (0,√2,0)ᵀ",
      panels: [
        { name: "U", values: u },
        { name: "Σ", values: sigma },
        { name: "Vᵀ", values: transpose(v) },
      ],
    },
    {
      title: words(
        `保留 ${rank} 个方向后重乘`,
        `Reconstruct with ${rank} retained directions`,
      ),
      detail: words(
        rank === 1
          ? "把较小的奇异值设为零，第二个方向的贡献被拿掉。"
          : "两个方向全留，重乘回原矩阵。",
        rank === 1
          ? "Set the smaller singular value to zero to remove the second direction’s contribution."
          : "Keeping both directions reconstructs the original matrix.",
      ),
      equation: `‖A − A${subscript}‖_F = ${rank === 1 ? "√2 ≈ " : ""}${number(error)}`,
      panels: [
        { name: "A", values: a },
        { name: `Σ${subscript}`, values: retained },
        { name: `A${subscript} = UΣ${subscript}Vᵀ`, values: reconstructed },
      ],
    },
  ];
  return { steps, error, reconstructed };
}
