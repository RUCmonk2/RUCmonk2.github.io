import type {
  AtlasDomain,
  AtlasEdge,
  AtlasNode,
  KnowledgeAtlas,
} from "../knowledge-atlas";
import { chapterPath, getLearningCourse } from "../learning";
import { getLearningItem } from "../learning/catalog";
import type { CourseSlug, Localized } from "../learning/types";
import { mathMapDomains, mathMapNode, mathMapSources } from "../math-map";

export const courseMapSlugs = [
  "deep-learning",
  "robotics",
  "ai-practice",
  "programming-2026",
] as const;
export type CourseMapSlug = (typeof courseMapSlugs)[number];
export type CourseAtlas = KnowledgeAtlas & {
  chapterNodes: Record<string, string>;
};
const t = (zh: string, en: string): Localized => ({ zh, en });
const domain = (
  id: string,
  label: Localized,
  symbol: string,
  tone: AtlasDomain["tone"],
): AtlasDomain => ({ id, label, symbol, tone, sources: [] });
const mathDomain = domain(
  "math",
  t("数学支点", "Mathematical foundations"),
  "∇",
  "linear-algebra",
);
const centers = {
  first: { x: 260, y: 200 },
  second: { x: 740, y: 230 },
  third: { x: 730, y: 660 },
  math: { x: 250, y: 640 },
};
type Topic = [
  chapter: string,
  label: string,
  english: string,
  group: string,
  formula: string,
];
const topics: Record<CourseSlug, Topic[]> = {
  "deep-learning": [
    [
      "foundations",
      "学习问题",
      "Learning problems",
      "first",
      String.raw`\hat y=\mathbf w^\top\mathbf x+b`,
    ],
    [
      "representations",
      "特征与表征",
      "Representations",
      "first",
      String.raw`\mathbf h=\phi(\mathbf x)`,
    ],
    [
      "generalization",
      "泛化与验证",
      "Generalization",
      "first",
      String.raw`R(\theta)=\mathbb E[\ell(f_\theta(X),Y)]`,
    ],
    [
      "losses",
      "损失与正则",
      "Loss & regularization",
      "second",
      String.raw`J(\theta)=\frac1N\sum_{i=1}^N\ell_i(\theta)+\lambda\Omega(\theta)`,
    ],
    [
      "optimization",
      "梯度更新",
      "Gradient updates",
      "second",
      String.raw`\theta_{t+1}=\theta_t-\alpha\nabla J(\theta_t)`,
    ],
    [
      "softmax",
      "分类训练",
      "Softmax training",
      "second",
      String.raw`\frac{\partial\ell}{\partial z_c}=p_c-y_c`,
    ],
    [
      "networks",
      "神经网络",
      "Neural networks",
      "third",
      String.raw`\mathbf a^{(l)}=\sigma_l(W^{(l)}\mathbf a^{(l-1)}+\mathbf b^{(l)})`,
    ],
    [
      "backprop",
      "反向传播",
      "Backpropagation",
      "third",
      String.raw`\nabla_W\ell=\boldsymbol\delta\mathbf a^\top`,
    ],
    [
      "autodiff",
      "自动微分",
      "Automatic differentiation",
      "third",
      String.raw`\nabla_\theta J=J_f(\theta)^\top\nabla_f\ell`,
    ],
    [
      "review",
      "训练自检",
      "Training checks",
      "third",
      String.raw`\hat y=wx+b,\quad\ell=\tfrac12(\hat y-y)^2`,
    ],
  ],
  robotics: [
    ["embodied", "具身任务", "Embodied tasks", "first", String.raw`e=q_d-q`],
    [
      "hardware",
      "关节与驱动",
      "Joints & drives",
      "first",
      String.raw`\omega_j=\omega_m/N,\quad\tau_j\approx\eta N\tau_m`,
    ],
    [
      "feedback",
      "反馈控制",
      "Feedback control",
      "first",
      String.raw`e=q_d-q,\quad u=K_p e`,
    ],
    [
      "transforms",
      "坐标变换",
      "Coordinate transforms",
      "second",
      String.raw`\mathbf p_A=R\mathbf p_B+\mathbf t`,
    ],
    [
      "interpolation",
      "轨迹插值",
      "Trajectory interpolation",
      "second",
      String.raw`q(t)=\sum_iq_iL_i(t)`,
    ],
    [
      "jacobian",
      "速度与奇异性",
      "Velocity & singularities",
      "second",
      String.raw`\dot{\mathbf p}=J(\mathbf q)\dot{\mathbf q}`,
    ],
    [
      "decisions",
      "序贯决策",
      "Sequential decisions",
      "third",
      String.raw`V^\pi(s)=\mathbb E_\pi[G_t\mid s_t=s]`,
    ],
  ],
  "ai-practice": [
    [
      "route",
      "应用到计算",
      "From tasks to computation",
      "first",
      String.raw`\mathbf x\longmapsto f_\theta(\mathbf x)\longmapsto\ell`,
    ],
    [
      "agents",
      "智能体与决策",
      "Agents & decisions",
      "first",
      String.raw`a^*\in\arg\max_a\mathbb E[U\mid o,a]`,
    ],
    [
      "science",
      "科学问题建模",
      "AI for Science",
      "first",
      String.raw`\dot{\mathbf x}=f_\theta(\mathbf x)`,
    ],
    [
      "learning-paradigms",
      "学习范式",
      "Learning paradigms",
      "second",
      String.raw`\min_\theta\frac1N\sum_{i=1}^N\ell(f_\theta(x_i),y_i)`,
    ],
    [
      "classical-methods",
      "经典模型",
      "Classical models",
      "second",
      String.raw`(A^\top A+\lambda I)x=A^\top b`,
    ],
    [
      "deep-models",
      "深层模型",
      "Deep models",
      "second",
      String.raw`h=\phi(Wx+b),\quad y=F(x)+x`,
    ],
    [
      "attention",
      "注意力",
      "Attention",
      "second",
      String.raw`Y=\operatorname{softmax}_{\rm row}(QK^\top/\sqrt{d_k})V`,
    ],
    [
      "indices",
      "张量指标",
      "Tensor indices",
      "third",
      String.raw`c_i=A_{ij}b_j`,
    ],
    [
      "tensor-operations",
      "外积与缩并",
      "Products & contractions",
      "third",
      String.raw`(a\otimes b)_{ij}=a_i b_j,\quad A:B=A_{ij}B_{ij}`,
    ],
    [
      "differential-operators",
      "场与微分算子",
      "Fields & operators",
      "third",
      String.raw`\nabla f,\quad\nabla\cdot v,\quad\nabla\times v,\quad\Delta f`,
    ],
    [
      "decomposition",
      "张量分解",
      "Tensor decompositions",
      "third",
      String.raw`x_{ijk}\approx\sum_{r=1}^{R}a_{ir}b_{jr}c_{kr}`,
    ],
  ],
};
const domainSets: Record<CourseSlug, AtlasDomain[]> = {
  "deep-learning": [
    domain("first", t("数据与任务", "Data & tasks"), "x", "analysis"),
    domain(
      "second",
      t("损失与训练", "Loss & training"),
      "ℓ",
      "matrix-calculus",
    ),
    domain(
      "third",
      t("网络与求导", "Networks & differentiation"),
      "W",
      "linear-algebra",
    ),
    mathDomain,
  ],
  robotics: [
    domain("first", t("身体与反馈", "Hardware & feedback"), "q", "analysis"),
    domain(
      "second",
      t("几何与运动", "Geometry & motion"),
      "R",
      "linear-algebra",
    ),
    domain(
      "third",
      t("任务与决策", "Tasks & decisions"),
      "π",
      "matrix-calculus",
    ),
    mathDomain,
  ],
  "ai-practice": [
    domain("first", t("任务与科学", "Tasks & science"), "U", "analysis"),
    domain(
      "second",
      t("学习与模型", "Learning & models"),
      "θ",
      "matrix-calculus",
    ),
    domain("third", t("张量语言", "Tensor language"), "⊗", "linear-algebra"),
    mathDomain,
  ],
};
const mathIds: Record<CourseSlug, string[]> = {
  "deep-learning": [
    "linear-map",
    "gradient",
    "chain",
    "entropy",
    "matrix-differential",
    "softmax",
  ],
  robotics: [
    "linear-map",
    "inner-product",
    "lie-group",
    "jacobian",
    "svd",
    "derivative",
    "expectation",
  ],
  "ai-practice": [
    "linear-map",
    "gradient",
    "entropy",
    "softmax",
    "frobenius",
    "nabla",
    "svd",
  ],
};
// Arrows encode preparation for a specific course topic, not every possible dependency.
const links: Record<CourseSlug, [string, string][]> = {
  "deep-learning": [
    ["foundations", "representations"],
    ["foundations", "losses"],
    ["representations", "generalization"],
    ["generalization", "losses"],
    ["losses", "optimization"],
    ["losses", "softmax"],
    ["optimization", "softmax"],
    ["representations", "networks"],
    ["networks", "backprop"],
    ["backprop", "autodiff"],
    ["autodiff", "review"],
    ["generalization", "review"],
    ["softmax", "review"],
    ["linear-map", "networks"],
    ["gradient", "optimization"],
    ["chain", "backprop"],
    ["entropy", "softmax"],
    ["matrix-differential", "backprop"],
    ["math:softmax", "softmax"],
  ],
  robotics: [
    ["embodied", "hardware"],
    ["hardware", "feedback"],
    ["embodied", "transforms"],
    ["transforms", "interpolation"],
    ["transforms", "jacobian"],
    ["interpolation", "jacobian"],
    ["embodied", "decisions"],
    ["linear-map", "transforms"],
    ["inner-product", "transforms"],
    ["lie-group", "transforms"],
    ["math:jacobian", "jacobian"],
    ["svd", "jacobian"],
    ["derivative", "interpolation"],
    ["expectation", "decisions"],
  ],
  "ai-practice": [
    ["route", "agents"],
    ["agents", "science"],
    ["science", "learning-paradigms"],
    ["learning-paradigms", "classical-methods"],
    ["classical-methods", "deep-models"],
    ["deep-models", "attention"],
    ["indices", "tensor-operations"],
    ["tensor-operations", "differential-operators"],
    ["tensor-operations", "decomposition"],
    ["linear-map", "classical-methods"],
    ["gradient", "deep-models"],
    ["entropy", "learning-paradigms"],
    ["softmax", "attention"],
    ["frobenius", "tensor-operations"],
    ["nabla", "differential-operators"],
    ["svd", "decomposition"],
    ["tensor-operations", "attention"],
  ],
};
const routeSpecs: Record<
  CourseSlug,
  { label: Localized; description: Localized; nodes: string[] }[]
> = {
  "deep-learning": [
    {
      label: t("从样本到可靠评价", "Data to evaluation"),
      description: t(
        "先定义任务，再判断模型有没有学到可迁移的规律。",
        "Define the task, then evaluate generalization.",
      ),
      nodes: ["foundations", "representations", "generalization", "review"],
    },
    {
      label: t("手算一次分类训练", "Work through classification"),
      description: t(
        "理解损失、更新方向以及概率输出。",
        "Connect losses, updates and probabilities.",
      ),
      nodes: [
        "losses",
        "gradient",
        "optimization",
        "math:softmax",
        "entropy",
        "softmax",
      ],
    },
    {
      label: t("网络如何得到梯度", "How a network gets gradients"),
      description: t(
        "从线性变换与链式法则走到反向传播。",
        "From linear maps and the chain rule to backpropagation.",
      ),
      nodes: [
        "linear-map",
        "networks",
        "chain",
        "matrix-differential",
        "backprop",
        "autodiff",
      ],
    },
  ],
  robotics: [
    {
      label: t("一个动作怎样落地", "From task to physical action"),
      description: t(
        "分清目标、驱动与实际测量。",
        "Distinguish targets, drives and measurements.",
      ),
      nodes: ["embodied", "hardware", "feedback"],
    },
    {
      label: t("从坐标到关节速度", "Coordinates to joint velocities"),
      description: t(
        "先变换参考系，再检查速度映射和奇异性。",
        "Transform frames, then inspect velocity mappings.",
      ),
      nodes: [
        "linear-map",
        "lie-group",
        "transforms",
        "derivative",
        "interpolation",
        "math:jacobian",
        "svd",
        "jacobian",
      ],
    },
    {
      label: t("为什么选择这个动作", "Why choose this action?"),
      description: t(
        "把当下奖励与未来回报接起来。",
        "Connect immediate rewards to future returns.",
      ),
      nodes: ["embodied", "expectation", "decisions"],
    },
  ],
  "ai-practice": [
    {
      label: t("从应用到学习问题", "Applications to learning problems"),
      description: t(
        "把输入、目标、反馈与评价说清楚。",
        "Make inputs, goals, feedback and evaluation explicit.",
      ),
      nodes: [
        "route",
        "agents",
        "science",
        "learning-paradigms",
        "classical-methods",
      ],
    },
    {
      label: t("读懂一次注意力计算", "Read an attention computation"),
      description: t(
        "先看张量形状，再计算分数与加权结果。",
        "Check shapes, then compute scores and weighted outputs.",
      ),
      nodes: [
        "indices",
        "tensor-operations",
        "deep-models",
        "softmax",
        "attention",
      ],
    },
    {
      label: t("张量如何表达变化", "Tensors and change"),
      description: t(
        "从指标到缩并，再连接微分算子和分解。",
        "From indices and contractions to operators and decompositions.",
      ),
      nodes: [
        "indices",
        "tensor-operations",
        "frobenius",
        "nabla",
        "differential-operators",
        "svd",
        "decomposition",
      ],
    },
  ],
};
function makeCourseAtlas(slug: CourseSlug): CourseAtlas {
  const course = getLearningCourse(slug);
  const item = getLearningItem(slug);
  const chapterNodes = Object.fromEntries(
    topics[slug].map(([id]) => [id, `${slug}-${id}`]),
  );
  const resolve = (id: string) =>
    id.startsWith("math:") ? id.slice(5) : (chapterNodes[id] ?? id);
  const nodes: AtlasNode[] = topics[slug].map(
    ([chapterId, zh, en, group, formula]) => {
      const chapter = course.chapters.find((c) => c.id === chapterId)!;
      return {
        id: chapterNodes[chapterId],
        domain: group,
        label: t(zh, en),
        shortLabel: t(zh, en),
        blurb: t(chapter.lead, en),
        insight: t(chapter.lead, en),
        formula,
        href: chapterPath(slug, chapterId),
        sources: [],
        lesson: {
          namespace: `course-lessons/${slug}`,
          id: chapterId,
          locale: "zh",
        },
      };
    },
  );
  nodes.push(
    ...mathIds[slug].map((id) => ({
      ...mathMapNode(id)!,
      sources:
        mathMapNode(id)!.sources ??
        mathMapDomains.find((d) => d.id === mathMapNode(id)!.domain)!.sources,
      domain: "math",
      href: `/learning/math-map/#${id}`,
      hrefLabel: t("在数学总图中探索", "Explore in the mathematics atlas"),
      lesson: { namespace: "math-lessons", id },
    })),
  );
  const edges: AtlasEdge[] = links[slug].map(([source, target]) => ({
    source: resolve(source),
    target: resolve(target),
    kind: "prereq",
  }));
  if (slug === "robotics")
    edges.push(
      {
        source: resolve("feedback"),
        target: resolve("jacobian"),
        kind: "related",
      },
      {
        source: resolve("feedback"),
        target: resolve("decisions"),
        kind: "related",
      },
    );
  if (slug === "ai-practice")
    edges.push({
      source: resolve("science"),
      target: resolve("indices"),
      kind: "related",
    });
  return {
    id: slug,
    title: t(`${item.title.zh} · 知识网`, `${item.title.en} · Knowledge map`),
    description: t(
      "把课程章节、核心概念与数学先修连起来；在图中探索，再回到笔记演算。",
      "Connect course topics and prerequisites, then return to the notes to work through them.",
    ),
    href: `${item.href}/knowledge-map`,
    courseHref: item.href,
    updated: "2026-09-27",
    defaultNode: nodes[0].id,
    nodes,
    edges,
    domains: domainSets[slug],
    centers,
    sources: mathMapSources,
    chapterNodes,
    paths: routeSpecs[slug].map((r, i) => ({
      ...r,
      id: `route-${i + 1}`,
      nodes: r.nodes.map(resolve),
    })),
    legend: domainSets[slug].slice(0, 3).map((d) => ({
      tone: d.tone!,
      label:
        d.tone === "linear-algebra"
          ? t(
              {
                "deep-learning": "网络与数学",
                robotics: "几何、运动与数学",
                "ai-practice": "张量与数学",
              }[slug],
              {
                "deep-learning": "Networks & mathematics",
                robotics: "Geometry, motion & mathematics",
                "ai-practice": "Tensors & mathematics",
              }[slug],
            )
          : d.label,
    })),
  };
}

const cppSources = [
  {
    id: "cpp17",
    title: "C++17 · N4659 working draft",
    href: "https://timsong-cpp.github.io/cppwp/n4659/",
  },
];
const programmingTopics = [
  [
    "program",
    "程序入口",
    "Program entry",
    "first",
    "int main() {\n    return 0;\n}",
  ],
  [
    "headers",
    "头文件与命名空间",
    "Headers & namespaces",
    "first",
    '#include <iostream>\nstd::cout << "Hello";',
  ],
  [
    "variables",
    "变量与类型",
    "Variables & types",
    "second",
    "int score = 90;\nscore = score + 5;",
  ],
  [
    "initialization",
    "初始化",
    "Initialization",
    "second",
    "int count = 0;\nint next = count + 1;",
  ],
  [
    "identifiers",
    "变量命名",
    "Identifiers",
    "second",
    "int total_count = 0;\nint score2 = 90;",
  ],
  ["cout", "输出流", "Output streams", "third", 'std::cout << "score=" << 95;'],
  [
    "formatting",
    "空格与换行",
    "Spaces & newlines",
    "third",
    "std::cout << 1 << ' ' << 2 << '\\n';",
  ],
  [
    "printf",
    "格式化输出",
    "Formatted output",
    "third",
    'printf("score=%d\\n", 95);',
  ],
  [
    "cin",
    "输入流",
    "Input streams",
    "third",
    "int a = 0, b = 0;\nstd::cin >> a >> b;",
  ],
  [
    "input-check",
    "输入与输出自检",
    "Checking input & output",
    "third",
    'int value = 0;\nif (std::cin >> value) {\n    std::cout << value << "\\n";\n}',
  ],
] as const;
function makeProgrammingAtlas(): CourseAtlas {
  const item = getLearningItem("programming-2026");
  const nodeId = (id: string) => `programming-${id}`;
  const nodes: AtlasNode[] = programmingTopics.map(
    ([id, zh, en, group, code]) => ({
      id: nodeId(id),
      domain: group,
      label: t(zh, en),
      shortLabel: t(zh, en),
      blurb: t(
        "从一段可运行的 C++17 程序出发，逐行理解，再自己改输入、预测输出。",
        "Read and modify a small C++17 program, then predict its output.",
      ),
      insight: t(
        "先写下预期，再编译、运行并核对。",
        "Predict, compile, run and compare.",
      ),
      formula: "",
      code,
      href: item.href,
      sources: ["cpp17"],
      lesson: {
        namespace: "course-lessons/programming-2026",
        id,
        locale: "zh",
      },
    }),
  );
  const pairs = [
    ["program", "headers"],
    ["program", "variables"],
    ["variables", "initialization"],
    ["variables", "identifiers"],
    ["headers", "cout"],
    ["cout", "formatting"],
    ["headers", "printf"],
    ["variables", "printf"],
    ["headers", "cin"],
    ["variables", "cin"],
    ["cin", "input-check"],
    ["initialization", "input-check"],
    ["formatting", "input-check"],
  ];
  const domains = [
    domain("first", t("程序骨架", "Program structure"), "{}", "analysis"),
    domain("second", t("数据与名称", "Data & names"), "x", "linear-algebra"),
    domain("third", t("输入与输出", "Input & output"), "→", "matrix-calculus"),
  ];
  const routes = [
    {
      label: t("写出第一个输出", "Write your first output"),
      description: t(
        "从入口、头文件走到可预测的屏幕文字。",
        "From entry and headers to predictable output.",
      ),
      nodes: ["program", "headers", "cout", "formatting"],
    },
    {
      label: t("给数据一个可靠的名字", "Give data a reliable name"),
      description: t(
        "声明、初始化、命名与赋值各司其职。",
        "Distinguish declarations, initialization and assignment.",
      ),
      nodes: ["variables", "identifiers", "initialization", "printf"],
    },
    {
      label: t("完整走通一次输入输出", "Complete an input/output cycle"),
      description: t(
        "读取两个整数，检查读取结果，再输出。",
        "Read integers, check success and print results.",
      ),
      nodes: ["variables", "initialization", "cin", "input-check"],
    },
  ];
  return {
    id: item.id,
    title: t(`${item.title.zh} · 知识网`, `${item.title.en} · Knowledge map`),
    description: t(
      "沿 L02 的公开示例，连起程序入口、变量、输入与输出。每个节点都可以读讲解、运行代码、检查答案。",
      "Explore the published L02 examples through program structure, variables and input/output.",
    ),
    href: item.href + "/knowledge-map",
    courseHref: item.href,
    updated: "2026-09-27",
    defaultNode: nodeId("program"),
    nodes,
    edges: pairs.map(([a, b]) => ({
      source: nodeId(a),
      target: nodeId(b),
      kind: "prereq",
    })),
    domains,
    centers,
    sources: cppSources,
    paths: routes.map((r, i) => ({
      ...r,
      id: `route-${i + 1}`,
      nodes: r.nodes.map(nodeId),
    })),
    legend: domains.map((d) => ({ tone: d.tone!, label: d.label })),
    chapterNodes: {},
  };
}
export const courseAtlases: readonly CourseAtlas[] = [
  ...(["deep-learning", "robotics", "ai-practice"] as const).map(
    makeCourseAtlas,
  ),
  makeProgrammingAtlas(),
];
export function getCourseAtlas(slug: CourseMapSlug) {
  return courseAtlases.find((atlas) => atlas.id === slug)!;
}
