import type { KnowledgeAtlas } from "@/data/knowledge-atlas";

import rawTopics from "./topics.json";

export type K12Stage = "primary" | "middle" | "high";
export type K12Topic = {
  id: string;
  stage: K12Stage;
  domain: string;
  title: string;
  prerequisites: string[];
  goal: string;
  formula: string;
  level: "core" | "selective" | "extension";
  order: number;
};
export const k12Topics = rawTopics as K12Topic[];
export const k12Updated = "2026-09-28";
export const k12Stages = [
  {
    id: "primary",
    title: "小学数学",
    en: "Primary mathematics",
    description:
      "从数感、运算与分数出发，用测量、图形和生活问题建立数学的意义。",
  },
  {
    id: "middle",
    title: "初中数学",
    en: "Middle-school mathematics",
    description: "从具体的数走向代数、函数和证明；每一步都能回到已知的知识。",
  },
  {
    id: "high",
    title: "高中数学",
    en: "High-school mathematics",
    description:
      "连接函数、几何、向量、数列、导数与概率，覆盖必修和选择性必修主干。",
  },
] as const;
export const k12Domains: Record<
  string,
  { title: string; tone: "analysis" | "linear-algebra" | "matrix-calculus" }
> = {
  number: { title: "数与运算", tone: "analysis" },
  algebra: { title: "式与方程", tone: "analysis" },
  foundation: { title: "语言与推理", tone: "analysis" },
  function: { title: "函数与变化", tone: "analysis" },
  sequence: { title: "数列", tone: "analysis" },
  calculus: { title: "导数", tone: "analysis" },
  geometry: { title: "图形与几何", tone: "linear-algebra" },
  trigonometry: { title: "三角与测量", tone: "linear-algebra" },
  vector: { title: "向量", tone: "linear-algebra" },
  data: { title: "数据与随机", tone: "matrix-calculus" },
  application: { title: "应用与探究", tone: "matrix-calculus" },
};
export const k12LevelLabel = {
  core: "基础主干",
  selective: "选择性必修",
  extension: "拓展与衔接",
};
export const k12Sources = [
  {
    id: "compulsory",
    title: "教育部：义务教育课程方案和课程标准（2022 年版）",
    href: "https://www.moe.gov.cn/srcsite/A26/s8001/202204/t20220420_619921.html",
  },
  {
    id: "high-school",
    title: "人民教育出版社：普通高中课程标准（2017 年版 2020 年修订）",
    href: "https://www.pep.com.cn/xw/zt/rjwy/gzkb2020/",
  },
];
export function k12Topic(id: string) {
  return k12Topics.find((topic) => topic.id === id);
}
export function k12LessonHref(id: string) {
  return `/learning/k12/lesson/${id}`;
}
export const k12Routes = [
  {
    id: "first-numbers",
    title: "把数算明白",
    stage: "primary",
    description: "数位、分组、分数与百分数。",
    nodes: [
      "place-value",
      "multiplication",
      "operation-laws",
      "fraction-meaning",
      "equivalent-fractions",
      "fraction-add",
      "fraction-multiply",
      "fraction-divide",
      "percent",
    ],
  },
  {
    id: "measure-world",
    title: "测量身边的世界",
    stage: "primary",
    description: "从长度走向面积、体积和调查。",
    nodes: [
      "length-units",
      "angles",
      "perimeter-area",
      "area-transform",
      "circle-primary",
      "volume",
      "measurement-project",
    ],
  },
  {
    id: "factor-route",
    title: "学会因式分解",
    stage: "middle",
    description: "先理解分配律，再反过来寻找因式。",
    nodes: [
      "operation-laws",
      "letters",
      "expressions",
      "like-terms",
      "exponent-laws",
      "product-identities",
      "factor-common",
      "factor-identities",
      "factor-quadratic",
      "quadratic-equations",
    ],
  },
  {
    id: "proof-route",
    title: "学会写几何证明",
    stage: "middle",
    description: "从条件和结论出发，连接全等与相似。",
    nodes: [
      "lines-angles",
      "proof",
      "triangle-properties",
      "congruence",
      "isosceles",
      "pythagoras",
      "similarity",
      "geometry-strategy",
    ],
  },
  {
    id: "function-route",
    title: "从方程走向函数",
    stage: "middle",
    description: "把代数计算变成能看见的变化。",
    nodes: [
      "linear-equations",
      "coordinates",
      "functions-middle",
      "linear-functions",
      "linear-graphs",
      "quadratic-functions",
      "quadratic-graphs",
    ],
  },
  {
    id: "calculus-route",
    title: "走向导数与优化",
    stage: "high",
    description: "在函数的定义、图像和变化率之间往返。",
    nodes: [
      "function-definition",
      "function-monotonicity",
      "function-transforms",
      "exponential",
      "logarithms",
      "derivative-definition",
      "derivative-rules",
      "derivative-monotone",
      "derivative-optimization",
    ],
  },
  {
    id: "chance-route",
    title: "用概率理解不确定",
    stage: "high",
    description: "从事件和计数进入条件概率与随机变量。",
    nodes: [
      "events",
      "counting-principles",
      "permutations",
      "combinations",
      "conditional-probability",
      "random-variables",
      "expectation-variance",
      "binomial-distribution",
    ],
  },
  {
    id: "ai-route",
    title: "连接大学数学与 AI",
    stage: "high",
    description: "让向量、导数和期望在同一个模型里相遇。",
    nodes: [
      "vectors",
      "vector-basis",
      "vector-dot",
      "derivative-definition",
      "derivative-rules",
      "expectation-variance",
      "math-ai-bridge",
    ],
  },
] as const;
export function getK12Atlas(stage: K12Stage): KnowledgeAtlas {
  const meta = k12Stages.find((item) => item.id === stage)!;
  const topics = k12Topics.filter((topic) => topic.stage === stage);
  const ids = new Set(topics.map((topic) => topic.id));
  const domains = [...new Set(topics.map((topic) => topic.domain))];
  return {
    id: `k12-${stage}`,
    title: { zh: meta.title + "知识网", en: meta.en + " atlas" },
    description: {
      zh: meta.description,
      en: "Chinese guided lessons, worked examples and practice for independent learning and tutoring.",
    },
    href: `/learning/k12/${stage}`,
    updated: k12Updated,
    defaultNode: topics[0].id,
    // Gentle domain attraction; the shared force engine remains free to settle.
    centers: {
      number: { x: 180, y: 160 },
      algebra: { x: 470, y: 230 },
      foundation: { x: 230, y: 110 },
      function: { x: 600, y: 240 },
      sequence: { x: 940, y: 170 },
      calculus: { x: 920, y: 500 },
      geometry: { x: 180, y: 550 },
      trigonometry: { x: 450, y: 650 },
      vector: { x: 250, y: 360 },
      data: { x: 720, y: 690 },
      application: { x: 990, y: 830 },
    },
    nodes: topics.map((topic) => ({
      id: topic.id,
      domain: topic.domain,
      label: { zh: topic.title, en: topic.title },
      shortLabel: {
        zh: topic.title.split(/[、：与]/)[0],
        en: topic.title.split(/[、：与]/)[0],
      },
      blurb: { zh: topic.goal, en: topic.goal },
      insight: { zh: topic.goal, en: topic.goal },
      formula: topic.formula,
      href: k12LessonHref(topic.id),
      hrefLabel: {
        zh: "进入独立讲义与学习路线",
        en: "Open the Chinese study guide",
      },
      lesson: { namespace: "k12-lessons", id: topic.id, locale: "zh" },
      sources: [stage === "high" ? "high-school" : "compulsory"],
    })),
    edges: topics.flatMap((topic) =>
      topic.prerequisites
        .filter((id) => ids.has(id))
        .map((source) => ({
          source,
          target: topic.id,
          kind: "prereq" as const,
        })),
    ),
    domains: domains.map((id) => ({
      id,
      label: { zh: k12Domains[id].title, en: k12Domains[id].title },
      symbol: "",
      tone: k12Domains[id].tone,
      sources: [],
    })),
    sources: k12Sources,
    paths: k12Routes
      .filter((route) => route.stage === stage)
      .map((route) => ({
        id: route.id,
        label: { zh: route.title, en: route.title },
        description: { zh: route.description, en: route.description },
        nodes: route.nodes.filter((id) => ids.has(id)),
      })),
    legend: [
      {
        tone: "analysis",
        label: { zh: "数、代数与变化", en: "Numbers and change" },
      },
      {
        tone: "linear-algebra",
        label: { zh: "几何、三角与向量", en: "Geometry and vectors" },
      },
      {
        tone: "matrix-calculus",
        label: { zh: "数据、应用与探究", en: "Data and applications" },
      },
    ],
  };
}
export const k12Atlases = k12Stages.map((stage) => getK12Atlas(stage.id));
