import type { AINode } from "./types";

const source = (title: string, url: string) => ({ title, url });
const cs229 = source(
  "Stanford CS229 · Main Notes",
  "https://cs229.stanford.edu/main_notes.pdf",
);
const crossValidation = source(
  "scikit-learn · Cross-validation",
  "https://scikit-learn.org/stable/modules/cross_validation.html",
);
const mlp = source(
  "Dive into Deep Learning · Multilayer Perceptrons",
  "https://d2l.ai/chapter_multilayer-perceptrons/mlp.html",
);
const backprop = source(
  "Dive into Deep Learning · Backpropagation",
  "https://d2l.ai/chapter_multilayer-perceptrons/backprop.html",
);
const transformerPaper = source(
  "Vaswani et al. · Attention Is All You Need (2017)",
  "https://arxiv.org/abs/1706.03762",
);
const representationPaper = source(
  "Bengio, Courville & Vincent · Representation Learning",
  "https://arxiv.org/abs/1206.5538",
);
const vae = source(
  "Kingma & Welling · Auto-Encoding Variational Bayes",
  "https://arxiv.org/abs/1312.6114",
);
const bayesNetworks = source(
  "Stanford CS228 · Bayesian Networks",
  "https://ermongroup.github.io/cs228-notes/representation/directed/",
);
const causalBook = source(
  "Hernán & Robins · Causal Inference: What If",
  "https://miguelhernan.org/whatifbook",
);
const causalPrimer = source(
  "Pearl, Glymour & Jewell · Causal Inference in Statistics: A Primer",
  "https://bayes.cs.ucla.edu/PRIMER/",
);
const aima = source(
  "Russell & Norvig · Artificial Intelligence: A Modern Approach",
  "https://aima.cs.berkeley.edu/",
);
const searchNotes = source(
  "UC Berkeley CS188 · State Space Search",
  "https://inst.eecs.berkeley.edu/~cs188/textbook/search/state.html",
);
const logicNotes = source(
  "UC Berkeley CS188 · Propositional Logic",
  "https://inst.eecs.berkeley.edu/~cs188/textbook/logic/propositional.html",
);

// Prerequisites encode a recommended study order, not claims of historical influence.
export const coreNodes: AINode[] = [
  {
    id: "learning-problem",
    domain: "machine-learning",
    title: {
      zh: "学习问题与经验风险",
      en: "Learning Problems and Empirical Risk",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "把任务写成输入、目标、模型和损失，并区分训练数据上的表现与未来数据上的表现。学习的核心是借有限样本选择规则，同时说明这些样本代表什么环境。",
    why: "先定义预测时真正可见的信息和错误代价，才能判断模型是否解决了业务或科学问题。",
    mastery: [
      "为一个任务列出输入、标签、预测时点、损失和目标人群。",
      "用均值或多数类构造基线，并分别计算训练风险与留出风险。",
    ],
    example:
      "预测次日用电量：只使用当天及以前信息，以平均绝对误差比较模型和“沿用昨日用电量”基线。",
    pitfall:
      "训练误差小不保证泛化；独立同分布是假设而非数据自带的属性。预测相关性也不能直接回答干预会产生什么效果。",
    prerequisites: ["probability-rules", "vectors-matrices"],
    related: ["generalization-theory", "research-questions"],
    formula: String.raw`\widehat R(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)`,
    sources: [cs229],
  },
  {
    id: "data-splits",
    domain: "machine-learning",
    title: { zh: "数据划分与交叉验证", en: "Data Splits and Cross-validation" },
    level: "foundation",
    scope: "shared",
    summary:
      "训练集拟合参数，验证集选择方案，测试集估计最终表现。划分方式要模拟未来使用场景；同一个人、同一段时间或同一原图的衍生样本不能随意拆散。",
    why: "让离线成绩尽可能接近上线后的表现，避免模型其实记住了测试信息。",
    mastery: [
      "根据独立样本、分组或时间顺序选择划分方案并解释原因。",
      "将填补、标准化与特征选择放进每个训练折，保留一次最终测试。",
    ],
    example:
      "每位患者有多张影像时，先按患者划分训练与测试，再在训练患者内部交叉验证；检查患者编号没有交集。",
    pitfall:
      "先在全数据上标准化或筛选特征再划分会泄漏信息；反复查看测试分数再调参，也会把测试集变成验证集。",
    prerequisites: ["learning-problem"],
    related: ["dataset-versioning", "reproducibility", "time-series"],
    sources: [crossValidation],
  },
  {
    id: "linear-regression",
    domain: "machine-learning",
    title: { zh: "线性回归", en: "Linear Regression" },
    level: "foundation",
    scope: "shared",
    summary:
      "用特征的加权和预测连续数值，最小二乘通过残差平方和寻找参数。它既是可检查的预测基线，也是理解损失函数、优化、噪声假设和统计推断的入口。",
    why: "用较少计算建立可解释基线，并发现量纲、异常值和共线性等数据问题。",
    mastery: [
      "手推平方损失对参数的梯度，并用梯度下降拟合小数据。",
      "用 QR 或 SVD 求解同一问题，比较残差与病态输入下的稳定性。",
    ],
    example:
      "对样本 (1,3)、(2,5)、(3,7) 拟合带截距的直线，得到预测值 1+2x；再加入一个异常值观察参数变化。",
    pitfall:
      "唯一的普通最小二乘参数需要设计矩阵满列秩；不应为求解而显式计算矩阵逆。系数的因果解释和显著性推断另需假设。",
    prerequisites: ["learning-problem", "linear-maps", "gradient-descent"],
    related: ["regularization", "estimation"],
    formula: String.raw`\min_{w,b}\frac1n\sum_{i=1}^n(y_i-w^\top x_i-b)^2`,
    sources: [cs229],
  },
  {
    id: "logistic-regression",
    domain: "machine-learning",
    title: {
      zh: "逻辑回归与分类损失",
      en: "Logistic Regression and Classification Loss",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "逻辑回归把线性得分映射为二分类概率，用交叉熵拟合标签。它让概率估计与最终分类决策分开：同一组预测概率，可以按不同错误代价选择阈值。",
    why: "连接分类、最大似然、神经网络输出层与按风险作决策的实际流程。",
    mastery: [
      "从伯努利似然推出二分类交叉熵，并检查梯度的符号。",
      "在验证集比较多个阈值下的精确率与召回率，说明选择依据。",
    ],
    example:
      "得分为 0 时预测正类概率为 0.5；得分为 ln 3 时概率为 0.75。高漏报代价的任务可以采用低于 0.5 的阈值。",
    pitfall:
      "线性可分数据上，不加约束的最大似然参数可能没有有限解；实现应使用稳定的 logits 损失。概率输出并不自动意味着校准良好。",
    prerequisites: ["linear-regression", "conditional-probability"],
    related: ["metrics-calibration", "perceptron-mlp"],
    formula: String.raw`p(y=1\mid x)=\sigma(w^\top x+b),\qquad\sigma(z)=\frac1{1+e^{-z}}`,
    sources: [cs229],
  },
  {
    id: "regularization",
    domain: "machine-learning",
    title: {
      zh: "正则化与模型复杂度",
      en: "Regularization and Model Complexity",
    },
    level: "core",
    scope: "shared",
    summary:
      "在拟合数据之外加入对模型的偏好，例如压小参数、鼓励稀疏或限制函数变化。正则化用适当偏差换取稳定性，强度应由与目标场景一致的验证方案决定。",
    why: "处理样本有限、特征相关或参数很多时的不稳定估计，改善可复现的预测表现。",
    mastery: [
      "对同一回归数据比较无正则、岭回归和 Lasso 的系数路径。",
      "用训练折拟合尺度变换，在验证折选择正则强度并报告误差。",
    ],
    example:
      "让两个特征几乎相同，观察普通回归系数随微小噪声剧烈变化，再检验 L2 正则是否降低这种波动。",
    pitfall:
      "正则强度取决于损失采用求和还是平均、特征尺度及参数化方式。Adam 中加入 L2 惩罚一般不等同于 AdamW 的解耦权重衰减。",
    prerequisites: ["linear-regression", "objective-functions"],
    related: ["dl-regularization", "momentum-adam"],
    formula: String.raw`\min_w\widehat R(w)+\lambda\Omega(w),\qquad\lambda\ge0`,
    sources: [
      cs229,
      source(
        "Loshchilov & Hutter · Decoupled Weight Decay Regularization",
        "https://arxiv.org/abs/1711.05101",
      ),
    ],
  },
  {
    id: "bias-variance",
    domain: "machine-learning",
    title: {
      zh: "偏差、方差与学习曲线",
      en: "Bias, Variance and Learning Curves",
    },
    level: "core",
    scope: "shared",
    summary:
      "把平方预测误差分解为系统偏差、训练样本变化带来的方差和不可约噪声。配合学习曲线，可以判断增加数据、调整复杂度或改变特征是否更可能有帮助。",
    why: "让“欠拟合或过拟合”的诊断有可验证依据，而不只是凭训练分数猜测。",
    mastery: [
      "在可重复生成的数据上固定测试点，估计预测均值与方差。",
      "绘制不同训练集大小下的训练和验证误差，提出下一步实验。",
    ],
    example:
      "从带噪正弦函数重复采样 100 份训练集，比较一次与十次多项式在同一测试点的预测散布。",
    pitfall:
      "经典分解针对平方损失及指定的数据生成与重复采样机制；不能把所有误差指标或深度模型的复杂度曲线都套成单一 U 形。",
    prerequisites: ["learning-problem", "expectation-variance", "data-splits"],
    related: ["generalization-theory", "ensembles"],
    sources: [cs229],
  },
  {
    id: "nearest-neighbors",
    domain: "machine-learning",
    title: { zh: "近邻方法与距离", en: "Nearest Neighbors and Distance" },
    level: "foundation",
    scope: "shared",
    summary:
      "对新样本寻找特征空间中的近邻，再投票或平均得到预测。方法把归纳偏好显式放在距离、特征尺度和邻居数量上，适合检验数据表示是否真的有用。",
    why: "建立简单而有竞争力的局部基线，也为向量检索和相似样本解释打基础。",
    mastery: [
      "手算一个二维样本的 3 近邻分类，并说明距离与平票处理。",
      "比较标准化前后的验证效果及精确检索随数据规模的开销。",
    ],
    example:
      "预测某人的运动类别时，身高以厘米、体重以千克输入；先看未经缩放的距离，再用训练集统计量缩放后比较邻居。",
    pitfall:
      "高维下距离可能失去区分度；无关特征和量纲会改变邻近关系。测试样本不能作为带标签的邻居参与自身预测。",
    prerequisites: ["learning-problem", "inner-products"],
    related: ["retrieval-systems", "embeddings"],
    sources: [
      source(
        "scikit-learn · Nearest Neighbors",
        "https://scikit-learn.org/stable/modules/neighbors.html",
      ),
    ],
  },
  {
    id: "decision-trees",
    domain: "machine-learning",
    title: { zh: "决策树", en: "Decision Trees" },
    level: "core",
    scope: "shared",
    summary:
      "递归选择特征与阈值，把样本划入不同区域，并在叶节点输出类别或数值。树把复杂决策拆成局部规则，也展示了贪心拟合、剪枝与可解释性之间的取舍。",
    why: "适应非线性关系和特征交互，是表格学习与集成方法的重要构件。",
    mastery: [
      "对一个候选切分计算加权不纯度下降，选择较优阈值。",
      "改变树深和叶节点最少样本数，比较验证误差及规则稳定性。",
    ],
    example:
      "8 个样本含 4 正 4 负；某阈值把它们分成各 4 个样本、组成分别为 3 正 1 负和 1 正 3 负的两组，手算 Gini 下降。",
    pitfall:
      "逐步选择最优切分不保证全局最优树；小数据变化可能改变树结构。特征重要度会受高基数特征与相关特征影响。",
    prerequisites: ["learning-problem", "entropy-kl"],
    related: ["ensembles", "explainability"],
    sources: [
      source(
        "scikit-learn · Decision Trees",
        "https://scikit-learn.org/stable/modules/tree.html",
      ),
    ],
  },
  {
    id: "ensembles",
    domain: "machine-learning",
    title: {
      zh: "集成：Bagging 与 Boosting",
      en: "Ensembles: Bagging and Boosting",
    },
    level: "core",
    scope: "shared",
    summary:
      "把多个模型组合成预测器。Bagging 通过重采样与平均降低不稳定性，Boosting 逐步修正当前模型的不足；成员间差异、训练目标和验证策略共同决定收益。",
    why: "提供强健的表格数据基线，并理解多模型为何有时比单模型可靠。",
    mastery: [
      "训练随机森林并比较树数量、树深及成员相关性对验证误差的影响。",
      "用平方损失手算一轮残差拟合，再解释一般损失下的梯度提升。",
    ],
    example:
      "真实数值为 5，当前预测为 3；一个弱学习器预测残差为 1.5，学习率 0.2 时，新预测变为 3.3。",
    pitfall:
      "重复训练几乎相同的模型不一定降低方差；Boosting 也会过拟合。Stacking 的上层模型须使用折外预测，不能直接使用训练内成绩。",
    prerequisites: ["decision-trees", "bias-variance"],
    related: ["baselines", "uncertainty"],
    sources: [
      source(
        "scikit-learn · Ensembles",
        "https://scikit-learn.org/stable/modules/ensemble.html",
      ),
    ],
  },
  {
    id: "kernels-svm",
    domain: "machine-learning",
    title: {
      zh: "核方法与支持向量机",
      en: "Kernel Methods and Support Vector Machines",
    },
    level: "core",
    scope: "shared",
    summary:
      "核函数用内积形式表达相似性，无需显式构造高维特征。支持向量机在间隔与分类违约之间取舍，展示了几何直觉、凸优化和非线性预测的连接。",
    why: "掌握中等规模数据上的有效分类工具，并为高斯过程和核统计建立基础。",
    mastery: [
      "在二维点集画出线性分隔面、间隔与支持向量。",
      "在训练折内缩放特征，用验证集联合选择惩罚系数与 RBF 核宽度。",
    ],
    example:
      "对中心一类、外圈一类的二维数据，比较线性 SVM 与 RBF SVM；改变核宽度观察过于平滑和过于局部的边界。",
    pitfall:
      "任意相似度不一定是有效核：实值对称核需满足有限 Gram 矩阵半正定。核方法的训练开销通常随样本数快速增加。",
    prerequisites: [
      "regularization",
      "inner-products",
      "constrained-optimization",
    ],
    related: ["gaussian-processes", "duality-kkt"],
    sources: [
      source(
        "scikit-learn · Support Vector Machines",
        "https://scikit-learn.org/stable/modules/svm.html",
      ),
      cs229,
    ],
  },
  {
    id: "clustering",
    domain: "machine-learning",
    title: {
      zh: "聚类与无监督结构",
      en: "Clustering and Unsupervised Structure",
    },
    level: "core",
    scope: "shared",
    summary:
      "在没有目标标签时，根据选定的相似性、密度或连接结构组织样本。聚类结果不是唯一真相，而是数据表示、算法目标及尺度选择共同产生的一种结构描述。",
    why: "辅助探索数据、发现异常群体和设计后续标注，但需要与领域问题相互检验。",
    mastery: [
      "手算一轮 K-means 的分配与均值更新，并记录平方距离目标。",
      "比较 K-means 与密度聚类在双月形数据上的结果和参数敏感性。",
    ],
    example:
      "一维样本 0、1、9、10，以 0 和 10 初始化两个中心；完成一次分配后，中心更新为 0.5 与 9.5。",
    pitfall:
      "K-means 偏好欧氏空间中较紧凑的簇，并可能落入局部最优。轮廓系数高不等于聚类具有业务意义，噪声点也不必强行归组。",
    prerequisites: ["learning-problem", "inner-products"],
    related: ["latent-variable-models", "em-algorithm"],
    sources: [
      source(
        "scikit-learn · Clustering",
        "https://scikit-learn.org/stable/modules/clustering.html",
      ),
    ],
  },
  {
    id: "pca",
    domain: "machine-learning",
    title: { zh: "主成分分析", en: "Principal Component Analysis" },
    level: "core",
    scope: "shared",
    summary:
      "对中心化数据寻找方差最大的正交方向，用少量坐标保留主要变化。PCA 将协方差特征分解、奇异值分解与最小平方重构联系起来，是降维的基础参照。",
    why: "压缩相关特征、诊断数据尺度，并为学习到的表示提供清晰的线性基线。",
    mastery: [
      "对中心化矩阵用 SVD 求主方向，计算解释方差比例。",
      "在不同保留维数下比较重构误差与下游验证误差。",
    ],
    example:
      "二维样本集中在 y=x 附近时，第一主方向接近 (1,1)/√2；投影到该方向后再重构，观察丢失的垂直扰动。",
    pitfall:
      "训练集均值与投影必须原样用于测试集；是否标准化取决于量纲和目标。高方差方向不保证携带标签信息，PCA 也不使用标签。",
    prerequisites: ["svd", "expectation-variance"],
    related: ["autoencoders", "feature-engineering"],
    sources: [cs229],
  },
  {
    id: "metrics-calibration",
    domain: "machine-learning",
    title: {
      zh: "评价指标与概率校准",
      en: "Metrics and Probability Calibration",
    },
    level: "core",
    scope: "shared",
    summary:
      "评价先明确错误代价，再区分排序、阈值决策与概率可信度。准确率、精确率召回率、对数损失和校准曲线回答不同问题，不能互相替代。",
    why: "避免在类别不均衡或高代价场景中，被一个漂亮的总分误导。",
    mastery: [
      "从混淆矩阵计算精确率与召回率，并说明基准患病率变化的影响。",
      "绘制可靠性图与分箱样本量，用独立验证数据拟合并评估校准器。",
    ],
    example:
      "1000 个样本只有 10 个正类，全预测负类仍有 99% 准确率；若模型报出 0.8 概率的一组样本只有一半为正，则明显过度自信。",
    pitfall:
      "良好排序不保证概率校准，校准也不保证区分能力。分箱校准误差依赖分箱方式与样本量；不能在测试集上调阈值或校准参数。",
    prerequisites: [
      "logistic-regression",
      "data-splits",
      "conditional-probability",
    ],
    related: ["uncertainty", "statistical-comparison"],
    sources: [
      source(
        "scikit-learn · Probability Calibration",
        "https://scikit-learn.org/stable/modules/calibration.html",
      ),
    ],
  },
  {
    id: "feature-engineering",
    domain: "machine-learning",
    title: {
      zh: "特征工程与数据变换",
      en: "Feature Engineering and Preprocessing",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "把原始记录转成模型可用的输入，同时保留预测时可获得的信息。缺失处理、类别编码、缩放与组合特征都在表达对问题的假设，应作为训练流水线的一部分。",
    why: "很多模型失败来自输入定义或信息泄漏；良好特征让简单模型也能解决实际任务。",
    mastery: [
      "为数值、类别和缺失字段建立可重复的预处理流水线。",
      "逐项移除新特征做验证实验，检查它在预测时点是否真实可得。",
    ],
    example:
      "预测客户本月是否流失时，使用上月活跃天数；“注销原因”虽然高度相关，却在流失后才产生，必须剔除。",
    pitfall:
      "均值填补、词表和目标编码都要在训练折内拟合；目标编码通常还需折外计算。整数编码不应无意给无序类别引入距离或大小关系。",
    prerequisites: ["data-splits", "array-computing"],
    related: ["data-pipelines", "explainability"],
    sources: [
      source(
        "scikit-learn · Pipelines and Composite Estimators",
        "https://scikit-learn.org/stable/modules/compose.html",
      ),
      crossValidation,
    ],
  },
  {
    id: "time-series",
    domain: "machine-learning",
    title: { zh: "时间序列预测", en: "Time-series Forecasting" },
    level: "core",
    scope: "specialist",
    summary:
      "用过去预测未来，分离趋势、季节性、滞后依赖和外部变量。时间顺序改变了验证设计：训练窗口、预测跨度以及未来协变量是否已知，都必须与部署场景一致。",
    why: "支持需求、负荷和传感器预测，并识别随机打乱数据造成的虚高成绩。",
    mastery: [
      "实现滚动起点验证，在固定预测跨度上比较季节性朴素基线。",
      "构建只使用过去的滞后与滑动统计特征，并检查残差时间相关。",
    ],
    example:
      "用过去 28 天销量预测未来 7 天；每周向前滚动一次训练截止日，与“上周同一天销量”基线比较。",
    pitfall:
      "居中滑动平均会偷看未来；重叠窗口和标签可能要求划分间隔。时间序列不必平稳，但采用平稳模型时要检查相应假设与结构变化。",
    prerequisites: ["data-splits", "linear-regression"],
    related: ["sequence-models", "distribution-shift"],
    sources: [
      source(
        "Hyndman & Athanasopoulos · Forecasting: Principles and Practice",
        "https://otexts.com/fpp3/",
      ),
    ],
  },
  {
    id: "recommenders",
    domain: "machine-learning",
    title: {
      zh: "推荐与协同过滤",
      en: "Recommendation and Collaborative Filtering",
    },
    level: "core",
    scope: "specialist",
    summary:
      "从用户、物品及交互记录学习匹配关系，任务可以是评分预测或候选排序。协同过滤借助共享偏好结构，矩阵分解则用低维向量压缩稀疏的交互矩阵。",
    why: "把表示学习、检索、排序与反馈偏差联系起来，理解个性化系统的完整目标。",
    mastery: [
      "在仅包含训练交互的稀疏矩阵上拟合带正则的低秩评分模型。",
      "按用户和时间设计评估，报告候选集合、负采样策略及冷启动表现。",
    ],
    example:
      "令用户向量为 (1,2)、物品向量为 (2,1)，点积得分为 4；与另一物品 (1,0) 的得分 1 比较排序，再加入用户与物品偏置。",
    pitfall:
      "未交互不等于不喜欢，曝光机制会偏置训练数据。离线排序提升不自动意味着线上满意度或因果收益提高。",
    prerequisites: ["matrix-factorization", "data-splits"],
    related: ["embeddings", "retrieval-systems", "causal-estimation"],
    sources: [
      source(
        "Dive into Deep Learning · Matrix Factorization for Recommendation",
        "https://d2l.ai/chapter_recommender-systems/mf.html",
      ),
    ],
  },
  {
    id: "perceptron-mlp",
    domain: "deep-learning",
    title: {
      zh: "感知机与多层网络",
      en: "Perceptrons and Multilayer Networks",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "从线性分类器出发，在层与层之间加入非线性函数，让网络组合出更复杂的决策边界。掌握输入、隐层、输出及损失的配合，比记住层数更重要。",
    why: "提供理解神经网络参数、表达能力和端到端训练的最小完整模型。",
    mastery: [
      "标注两层网络中每个张量的形状，计算参数总数。",
      "训练一个小网络拟合 XOR，并与没有非线性的两层线性网络比较。",
    ],
    example:
      "XOR 的四个二元输入不能被单一直线正确分开；加入带非线性的隐藏层后，观察模型形成组合边界。",
    pitfall:
      "连续叠加仿射层仍等价于一层仿射变换；表达能力存在不等于训练算法一定能找到它，也不保证有限样本上的泛化。",
    prerequisites: ["logistic-regression", "chain-rule"],
    related: ["backpropagation", "representation-learning"],
    formula: String.raw`h=\phi(W_1x+b_1),\qquad\widehat y=W_2h+b_2`,
    sources: [mlp],
  },
  {
    id: "backpropagation",
    domain: "deep-learning",
    title: { zh: "反向传播", en: "Backpropagation" },
    level: "core",
    scope: "shared",
    summary:
      "把网络展开为计算图，从标量损失反向累计每个中间量的梯度。反向传播复用链式法则，避免为每个参数重复求导；它计算梯度，参数如何更新则由优化器决定。",
    why: "能定位梯度断开、广播错误和重复累计等训练故障，也能理解自动微分的计算代价。",
    mastery: [
      "手算两层标量网络的前向值及各参数梯度，并与自动微分核对。",
      "用中心差分检查小网络梯度，说明步长过大或过小的问题。",
    ],
    example:
      "设 h=wx、损失 L=(h−y)²/2；取 x=2、w=1、y=3，得到 h=2、L=0.5、对 w 的梯度为 −2。",
    pitfall:
      "梯度默认会沿多条路径相加；原地修改、离散采样和脱离计算图可能破坏预期梯度。ReLU 在零点不可微，框架采用约定的次梯度。",
    prerequisites: ["perceptron-mlp", "chain-rule"],
    related: ["automatic-differentiation", "numerical-gradient-check"],
    sources: [backprop],
  },
  {
    id: "initialization",
    domain: "deep-learning",
    title: {
      zh: "参数初始化与信号传播",
      en: "Initialization and Signal Propagation",
    },
    level: "core",
    scope: "shared",
    summary:
      "训练开始前的参数尺度会影响每层激活与梯度的大小。合理初始化打破单元对称，并根据输入输出宽度和激活函数控制信号传播，减少一开始就饱和或消失的风险。",
    why: "使深层模型能够稳定起步，区分结构问题、学习率问题和初始尺度问题。",
    mastery: [
      "在同一深层网络比较全零、过大随机值与方差缩放初始化。",
      "记录各层激活及梯度的均值、方差，解释它们随深度的变化。",
    ],
    example:
      "对 ReLU 层使用近似方差 2/fan_in 的独立零均值权重，与方差固定为 1 的方案比较 20 层后的信号规模。",
    pitfall:
      "隐藏单元采用完全相同的初始化可能无法打破对称；常用方差规则依赖近似独立等分析假设，并不能独自保证任意架构训练稳定。",
    prerequisites: ["backpropagation", "expectation-variance"],
    related: ["optimization-diagnostics", "numerical-stability"],
    sources: [
      source(
        "Dive into Deep Learning · Numerical Stability and Initialization",
        "https://d2l.ai/chapter_multilayer-perceptrons/numerical-stability-and-init.html",
      ),
    ],
  },
  {
    id: "normalization",
    domain: "deep-learning",
    title: { zh: "批归一化与层归一化", en: "Batch and Layer Normalization" },
    level: "core",
    scope: "shared",
    summary:
      "在选定维度上对激活作中心化和缩放，再学习仿射参数。批归一化与层归一化使用不同统计轴，因此对批大小、序列长度和训练推理模式有不同依赖。",
    why: "帮助选择与数据组织方式相符的网络组件，并排查训练正常而推理失效的问题。",
    mastery: [
      "对一个小张量明确写出 BatchNorm 与 LayerNorm 的统计维度。",
      "分别切换训练和评估模式，比较批统计、运行统计与输出变化。",
    ],
    example:
      "对一条特征向量 (1,3) 作不含仿射参数的 LayerNorm，其均值为 2，方差为 1；忽略稳定项时输出为 (−1,1)。",
    pitfall:
      "BatchNorm 通常在训练时使用批统计、推理时使用运行统计；LayerNorm 通常对单样本指定特征轴计算。二者不能只凭名称互换。",
    prerequisites: ["backpropagation", "expectation-variance"],
    related: ["transformer", "distributed-training"],
    sources: [
      source(
        "Ioffe & Szegedy · Batch Normalization",
        "https://arxiv.org/abs/1502.03167",
      ),
      source(
        "Ba, Kiros & Hinton · Layer Normalization",
        "https://arxiv.org/abs/1607.06450",
      ),
    ],
  },
  {
    id: "dl-regularization",
    domain: "deep-learning",
    title: { zh: "深度网络正则化", en: "Regularization in Deep Learning" },
    level: "core",
    scope: "shared",
    summary:
      "通过权重约束、Dropout、数据增强和早停等方式限制训练对样本细节的依赖。不同方法表达不同先验，应结合训练预算、数据规模和验证表现逐项比较。",
    why: "改善有限数据下的泛化，并理解训练与推理阶段某些层为何行为不同。",
    mastery: [
      "单独改变一种正则策略，记录训练误差、验证误差和最佳停止点。",
      "实现反向缩放 Dropout，检查训练时输出的期望与评估时规则。",
    ],
    example:
      "Dropout 丢弃概率为 0.2 时，保留的激活除以 0.8；对固定输入重复采样，检验平均输出接近未丢弃的激活。",
    pitfall:
      "数据增强必须保留任务相关标签；翻转数字或医学影像未必合法。早停依据验证集，评估时应关闭 Dropout，除非明确进行随机预测估计。",
    prerequisites: ["regularization", "backpropagation"],
    related: ["self-supervision", "baselines"],
    sources: [
      source(
        "Srivastava et al. · Dropout",
        "https://jmlr.org/papers/v15/srivastava14a.html",
      ),
    ],
  },
  {
    id: "convolution",
    domain: "deep-learning",
    title: { zh: "卷积与局部连接", en: "Convolution and Local Connectivity" },
    level: "core",
    scope: "shared",
    summary:
      "卷积层在不同位置共享局部滤波器，把空间邻近和重复模式写入模型结构。通道、步幅、填充与感受野共同决定网络怎样从局部边缘逐层组合出更大尺度特征。",
    why: "理解图像、音频和网格数据中的高效参数共享，以及空间结构怎样约束模型。",
    mastery: [
      "手算一个小矩阵与滤波器的输出，核对通道与空间尺寸。",
      "计算多层卷积的感受野，并实验平移输入对不同步幅输出的影响。",
    ],
    example:
      "对一维序列 (1,2,4) 使用框架常见的互相关核 (1,−1)，不填充、步幅为 1，输出为 (−1,−2)。",
    pitfall:
      "深度学习框架所谓卷积通常实现互相关。参数共享不等于无条件平移不变；边界填充、下采样和步幅都会影响平移等变性。",
    prerequisites: ["perceptron-mlp", "array-computing"],
    related: ["image-classification", "equivariance"],
    sources: [
      source(
        "Dive into Deep Learning · Convolutions for Images",
        "https://d2l.ai/chapter_convolutional-neural-networks/conv-layer.html",
      ),
    ],
  },
  {
    id: "sequence-models",
    domain: "deep-learning",
    title: {
      zh: "循环网络与序列建模",
      en: "Recurrent Networks and Sequence Modeling",
    },
    level: "core",
    scope: "shared",
    summary:
      "循环网络把过去压缩成随时间更新的隐藏状态，用共享参数处理不同长度序列。时间展开后的反向传播解释了长期依赖的困难，门控结构则提供控制信息保留的机制。",
    why: "建立时间依赖、状态与因果预测的直觉，也为比较循环模型和注意力模型提供基线。",
    mastery: [
      "展开一个三步 RNN，标出共享参数及梯度汇合的位置。",
      "在延迟复制任务上比较简单 RNN 与 LSTM，并记录梯度范数。",
    ],
    example:
      "用字符序列前缀预测下一个字符；对每段独立文本重置状态，再比较截断反向传播长度为 16 和 64 的结果。",
    pitfall:
      "双向网络会利用未来位置，不能直接用于严格在线预测；跨无关样本延续隐藏状态可能泄漏信息。门控不能保证任意长度的精确记忆。",
    prerequisites: ["backpropagation", "graphs-dynamic-programming"],
    related: ["attention", "time-series"],
    sources: [
      source(
        "Dive into Deep Learning · Recurrent Neural Networks",
        "https://d2l.ai/chapter_recurrent-neural-networks/rnn.html",
      ),
    ],
  },
  {
    id: "attention",
    domain: "deep-learning",
    title: { zh: "注意力机制", en: "Attention Mechanisms" },
    level: "core",
    scope: "shared",
    summary:
      "根据查询与键的匹配程度，对值向量作数据依赖的加权组合。注意力把信息选择与固定位置解耦；缩放、归一化轴及掩码共同决定每个位置能读取哪些信息。",
    why: "理解序列对齐、跨模态交互和 Transformer 的核心运算，并能检查实际张量实现。",
    mastery: [
      "标注 Q、K、V 与输出的形状，手算两个键的注意力权重。",
      "实现因果掩码，检验修改未来 token 不会改变当前位置输出。",
    ],
    example:
      "两个键的缩放得分为 0 和 ln 3，softmax 权重为 1/4 与 3/4；若值为 2 与 6，加权输出为 5。",
    pitfall:
      "softmax 通常沿可读取的键位置计算，掩码应在归一化前应用并处理整行被遮挡的情况。注意力权重本身不是因果解释。",
    prerequisites: ["linear-maps", "embeddings"],
    related: ["transformer", "multimodal-fusion"],
    formula: String.raw`\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V`,
    sources: [transformerPaper],
  },
  {
    id: "transformer",
    domain: "deep-learning",
    title: { zh: "Transformer 架构", en: "Transformer Architecture" },
    level: "core",
    scope: "shared",
    summary:
      "把多头注意力、逐位置前馈网络、残差连接和归一化组合成可堆叠模块。位置信息与可见性掩码决定序列结构，编码器、解码器及其变体服务于不同训练目标。",
    why: "读懂语言、视觉与多模态模型的共有骨架，并识别架构变化实际改变了什么。",
    mastery: [
      "画出一个 Transformer block，说明每个子层的输入输出及残差路径。",
      "比较双向编码与因果解码的掩码，计算标准注意力随序列长度的开销。",
    ],
    example:
      "对长度 128、8 个头的序列，每个头产生 128×128 的注意力分数；长度翻倍时，标准全注意力分数元素数增为四倍。",
    pitfall:
      "没有位置机制时，标准全自注意力模块不能独自区分任意排列的顺序结构。全注意力的二次开销不能直接推广到所有稀疏或线性变体。",
    prerequisites: ["attention", "normalization", "dl-regularization"],
    related: ["language-modeling", "visual-transformers", "long-context"],
    sources: [transformerPaper],
  },
  {
    id: "embeddings",
    domain: "deep-learning",
    title: {
      zh: "嵌入与向量表示",
      en: "Embeddings and Vector Representations",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "把离散对象映射到可学习的连续向量，让任务损失塑造它们的相对位置。嵌入可以表示词、用户、物品或节点，但几何关系的意义取决于训练目标与数据。",
    why: "连接离散符号与可微模型，也为相似度检索、推荐和跨模态匹配提供通用接口。",
    mastery: [
      "把嵌入查表写成 one-hot 向量与参数矩阵的乘法，说明节省在哪里。",
      "比较点积与余弦检索结果，检查向量范数及频次造成的影响。",
    ],
    example:
      "词表含 1000 个符号、维数为 32 时，查表有 32000 个参数；输入编号 7 直接取第 7 行而无需显式构造 1000 维向量。",
    pitfall:
      "向量相近不保证事实或语义等价，训练数据偏差也会进入空间。很多目标允许整体旋转等不唯一性，不应随意给单个坐标命名。",
    prerequisites: ["linear-maps", "learning-problem"],
    related: ["word-vectors", "recommenders", "knowledge-graphs"],
    sources: [representationPaper],
  },
  {
    id: "representation-learning",
    domain: "deep-learning",
    title: { zh: "表示学习与迁移", en: "Representation Learning and Transfer" },
    level: "core",
    scope: "shared",
    summary:
      "让模型从数据中学习适合后续任务的特征，而不只调整最终预测器。好表示应保留任务需要的信息，并适度忽略无关变化；这一标准必须通过迁移和诊断实验检验。",
    why: "解释预训练特征为何可以复用，以及何时需要冻结、微调或重新学习。",
    mastery: [
      "冻结编码器训练线性探针，再与全量微调和随机初始化基线比较。",
      "设计一种任务相关变化和一种无关扰动，测量表示与预测的响应。",
    ],
    example:
      "用图像分类编码器提取特征，在少量新类别样本上训练线性分类器；与相同预算下从头训练的模型比较。",
    pitfall:
      "预训练任务表现好不保证下游迁移好；线性探针只测特定可读取方式。训练数据重叠与选择偏差会夸大所谓通用性。",
    prerequisites: ["perceptron-mlp", "regularization"],
    related: ["self-supervision", "pretraining", "distribution-shift"],
    sources: [representationPaper],
  },
  {
    id: "self-supervision",
    domain: "deep-learning",
    title: { zh: "自监督学习", en: "Self-supervised Learning" },
    level: "core",
    scope: "shared",
    summary:
      "从数据自身构造训练目标，例如遮住一部分再预测，或让同一对象的不同视图接近。它减少人工标签需求，但目标设计仍在决定模型保留哪些信息、忽略哪些变化。",
    why: "理解大规模预训练的信号来源，并能为自己的数据设计可检验的学习任务。",
    mastery: [
      "实现一个遮蔽预测或对比学习实验，明确正样本、负样本与增强规则。",
      "固定下游标注预算，比较随机初始化和自监督预训练的迁移表现。",
    ],
    example:
      "对同一张图像生成两种保留主体的裁剪作为正对，在训练后冻结编码器，用少量标签评估其分类能力。",
    pitfall:
      "没有人工标签不等于没有假设；增强可能删去关键内容，负样本可能语义相同。某些目标存在表示坍塌，必须说明防坍塌机制。",
    prerequisites: ["representation-learning", "data-splits"],
    related: ["self-supervised-vision", "pretraining"],
    sources: [
      source(
        "Chen et al. · A Simple Framework for Contrastive Learning of Visual Representations",
        "https://arxiv.org/abs/2002.05709",
      ),
    ],
  },
  {
    id: "autoencoders",
    domain: "deep-learning",
    title: { zh: "自编码器", en: "Autoencoders" },
    level: "core",
    scope: "shared",
    summary:
      "用编码器压缩输入，再由解码器重构它。瓶颈、稀疏性或去噪任务迫使模型学习结构；分析重构目标也能看清压缩、表示学习和概率生成之间的区别。",
    why: "提供从线性降维走向非线性潜在表示的可运行实验，也是理解 VAE 的前置概念。",
    mastery: [
      "训练带低维瓶颈的自编码器，绘制维数与重构误差的关系。",
      "比较干净重构和去噪重构，检查潜在表示对下游任务是否有用。",
    ],
    example:
      "将 28×28 灰度图编码为 16 维向量，再重构 784 个像素；同时比较 PCA 在相同维数下的误差。",
    pitfall:
      "容量过大的网络可能仅学习复制；低重构误差不保证有用语义。普通自编码器没有自动定义可采样的潜在先验或规范化数据密度。",
    prerequisites: ["perceptron-mlp", "regularization"],
    related: ["pca", "latent-variable-models", "generative-models"],
    sources: [
      source(
        "Goodfellow, Bengio & Courville · Deep Learning, Autoencoders",
        "https://www.deeplearningbook.org/contents/autoencoders.html",
      ),
    ],
  },
  {
    id: "generative-models",
    domain: "deep-learning",
    title: {
      zh: "生成模型与分布学习",
      en: "Generative Models and Distribution Learning",
    },
    level: "core",
    scope: "shared",
    summary:
      "学习数据分布或生成过程，以产生新样本、补全缺失内容或估计概率。自回归、潜变量和对抗模型采用不同目标，必须分别检验似然、样本质量、多样性与条件控制。",
    why: "建立跨生成模型的比较框架，避免只凭几张好看的样本判断学习成功。",
    mastery: [
      "比较自回归模型、VAE 与 GAN 的训练目标和可计算的概率量。",
      "在二维多峰数据上同时检查生成质量、模式覆盖和记忆训练样本的风险。",
    ],
    example:
      "用三个高斯簇生成训练点；若模型只生成其中一簇，即使每个点看似真实，仍遗漏了大部分分布结构。",
    pitfall:
      "GAN 通常不能直接给出可求值的规范化似然；VAE 优化的是证据下界。高似然、视觉质量与分布覆盖不是可直接互换的指标。",
    prerequisites: ["latent-variable-models", "perceptron-mlp", "entropy-kl"],
    related: ["diffusion", "image-generation", "language-modeling"],
    sources: [
      vae,
      source(
        "Goodfellow et al. · Generative Adversarial Networks",
        "https://arxiv.org/abs/1406.2661",
      ),
    ],
  },
  {
    id: "diffusion",
    domain: "deep-learning",
    title: { zh: "扩散与去噪生成", en: "Diffusion and Denoising Generation" },
    level: "research",
    scope: "specialist",
    summary:
      "先定义逐步加噪的前向过程，再训练模型在不同噪声水平下恢复生成方向。采样从噪声出发反复更新，噪声日程、时间条件和采样器共同控制质量与成本。",
    why: "理解图像等连续数据生成的核心方法，并能分析训练目标与推理加速的取舍。",
    mastery: [
      "根据给定噪声日程直接采样任意时刻的带噪数据，训练噪声预测器。",
      "固定模型比较不同采样步数的速度、误差与多样性，保留随机种子。",
    ],
    example:
      "当累计信号系数 ᾱ 为 0.25 时，样本可写成 0.5 倍原数据加 √0.75 倍标准高斯噪声；用时间条件网络预测加入的噪声。",
    pitfall:
      "训练网络估计去噪方向，并非逐样本精确反演随机加噪。有限步 DDPM 的高斯反向模型是建模近似，改变采样器也会改变误差与成本。",
    prerequisites: [
      "generative-models",
      "conditional-probability",
      "backpropagation",
    ],
    related: ["image-generation", "numerical-stability"],
    formula: String.raw`q(x_t\mid x_0)=\mathcal N\!\left(\sqrt{\bar\alpha_t}\,x_0,(1-\bar\alpha_t)I\right)`,
    sources: [
      source(
        "Ho, Jain & Abbeel · Denoising Diffusion Probabilistic Models",
        "https://arxiv.org/abs/2006.11239",
      ),
    ],
  },
  {
    id: "graph-neural-networks",
    domain: "deep-learning",
    title: { zh: "图神经网络", en: "Graph Neural Networks" },
    level: "core",
    scope: "specialist",
    summary:
      "沿图的边传递消息，再用对邻居顺序不敏感的聚合更新节点表示。网络把关系结构纳入学习，可用于节点、边或整图预测，但表达能力受聚合规则与传播深度限制。",
    why: "处理分子、交通和关系网络等非规则结构，并连接图算法与深度表示。",
    mastery: [
      "实现一层邻居均值聚合，重排节点编号后验证输出相应重排。",
      "比较不同传播层数的节点表示与测试表现，检查过平滑和数据划分。",
    ],
    example:
      "链图 A—B—C 中，一层消息传递让 B 汇总 A 和 C；A 要经过两层才可能接收 C 的信息。",
    pitfall:
      "更多层不必然更强，可能发生过平滑或信息拥挤。转导任务可利用哪些未标注节点或边须预先约定，不能把未来关系泄漏到训练图中。",
    prerequisites: ["graphs-dynamic-programming", "perceptron-mlp"],
    related: ["knowledge-graphs", "geometry-3d"],
    sources: [
      source(
        "Kipf & Welling · Semi-Supervised Classification with Graph Convolutional Networks",
        "https://arxiv.org/abs/1609.02907",
      ),
    ],
  },
  {
    id: "bayesian-inference",
    domain: "probabilistic-causal",
    title: {
      zh: "贝叶斯推断与后验预测",
      en: "Bayesian Inference and Posterior Prediction",
    },
    level: "core",
    scope: "shared",
    summary:
      "用先验与似然更新参数或假设的不确定性，再把后验传播到未来预测。贝叶斯推断要求明确生成模型，关注的既可以是参数分布，也可以是实际决策所需的预测量。",
    why: "在数据有限或需表达不确定性时，系统地合并领域知识与观测证据。",
    mastery: [
      "推导 Beta–Bernoulli 共轭更新，区分后验均值与最大后验估计。",
      "计算后验预测分布，并改变先验检查结论敏感性。",
    ],
    example:
      "硬币正面概率采用 Beta(1,1) 先验；观察 7 次正面、3 次反面后，后验为 Beta(8,4)，下一次正面的预测概率为 2/3。",
    pitfall:
      "后验依赖模型和先验，不能自动消除选择偏差或模型错设。后验预测通常要对参数积分，而不只是把某个点估计代入模型。",
    prerequisites: ["bayes-rule", "estimation"],
    related: ["uncertainty", "mcmc", "variational-inference"],
    formula: String.raw`p(y_*\mid D)=\int p(y_*\mid\theta)\,p(\theta\mid D)\,d\theta`,
    sources: [
      cs229,
      source(
        "Rasmussen & Williams · Gaussian Processes for Machine Learning",
        "https://gaussianprocess.org/gpml/chapters/RW.pdf",
      ),
    ],
  },
  {
    id: "graphical-models",
    domain: "probabilistic-causal",
    title: { zh: "概率图模型", en: "Probabilistic Graphical Models" },
    level: "core",
    scope: "shared",
    summary:
      "用图表达变量之间的局部依赖，把高维联合分布拆成可解释的因子。贝叶斯网络使用有向无环图，马尔可夫网络使用无向结构，因子图则直接展示因子的作用范围。",
    why: "将建模假设显式化，并利用结构减少参数量与推断计算。",
    mastery: [
      "从一个有向无环图写出联合分布分解，并计算离散参数表大小。",
      "把相同分解画成因子图，标明观测、隐藏与待查询变量。",
    ],
    example:
      "对链 A→B→C，联合分布写成 p(A)p(B|A)p(C|B)；用三个二元变量的小概率表计算一个完整赋值的概率。",
    pitfall:
      "普通贝叶斯网络中的箭头首先表示概率分解，不能未经额外假设就当作因果方向。无向模型还须考虑归一化常数是否可求。",
    prerequisites: ["conditional-probability", "graphs-dynamic-programming"],
    related: ["causal-graphs", "latent-variable-models"],
    formula: String.raw`p(x_1,\ldots,x_n)=\prod_{i=1}^n p(x_i\mid x_{\operatorname{pa}(i)})`,
    sources: [bayesNetworks],
  },
  {
    id: "conditional-independence",
    domain: "probabilistic-causal",
    title: {
      zh: "条件独立与 d-分离",
      en: "Conditional Independence and d-separation",
    },
    level: "core",
    scope: "shared",
    summary:
      "学习给定部分信息后，另两个变量是否仍有关联。链、共同原因与碰撞点在条件化时表现不同；d-分离提供从有向图读取模型所蕴含条件独立关系的规则。",
    why: "减少推断计算，也防止在因果分析中错误控制变量而引入偏差。",
    mastery: [
      "在链、分叉和碰撞点三种结构中，判断给定中间变量后的路径状态。",
      "构造一个离散碰撞点例子，直接计算条件化前后的相关性。",
    ],
    example:
      "若考试成绩同时由能力与练习决定，只研究高分者时，能力较低者可能需要更多练习；筛选共同结果会产生原本没有的关联。",
    pitfall:
      "给定碰撞点或其后代可能打开路径。图上的 d-分离在马尔可夫假设下蕴含独立；从所有统计独立反推图结构还涉及忠实性等额外假设。",
    prerequisites: ["graphical-models", "independence"],
    related: ["confounding-identification", "exact-inference"],
    sources: [bayesNetworks, causalPrimer],
  },
  {
    id: "exact-inference",
    domain: "probabilistic-causal",
    title: {
      zh: "精确推断与变量消元",
      en: "Exact Inference and Variable Elimination",
    },
    level: "core",
    scope: "specialist",
    summary:
      "通过因子相乘和边缘化，消去不关心的变量并求出查询概率。变量消元、树上的消息传递与动态规划共享复用中间计算的思想，图结构决定实际计算难度。",
    why: "为小型结构化模型提供可信答案，也给近似推断方法建立可核对的基准。",
    mastery: [
      "在三变量离散网络中手算变量消元，并与完整枚举结果核对。",
      "比较两种消元顺序产生的最大中间因子及存储成本。",
    ],
    example:
      "计算链 A→B→C 中 C 的边缘概率：先把 A 求和得到 B 的分布，再对 B 求和；与枚举全部 A、B 赋值比较运算量。",
    pitfall:
      "推断困难不只取决于节点数，还取决于树宽和变量取值数。消元顺序影响成本；有环图上直接迭代信念传播一般不再保证精确。",
    prerequisites: ["conditional-independence", "graphs-dynamic-programming"],
    related: ["variational-inference", "mcmc"],
    sources: [
      source(
        "Stanford CS228 · Variable Elimination",
        "https://ermongroup.github.io/cs228-notes/inference/ve/",
      ),
    ],
  },
  {
    id: "variational-inference",
    domain: "probabilistic-causal",
    title: { zh: "变分推断与 ELBO", en: "Variational Inference and the ELBO" },
    level: "core",
    scope: "shared",
    summary:
      "选一个可计算的分布族近似难求的后验，把推断变成优化问题。证据下界将联合模型与近似分布连接起来，近似族、梯度估计和优化误差共同决定最终质量。",
    why: "让大型潜变量模型可以训练，并理解 VAE 等模型究竟优化了什么。",
    mastery: [
      "推导证据下界与后验 KL 的恒等式，标明期望关于哪个分布。",
      "在二维相关高斯后验上比较均值场近似与真后验的相关性和方差。",
    ],
    example:
      "真后验为明显倾斜的二维高斯时，用两个独立高斯的乘积近似；绘制等高线，检查独立性限制丢掉了哪些相关结构。",
    pitfall:
      "恒等式需相容的支持集及有限的相关期望。受限分布族中的最优解不等于真后验；最大化 ELBO 也不是直接精确最大化证据。",
    prerequisites: [
      "latent-variable-models",
      "entropy-kl",
      "stochastic-gradients",
    ],
    related: ["generative-models", "mcmc"],
    formula: String.raw`\log p(x)=\underbrace{\mathbb E_{q(z)}[\log p(x,z)-\log q(z)]}_{\mathcal L(q)}+D_{\mathrm{KL}}\!\left(q(z)\,\|\,p(z\mid x)\right)`,
    sources: [
      source(
        "Blei, Kucukelbir & McAuliffe · Variational Inference: A Review for Statisticians",
        "https://arxiv.org/abs/1601.00670",
      ),
      source(
        "Stanford CS228 · Variational Inference",
        "https://ermongroup.github.io/cs228-notes/inference/variational/",
      ),
    ],
  },
  {
    id: "mcmc",
    domain: "probabilistic-causal",
    title: { zh: "马尔可夫链蒙特卡洛", en: "Markov Chain Monte Carlo" },
    level: "core",
    scope: "specialist",
    summary:
      "构造以目标分布为平稳分布的马尔可夫链，用相关样本近似后验期望。方法允许只知道未归一化密度，但设计有效转移与判断混合质量往往比写出接受率更困难。",
    why: "为难积分的贝叶斯模型提供通用推断工具，也能检验变分近似的偏差。",
    mastery: [
      "实现一维 Metropolis–Hastings，验证非对称提议时不能省略提议比。",
      "运行多条链，检查轨迹、自相关、有效样本量与链间诊断。",
    ],
    example:
      "目标是两个相距较远的高斯峰；调整随机游走步长，观察链可能长时间困在单峰，以及均值估计随链长度如何变化。",
    pitfall:
      "平稳分布正确不等于有限运行已经收敛；遍历性需要合适的不可约性、非周期性等条件。样本通常相关，诊断指标不能证明收敛。",
    prerequisites: ["bayesian-inference", "monte-carlo"],
    related: ["variational-inference", "uncertainty"],
    formula: String.raw`\alpha(z,z')=\min\!\left(1,\frac{\widetilde p(z')q(z\mid z')}{\widetilde p(z)q(z'\mid z)}\right)`,
    sources: [
      source(
        "Stanford CS228 · Sampling Methods",
        "https://ermongroup.github.io/cs228-notes/inference/sampling/",
      ),
      source(
        "Neal · Probabilistic Inference Using Markov Chain Monte Carlo Methods",
        "https://www.cs.toronto.edu/~radford/ftp/review.pdf",
      ),
    ],
  },
  {
    id: "em-algorithm",
    domain: "probabilistic-causal",
    title: { zh: "EM 算法", en: "Expectation–Maximization" },
    level: "core",
    scope: "shared",
    summary:
      "在含隐藏变量的模型中，交替估计隐藏状态的后验与更新模型参数。E 步建立软分配，M 步利用这些分配优化期望完整数据对数似然，把难题拆成较易处理的子问题。",
    why: "理解混合模型、缺失数据建模和潜在分组的参数学习机制。",
    mastery: [
      "为高斯混合模型推导责任度与均值更新，手算一轮迭代。",
      "绘制观测数据对数似然，比较多次初始化并检查退化解。",
    ],
    example:
      "一个样本对两个高斯分量的责任度为 0.8 和 0.2，在更新均值时按这两个权重贡献，而不是先硬分到其中一组。",
    pitfall:
      "精确 E 步与正确 M 步保证似然不下降，但不保证全局最优。高斯混合可能通过协方差塌缩使似然无界，需约束、正则或先验。",
    prerequisites: ["latent-variable-models", "objective-functions"],
    related: ["clustering", "variational-inference"],
    sources: [cs229],
  },
  {
    id: "latent-variable-models",
    domain: "probabilistic-causal",
    title: { zh: "潜变量模型", en: "Latent-variable Models" },
    level: "core",
    scope: "shared",
    summary:
      "用未直接观测的变量表达群体、状态或生成因素，再对它们求和或积分得到观测分布。潜变量能简化结构，但也把后验推断、参数可识别性与模型检查带入学习过程。",
    why: "连接聚类、主题、隐状态序列与深度生成模型，统一“隐藏原因”的建模语言。",
    mastery: [
      "为高斯混合画出生成过程，区分隐藏分量与可学习参数。",
      "计算边缘似然与一个样本的分量后验，解释二者为何不同。",
    ],
    example:
      "先按权重 0.3 与 0.7 抽取两个群体之一，再从对应高斯分布生成身高；观测身高后反推群体概率。",
    pitfall:
      "模型中的潜在坐标不自动对应真实因果因素；交换混合分量标签不会改变观测分布。复杂潜变量也可能带来不可识别或后验多峰。",
    prerequisites: ["bayesian-inference", "multivariate-gaussian"],
    related: ["autoencoders", "graphical-models", "em-algorithm"],
    formula: String.raw`p_\theta(x)=\int p_\theta(x,z)\,dz`,
    sources: [cs229, vae],
  },
  {
    id: "gaussian-processes",
    domain: "probabilistic-causal",
    title: { zh: "高斯过程", en: "Gaussian Processes" },
    level: "core",
    scope: "specialist",
    summary:
      "直接给函数赋予概率分布，使任意有限输入集合上的函数值服从联合高斯。核函数编码平滑性和相似性，观测数据通过条件高斯公式更新函数均值与不确定性。",
    why: "在小数据回归、实验设计和贝叶斯优化中，同时提供预测与模型内的不确定性。",
    mastery: [
      "用给定核和观测噪声构造协方差矩阵，计算一组测试点的后验。",
      "改变长度尺度与噪声方差，观察插值、外推及置信带的变化。",
    ],
    example:
      "在 x=0、1、2 处观察三个带噪函数值，用 RBF 核预测中间位置；再远离观测区间，检查后验如何回到先验设定。",
    pitfall:
      "核须为半正定，数值求解通常用 Cholesky 并关注条件数。标准稠密精确回归训练约需立方时间；后验方差只反映给定模型下的不确定性。",
    prerequisites: [
      "bayesian-inference",
      "multivariate-gaussian",
      "kernels-svm",
    ],
    related: ["uncertainty", "research-questions"],
    sources: [
      source(
        "Rasmussen & Williams · Gaussian Processes for Machine Learning",
        "https://gaussianprocess.org/gpml/chapters/RW.pdf",
      ),
    ],
  },
  {
    id: "causal-graphs",
    domain: "probabilistic-causal",
    title: {
      zh: "因果图与结构模型",
      en: "Causal Graphs and Structural Models",
    },
    level: "core",
    scope: "shared",
    summary:
      "把变量如何产生的假设写成因果图与结构方程，区分共同原因、作用路径和共同结果。图帮助组织领域知识，也说明仅凭观测关联通常不能确定唯一因果解释。",
    why: "在问“改变某因素会怎样”之前，先暴露决定答案的结构假设。",
    mastery: [
      "为一个具体问题画出处理、结果、共同原因与时间顺序。",
      "给同一观测关联提出两种可能因果结构，并列出区分它们所需证据。",
    ],
    example:
      "气温同时影响冰淇淋销量与游泳人数；两者相关并不能说明增加冰淇淋销售会使人游泳，应先画出共同原因。",
    pitfall:
      "箭头需要机制、设计或领域依据；观测数据常只支持一个等价类。无环图限制反馈的表示，存在反馈时需明确时间展开或其他结构模型。",
    prerequisites: ["conditional-independence"],
    related: ["interventions", "explainability"],
    sources: [causalPrimer, causalBook],
  },
  {
    id: "interventions",
    domain: "probabilistic-causal",
    title: { zh: "干预与 do 运算", en: "Interventions and the do-operator" },
    level: "core",
    scope: "shared",
    summary:
      "干预改变变量的生成机制，而观察只是得知它的值。do 运算把设定某变量值写入模型，帮助区分实验效果与观测条件概率，并明确要比较的处理方案。",
    why: "把预测问题转成可讨论的行动问题，为实验设计和因果效应定义建立基础。",
    mastery: [
      "在简单结构模型中分别计算观察条件与外部干预后的分布。",
      "写清处理的实施方式、比较方案、结果测量时点和目标人群。",
    ],
    example:
      "严重病人更常接受治疗；观察到治疗者风险更高，不等于主动给同类病人治疗会提高风险。两种问题对应不同的分布。",
    pitfall:
      "do(A=a) 不是把数据表筛选为 A=a；它替换 A 的生成机制。处理必须足够明确，不同剂量、版本或依从性可能对应不同干预。",
    prerequisites: ["causal-graphs"],
    related: ["confounding-identification", "counterfactuals"],
    formula: String.raw`p(y\mid\operatorname{do}(A=a))\ \text{need not equal}\ p(y\mid A=a)`,
    sources: [causalPrimer, causalBook],
  },
  {
    id: "confounding-identification",
    domain: "probabilistic-causal",
    title: {
      zh: "混杂控制与因果识别",
      en: "Confounding Control and Identification",
    },
    level: "core",
    scope: "shared",
    summary:
      "先问目标因果量能否由现有数据与假设唯一确定，再选择计算方法。混杂调整需要合适的处理前变量；后门准则、可交换性和正值性共同约束可相信的结论。",
    why: "避免把复杂回归或大样本误当成消除混杂的保证，区分识别障碍与估计误差。",
    mastery: [
      "在给定因果图中寻找有效调整集合，并指出不能控制的碰撞点。",
      "为标准化公式逐项陈述一致性、条件可交换性与正值性假设。",
    ],
    example:
      "比较两种治疗的风险时，先在各个治疗前严重程度层内估计结果，再按目标人群严重程度分布加权，而不是直接比较两组总风险。",
    pitfall:
      "测得很多协变量不等于没有未测混杂；调整处理后变量或碰撞点可能引入偏差。后门调整是充分识别方案之一，并非所有可识别效应的唯一形式。",
    prerequisites: ["interventions", "conditional-probability"],
    related: ["causal-estimation", "fairness"],
    formula: String.raw`\mathbb E[Y(a)]=\sum_l\mathbb E[Y\mid A=a,L=l]p(L=l)`,
    sources: [causalBook, causalPrimer],
  },
  {
    id: "counterfactuals",
    domain: "probabilistic-causal",
    title: {
      zh: "反事实与潜在结果",
      en: "Counterfactuals and Potential Outcomes",
    },
    level: "research",
    scope: "specialist",
    summary:
      "反事实讨论同一对象在另一种处理或世界设定下的结果。潜在结果用不同处理下的结果变量表达比较，结构模型则通过溯因、干预和预测明确如何保持背景因素一致。",
    why: "精确定义个体与总体效应，并理解反事实解释、归因和政策问题的证据边界。",
    mastery: [
      "区分观测结果、总体平均处理效应和同一个体的不可同时观测结果。",
      "在给定结构方程中完成一次溯因、改动处理和重新预测。",
    ],
    example:
      "假设结构方程 Y=2A+U。观察某人 A=1、Y=5，可推出 U=3；保持该 U 不变而设 A=0，此模型给出反事实 Y=3。",
    pitfall:
      "算例结论依赖给定结构方程；观测甚至部分干预分布通常不足以识别任意个体反事实。对个体作精确反事实断言需要额外假设。",
    prerequisites: ["causal-graphs", "interventions"],
    related: ["causal-estimation", "explainability"],
    sources: [causalPrimer, causalBook],
  },
  {
    id: "causal-estimation",
    domain: "probabilistic-causal",
    title: { zh: "因果效应估计", en: "Causal Effect Estimation" },
    level: "research",
    scope: "specialist",
    summary:
      "在因果量已被识别后，用标准化、倾向评分加权或双重稳健方法从有限样本估计它。统计学习可以拟合辅助函数，但仍需检查重叠性、估计不确定性与敏感性。",
    why: "把因果图上的假设转成可执行分析，并区分模型拟合好与因果估计可信。",
    mastery: [
      "在模拟数据上比较结果回归、逆概率加权和双重稳健估计的偏差。",
      "画出倾向评分分布与权重，使用适当样本分割并报告不确定区间。",
    ],
    example:
      "设目标人群两层各占一半；第一层处理与对照风险为 0.1、0.2，第二层为 0.3、0.4，标准化后的平均风险差为 −0.1。",
    pitfall:
      "估计方法不能修复不可识别问题。双重稳健需要相应正则条件且两个辅助模型至少一个正确；极端权重提示重叠不足，随意截断会引入新的偏差。",
    prerequisites: [
      "confounding-identification",
      "estimation",
      "linear-regression",
    ],
    related: ["statistical-comparison", "research-questions"],
    sources: [causalBook],
  },
  {
    id: "state-space-search",
    domain: "reasoning",
    title: { zh: "状态空间与搜索", en: "State Spaces and Search" },
    level: "foundation",
    scope: "shared",
    summary:
      "用状态、动作、转移、目标和代价表示求解任务，再系统探索可达路径。搜索树与状态图不同，重复检测、边界队列和展开策略决定算法的效率与正确性。",
    why: "把路径寻找、谜题与组合决策统一为可执行问题，建立经典 AI 的求解框架。",
    mastery: [
      "为一个迷宫明确状态、合法动作、目标测试与路径代价。",
      "实现 BFS 与一致代价搜索，比较重复状态处理和展开数量。",
    ],
    example:
      "无权迷宫中 BFS 找到步数最少的路径；如果某格移动成本为 10，其余为 1，则改用按累计代价排序的一致代价搜索。",
    pitfall:
      "最浅路径不一定最便宜，BFS 的最小代价结论依赖等步长代价。状态表示必须保留决定后续合法动作与成本的信息。",
    prerequisites: ["data-structures", "algorithm-complexity"],
    related: ["automated-planning", "mdp"],
    sources: [searchNotes],
  },
  {
    id: "heuristic-search",
    domain: "reasoning",
    title: { zh: "启发式搜索与 A*", en: "Heuristic Search and A*" },
    level: "core",
    scope: "shared",
    summary:
      "用对剩余代价的估计引导搜索，把已花代价与未来估计结合起来。A* 的价值不仅是更快找到答案，还在于可以用可采纳性、一致性及重复状态规则说明最优性。",
    why: "在路径规划和组合问题中，把领域知识转化为可分析的搜索加速。",
    mastery: [
      "在带权图上手算 A* 的队列顺序，记录累计代价与启发值。",
      "证明四邻接单位成本网格的曼哈顿距离可采纳，检查一致性。",
    ],
    example:
      "网格从 (0,0) 到 (3,2)，四方向每步成本为 1，曼哈顿启发值为 5；加入障碍只能让最短路保持或增加。",
    pitfall:
      "树搜索的最优性需要可采纳启发及适当终止条件；图搜索若不重新打开已关闭状态，通常还需一致性。允许对角移动后原启发可能高估。",
    prerequisites: ["state-space-search", "graphs-dynamic-programming"],
    related: ["automated-planning", "control-robotics"],
    formula: String.raw`f(n)=g(n)+h(n),\qquad h(n)\le h^*(n)`,
    sources: [
      source(
        "UC Berkeley CS188 · Informed Search",
        "https://inst.eecs.berkeley.edu/~cs188/textbook/search/informed.html",
      ),
    ],
  },
  {
    id: "constraint-satisfaction",
    domain: "reasoning",
    title: { zh: "约束满足问题", en: "Constraint Satisfaction Problems" },
    level: "core",
    scope: "shared",
    summary:
      "用变量、取值域和约束描述合法解，再通过回溯、约束传播与变量排序减少搜索。与普通路径搜索相比，约束表示让求解器直接利用问题的局部组合结构。",
    why: "处理排课、配置、着色和资源分配，学习把自然语言要求变成可检查规则。",
    mastery: [
      "把地图着色或小型排课问题写成变量、域与约束。",
      "实现回溯与弧一致性传播，比较最少剩余值启发式带来的剪枝。",
    ],
    example:
      "三角形的三个顶点要求相邻颜色不同；只给两种颜色时无解，但各条二元约束开始时仍可满足弧一致性。",
    pitfall:
      "局部一致不等于全局有解，传播不能代替必要的搜索。找到可行解与寻找最优解也是不同任务，后者还需目标函数。",
    prerequisites: ["state-space-search"],
    related: ["constrained-optimization", "reasoning-verification"],
    sources: [
      source(
        "UC Berkeley CS188 · Constraint Satisfaction Problems",
        "https://inst.eecs.berkeley.edu/~cs188/textbook/csp/csps.html",
      ),
    ],
  },
  {
    id: "propositional-logic",
    domain: "reasoning",
    title: {
      zh: "命题逻辑与可满足性",
      en: "Propositional Logic and Satisfiability",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "用真假命题和逻辑连接词表达规则，区分公式的语法与在赋值下的语义。可满足性询问是否存在使约束成立的赋值，逻辑蕴含则要求所有模型都支持结论。",
    why: "为规则系统、SAT 求解和形式验证建立精确定义，避免把日常语言直觉当成逻辑规则。",
    mastery: [
      "用真值表判断一个公式是否可满足、永真或矛盾。",
      "把简单规则转成合取范式，通过加入结论的否定检验逻辑蕴含。",
    ],
    example:
      "知识库含 P→Q 与 P，可推出 Q；只有 P→Q 和 Q 时不能反推 P，用 P 为假、Q 为真的赋值即可反驳。",
    pitfall:
      "材料蕴含描述真假关系，不直接表示因果或时间顺序。没有证据支持某命题不等于它为假，除非系统另行采用封闭世界假设。",
    prerequisites: ["data-structures"],
    related: ["first-order-logic", "constraint-satisfaction"],
    sources: [logicNotes],
  },
  {
    id: "first-order-logic",
    domain: "reasoning",
    title: { zh: "一阶逻辑与量词", en: "First-order Logic and Quantifiers" },
    level: "core",
    scope: "shared",
    summary:
      "在命题逻辑之上引入对象、关系、函数与量词，表达可复用的一般规则。解释结构指定论域与符号含义，量词作用域则决定规则究竟要求哪些对象满足条件。",
    why: "表示“所有”“存在”及对象关系，为知识表达、定理证明与规则推断提供语言。",
    mastery: [
      "将三条带全称或存在量词的自然语言规则形式化，并标注作用域。",
      "构造一个小解释结构，区分交换量词前后公式的真假。",
    ],
    example:
      "“每位学生读过某本书”允许不同学生读不同书；“有一本书每位学生都读过”要求同一本书，两个句子并不等价。",
    pitfall:
      "自由变量、绑定变量和量词顺序不能混淆。一阶逻辑表达力更强，也使一般有效性不存在总能终止的判定算法。",
    prerequisites: ["propositional-logic"],
    related: ["logical-inference", "knowledge-representation"],
    formula: String.raw`\forall x\,\exists y\,R(x,y)\ \not\equiv\ \exists y\,\forall x\,R(x,y)`,
    sources: [aima],
  },
  {
    id: "logical-inference",
    domain: "reasoning",
    title: {
      zh: "逻辑推断与证明搜索",
      en: "Logical Inference and Proof Search",
    },
    level: "core",
    scope: "shared",
    summary:
      "用合法推理规则从知识库导出结论，并区分语义上的蕴含与算法找到的证明。归结、合一和前向或后向链接，把抽象规则转成可追踪的求解过程。",
    why: "让系统给出可检查的推理链，同时知道搜索失败是否真的意味着命题为假。",
    mastery: [
      "对两个含变量的原子式求合一替换，并检查变量出现限制。",
      "为小型 Horn 规则库实现前向链接，记录每个结论依赖的规则。",
    ],
    example:
      "已知 Parent(A,B)、Parent(B,C) 和规则 Parent(x,y)∧Parent(y,z)→Grandparent(x,z)，用替换 x=A、y=B、z=C 导出结论。",
    pitfall:
      "可靠性与完备性是不同性质；对一般一阶逻辑，正确的证明搜索也可能在无证明时不终止。有限预算内没找到证明不等于已反驳命题。",
    prerequisites: ["first-order-logic", "state-space-search"],
    related: ["reasoning-verification", "neurosymbolic"],
    sources: [aima],
  },
  {
    id: "knowledge-representation",
    domain: "reasoning",
    title: {
      zh: "知识表示与本体",
      en: "Knowledge Representation and Ontologies",
    },
    level: "core",
    scope: "shared",
    summary:
      "选择怎样表示对象、类别、关系、时间与规则，决定系统能问什么、能推导什么。知识表示不仅是存储事实，还要明确语义、身份、例外与不完全信息的处理方式。",
    why: "使多来源知识可以组织、复用与检查，为规则系统和知识图谱建立概念边界。",
    mastery: [
      "为一个小领域定义实体类型、关系及约束，并写出三个目标查询。",
      "给缺失事实、类别继承和例外分别选择明确语义，解释其推理后果。",
    ],
    example:
      "建立课程知识库，区分课程、开课班次与教师；“某课程由某教师授课”若没有学期信息，可能把不同年份事实错误合并。",
    pitfall:
      "概念名称相同不代表指向同一对象；默认规则与严格逻辑蕴含不能混用。表达力越强不一定越适合需求，还要考虑推理可判定性与成本。",
    prerequisites: ["first-order-logic"],
    related: ["knowledge-graphs", "databases-sql"],
    sources: [aima],
  },
  {
    id: "knowledge-graphs",
    domain: "reasoning",
    title: {
      zh: "知识图谱与关系查询",
      en: "Knowledge Graphs and Relational Queries",
    },
    level: "core",
    scope: "specialist",
    summary:
      "用实体及关系组织事实，让跨来源信息可通过图模式查询和规则连接。实体对齐、来源与时间同样重要；知识图谱可结合嵌入预测缺失关系，但预测仍需验证。",
    why: "为检索增强、领域问答和数据整合提供有结构、可追溯的知识底座。",
    mastery: [
      "将一组资料转成带稳定标识和来源的三元组，处理同名实体。",
      "实现两跳关系查询，并区分存储事实、规则推出事实与模型预测关系。",
    ],
    example:
      "存储“论文—作者—研究者”及“研究者—任职于—机构”两类关系，查询某机构作者的论文，同时记录任职时间以避免错配。",
    pitfall:
      "缺少一条边不自动意味着关系为假；链接预测得分是模型判断，不是事实证明。来源冲突、时间变化与实体混同不能靠向量相似度直接解决。",
    prerequisites: ["knowledge-representation", "databases-sql"],
    related: ["graph-neural-networks", "rag", "embeddings"],
    sources: [
      source(
        "W3C · RDF 1.1 Concepts and Abstract Syntax",
        "https://www.w3.org/TR/rdf11-concepts/",
      ),
      aima,
    ],
  },
  {
    id: "automated-planning",
    domain: "reasoning",
    title: {
      zh: "自动规划与动作模型",
      en: "Automated Planning and Action Models",
    },
    level: "core",
    scope: "shared",
    summary:
      "把动作写成前提与效果，寻找能从初始状态达到目标的行动序列。规划利用动作结构减少盲目搜索，并把可执行性、资源与目标满足放在同一个形式模型中检查。",
    why: "为机器人、工作流和工具调用代理提供明确的行动约束与计划验证方法。",
    mastery: [
      "为积木世界或简化物流任务写出动作前提、增加效果与删除效果。",
      "逐步执行候选计划，检查每一步合法性和最终目标是否满足。",
    ],
    example:
      "机器人要把包裹从 A 运到 B：拾取要求机器人与包裹同处 A 且手空；移动后才能在 B 放下，不能只根据目标词语拼接动作。",
    pitfall:
      "经典规划通常假设确定性、完全可观测和正确动作模型；现实中的不确定结果、持续时间与资源竞争需要扩展模型或执行监测。",
    prerequisites: ["state-space-search", "propositional-logic"],
    related: ["tool-use-agents", "mdp", "control-robotics"],
    sources: [aima],
  },
  {
    id: "game-search",
    domain: "reasoning",
    title: {
      zh: "博弈搜索与对抗决策",
      en: "Game Search and Adversarial Decision-making",
    },
    level: "core",
    scope: "shared",
    summary:
      "当环境中有会主动选择行动的对手时，搜索要考虑双方目标。极大极小把对手的最优回应纳入决策，α–β 剪枝减少不影响答案的分支，估值函数处理有限搜索深度。",
    why: "理解棋类 AI 与对抗决策的基本推理，并区分竞争、随机性和部分信息。",
    mastery: [
      "手算一个小型博弈树的极大极小值，指出最优根动作。",
      "实现 α–β 剪枝，改变走法排序并比较展开数量与返回值。",
    ],
    example:
      "根节点取最大值，两个子节点取最小值；叶值分别是 (3,5) 与 (2,9)，根选择左支得到 3，右支见到 2 后可剪去 9。",
    pitfall:
      "标准极大极小针对双人零和、完全信息的设定；随机节点需期望计算，隐藏信息需处理信息集。深度截断的估值误差会影响选择。",
    prerequisites: ["state-space-search", "expectation-variance"],
    related: ["mdp", "policy-gradients"],
    sources: [
      source(
        "UC Berkeley CS188 · Game Trees",
        "https://inst.eecs.berkeley.edu/~cs188/textbook/games/games.html",
      ),
    ],
  },
  {
    id: "neurosymbolic",
    domain: "reasoning",
    title: { zh: "神经符号方法", en: "Neurosymbolic Methods" },
    level: "research",
    scope: "specialist",
    summary:
      "把神经网络的感知与表示能力，同规则、逻辑或约束求解结合。融合可以发生在输入、训练目标或推理阶段，关键是说明每个模块如何传递不确定性与保证。",
    why: "研究从噪声输入到结构化推理的系统，并检验领域知识能否提升数据效率和可解释性。",
    mastery: [
      "搭建一个神经识别加规则推断的小实验，明确概率或符号接口。",
      "分别移除神经模块或规则约束，比较错误传播与违反约束的情况。",
    ],
    example:
      "网络识别两张手写数字图像的概率，逻辑程序计算两数之和；利用求和标签训练时，检查识别不确定性如何影响最终答案。",
    pitfall:
      "可微约束损失不等于严格满足约束，神经输出也不自动变成可信事实。把不确定识别硬化为符号可能放大错误或使约束无解。",
    prerequisites: ["representation-learning", "logical-inference"],
    related: ["reasoning-verification", "research-project"],
    sources: [
      source(
        "Manhaeve et al. · DeepProbLog: Neural Probabilistic Logic Programming",
        "https://arxiv.org/abs/1805.10872",
      ),
    ],
  },
  {
    id: "reasoning-verification",
    domain: "reasoning",
    title: {
      zh: "推理验证与形式检查",
      en: "Reasoning Verification and Formal Checking",
    },
    level: "research",
    scope: "shared",
    summary:
      "把候选答案、程序或计划转成可检查的约束与证明义务，再用测试、求解器或证明检查器核验。生成结果与验证结果分开，才能说明结论的证据和覆盖范围。",
    why: "减少把流畅解释当成正确推理的风险，为自动生成代码、计划与证明建立可靠反馈。",
    mastery: [
      "为一个小程序写出前置与后置条件，用 SAT 或 SMT 寻找反例。",
      "区分通过测试、有限范围穷举和相对形式模型的证明，报告各自范围。",
    ],
    example:
      "候选整数程序声称对所有输入返回非负数；将“满足前置条件且输出小于零”交给 SMT 求解器，若得到赋值就构成反例。",
    pitfall:
      "证明只覆盖形式化的规格和模型，不能替错误需求背书；求解超时或 unknown 不等于正确。自然语言推理过程也不是机器可检查的证明证书。",
    prerequisites: ["logical-inference", "software-testing"],
    related: ["tool-use-agents", "safety-evaluation"],
    sources: [
      source(
        "de Moura & Bjørner · Z3: An Efficient SMT Solver",
        "https://www.microsoft.com/en-us/research/publication/z3-an-efficient-smt-solver/",
      ),
      aima,
    ],
  },
];
