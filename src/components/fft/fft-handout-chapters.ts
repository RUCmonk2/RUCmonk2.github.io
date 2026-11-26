export const fftHandoutChapters = [
  { id: "overview", zh: "导读与符号", en: "Overview and notation" },
  { id: "dft", zh: "DFT 定义与单位根", en: "DFT and roots of unity" },
  {
    id: "butterfly",
    zh: "从拆奇偶到一只蝶形",
    en: "Even–odd split and the butterfly",
  },
  { id: "disk", zh: "圆形折叠怎样配对", en: "Pairing on the folding disk" },
  { id: "layers", zh: "每一折的不变量", en: "The invariant at each fold" },
  {
    id: "trace",
    zh: "8 点圆盘的三折对照",
    en: "Trace all three folds of 8 points",
  },
  { id: "worked", zh: "四个采样，完整算两折", en: "The four-point example" },
  { id: "matrix", zh: "把 FFT 写成矩阵乘积", en: "Matrix factorization" },
  {
    id: "recursive",
    zh: "递归 C 代码与站点",
    en: "Recursive C code and stations",
  },
  {
    id: "bit-reversal",
    zh: "位反转与数组中的站点",
    en: "Bit reversal and array blocks",
  },
  { id: "iterative", zh: "原地迭代的块计算", en: "In-place block computation" },
  {
    id: "verify",
    zh: "复杂度、逆变换与验算",
    en: "Complexity, inverse and verification",
  },
] as const;

export const fftExperimentPath = "/learning/math-lab/fft/";
