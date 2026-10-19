import type {
  AtlasDomain,
  AtlasEdge,
  AtlasNode,
  KnowledgeAtlas,
} from "../knowledge-atlas";
import { getLearningItem } from "../learning/catalog";
import type { Localized } from "../learning/types";
import { aiDomains, aiLevels, aiNodeById, aiNodes, aiRoutes } from "./index";
import type { AIDomainId, AINode } from "./types";

// Editorial map labels: the complete bilingual title remains in `label`.
const shortLabels: Record<string, [string, string]> = {
  "vectors-matrices": ["向量矩阵", "Vectors & matrices"],
  "linear-maps": ["线性映射", "Linear maps"],
  "rank-nullspace": ["秩与零空间", "Rank & nullspace"],
  "inner-products": ["内积与距离", "Inner products"],
  eigenvalues: ["特征分解", "Eigenvalues"],
  svd: ["奇异值分解", "SVD"],
  "matrix-factorization": ["矩阵分解", "Factorization"],
  derivatives: ["导数与变化", "Derivatives"],
  "multivariable-calculus": ["多元微积分", "Multivariable"],
  "chain-rule": ["链式法则", "Chain rule"],
  "taylor-hessian": ["泰勒与曲率", "Taylor & Hessian"],
  integrals: ["积分与累积", "Integrals"],
  "numerical-stability": ["数值稳定性", "Numerical stability"],
  "information-geometry": ["信息几何", "Information geometry"],
  "probability-rules": ["概率规则", "Probability"],
  "random-variables": ["随机变量", "Random variables"],
  "expectation-variance": ["期望与方差", "Mean & variance"],
  "conditional-probability": ["条件概率", "Conditioning"],
  "bayes-rule": ["贝叶斯公式", "Bayes' rule"],
  "common-distributions": ["常见分布", "Distributions"],
  "multivariate-gaussian": ["多元高斯", "Gaussian vectors"],
  independence: ["独立与相关", "Independence"],
  "lln-clt": ["大数与极限", "LLN & CLT"],
  estimation: ["统计估计", "Estimation"],
  "hypothesis-tests": ["假设检验", "Hypothesis tests"],
  "confidence-intervals": ["置信区间", "Confidence intervals"],
  "entropy-kl": ["熵与散度", "Entropy & KL"],
  "monte-carlo": ["蒙特卡洛", "Monte Carlo"],
  "objective-functions": ["目标函数", "Objectives"],
  convexity: ["凸集与凸性", "Convexity"],
  "gradient-descent": ["梯度下降", "Gradient descent"],
  "stochastic-gradients": ["随机梯度", "Stochastic gradients"],
  "momentum-adam": ["动量与Adam", "Momentum & Adam"],
  "learning-rate": ["学习率调度", "Learning rates"],
  "constrained-optimization": ["约束优化", "Constrained opt."],
  "duality-kkt": ["对偶与KKT", "Duality & KKT"],
  "second-order": ["二阶优化", "Second-order opt."],
  "proximal-methods": ["近端方法", "Proximal methods"],
  "nonconvex-optimization": ["非凸优化", "Nonconvex opt."],
  "automatic-differentiation": ["自动微分", "Autodiff"],
  "numerical-gradient-check": ["梯度校验", "Gradient checks"],
  "optimization-diagnostics": ["训练诊断", "Training diagnostics"],
  "python-programming": ["Python编程", "Python"],
  "array-computing": ["数组与张量", "Arrays & tensors"],
  "data-structures": ["数据结构", "Data structures"],
  "algorithm-complexity": ["算法复杂度", "Complexity"],
  "graphs-dynamic-programming": ["图与动态规划", "Graphs & DP"],
  "computer-architecture": ["计算机架构", "Architecture"],
  "operating-systems": ["操作系统", "Operating systems"],
  "databases-sql": ["数据库查询", "Databases & SQL"],
  networking: ["网络与通信", "Networking"],
  "software-testing": ["软件测试", "Software testing"],
  "git-environments": ["版本与环境", "Git & environments"],
  "linux-tooling": ["命令行工具", "Linux tools"],
  "parallel-programming": ["并行计算", "Parallel computing"],
  "numerical-precision": ["数值精度", "Precision"],
  "learning-problem": ["学习问题", "Learning problems"],
  "data-splits": ["数据划分", "Data splits"],
  "linear-regression": ["线性回归", "Linear regression"],
  "logistic-regression": ["逻辑回归", "Logistic regression"],
  regularization: ["模型正则化", "Regularization"],
  "bias-variance": ["偏差与方差", "Bias & variance"],
  "nearest-neighbors": ["近邻方法", "Nearest neighbors"],
  "decision-trees": ["决策树模型", "Decision trees"],
  ensembles: ["集成学习", "Ensembles"],
  "kernels-svm": ["核与间隔", "Kernels & SVM"],
  clustering: ["无监督聚类", "Clustering"],
  pca: ["主成分分析", "PCA"],
  "metrics-calibration": ["指标与校准", "Metrics & calibration"],
  "feature-engineering": ["特征工程", "Feature engineering"],
  "time-series": ["时间序列", "Time series"],
  recommenders: ["推荐系统", "Recommenders"],
  "perceptron-mlp": ["多层感知机", "Perceptrons & MLP"],
  backpropagation: ["反向传播", "Backpropagation"],
  initialization: ["参数初始化", "Initialization"],
  normalization: ["网络归一化", "Normalization"],
  "dl-regularization": ["网络正则化", "Network regularizers"],
  convolution: ["卷积与局部", "Convolution"],
  "sequence-models": ["循环与序列", "Sequence models"],
  attention: ["注意力机制", "Attention"],
  transformer: ["变换器架构", "Transformer"],
  embeddings: ["嵌入与向量", "Embeddings"],
  "representation-learning": ["表示学习", "Representations"],
  "self-supervision": ["自监督学习", "Self-supervision"],
  autoencoders: ["自编码器", "Autoencoders"],
  "generative-models": ["生成模型", "Generative models"],
  diffusion: ["扩散与去噪", "Diffusion"],
  "graph-neural-networks": ["图神经网络", "Graph networks"],
  "bayesian-inference": ["贝叶斯推断", "Bayes inference"],
  "graphical-models": ["概率图模型", "Graphical models"],
  "conditional-independence": ["条件独立", "Conditional indep."],
  "exact-inference": ["精确推断", "Exact inference"],
  "variational-inference": ["变分推断", "Variational inference"],
  mcmc: ["马氏链采样", "MCMC"],
  "em-algorithm": ["期望最大化", "EM algorithm"],
  "latent-variable-models": ["潜变量模型", "Latent variables"],
  "gaussian-processes": ["高斯过程", "Gaussian processes"],
  "causal-graphs": ["因果图模型", "Causal graphs"],
  interventions: ["干预与行动", "Interventions"],
  "confounding-identification": ["混杂与识别", "Identification"],
  counterfactuals: ["反事实推断", "Counterfactuals"],
  "causal-estimation": ["因果效应估计", "Causal estimation"],
  "state-space-search": ["状态空间搜索", "State-space search"],
  "heuristic-search": ["启发式搜索", "Heuristic search"],
  "constraint-satisfaction": ["约束满足", "Constraints"],
  "propositional-logic": ["命题逻辑", "Propositional logic"],
  "first-order-logic": ["一阶逻辑", "First-order logic"],
  "logical-inference": ["逻辑推断", "Logical inference"],
  "knowledge-representation": ["知识表示", "Knowledge models"],
  "knowledge-graphs": ["知识图谱", "Knowledge graphs"],
  "automated-planning": ["自动规划", "Planning"],
  "game-search": ["博弈搜索", "Game search"],
  neurosymbolic: ["神经符号", "Neurosymbolic"],
  "reasoning-verification": ["推理验证", "Verification"],
  tokenization: ["文本词元化", "Tokenization"],
  "language-modeling": ["语言建模", "Language modeling"],
  "word-vectors": ["词向量表示", "Word vectors"],
  "nlp-tasks": ["语言处理任务", "Language tasks"],
  pretraining: ["大规模预训练", "Pretraining"],
  "instruction-tuning": ["指令微调", "Instruction tuning"],
  "parameter-efficient-tuning": ["高效微调", "Efficient tuning"],
  "preference-learning": ["偏好学习", "Preference learning"],
  decoding: ["解码与采样", "Decoding"],
  retrieval: ["信息检索", "Retrieval"],
  rag: ["检索增强", "RAG"],
  "tool-use-agents": ["工具与智能体", "Tools & agents"],
  "long-context": ["长上下文", "Long context"],
  "language-evaluation": ["语言模型评测", "Language evaluation"],
  "scaling-laws": ["规模规律", "Scaling laws"],
  "model-editing": ["模型编辑", "Model editing"],
  "image-signals": ["图像与信号", "Image signals"],
  "image-classification": ["图像分类", "Classification"],
  "object-detection": ["目标检测", "Object detection"],
  segmentation: ["图像分割", "Segmentation"],
  "visual-transformers": ["视觉变换器", "Vision transformers"],
  "self-supervised-vision": ["视觉自监督", "Visual SSL"],
  "geometry-3d": ["三维几何", "3D geometry"],
  "optical-flow-video": ["光流与视频", "Flow & video"],
  "vision-language": ["视觉与语言", "Vision & language"],
  "image-generation": ["图像生成", "Image generation"],
  "audio-speech": ["音频与语音", "Audio & speech"],
  "multimodal-fusion": ["多模态融合", "Multimodal fusion"],
  "visual-evaluation": ["视觉模型评测", "Visual evaluation"],
  equivariance: ["对称与等变", "Equivariance"],
  mdp: ["马尔可夫决策", "MDPs"],
  "bellman-equations": ["贝尔曼方程", "Bellman equations"],
  "dynamic-programming-rl": ["动态规划决策", "Dynamic programming"],
  "monte-carlo-td": ["时序差分", "Monte Carlo & TD"],
  "q-learning": ["动作价值学习", "Q-learning"],
  "policy-gradients": ["策略梯度", "Policy gradients"],
  "actor-critic": ["演员与评论家", "Actor–critic"],
  ppo: ["近端策略优化", "PPO"],
  exploration: ["探索与利用", "Exploration"],
  "off-policy-learning": ["离策略学习", "Off-policy learning"],
  "model-based-rl": ["基于模型决策", "Model-based RL"],
  "offline-rl": ["离线强化学习", "Offline RL"],
  "imitation-learning": ["模仿学习", "Imitation learning"],
  "control-robotics": ["控制与机器人", "Control & robotics"],
  "data-pipelines": ["数据流水线", "Data pipelines"],
  "dataset-versioning": ["数据集版本", "Dataset versions"],
  "gpu-computing": ["GPU计算", "GPU computing"],
  "distributed-training": ["分布式训练", "Distributed training"],
  "mixed-precision": ["混合精度", "Mixed precision"],
  "memory-efficiency": ["显存与内存", "Memory efficiency"],
  checkpointing: ["检查点恢复", "Checkpointing"],
  "inference-serving": ["推理服务", "Inference serving"],
  quantization: ["量化与精度", "Quantization"],
  distillation: ["知识蒸馏", "Distillation"],
  profiling: ["性能剖析", "Profiling"],
  "mlops-monitoring": ["部署与监控", "MLOps monitoring"],
  "edge-deployment": ["边缘部署", "Edge deployment"],
  "retrieval-systems": ["检索系统", "Retrieval systems"],
  "research-questions": ["研究问题", "Research questions"],
  "literature-review": ["文献脉络", "Literature review"],
  "paper-reading": ["论文精读", "Paper reading"],
  baselines: ["基线与比较", "Baselines"],
  "ablation-studies": ["消融与机制", "Ablation studies"],
  reproducibility: ["可复现实验", "Reproducibility"],
  "statistical-comparison": ["统计比较", "Statistical comparison"],
  "generalization-theory": ["泛化理论", "Generalization"],
  "distribution-shift": ["分布变化", "Distribution shift"],
  uncertainty: ["不确定性", "Uncertainty"],
  "scientific-writing": ["科学写作", "Scientific writing"],
  "research-project": ["研究项目", "Research projects"],
  "data-governance": ["数据治理", "Data governance"],
  privacy: ["隐私保护", "Privacy"],
  fairness: ["群体公平", "Fairness"],
  explainability: ["解释与诊断", "Explainability"],
  "robustness-security": ["鲁棒与安全", "Robustness & security"],
  "safety-evaluation": ["安全评测", "Safety evaluation"],
  "human-oversight": ["人机监督", "Human oversight"],
  "misuse-threat-models": ["威胁与滥用", "Misuse threats"],
  "environment-cost": ["资源与环境", "Compute & environment"],
  "research-integrity": ["研究诚信", "Research integrity"],
};

const centers: Record<AIDomainId, { x: number; y: number }> = {
  mathematics: { x: 250, y: 230 },
  probability: { x: 600, y: 150 },
  optimization: { x: 960, y: 220 },
  computing: { x: 1460, y: 200 },
  "machine-learning": { x: 590, y: 550 },
  "deep-learning": { x: 1010, y: 640 },
  "probabilistic-causal": { x: 230, y: 800 },
  reasoning: { x: 1370, y: 720 },
  language: { x: 1010, y: 1060 },
  vision: { x: 690, y: 1130 },
  reinforcement: { x: 1390, y: 1110 },
  systems: { x: 1730, y: 570 },
  research: { x: 360, y: 1270 },
  responsibility: { x: 1710, y: 1330 },
};

// Fourteen landmarks orient the overview without allowing raw degree to turn
// every mathematical prerequisite into a larger label than the AI concepts.
const landmarks: Record<string, number> = {
  "vectors-matrices": 0.7,
  "probability-rules": 0.73,
  "gradient-descent": 0.85,
  "python-programming": 0.7,
  "learning-problem": 1,
  transformer: 0.95,
  "bayesian-inference": 0.85,
  "state-space-search": 0.8,
  "language-modeling": 0.9,
  "image-classification": 0.78,
  mdp: 0.86,
  "inference-serving": 0.76,
  "research-questions": 0.82,
  "safety-evaluation": 0.76,
};

const domainTones: Record<AIDomainId, NonNullable<AtlasDomain["tone"]>> = {
  mathematics: "analysis",
  probability: "analysis",
  optimization: "analysis",
  computing: "analysis",
  "machine-learning": "linear-algebra",
  "deep-learning": "linear-algebra",
  "probabilistic-causal": "linear-algebra",
  reasoning: "linear-algebra",
  language: "matrix-calculus",
  vision: "matrix-calculus",
  reinforcement: "matrix-calculus",
  systems: "matrix-calculus",
  research: "matrix-calculus",
  responsibility: "matrix-calculus",
};

const sources: { id: string; title: string; href: string }[] = [];
const sourceIds = new Map<string, string>();
for (const node of aiNodes) {
  for (const item of node.sources) {
    const href = item.url.trim();
    if (!sourceIds.has(href)) {
      const id = `ai-source-${sources.length + 1}`;
      sourceIds.set(href, id);
      sources.push({ id, title: item.title, href });
    }
  }
}

function readingSources(node: AINode) {
  return [...new Map(node.sources.map((item) => [item.url, item])).values()]
    .map((item) => `- [${item.title}](${item.url})`)
    .join("\n");
}

function lesson(node: AINode): NonNullable<AtlasNode["inlineLesson"]> {
  const notation = node.formula
    ? `## 用符号表达\n\n$$\n${node.formula}\n$$\n\n`
    : "";
  const prerequisites = node.prerequisites.length
    ? node.prerequisites
        .map((id) => `- ${aiNodeById.get(id)!.title.zh}`)
        .join("\n")
    : "可以从这里开始；结合例子检查自己的理解。";
  const references = `## 继续阅读\n\n${readingSources(node)}`;
  return {
    beginner: [
      `## 核心概念\n\n${node.summary}`,
      `## 为什么要学\n\n${node.why}`,
      `## 一个例子\n\n${node.example}`,
      `${notation}## 先记住一个边界\n\n${node.pitfall}`,
      references,
    ].join("\n\n"),
    formal: [
      `## 学习目标\n\n${node.summary}`,
      `## 掌握标准\n\n${node.mastery.map((item, index) => `${index + 1}. ${item}`).join("\n")}`,
      `${notation}## 适用条件与常见误区\n\n${node.pitfall}`,
      `## 用例子自查\n\n${node.example}`,
      `## 建议先修\n\n${prerequisites}`,
      references,
    ].join("\n\n"),
    intro: {
      beginner: {
        zh: node.summary,
        en: node.summary,
      },
      formal: {
        zh: node.pitfall,
        en: node.pitfall,
      },
    },
  };
}

const scopeLabels: Record<AINode["scope"], Localized> = {
  shared: { zh: "共同主干", en: "Shared foundations" },
  specialist: { zh: "方向深化", en: "Specialist" },
};

const nodes: AtlasNode[] = aiNodes.map((node) => {
  const short = shortLabels[node.id];
  if (!short) throw new Error(`Missing AI atlas short label: ${node.id}`);
  return {
    id: node.id,
    domain: node.domain,
    label: node.title,
    shortLabel: { zh: short[0], en: short[1] },
    blurb: { zh: node.summary, en: node.summary },
    formula: node.formula ?? "",
    preview: { zh: node.why, en: node.why },
    insight: { zh: node.why, en: node.why },
    example: node.example,
    sources: [
      ...new Set(node.sources.map((item) => sourceIds.get(item.url.trim())!)),
    ],
    inlineLesson: lesson(node),
    badges: [aiLevels[node.level], scopeLabels[node.scope]],
    mapImportance:
      landmarks[node.id] ??
      (node.scope === "shared"
        ? node.level === "foundation"
          ? 0.4
          : 0.33
        : 0.18),
  };
});

const pairKey = (a: string, b: string) => [a, b].sort().join("\u0000");
const edges: AtlasEdge[] = [];
const prerequisitePairs = new Set<string>();
const directedPrerequisites = new Set<string>();
for (const node of aiNodes) {
  for (const prerequisite of node.prerequisites) {
    if (!aiNodeById.has(prerequisite)) {
      throw new Error(`Missing AI prerequisite: ${prerequisite}`);
    }
    const directedKey = `${prerequisite}\u0000${node.id}`;
    if (!directedPrerequisites.has(directedKey)) {
      edges.push({ source: prerequisite, target: node.id, kind: "prereq" });
      directedPrerequisites.add(directedKey);
    }
    prerequisitePairs.add(pairKey(prerequisite, node.id));
  }
}
const relatedPairs = new Set<string>();
for (const node of aiNodes) {
  for (const related of node.related ?? []) {
    if (!aiNodeById.has(related)) {
      throw new Error(`Missing AI related concept: ${related}`);
    }
    const key = pairKey(node.id, related);
    if (prerequisitePairs.has(key) || relatedPairs.has(key)) continue;
    edges.push({ source: node.id, target: related, kind: "related" });
    relatedPairs.add(key);
  }
}

const routeDescriptions: Record<string, string> = {
  starting:
    "Connect mathematical representations, probability, differentiation and code before studying learning problems.",
  "first-model":
    "Build a sound experiment, from data splitting and baselines to evaluation and reproducibility.",
  neural:
    "Follow the computation graph through training, architectures and learned representations.",
  llm: "Study models, data, retrieval and evaluation together; an application demo is not a research conclusion.",
  embodied:
    "Connect perception and geometry to environment models, actions and human oversight.",
  phd: "Start from a falsifiable question and build a chain of evidence through fair experiments and clear reporting.",
};

export const aiKnowledgeAtlas: KnowledgeAtlas = {
  ...getLearningItem("ai-map"),
  defaultNode: "learning-problem",
  lessonKicker: { zh: "概念学习卡", en: "Concept notes" },
  readingModeLabels: {
    beginner: { zh: "概念与例子", en: "Concepts & examples" },
    formal: { zh: "掌握与边界", en: "Mastery & boundaries" },
  },
  readingModeStorageKey: "ai-map-reading-level",
  screenSpaceLabels: true,
  readingGuide: {
    beginner: {
      zh: "概念与例子：先看它是什么、为何有用，再动手验证一个例子。",
      en: "Concepts & examples: understand the idea, its purpose and a concrete example. Detailed notes are in Chinese.",
    },
    formal: {
      zh: "掌握与边界：用两条标准自查，核对方法成立的条件，再沿来源深入。",
      en: "Mastery & boundaries: check two practical goals, examine assumptions and follow the original sources. Notes are in Chinese.",
    },
  },
  nodes,
  edges,
  centers,
  domains: aiDomains.map((domain) => ({
    id: domain.id,
    label: domain.title,
    symbol: domain.symbol,
    tone: domainTones[domain.id],
    sources: [
      ...new Set(
        nodes
          .filter((node) => node.domain === domain.id)
          .flatMap((node) => node.sources ?? []),
      ),
    ],
  })),
  sources,
  paths: aiRoutes.map((route) => ({
    id: route.id,
    label: route.title,
    description: { zh: route.description, en: routeDescriptions[route.id] },
    nodes: [...route.nodes],
  })),
  legend: [
    {
      tone: "analysis",
      label: { zh: "数学与计算基础", en: "Mathematics & computing" },
    },
    {
      tone: "linear-algebra",
      label: { zh: "学习、推断与推理", en: "Learning & reasoning" },
    },
    {
      tone: "matrix-calculus",
      label: { zh: "应用、系统与研究", en: "Applications & research" },
    },
  ],
};
