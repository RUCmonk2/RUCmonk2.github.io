import {
  type LocalizedText,
  type Mathematician,
  mathematicians,
  type ScholarRelation,
  scholarRelations,
} from "./mathematicians";
import { mathSubgraphs, type ScholarSubgraph } from "./scholar-subgraphs";

export type ScholarVisuals = {
  landmarks: string[];
  accents: string[];
  groups: { center: { x: number; y: number }; ids: string[] }[];
};
export type ScholarReadingRoute = {
  id: string;
  zh: string;
  en: string;
  ids: string[];
};
export type ScientistAtlas = {
  id: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  eyebrow: string;
  dossierLabel: string;
  defaultPerson: string;
  people: Mathematician[];
  relations: ScholarRelation[];
  subgraphs: ScholarSubgraph[];
  routes: ScholarReadingRoute[];
  visual?: ScholarVisuals;
};

const mathRoutes = [
  {
    id: "equations",
    zh: "方程为什么解不出来？",
    en: "When equations resist solutions",
    ids: ["lagrange", "abel", "galois", "klein"],
  },
  {
    id: "space",
    zh: "空间可以是弯曲的吗？",
    en: "What if space is curved?",
    ids: ["gauss", "riemann", "poincare", "chern", "mirzakhani"],
  },
  {
    id: "structure",
    zh: "从数走向结构",
    en: "From numbers to structures",
    ids: ["dedekind", "noether", "weil", "grothendieck"],
  },
  {
    id: "analysis",
    zh: "计算怎样变成严格的分析？",
    en: "How did calculation become rigorous analysis?",
    ids: ["fourier", "cauchy", "dirichlet", "weierstrass"],
  },
  {
    id: "origins",
    zh: "不同文明，怎样计算与证明？",
    en: "Calculation and proof across civilizations",
    ids: [
      "euclid",
      "archimedes",
      "liu-hui",
      "aryabhata",
      "al-khwarizmi",
      "fibonacci",
    ],
  },
  {
    id: "calculus",
    zh: "变化怎样被计算？",
    en: "How can we calculate change?",
    ids: ["descartes", "newton", "leibniz", "euler"],
  },
  {
    id: "chance",
    zh: "怎样给不确定性立规则？",
    en: "Giving uncertainty a mathematical language",
    ids: ["pascal", "huygens", "jacob-bernoulli", "laplace", "kolmogorov"],
  },
  {
    id: "computation",
    zh: "数学能证明和计算到哪里？",
    en: "The limits of proof and computation",
    ids: ["cantor", "russell", "godel", "church", "turing", "shannon"],
  },
  {
    id: "numbers",
    zh: "素数为什么总有新问题？",
    en: "Why do primes keep posing new questions?",
    ids: ["fermat", "gauss", "ramanujan", "hardy", "erdos"],
  },
]
  .map((route) => ({
    ...route,
    ids: route.ids.filter((id) =>
      mathematicians.some((person) => person.id === id),
    ),
  }))
  .filter((route) => route.ids.length > 1);

export const mathScientistAtlas: ScientistAtlas = {
  id: "mathematicians",
  href: "/learning/mathematicians/",
  title: { zh: "数学家人物志", en: "Lives of Mathematicians" },
  description: {
    zh: "从欧几里得、刘徽、牛顿到高斯、诺特、图灵与米尔扎哈尼，沿学术关系探索50位数学家的成果与人生。",
    en: "Explore fifty mathematical lives through discoveries, portraits and documented academic connections.",
  },
  eyebrow: "MATHEMATICS",
  dossierLabel: "A LIFE IN MATHEMATICS",
  defaultPerson: "gauss",
  people: mathematicians,
  relations: scholarRelations,
  subgraphs: mathSubgraphs,
  routes: mathRoutes,
};
export function completeAtlas(atlas: ScientistAtlas): ScientistAtlas {
  const ids = new Set(atlas.people.map((p) => p.id));
  return {
    ...atlas,
    people: [...atlas.people].sort(
      (a, b) => a.born - b.born || a.id.localeCompare(b.id),
    ),
    defaultPerson: ids.has(atlas.defaultPerson)
      ? atlas.defaultPerson
      : atlas.people[0].id,
    subgraphs: atlas.subgraphs
      .map((s) => ({ ...s, people: s.people.filter((id) => ids.has(id)) }))
      .filter((s) => s.people.length),
    routes: atlas.routes
      .map((r) => ({ ...r, ids: r.ids.filter((id) => ids.has(id)) }))
      .filter((r) => r.ids.length > 1),
  };
}
