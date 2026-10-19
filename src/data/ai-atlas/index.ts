import { appliedNodes } from "./applied";
import { coreNodes } from "./core";
import { foundationNodes } from "./foundations";
import { researchNodes } from "./research";
import type { AIDomain, AINode, AIRoute } from "./types";
export * from "./types";

export const aiNodes: readonly AINode[] = [
  ...foundationNodes,
  ...coreNodes,
  ...appliedNodes,
  ...researchNodes,
];
export const aiNodeById = new Map(aiNodes.map((node) => [node.id, node]));
export const aiDomains: readonly AIDomain[] = [
  {
    id: "mathematics",
    title: { zh: "数学基础", en: "Mathematics" },
    symbol: "∇",
    description: "线性空间、微积分与可靠的数值计算。",
    color: "#527464",
    center: { x: 200, y: 145 },
  },
  {
    id: "probability",
    title: { zh: "概率与统计", en: "Probability & statistics" },
    symbol: "P",
    description: "描述不确定性，从样本推断总体。",
    color: "#527464",
    center: { x: 620, y: 145 },
  },
  {
    id: "optimization",
    title: { zh: "优化方法", en: "Optimization" },
    symbol: "min",
    description: "从目标函数、梯度到约束与训练诊断。",
    color: "#527464",
    center: { x: 1040, y: 145 },
  },
  {
    id: "computing",
    title: { zh: "计算与编程", en: "Computing" },
    symbol: "{ }",
    description: "算法、数据、软件与计算机系统的共同底座。",
    color: "#527464",
    center: { x: 1460, y: 145 },
  },
  {
    id: "machine-learning",
    title: { zh: "机器学习", en: "Machine learning" },
    symbol: "f(x)",
    description: "把任务写成可验证的学习问题，建立可靠基线。",
    color: "#986d46",
    center: { x: 200, y: 430 },
  },
  {
    id: "deep-learning",
    title: { zh: "深度学习", en: "Deep learning" },
    symbol: "θ",
    description: "表示、网络结构、自动微分与生成建模。",
    color: "#986d46",
    center: { x: 620, y: 430 },
  },
  {
    id: "probabilistic-causal",
    title: { zh: "概率模型与因果", en: "Probabilistic & causal models" },
    symbol: "do",
    description: "隐变量、推断与干预；分清相关和因果。",
    color: "#986d46",
    center: { x: 1040, y: 430 },
  },
  {
    id: "reasoning",
    title: { zh: "搜索与推理", en: "Search & reasoning" },
    symbol: "⊢",
    description: "搜索、逻辑、知识表达、规划和验证。",
    color: "#986d46",
    center: { x: 1460, y: 430 },
  },
  {
    id: "language",
    title: { zh: "语言与大模型", en: "Language & foundation models" },
    symbol: "Aa",
    description: "从词元和语言建模，到检索、对齐与工具使用。",
    color: "#697c98",
    center: { x: 200, y: 715 },
  },
  {
    id: "vision",
    title: { zh: "视觉与多模态", en: "Vision & multimodality" },
    symbol: "◉",
    description: "图像、几何、语音、视频及跨模态表示。",
    color: "#697c98",
    center: { x: 620, y: 715 },
  },
  {
    id: "reinforcement",
    title: { zh: "强化学习与决策", en: "Learning & decision making" },
    symbol: "π",
    description: "从序贯决策，到探索、控制和离线学习。",
    color: "#697c98",
    center: { x: 1040, y: 715 },
  },
  {
    id: "systems",
    title: { zh: "机器学习系统", en: "ML systems" },
    symbol: "⚙",
    description: "把训练和推理放进可复现、可观测的系统。",
    color: "#697c98",
    center: { x: 1460, y: 715 },
  },
  {
    id: "research",
    title: { zh: "研究方法与理论", en: "Research & theory" },
    symbol: "?",
    description: "提出问题、理解泛化、设计实验并表达证据。",
    color: "#84738c",
    center: { x: 500, y: 1000 },
  },
  {
    id: "responsibility",
    title: { zh: "安全与负责任 AI", en: "Responsible AI" },
    symbol: "◎",
    description: "数据、隐私、公平、鲁棒性和人的责任。",
    color: "#84738c",
    center: { x: 1160, y: 1000 },
  },
];
// A deliberately sparse orientation map. Detailed prerequisites live on concepts.
export const aiDomainLinks: readonly [string, string][] = [
  ["mathematics", "machine-learning"],
  ["probability", "machine-learning"],
  ["optimization", "deep-learning"],
  ["computing", "systems"],
  ["machine-learning", "deep-learning"],
  ["probability", "probabilistic-causal"],
  ["computing", "reasoning"],
  ["deep-learning", "language"],
  ["deep-learning", "vision"],
  ["probabilistic-causal", "reinforcement"],
  ["reasoning", "reinforcement"],
  ["language", "research"],
  ["systems", "responsibility"],
  ["research", "responsibility"],
];
export const aiRoutes: readonly AIRoute[] = [
  {
    id: "starting",
    title: { zh: "从数学与代码出发", en: "Start with mathematics & code" },
    description: "先连起表示、概率、求导与计算，再进入学习问题。",
    nodes: [
      "vectors-matrices",
      "linear-maps",
      "derivatives",
      "chain-rule",
      "probability-rules",
      "conditional-probability",
      "python-programming",
      "array-computing",
      "gradient-descent",
      "learning-problem",
    ],
  },
  {
    id: "first-model",
    title: { zh: "完成第一个可靠模型", en: "Build a reliable first model" },
    description: "从数据切分到比较基线，先把实验做对。",
    nodes: [
      "learning-problem",
      "data-splits",
      "linear-regression",
      "logistic-regression",
      "regularization",
      "feature-engineering",
      "metrics-calibration",
      "baselines",
      "statistical-comparison",
      "reproducibility",
    ],
  },
  {
    id: "neural",
    title: { zh: "理解并训练神经网络", en: "Understand neural networks" },
    description: "沿着计算图理解训练，再认识结构和表示。",
    nodes: [
      "chain-rule",
      "automatic-differentiation",
      "perceptron-mlp",
      "backpropagation",
      "initialization",
      "normalization",
      "optimization-diagnostics",
      "convolution",
      "attention",
      "transformer",
      "representation-learning",
    ],
  },
  {
    id: "llm",
    title: { zh: "走向语言模型研究", en: "Study language models" },
    description: "模型、数据、检索和评测一起学；应用体验不是研究结论。",
    nodes: [
      "tokenization",
      "language-modeling",
      "transformer",
      "pretraining",
      "instruction-tuning",
      "preference-learning",
      "retrieval",
      "rag",
      "tool-use-agents",
      "language-evaluation",
      "safety-evaluation",
    ],
  },
  {
    id: "embodied",
    title: { zh: "从感知走向决策", en: "From perception to decisions" },
    description: "把视觉表示、环境模型和行动连接起来。",
    nodes: [
      "image-signals",
      "convolution",
      "image-classification",
      "geometry-3d",
      "vision-language",
      "mdp",
      "bellman-equations",
      "policy-gradients",
      "model-based-rl",
      "control-robotics",
      "human-oversight",
    ],
  },
  {
    id: "phd",
    title: { zh: "开始一项博士研究", en: "Begin a research project" },
    description: "从可证伪的问题出发，建立证据而不是追逐分数。",
    nodes: [
      "literature-review",
      "paper-reading",
      "research-questions",
      "generalization-theory",
      "distribution-shift",
      "baselines",
      "ablation-studies",
      "statistical-comparison",
      "reproducibility",
      "research-integrity",
      "scientific-writing",
      "research-project",
    ],
  },
];
export const aiLevels = {
  foundation: { zh: "本科基础", en: "Foundations" },
  core: { zh: "专业核心", en: "Core" },
  research: { zh: "研究进阶", en: "Research" },
};
export function prerequisitesOf(id: string): string[] {
  const seen = new Set<string>();
  function visit(key: string) {
    for (const next of aiNodeById.get(key)?.prerequisites ?? []) {
      if (!seen.has(next) && next !== id) {
        seen.add(next);
        visit(next);
      }
    }
  }
  visit(id);
  return [...seen];
}
