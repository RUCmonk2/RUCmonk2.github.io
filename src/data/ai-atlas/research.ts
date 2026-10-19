import type { AINode } from "./types";
const checklist = {
  title: "NeurIPS · Paper Checklist",
  url: "https://nips.cc/public/guides/PaperChecklist",
};
const theory = {
  title: "Shalev-Shwartz & Ben-David · Understanding Machine Learning",
  url: "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/",
};
const rmf = {
  title: "NIST · AI Risk Management Framework",
  url: "https://www.nist.gov/itl/ai-risk-management-framework",
};
const node = (
  id: string,
  title: [string, string],
  level: AINode["level"],
  summary: string,
  why: string,
  mastery: [string, string],
  example: string,
  pitfall: string,
  prerequisites: string[],
  sources: AINode["sources"],
  extra: Partial<AINode> = {},
): AINode => ({
  id,
  domain: "research",
  title: { zh: title[0], en: title[1] },
  level,
  scope: "shared",
  summary,
  why,
  mastery,
  example,
  pitfall,
  prerequisites,
  sources,
  ...extra,
});
export const researchNodes: AINode[] = [
  node(
    "research-questions",
    ["研究问题与假设", "Research questions"],
    "research",
    "把宽泛兴趣收缩为可检验的问题：明确对象、条件、预期机制，以及什么证据会推翻当前解释。问题可以是经验性的，也可以是需要证明的命题。",
    "决定实验到底在回答什么，并让失败结果也能提供信息。",
    [
      "用一句话写出研究对象、比较条件与待检验主张。",
      "为主张写出至少一种反例或否证实验。",
    ],
    "把“让模型更好”改成“在训练样本固定时，检索能否降低某类事实错误”，再固定检索库和错误定义。",
    "实验开始后不断更换主张，容易把事后解释写成事前假设。",
    ["learning-problem", "data-splits"],
    [checklist],
  ),
  node(
    "literature-review",
    ["文献检索与问题脉络", "Literature review"],
    "core",
    "围绕问题、方法、假设和证据组织文献。先找到基础工作与近期代表，再沿引用链追踪不同方案；记录它们在什么条件下可比较。",
    "避免把已有结论重新命名，也帮助发现尚未被充分检验的条件。",
    [
      "制作包含任务、数据、假设、指标和局限的对照表。",
      "从一篇代表论文追踪其关键前作与有分歧的后续工作。",
    ],
    "比较三种长上下文方法时，同时记录上下文长度、训练预算、检索设置与任务，而不只抄排行榜。",
    "论文数量和引用次数不能代替证据质量；预印本、修订版与正式版本需要区分。",
    ["learning-problem"],
    [
      {
        title: "Stanford CS230 · Project guidelines",
        url: "https://cs230.stanford.edu/project/",
      },
    ],
    { related: ["paper-reading"] },
  ),
  node(
    "paper-reading",
    ["论文精读与复核", "Reading research papers"],
    "core",
    "依次辨认问题、方法、证据和边界，再检查公式假设与实验协议。精读应能重建核心推理，而不只是复述摘要。",
    "把论文当成可检验的论证，减少术语熟悉带来的理解错觉。",
    [
      "不用原文复述核心贡献，并列出它依赖的假设。",
      "重推一个关键等式，或用小规模实验复现一项主结论。",
    ],
    "阅读一个损失函数论文时，先检查每个张量维度，再用两条样本手算损失和梯度方向。",
    "作者的解释、实验观察和已经证明的性质是三种不同强度的陈述。",
    ["literature-review", "objective-functions"],
    [
      {
        title: "Keshav · How to Read a Paper",
        url: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",
      },
    ],
  ),
  node(
    "baselines",
    ["基线与公平比较", "Baselines & fair comparisons"],
    "core",
    "基线是判断方法增益的参照。需要简单可解释的方案，也需要合理调优的强方案；数据、计算预算和可用信息应尽可能可比。",
    "区分新方法带来的改进与数据、调参或算力带来的改进。",
    [
      "为一个任务实现简单基线和强基线。",
      "列出比较中固定的变量，以及无法控制的差异。",
    ],
    "比较深度模型和梯度提升树时，使用相同训练/验证划分，并给两者预先约定的调参预算。",
    "只与未调优的旧结果比较，或给自己的方法额外测试信息，会夸大增益。",
    ["data-splits", "metrics-calibration"],
    [
      checklist,
      {
        title:
          "Bouthillier et al. · Accounting for Variance in Machine Learning Benchmarks",
        url: "https://arxiv.org/abs/2103.03098",
      },
    ],
  ),
  node(
    "ablation-studies",
    ["消融与机制分析", "Ablation studies"],
    "research",
    "通过有计划地移除、替换或控制组件，判断哪些设计与结果相关。消融可支持机制解释，但组件交互和重新调参会影响结论。",
    "让“方法有效”进一步变成“在什么条件下，哪些部分有效”。",
    [
      "设计单组件消融并控制训练预算和随机因素。",
      "补充组件组合实验，辨认可能的交互作用。",
    ],
    "研究检索增强时比较无检索、随机检索、真实检索与理想证据，区分信息供给和模型使用证据的能力。",
    "删掉一个组件后性能下降，不自动证明作者提出的因果机制；实现和优化条件也可能变化。",
    ["baselines", "research-questions"],
    [checklist],
  ),
  node(
    "reproducibility",
    ["可复现实验", "Reproducible experiments"],
    "core",
    "保存数据版本、环境、代码、配置和运行记录，使其他人能够重建实验过程。随机种子只是其中一项，硬件、并行算子和数据处理也会带来变化。",
    "让结论可审查，并减少自己几周后无法解释结果的情况。",
    [
      "用独立环境从原始数据重跑一个小实验。",
      "记录版本、随机性、运行命令和结果生成过程。",
    ],
    "将数据哈希、依赖版本、训练配置与评测脚本一起归档，并让另一人按说明复现一张结果表。",
    "某次运行数字完全相同不等于结论稳健；也不要把所有设备上的位级一致当作默认保证。",
    ["git-environments", "data-splits", "software-testing"],
    [
      {
        title:
          "Pineau et al. · Improving Reproducibility in Machine Learning Research",
        url: "https://arxiv.org/abs/2003.12206",
      },
      {
        title: "PyTorch · Reproducibility",
        url: "https://docs.pytorch.org/docs/stable/notes/randomness.html",
      },
    ],
  ),
  node(
    "statistical-comparison",
    ["统计比较与效应量", "Statistical comparisons"],
    "research",
    "实验分数会随样本、划分和训练随机性变化。比较时需要明确统计单位，报告效应量和不确定性，并选择与设计相符的检验或重采样方法。",
    "避免把偶然高分当成稳定改进，也避免把显著性当成实际价值。",
    [
      "区分跨样本与跨训练运行的不确定性。",
      "为预先指定的指标报告差值、区间和比较方法。",
    ],
    "对同一测试样本上两个模型的预测做配对重采样，同时另列多次训练的波动；两类变异不能混作同一个误差条。",
    "反复挑选最好种子、任务或指标会引入选择偏差；小p值不能说明效应大或理论正确。",
    ["hypothesis-tests", "confidence-intervals", "baselines"],
    [
      {
        title:
          "Agarwal et al. · Deep RL at the Edge of the Statistical Precipice",
        url: "https://arxiv.org/abs/2108.13264",
      },
    ],
  ),
  node(
    "generalization-theory",
    ["统计学习与泛化理论", "Generalization theory"],
    "research",
    "研究有限样本上学到的规律何时能推广。PAC学习、VC维、Rademacher复杂度和稳定性提供不同视角，结论始终依赖数据与假设类条件。",
    "理解样本量、模型选择与过拟合之间的关系，并读懂理论论文的保证范围。",
    [
      "区分经验风险、总体风险与超额风险。",
      "推导有限假设类的集中界，并解释置信参数与样本量的作用。",
    ],
    "在独立同分布、损失位于[0,1]且有限假设类H的条件下，用并集界把单个模型的误差控制扩展到整类模型。",
    "分布改变、训练数据依赖或假设类变化都可能破坏保证；上界很松不代表实验一定失败。",
    ["learning-problem", "lln-clt", "bias-variance"],
    [theory],
    {
      formula: String.raw`\Pr\!\left(\sup_{h\in H}|R(h)-\widehat R_n(h)|>\epsilon\right)\le 2|H|e^{-2n\epsilon^2}`,
    },
  ),
  node(
    "distribution-shift",
    ["分布变化与域泛化", "Distribution shift"],
    "research",
    "部署数据可能改变输入分布、标签比例或输入与标签的关系。需要先描述变化类型，再讨论迁移、重加权、适应或重新收集数据。",
    "连接离线测试与真实环境，识别平均分背后的脆弱性。",
    [
      "区分协变量变化、标签变化与条件关系变化。",
      "按时间、地点或人群设计独立测试并分析分组误差。",
    ],
    "在一家医院训练的影像模型到另一家医院测试时，分别检查设备差异、患病率与标注流程。",
    "无标签域适应需要额外假设；新域输入相似不保证标签机制不变。",
    ["data-splits", "conditional-probability", "generalization-theory"],
    [
      {
        title:
          "Koh et al. · WILDS: A Benchmark of in-the-Wild Distribution Shifts",
        url: "https://proceedings.mlr.press/v139/koh21a.html",
      },
    ],
    { related: ["robustness-security"] },
  ),
  node(
    "uncertainty",
    ["不确定性与覆盖保证", "Uncertainty quantification"],
    "research",
    "区分数据噪声与模型知识不足，学习概率校准、预测区间和保形预测。不同方法给出的不确定性具有不同含义和适用条件。",
    "让系统能够表达“不确定”，并决定何时需要更多信息或人工介入。",
    [
      "检查置信分数的校准，而非只看分类准确率。",
      "在交换性等相应假设下构造分割保形预测集，实测覆盖率和集合大小。",
    ],
    "模型训练与校准分离，并满足交换性时，用100个校准残差构造90%覆盖区间：取升序第ceil(101×0.9)=91个残差作为半径，再检查整体与子群覆盖。",
    "通常的边际覆盖并不保证每个输入或子群都达到相同覆盖率；分布变化也可能使保证失效。",
    ["metrics-calibration", "confidence-intervals", "bayesian-inference"],
    [
      {
        title:
          "Angelopoulos & Bates · A Gentle Introduction to Conformal Prediction",
        url: "https://arxiv.org/abs/2107.07511",
      },
    ],
  ),
  node(
    "scientific-writing",
    ["科学写作与证据表达", "Scientific writing"],
    "research",
    "围绕问题、方法、结果和局限组织论证。让图表、符号和实验细节服务于可核查的主张，并清楚区分原创贡献和已有工作。",
    "把技术工作转成别人能理解、审查和继续推进的研究。",
    [
      "让每个主要结论对应图表、证明或可复核记录。",
      "为图表注明样本、比较条件、统计量和误差条含义。",
    ],
    "将“显著领先”改成具体数据集、预算、指标差值及区间，并解释失败场景。",
    "修辞强度不能超过证据强度；引用应指向真正支持该陈述的原始工作。",
    ["research-questions", "statistical-comparison", "paper-reading"],
    [checklist],
  ),
  node(
    "research-project",
    ["研究项目闭环", "A complete research project"],
    "research",
    "将问题选择、最小实验、复现基线、机制分析和报告整合为一条可迭代流程。用阶段性证据决定继续、修改或停止，而非无限扩大实验。",
    "把分散知识转成独立提出和完成研究的能力。",
    [
      "制定包含计算预算、数据约束、基线和停止条件的计划。",
      "提交可运行代码、关键结果、失败分析与下一步问题。",
    ],
    "用两周复现一个小模型：先重建基线，再检验一个明确改动，最后发布足以重跑结果的实验包。",
    "规模不是贡献；负结果如果设计清楚、边界明确，同样能帮助排除错误方向。",
    ["ablation-studies", "reproducibility", "scientific-writing"],
    [
      {
        title: "Stanford CS230 · Course project",
        url: "https://cs230.stanford.edu/project/",
      },
    ],
    { related: ["research-integrity", "environment-cost"] },
  ),
  node(
    "data-governance",
    ["数据治理与数据文档", "Data governance"],
    "core",
    "记录数据的来源、采集目的、使用范围、标注过程和已知缺口。治理贯穿收集、训练、共享和退出流程，不能只在模型完成后补一页说明。",
    "理解模型实际上学到了什么，以及数据是否适合预定用途。",
    [
      "为数据集编写来源、许可、采集和用途说明。",
      "追踪删除、修订和访问权限如何影响后续实验。",
    ],
    "整理公开论坛语料时，记录采集范围、时间、许可与过滤规则，并检查是否混入个人敏感信息。",
    "能公开访问不等于可以无限制再利用；文档本身也不能弥补采集设计的缺陷。",
    ["data-splits", "databases-sql"],
    [
      {
        title: "Gebru et al. · Datasheets for Datasets",
        url: "https://arxiv.org/abs/1803.09010",
      },
    ],
    { domain: "responsibility" },
  ),
  node(
    "privacy",
    ["隐私与差分隐私", "Privacy & differential privacy"],
    "research",
    "模型和统计结果可能泄露训练数据的信息。差分隐私以相邻数据集上的输出分布约束单条记录的影响，需要说明邻接关系、预算和组合方式。",
    "在分析和训练前考虑个人信息风险，并理解隐私、效用与资源之间的权衡。",
    [
      "解释ε、δ、敏感度和隐私预算组合的含义。",
      "在简单计数查询上校准噪声，并比较准确度变化。",
    ],
    "对有界计数查询添加按敏感度校准的拉普拉斯噪声，再讨论多次发布为何需要累计隐私预算。",
    "匿名化不自动提供差分隐私；加入任意噪声也不等于给出了隐私保证。",
    ["probability-rules", "data-governance", "stochastic-gradients"],
    [
      {
        title:
          "Dwork & Roth · The Algorithmic Foundations of Differential Privacy",
        url: "https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf",
      },
    ],
    { domain: "responsibility", related: ["misuse-threat-models"] },
  ),
  node(
    "fairness",
    ["公平性与群体评估", "Fairness"],
    "core",
    "公平涉及任务目标、历史机制、测量方式和受影响人群。不同统计定义描述不同诉求，往往不能同时满足，需要结合场景解释取舍。",
    "发现总体指标掩盖的差异，并避免把一个数学指标等同于社会公平。",
    [
      "按相关群体报告样本量、错误类型和不确定性。",
      "比较至少两种公平指标，说明它们各自关注的问题。",
    ],
    "在资源分配模型中同时查看选择率、假阳性率和假阴性率，讨论不同基准率如何影响结论。",
    "只删掉敏感属性不能保证公平；代理变量、标签和采样机制仍可能保留偏差。",
    ["metrics-calibration", "conditional-probability", "data-governance"],
    [
      {
        title: "Barocas, Hardt & Narayanan · Fairness and Machine Learning",
        url: "https://fairmlbook.org/",
      },
    ],
    { domain: "responsibility" },
  ),
  node(
    "explainability",
    ["解释性与模型诊断", "Explainability"],
    "core",
    "用可理解模型、特征归因或反事实帮助检查模型行为。解释应有明确对象：解释预测、模型规律还是真实世界因果机制，三者并不相同。",
    "帮助发现捷径和数据问题，并让相关人员理解模型决策的依据和限制。",
    [
      "比较全局与局部解释，检查结果对扰动的稳定性。",
      "用删除特征或反事实实验检验解释是否忠实反映模型。",
    ],
    "对图像分类器遮挡背景后重新评测，检查归因图指向的区域是否真的影响模型输出。",
    "漂亮的热力图不构成因果证明；相关特征影响归因，遮挡也可能制造分布外输入，需比较负对照和不同扰动基线。",
    ["feature-engineering", "causal-graphs"],
    [
      {
        title:
          "Doshi-Velez & Kim · Towards A Rigorous Science of Interpretable Machine Learning",
        url: "https://arxiv.org/abs/1702.08608",
      },
    ],
    { domain: "responsibility" },
  ),
  node(
    "robustness-security",
    ["鲁棒性与模型安全", "Robustness & security"],
    "research",
    "区分自然扰动下的性能稳定性与主动攻击者造成的风险。攻击面包括数据、模型、接口和外部工具；评价必须说明攻击者能看到和控制什么。",
    "避免把普通测试准确率误当作部署安全性。",
    [
      "为一个模型定义能力受限、目标明确的攻击威胁模型。",
      "用独立攻击和常见扰动评测防御，并检查自适应攻击。",
    ],
    "图像模型分别测试压缩和噪声等自然变化，以及限定扰动预算的对抗样本；两类结果分别报告。",
    "对某种攻击有效的防御不代表普遍安全；梯度遮蔽可能造成虚假的鲁棒性。",
    ["distribution-shift", "gradient-descent"],
    [
      {
        title:
          "Madry et al. · Towards Deep Learning Models Resistant to Adversarial Attacks",
        url: "https://arxiv.org/abs/1706.06083",
      },
    ],
    { domain: "responsibility" },
  ),
  node(
    "safety-evaluation",
    ["安全评测与风险测量", "Safety evaluation"],
    "core",
    "围绕预期用途、潜在危害和实际使用环境设计评测。既看模型输出，也看工具权限、人的行为和系统反馈，持续记录发现的失效模式。",
    "把抽象安全目标变成可执行的测试、监控和改进措施。",
    [
      "将风险拆成场景、触发条件、后果与可观测信号。",
      "设计独立测试集，区分发现问题的探索测试与确认性评测。",
    ],
    "评估检索助手时，同时检查引用正确性、敏感信息泄露、恶意文档影响及工具调用越权。",
    "通过有限测试只说明在这些条件下未发现失败，不是无条件安全证明。",
    ["metrics-calibration", "baselines", "data-governance"],
    [rmf],
    {
      domain: "responsibility",
      related: ["tool-use-agents", "misuse-threat-models"],
    },
  ),
  node(
    "human-oversight",
    ["人机协作与监督", "Human oversight"],
    "core",
    "明确哪些判断由模型提供建议、哪些由人承担责任，并设计拒绝、申诉、升级和退出流程。监督是否有效取决于信息、时间与真实权限。",
    "避免把“有人在环”当成已经解决责任问题。",
    [
      "画出一个任务的决策流程并标出责任与升级点。",
      "测试人是否能够发现、纠正并阻止模型错误。",
    ],
    "审核助手展示原始证据与不确定性，允许复核者推翻建议，并记录推翻原因用于后续分析。",
    "只让人点击确认可能放大自动化偏见；监督者需要足够上下文与干预能力。",
    ["metrics-calibration", "safety-evaluation"],
    [rmf],
    { domain: "responsibility" },
  ),
  node(
    "misuse-threat-models",
    ["滥用风险与威胁建模", "Misuse threat models"],
    "core",
    "识别谁可能滥用系统、具有什么访问能力、希望造成什么结果，再分析数据入口、输出与工具权限。按具体场景安排缓解和检测。",
    "帮助在系统设计阶段缩小攻击面，而非只依赖输出过滤。",
    [
      "列出资产、攻击者能力、信任边界和可能的失败路径。",
      "为关键路径设置最小权限、隔离和可审计的处理过程。",
    ],
    "联网智能体将检索内容视为外部数据，把读取文档与执行有副作用的工具分开，并测试恶意内容能否跨越权限边界。",
    "提示词声明本身不是可靠权限边界；强模型也可能被不可信输入误导。",
    ["networking", "safety-evaluation"],
    [
      rmf,
      {
        title: "OWASP · Top 10 for Large Language Model Applications",
        url: "https://genai.owasp.org/llm-top-10/",
      },
    ],
    { domain: "responsibility", related: ["tool-use-agents"] },
  ),
  node(
    "environment-cost",
    ["计算成本与环境影响", "Compute & environmental cost"],
    "core",
    "估算训练、推理与数据处理的资源消耗，说明测量范围、硬件和使用规模。时间、能耗与排放相关但不等价，成本应和实际任务收益一起评价。",
    "使研究设计和系统选择兼顾可行性、可复现性与资源约束。",
    [
      "测量运行时间、峰值显存及可获得的能耗指标。",
      "将单位请求成本与预计部署规模结合，比较替代方案。",
    ],
    "比较两个模型时，除准确率外记录相同硬件上的延迟、吞吐量与测量窗口，再估算每天请求量下的总成本。",
    "单次训练耗能不能代表全生命周期；不同电网、设备和负载下的估算不可直接混用。",
    ["profiling", "inference-serving"],
    [
      {
        title:
          "Henderson et al. · Towards the Systematic Reporting of Energy and Carbon Footprints of Machine Learning",
        url: "https://arxiv.org/abs/2002.05651",
      },
    ],
    { domain: "responsibility" },
  ),
  node(
    "research-integrity",
    ["研究诚信与透明披露", "Research integrity"],
    "core",
    "如实记录方法、数据、比较条件和失败结果，尊重贡献与引用，并披露可能影响解释的利益、限制和工具使用。实验应当经得起他人核查。",
    "保持研究证据的可信度，也保护合作中的责任和贡献。",
    [
      "保留从原始结果到图表的可追踪记录。",
      "核对引用、贡献和局限说明，避免有利结果的选择性报告。",
    ],
    "在报告中保留未支持假设的消融结果，说明哪些分析事先确定、哪些是在观察结果后追加的。",
    "补写看似合理的实验记录、虚构引用或隐去不利条件，会破坏结论的可核查性。",
    ["reproducibility", "paper-reading"],
    [
      checklist,
      {
        title: "ACM · Code of Ethics and Professional Conduct",
        url: "https://www.acm.org/code-of-ethics",
      },
    ],
    { domain: "responsibility" },
  ),
];
