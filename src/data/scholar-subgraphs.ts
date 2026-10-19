import type { LocalizedText } from "./mathematicians";

export type ScholarSubgraph = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  people: string[];
};
export const mathSubgraphs: ScholarSubgraph[] = [
  {
    id: "high-school",
    label: { zh: "高中数学", en: "School mathematics" },
    description: {
      zh: "从几何、函数、数列和概率出发，看看课堂知识背后的人。这里是阅读入口，不把他们的全部研究限定在高中范围。",
      en: "Start with geometry, functions, sequences and probability. These are entry points from school mathematics, not limits on each person's research.",
    },
    people: [
      "euclid",
      "archimedes",
      "liu-hui",
      "zu-chongzhi",
      "fibonacci",
      "descartes",
      "fermat",
      "pascal",
      "huygens",
      "newton",
      "leibniz",
      "euler",
      "gauss",
    ],
  },
  {
    id: "university",
    label: { zh: "大学数学", en: "University mathematics" },
    description: {
      zh: "沿微积分、分析、线性方法和概率基础，连接大学里逐渐熟悉的名字。",
      en: "Follow calculus, analysis, linear methods and probability through familiar university topics.",
    },
    people: [
      "newton",
      "leibniz",
      "euler",
      "lagrange",
      "cauchy",
      "fourier",
      "gauss",
      "dirichlet",
      "riemann",
      "weierstrass",
      "cantor",
      "dedekind",
      "kolmogorov",
    ],
  },
  {
    id: "group-theory",
    label: { zh: "群论", en: "Group theory" },
    description: {
      zh: "从方程根的置换到对称性与抽象代数。子图中的线只保留已有史料关系。",
      en: "From permutations of roots to symmetry and abstract algebra. Edges retain their documented meanings.",
    },
    people: ["lagrange", "abel", "galois", "dedekind", "klein", "noether"],
  },
  {
    id: "set-theory",
    label: { zh: "集合论", en: "Set theory" },
    description: {
      zh: "从实数、无穷的大小，读到集合悖论与公理体系的边界。",
      en: "Explore real numbers, sizes of infinity, set-theoretic paradoxes and the limits of axiomatic systems.",
    },
    people: ["dedekind", "cantor", "russell", "godel", "hilbert"],
  },
  {
    id: "china",
    label: { zh: "中国数学", en: "Chinese mathematics" },
    description: {
      zh: "本馆收录的中国数学传统与中国出生的数学家：刘徽、祖冲之、陈省身。同属此子图不意味着彼此有直接学术联系。",
      en: "Liu Hui, Zu Chongzhi and Shiing-Shen Chern represent Chinese mathematical traditions and Chinese-born scholars in this collection. Shared membership does not imply direct contact.",
    },
    people: ["liu-hui", "zu-chongzhi", "chern"],
  },
];
