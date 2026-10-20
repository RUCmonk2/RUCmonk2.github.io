import electrostatics from "../../content/physics-formulas/electrostatics.json";
import mechanics from "../../content/physics-formulas/mechanics.json";
import type { KnowledgeAtlas } from "./knowledge-atlas";

export const physicsFormulaHref = "/learning/k12/subjects/physics/formula-map";
export const physicsFormulaUpdated = "2026-10-20";
export type FormulaKind = "definition" | "law" | "derived" | "model";
export type FormulaStep = {
  title?: string;
  equation: string;
  explanation: string;
};
export type PhysicsFormula = {
  id: string;
  title: string;
  domain: "motion" | "energy" | "field";
  kind: FormulaKind;
  summary: string;
  intuition: string;
  formula: string;
  symbols: { symbol: string; meaning: string; unit: string }[];
  conditions: string[];
  steps: FormulaStep[];
  example: { problem: string; steps: FormulaStep[]; result: string };
  pitfalls: string[];
  check: { question: string; answer: string };
  formalNote: string;
};
export const physicsFormulas = [
  ...mechanics,
  ...electrostatics,
] as PhysicsFormula[];
export const formulaKinds: Record<FormulaKind, string> = {
  definition: "定义",
  law: "实验规律",
  derived: "推导结果",
  model: "模型应用",
};
export type FormulaRelation =
  "definition" | "deduction" | "condition" | "analogy";
export const formulaRelationLabels: Record<FormulaRelation, string> = {
  definition: "使用定义",
  deduction: "推导依据",
  condition: "条件特例",
  analogy: "方法类比",
};
export type FormulaEdge = {
  source: string;
  target: string;
  relation: FormulaRelation;
  reason: string;
};
export const physicsFormulaEdges: FormulaEdge[] = [
  {
    source: "motion",
    target: "work-energy",
    relation: "deduction",
    reason:
      "在一维恒合力示范中消去时间，得到速度平方与位移的关系；一般动能定理的范围更广。",
  },
  {
    source: "newton",
    target: "work-energy",
    relation: "deduction",
    reason: "用合力与加速度的关系，把运动学等式接到受力。",
  },
  {
    source: "work",
    target: "work-energy",
    relation: "definition",
    reason: "把力与位移的数量积识别为功。",
  },
  {
    source: "kinetic-energy",
    target: "work-energy",
    relation: "definition",
    reason: "把质量乘速率平方的一半识别为动能，区分状态量与变化量。",
  },
  {
    source: "work",
    target: "gravitational-energy",
    relation: "deduction",
    reason: "重力功只由高度差决定，可用重力势能的减少表示。",
  },
  {
    source: "work-energy",
    target: "mechanical-energy",
    relation: "deduction",
    reason: "先列所有力的总功，再把重力功改写成势能变化。",
  },
  {
    source: "gravitational-energy",
    target: "mechanical-energy",
    relation: "definition",
    reason: "将重力势能计入能量和，检查其他力总功是否为零。",
  },
  {
    source: "coulomb",
    target: "point-charge-field",
    relation: "deduction",
    reason: "提供真空中静止点电荷作用力的实验规律。",
  },
  {
    source: "electric-field",
    target: "point-charge-field",
    relation: "definition",
    reason: "用场强定义除去试探电荷，得到由场源与位置决定的场强。",
  },
  {
    source: "work",
    target: "electric-potential",
    relation: "definition",
    reason: "先理解做功；静电力的保守性使电势能差能够定义。",
  },
  {
    source: "gravitational-energy",
    target: "electric-potential",
    relation: "analogy",
    reason: "借重力功与势能理解电势能；类比不代替静电场性质的证明。",
  },
  {
    source: "electric-potential",
    target: "electric-work",
    relation: "definition",
    reason: "把电势能、电势及电势差的定义代入功与势能关系。",
  },
  {
    source: "electric-field",
    target: "uniform-field",
    relation: "definition",
    reason: "用电场力等于带符号电荷量乘场强的矢量关系。",
  },
  {
    source: "work",
    target: "uniform-field",
    relation: "definition",
    reason: "匀强场中电场力恒定，可以使用恒力做功公式。",
  },
  {
    source: "electric-work",
    target: "uniform-field",
    relation: "condition",
    reason: "在匀强电场下比较两种做功写法，得到电势差与位移投影的关系。",
  },
  {
    source: "work-energy",
    target: "combined-energy",
    relation: "deduction",
    reason: "所有力的功决定动能变化，不能只记电场力的功。",
  },
  {
    source: "gravitational-energy",
    target: "combined-energy",
    relation: "definition",
    reason: "把重力功改写成重力势能变化，避免重复计入。",
  },
  {
    source: "electric-work",
    target: "combined-energy",
    relation: "deduction",
    reason: "把电场力的功改写成电势能变化，再判断所列能量和是否守恒。",
  },
  {
    source: "work-energy",
    target: "acceleration",
    relation: "condition",
    reason: "其他力总功为零时，电场力的功等于动能变化；从静止加速是常用特例。",
  },
  {
    source: "electric-work",
    target: "acceleration",
    relation: "deduction",
    reason: "用带符号的电荷量与电势差计算加速区电场力的功。",
  },
  {
    source: "motion",
    target: "deflection",
    relation: "condition",
    reason: "均匀偏转场内，按方向分别使用匀速与匀加速关系。",
  },
  {
    source: "newton",
    target: "deflection",
    relation: "deduction",
    reason: "由电场力与质量求竖直加速度。",
  },
  {
    source: "uniform-field",
    target: "deflection",
    relation: "condition",
    reason: "忽略边缘效应的平行板内，用电压大小和板距求匀强场。",
  },
  {
    source: "acceleration",
    target: "deflection",
    relation: "condition",
    reason:
      "同一粒子先由静止加速、再水平入射时，可消去入射速度；不满足该条件时保留一般式。",
  },
];

export const legacyFormulaTopics: Record<string, string[]> = {
  "high-mechanics-1": ["motion"],
  "high-mechanics-3": ["newton"],
  "high-mechanics-4": ["deflection"],
  "high-conservation-1": ["work-energy", "work", "kinetic-energy"],
  "high-conservation-2": [
    "mechanical-energy",
    "gravitational-energy",
    "combined-energy",
  ],
  "high-fields-1": [
    "electric-work",
    "coulomb",
    "electric-field",
    "point-charge-field",
    "electric-potential",
    "uniform-field",
    "acceleration",
  ],
};

const display = (equation: string) =>
  equation ? `\n\n$$\n${equation}\n$$\n\n` : "\n\n";
function stepsMarkdown(steps: FormulaStep[]) {
  return steps
    .map(
      (step, i) =>
        `### ${i + 1}. ${step.title ?? "列式与计算"}${display(step.equation)}${step.explanation}`,
    )
    .join("\n\n");
}
export function formulaById(id: string): PhysicsFormula {
  const node = physicsFormulas.find((item) => item.id === id);
  if (!node) throw new Error(`Unknown physics formula: ${id}`);
  return node;
}
export function formulaConnections(id: string) {
  return {
    before: physicsFormulaEdges.filter(
      (e) => e.target === id && e.relation !== "analogy",
    ),
    after: physicsFormulaEdges.filter(
      (e) => e.source === id && e.relation !== "analogy",
    ),
    related: physicsFormulaEdges.filter(
      (e) => e.relation === "analogy" && (e.source === id || e.target === id),
    ),
  };
}
export function formulaConnectionsMarkdown(id: string) {
  const groups = formulaConnections(id);
  const lines = Object.entries(groups).flatMap(([group, edges]) => {
    if (!edges.length) return [];
    const title =
      group === "before"
        ? "推导前提（需要共同使用）"
        : group === "after"
          ? "由此继续"
          : "方法类比";
    return [
      `### ${title}`,
      ...edges.map((edge) => {
        const other = formulaById(
          edge.source === id ? edge.target : edge.source,
        );
        return `- [${other.title}](${physicsFormulaHref}#${other.id}) · **${formulaRelationLabels[edge.relation]}**：${edge.reason}`;
      }),
    ];
  });
  return lines.join("\n\n");
}
export function physicsLessonMarkdown(
  node: PhysicsFormula,
  mode: "beginner" | "formal",
) {
  const symbols = `| 符号 | 含义 | 单位 |\n| --- | --- | --- |\n${node.symbols.map((s) => `| $${s.symbol}$ | ${s.meaning} | $${s.unit}$ |`).join("\n")}`;
  const conditions = node.conditions.map((c) => `- ${c}`).join("\n");
  const example = `${node.example.problem}\n\n${stepsMarkdown(node.example.steps)}\n\n**结果与检查：** ${node.example.result}`;
  const start =
    mode === "beginner"
      ? `${node.intuition}\n\n## 要得到的关系${display(node.formula)}**性质：${formulaKinds[node.kind]}。** ${node.summary}`
      : `**${formulaKinds[node.kind]}** · ${node.summary}${display(node.formula)}${node.formalNote}`;
  return `${start}\n\n## 符号与单位\n\n${symbols}\n\n## 适用条件\n\n${conditions}\n\n## ${node.kind === "law" ? "实验起点与使用依据" : node.kind === "definition" ? "定义的由来与使用" : "逐步推导"}\n\n${stepsMarkdown(node.steps)}\n\n## 完整例题\n\n${example}\n\n## 容易混淆的地方\n\n${node.pitfalls.map((p) => `- ${p}`).join("\n")}\n\n${mode === "beginner" ? `## 进一步核对\n\n${node.formalNote}\n\n` : ""}## 知识联系\n\n${formulaConnectionsMarkdown(node.id)}\n\n## 自己试试\n\n${node.check.question}\n\n<!-- solutions -->\n\n### 参考解答与理由\n\n${node.check.answer}`;
}
export function legacyPhysicsDerivation(id: string) {
  const ids = legacyFormulaTopics[id];
  if (!ids) return "";
  const node = formulaById(ids[0]);
  return `\n\n## 把公式一步一步接起来\n\n下面展开「${node.title}」的关键过程；完整条件、符号表和更多例题可沿链接阅读。\n\n${stepsMarkdown(node.steps)}\n\n**适用条件：**\n\n${node.conditions.map((c) => `- ${c}`).join("\n")}\n\n**继续阅读公式推导图：**\n\n${ids.map((key) => `- [${formulaById(key).title}](${physicsFormulaHref}#${key})`).join("\n")}`;
}

export const physicsFormulaAtlas: KnowledgeAtlas = {
  id: "physics-formulas",
  title: {
    zh: "功与能 · 静电场公式推导图",
    en: "Work, energy and electrostatic derivations",
  },
  description: {
    zh: "沿着前提看推导，带着条件用公式。",
    en: "Follow the premises, derivations and conditions.",
  },
  href: physicsFormulaHref,
  courseHref: "/learning/k12/subjects/physics",
  updated: physicsFormulaUpdated,
  defaultNode: "work-energy",
  lessonOutline: true,
  lessonKicker: {
    zh: "符号 · 条件 · 推导 · 应用",
    en: "SYMBOLS · CONDITIONS · DERIVATION · APPLICATION",
  },
  readingGuide: {
    beginner: {
      zh: "先理解问题，逐行看依据，再用例题与自检检验。",
      en: "Start with the idea, follow each step, then check your understanding.",
    },
    formal: {
      zh: "先核对关系的性质和适用范围，再逐项检查推导与应用。",
      en: "Check the status and assumptions of the relation before using it.",
    },
  },
  relationGuide: {
    zh: "箭头表示本专题的推导输入或条件特例；一个结论常需同时使用多个前提。虚线类比只帮助理解，不代替证明。",
    en: "Arrows identify inputs or conditional applications. A result often needs several premises together; analogies are not proofs.",
  },
  relationHeadings: {
    before: { zh: "推导前提 · 需要共同使用", en: "Premises used together" },
    after: { zh: "由此继续", en: "Build on this" },
    related: { zh: "方法类比", en: "Analogy" },
  },
  nodes: physicsFormulas.map((node) => ({
    id: node.id,
    domain: node.domain,
    label: { zh: node.title, en: node.title },
    blurb: { zh: node.intuition, en: node.intuition },
    insight: { zh: node.summary, en: node.summary },
    nature: { zh: formulaKinds[node.kind], en: formulaKinds[node.kind] },
    formula: node.formula,
    lesson: { namespace: "physics-formulas", id: node.id, locale: "zh" },
    href: "/learning/k12/subjects/physics/knowledge-map/high",
    hrefLabel: {
      zh: "回到高中物理主干知识网",
      en: "Back to the high-school physics overview",
    },
    sources: ["curriculum"],
  })),
  edges: physicsFormulaEdges.map((edge) => ({
    source: edge.source,
    target: edge.target,
    kind: edge.relation === "analogy" ? "related" : "prereq",
    relation: edge.relation,
    label: {
      zh: formulaRelationLabels[edge.relation],
      en: formulaRelationLabels[edge.relation],
    },
    explanation: { zh: edge.reason, en: edge.reason },
  })),
  domains: [
    {
      id: "motion",
      label: { zh: "运动与受力", en: "Motion and force" },
      symbol: "",
      sources: [],
      tone: "analysis",
    },
    {
      id: "energy",
      label: { zh: "功与能量", en: "Work and energy" },
      symbol: "",
      sources: [],
      tone: "linear-algebra",
    },
    {
      id: "field",
      label: { zh: "静电场", en: "Electrostatics" },
      symbol: "",
      sources: [],
      tone: "matrix-calculus",
    },
  ],
  centers: {
    motion: { x: 220, y: 250 },
    energy: { x: 490, y: 520 },
    field: { x: 820, y: 310 },
  },
  paths: [
    {
      id: "mechanics",
      label: {
        zh: "从运动学推到机械能",
        en: "From motion to mechanical energy",
      },
      description: {
        zh: "消去时间，加入受力与功，再把重力功改写成势能变化。",
        en: "Link motion, force and work, then introduce potential energy.",
      },
      nodes: [
        "motion",
        "newton",
        "work",
        "kinetic-energy",
        "work-energy",
        "gravitational-energy",
        "mechanical-energy",
      ],
    },
    {
      id: "electricity",
      label: {
        zh: "把静电场接进能量账",
        en: "Bring electrostatics into the energy balance",
      },
      description: {
        zh: "分清实验规律与定义，推导电场功，再判断哪一种能量和守恒。",
        en: "Separate laws from definitions, calculate work and decide what is conserved.",
      },
      nodes: [
        "coulomb",
        "electric-field",
        "point-charge-field",
        "electric-potential",
        "electric-work",
        "uniform-field",
        "combined-energy",
      ],
    },
    {
      id: "particles",
      label: {
        zh: "用公式分析带电粒子",
        en: "Apply the relations to particles",
      },
      description: {
        zh: "加速区先求动能，偏转区分方向，最后检查模型条件。",
        en: "Use work in the acceleration region, then resolve motion in the deflection region.",
      },
      nodes: [
        "work-energy",
        "electric-work",
        "uniform-field",
        "acceleration",
        "deflection",
      ],
    },
  ],
  legend: [
    { tone: "analysis", label: { zh: "运动与受力", en: "Motion and force" } },
    {
      tone: "linear-algebra",
      label: { zh: "功与能量", en: "Work and energy" },
    },
    { tone: "matrix-calculus", label: { zh: "静电场", en: "Electrostatics" } },
  ],
  sources: [
    {
      id: "curriculum",
      title: "教育部 · 普通高中课程方案和课程标准",
      href: "https://www.moe.gov.cn/srcsite/A26/s8001/202006/t20200603_462199.html",
    },
  ],
};
