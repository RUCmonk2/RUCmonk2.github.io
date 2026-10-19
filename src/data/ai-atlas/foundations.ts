import type { AINode } from "./types";

// Source audit and prerequisite rationale: docs/ai-atlas-foundations-sources.md.
export const foundationNodes: AINode[] = [
  {
    id: "vectors-matrices",
    domain: "mathematics",
    title: {
      zh: "向量与矩阵",
      en: "Vectors and Matrices",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "向量用有序分量表示对象，矩阵组织多个向量并描述线性计算。形状、索引和运算规则共同决定含义；同一组数字换一个轴约定，就可能代表不同的数据。",
    why: "看懂样本、特征、参数与批量预测的维度，避免程序能运行却算错对象。",
    mastery: [
      "写出矩阵乘法每一项并标注输入输出形状。",
      "把三个样本、两个特征整理成矩阵，并解释每个轴。",
    ],
    example: "取X=[[1,2],[3,4]]、w=[2,-1]，手算Xw=[0,2]，再用数组库核对形状。",
    pitfall: "矩阵乘法、逐元素乘法和外积不同；广播成功不代表轴的语义正确。",
    prerequisites: [],
    sources: [
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
    related: ["array-computing", "linear-regression"],
    formula:
      "X\\in\\mathbb R^{n\\times d},\\quad w\\in\\mathbb R^d,\\quad Xw\\in\\mathbb R^n",
  },
  {
    id: "linear-maps",
    domain: "mathematics",
    title: {
      zh: "线性映射与基变换",
      en: "Linear Maps and Change of Basis",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "线性映射保持加法与数乘，矩阵是它在选定基下的坐标表达。伸缩、旋转和投影可以组合；换基会改变矩阵表示，但不改变被描述的抽象映射。",
    why: "区分线性层的功能与坐标选择，理解特征投影和表示变换。",
    mastery: [
      "检验一个给定映射是否满足线性条件，并给出反例。",
      "对二维旋转与伸缩写出组合矩阵，说明顺序的影响。",
    ],
    example: "用A=diag(2,0)作用于[3,4]，得到[6,0]；解释哪个方向的信息被丢弃。",
    pitfall: "加上非零偏置得到仿射映射；矩阵乘法通常不可交换。",
    prerequisites: ["vectors-matrices"],
    sources: [
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
    ],
    related: ["perceptron-mlp", "representation-learning"],
    formula: "T(ax+by)=aT(x)+bT(y)",
  },
  {
    id: "rank-nullspace",
    domain: "mathematics",
    title: {
      zh: "秩、零空间与可辨识性",
      en: "Rank, Nullspace and Identifiability",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "秩描述线性映射能产生多少独立方向，零空间记录被映成零的输入。它们决定线性方程是否有唯一解，也揭示参数变化何时不会改变模型输出。",
    why: "发现共线特征、欠定问题与无法从数据识别的参数方向。",
    mastery: [
      "对小矩阵计算秩、零空间基，并检验每个基向量。",
      "判断Ax=b是否有解、是否唯一，并解释相应条件。",
    ],
    example:
      "A=[[1,2],[2,4]]的秩为1，[-2,1]属于零空间；比较w与w+t[-2,1]的预测。",
    pitfall: "矩阵接近秩亏时，浮点阈值会影响数值秩；有很多样本也不保证列独立。",
    prerequisites: ["linear-maps"],
    sources: [
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
    ],
    related: ["regularization", "numerical-stability"],
    formula:
      "\\operatorname{rank}(A)+\\dim\\ker A=n\\quad(A\\in\\mathbb R^{m\\times n})",
  },
  {
    id: "inner-products",
    domain: "mathematics",
    title: {
      zh: "内积、范数与正交投影",
      en: "Inner Products, Norms and Projections",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "内积把长度、夹角和正交性连接起来，范数衡量向量大小。正交投影在指定内积下寻找子空间中最近的点，不同度量会改变何谓接近。",
    why: "理解余弦相似度、最小二乘和嵌入空间距离的实际含义。",
    mastery: [
      "计算范数、夹角及向给定非零方向的正交投影。",
      "检验最小二乘残差与设计矩阵列空间的正交关系。",
    ],
    example:
      "[1,1]与[1,-1]内积为0；将[3,4]投影到第一坐标轴，投影为[3,0]、残差为[0,4]。",
    pitfall: "零向量没有定义良好的余弦方向；更换特征尺度会改变欧氏距离。",
    prerequisites: ["vectors-matrices"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
    related: ["nearest-neighbors", "embeddings"],
    formula:
      "\\operatorname{proj}_{u}x=\\frac{u^\\top x}{u^\\top u}u\\quad(u\\ne0)",
  },
  {
    id: "eigenvalues",
    domain: "mathematics",
    title: {
      zh: "特征值与谱分解",
      en: "Eigenvalues and Spectral Decomposition",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "特征向量给出线性变换保持方向的轴，特征值给出相应伸缩。实对称矩阵可用正交基对角化，谱也用于判断二次型的曲率和迭代的稳定性。",
    why: "把协方差主方向、优化曲率和图上的传播联系到同一数学对象。",
    mastery: [
      "求二维实对称矩阵的特征对并验证Av=λv。",
      "利用特征值判断对称矩阵正定、半正定或不定。",
    ],
    example:
      "A=[[2,1],[1,2]]的特征值为3和1，对应方向[1,1]与[1,-1]；画出单位圆的像。",
    pitfall:
      "一般矩阵未必有实特征值或完整特征向量组；对称矩阵结论不能任意推广。",
    prerequisites: ["linear-maps", "inner-products"],
    sources: [
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["pca", "second-order"],
    formula: "Av=\\lambda v,\\qquad A=Q\\Lambda Q^\\top\\quad(A=A^\\top)",
  },
  {
    id: "svd",
    domain: "mathematics",
    title: {
      zh: "奇异值分解与低秩近似",
      en: "Singular Value Decomposition",
    },
    level: "core",
    scope: "shared",
    summary:
      "奇异值分解把实矩阵拆成输入方向、非负伸缩和输出方向。保留较大奇异值，可在谱范数或Frobenius范数下得到最佳低秩近似，也能识别小奇异值风险。",
    why: "为降维、压缩、伪逆和低秩参数化提供可计算的基础。",
    mastery: [
      "检查矩形矩阵的完整与紧致SVD各部分形状。",
      "截断SVD后计算重建误差，并比较不同秩的效果。",
    ],
    example:
      "对A=diag(3,1)保留第一项，得到diag(3,0)，Frobenius误差为1；再对一张小灰度图画秩—误差曲线。",
    pitfall: "奇异值不是任意方阵的特征值；截断秩的选择还受噪声和任务要求影响。",
    prerequisites: ["eigenvalues", "linear-maps"],
    sources: [
      {
        title: "MIT 18.06 · Gilbert Strang, Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["pca", "parameter-efficient-tuning"],
    formula: "A=U\\Sigma V^\\top",
  },
  {
    id: "matrix-factorization",
    domain: "mathematics",
    title: {
      zh: "矩阵分解与线性求解",
      en: "Matrix Factorizations and Linear Solves",
    },
    level: "core",
    scope: "shared",
    summary:
      "LU、QR和Cholesky把线性求解转成结构化步骤。选择依赖矩阵形状、秩和正定性；计算中通常通过分解求解方程，而不是先显式求逆。",
    why: "稳定实现最小二乘、高斯似然和二阶优化中的线性代数子问题。",
    mastery: [
      "按矩阵条件选择LU、QR或Cholesky并解释原因。",
      "比较直接求解与显式求逆的残差、耗时和数值误差。",
    ],
    example:
      "A=[[4,2],[2,3]]可分解为L=[[2,0],[1,√2]]的LLᵀ；用两次三角求解计算Ax=b。",
    pitfall:
      "Cholesky要求对称正定；直接形成AᵀA可能放大条件数，不能把失败都归为代码错误。",
    prerequisites: ["rank-nullspace", "inner-products", "eigenvalues"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["multivariate-gaussian", "second-order"],
    formula: "A=LL^\\top\\quad(A\\succ0)",
  },
  {
    id: "derivatives",
    domain: "mathematics",
    title: {
      zh: "导数与局部线性近似",
      en: "Derivatives and Local Linearization",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "导数刻画函数对微小输入变化的一阶响应，来自差商极限。它既是局部斜率，也是近似计算的系数；存在导数需要比连续更强的条件。",
    why: "理解参数敏感性、梯度更新，以及损失变化的局部预测。",
    mastery: [
      "从差商计算简单函数的导数并检验单位。",
      "用一阶近似预测函数增量，比较不同步长下的误差。",
    ],
    example:
      "f(x)=x²在x=3处导数为6；用6×0.01预测增量0.06，与精确增量0.0601比较。",
    pitfall: "连续不保证可导；有限步长的差商不等于导数，拐点和尖点要分别判断。",
    prerequisites: [],
    sources: [
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
      {
        title: "MIT 18.02SC · Multivariable Calculus",
        url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      },
    ],
    related: ["gradient-descent", "numerical-gradient-check"],
    formula: "f(x+h)=f(x)+f^{\\prime}(x)h+o(h)",
  },
  {
    id: "multivariable-calculus",
    domain: "mathematics",
    title: {
      zh: "多元微分、梯度与Jacobian",
      en: "Multivariable Calculus and Jacobians",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "多元微分描述多个输入共同改变输出的局部规律。标量输出对应梯度，向量输出对应Jacobian；偏导数存在本身还不足以保证整体可微。",
    why: "追踪向量化模型的敏感性，并正确组织多输入、多输出的导数形状。",
    mastery: [
      "对二元标量函数计算梯度和指定方向导数。",
      "为向量函数写出Jacobian，明确输出行、输入列的约定。",
    ],
    example: "f(x,y)=x²+xy在(1,2)处梯度为[4,1]；沿单位方向[1,0]的方向导数为4。",
    pitfall:
      "梯度与Jacobian形状不同；偏导全存在不自动意味着可微，行列约定须一致。",
    prerequisites: ["derivatives", "vectors-matrices"],
    sources: [
      {
        title: "MIT 18.02SC · Multivariable Calculus",
        url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["backpropagation", "geometry-3d"],
    formula: "df=\\nabla f^\\top dx,\\qquad df_{\\mathrm{vector}}=J_f\\,dx",
  },
  {
    id: "chain-rule",
    domain: "mathematics",
    title: {
      zh: "链式法则与计算图",
      en: "Chain Rule and Computational Graphs",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "复合函数的导数沿中间变量传递。计算图中同一变量可能通过多条路径影响结果，各路径贡献需要相加；向量情形还必须保持Jacobian的乘法顺序。",
    why: "为反向传播、自动微分和复杂模型的梯度推导建立共同基础。",
    mastery: [
      "将复合表达式拆成计算图，标注中间值及局部导数。",
      "手算多路径变量的总导数，并核对梯度维度。",
    ],
    example: "令u=x²、v=3x、f=u+v，在x=2处两条路径贡献4与3，总导数为7。",
    pitfall: "多条依赖路径要相加；把中间量误当独立常量，会漏掉梯度贡献。",
    prerequisites: ["multivariable-calculus", "linear-maps"],
    sources: [
      {
        title: "MIT 18.02SC · Multivariable Calculus",
        url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["automatic-differentiation", "backpropagation"],
    formula: "J_{f\\circ g}(x)=J_f(g(x))J_g(x)",
  },
  {
    id: "taylor-hessian",
    domain: "mathematics",
    title: {
      zh: "Taylor展开、Hessian与曲率",
      en: "Taylor Expansion and Curvature",
    },
    level: "core",
    scope: "shared",
    summary:
      "Taylor展开用局部多项式近似函数，Hessian记录二阶变化。曲率帮助区分局部形状和估计更新效果，但展开是局部近似，余项和光滑性不能省略。",
    why: "解释优化中的步长限制、鞍点、曲率预条件和二阶方法。",
    mastery: [
      "为二元二次函数计算Hessian并判断驻点类型。",
      "用一阶、二阶展开预测扰动效果并实测误差。",
    ],
    example:
      "f(x,y)=x²+3y²在(1,1)处梯度为[2,6]、Hessian为diag(2,6)；二阶展开对任意增量都精确。",
    pitfall: "Hessian半正定不总能证明局部极小；远离展开点时高阶余项可能主导。",
    prerequisites: ["multivariable-calculus", "eigenvalues"],
    sources: [
      {
        title: "MIT 18.02SC · Multivariable Calculus",
        url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["second-order", "nonconvex-optimization"],
    formula: "f(x+d)\\approx f(x)+\\nabla f(x)^\\top d+\\tfrac12d^\\top H(x)d",
  },
  {
    id: "integrals",
    domain: "mathematics",
    title: {
      zh: "积分、累积与变量替换",
      en: "Integration and Change of Variables",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "积分把局部量累积成整体量，可表示面积、概率和期望。多维变量替换需计入体积变化；交换积分、极限或求导顺序通常需要额外条件。",
    why: "理解连续概率归一化、期望损失和概率模型中的变量变换。",
    mastery: [
      "计算简单定积分并检验结果的量纲和符号。",
      "对二维缩放写出Jacobian因子并验证总积分不变。",
    ],
    example:
      "计算∫₀¹2x dx=1；令u=2x后，积分区间变为[0,2]且dx=du/2，结果仍为1。",
    pitfall:
      "换元要检查适当的可微与一一对应条件；密度不是概率，遗漏绝对Jacobian会破坏归一化。",
    prerequisites: ["derivatives", "vectors-matrices"],
    sources: [
      {
        title: "MIT 18.02SC · Multivariable Calculus",
        url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["random-variables", "generative-models"],
    formula: "\\int f(x)\\,dx=\\int f(g(u))\\,|\\det J_g(u)|\\,du",
  },
  {
    id: "numerical-stability",
    domain: "mathematics",
    title: {
      zh: "条件数、误差与数值稳定性",
      en: "Conditioning and Numerical Stability",
    },
    level: "core",
    scope: "shared",
    summary:
      "条件数衡量问题对输入扰动的敏感程度，稳定性衡量算法是否额外放大误差。两者不能混同：稳定算法也无法消除病态问题本身的不确定性。",
    why: "分辨训练或求解失败来自数据尺度、病态矩阵还是不稳定计算方式。",
    mastery: [
      "对接近秩亏的线性系统扰动输入并比较解的变化。",
      "用残差与解误差两种指标比较QR和正规方程求解。",
    ],
    example:
      "对A=diag(1,10⁻⁸)固定求解器，只把b的第二项改变10⁻⁸，观察解的第二项改变1。",
    pitfall:
      "残差很小不保证解接近真实值；提升浮点精度不能自动修复不可辨识或严重病态的数据。",
    prerequisites: ["numerical-precision", "matrix-factorization"],
    sources: [
      {
        title: "David Goldberg · Floating-Point Arithmetic",
        url: "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html",
      },
      {
        title: "Boyd & Vandenberghe · Applied Linear Algebra",
        url: "https://web.stanford.edu/~boyd/vmls/",
      },
    ],
    related: ["optimization-diagnostics", "mixed-precision"],
    formula: "\\kappa_2(A)=\\sigma_{\\max}(A)/\\sigma_{\\min}(A)",
  },
  {
    id: "information-geometry",
    domain: "mathematics",
    title: {
      zh: "信息几何与自然梯度",
      en: "Information Geometry and Natural Gradient",
    },
    level: "research",
    scope: "specialist",
    summary:
      "把参数化概率分布视作带有局部度量的空间，Fisher信息衡量分布变化。自然梯度依据这一度量调整方向，区别于按参数坐标的欧氏距离更新。",
    why: "为自然梯度、概率模型预条件和策略优化提供进阶理论视角。",
    mastery: [
      "从Bernoulli分布的对数似然推导一维Fisher信息。",
      "比较相同参数增量在不同概率位置产生的KL变化。",
    ],
    example:
      "Bernoulli参数p的Fisher信息为1/[p(1−p)]；比较p=0.5与0.01时同样增加0.001造成的局部KL差异。",
    pitfall:
      "Fisher可能奇异，实际需阻尼或近似；有限步长更新不自动具有精确坐标不变性或更好收敛。",
    prerequisites: ["estimation", "entropy-kl", "taylor-hessian"],
    sources: [
      {
        title: "Amari · Natural Gradient Works Efficiently in Learning",
        url: "https://doi.org/10.1162/089976698300017746",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["policy-gradients", "second-order"],
    formula: "\\widetilde\\nabla_\\theta L=F(\\theta)^{-1}\\nabla_\\theta L",
  },
  {
    id: "probability-rules",
    domain: "probability",
    title: {
      zh: "概率空间与基本规则",
      en: "Probability Rules",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "概率把事件的不确定性放在统一的样本空间中，通过非负性、归一化和可列可加性计算。互补、交集与并集的关系，比直接套某个分布公式更基础。",
    why: "为数据采样、模型评估和随机算法建立一致的事件语言。",
    mastery: [
      "为一个有限随机实验列出样本空间和事件。",
      "用互补与容斥计算事件概率，检查结果处于[0,1]。",
    ],
    example: "掷公平骰子，A为偶数、B为大于4；P(A∩B)=1/6，P(A∪B)=4/6。",
    pitfall: "互斥不是独立；P(A)+P(B)直接相加需要处理事件重叠。",
    prerequisites: [],
    sources: [
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["random-variables", "conditional-probability"],
    formula: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
  },
  {
    id: "random-variables",
    domain: "probability",
    title: {
      zh: "随机变量、分布与密度",
      en: "Random Variables and Distributions",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "随机变量把随机结果映射为数值，分布描述它落在不同集合中的概率。离散概率质量、连续密度和累积分布承担不同角色，不能把密度值直接当概率。",
    why: "把观测、噪声、标签和潜变量写成可以计算的随机对象。",
    mastery: [
      "从离散实验构造随机变量并写出PMF与CDF。",
      "由连续密度对区间积分求概率，并核对归一化。",
    ],
    example:
      "抛两枚独立公平硬币，以正面数X为变量，P(X=0,1,2)依次为1/4、1/2、1/4，P(X≤1)=3/4。",
    pitfall:
      "连续变量单点概率通常为0；密度可大于1，且不是每种分布都有普通密度。",
    prerequisites: ["probability-rules"],
    sources: [
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
    ],
    related: ["common-distributions", "latent-variable-models"],
  },
  {
    id: "expectation-variance",
    domain: "probability",
    title: {
      zh: "期望、方差与协方差",
      en: "Expectation, Variance and Covariance",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "期望汇总随机量的平均行为，方差描述围绕均值的波动，协方差刻画线性共同变化。线性期望不要求独立，但方差相加时必须计入交叉关系。",
    why: "理解平均损失、梯度噪声、估计精度和特征之间的相关结构。",
    mastery: [
      "对小型离散分布直接计算均值、方差与协方差。",
      "推导平移和缩放后的矩，并说明方差和何时可相加。",
    ],
    example:
      "X取1的概率为0.25、取0为0.75，则E[X]=0.25、Var(X)=0.1875；2X+3的均值为3.5、方差为0.75。",
    pitfall: "有限均值不保证有限方差；零协方差通常不代表独立。",
    prerequisites: ["random-variables"],
    sources: [
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["stochastic-gradients", "bias-variance"],
    formula: "\\operatorname{Var}(aX+b)=a^2\\operatorname{Var}(X)",
  },
  {
    id: "conditional-probability",
    domain: "probability",
    title: {
      zh: "条件概率与联合分布",
      en: "Conditional Probability",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "条件概率在已知事件或变量取值后重新分配概率。联合、边缘与条件分布可以互相联系，但条件化改变了所讨论的样本群体，不等于主动改变世界。",
    why: "读懂分类器输出、条件生成和数据筛选造成的分布变化。",
    mastery: [
      "从联合概率表求边缘与条件概率并核对行列总和。",
      "用概率乘法法则计算有顺序的抽样事件。",
    ],
    example:
      "袋中2红1蓝，不放回抽两次：P(第二次红|第一次红)=1/2，而两次都红的概率为(2/3)(1/2)=1/3。",
    pitfall: "P(A|B)与P(B|A)不同；离散条件事件概率为0时不能直接用比值定义。",
    prerequisites: ["probability-rules"],
    sources: [
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
    ],
    related: ["bayes-rule", "interventions"],
    formula: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\quad(P(B)>0)",
  },
  {
    id: "bayes-rule",
    domain: "probability",
    title: {
      zh: "贝叶斯公式与基准率",
      en: "Bayes’ Rule and Base Rates",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "贝叶斯公式将先验与证据似然结合，得到更新后的条件概率。它是一条概率恒等式；实际推断是否可信，还取决于先验、似然和抽样过程是否适合问题。",
    why: "理解贝叶斯推断、罕见事件识别和模型置信度中的基准率效应。",
    mastery: [
      "从联合分布推导贝叶斯公式并解释每一项。",
      "在给定先验、检出率和误报率下计算后验。",
    ],
    example:
      "设备缺陷率1%，检测对缺陷检出率90%、对正常设备误报率5%；一次阳性后的缺陷概率约为15.4%。",
    pitfall: "检出率不是阳性预测准确率；忽略基准率可能严重夸大罕见事件的后验。",
    prerequisites: ["conditional-probability"],
    sources: [
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
    ],
    related: ["bayesian-inference", "metrics-calibration"],
    formula: "P(H\\mid E)=\\frac{P(E\\mid H)P(H)}{P(E)}",
  },
  {
    id: "common-distributions",
    domain: "probability",
    title: {
      zh: "常见分布与建模假设",
      en: "Common Probability Distributions",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "Bernoulli、二项、Poisson、正态与指数分布分别描述不同随机机制。选择分布不只看数据外形，还要检查支持集、独立性、参数含义和生成过程。",
    why: "为标签、计数、噪声和等待时间选择可解释的概率模型。",
    mastery: [
      "写出常见分布的支持集、参数、均值与方差。",
      "给三个实际计数或测量场景选模型并列出可能违背的假设。",
    ],
    example:
      "比较Binomial(20,0.1)与Poisson(2)的零计数概率：0.9²⁰约0.1216，e⁻²约0.1353，说明近似并不精确相等。",
    pitfall:
      "二项分布要求同成功概率的独立试验；Poisson并非所有计数数据的默认答案。",
    prerequisites: ["random-variables", "expectation-variance"],
    sources: [
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
    ],
    related: ["logistic-regression", "language-modeling"],
  },
  {
    id: "multivariate-gaussian",
    domain: "probability",
    title: {
      zh: "多元高斯与协方差结构",
      en: "Multivariate Gaussian Distributions",
    },
    level: "core",
    scope: "shared",
    summary:
      "多元高斯用均值向量和协方差矩阵表达联合波动，线性变换、边缘化与条件化具有可计算形式。协方差正定时存在普通密度，奇异情形需单独处理。",
    why: "为线性高斯模型、滤波、潜变量与高斯过程准备可计算工具。",
    mastery: [
      "用Cholesky分解生成相关高斯样本，并估计样本协方差。",
      "对二维高斯计算条件均值与条件方差。",
    ],
    example:
      "令均值为0、协方差[[1,0.8],[0.8,1]]；在X₁=1的高斯条件分布中，X₂均值为0.8、方差为0.36。",
    pitfall: "合法协方差须对称半正定；逐维正态并不自动意味着联合高斯或独立。",
    prerequisites: [
      "common-distributions",
      "expectation-variance",
      "matrix-factorization",
    ],
    sources: [
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["gaussian-processes", "latent-variable-models"],
  },
  {
    id: "independence",
    domain: "probability",
    title: {
      zh: "独立、相关与采样依赖",
      en: "Independence and Dependence",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "独立意味着联合分布分解为边缘分布之积，比零相关更强。成对独立、相互独立和条件独立也不同；数据来自同一患者或时间序列时尤其要检查依赖。",
    why: "判断方差估计、随机采样、训练集划分与统计推断的假设是否成立。",
    mastery: [
      "用联合概率表检验独立，而不只计算相关系数。",
      "构造零协方差但不独立的随机变量例子。",
    ],
    example:
      "X等概率取−1、0、1，令Y=X²；协方差为0，但P(X=0,Y=0)=1/3，不等于两个边缘概率乘积1/9。",
    pitfall:
      "重复测量不能按独立样本机械计数；只在联合高斯等特殊条件下零相关可推出独立。",
    prerequisites: ["conditional-probability", "expectation-variance"],
    sources: [
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["data-splits", "conditional-independence"],
  },
  {
    id: "lln-clt",
    domain: "probability",
    title: {
      zh: "大数定律与中心极限定理",
      en: "Law of Large Numbers and CLT",
    },
    level: "core",
    scope: "shared",
    summary:
      "大数定律解释样本平均趋向总体均值，中心极限定理描述适当缩放后的平均误差。它们回答不同问题，独立同分布和矩条件是常见版本的重要前提。",
    why: "估计采样误差，理解增加样本量的收益，以及正态近似何时合理。",
    mastery: [
      "模拟不同样本量的均值分布，比较收敛与误差缩放。",
      "在独立有限方差条件下计算均值的标准误。",
    ],
    example:
      "独立Bernoulli(0.2)样本取n=100时，样本均值标准差为0.04；取n=400时降为0.02，可重复模拟核验。",
    pitfall:
      "CLT不说原始数据变成正态，也没有对所有分布都通用的“样本量30足够”规则。",
    prerequisites: ["expectation-variance", "independence"],
    sources: [
      {
        title: "Harvard Stat 110 · Joseph Blitzstein",
        url: "https://stat110.hsites.harvard.edu/",
      },
      {
        title: "Larry Wasserman · CMU 36-705 Intermediate Statistics",
        url: "https://www.stat.cmu.edu/~larry/=stat705/",
      },
    ],
    related: ["confidence-intervals", "monte-carlo"],
    formula:
      "\\sqrt n\\,\\frac{\\bar X_n-\\mu}{\\sigma}\\ \\xrightarrow{d}\\ \\mathcal N(0,1)\\quad(0<\\sigma^2<\\infty)",
  },
  {
    id: "estimation",
    domain: "probability",
    title: {
      zh: "参数估计与似然",
      en: "Estimation and Likelihood",
    },
    level: "core",
    scope: "shared",
    summary:
      "估计量是由样本计算参数的方法，似然把观测固定、把参数视为待比较对象。偏差、方差、一致性与可辨识性从不同角度评价估计，不存在无条件最优方案。",
    why: "把模型训练理解为统计估计，并分清优化误差与有限样本误差。",
    mastery: [
      "对Bernoulli样本推导最大似然估计并处理端点。",
      "用重复模拟比较两个估计量的偏差、方差和均方误差。",
    ],
    example:
      "20次独立试验中成功7次，Bernoulli最大似然估计为0.35；重复生成数据检查估计量的波动。",
    pitfall:
      "似然不是参数的概率密度；优化器找到极值不代表参数可辨识或模型设定正确。",
    prerequisites: ["common-distributions", "objective-functions"],
    sources: [
      {
        title: "Larry Wasserman · CMU 36-705 Intermediate Statistics",
        url: "https://www.stat.cmu.edu/~larry/=stat705/",
      },
      {
        title: "Deisenroth, Faisal & Ong · Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
      },
    ],
    related: ["linear-regression", "bayesian-inference"],
    formula:
      "\\hat\\theta\\in\\arg\\max_\\theta\\sum_{i=1}^{n}\\log p_\\theta(x_i)",
  },
  {
    id: "hypothesis-tests",
    domain: "probability",
    title: {
      zh: "假设检验、效应量与多重比较",
      en: "Hypothesis Testing",
    },
    level: "core",
    scope: "shared",
    summary:
      "假设检验在明确的零假设和采样模型下评估观测是否异常。显著性、效应量与检验功效不是一回事；重复试验或比较多个模型还需处理选择与多重检验。",
    why: "避免把随机波动写成模型进步，让实验结论有可说明的错误率控制。",
    mastery: [
      "给出零假设、检验统计量与拒绝域，并解释I类错误。",
      "同时报告效应估计与不确定性，并说明多重比较处理。",
    ],
    example:
      "公平硬币假设下投100次得到65次正面，计算精确二项双侧p值，再比较正态近似；改变阈值观察误报与功效。",
    pitfall: "p值不是零假设为真的概率；未拒绝零假设不等于证明没有差异。",
    prerequisites: ["estimation", "lln-clt"],
    sources: [
      {
        title: "Larry Wasserman · CMU 36-705 Intermediate Statistics",
        url: "https://www.stat.cmu.edu/~larry/=stat705/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["statistical-comparison", "ablation-studies"],
  },
  {
    id: "confidence-intervals",
    domain: "probability",
    title: {
      zh: "置信区间与覆盖率",
      en: "Confidence Intervals and Coverage",
    },
    level: "core",
    scope: "shared",
    summary:
      "置信区间是一种随样本变化的区间构造程序，覆盖率描述重复抽样时包含真实参数的比例。区间宽度同时反映样本量、噪声水平与所采用的模型假设。",
    why: "为性能、均值和效应量附上不确定性，而非只比较单个小数点。",
    mastery: [
      "在均值估计中区分标准差与标准误，并构造适用区间。",
      "重复模拟区间覆盖率，检查方法在偏态或依赖数据下的表现。",
    ],
    example:
      "正态总体标准差已知为2，n=100、样本均值3；95%均值区间为3±1.96×0.2，约[2.61,3.39]。",
    pitfall:
      "频率学派95%区间不直接表示当前固定参数有95%概率在此区间；未知方差或相关数据需换方法。",
    prerequisites: ["estimation", "lln-clt"],
    sources: [
      {
        title: "Larry Wasserman · CMU 36-705 Intermediate Statistics",
        url: "https://www.stat.cmu.edu/~larry/=stat705/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["uncertainty", "statistical-comparison"],
  },
  {
    id: "entropy-kl",
    domain: "probability",
    title: {
      zh: "熵、交叉熵与KL散度",
      en: "Entropy, Cross-Entropy and KL Divergence",
    },
    level: "core",
    scope: "shared",
    summary:
      "熵描述分布的不确定性，交叉熵评价用另一分布编码的平均代价，KL比较两者差异。离散与连续版本、对数底数以及支持集条件必须明确。",
    why: "读懂分类损失、概率模型训练和变分目标中的信息量。",
    mastery: [
      "对两个小型离散分布计算熵、交叉熵与KL。",
      "说明改变对数底数、交换KL方向和出现零概率的后果。",
    ],
    example:
      "公平二元分布的熵为1 bit；P=(1,0)、Q=(0.5,0.5)时，D_KL(P∥Q)=ln2约0.693 nat。",
    pitfall:
      "KL一般不对称且不是距离；P有质量而Q为0的位置可令KL无穷大，微分熵还可能为负。",
    prerequisites: ["random-variables", "expectation-variance"],
    sources: [
      {
        title: "Stanford EE376A · Information Theory",
        url: "https://web.stanford.edu/class/ee376a/",
      },
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
    ],
    related: ["variational-inference", "language-modeling"],
    formula: "D_{\\mathrm{KL}}(P\\Vert Q)=\\sum_x p(x)\\log\\frac{p(x)}{q(x)}",
  },
  {
    id: "monte-carlo",
    domain: "probability",
    title: {
      zh: "Monte Carlo估计与误差",
      en: "Monte Carlo Estimation",
    },
    level: "core",
    scope: "shared",
    summary:
      "Monte Carlo用随机样本近似积分或期望，把计算问题转成统计估计。误差取决于方差、样本依赖和抽样方式；固定种子只帮助复现，不代表结果准确。",
    why: "实现概率推断、随机评估和模拟，并为近似结果给出误差尺度。",
    mastery: [
      "实现一个样本均值估计器并报告估计标准误。",
      "比较样本量增大四倍时误差的变化，重复不同随机种子。",
    ],
    example:
      "在[0,1]²均匀独立采样，统计x²+y²≤1的比例并乘4估计π；比较N=1000、4000、16000的重复实验。",
    pitfall:
      "通常O(N^−1/2)误差需要有限方差等条件；相关样本的有效样本量小于记录条数。",
    prerequisites: ["expectation-variance", "lln-clt", "python-programming"],
    sources: [
      {
        title: "Chris Piech · Probability for Computer Scientists",
        url: "https://chrispiech.github.io/probabilityForComputerScientists/en/",
      },
      {
        title: "Larry Wasserman · CMU 36-705 Intermediate Statistics",
        url: "https://www.stat.cmu.edu/~larry/=stat705/",
      },
    ],
    related: ["mcmc", "monte-carlo-td"],
    formula: "\\hat\\mu_N=\\frac1N\\sum_{i=1}^{N}f(X_i)",
  },
  {
    id: "objective-functions",
    domain: "optimization",
    title: {
      zh: "目标函数、风险与正则项",
      en: "Objective Functions",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "目标函数把拟合误差、偏好和约束代价写成可优化量。经验目标与总体风险不同，求和或平均的归一化也会改变梯度尺度及正则项的相对作用。",
    why: "把口头任务转成明确的数学优化问题，并检查训练代码是否真的优化了它。",
    mastery: [
      "为给定小数据集写出损失、参数和约束，标明每一项的单位。",
      "解释把样本损失求和改为平均后，梯度和正则权重如何变化。",
    ],
    example:
      "数据为(x,y)=(1,2),(2,4)，设预测为wx；写出平方误差目标并验证w=2使数据项为0。",
    pitfall:
      "训练目标低不等于实际任务成功；混用sum与mean却不调整其他项会悄悄改变问题。",
    prerequisites: ["vectors-matrices", "derivatives"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
    ],
    related: ["learning-problem", "regularization"],
  },
  {
    id: "convexity",
    domain: "optimization",
    title: {
      zh: "凸集、凸函数与全局最优",
      en: "Convexity",
    },
    level: "core",
    scope: "shared",
    summary:
      "凸性限制集合与函数在连线上的形状，为局部最优等于全局最优提供条件。严格凸性、强凸性和光滑性各有不同作用，不能仅凭图像看似碗状判断。",
    why: "识别哪些模型有较强优化保证，并理解凸松弛与非凸训练的区别。",
    mastery: [
      "用定义或Hessian检验简单函数的凸性。",
      "给出凸但不严格凸的例子，并判断最优解是否唯一。",
    ],
    example: "比较f(x)=x²与g(x)=x⁴−x²：g在0处二阶导为−2，因此不凸。",
    pitfall:
      "凸问题需要凸可行域与合适目标；凸不自动保证唯一解或最优值一定能取到。",
    prerequisites: ["objective-functions", "taylor-hessian"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["kernels-svm", "regularization"],
    formula: "f(tx+(1-t)y)\\le tf(x)+(1-t)f(y)\\quad(0\\le t\\le1)",
  },
  {
    id: "gradient-descent",
    domain: "optimization",
    title: {
      zh: "梯度下降与迭代更新",
      en: "Gradient Descent",
    },
    level: "core",
    scope: "shared",
    summary:
      "梯度下降用当前的一阶信息选择局部下降方向，再由步长决定移动距离。它是一种迭代算法，是否下降、是否收敛和能否达到全局最优需要分别讨论。",
    why: "读懂训练循环，并建立目标、梯度、步长和参数更新之间的直接联系。",
    mastery: [
      "手算几步一维梯度下降，再实现不调用优化器的版本。",
      "为光滑二次目标画出不同步长的误差曲线并解释差异。",
    ],
    example: "对f(w)=(w−3)²，从w₀=0取步长0.1，前两次更新为w₁=0.6、w₂=1.08。",
    pitfall: "负梯度只保证足够小局部步子的下降趋势；学习率过大可振荡或发散。",
    prerequisites: ["objective-functions", "multivariable-calculus"],
    sources: [
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
    ],
    related: ["linear-regression", "backpropagation"],
    formula: "\\theta_{t+1}=\\theta_t-\\eta_t\\nabla f(\\theta_t)",
  },
  {
    id: "stochastic-gradients",
    domain: "optimization",
    title: {
      zh: "随机梯度与小批量",
      en: "Stochastic and Minibatch Gradients",
    },
    level: "core",
    scope: "shared",
    summary:
      "随机梯度用抽样数据近似完整梯度，减少每次更新成本，也引入方差。是否无偏取决于抽样和加权方式，小批量大小改变噪声与计算效率之间的平衡。",
    why: "理解训练为何抖动、批大小如何影响速度，以及数据采样如何改变实际目标。",
    mastery: [
      "对两个样本手算完整梯度与随机梯度的期望。",
      "固定总梯度计算次数，比较不同批大小的运行时间和目标值。",
    ],
    example:
      "令单样本损失为0.5(w−a)²，a等概率取0或2；在w=0处随机梯度为0或−2，均值−1等于完整梯度。",
    pitfall: "有放回均匀抽样下的无偏结论不能直接套给任意重采样或类别加权方案。",
    prerequisites: ["gradient-descent", "expectation-variance"],
    sources: [
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["data-pipelines", "distributed-training"],
    formula:
      "\\hat g_B(\\theta)=\\frac1B\\sum_{i\\in\\mathcal B}\\nabla\\ell_i(\\theta)",
  },
  {
    id: "momentum-adam",
    domain: "optimization",
    title: {
      zh: "动量、Adam与自适应更新",
      en: "Momentum and Adam",
    },
    level: "core",
    scope: "shared",
    summary:
      "动量累积历史梯度以调整方向，Adam还用梯度平方的移动平均缩放各坐标更新。状态初始化、偏差修正和数值稳定项都是算法的一部分，不只是换个名字。",
    why: "正确实现和比较常用优化器，并理解为什么不同参数尺度需要不同处理。",
    mastery: [
      "写出动量与Adam的一次更新，追踪优化器状态和偏差修正。",
      "在相同预算下比较SGD、动量与Adam，并记录各自调参方式。",
    ],
    example:
      "在f(x,y)=0.5(x²+100y²)上从同一点启动三种算法，比较路径与目标曲线，观察陡峭方向造成的振荡。",
    pitfall:
      "Adam不保证所有问题都更好；耦合L2正则与解耦权重衰减在自适应优化中通常不等价。",
    prerequisites: ["stochastic-gradients"],
    sources: [
      {
        title: "Kingma & Ba · Adam",
        url: "https://arxiv.org/abs/1412.6980",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["normalization", "dl-regularization"],
  },
  {
    id: "learning-rate",
    domain: "optimization",
    title: {
      zh: "学习率与调度",
      en: "Learning Rates and Schedules",
    },
    level: "core",
    scope: "shared",
    summary:
      "学习率决定每一步采用多少局部梯度信息，调度则随训练阶段改变更新尺度。它与曲率、批大小、目标归一化和优化器共同作用，不能脱离这些条件比较数值。",
    why: "快速辨认发散、过慢和调度不当，避免把步长问题误当模型能力问题。",
    mastery: [
      "对一维二次目标推导稳定步长区间。",
      "用短程扫描比较若干步长，并记录训练曲线和更新幅度。",
    ],
    example:
      "对(w−3)²，分别试0.1、0.9、1和1.1；步长1使参数误差来回翻转而损失不降，超过1则除最优起点外误差逐步放大。",
    pitfall:
      "更小学习率不总能补救错误梯度；批大小改变后也没有对所有优化器普适的线性缩放规则。",
    prerequisites: ["gradient-descent", "stochastic-gradients"],
    sources: [
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
    ],
    related: ["initialization", "optimization-diagnostics"],
  },
  {
    id: "constrained-optimization",
    domain: "optimization",
    title: {
      zh: "约束优化与投影",
      en: "Constrained Optimization",
    },
    level: "core",
    scope: "shared",
    summary:
      "约束规定参数可行范围，目标则在可行范围内比较方案。投影、罚函数和拉格朗日方法处理约束的方式不同，软惩罚并不自动保证满足硬约束。",
    why: "理解范数限制、概率单纯形、资源预算和公平性约束的优化表达。",
    mastery: [
      "把一个带预算的问题写成目标、等式和不等式约束。",
      "实现简单盒约束投影，并检验迭代点的可行性。",
    ],
    example:
      "最小化(x−2)²且x≤1，最优解为x=1；先做梯度步再取min(x,1)，比较与单纯加罚项的结果。",
    pitfall: "非凸集合上的投影可能不唯一；罚项权重有限时约束可能仍被违反。",
    prerequisites: ["objective-functions", "convexity"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["fairness", "policy-gradients"],
    formula: "\\min_{\\theta\\in\\mathcal C} f(\\theta)",
  },
  {
    id: "duality-kkt",
    domain: "optimization",
    title: {
      zh: "对偶、KKT与最优性条件",
      en: "Duality and KKT Conditions",
    },
    level: "core",
    scope: "specialist",
    summary:
      "对偶给原问题提供界，KKT把可行性、驻点、乘子符号与互补松弛组合起来。约束资格条件和凸性决定这些条件何时必要、充分以及是否有强对偶。",
    why: "为SVM、资源分配和带约束学习提供最优性证据，而非只相信求解器停止标志。",
    mastery: [
      "为简单凸约束问题写出拉格朗日函数与KKT条件。",
      "验证Slater条件并比较原问题最优值与对偶界。",
    ],
    example:
      "对min(x−2)²、x≤1，取L=(x−2)²+λ(x−1)；验证x*=1、λ*=2满足可行性、驻点和互补松弛。",
    pitfall:
      "非凸问题满足KKT不等于全局最优；没有约束资格条件时，必要性也可能失效。",
    prerequisites: ["constrained-optimization", "convexity"],
    sources: [
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
    ],
    related: ["kernels-svm", "causal-estimation"],
  },
  {
    id: "second-order",
    domain: "optimization",
    title: {
      zh: "Newton、拟Newton与曲率预条件",
      en: "Second-Order Methods",
    },
    level: "core",
    scope: "specialist",
    summary:
      "二阶方法利用Hessian或其近似修正更新方向，改善不同方向曲率差异。通常通过求解线性方程获取步子，并用阻尼、线搜索或信赖域控制局部模型的失准。",
    why: "理解曲率加速、L-BFGS和自然梯度等方法的计算成本与适用场景。",
    mastery: [
      "对正定二次函数计算Newton步并验证一步到达极小点。",
      "实现阻尼或回溯，比较完整Hessian与拟Newton所需存储。",
    ],
    example:
      "对f(x)=0.5xᵀdiag(1,100)x，Newton步解Hd=−∇f；精确运算下从任意点一步到0。",
    pitfall:
      "Hessian不定时Newton方向未必下降；显式求逆通常没有必要，近似曲率也不保证改善泛化。",
    prerequisites: [
      "taylor-hessian",
      "gradient-descent",
      "matrix-factorization",
    ],
    sources: [
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
    ],
    related: ["information-geometry", "optimization-diagnostics"],
    formula: "H(\\theta_t)d_t=-\\nabla f(\\theta_t)",
  },
  {
    id: "proximal-methods",
    domain: "optimization",
    title: {
      zh: "近端方法与非光滑优化",
      en: "Proximal Methods",
    },
    level: "research",
    scope: "specialist",
    summary:
      "近端方法把容易求梯度的光滑项与可处理的非光滑项分开更新。近端算子不是普通梯度步，它在保持接近当前点的同时直接处理正则项或集合约束。",
    why: "求解稀疏学习、L1正则和一些结构化恢复问题，而不硬把不可导点当光滑点。",
    mastery: [
      "推导一维L1正则的软阈值近端算子。",
      "实现近端梯度并同时检查目标值、稀疏度和停止条件。",
    ],
    example:
      "最小化0.5(w−3)²+|w|，最优解为2；将软阈值应用于3得到2，对照普通梯度在0附近的行为。",
    pitfall:
      "近端映射须匹配实际正则项和步长；非凸近端子问题可能多解，不能沿用凸问题全部保证。",
    prerequisites: [
      "convexity",
      "gradient-descent",
      "constrained-optimization",
    ],
    sources: [
      {
        title: "Parikh & Boyd · Proximal Algorithms",
        url: "https://web.stanford.edu/~boyd/papers/prox_algs.html",
      },
      {
        title: "Boyd & Vandenberghe · Convex Optimization",
        url: "https://web.stanford.edu/~boyd/cvxbook/",
      },
    ],
    related: ["regularization", "matrix-factorization"],
    formula:
      "\\operatorname{prox}_{\\lambda|\\cdot|}(z)=\\operatorname{sign}(z)\\max(|z|-\\lambda,0)",
  },
  {
    id: "nonconvex-optimization",
    domain: "optimization",
    title: {
      zh: "非凸目标、驻点与鞍点",
      en: "Nonconvex Optimization",
    },
    level: "core",
    scope: "shared",
    summary:
      "非凸目标可能有多个局部极小、鞍点和平台。梯度小只是近似驻点的一种证据，不能单独证明解好；初始化、噪声和目标结构共同影响算法到达的位置。",
    why: "合理解读深度网络训练结果，并区分经验成功与可以严格证明的保证。",
    mastery: [
      "对一维非凸函数找出驻点并分类，检验二阶条件的限制。",
      "比较不同初值与随机种子，并报告分布而非只挑最好一次。",
    ],
    example:
      "对f(x)=x⁴−x²，驻点为0与±1/√2；0是局部极大，若梯度下降恰从0开始会停住，微小扰动则改变路径。",
    pitfall:
      "零梯度可能对应极大点或鞍点；有限次数重启找到相同结果也不是全局最优证明。",
    prerequisites: [
      "taylor-hessian",
      "gradient-descent",
      "stochastic-gradients",
    ],
    sources: [
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["initialization", "research-integrity"],
  },
  {
    id: "automatic-differentiation",
    domain: "optimization",
    title: {
      zh: "自动微分与向量积",
      en: "Automatic Differentiation",
    },
    level: "core",
    scope: "shared",
    summary:
      "自动微分沿程序执行的基本运算应用链式法则，前向与反向模式适合不同输入输出规模。它计算程序所表示函数的导数，不是符号化简，也不是有限差分近似。",
    why: "可靠实现复杂模型梯度，并理解反向传播、JVP与VJP的时间和内存代价。",
    mastery: [
      "手写一个小计算图的反向传播，核对每条路径的梯度。",
      "使用框架计算梯度或JVP/VJP，并解释detach和梯度累积的效果。",
    ],
    example:
      "对f(x,y)=xy+sin(x)，在(1,2)处手算梯度[2+cos(1),1]，再与自动微分输出比较。",
    pitfall:
      "自动微分忠实于实际程序：错误广播、断开计算图或原地修改都可能产生错误结果；不可导处需看框架约定。",
    prerequisites: ["chain-rule", "python-programming"],
    sources: [
      {
        title: "PyTorch · Automatic Differentiation",
        url: "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
      },
      {
        title: "JAX · The Autodiff Cookbook",
        url: "https://docs.jax.dev/en/latest/notebooks/autodiff_cookbook.html",
      },
    ],
    related: ["backpropagation", "memory-efficiency"],
  },
  {
    id: "numerical-gradient-check",
    domain: "optimization",
    title: {
      zh: "数值梯度校验",
      en: "Numerical Gradient Checking",
    },
    level: "core",
    scope: "shared",
    summary:
      "数值梯度校验用有限差分独立检验解析或自动梯度，在截断误差和舍入误差之间选择步长。它是小规模诊断工具，不适合作为大型模型的常规训练方法。",
    why: "在损失、自定义算子和复杂反向传播中发现符号、维度或漏项错误。",
    mastery: [
      "用中心差分检验一个确定性小函数的梯度。",
      "扫描差分步长并报告归一化误差，排查非光滑点和随机性。",
    ],
    example:
      "对xy+sin(x)使用float64，在同一输入上比较ε=10⁻²至10⁻⁸的中心差分与手算梯度，观察误差先降后受舍入影响。",
    pitfall:
      "更小ε不一定更准确；检查时应固定随机性，避开ReLU尖点，并留意共享存储的扰动。",
    prerequisites: ["automatic-differentiation", "numerical-stability"],
    sources: [
      {
        title: "JAX · The Autodiff Cookbook",
        url: "https://docs.jax.dev/en/latest/notebooks/autodiff_cookbook.html",
      },
      {
        title: "David Goldberg · Floating-Point Arithmetic",
        url: "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html",
      },
    ],
    related: ["software-testing", "backpropagation"],
    formula:
      "\\partial_i f(x)\\approx\\frac{f(x+\\varepsilon e_i)-f(x-\\varepsilon e_i)}{2\\varepsilon}",
  },
  {
    id: "optimization-diagnostics",
    domain: "optimization",
    title: {
      zh: "优化诊断与故障定位",
      en: "Optimization Diagnostics",
    },
    level: "core",
    scope: "shared",
    summary:
      "优化诊断同时查看目标、梯度、参数更新和数值状态，逐层排除实现与配置问题。下降曲线只反映当前目标的行为，还需与数据、评估和实际任务指标分开判断。",
    why: "把训练失败转成可以复现和定位的实验，而不是无序更换模型与超参数。",
    mastery: [
      "在小型确定性目标上记录损失、梯度范数和更新/参数范数比。",
      "注入符号错误或过大学习率，依据日志区分两类失败并修复。",
    ],
    example:
      "在(w−3)²上先故意沿正梯度更新，再恢复负梯度但放大学习率；比较两种发散的梯度校验结果和更新日志。",
    pitfall:
      "训练损失下降不等于泛化改善；只保存最好一段曲线会掩盖不稳定和选择偏差。",
    prerequisites: [
      "gradient-descent",
      "stochastic-gradients",
      "numerical-gradient-check",
    ],
    sources: [
      {
        title: "Bottou, Curtis & Nocedal · Large-Scale Optimization",
        url: "https://arxiv.org/abs/1606.04838",
      },
      {
        title: "Dive into Deep Learning · Optimization Algorithms",
        url: "https://d2l.ai/chapter_optimization/index.html",
      },
    ],
    related: ["profiling", "metrics-calibration", "baselines"],
  },
  {
    id: "python-programming",
    domain: "computing",
    title: {
      zh: "Python程序与数据对象",
      en: "Python Programming",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "Python基础包括名称与对象、控制流、函数、模块和异常。理解可变对象与引用关系比记住语法列表更重要；实验代码还需要清楚的输入输出契约和错误处理。",
    why: "把数学想法写成可运行、可复用、可检查的实验程序。",
    mastery: [
      "编写带明确输入输出的函数，并处理空输入和长度不匹配。",
      "解释列表别名、复制和函数参数修改对调用者的影响。",
    ],
    example:
      "实现均方误差函数，使输入[1,3]与[2,2]返回1；再测试空列表、不同长度和非数值输入。",
    pitfall:
      "变量名不是对象本身；可变默认参数和浅复制可能让不同实验共享意外状态。",
    prerequisites: [],
    sources: [
      {
        title: "Python · Official Tutorial",
        url: "https://docs.python.org/3/tutorial/",
      },
    ],
    related: ["array-computing", "software-testing"],
  },
  {
    id: "array-computing",
    domain: "computing",
    title: {
      zh: "数组、张量与向量化",
      en: "Array and Tensor Computing",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "数组以形状、数据类型和轴组织数值计算，向量化把大量同构运算交给底层实现。切片、广播、视图和复制决定计算语义，也决定内存使用与性能。",
    why: "实现批量预测和数据变换，同时避免难以发现的形状错误与额外内存占用。",
    mastery: [
      "对切片、矩阵乘法和广播逐步标注形状。",
      "将一个循环实现改为向量化，并比较数值结果、时间与内存。",
    ],
    example:
      "X为[[1,2],[3,4],[5,6]]，w=[2,-1]，Xw=[0,2,4]；另比较(3,)标签与(3,1)预测相减时的输出形状。",
    pitfall:
      "(n,)与(n,1)相减可能得到(n,n)，不会自动报错；视图修改也可能改变原数组。",
    prerequisites: ["python-programming", "vectors-matrices"],
    sources: [
      {
        title: "NumPy · Array Fundamentals",
        url: "https://numpy.org/doc/stable/user/absolute_beginners.html",
      },
    ],
    related: ["perceptron-mlp", "data-pipelines"],
  },
  {
    id: "data-structures",
    domain: "computing",
    title: {
      zh: "数据结构与访问模式",
      en: "Data Structures",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "数组、链表、哈希表、堆和队列为不同访问方式提供不同代价。选择结构要结合查询、插入、顺序和内存需求；平均复杂度与最坏复杂度不能混为一谈。",
    why: "实现数据索引、批量调度、搜索队列与高效特征统计。",
    mastery: [
      "为计数、最近访问和top-k三个任务选择数据结构并解释代价。",
      "实现哈希计数或最小堆，测试重复键、空结构和边界情况。",
    ],
    example:
      "对词序列[a,b,a,c,b,a]计数得到a:3、b:2、c:1；用大小k的堆维护流式top-k并与全排序核对。",
    pitfall:
      "哈希表平均常数时间不是无条件最坏保证；内存布局和常数开销也可能主导性能。",
    prerequisites: ["python-programming"],
    sources: [
      {
        title: "MIT 6.006 · Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
      },
      {
        title: "Python · Official Tutorial",
        url: "https://docs.python.org/3/tutorial/",
      },
    ],
    related: ["retrieval-systems", "state-space-search"],
  },
  {
    id: "algorithm-complexity",
    domain: "computing",
    title: {
      zh: "算法复杂度与资源预算",
      en: "Algorithmic Complexity",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "时间和空间复杂度描述输入规模增长时的资源需求，需先说明基本操作和输入表示。渐近阶数帮助筛选方案，但不能代替对硬件、稀疏性和实际常数的测量。",
    why: "提前判断一个AI算法或实验是否装得下、跑得完，避免在错误规模上优化代码。",
    mastery: [
      "为循环、排序与矩阵运算推导时间和空间阶数。",
      "根据数据形状和dtype估算主要中间结果的内存。",
    ],
    example:
      "一万个样本的全距离矩阵有10⁸项，float32约400MB；样本数翻倍，单是该矩阵就约1.6GB。",
    pitfall:
      "O(n)不意味着所有规模都更快；输出大小和中间矩阵可能比输入占用更大。",
    prerequisites: ["data-structures", "vectors-matrices"],
    sources: [
      {
        title: "MIT 6.006 · Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
      },
      {
        title: "UC Berkeley CS61C · Computer Architecture",
        url: "https://cs61c.org/fa26/",
      },
    ],
    related: ["attention", "nearest-neighbors"],
  },
  {
    id: "graphs-dynamic-programming",
    domain: "computing",
    title: {
      zh: "图算法与动态规划",
      en: "Graphs and Dynamic Programming",
    },
    level: "core",
    scope: "shared",
    summary:
      "图表示对象间连接，动态规划复用重叠子问题并规定求解顺序。状态、转移和边界决定算法；同样的递推式在有环、负权或状态不充分时可能失效。",
    why: "为规划、序列解码、概率推断和强化学习的Bellman递推建立算法直觉。",
    mastery: [
      "用邻接表实现BFS或非负权最短路，并核对路径。",
      "为一个小问题定义DP状态、转移、边界和时间复杂度。",
    ],
    example:
      "有向图边S→A=1、S→B=4、A→B=2、A→T=5、B→T=1，最短路径S→A→B→T长度为4。",
    pitfall:
      "Dijkstra不能直接处理任意负权；“把历史全丢掉”只有在状态仍保留必要信息时才成立。",
    prerequisites: ["data-structures", "algorithm-complexity"],
    sources: [
      {
        title: "MIT 6.006 · Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
      },
    ],
    related: [
      "dynamic-programming-rl",
      "exact-inference",
      "automated-planning",
    ],
  },
  {
    id: "computer-architecture",
    domain: "computing",
    title: {
      zh: "计算机体系结构与存储层次",
      en: "Computer Architecture",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "处理器、缓存、主存和存储设备形成速度与容量不同的层次，指令并行与数据布局共同决定吞吐。实际性能既受计算量约束，也可能受数据搬运与访存局部性限制。",
    why: "解释矩阵计算、数据加载和CPU/GPU任务为何会出现不同瓶颈。",
    mastery: [
      "画出缓存—主存—存储的数据流，区分延迟与吞吐。",
      "比较顺序访问与跨步访问，联系缓存和向量化解释测量结果。",
    ],
    example:
      "一个4096×4096的float32矩阵占64MiB；比较按行与跨大步长遍历的耗时，并说明为什么相同元素数不保证相同性能。",
    pitfall:
      "峰值浮点算力不等于应用速度；不能忽略内存带宽、缓存命中和设备间传输。",
    prerequisites: ["data-structures"],
    sources: [
      {
        title: "UC Berkeley CS61C · Computer Architecture",
        url: "https://cs61c.org/fa26/",
      },
    ],
    related: ["gpu-computing", "profiling"],
  },
  {
    id: "operating-systems",
    domain: "computing",
    title: {
      zh: "进程、线程、内存与I/O",
      en: "Operating Systems",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "操作系统负责调度执行、隔离地址空间并管理文件与设备。进程、线程、虚拟内存和I/O是理解程序资源行为的基础，程序申请的空间与实际驻留内存也不相同。",
    why: "诊断数据加载阻塞、进程崩溃、内存不足和多任务竞争。",
    mastery: [
      "区分进程与线程共享哪些资源，并说明虚拟内存的作用。",
      "查看小程序的PID、CPU时间、驻留内存和打开文件。",
    ],
    example:
      "启动两个各自计算小数组的进程，记录PID、运行时间和内存；让其中一个等待本地文件读取，观察CPU使用变化。",
    pitfall:
      "虚拟内存并非无限物理内存；等待I/O时低CPU利用率不一定说明计算代码低效。",
    prerequisites: ["computer-architecture", "data-structures"],
    sources: [
      {
        title: "Arpaci-Dusseau & Arpaci-Dusseau · OSTEP",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      },
    ],
    related: ["data-pipelines", "checkpointing"],
  },
  {
    id: "databases-sql",
    domain: "computing",
    title: {
      zh: "关系数据库、SQL与数据完整性",
      en: "Databases and SQL",
    },
    level: "core",
    scope: "shared",
    summary:
      "关系数据库以表、键和约束组织数据，SQL用选择、连接与聚合表达查询。索引和事务影响性能与一致性，正确查询还要考虑空值、重复行和连接后的基数变化。",
    why: "可靠构造训练样本、连接特征表和统计数据分布，减少静默的数据污染。",
    mastery: [
      "为一个小数据集设计主键和外键，并检查重复与空值。",
      "手算JOIN和GROUP BY结果，再用SQL核对行数与聚合量。",
    ],
    example:
      "events表有user_id为[1,1,2]的三行，按用户计数应为(1,2)、(2,1)；再加入一对多连接检查计数是否被重复放大。",
    pitfall:
      "JOIN成功不代表样本没有重复；NULL不是普通数值，按全量数据构造特征还可能造成泄漏。",
    prerequisites: ["data-structures", "python-programming"],
    sources: [
      {
        title: "PostgreSQL · Official Tutorial",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
      },
    ],
    related: ["feature-engineering", "data-governance"],
  },
  {
    id: "networking",
    domain: "computing",
    title: {
      zh: "网络协议、请求与可靠通信",
      en: "Networking and Reliable Requests",
    },
    level: "core",
    scope: "shared",
    summary:
      "网络通信分层处理寻址、传输和应用语义，DNS、TCP、TLS与HTTP解决不同问题。超时、重试和部分失败是正常情况；可靠传输不自动保证业务只执行一次。",
    why: "理解模型API、分布式任务和远程数据获取中的延迟与失败。",
    mastery: [
      "解释一次HTTPS请求的主要阶段及各层作用。",
      "为小型客户端设计超时、状态码处理和有界重试策略。",
    ],
    example:
      "对本地测试服务发送10次GET，记录状态码和延迟；模拟一次超时，验证重试次数有上限且日志能区分尝试。",
    pitfall: "超时不能证明服务端没执行；非幂等操作盲目重试可能造成重复结果。",
    prerequisites: ["operating-systems"],
    sources: [
      {
        title: "Stanford CS144 · Computer Networking",
        url: "https://cs144.github.io/",
      },
    ],
    related: ["inference-serving", "distributed-training"],
  },
  {
    id: "software-testing",
    domain: "computing",
    title: {
      zh: "软件测试与实验代码可靠性",
      en: "Software Testing",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "测试把程序应满足的行为写成可重复检查，覆盖正常输入、边界、异常和跨模块交互。测试通过是针对已检验性质的证据，不能代替统计有效性或完整数学证明。",
    why: "避免数据处理、自定义损失和评估实现中的错误污染实验结论。",
    mastery: [
      "为一个数值函数编写正常、边界和异常输入测试。",
      "对数据读取到结果输出的小流程写集成检查并隔离临时文件。",
    ],
    example:
      "为均方误差函数检查[1,3]与[2,2]结果为1；验证长度不匹配会报错，并用独立手算案例检查向量化版本。",
    pitfall:
      "只比较两段同源实现可能共同犯错；浮点比较需合理容差，不能一律用精确相等。",
    prerequisites: ["python-programming", "array-computing"],
    sources: [
      {
        title: "pytest · Official Getting Started Guide",
        url: "https://docs.pytest.org/en/stable/getting-started.html",
      },
      {
        title: "Python · Official Tutorial",
        url: "https://docs.python.org/3/tutorial/",
      },
    ],
    related: ["numerical-gradient-check", "reproducibility"],
  },
  {
    id: "git-environments",
    domain: "computing",
    title: {
      zh: "版本控制与依赖环境",
      en: "Git and Reproducible Environments",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "版本控制记录代码变更与协作历史，隔离环境记录解释器和依赖组合。提交、数据版本、配置与随机状态一起决定实验身份；单独保存模型文件通常不足以复现过程。",
    why: "让结果可回溯、协作可审查，并在换机器或回滚时重建实验。",
    mastery: [
      "用分支与提交记录一个小改动，阅读diff并处理一次简单冲突。",
      "在新目录按指定提交和依赖记录重建环境并运行测试。",
    ],
    example:
      "为同一小实验保存提交ID、Python版本、依赖清单与配置；在新虚拟环境重跑，核对输出和允许的数值误差。",
    pitfall:
      "虚拟环境不是容器或安全沙箱；固定依赖版本也不能消除硬件和非确定算子的影响。",
    prerequisites: ["python-programming"],
    sources: [
      {
        title: "Chacon & Straub · Pro Git",
        url: "https://git-scm.com/book/en/v2",
      },
      {
        title: "Python · Virtual Environments",
        url: "https://docs.python.org/3/library/venv.html",
      },
    ],
    related: ["dataset-versioning", "reproducibility"],
  },
  {
    id: "linux-tooling",
    domain: "computing",
    title: {
      zh: "命令行、文件与运行管理",
      en: "Linux and Command-Line Tooling",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "命令行通过参数、标准输入输出和退出状态组合工具，文件路径、权限与进程信号决定运行行为。理解这些接口，才能可靠管理长时间实验和批量数据任务。",
    why: "在服务器上定位日志、资源与失败原因，把手工步骤变成可复现的运行流程。",
    mastery: [
      "正确引用带空格的路径，并解释管道与输出重定向。",
      "查看进程、退出码、磁盘与内存用量，保留必要运行日志。",
    ],
    example:
      "对一份临时CSV统计行数与类别频次；运行小脚本，将标准输出和错误写入日志，检查退出码并记录耗时。",
    pitfall:
      "管道中某一步失败可能被后续成功掩盖；批量写入或删除前应核对展开后的路径。",
    prerequisites: ["operating-systems"],
    sources: [
      {
        title: "MIT · The Missing Semester",
        url: "https://missing.csail.mit.edu/",
      },
      {
        title: "Arpaci-Dusseau & Arpaci-Dusseau · OSTEP",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      },
    ],
    related: ["data-pipelines", "mlops-monitoring"],
  },
  {
    id: "parallel-programming",
    domain: "computing",
    title: {
      zh: "并行、通信与加速上限",
      en: "Parallel Programming",
    },
    level: "core",
    scope: "shared",
    summary:
      "并行程序把任务分给多个执行单元，同时支付调度、同步和通信成本。可并行比例、共享状态与随机数管理决定实际收益，线程数或设备数并不直接等于加速倍数。",
    why: "正确设计数据加载、模拟和训练并行，避免资源争用与结果不可复现。",
    mastery: [
      "将独立任务分块并行，比较1、2、4个工作进程的耗时。",
      "识别共享状态竞争，给每个工作单元分配可复现的随机数流。",
    ],
    example:
      "若80%工作可理想并行，使用4个工作单元的Amdahl加速上限为1/(0.2+0.8/4)=2.5；再测量实际程序的额外开销。",
    pitfall:
      "解释器构建、底层库释放GIL与否、嵌套线程和进程通信都会影响并行度；并发不等于并行。",
    prerequisites: [
      "computer-architecture",
      "operating-systems",
      "algorithm-complexity",
    ],
    sources: [
      {
        title: "UC Berkeley CS61C · Computer Architecture",
        url: "https://cs61c.org/fa26/",
      },
      {
        title: "Arpaci-Dusseau & Arpaci-Dusseau · OSTEP",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      },
    ],
    related: ["distributed-training", "gpu-computing"],
    formula: "S(p)\\le\\frac{1}{(1-f)+f/p}",
  },
  {
    id: "numerical-precision",
    domain: "computing",
    title: {
      zh: "浮点表示、舍入与数值范围",
      en: "Numerical Precision",
    },
    level: "foundation",
    scope: "shared",
    summary:
      "浮点数用有限位数表示实数近似，精度、指数范围和舍入方式共同影响计算。不同dtype的有效数字与可表示范围并不相同，运算次序也可能改变结果。",
    why: "理解溢出、下溢和舍入误差，为稳定实现与混合精度训练提供前提。",
    mastery: [
      "读取常用dtype的epsilon和最大有限值，并解释两者差别。",
      "构造舍入或消去误差案例，用更高精度或重排作对照。",
    ],
    example:
      "在float32中比较(10⁸+1)−10⁸与(10⁸−10⁸)+1，通常分别得到0与1；检查float32的epsilon约1.19×10⁻⁷。",
    pitfall:
      "代数等价不保证浮点结果相同；更大指数范围不等于更多有效数字，NaN也不能按普通相等性检查。",
    prerequisites: ["array-computing", "computer-architecture"],
    sources: [
      {
        title: "NumPy · numpy.finfo",
        url: "https://numpy.org/doc/stable/reference/generated/numpy.finfo.html",
      },
      {
        title: "David Goldberg · Floating-Point Arithmetic",
        url: "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html",
      },
    ],
    related: ["mixed-precision", "numerical-stability"],
  },
];
