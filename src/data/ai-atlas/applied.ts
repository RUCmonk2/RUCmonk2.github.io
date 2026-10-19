import type { AINode } from "./types";

export const appliedNodes: AINode[] = [
  {
    id: "tokenization",
    domain: "language",
    title: {
      zh: "文本分词与词元化",
      en: "Tokenization",
    },
    level: "core",
    scope: "shared",
    summary:
      "把原始文本转换成模型可处理的离散序列；词、字节与子词的取舍会同时改变词表、序列长度和稀有文本的表示方式，是语言模型的数据入口。",
    why: "先看清模型实际读到的符号，才能正确计算长度、损失与多语言成本。",
    mastery: [
      "在训练语料上训练一个子词分词器，检查编码、解码与规范化的关系。",
      "对中文、英文和代码各取十段文本，比较词元数与未知字符处理。",
    ],
    example:
      "对“机器学习”和一段带空格、重音的英文分别编码，逐个列出词元及编号；改变词表大小后记录序列长度，而非假定一个词等于一个词元。",
    pitfall:
      "分词器通常也有训练数据与规范化规则；可逆性依赖具体配置，字符数、词数和词元数不能互换。",
    prerequisites: ["python-programming", "data-splits"],
    related: ["language-modeling", "data-pipelines"],
    sources: [
      {
        title:
          "SentencePiece: A Simple and Language Independent Subword Tokenizer and Detokenizer for Neural Text Processing",
        url: "https://aclanthology.org/D18-2012/",
      },
    ],
  },
  {
    id: "language-modeling",
    domain: "language",
    title: {
      zh: "语言建模",
      en: "Language Modeling",
    },
    level: "core",
    scope: "shared",
    summary:
      "用条件概率描述符号序列，并从上下文预测未知词元；理解自回归与掩码目标的差异，连接训练损失、生成分布和语言表示，而不把续写等同于理解。",
    why: "这是理解生成式语言模型、困惑度和后续对齐方法的共同起点。",
    mastery: [
      "对一段短序列逐项写出自回归概率与平均负对数似然。",
      "实现带因果掩码的小模型，并用移位输入验证没有读取目标词元。",
    ],
    example:
      "两个待预测词元的条件概率为 0.5 和 0.25，序列概率为 0.125；平均负对数似然约为 1.040，对应困惑度约为 2.828。",
    pitfall:
      "不同分词器和评估语料的困惑度不能直接比较；掩码模型的训练目标也不等于完整自回归序列似然。",
    prerequisites: ["conditional-probability", "entropy-kl", "sequence-models"],
    related: ["pretraining", "decoding"],
    sources: [
      {
        title: "A Neural Probabilistic Language Model",
        url: "https://www.jmlr.org/papers/v3/bengio03a.html",
      },
    ],
    formula: "p(x_{1:T})=\\prod_{t=1}^{T}p(x_t\\mid x_{<t})",
  },
  {
    id: "word-vectors",
    domain: "language",
    title: {
      zh: "词向量与分布语义",
      en: "Word Vectors",
    },
    level: "core",
    scope: "specialist",
    summary:
      "根据上下文共现学习词的向量表示，用几何邻近表达部分语义关联；区分静态词向量与上下文化表示，理解负采样如何改变训练任务和计算成本。",
    why: "从一个可检验的小模型理解表示学习，比只观察漂亮的向量图更扎实。",
    mastery: [
      "训练小型跳字模型，说明正样本、负样本及其损失的含义。",
      "比较多义词在静态向量与上下文化表示中的邻居，并记录失败例。",
    ],
    example:
      "在同一语料中训练两组不同随机种子的词向量，比较“银行”的十个近邻；再分别检查金融与河岸上下文，观察单一向量混合词义的问题。",
    pitfall:
      "向量类比与余弦邻近只是诊断；共现会继承语料偏差，坐标轴和单次二维投影没有固定语义。",
    prerequisites: ["embeddings", "inner-products", "learning-problem"],
    related: ["representation-learning", "language-modeling"],
    sources: [
      {
        title: "Efficient Estimation of Word Representations in Vector Space",
        url: "https://arxiv.org/abs/1301.3781",
      },
    ],
  },
  {
    id: "nlp-tasks",
    domain: "language",
    title: {
      zh: "语言任务与问题定义",
      en: "NLP Tasks",
    },
    level: "core",
    scope: "shared",
    summary:
      "把文本应用写成清楚的输入、输出、标注规则与评估协议，区分分类、序列标注、问答、翻译和摘要；先建立可比较的任务，再选择模型架构。",
    why: "相同模型在不同任务上需要不同标签、切分方式与错误分析。",
    mastery: [
      "为分类和抽取各写一份输入输出规范、标注边界与简单基线。",
      "建立包含歧义、长文本和域外样本的错误分类表，并复核标注一致性。",
    ],
    example:
      "用 200 条客服消息做意图分类：按用户划分训练与测试，比较多数类、词袋线性模型和预训练模型，再逐条检查少数类召回。",
    pitfall:
      "高分可能来自模板重复、用户泄漏或标签线索；生成任务不能只靠字符串完全匹配评价。",
    prerequisites: ["learning-problem", "data-splits", "tokenization"],
    related: ["language-evaluation", "instruction-tuning"],
    sources: [
      {
        title:
          "Stanford CS224N: Natural Language Processing with Deep Learning",
        url: "https://web.stanford.edu/class/cs224n/",
      },
    ],
  },
  {
    id: "pretraining",
    domain: "language",
    title: {
      zh: "语言模型预训练",
      en: "Language Model Pretraining",
    },
    level: "core",
    scope: "shared",
    summary:
      "从大规模未逐条标注的文本构造预测目标，学习可迁移的表示与生成能力；把语料筛选、去重、目标函数和训练预算视为同一个实验设计。",
    why: "下游能力与失误不仅来自架构，也来自预训练目标和数据分布。",
    mastery: [
      "比较因果预测与掩码预测的可见上下文、标签生成和适用任务。",
      "用小语料完成预训练实验，报告去重策略、训练词元数及留出集损失。",
    ],
    example:
      "固定一个小 Transformer 和计算预算，分别在原始语料与去重语料上训练；在从未参与训练的文档上比较损失和近重复文本记忆。",
    pitfall:
      "预训练数据公开并不自动意味着可随意使用；训练损失下降也不能证明事实可靠或评测集没有污染。",
    prerequisites: ["transformer", "language-modeling", "data-splits"],
    related: ["scaling-laws", "data-governance"],
    sources: [
      {
        title:
          "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        url: "https://aclanthology.org/N19-1423/",
      },
      {
        title: "A Neural Probabilistic Language Model",
        url: "https://www.jmlr.org/papers/v3/bengio03a.html",
      },
    ],
  },
  {
    id: "instruction-tuning",
    domain: "language",
    title: {
      zh: "指令微调",
      en: "Instruction Tuning",
    },
    level: "core",
    scope: "shared",
    summary:
      "用任务指令、输入和目标回答组织监督数据，使预训练模型学会按要求完成任务；关注任务覆盖、模板多样性和迁移评估，而不是仅复制回答风格。",
    why: "它解释基础续写模型如何获得可用的任务接口，也暴露指令泛化的边界。",
    mastery: [
      "构造三个任务的指令数据，检查回答部分的损失掩码与模板一致性。",
      "把一种完整任务类型留出，比较微调前后在已见与未见任务上的表现。",
    ],
    example:
      "用分类、抽取与改写数据微调小模型，将摘要任务完全留出；同时测格式合规、内容正确率和原有语言任务的性能变化。",
    pitfall:
      "见过同类模板后的高分不等于跨任务泛化；监督数据中的错误、冗长偏好和拒答习惯也会被学到。",
    prerequisites: ["pretraining", "nlp-tasks"],
    related: ["preference-learning", "language-evaluation"],
    sources: [
      {
        title: "Finetuned Language Models Are Zero-Shot Learners",
        url: "https://arxiv.org/abs/2109.01652",
      },
    ],
  },
  {
    id: "parameter-efficient-tuning",
    domain: "language",
    title: {
      zh: "参数高效适配",
      en: "Parameter-Efficient Tuning",
    },
    level: "core",
    scope: "specialist",
    summary:
      "冻结大部分预训练参数，只训练低秩增量或小型适配模块，以较少可训练参数完成任务迁移；区分参数、优化器状态、激活与推理成本。",
    why: "在有限资源下设计可复现的适配实验，并判断节省究竟发生在哪里。",
    mastery: [
      "实现一个低秩线性层增量，核对张量形状与实际可训练参数数目。",
      "在同一数据和预算下比较全量微调、低秩适配与冻结模型基线。",
    ],
    example:
      "对 4096×4096 权重使用秩 8 的两个矩阵，新增参数为 2×4096×8＝65536，约为原权重的 0.39%；再实测总显存而非按该比例推断。",
    pitfall:
      "少训练参数不等于同等幅度减少激活显存；低秩假设、插入位置与任务差异都会影响适配效果。",
    prerequisites: ["pretraining", "linear-maps", "regularization"],
    related: ["memory-efficiency", "model-editing"],
    sources: [
      {
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        url: "https://arxiv.org/abs/2106.09685",
      },
    ],
    formula:
      "W^{\\prime}=W+BA,\\quad B\\in\\mathbb{R}^{d\\times r},\\ A\\in\\mathbb{R}^{r\\times k}",
  },
  {
    id: "preference-learning",
    domain: "language",
    title: {
      zh: "偏好学习与后训练",
      en: "Preference Learning",
    },
    level: "research",
    scope: "specialist",
    summary:
      "从同一提示下回答的相对偏好学习生成策略，区分奖励建模、基于奖励的优化与直接偏好优化；考察偏好来源、参考策略约束和分布外行为。",
    why: "知道优化了谁的偏好、用什么统计假设，才可能解释后训练的效果。",
    mastery: [
      "构造成对回答，说明偏好概率模型与参考模型在目标函数中的作用。",
      "比较偏好胜率、回答长度和事实正确率，检查优化是否依赖表面线索。",
    ],
    example:
      "为 100 个提示各给出两个回答，刻意让一部分错误回答更长；训练一个偏好模型，检验它是在辨别事实还是在奖励篇幅。",
    pitfall:
      "偏好标签不是客观真理；DPO 等方法依赖特定偏好建模与正则化推导，离线胜率不保证开放场景可靠。",
    prerequisites: ["language-modeling", "logistic-regression", "entropy-kl"],
    related: ["ppo", "human-oversight", "safety-evaluation"],
    sources: [
      {
        title:
          "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
        url: "https://arxiv.org/abs/2305.18290",
      },
    ],
  },
  {
    id: "decoding",
    domain: "language",
    title: {
      zh: "生成解码与采样",
      en: "Decoding and Sampling",
    },
    level: "core",
    scope: "shared",
    summary:
      "把语言模型给出的逐步分布变成输出序列，比较贪心、束搜索、温度及截断采样；理解概率、重复、长度和多样性之间没有通用的最优折中。",
    why: "模型相同而解码策略不同，答案质量、可重复性和运行成本仍会明显改变。",
    mastery: [
      "对给定词元分布手算温度缩放、前若干项截断及核采样的归一化。",
      "固定提示和模型，对多种解码策略报告准确率、重复率与随机种子。",
    ],
    example:
      "词元概率为 0.60、0.25、0.10、0.05，累计阈值 0.80 的核采样保留前两个；重新归一化后的概率约为 0.706 和 0.294。",
    pitfall:
      "较高序列概率不必然更符合人类期望；采样温度降低不能消除事实错误，束搜索也不总适合开放生成。",
    prerequisites: ["language-modeling", "common-distributions"],
    related: ["inference-serving", "language-evaluation"],
    sources: [
      {
        title: "The Curious Case of Neural Text Degeneration",
        url: "https://arxiv.org/abs/1904.09751",
      },
    ],
  },
  {
    id: "retrieval",
    domain: "language",
    title: {
      zh: "文本检索与排序",
      en: "Text Retrieval and Ranking",
    },
    level: "core",
    scope: "shared",
    summary:
      "从候选语料中找出与查询有关的文档，区分词项匹配、稠密向量召回与重排序；用相关性标注和排名指标分析找不到证据发生在哪一步。",
    why: "检索既是独立的信息访问问题，也是知识密集型生成系统的上游。",
    mastery: [
      "建立稀疏与稠密检索基线，说明索引、查询编码和候选排序的边界。",
      "在同一相关性标注上计算召回率与排名指标，并逐条分析漏检证据。",
    ],
    example:
      "为 50 个问题标记支持答案的段落，比较前 5 条与前 20 条结果的证据覆盖；再固定候选集加入重排序，区分召回不足与排序错误。",
    pitfall:
      "语义接近不等于能支持答案；只用随机负样本或把测试问题泄漏进索引训练，会高估实际检索质量。",
    prerequisites: ["embeddings", "nearest-neighbors", "metrics-calibration"],
    related: ["rag", "retrieval-systems"],
    sources: [
      {
        title: "Dense Passage Retrieval for Open-Domain Question Answering",
        url: "https://aclanthology.org/2020.emnlp-main.550/",
      },
    ],
  },
  {
    id: "rag",
    domain: "language",
    title: {
      zh: "检索增强生成",
      en: "Retrieval-Augmented Generation",
    },
    level: "core",
    scope: "shared",
    summary:
      "让生成模型利用查询检索出的外部材料作答，并把检索、上下文组织和引用验证分开评估；知识可以更新，但证据质量与使用方式仍需检验。",
    why: "它把模型内部记忆与可追溯资料结合，适合研究事实来源和知识更新。",
    mastery: [
      "搭建带来源定位的最小检索问答流程，记录每次查询实际使用的证据。",
      "分别用真实检索和人工给定证据评估回答，定位检索与生成的误差。",
    ],
    example:
      "对 30 个课程问题比较闭卷、正常检索和人工提供正确段落三组；检查答案中的每项事实是否能由引文支持，并记录无证据时的表现。",
    pitfall:
      "检索结果不是可信指令；增加上下文也可能引入冲突、过期资料或误导内容，有引用不代表引用真的支持结论。",
    prerequisites: ["retrieval", "language-modeling", "data-splits"],
    related: ["long-context", "robustness-security"],
    sources: [
      {
        title:
          "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        url: "https://arxiv.org/abs/2005.11401",
      },
    ],
  },
  {
    id: "tool-use-agents",
    domain: "language",
    title: {
      zh: "工具使用与智能体",
      en: "Tool Use and Agents",
    },
    level: "research",
    scope: "specialist",
    summary:
      "让模型在观察环境后选择行动、调用工具并利用结果继续决策；显式描述状态、权限、终止条件和失败恢复，评估整个交互轨迹而非单段回答。",
    why: "把生成模型接入真实任务时，成败常取决于行动协议和闭环控制。",
    mastery: [
      "实现只读工具的有限步交互循环，记录状态、参数、返回值和终止原因。",
      "对工具超时、错误结果及恶意文本注入故障，测最终成功率与调用成本。",
    ],
    example:
      "让模型查课程表再计算空闲时段，限制最多 5 次工具调用；向搜索结果加入无关指令，检查它是否仍只依据数据完成已授权的任务。",
    pitfall:
      "流畅的行动描述不等于实际执行成功；工具返回属于外部数据，写入权限、重试次数与终止条件需要显式约束。",
    prerequisites: [
      "language-modeling",
      "automated-planning",
      "software-testing",
    ],
    related: [
      "reasoning-verification",
      "human-oversight",
      "misuse-threat-models",
    ],
    sources: [
      {
        title: "ReAct: Synergizing Reasoning and Acting in Language Models",
        url: "https://arxiv.org/abs/2210.03629",
      },
    ],
  },
  {
    id: "long-context",
    domain: "language",
    title: {
      zh: "长上下文建模",
      en: "Long-Context Modeling",
    },
    level: "research",
    scope: "specialist",
    summary:
      "研究模型如何表示、访问并利用长序列信息，比较位置机制、稀疏注意力和上下文组织；把可输入长度、实际利用能力与计算代价分开考察。",
    why: "长文档任务需要跨段关联，窗口扩大本身并不保证证据可被稳定取用。",
    mastery: [
      "固定证据内容，仅改变其在长文档中的位置，绘制任务准确率变化。",
      "估算全注意力复杂度，并与一种稀疏或分块方法比较精度和显存。",
    ],
    example:
      "将同一支持段落放在 8000 词元文档的开头、中间和结尾；保持干扰段落不变，测试问答是否稳定，再增加需要合并的证据段数。",
    pitfall:
      "普通全注意力的配对数随长度平方增长，但优化内核未必显式存储完整矩阵；单一“针藏草堆”测试不能代表所有长程推理。",
    prerequisites: ["transformer", "decoding"],
    related: ["rag", "memory-efficiency"],
    sources: [
      {
        title: "Lost in the Middle: How Language Models Use Long Contexts",
        url: "https://arxiv.org/abs/2307.03172",
      },
      {
        title: "Longformer: The Long-Document Transformer",
        url: "https://arxiv.org/abs/2004.05150",
      },
    ],
  },
  {
    id: "language-evaluation",
    domain: "language",
    title: {
      zh: "语言模型评估",
      en: "Language Model Evaluation",
    },
    level: "core",
    scope: "shared",
    summary:
      "用明确任务、数据划分和多维指标检验语言模型，包括正确性、校准、鲁棒性、效率与群体差异；同时审视评分器偏差和测试数据污染。",
    why: "模型选择和研究结论必须建立在能复查的评测协议上。",
    mastery: [
      "制定含基线、固定提示、评分规则和污染检查的可重复评测方案。",
      "对人工与模型评分抽样复核，报告置信区间及按子群分解的错误。",
    ],
    example:
      "对同一批 100 道问答，同时记录答案正确、引用支持、格式合规和推理延迟；将模型评分与人工盲评对照，找出长度与位置偏差。",
    pitfall:
      "单个榜单分数掩盖任务差异；模型充当裁判也需要校准，重复调提示后选出的最高测试分会产生选择偏差。",
    prerequisites: ["language-modeling", "metrics-calibration", "data-splits"],
    related: ["statistical-comparison", "safety-evaluation"],
    sources: [
      {
        title: "Holistic Evaluation of Language Models",
        url: "https://arxiv.org/abs/2211.09110",
      },
    ],
  },
  {
    id: "scaling-laws",
    domain: "language",
    title: {
      zh: "规模规律与计算分配",
      en: "Scaling Laws",
    },
    level: "research",
    scope: "specialist",
    summary:
      "用实验拟合模型规模、数据量与计算预算和预测损失的关系，再设计预算分配；把经验规律、外推误差与下游任务能力之间的差别说清楚。",
    why: "昂贵训练之前，先用可检验的资源模型决定应扩大参数还是增加数据。",
    mastery: [
      "在多个模型与数据规模上拟合损失曲线，并保留一组规模验证外推。",
      "在固定计算预算下比较参数量与训练词元数的不同分配方案。",
    ],
    example:
      "训练 3 种宽度、3 种数据量的小模型，记录实际训练计算量；只用其中 6 组拟合损失趋势，再检查其对其余 3 组的预测误差。",
    pitfall:
      "经验拟合依赖架构、数据与计算口径；跨范围外推和下游能力推断都需要新证据，不能把幂律当成普适定理。",
    prerequisites: ["pretraining", "algorithm-complexity", "estimation"],
    related: ["distributed-training", "environment-cost"],
    sources: [
      {
        title: "Scaling Laws for Neural Language Models",
        url: "https://arxiv.org/abs/2001.08361",
      },
      {
        title: "Training Compute-Optimal Large Language Models",
        url: "https://arxiv.org/abs/2203.15556",
      },
    ],
  },
  {
    id: "model-editing",
    domain: "language",
    title: {
      zh: "模型知识编辑",
      en: "Model Editing",
    },
    level: "research",
    scope: "specialist",
    summary:
      "在尽量保持其他行为的前提下更新模型中的特定关联，比较参数编辑与外部知识方案；同时检验目标生效、表述迁移、邻近事实及连续编辑影响。",
    why: "它把“模型学到了什么、存在哪里、能否局部改变”变成可检验问题。",
    mastery: [
      "为一个编辑请求设计目标问句、改写问句与不应改变的邻近事实集。",
      "比较参数编辑和检索更新的效果、保持性及多次编辑后的退化。",
    ],
    example:
      "在受控虚构百科中改变一座城市的所属地区，测试原问法、三种改写及同名城市；连续编辑十条记录后再测所有旧记录。",
    pitfall:
      "一个提示改答成功不能说明知识被一致更新；编辑方法通常有模型与事实类型限制，还可能破坏无关能力。",
    prerequisites: [
      "pretraining",
      "parameter-efficient-tuning",
      "metrics-calibration",
    ],
    related: ["rag", "explainability"],
    sources: [
      {
        title: "Locating and Editing Factual Associations in GPT",
        url: "https://arxiv.org/abs/2202.05262",
      },
    ],
  },
  {
    id: "image-signals",
    domain: "vision",
    title: {
      zh: "图像与采样信号",
      en: "Images and Sampled Signals",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "把图像看成经过采样、量化和颜色编码的信号，理解滤波、频率、边界与混叠；这些基本操作决定视觉模型输入中保留了什么，又丢失了什么。",
    why: "先理解像素从何而来，才不会把预处理引入的伪影误认成模型能力。",
    mastery: [
      "实现二维卷积与下采样，画出滤波前后的边缘和高频纹理。",
      "检查通道顺序、数值范围及颜色空间，验证同一图像的读写一致性。",
    ],
    example:
      "将黑白棋盘格直接隔点采样，再先低通滤波后降采样；比较两幅结果，解释为何原图中的高频纹理会变成虚假的低频图案。",
    pitfall:
      "采样定理有带限等条件，真实图像与有限滤波只能近似满足；插值放大不能凭空恢复已丢失的细节。",
    prerequisites: ["array-computing", "linear-maps"],
    related: ["convolution", "audio-speech"],
    sources: [
      {
        title: "MIT 6.003: Signals and Systems",
        url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",
      },
    ],
  },
  {
    id: "image-classification",
    domain: "vision",
    title: {
      zh: "图像分类",
      en: "Image Classification",
    },
    level: "core",
    scope: "shared",
    summary:
      "从图像预测整体类别，通过卷积或其他表征提取器学习视觉特征；将数据增强、类别不平衡与迁移学习纳入实验，并分析模型是否依赖背景捷径。",
    why: "这是学习视觉训练流程、表示迁移与系统性错误分析的基础任务。",
    mastery: [
      "训练包含简单基线的小型分类实验，报告各类召回与混淆矩阵。",
      "对背景替换、裁剪和域外图像做诊断，区分目标识别与数据捷径。",
    ],
    example:
      "训练猫狗分类器后分别遮住动物或背景；若只保留草地背景仍高置信预测某一类，就进一步检查采样与增强是否强化了背景线索。",
    pitfall:
      "随机切分相似图片可能泄漏同一对象或拍摄场景；整体准确率也可能掩盖少数类失效。",
    prerequisites: ["convolution", "learning-problem", "data-splits"],
    related: ["visual-transformers", "visual-evaluation"],
    sources: [
      {
        title: "Deep Residual Learning for Image Recognition",
        url: "https://arxiv.org/abs/1512.03385",
      },
    ],
  },
  {
    id: "object-detection",
    domain: "vision",
    title: {
      zh: "目标检测",
      en: "Object Detection",
    },
    level: "core",
    scope: "specialist",
    summary:
      "同时判断物体类别与空间位置，学习候选区域、边界框回归、匹配及重复预测处理；评估时把定位误差、漏检和类别混淆分开观察。",
    why: "许多真实视觉任务需要知道物体在哪里，而不仅是整张图像属于哪类。",
    mastery: [
      "手算两个框的交并比，并解释匹配阈值怎样改变真假阳性。",
      "复现一个小型检测基线，按物体尺寸和遮挡情况检查错误。",
    ],
    example:
      "两个面积都为 100 的框重叠 60，交并比为 60÷140≈0.429；在阈值 0.5 下该预测不能与真值匹配，即使类别完全正确。",
    pitfall:
      "非极大值抑制可能误删邻近真实物体；检测分数依赖匹配协议，不同交并比阈值的平均精度不能混作同一指标。",
    prerequisites: [
      "image-classification",
      "convolution",
      "metrics-calibration",
    ],
    related: ["segmentation", "visual-evaluation"],
    sources: [
      {
        title:
          "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks",
        url: "https://arxiv.org/abs/1506.01497",
      },
    ],
  },
  {
    id: "segmentation",
    domain: "vision",
    title: {
      zh: "像素分割",
      en: "Image Segmentation",
    },
    level: "core",
    scope: "specialist",
    summary:
      "为像素分配语义或对象身份，区分语义、实例和全景分割；结合局部细节与全局上下文，并用区域重叠和边界误差检验结构预测。",
    why: "医学、遥感与场景理解常需要精确区域，边界错误可能比分类错误更关键。",
    mastery: [
      "实现带跳跃连接的分割基线，检查输出分辨率与标签插值规则。",
      "同时计算逐类交并比、Dice 与边界错误，分析小目标表现。",
    ],
    example:
      "预测区域有 100 个像素，真值 120 个，交集 80 个；交并比为 80÷140≈0.571，Dice 为 160÷220≈0.727。",
    pitfall:
      "像素准确率容易被大面积背景主导；类别掩码不能像连续图像一样任意插值，未标注区域也未必是背景。",
    prerequisites: ["image-classification", "convolution"],
    related: ["object-detection", "visual-evaluation"],
    sources: [
      {
        title:
          "U-Net: Convolutional Networks for Biomedical Image Segmentation",
        url: "https://arxiv.org/abs/1505.04597",
      },
    ],
    formula: "\\operatorname{IoU}(A,B)=\\frac{|A\\cap B|}{|A\\cup B|}",
  },
  {
    id: "visual-transformers",
    domain: "vision",
    title: {
      zh: "视觉 Transformer",
      en: "Vision Transformers",
    },
    level: "core",
    scope: "specialist",
    summary:
      "把图像分块并映射成序列，用注意力建立跨区域关系；研究位置表示、局部归纳偏置与训练规模，比较这种表征和卷积在资源与数据上的取舍。",
    why: "它提供了与语言共享的架构语言，也要求重新审视视觉特有的空间结构。",
    mastery: [
      "实现图像分块嵌入，跟踪每层词元数、特征维度和位置表示。",
      "固定数据与训练预算，比较分块大小变化对精度和显存的影响。",
    ],
    example:
      "224×224 图像使用 16×16 分块得到 196 个图像词元；改成 8×8 得到 784 个，忽略附加词元时全注意力配对数增加到 16 倍。",
    pitfall:
      "分块更细不保证更好；预训练、增强与预算影响比较结果，不能把单次架构对比当作普遍优劣。",
    prerequisites: ["transformer", "image-signals", "image-classification"],
    related: ["self-supervised-vision", "multimodal-fusion"],
    sources: [
      {
        title:
          "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
        url: "https://arxiv.org/abs/2010.11929",
      },
    ],
  },
  {
    id: "self-supervised-vision",
    domain: "vision",
    title: {
      zh: "视觉自监督学习",
      en: "Self-Supervised Vision",
    },
    level: "research",
    scope: "specialist",
    summary:
      "从图像本身构造学习信号，通过不同视图的对比或遮挡重建获得表示；关注增强带来的不变性、表征坍塌以及线性探测与完整微调的区别。",
    why: "大量图像没有人工类别标签，自监督方法提供学习可迁移表征的路径。",
    mastery: [
      "实现对比或掩码重建的小实验，说明正样本和目标是如何产生的。",
      "分别冻结编码器做线性探测与完整微调，报告相同划分上的结果。",
    ],
    example:
      "对同一张图做两种裁剪作为正样本；逐渐加强裁剪，观察语义主体消失后表示与下游分类的变化，再与掩码重建基线比较。",
    pitfall:
      "增强必须尊重任务语义；对颜色无差别的不变表示可能损害颜色识别，预训练损失更低也不必然迁移更好。",
    prerequisites: [
      "self-supervision",
      "image-classification",
      "representation-learning",
    ],
    related: ["visual-transformers", "ablation-studies"],
    sources: [
      {
        title:
          "A Simple Framework for Contrastive Learning of Visual Representations",
        url: "https://arxiv.org/abs/2002.05709",
      },
      {
        title: "Masked Autoencoders Are Scalable Vision Learners",
        url: "https://arxiv.org/abs/2111.06377",
      },
    ],
  },
  {
    id: "geometry-3d",
    domain: "vision",
    title: {
      zh: "三维几何与多视图",
      en: "3D Geometry and Multiple Views",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用相机模型连接三维点与二维观测，理解标定、投影、对应关系和三角化；明确尺度与坐标系的可辨识性，为重建和机器人感知建立几何基础。",
    why: "几何约束能解释图像变化，也能检验学习模型的预测是否空间一致。",
    mastery: [
      "写出相机投影关系，标明内参、外参、齐次坐标及单位。",
      "对合成双目点做三角化，并测像素误差对深度估计的影响。",
    ],
    example:
      "理想校正双目中焦距 800 像素、基线 0.1 米、视差 40 像素，对应深度 2 米；把视差改为 39 像素后比较深度误差。",
    pitfall:
      "双目公式需要对应点与校正条件；一般单目重建存在尺度歧义，坐标系或单位错误会产生看似合理的错误三维图。",
    prerequisites: ["linear-maps", "svd", "image-signals"],
    related: ["control-robotics", "optical-flow-video"],
    sources: [
      {
        title: "Hartley & Zisserman: Multiple View Geometry in Computer Vision",
        url: "https://www.robots.ox.ac.uk/~vgg/hzbook/",
      },
    ],
    formula: "Z=\\frac{fb}{d}\\quad\\text{(rectified stereo)}",
  },
  {
    id: "optical-flow-video",
    domain: "vision",
    title: {
      zh: "光流与视频理解",
      en: "Optical Flow and Video",
    },
    level: "core",
    scope: "specialist",
    summary:
      "从连续帧估计像素运动并建模时间关系，区分光流、物体运动和相机运动；把遮挡、对应歧义和时序采样纳入跟踪与动作理解的分析。",
    why: "单帧外观不足以解释事件过程，时间一致性也能为视觉学习提供信号。",
    mastery: [
      "在已知平移的合成视频上计算光流端点误差并可视化误差区域。",
      "比较逐帧模型与时序模型，并用乱序帧检验模型是否真正利用时间。",
    ],
    example:
      "将一幅纹理图水平移动 2 像素生成第二帧，真值流为 (2,0)；再加入遮挡块，分别统计可见区域与遮挡区域的端点误差。",
    pitfall:
      "亮度恒定与小运动近似并非处处成立；光流不等于三维速度，视频训练测试也应避免相邻片段泄漏。",
    prerequisites: ["image-signals", "convolution", "geometry-3d"],
    related: ["sequence-models", "control-robotics"],
    sources: [
      {
        title: "RAFT: Recurrent All-Pairs Field Transforms for Optical Flow",
        url: "https://arxiv.org/abs/2003.12039",
      },
    ],
  },
  {
    id: "vision-language",
    domain: "vision",
    title: {
      zh: "视觉语言对齐",
      en: "Vision-Language Alignment",
    },
    level: "core",
    scope: "shared",
    summary:
      "联合图像与文本学习可比较的表示，研究配对监督、对比学习与零样本分类；区分跨模态检索、识别和需要细粒度证据的视觉问答。",
    why: "它把视觉概念与语言接口连接起来，是多模态模型的重要基础。",
    mastery: [
      "为一个批次构造图文相似度矩阵，说明两个方向的匹配目标。",
      "改变类别提示模板，比较零样本分类结果及图文检索错误。",
    ],
    example:
      "给 3 张图片和 3 条对应描述构造 3×3 相似度矩阵；检查正确配对是否同时是所在行与列的高分项，再替换颜色词观察细粒度辨别。",
    pitfall:
      "匹配语义不保证计数、空间关系或否定理解；互联网图文配对包含噪声，零样本表现也受提示模板影响。",
    prerequisites: [
      "image-classification",
      "language-modeling",
      "representation-learning",
    ],
    related: ["multimodal-fusion", "retrieval"],
    sources: [
      {
        title:
          "Learning Transferable Visual Models From Natural Language Supervision",
        url: "https://arxiv.org/abs/2103.00020",
      },
    ],
  },
  {
    id: "image-generation",
    domain: "vision",
    title: {
      zh: "图像生成与条件控制",
      en: "Image Generation",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用生成模型学习图像分布，并通过文本、布局等条件控制采样；连接噪声去除、潜空间表示和引导强度，分别检查画质、多样性与条件一致性。",
    why: "生成实验需要理解分布与采样过程，不能只挑选一张好看的输出。",
    mastery: [
      "完成小分辨率的去噪训练或预训练模型采样实验，记录完整配置。",
      "固定提示和种子，系统改变采样步数或引导强度，比较多维指标。",
    ],
    example:
      "对同一提示用 4 个固定种子、3 档引导强度各生成图像；记录目标数量、颜色是否正确以及多样性，避免只展示最成功的一张。",
    pitfall:
      "更强引导可能牺牲多样性并产生伪影；生成逼真不代表事实真实，训练数据记忆与使用授权也需单独核查。",
    prerequisites: ["image-signals", "generative-models", "diffusion"],
    related: ["visual-evaluation", "data-governance"],
    sources: [
      {
        title: "High-Resolution Image Synthesis with Latent Diffusion Models",
        url: "https://arxiv.org/abs/2112.10752",
      },
    ],
  },
  {
    id: "audio-speech",
    domain: "vision",
    title: {
      zh: "音频与语音建模",
      en: "Audio and Speech Modeling",
    },
    level: "core",
    scope: "specialist",
    summary:
      "把波形、时频表示和语言符号连接起来，学习语音识别的时序对齐与自监督表征；考察说话人、口音、噪声及语速变化对系统的影响。",
    why: "语音把连续信号与离散语言结合，是理解跨模态时序学习的典型入口。",
    mastery: [
      "检查采样率与分帧参数，比较波形、频谱和识别输出之间的关系。",
      "按说话人划分数据，计算词错率并分解替换、删除与插入错误。",
    ],
    example:
      "参考转写有 10 个词，识别结果含 2 个替换、1 个删除和 1 个插入，词错率为 40%；再测试同一段语音叠加噪声后的变化。",
    pitfall:
      "词错率受分词规范影响且可能超过 100%；同一说话人跨集合泄漏会高估泛化，语音识别也不等于理解内容。",
    prerequisites: ["image-signals", "sequence-models", "language-modeling"],
    related: ["multimodal-fusion", "tokenization"],
    sources: [
      {
        title:
          "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations",
        url: "https://arxiv.org/abs/2006.11477",
      },
    ],
    formula: "\\operatorname{WER}=\\frac{S+D+I}{N}",
  },
  {
    id: "multimodal-fusion",
    domain: "vision",
    title: {
      zh: "多模态融合与缺失模态",
      en: "Multimodal Fusion",
    },
    level: "research",
    scope: "specialist",
    summary:
      "把图像、文本、声音等不同来源的信息对齐并联合决策，比较早期、晚期和交互式融合；检验时间同步、互补信息与缺失模态条件下的稳健性。",
    why: "多种输入只有在提供互补且可信的信息时，才可能改善决策。",
    mastery: [
      "建立每个单模态基线与联合模型，量化融合带来的增益。",
      "逐一遮蔽、错配或扰动模态，报告完整输入与缺失输入下的表现。",
    ],
    example:
      "在视频情感任务中分别用画面、语音和联合输入训练；将音轨随机配给另一视频，观察模型是否仍获得异常高分并检查数据捷径。",
    pitfall:
      "更多模态不保证更强；时间错位、标签泄漏或强势模态可能掩盖其他输入失效，缺失模式也会造成分布变化。",
    prerequisites: [
      "vision-language",
      "audio-speech",
      "representation-learning",
    ],
    related: ["distribution-shift", "uncertainty"],
    sources: [
      {
        title: "Multimodal Machine Learning: A Survey and Taxonomy",
        url: "https://arxiv.org/abs/1705.09406",
      },
    ],
  },
  {
    id: "visual-evaluation",
    domain: "vision",
    title: {
      zh: "视觉评估与泛化检查",
      en: "Visual Evaluation",
    },
    level: "core",
    scope: "shared",
    summary:
      "根据分类、检测、分割或生成任务选择指标与匹配协议，并按尺寸、场景和群体拆解误差；把基准表现与实际部署条件之间的差距明确展示。",
    why: "视觉结果容易被漂亮样例掩盖，规范评估才能看见系统性失败。",
    mastery: [
      "为一个视觉任务写清样本单位、匹配阈值、聚合方法和置信区间。",
      "建立按光照、尺寸或拍摄设备分组的测试，检查平均分掩盖的失效。",
    ],
    example:
      "同一检测器分别统计小、中、大目标在多个交并比阈值下的平均精度；再加入低照度照片，展示性能变化而非只报一个总分。",
    pitfall:
      "不同任务的指标不能替代彼此；生成图像的分布统计也不能单独证明语义正确、没有记忆或对所有人群公平。",
    prerequisites: [
      "data-splits",
      "metrics-calibration",
      "image-classification",
    ],
    related: ["language-evaluation", "fairness"],
    sources: [
      {
        title: "Microsoft COCO: Common Objects in Context",
        url: "https://arxiv.org/abs/1405.0312",
      },
    ],
  },
  {
    id: "equivariance",
    domain: "vision",
    title: {
      zh: "对称性与等变性",
      en: "Symmetry and Equivariance",
    },
    level: "research",
    scope: "specialist",
    summary:
      "让输入经过某种变换时，网络输出按相应规则变化，以结构化方式编码平移、旋转等对称性；区分等变表示与最终预测不变性的任务需求。",
    why: "合适的对称性能减少学习负担，同时提供严格的架构与误差检验。",
    mastery: [
      "对给定任务写出输入和输出的变换作用，区分不变与等变目标。",
      "数值比较先变换后推理与先推理后变换，定位边界和采样误差。",
    ],
    example:
      "把图像向右平移 1 像素，比较分割输出是否也平移 1 像素；再检查分类输出是否保持类别，并改变填充和步幅观察差异。",
    pitfall:
      "不适合任务的对称性会丢失有效信息；离散网格、边界、步幅和插值可能破坏理论上的精确等变。",
    prerequisites: ["linear-maps", "convolution"],
    related: ["geometry-3d", "representation-learning"],
    sources: [
      {
        title: "Group Equivariant Convolutional Networks",
        url: "https://arxiv.org/abs/1602.07576",
      },
    ],
    formula: "f(T_gx)=\\rho(g)f(x)",
  },
  {
    id: "mdp",
    domain: "reinforcement",
    title: {
      zh: "马尔可夫决策过程",
      en: "Markov Decision Processes",
    },
    level: "core",
    scope: "shared",
    summary:
      "用状态、行动、转移、奖励与时间范围描述连续决策，明确策略如何影响未来数据；马尔可夫假设要求当前状态足以概括预测未来所需的信息。",
    why: "先写清问题模型，才能区分任务目标、观测限制与算法产生的误差。",
    mastery: [
      "为网格任务列出状态、行动、转移、奖励、终止条件和折扣。",
      "举出观测不满足马尔可夫性的例子，并说明需要补充什么信息。",
    ],
    example:
      "在有终点的 3×3 网格里，每走一步奖励 −1、到终点奖励 0；比较最短路径与绕路的回报，再加入只能看到附近格子的观测限制。",
    pitfall:
      "智能体看到的观测不一定是完整状态；奖励定义决定所学行为，有限时域、折扣和终止处理也不能混淆。",
    prerequisites: [
      "conditional-probability",
      "expectation-variance",
      "learning-problem",
    ],
    related: ["bellman-equations", "tool-use-agents"],
    sources: [
      {
        title: "Stanford CS234: Reinforcement Learning",
        url: "https://web.stanford.edu/class/cs234/",
      },
    ],
  },
  {
    id: "bellman-equations",
    domain: "reinforcement",
    title: {
      zh: "贝尔曼方程",
      en: "Bellman Equations",
    },
    level: "core",
    scope: "shared",
    summary:
      "把长期价值分解为一步奖励与后继价值，区分给定策略的期望方程和选择最优行动的最优方程；用固定点观点连接价值估计与规划。",
    why: "价值递推是动态规划、时序差分与多种强化学习算法的共同结构。",
    mastery: [
      "对一个两状态模型分别写出策略评价方程与最优性方程。",
      "手算一次贝尔曼更新，说明转移期望、最大化和折扣的位置。",
    ],
    example:
      "某状态即时奖励为 1，折扣 0.9，下一步以各 0.5 的概率进入价值为 2 和 4 的状态；该行动的一步备份值为 1＋0.9×3＝3.7。",
    pitfall:
      "期望方程中的策略不能随意替换为最大化；常用压缩映射结论要求有界奖励与折扣小于 1，其他情形需另外的条件。",
    prerequisites: ["mdp", "expectation-variance"],
    related: ["dynamic-programming-rl", "q-learning"],
    sources: [
      {
        title: "Underactuated Robotics: Dynamic Programming",
        url: "https://underactuated.mit.edu/dp.html",
      },
    ],
    formula:
      "V^{\\pi}(s)=\\mathbb{E}_{a\\sim\\pi,\\,s^{\\prime}\\sim P}\\!\\left[r+\\gamma V^{\\pi}(s^{\\prime})\\mid s\\right]",
  },
  {
    id: "dynamic-programming-rl",
    domain: "reinforcement",
    title: {
      zh: "决策中的动态规划",
      en: "Dynamic Programming for Control",
    },
    level: "core",
    scope: "specialist",
    summary:
      "在已知环境模型时，通过策略评价、策略改进或价值迭代求解决策问题；比较有限时域倒推与无限时域固定点迭代，并估计状态规模的代价。",
    why: "它提供可精确求解的小型基线，帮助理解采样学习究竟近似了哪一步。",
    mastery: [
      "实现表格价值迭代与策略迭代，在同一小模型上比较结果。",
      "报告停止准则和贝尔曼残差，并检查状态离散化带来的误差。",
    ],
    example:
      "为 4×4 网格显式列出转移概率，反复备份状态价值直到最大更新差小于阈值；将所得策略与有限步穷举结果核对。",
    pitfall:
      "这里假定转移与奖励模型可用；状态离散化和枚举成本可能很高，较小残差对策略质量的含义还依赖折扣等条件。",
    prerequisites: ["bellman-equations", "graphs-dynamic-programming"],
    related: ["model-based-rl", "state-space-search"],
    sources: [
      {
        title: "Stanford CS234 Lecture Materials: Tabular MDP Planning",
        url: "https://web.stanford.edu/class/cs234/modules.html",
      },
      {
        title: "Underactuated Robotics: Dynamic Programming",
        url: "https://underactuated.mit.edu/dp.html",
      },
    ],
  },
  {
    id: "monte-carlo-td",
    domain: "reinforcement",
    title: {
      zh: "蒙特卡洛与时序差分",
      en: "Monte Carlo and Temporal Difference",
    },
    level: "core",
    scope: "specialist",
    summary:
      "从经验轨迹估计价值，比较等待完整回报的蒙特卡洛方法和利用下一状态估计进行自举的时序差分；理解更新目标的偏差、方差与数据需求。",
    why: "不再知道环境模型时，价值估计必须从实际经历或已有轨迹中学习。",
    mastery: [
      "用同一批短轨迹手算蒙特卡洛回报和一步时序差分目标。",
      "在随机游走中比较两者随样本量变化的价值估计误差。",
    ],
    example:
      "当前价值 2，奖励 1，下一状态价值 3，折扣 0.9、步长 0.1；时序差分误差为 1.7，更新后当前价值为 2.17。",
    pitfall:
      "终止状态的后继价值通常设为零，但时间截断未必代表任务终止；自举会受当前价值估计误差影响。",
    prerequisites: ["mdp", "bellman-equations", "monte-carlo"],
    related: ["q-learning", "actor-critic"],
    sources: [
      {
        title: "Learning to Predict by the Methods of Temporal Differences",
        url: "https://link.springer.com/article/10.1007/BF00115009",
      },
    ],
    formula:
      "V(s)\\leftarrow V(s)+\\alpha\\left[r+\\gamma V(s^{\\prime})-V(s)\\right]",
  },
  {
    id: "q-learning",
    domain: "reinforcement",
    title: {
      zh: "Q 学习",
      en: "Q-Learning",
    },
    level: "core",
    scope: "specialist",
    summary:
      "从状态行动转移样本学习最优行动价值，通过下一状态的最大估计值构造更新目标；区分采样行为策略与最终目标策略，并理解表格收敛的条件。",
    why: "它是异策略价值学习的基础，也揭示自举与函数逼近结合的困难。",
    mastery: [
      "实现表格 Q 学习，检查访问覆盖、步长与终止状态处理。",
      "比较 Q 学习与同策略更新在探索期间的行为，并记录学习曲线。",
    ],
    example:
      "当前 Q 为 1，奖励 0，折扣 0.9，下一状态两行动值为 2 和 3，步长 0.2；更新目标为 2.7，新的 Q 为 1.34。",
    pitfall:
      "表格收敛需要充分访问和合适步长等条件；神经网络、有限重放和最大化偏差不会自动继承该保证。",
    prerequisites: ["monte-carlo-td", "bellman-equations"],
    related: ["off-policy-learning", "exploration"],
    sources: [
      {
        title: "Watkins & Dayan: Q-learning",
        url: "https://www.gatsby.ucl.ac.uk/~dayan/papers/cjch.pdf",
      },
    ],
    formula:
      "Q(s,a)\\leftarrow Q(s,a)+\\alpha\\left[r+\\gamma\\max_{a^{\\prime}}Q(s^{\\prime},a^{\\prime})-Q(s,a)\\right]",
  },
  {
    id: "policy-gradients",
    domain: "reinforcement",
    title: {
      zh: "策略梯度",
      en: "Policy Gradients",
    },
    level: "core",
    scope: "specialist",
    summary:
      "直接参数化行动分布，用轨迹回报构造策略目标的梯度估计；理解对数概率技巧、基线减方差及采样分布，区别于通过最大行动价值选择动作。",
    why: "随机策略和连续动作任务常需要直接优化策略，而不能枚举所有动作。",
    mastery: [
      "推导折扣回报的对数概率梯度，说明时间权重与基线的条件。",
      "实现带状态基线的回报加权更新，比较梯度方差与学习稳定性。",
    ],
    example:
      "在第 0 步，选择行动 A 后的回报为 5，基线为 3，则用优势 2 加权 A 的对数概率梯度；保持样本固定检查更新是否提高 A 的概率。",
    pitfall:
      "式中 G_t 是从 t 起折扣的回报，时间权重对应从初始时刻定义的目标；基线应不依赖当前行动，任意行动相关基线未必保持无偏。",
    prerequisites: ["mdp", "stochastic-gradients", "expectation-variance"],
    related: ["actor-critic", "preference-learning"],
    sources: [
      {
        title:
          "Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning",
        url: "https://link.springer.com/article/10.1007/BF00992696",
      },
    ],
    formula:
      "\\nabla_{\\theta}J=\\mathbb{E}_{\\tau\\sim\\pi_{\\theta}}\\!\\left[\\sum_t\\gamma^t\\nabla_{\\theta}\\log\\pi_{\\theta}(a_t\\mid s_t)\\bigl(G_t-b(s_t)\\bigr)\\right]",
  },
  {
    id: "actor-critic",
    domain: "reinforcement",
    title: {
      zh: "行动者与评论者",
      en: "Actor-Critic Methods",
    },
    level: "core",
    scope: "specialist",
    summary:
      "将策略学习与价值估计结合：行动者决定动作分布，评论者提供更新信号；分析优势估计、自举误差与两套参数同时学习时的耦合。",
    why: "它连接价值方法和策略梯度，是许多现代强化学习算法的基本组织方式。",
    mastery: [
      "画出一次更新中策略、价值目标与采样数据的计算依赖。",
      "比较无基线策略梯度与行动者评论者，记录方差、偏差和样本效率。",
    ],
    example:
      "在短链任务中同时记录评论者预测、实际回报和策略熵；故意降低评论者更新次数，观察失准的优势估计怎样改变行动者的学习。",
    pitfall:
      "评论者不是客观裁判，它也是从有限数据训练的模型；两个损失下降不保证策略回报提高。",
    prerequisites: ["policy-gradients", "monte-carlo-td"],
    related: ["ppo", "off-policy-learning"],
    sources: [
      {
        title: "Konda & Tsitsiklis: Actor-Critic Algorithms",
        url: "https://papers.nips.cc/paper/1786-actor-critic-algorithms.pdf",
      },
    ],
  },
  {
    id: "ppo",
    domain: "reinforcement",
    title: {
      zh: "近端策略优化",
      en: "Proximal Policy Optimization",
    },
    level: "research",
    scope: "specialist",
    summary:
      "用旧策略采样，再通过概率比值与裁剪代理目标限制单次策略更新的激进程度；同时监控优势估计、价值损失、熵和策略变化。",
    why: "它是常用的策略优化基线，也适合学习代理目标与真实回报的区别。",
    mastery: [
      "手算正负优势下的裁剪目标，标明哪些区间停止增加激励。",
      "实现旧策略冻结和小批多轮更新，记录近似 KL、裁剪比例与回报。",
    ],
    example:
      "旧策略对某行动概率为 0.2，新策略为 0.3，概率比为 1.5；优势为 2、裁剪宽度 0.2 时，两项为 3 与 2.4，目标取较小的 2.4。",
    pitfall:
      "裁剪代理目标不是每个状态上的硬信赖域，也不保证回报单调增加；过多复用旧样本仍可能产生较大策略偏移。",
    prerequisites: ["actor-critic", "entropy-kl", "constrained-optimization"],
    related: ["preference-learning", "optimization-diagnostics"],
    sources: [
      {
        title: "Proximal Policy Optimization Algorithms",
        url: "https://arxiv.org/abs/1707.06347",
      },
    ],
    formula:
      "L^{\\mathrm{clip}}=\\mathbb{E}\\!\\left[\\min\\!\\left(r_tA_t,\\operatorname{clip}(r_t,1-\\epsilon,1+\\epsilon)A_t\\right)\\right]",
  },
  {
    id: "exploration",
    domain: "reinforcement",
    title: {
      zh: "探索与利用",
      en: "Exploration and Exploitation",
    },
    level: "core",
    scope: "specialist",
    summary:
      "在获取新信息和利用当前最优选择之间分配行动，区分随机探索、不确定性驱动探索与内在奖励；明确即时反馈与长期状态探索的差异。",
    why: "没有适当探索，智能体可能永远得不到推翻错误判断的数据。",
    mastery: [
      "在多臂老虎机中比较贪心、随机探索与置信上界的累积遗憾。",
      "构造奖励稀疏的小环境，解释为何逐步随机行动仍难到达关键状态。",
    ],
    example:
      "两个老虎机的真实成功率为 0.5 和 0.6，先各采样一次后固定使用胜者；重复实验观察早期偶然结果怎样导致长期选错。",
    pitfall:
      "随机噪声不是不确定性的同义词；经典老虎机保证依赖平稳、独立奖励等假设，不能直接搬到复杂非平稳环境。",
    prerequisites: ["mdp", "probability-rules", "estimation"],
    related: ["uncertainty", "model-based-rl"],
    sources: [
      {
        title: "Finite-time Analysis of the Multiarmed Bandit Problem",
        url: "https://homes.di.unimi.it/~cesabian/Pubblicazioni/ml-02.pdf",
      },
    ],
  },
  {
    id: "off-policy-learning",
    domain: "reinforcement",
    title: {
      zh: "异策略学习与校正",
      en: "Off-Policy Learning",
    },
    level: "research",
    scope: "specialist",
    summary:
      "用行为策略采集的数据学习另一个目标策略，理解分布不匹配、重要性权重与经验重放；分析数据覆盖、自举和函数逼近共同造成的不稳定。",
    why: "复用旧经验能节省交互成本，但复用方式必须处理策略分布的变化。",
    mastery: [
      "对离散动作手算目标策略与行为策略的概率比，并检查支持集。",
      "比较未经校正、重要性加权与截断权重估计的偏差和方差。",
    ],
    example:
      "行为策略以 0.2 的概率选 A，而目标策略以 0.6 的概率选 A，该动作权重为 3；若行为策略从不选 B，就不能靠重加权恢复 B 的结果。",
    pitfall:
      "覆盖不足无法靠权重补救；长轨迹的重要性权重可能高方差，截断通常引入偏差，具体算法需说明校正机制。",
    prerequisites: ["q-learning", "monte-carlo-td", "probability-rules"],
    related: ["offline-rl", "causal-estimation"],
    sources: [
      {
        title: "Safe and Efficient Off-Policy Reinforcement Learning",
        url: "https://arxiv.org/abs/1606.02647",
      },
    ],
    formula:
      "\\rho_t=\\frac{\\pi(a_t\\mid s_t)}{\\mu(a_t\\mid s_t)}\\quad\\text{when }\\mu(a_t\\mid s_t)>0",
  },
  {
    id: "model-based-rl",
    domain: "reinforcement",
    title: {
      zh: "基于模型的强化学习",
      en: "Model-Based Reinforcement Learning",
    },
    level: "research",
    scope: "specialist",
    summary:
      "学习或利用环境的动态与奖励模型，通过模拟、规划或短期预测改善决策；把模型误差与策略利用误差区分开，控制滚动预测导致的偏差累积。",
    why: "世界模型可以节省真实交互，也可能把预测错误放大成错误行动。",
    mastery: [
      "训练一步动态模型，分别评估一步预测与多步滚动预测误差。",
      "比较不同模拟长度下的策略回报，检查策略是否利用模型漏洞。",
    ],
    example:
      "在小车模拟中用真实轨迹拟合下一状态，再分别滚动 1、5、20 步；比较模型内高回报策略在真实模拟器中的表现。",
    pitfall:
      "较小的一步均方误差不保证规划可靠；策略可能主动进入训练分布外、预测乐观但实际危险的区域。",
    prerequisites: ["mdp", "dynamic-programming-rl", "learning-problem"],
    related: ["control-robotics", "uncertainty"],
    sources: [
      {
        title: "When to Trust Your Model: Model-Based Policy Optimization",
        url: "https://arxiv.org/abs/1906.08253",
      },
    ],
  },
  {
    id: "offline-rl",
    domain: "reinforcement",
    title: {
      zh: "离线强化学习",
      en: "Offline Reinforcement Learning",
    },
    level: "research",
    scope: "specialist",
    summary:
      "只用固定历史轨迹学习决策策略，不能依靠在线交互修正错误；核心问题是数据覆盖之外的价值外推、策略约束和可信的离线评估。",
    why: "昂贵或高风险环境常只能提供历史数据，在线探索假设因此不再成立。",
    mastery: [
      "比较行为克隆、普通异策略算法与保守方法，保持数据集完全固定。",
      "按行为数据覆盖程度分组评估，并说明离线估计需要的假设。",
    ],
    example:
      "从同一网格环境收集只经过左半区的轨迹，训练策略后检查其是否给未见右半区动作虚高价值；在独立模拟器中验证真实回报。",
    pitfall:
      "没有探索权限时，分布外错误不会自动被新数据纠正；高离线估值不等于可安全部署，还需覆盖与评估假设。",
    prerequisites: ["off-policy-learning", "regularization", "data-splits"],
    related: ["imitation-learning", "uncertainty"],
    sources: [
      {
        title:
          "Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open Problems",
        url: "https://arxiv.org/abs/2005.01643",
      },
      {
        title: "Conservative Q-Learning for Offline Reinforcement Learning",
        url: "https://arxiv.org/abs/2006.04779",
      },
    ],
  },
  {
    id: "imitation-learning",
    domain: "reinforcement",
    title: {
      zh: "模仿学习",
      en: "Imitation Learning",
    },
    level: "core",
    scope: "specialist",
    summary:
      "从专家示范学习行动规则，区分把动作当标签的行为克隆和需要交互标注的数据聚合；理解策略自身错误如何改变后续遇到的状态分布。",
    why: "示范为稀疏奖励或难写奖励的任务提供入口，但监督学习假设会被闭环行动打破。",
    mastery: [
      "训练行为克隆策略，分别测专家状态上的动作误差与完整轨迹成功率。",
      "在可查询专家的模拟任务中聚合策略访问状态，比较分布偏移。",
    ],
    example:
      "用专家轨迹训练网格导航，给测试起点增加一格偏移；比较单步准确率与到达率，再为策略实际走到的错误状态补充专家动作。",
    pitfall:
      "专家演示未必覆盖恢复动作；数据聚合依赖能继续访问专家或标注者，不是仅有固定历史数据时自动可用的方法。",
    prerequisites: ["mdp", "learning-problem", "regularization"],
    related: ["offline-rl", "instruction-tuning"],
    sources: [
      {
        title:
          "A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning",
        url: "https://arxiv.org/abs/1011.0686",
      },
    ],
  },
  {
    id: "control-robotics",
    domain: "reinforcement",
    title: {
      zh: "控制与机器人决策",
      en: "Control and Robotics",
    },
    level: "research",
    scope: "specialist",
    summary:
      "连接动态系统、反馈控制与学习决策，明确状态估计、稳定性、约束和实时性；从局部线性模型出发，再研究模型误差与真实交互的限制。",
    why: "机器人行动改变物理世界，回报之外还需要分析稳定性和约束可满足性。",
    mastery: [
      "为简单系统写出状态空间模型，并设计与检验一个反馈控制器。",
      "比较无扰动、模型误差和输入饱和下的轨迹，说明稳定性结论条件。",
    ],
    example:
      "对离散标量系统 x 的下一步等于 1.1x＋u，使用 u＝−0.3x 后闭环系数为 0.8；再给控制量加上限，检查原收敛分析何时不再适用。",
    pitfall:
      "局部线性化与理想模型的稳定性不自动延伸到全局、输入饱和或接触动力学；模拟高回报也不能替代真实约束检查。",
    prerequisites: [
      "multivariable-calculus",
      "constrained-optimization",
      "model-based-rl",
    ],
    related: ["geometry-3d", "safety-evaluation"],
    sources: [
      {
        title: "Underactuated Robotics: Linear Quadratic Regulators",
        url: "https://underactuated.mit.edu/lqr.html",
      },
    ],
    formula: "x_{t+1}=Ax_t+Bu_t,\\quad u_t=-Kx_t",
  },
  {
    id: "data-pipelines",
    domain: "systems",
    title: {
      zh: "数据管道与输入吞吐",
      en: "Data Pipelines",
    },
    level: "core",
    scope: "shared",
    summary:
      "把读取、校验、变换、采样和批处理组织成可重复的数据流程，协调 CPU、存储与加速器；同时维护训练测试边界、随机性和样本可追溯性。",
    why: "模型训练的正确性与速度都可能受输入流程限制，数据错误往往比优化错误更隐蔽。",
    mastery: [
      "建立含模式校验、异常记录和可追踪样本编号的数据加载流程。",
      "测量加载、变换与计算耗时，比较缓存、并行读取和预取的影响。",
    ],
    example:
      "一次批次读取需 30 毫秒、模型计算需 20 毫秒；记录串行耗时后启用预取，检查能否重叠两阶段，并验证读取样本数与随机增强仍正确。",
    pitfall:
      "缓存位置可能固定随机增强，打乱顺序也不能消除实体泄漏；只优化吞吐而不检查样本重复与遗漏会破坏实验。",
    prerequisites: ["python-programming", "array-computing", "data-splits"],
    related: ["dataset-versioning", "profiling"],
    sources: [
      {
        title: "TensorFlow: Build Input Pipelines with tf.data",
        url: "https://www.tensorflow.org/guide/data",
      },
    ],
  },
  {
    id: "dataset-versioning",
    domain: "systems",
    title: {
      zh: "数据版本与谱系",
      en: "Dataset Versioning and Lineage",
    },
    level: "core",
    scope: "shared",
    summary:
      "为原始数据、清洗规则、标签和划分记录可恢复的版本关系，让模型结果能追溯到确切输入；结合数据说明文档描述收集目的、限制与变更。",
    why: "代码相同而数据变化也会改变结论，研究复现需要版本化整个输入链。",
    mastery: [
      "保存数据清单、内容摘要、处理配置和划分编号，并重建一次旧实验。",
      "记录一项标签修正如何传播到训练集、模型和评估报告。",
    ],
    example:
      "修正 20 条错标记录后生成新版本，保留旧版清单与哈希；用两版数据训练同一配置，核对差异确实只来自这次标签修订。",
    pitfall:
      "哈希相同只能验证字节一致，不能证明数据合法、代表性充分或标签正确；大文件版本也需配套存储与访问控制。",
    prerequisites: ["git-environments", "data-pipelines"],
    related: ["reproducibility", "data-governance"],
    sources: [
      {
        title: "DVC: Get Started with Data Version Control",
        url: "https://doc.dvc.org/start",
      },
      {
        title: "Datasheets for Datasets",
        url: "https://arxiv.org/abs/1803.09010",
      },
    ],
  },
  {
    id: "gpu-computing",
    domain: "systems",
    title: {
      zh: "GPU 计算与内存层次",
      en: "GPU Computing",
    },
    level: "core",
    scope: "shared",
    summary:
      "理解线程并行、线程块、设备内存与数据传输的协作方式，分析算术吞吐和带宽瓶颈；把张量运算映射到实际硬件执行，而不是只数浮点操作。",
    why: "训练和推理的速度由并行度、内存访问和同步共同决定。",
    mastery: [
      "为矩阵乘法画出主机、设备与不同存储层次之间的数据流。",
      "比较批量运算与逐项调用，使用正确同步方式测设备执行时间。",
    ],
    example:
      "将 1000 次小向量运算改为一次批量张量运算，分别测总延迟和 GPU 时间；检查改进来自启动开销减少还是计算利用率提高。",
    pitfall:
      "GPU 调用常异步返回，普通主机计时可能只测到提交；高峰值算力不代表小批次或带宽受限任务会同样加速。",
    prerequisites: [
      "computer-architecture",
      "array-computing",
      "parallel-programming",
    ],
    related: ["profiling", "numerical-precision"],
    sources: [
      {
        title: "NVIDIA CUDA C++ Programming Guide",
        url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/",
      },
    ],
  },
  {
    id: "distributed-training",
    domain: "systems",
    title: {
      zh: "分布式训练",
      en: "Distributed Training",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用多个设备协同训练模型，区分数据、张量、流水线和状态分片并行；理解梯度同步、全局批量与通信成本，检验扩展速度和优化行为的变化。",
    why: "多设备既扩展容量与吞吐，也引入通信、采样和数值一致性问题。",
    mastery: [
      "实现小型数据并行实验，核对各进程采样、梯度聚合与全局批量。",
      "报告吞吐、扩展效率和最终指标，定位通信或负载不均带来的损耗。",
    ],
    example:
      "4 张卡每卡微批量 8，累计 2 次再更新，对应全局批量 64；与单卡批量 64 核对梯度尺度，再比较通信时间和训练曲线。",
    pitfall:
      "数据并行不自动避免样本重复；批量变化会改变优化轨迹，不同损失归约和梯度累计方式也可能悄悄改变学习率的实际含义。",
    prerequisites: ["gpu-computing", "stochastic-gradients", "networking"],
    related: ["memory-efficiency", "scaling-laws"],
    sources: [
      {
        title: "PyTorch: DistributedDataParallel",
        url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.parallel.DistributedDataParallel.html",
      },
      {
        title:
          "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models",
        url: "https://arxiv.org/abs/1910.02054",
      },
    ],
  },
  {
    id: "mixed-precision",
    domain: "systems",
    title: {
      zh: "混合精度训练",
      en: "Mixed-Precision Training",
    },
    level: "core",
    scope: "shared",
    summary:
      "在不同运算与状态中选择适当数值格式，以提高吞吐和减少内存；理解动态范围、舍入与损失缩放，保留对收敛和关键统计量的检查。",
    why: "数值格式是系统与优化之间的接口，节省资源不能以隐蔽的数值失效为代价。",
    mastery: [
      "比较低精度与单精度基线的损失曲线、梯度范围和最终指标。",
      "解释损失缩放为何缓解部分下溢，并检查溢出、跳步和缩放更新。",
    ],
    example:
      "对照同一批次在 FP32 与 FP16 计算下的梯度零值比例；再缩放损失、反传后还原梯度，并与 BF16 的动态范围比较，检查误差来源。",
    pitfall:
      "FP16 与 BF16 的指数和尾数配置不同，不能当作同一格式；缩放不能修复所有舍入误差，也不意味着每个算子都应使用低精度。",
    prerequisites: ["numerical-precision", "gpu-computing", "backpropagation"],
    related: ["quantization", "numerical-stability"],
    sources: [
      {
        title: "Mixed Precision Training",
        url: "https://arxiv.org/abs/1710.03740",
      },
      {
        title:
          "Google Cloud TPU: Improve Your Model's Performance with bfloat16",
        url: "https://docs.cloud.google.com/tpu/docs/bfloat16",
      },
    ],
  },
  {
    id: "memory-efficiency",
    domain: "systems",
    title: {
      zh: "训练显存与激活重算",
      en: "Memory-Efficient Training",
    },
    level: "core",
    scope: "specialist",
    summary:
      "拆分参数、梯度、优化器状态和激活的显存占用，通过激活重算、状态分片及批量安排降低峰值；明确省内存带来的额外计算或通信。",
    why: "知道峰值显存由什么组成，才能选对方法而不是盲目缩小模型。",
    mastery: [
      "测量一次训练步骤的各类状态与峰值显存，并解释理论估算差异。",
      "比较启用激活重算前后的显存、耗时及梯度一致性。",
    ],
    example:
      "先对 12 层网络逐层记录激活占用，再每 3 层设置重算边界；报告峰值显存下降和额外计算时间，检查随机层重算是否保持一致。",
    pitfall:
      "激活重算并不减少参数或所有优化器状态；随机性、可变状态与通信会影响正确性及速度，显存分配器保留量也不等于活跃张量量。",
    prerequisites: ["backpropagation", "gpu-computing", "algorithm-complexity"],
    related: ["distributed-training", "checkpointing"],
    sources: [
      {
        title: "Training Deep Nets with Sublinear Memory Cost",
        url: "https://arxiv.org/abs/1604.06174",
      },
      {
        title:
          "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models",
        url: "https://arxiv.org/abs/1910.02054",
      },
    ],
  },
  {
    id: "checkpointing",
    domain: "systems",
    title: {
      zh: "训练检查点与恢复",
      en: "Training Checkpoints and Recovery",
    },
    level: "core",
    scope: "shared",
    summary:
      "保存足以恢复训练进度的模型、优化器及相关状态，并验证中断后的行为；把可用推理权重与可继续训练的检查点区分开，建立可靠恢复流程。",
    why: "长实验必须经得起中断，恢复能力也是实验可复查性的一部分。",
    mastery: [
      "保存模型、优化器、调度器、步数、随机状态及必要的数据进度。",
      "人为中断并恢复同一实验，对照后续批次、学习率与参数变化。",
    ],
    example:
      "训练到第 100 步保存完整状态，再运行 10 步；从检查点恢复后重复这 10 步，在可控确定性配置下比较批次、损失与参数。",
    pitfall:
      "只保存权重通常无法精确续训；设备、库版本、异步加载和非确定性算子仍可能造成差异，写入也需防止半成品覆盖有效检查点。",
    prerequisites: ["dataset-versioning", "momentum-adam", "software-testing"],
    related: ["reproducibility", "memory-efficiency"],
    sources: [
      {
        title: "PyTorch: Saving and Loading a General Checkpoint",
        url: "https://docs.pytorch.org/tutorials/recipes/recipes/saving_and_loading_a_general_checkpoint.html",
      },
    ],
  },
  {
    id: "inference-serving",
    domain: "systems",
    title: {
      zh: "推理服务与批处理",
      en: "Inference Serving",
    },
    level: "core",
    scope: "shared",
    summary:
      "将模型封装成满足请求协议与资源约束的服务，协调排队、批处理、缓存和并发；生成模型还需区分首词元延迟、后续生成速度与总体吞吐。",
    why: "离线跑得快的模型未必能稳定满足真实流量与用户等待时间。",
    mastery: [
      "在固定硬件和请求分布下测吞吐、分位延迟与峰值内存。",
      "对生成任务分别记录首词元延迟和逐词元延迟，分析批处理取舍。",
    ],
    example:
      "让短提示和长提示混合到达，逐步增大动态批量；观察每秒完成量与第 95 百分位延迟，并检查 KV 缓存压力下的排队变化。",
    pitfall:
      "只报平均延迟会隐藏长尾；批处理、缓存命中和输出长度都影响结果，脱离服务负载的吞吐比较容易误导。",
    prerequisites: ["gpu-computing", "networking", "algorithm-complexity"],
    related: ["profiling", "mlops-monitoring"],
    sources: [
      {
        title:
          "Efficient Memory Management for Large Language Model Serving with PagedAttention",
        url: "https://arxiv.org/abs/2309.06180",
      },
      {
        title: "Clipper: A Low-Latency Online Prediction Serving System",
        url: "https://arxiv.org/abs/1612.03079",
      },
    ],
  },
  {
    id: "quantization",
    domain: "systems",
    title: {
      zh: "模型量化",
      en: "Model Quantization",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用较少比特表示权重或激活，通过缩放、零点和校准处理数值范围；区分训练后量化与量化感知训练，检查精度、内存和硬件实际加速。",
    why: "低比特表示能降低部署成本，但误差与性能都依赖具体算子和硬件。",
    mastery: [
      "手算一个仿射量化与反量化例子，识别舍入和截断误差。",
      "比较逐张量与逐通道量化，并用代表性校准数据评估分组误差。",
    ],
    example:
      "取缩放 0.1、零点 0，实数 0.26 四舍五入为整数 3，反量化为 0.3；再对含极端值的张量量化，比较普通范围与异常值处理。",
    pitfall:
      "权重量化不等于所有激活都低比特；校准集失配会损伤精度，文件变小也不保证没有相应内核的设备推理更快。",
    prerequisites: [
      "mixed-precision",
      "numerical-stability",
      "metrics-calibration",
    ],
    related: ["edge-deployment", "inference-serving"],
    sources: [
      {
        title:
          "Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference",
        url: "https://arxiv.org/abs/1712.05877",
      },
    ],
    formula:
      "q=\\operatorname{clip}\\!\\left(\\operatorname{round}(x/s)+z,q_{\\min},q_{\\max}\\right),\\quad \\hat{x}=s(q-z)",
  },
  {
    id: "distillation",
    domain: "systems",
    title: {
      zh: "知识蒸馏",
      en: "Knowledge Distillation",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用教师模型的软输出或中间表示指导学生训练，把任务标签与教师信号结合；研究温度、损失权重和容量差异对迁移效果的影响。",
    why: "蒸馏把模型压缩与学习目标联系起来，适合分析哪些行为可以低成本保留。",
    mastery: [
      "实现硬标签与软分布的联合训练，说明温度对概率和梯度的作用。",
      "在相同学生架构上比较直接监督与蒸馏，评估精度、校准和延迟。",
    ],
    example:
      "教师对三个类别输出 0.7、0.2、0.1，学生在正确类别之外也学习另外两类的相对概率；比较只用正确标签时的学生错误类型。",
    pitfall:
      "教师错误和偏差也会被传给学生；蒸馏不保证小模型保留所有能力，温度与损失缩放需与实现保持一致。",
    prerequisites: ["perceptron-mlp", "entropy-kl", "data-splits"],
    related: ["quantization", "edge-deployment"],
    sources: [
      {
        title: "Distilling the Knowledge in a Neural Network",
        url: "https://arxiv.org/abs/1503.02531",
      },
    ],
  },
  {
    id: "profiling",
    domain: "systems",
    title: {
      zh: "性能分析与瓶颈定位",
      en: "Profiling and Bottleneck Analysis",
    },
    level: "core",
    scope: "shared",
    summary:
      "通过时间线、算子统计与资源计数定位系统瓶颈，区分计算、访存、通信、输入和启动开销；先建立可重复测量，再用局部改动检验因果解释。",
    why: "优化应针对实际耗时位置，不能仅凭模型大小或硬件利用率猜测。",
    mastery: [
      "采集包含预热、同步与多次重复的性能记录，标出最耗时阶段。",
      "一次只改变一个瓶颈相关因素，验证总耗时改善与预测是否一致。",
    ],
    example:
      "发现 60% 时间用于数据读取后，将读取部分缩短一半；理想串行总耗时从 1 降为 0.7，速度约为 1.43 倍，再实测并解释重叠执行的影响。",
    pitfall:
      "分析器自身会增加开销；异步执行、预热、缓存和同步点都会改变测量，局部算子加速也可能只把瓶颈转移到别处。",
    prerequisites: [
      "gpu-computing",
      "algorithm-complexity",
      "software-testing",
    ],
    related: ["data-pipelines", "inference-serving"],
    sources: [
      {
        title: "NVIDIA Nsight Systems User Guide",
        url: "https://docs.nvidia.com/nsight-systems/UserGuide/index.html",
      },
    ],
  },
  {
    id: "mlops-monitoring",
    domain: "systems",
    title: {
      zh: "模型运维与持续监测",
      en: "MLOps and Monitoring",
    },
    level: "core",
    scope: "shared",
    summary:
      "跟踪模型上线后的输入、预测、延迟和真实反馈，管理版本、回滚与训练更新；区分数据变化、概念变化和工程故障，并处理标签延迟与反馈循环。",
    why: "部署不是研究结束，模型表现会随使用环境与系统依赖持续变化。",
    mastery: [
      "为输入模式、服务指标和任务质量分别定义监控项与告警条件。",
      "设计含影子评估、版本比较和可回滚发布的更新流程。",
    ],
    example:
      "上线分类器后先监控缺失字段、预测比例和延迟，再等一周后的真实标签计算质量；对照输入分布变化，避免把流量结构改变直接当成性能下降。",
    pitfall:
      "分布漂移告警不等于任务质量必然下降；模型输出也可能影响后续训练数据，自动再训练可能放大反馈偏差。",
    prerequisites: [
      "inference-serving",
      "data-pipelines",
      "metrics-calibration",
    ],
    related: ["distribution-shift", "human-oversight"],
    sources: [
      {
        title: "Hidden Technical Debt in Machine Learning Systems",
        url: "https://research.google/pubs/hidden-technical-debt-in-machine-learning-systems/",
      },
    ],
  },
  {
    id: "edge-deployment",
    domain: "systems",
    title: {
      zh: "端侧与资源受限部署",
      en: "Edge Deployment",
    },
    level: "core",
    scope: "specialist",
    summary:
      "在有限内存、功耗和实时约束下运行模型，将量化、结构选择、算子支持与设备测量结合；同时考虑离线运行、隐私边界和持续更新。",
    why: "端侧能力由完整设备约束决定，不能直接从桌面 GPU 结果推算。",
    mastery: [
      "在目标设备上测峰值内存、端到端延迟和每次推理能耗。",
      "核对算子支持与回退路径，比较压缩前后的任务指标及资源预算。",
    ],
    example:
      "为关键词识别设定 256 KB 工作内存预算，在实际设备上比较小模型与量化模型；把音频预处理也计入延迟，检查是否出现不支持算子的回退。",
    pitfall:
      "模型文件大小不是运行峰值内存；模拟器速度、标称算力和单次冷启动结果不能替代真实设备上的持续负载测试。",
    prerequisites: [
      "quantization",
      "inference-serving",
      "computer-architecture",
    ],
    related: ["distillation", "environment-cost"],
    sources: [
      {
        title: "MLPerf Tiny Benchmark",
        url: "https://arxiv.org/abs/2106.07597",
      },
    ],
  },
  {
    id: "retrieval-systems",
    domain: "systems",
    title: {
      zh: "向量索引与检索系统",
      en: "Vector Indexing and Retrieval Systems",
    },
    level: "core",
    scope: "specialist",
    summary:
      "把相似度检索扩展到大规模数据，比较精确搜索、近似索引和向量压缩；同时处理更新、过滤、版本一致性与召回延迟内存的取舍。",
    why: "检索模型的语义质量只有接入可靠索引和更新流程后，才能变成可用服务。",
    mastery: [
      "用精确近邻作参照，测近似索引的召回率、分位延迟与内存。",
      "测试新增、删除和条件过滤，确保索引版本与编码模型匹配。",
    ],
    example:
      "对 10 万个向量建立精确索引和近似索引，以精确前 10 名为参照改变搜索参数；绘制召回率与第 95 百分位延迟，再加入类别过滤。",
    pitfall:
      "近邻召回率不是任务相关性；嵌入模型更新通常需要重建或迁移索引，过滤顺序也可能让看似高召回的系统漏掉有效结果。",
    prerequisites: ["retrieval", "databases-sql", "algorithm-complexity"],
    related: ["rag", "inference-serving"],
    sources: [
      {
        title: "Billion-scale Similarity Search with GPUs",
        url: "https://arxiv.org/abs/1702.08734",
      },
      {
        title:
          "Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs",
        url: "https://arxiv.org/abs/1603.09320",
      },
    ],
  },
];
