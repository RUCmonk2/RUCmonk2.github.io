import type { AtlasNode } from "./knowledge-atlas";
import type { Localized } from "./learning/types";

export type MathMapDomainId =
  | "analysis"
  | "linear-algebra"
  | "multivariable"
  | "nabla"
  | "matrix-calculus"
  | "groups"
  | "ai-foundations";
export type MathMapEdgeKind = "prereq" | "related";
export type MathMapNode = {
  id: string;
  domain: MathMapDomainId;
  label: Localized;
  blurb: Localized;
  formula: string;
  insight: Localized;
  example?: string;
  href?: string;
  sources?: string[];
};
export type MathMapEdge = {
  source: string;
  target: string;
  kind: MathMapEdgeKind;
};

export const mathMapSources = [
  {
    id: "analysis",
    title: "MIT 18.100A · Real Analysis",
    href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
  },
  {
    id: "linear",
    title: "MIT 18.06 · Linear Algebra",
    href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
  },
  {
    id: "multi",
    title: "MIT 18.02SC · Multivariable Calculus",
    href: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
  },
  {
    id: "matrix",
    title: "MIT 18.S096 · Matrix Calculus",
    href: "https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/pages/lecture-notes-and-readings/",
  },
  {
    id: "groups",
    title: "MIT 18.701 · Algebra I",
    href: "https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/",
  },
  {
    id: "representation",
    title: "MIT 18.712 · Representation Theory",
    href: "https://www.ocw.mit.edu/courses/18-712-introduction-to-representation-theory-fall-2010/pages/syllabus/",
  },
  {
    id: "mml",
    title: "Mathematics for Machine Learning",
    href: "https://mml-book.github.io/",
  },
  {
    id: "gdl",
    title: "Geometric Deep Learning",
    href: "https://geometricdeeplearning.com/",
  },
];

export const mathMapDomains: readonly {
  id: MathMapDomainId;
  label: Localized;
  symbol: string;
  sources: string[];
}[] = [
  {
    id: "analysis",
    label: { zh: "数学分析", en: "Analysis" },
    symbol: "ε",
    sources: ["analysis"],
  },
  {
    id: "linear-algebra",
    label: { zh: "线性代数", en: "Linear algebra" },
    symbol: "V",
    sources: ["linear"],
  },
  {
    id: "multivariable",
    label: { zh: "多元微积分", en: "Multivariable calculus" },
    symbol: "∂",
    sources: ["multi"],
  },
  {
    id: "nabla",
    label: { zh: "∇ 与向量分析", en: "∇ & vector calculus" },
    symbol: "∇",
    sources: ["multi"],
  },
  {
    id: "matrix-calculus",
    label: { zh: "矩阵微分", en: "Matrix calculus" },
    symbol: "dX",
    sources: ["matrix"],
  },
  {
    id: "groups",
    label: { zh: "群论与对称性", en: "Groups & symmetry" },
    symbol: "G",
    sources: ["groups", "representation"],
  },
  {
    id: "ai-foundations",
    label: { zh: "AI 数学基础", en: "Mathematics for AI" },
    symbol: "ℒ",
    sources: ["mml"],
  },
];

const localized = ([zh, en]: readonly [string, string]): Localized => ({
  zh,
  en,
});
function concept(
  id: string,
  domain: MathMapDomainId,
  label: [string, string],
  blurb: [string, string],
  formula: string,
  insight: [string, string],
  example?: string,
): MathMapNode {
  return {
    id,
    domain,
    label: localized(label),
    blurb: localized(blurb),
    formula,
    insight: localized(insight),
    example,
  };
}

// Original concise study notes. Formulas use real Euclidean spaces and column gradients.
// Edges describe a suggested learning order, not logical necessity or a complete syllabus.
export const mathMapNodes: readonly MathMapNode[] = [
  concept(
    "limit",
    "analysis",
    ["极限与完备性", "Limits & completeness"],
    [
      "极限把“越来越接近”写成可证明的陈述；实数的完备性保证柯西列能在实数中收敛。",
      "Limits make approximation precise; completeness ensures that real Cauchy sequences converge in the reals.",
    ],
    String.raw`a_n\to a\iff\forall\varepsilon>0\;\exists N\;\forall n>N:\ |a_n-a|<\varepsilon`,
    [
      "先分清“趋近”与“相等”。在多元情形，沿所有路径趋近都必须得到同一极限。",
      "Approaching a value is not equality. A multivariable limit must agree along every approach path.",
    ],
    String.raw`\lim_{n\to\infty}\frac1n=0`,
  ),
  concept(
    "continuity",
    "analysis",
    ["连续性", "Continuity"],
    [
      "输入足够小的变化带来输出足够小的变化；连续函数保持序列的极限。",
      "Small input changes give small output changes; continuous maps preserve sequential limits.",
    ],
    String.raw`\lim_{x\to a}f(x)=f(a)`,
    [
      "连续不保证可微。例如绝对值在原点连续，却没有唯一切线斜率。",
      "Continuity does not imply differentiability: absolute value has a corner at zero.",
    ],
    String.raw`f(x)=|x|`,
  ),
  concept(
    "derivative",
    "analysis",
    ["导数与中值定理", "Derivatives & MVT"],
    [
      "导数描述一阶局部变化。中值定理把区间上的总变化与某点的瞬时变化联系起来。",
      "A derivative measures local first-order change. The mean value theorem links net and instantaneous change.",
    ],
    String.raw`f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}h`,
    [
      "中值定理要求闭区间连续、开区间可微。可微必连续，反过来不成立。",
      "The mean value theorem needs continuity on the closed interval and differentiability inside it.",
    ],
    String.raw`(x^2)'=2x`,
  ),
  concept(
    "integral",
    "analysis",
    ["积分与微积分基本定理", "Integrals & FTC"],
    [
      "积分累积局部量；对连续函数，积分形成的原函数求导后回到原函数的被积表达式。",
      "Integration accumulates local quantities. For continuous integrands, differentiating the accumulated integral recovers the integrand.",
    ],
    String.raw`\frac{d}{dx}\int_a^x f(t)\,dt=f(x)`,
    [
      "这里采用黎曼积分。概率论中更一般的期望还需要测度与勒贝格积分。",
      "This is the Riemann setting. General probability expectations require measure and Lebesgue integration.",
    ],
    String.raw`\int_0^1 2x\,dx=1`,
  ),
  concept(
    "series",
    "analysis",
    ["数项级数", "Infinite series"],
    [
      "把无限求和定义成部分和的极限；项趋于零只是级数收敛的必要条件。",
      "An infinite sum is the limit of partial sums; terms tending to zero is necessary but not sufficient.",
    ],
    String.raw`\sum_{n=0}^\infty a_n:=\lim_{N\to\infty}\sum_{n=0}^N a_n`,
    [
      "几何级数在公比绝对值小于 1 时收敛；调和级数虽然各项趋零，却发散。",
      "Geometric series converge when the ratio has modulus below one; the harmonic series diverges.",
    ],
    String.raw`\sum_{n=0}^\infty r^n=\frac1{1-r}\quad(|r|<1)`,
  ),
  concept(
    "uniform",
    "analysis",
    ["一致收敛", "Uniform convergence"],
    [
      "用同一个误差上界控制定义域内所有点，是交换极限与某些运算的重要条件。",
      "One error bound controls all points in a domain, enabling certain exchanges of limiting operations.",
    ],
    String.raw`\sup_{x\in D}|f_n(x)-f(x)|\longrightarrow0`,
    [
      "连续函数的一致极限仍连续；逐点收敛不够。交换求导还需要额外条件。",
      "A uniform limit of continuous functions is continuous; pointwise convergence is insufficient. Derivatives need extra hypotheses.",
    ],
    String.raw`f_n(x)=x^n\text{ on }[0,1]\quad\text{is not uniformly convergent}`,
  ),
  concept(
    "taylor",
    "analysis",
    ["泰勒近似与余项", "Taylor approximation"],
    [
      "用有限阶多项式表达局部变化，并把近似误差单独写出来。",
      "A finite polynomial models local change, with a remainder recording the approximation error.",
    ],
    String.raw`f(a+h)=f(a)+f'(a)h+\tfrac12 f''(a)h^2+o(h^2)`,
    [
      "此式在 a 附近二阶连续可微时成立。光滑函数不一定等于它的无穷泰勒级数。",
      "This holds for a C² function near a. A smooth function need not equal its infinite Taylor series.",
    ],
    String.raw`e^h=1+h+\tfrac12h^2+o(h^2)`,
  ),

  concept(
    "vector-space",
    "linear-algebra",
    ["向量空间与基", "Vector spaces & bases"],
    [
      "向量可以相加与缩放；选定基后，抽象向量才有一组具体坐标。",
      "Vectors support addition and scaling; a chosen basis assigns coordinates to an abstract vector.",
    ],
    String.raw`v=\sum_{i=1}^n x_i e_i`,
    [
      "坐标会随基变化，向量本身不变。矩阵、函数也能构成向量空间。",
      "Coordinates depend on the basis; the vector does not. Matrices and functions can also form vector spaces.",
    ],
    String.raw`\dim\mathbb R^{m\times n}=mn`,
  ),
  concept(
    "linear-map",
    "linear-algebra",
    ["线性映射与矩阵", "Linear maps & matrices"],
    [
      "线性映射保持加法与数乘；矩阵是在输入、输出基确定后对它的表示。",
      "A linear map preserves addition and scaling; a matrix represents it in chosen input and output bases.",
    ],
    String.raw`T(au+bv)=aT(u)+bT(v)`,
    [
      "导数本质上也是线性映射：把输入扰动映到输出的一阶变化。",
      "A derivative is itself a linear map from input perturbations to first-order output changes.",
    ],
    String.raw`A\in\mathbb R^{m\times n}:\ \mathbb R^n\to\mathbb R^m`,
  ),
  concept(
    "inner-product",
    "linear-algebra",
    ["内积、范数与投影", "Inner products & projections"],
    [
      "内积定义角度和正交，并诱导长度；正交投影用于寻找子空间中的最近点。",
      "An inner product defines angles, orthogonality and a norm; orthogonal projection finds nearest points in subspaces.",
    ],
    String.raw`\langle x,y\rangle=x^Ty,\qquad\|x\|_2=\sqrt{x^Tx}`,
    [
      "不是每个范数都来自内积。梯度的表达依赖所采用的内积。",
      "Not every norm comes from an inner product. The representation of a gradient depends on the inner product.",
    ],
    String.raw`\operatorname{proj}_u x=\frac{u^Tx}{u^Tu}u\quad(u\ne0)`,
  ),
  concept(
    "eigen",
    "linear-algebra",
    ["特征值与谱分解", "Eigenvalues & spectrum"],
    [
      "特征向量经过线性变换后仍位于同一直线上。实对称矩阵可以用正交基对角化。",
      "An eigenvector stays on its own line under a map. Real symmetric matrices admit orthogonal diagonalization.",
    ],
    String.raw`Av=\lambda v\ (v\ne0),\qquad A=Q\Lambda Q^T\ (A=A^T)`,
    [
      "一般矩阵未必有足够的特征向量，实矩阵的特征值也未必是实数。",
      "A general matrix may lack an eigenbasis, and a real matrix may have complex eigenvalues.",
    ],
    String.raw`\operatorname{diag}(2,3)e_1=2e_1`,
  ),
  concept(
    "svd",
    "linear-algebra",
    ["奇异值分解", "Singular value decomposition"],
    [
      "任意实矩阵都能分解为两个正交变换与一次非负的轴向缩放，矩形矩阵也适用。",
      "Every real matrix decomposes into orthogonal factors and nonnegative axial scaling, including rectangular matrices.",
    ],
    String.raw`A=U\Sigma V^T,\qquad\sigma_i^2=\lambda_i(A^TA)`,
    [
      "正交变换可能含反射，不全是旋转。截断 SVD 给出谱范数和 Frobenius 范数下的最佳低秩逼近。",
      "Orthogonal factors may include reflections. Truncated SVD gives optimal low-rank approximation in spectral and Frobenius norms.",
    ],
    String.raw`A_k=\sum_{i=1}^k\sigma_i u_i v_i^T`,
  ),
  concept(
    "positive-definite",
    "linear-algebra",
    ["正定矩阵", "Positive definite matrices"],
    [
      "实对称正定矩阵在每个非零方向上给出正的二次型，可描述局部曲率与度量。",
      "A real symmetric positive definite matrix has positive quadratic form in every nonzero direction, describing curvature or a metric.",
    ],
    String.raw`A\succ0\iff x^TAx>0\quad\forall x\ne0\quad(A=A^T)`,
    [
      "正定不等于每个元素为正。对称矩阵正定等价于所有特征值为正。",
      "Positive definite does not mean all entries are positive. For symmetric matrices it means all eigenvalues are positive.",
    ],
    String.raw`\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\succ0`,
  ),
  concept(
    "trace",
    "linear-algebra",
    ["迹与循环恒等式", "Trace & cyclic identity"],
    [
      "迹是方阵对角元素之和；循环移动乘积的因子可帮助整理矩阵微分。",
      "Trace sums diagonal entries; cyclic rearrangement helps organize matrix differentials.",
    ],
    String.raw`\operatorname{tr}(AB)=\operatorname{tr}(BA)`,
    [
      "乘积必须维度相容。循环换位不等于任意交换：一般 tr(ABC) 不等于 tr(ACB)。",
      "Products must have compatible shapes. Cyclic permutation does not allow arbitrary swaps.",
    ],
    String.raw`x^TAx=\operatorname{tr}(Axx^T)`,
  ),
  concept(
    "determinant",
    "linear-algebra",
    ["行列式与体积", "Determinants & volume"],
    [
      "行列式描述方阵线性变换的有向体积缩放；非零行列式等价于可逆。",
      "The determinant measures signed volume scaling of a square linear map; a nonzero determinant means invertibility.",
    ],
    String.raw`\det(AB)=\det(A)\det(B)`,
    [
      "积分换元和概率密度换元使用行列式的绝对值，因为体积没有方向符号。",
      "Integral and density changes of variables use the absolute determinant because volume is unsigned.",
    ],
    String.raw`\det\begin{pmatrix}2&0\\0&3\end{pmatrix}=6`,
  ),

  concept(
    "partial",
    "multivariable",
    ["偏导数", "Partial derivatives"],
    [
      "固定其余变量，只考察一个坐标方向的变化率。",
      "Hold other variables fixed and measure change along one coordinate direction.",
    ],
    String.raw`\partial_i f(x)=\lim_{h\to0}\frac{f(x+he_i)-f(x)}h`,
    [
      "所有偏导存在不保证全微分存在，甚至不保证连续。",
      "Existence of all partial derivatives guarantees neither total differentiability nor continuity.",
    ],
    String.raw`f(x,y)=x^2y:\quad\partial_x f=2xy,\ \partial_y f=x^2`,
  ),
  concept(
    "total",
    "multivariable",
    ["全微分与线性化", "Total differential"],
    [
      "用一个线性映射同时逼近所有方向的变化，误差相对扰动长度趋于零。",
      "One linear map approximates change in every direction, with error negligible relative to perturbation size.",
    ],
    String.raw`f(x+h)=f(x)+Df(x)[h]+o(\|h\|)`,
    [
      "偏导在邻域内连续是可微的充分条件。标量函数的全微分是线性泛函，梯度是它在内积下的表示。",
      "Continuous partial derivatives nearby suffice. For a scalar function the differential is a linear functional represented by a gradient.",
    ],
    String.raw`df=2xy\,dx+x^2\,dy\quad(f=x^2y)`,
  ),
  concept(
    "jacobian",
    "multivariable",
    ["Jacobian 矩阵", "Jacobian matrix"],
    [
      "向量值函数的导数在坐标中的矩阵；每一行对应一个输出，每一列对应一个输入。",
      "The coordinate matrix of a vector-valued derivative: one row per output, one column per input.",
    ],
    String.raw`J_f\in\mathbb R^{m\times n},\quad(J_f)_{ij}=\frac{\partial f_i}{\partial x_j}`,
    [
      "本文固定输出 × 输入的布局。先写清形状，再做复合和转置。",
      "We use output-by-input layout. Write the shapes before composing or transposing derivatives.",
    ],
    String.raw`f(x,y)=(x^2,xy):\quad J_f=\begin{pmatrix}2x&0\\y&x\end{pmatrix}`,
  ),
  concept(
    "chain",
    "multivariable",
    ["多元链式法则", "Multivariable chain rule"],
    [
      "复合函数的局部线性变化由各层导数依次复合得到。",
      "The local linear change of a composition comes from composing the derivatives of its layers.",
    ],
    String.raw`J_{g\circ f}(x)=J_g(f(x))J_f(x)`,
    [
      "矩阵乘法顺序对应函数复合顺序，不能随意交换。这也是反向传播的数学基础。",
      "Matrix order follows function composition and cannot be swapped. This underlies backpropagation.",
    ],
    String.raw`L=\tfrac12\|Ax\|^2\quad\Rightarrow\quad\nabla_x L=A^TAx`,
  ),
  concept(
    "hessian",
    "multivariable",
    ["Hessian 与曲率", "Hessian & curvature"],
    [
      "二阶偏导组成的矩阵，把梯度的变化与二阶局部形状联系起来。",
      "The matrix of second partials relates changes in the gradient to local second-order geometry.",
    ],
    String.raw`H_f=(\partial_i\partial_j f)_{ij},\qquad f(x+h)=f(x)+\nabla f(x)^Th+\tfrac12h^TH_f(x)h+o(\|h\|^2)`,
    [
      "在 C² 条件下 Hessian 对称。驻点处正定可推出严格局部极小；半正定不足以判断。",
      "For C² functions the Hessian is symmetric. Positive definiteness at a stationary point suffices for a strict local minimum; semidefiniteness does not.",
    ],
    String.raw`f=x^2+3y^2:\quad H_f=\operatorname{diag}(2,6)`,
  ),
  concept(
    "directional",
    "multivariable",
    ["方向导数", "Directional derivatives"],
    [
      "沿选定方向移动时的变化率；可微时用梯度与该方向的内积计算。",
      "Rate of change along a chosen direction; differentiability makes it the inner product with the gradient.",
    ],
    String.raw`D_u f(x)=\nabla f(x)^Tu\quad(\|u\|_2=1)`,
    [
      "“最陡方向”依赖长度的定义。欧氏单位球上，非零梯度的方向给出最大增长率。",
      "Steepest ascent depends on the norm. On the Euclidean unit sphere a nonzero gradient gives the maximizing direction.",
    ],
    String.raw`\max_{\|u\|_2=1}D_u f=\|\nabla f\|_2`,
  ),
  concept(
    "change-variables",
    "multivariable",
    ["多重积分与换元", "Multiple integrals & substitution"],
    [
      "在区域上累积标量量；坐标变换通过 Jacobian 行列式调整体积元素。",
      "Accumulate scalar quantities over a region; a coordinate change rescales volume by its Jacobian determinant.",
    ],
    String.raw`\int_{T(U)}f(x)\,dx=\int_U f(T(u))|\det J_T(u)|\,du`,
    [
      "这里假定 T 是合适区域上的 C¹ 微分同胚。极坐标的面积因子 r 不能漏掉。",
      "Assume T is a C¹ diffeomorphism on suitable domains. In polar coordinates the area factor r is essential.",
    ],
    String.raw`dx\,dy=r\,dr\,d\theta`,
  ),
  concept(
    "lagrange",
    "multivariable",
    ["约束与拉格朗日乘子", "Lagrange multipliers"],
    [
      "在光滑等式约束上找极值时，目标梯度落在约束梯度张成的法空间中。",
      "At a constrained extremum the objective gradient lies in the normal space spanned by the constraint gradients.",
    ],
    String.raw`\nabla f(x)=J_g(x)^T\lambda,\qquad g(x)=0`,
    [
      "这是满足约束资格条件时的必要条件，例如约束 Jacobian 满行秩；求出驻点后仍需分类。",
      "This is necessary under a constraint qualification such as full row rank of Jg; candidates still need classification.",
    ],
    String.raw`f=x+y,\ g=x^2+y^2-1:\quad(1,1)=2\lambda(x,y)`,
  ),

  concept(
    "nabla",
    "nabla",
    ["∇ 算子（nabla）", "Nabla operator ∇"],
    [
      "由偏导算子组成的形式向量，读作 nabla（纳布拉）。它作用于不同对象、以不同方式组合，产生不同微分算子。",
      "A formal vector of partial-derivative operators, called nabla. Its operand and combination determine the resulting operator.",
    ],
    String.raw`\nabla=(\partial_{x_1},\ldots,\partial_{x_n})^T`,
    [
      "此写法使用笛卡尔坐标。∇f、∇·F、∇×F 的输入输出类型不同，不能把 ∇ 当普通数乘。",
      "This expression is Cartesian. Gradient, divergence and curl have different input/output types; ∇ is not an ordinary scalar.",
    ],
    String.raw`\nabla f:\text{ scalar}\to\text{vector};\quad\nabla\cdot F:\text{ vector}\to\text{scalar}`,
  ),
  concept(
    "gradient",
    "nabla",
    ["梯度", "Gradient"],
    [
      "标量场各偏导组成的列向量；在欧氏内积下表示全微分，并指向最快增长方向。",
      "A column vector of partials of a scalar field; it represents the differential in the Euclidean inner product and points toward steepest ascent.",
    ],
    String.raw`df=\nabla f^Tdx,\qquad\nabla f=(\partial_1f,\ldots,\partial_nf)^T`,
    [
      "标量函数的 Jacobian 是一行，梯度是一列，二者互为转置。梯度为零时没有唯一的最快增长方向。",
      "A scalar function has a row Jacobian and a column gradient. A zero gradient gives no unique steepest-ascent direction.",
    ],
    String.raw`f=x^2+xy+y^2:\quad\nabla f=(2x+y,\ x+2y)^T`,
  ),
  concept(
    "divergence",
    "nabla",
    ["散度", "Divergence"],
    [
      "把向量场各分量在对应坐标方向上的变化率相加，描述局部净流出密度。",
      "Sum each vector component's derivative in its matching coordinate direction to measure local net outflow density.",
    ],
    String.raw`\nabla\cdot F=\sum_i\partial_i F_i=\operatorname{tr}(J_F)`,
    [
      "散度输入向量场、输出标量场。正散度像局部源，负散度像局部汇。",
      "Divergence maps a vector field to a scalar field; positive values indicate a local source, negative values a sink.",
    ],
    String.raw`F=(x,y,z):\quad\nabla\cdot F=3`,
  ),
  concept(
    "curl",
    "nabla",
    ["旋度", "Curl"],
    [
      "三维向量场局部环流的密度，方向由右手规则确定。",
      "The local circulation density of a three-dimensional vector field, oriented by the right-hand rule.",
    ],
    String.raw`\nabla\times F=(\partial_y F_z-\partial_z F_y,\ \partial_z F_x-\partial_x F_z,\ \partial_x F_y-\partial_y F_x)^T`,
    [
      "这里用三维旋度。无旋不自动保证全局存在势函数，还要考虑定义域的拓扑条件。",
      "This is the three-dimensional curl. Curl-free does not automatically imply a global potential; domain topology matters.",
    ],
    String.raw`F=(-y,x,0):\quad\nabla\times F=(0,0,2)`,
  ),
  concept(
    "laplacian",
    "nabla",
    ["拉普拉斯算子", "Laplacian"],
    [
      "梯度再取散度，把各坐标方向的二阶变化相加；在扩散与平滑问题中出现。",
      "Divergence of the gradient sums second-order changes across coordinate directions and appears in diffusion and smoothing.",
    ],
    String.raw`\Delta f=\nabla\cdot\nabla f=\sum_i\partial_i^2 f=\operatorname{tr}(H_f)`,
    [
      "本文采用正的二阶偏导和约定，部分文献采用其负号。它是标量，不是 Hessian 矩阵。",
      "We use the sum-of-second-partials sign convention; some texts use its negative. The result is a scalar, not the Hessian matrix.",
    ],
    String.raw`f=x^2+y^2+z^2:\quad\Delta f=6`,
  ),
  concept(
    "stokes",
    "nabla",
    ["通量、环流与积分定理", "Flux, circulation & theorems"],
    [
      "散度定理和 Stokes 定理把区域内部的微分量与边界上的流量或环流联系起来。",
      "The divergence and Stokes theorems relate interior differential quantities to boundary flux or circulation.",
    ],
    String.raw`\int_V\nabla\cdot F\,dV=\int_{\partial V}F\cdot n\,dS`,
    [
      "假定向量场足够光滑、边界分片光滑；散度定理取外法向，Stokes 的边界方向须与法向一致。",
      "Assume sufficient smoothness and piecewise smooth boundaries. Use outward normals for divergence and compatible orientations for Stokes.",
    ],
    String.raw`\int_S(\nabla\times F)\cdot n\,dS=\oint_{\partial S}F\cdot dr`,
  ),

  concept(
    "matrix-differential",
    "matrix-calculus",
    ["矩阵的微分", "Matrix differentials"],
    [
      "把矩阵整体作为变量，用线性映射作用于矩阵扰动；无需先把所有元素摊平。",
      "Treat a matrix as one variable and apply a linear derivative map to its perturbation, without first flattening all entries.",
    ],
    String.raw`F(X+H)=F(X)+DF(X)[H]+o(\|H\|_F)`,
    [
      "微分可使用乘法法则，但要保留矩阵乘法顺序。一般 XH 与 HX 不相等。",
      "The product rule still applies, but matrix order matters: XH and HX generally differ.",
    ],
    String.raw`d(X^2)=X\,dX+(dX)X`,
  ),
  concept(
    "frobenius",
    "matrix-calculus",
    ["Frobenius 内积与梯度", "Frobenius gradient"],
    [
      "用逐元素乘积之和定义矩阵内积，把标量函数的微分写成矩阵梯度与扰动的内积。",
      "Use the entrywise product sum as a matrix inner product, representing a scalar differential by a matrix gradient.",
    ],
    String.raw`df=\langle\nabla_X f,dX\rangle_F=\operatorname{tr}((\nabla_X f)^T dX)`,
    [
      "梯度与 X 形状相同。先将微分整理成 tr(GᵀdX)，再读出 G，能减少转置错误。",
      "The gradient has the same shape as X. Arrange the differential as tr(GᵀdX), then read off G.",
    ],
    String.raw`f=\tfrac12\|X\|_F^2\quad\Rightarrow\quad\nabla_X f=X`,
  ),
  concept(
    "quadratic",
    "matrix-calculus",
    ["二次型求导", "Quadratic-form derivatives"],
    [
      "二次型的微分包含左右两个变量位置的贡献，是理解转置和对称性的基础例子。",
      "Differentiating a quadratic form collects contributions from both occurrences of the variable, exposing the role of transposes and symmetry.",
    ],
    String.raw`\nabla_x(x^TAx)=(A+A^T)x`,
    [
      "A 为常矩阵。只有 A 对称时才能简写成 2Ax。",
      "A is constant. Only symmetric A allows the simplification to 2Ax.",
    ],
    String.raw`d(x^TAx)=(dx)^TAx+x^TA\,dx`,
  ),
  concept(
    "least-squares",
    "matrix-calculus",
    ["最小二乘梯度", "Least-squares gradients"],
    [
      "对残差平方和求导，连接线性代数的投影与机器学习的损失最小化。",
      "Differentiate squared residuals to connect linear-algebra projections with loss minimization.",
    ],
    String.raw`L(X)=\tfrac12\|AX-B\|_F^2,\qquad\nabla_X L=A^T(AX-B)`,
    [
      "A、B 固定且维度相容。A 列满秩时解唯一；计算时通常用 QR 或 SVD，避免显式求逆。",
      "A and B are fixed with compatible shapes. Full column rank of A gives uniqueness; QR or SVD avoids explicit inversion.",
    ],
    String.raw`\nabla_X L=0\quad\Rightarrow\quad A^TAX=A^TB`,
  ),
  concept(
    "inverse",
    "matrix-calculus",
    ["逆矩阵的微分", "Inverse differential"],
    [
      "从 XX⁻¹=I 两边微分，再按顺序左乘逆矩阵，得到逆运算的变化规律。",
      "Differentiate XX⁻¹=I and multiply in order to obtain the differential of inversion.",
    ],
    String.raw`d(X^{-1})=-X^{-1}(dX)X^{-1}`,
    [
      "X 必须可逆。不要把矩阵公式压成 -X⁻²dX，除非相关因子可交换。",
      "X must be invertible. Do not replace this by -X⁻²dX unless the factors commute.",
    ],
    String.raw`dX\,X^{-1}+X\,d(X^{-1})=0`,
  ),
  concept(
    "logdet",
    "matrix-calculus",
    ["log det 的微分", "Log-determinant differential"],
    [
      "行列式衡量体积，取对数将乘法变成加法；微分转化成迹形式。",
      "The determinant measures volume, while its logarithm turns products into sums; its differential becomes a trace.",
    ],
    String.raw`d\log\det X=\operatorname{tr}(X^{-1}dX),\qquad\nabla_X\log\det X=X^{-T}`,
    [
      "实数情形需 det X>0；常用于正定矩阵。若采用 log|det X|，公式可扩展到所有可逆实矩阵。",
      "For a real logarithm require det X>0, often with positive definite X. Using log|det X| extends the formula to all invertible real matrices.",
    ],
    String.raw`\log\det\operatorname{diag}(a,b)=\log a+\log b\quad(a,b>0)`,
  ),
  concept(
    "vjp",
    "matrix-calculus",
    ["JVP / VJP", "JVP / VJP"],
    [
      "只计算 Jacobian 与向量的乘积，避免显式构建大型 Jacobian。正向传扰动，反向传输出的梯度。",
      "Compute Jacobian-vector products without materializing large Jacobians: forward mode carries perturbations, reverse mode carries output gradients.",
    ],
    String.raw`\operatorname{JVP}(v)=J_fv,\qquad\operatorname{VJP}(u)=J_f^Tu`,
    [
      "按列向量约定写 VJP。标量损失对大量参数求导时，反向模式通常更合适。",
      "VJP is written using column vectors. Reverse mode usually suits scalar losses with many parameters.",
    ],
    String.raw`f(x)=Ax:\quad\operatorname{VJP}(u)=A^Tu`,
  ),

  concept(
    "group",
    "groups",
    ["群与对称性", "Groups & symmetry"],
    [
      "可组合、可逆的对称操作形成群：运算封闭，满足结合律，具有单位元与逆元。",
      "Composable, reversible symmetries form a group: closure, associativity, an identity and inverses.",
    ],
    String.raw`(ab)c=a(bc),\quad eg=ge=g,\quad gg^{-1}=g^{-1}g=e`,
    [
      "群运算不要求交换。一般旋转的组合顺序会影响结果。",
      "Commutativity is not required. The order of general rotations affects their composition.",
    ],
    String.raw`(\mathbb Z,+),\qquad GL(n,\mathbb R)`,
  ),
  concept(
    "subgroup",
    "groups",
    ["子群与陪集", "Subgroups & cosets"],
    [
      "群内仍构成群的子集是子群；陪集把群按照子群的平移划分。",
      "A subgroup is a subset that forms a group under the same operation; cosets partition the group by its translates.",
    ],
    String.raw`gH=\{gh:h\in H\},\qquad |G|=[G:H]|H|\quad(G\text{ finite})`,
    [
      "子群不一定正规；只有正规子群才能用通常的陪集乘法形成商群。",
      "Subgroups need not be normal; the usual coset multiplication gives a quotient group only for normal subgroups.",
    ],
    String.raw`\mathbb Z/2\mathbb Z=\{\text{even},\text{odd}\}`,
  ),
  concept(
    "homomorphism",
    "groups",
    ["同态与商群", "Homomorphisms & quotients"],
    [
      "同态保持群的乘法结构。核刻画被映射压成单位元的部分，并形成正规子群。",
      "A homomorphism preserves multiplication. Its kernel is the normal subgroup collapsed to the identity.",
    ],
    String.raw`\phi(gh)=\phi(g)\phi(h),\qquad G/\ker\phi\cong\operatorname{im}\phi`,
    [
      "同构是双射同态，表示两个群具有相同的代数结构。",
      "An isomorphism is a bijective homomorphism, identifying the same abstract group structure.",
    ],
    String.raw`\det:GL(n,\mathbb R)\to\mathbb R^\times`,
  ),
  concept(
    "group-action",
    "groups",
    ["群作用与轨道", "Group actions & orbits"],
    [
      "群通过变换作用于对象集合；轨道收集一个对象经过这些变换能到达的所有对象。",
      "A group acts by transformations on a set; an orbit collects everything reachable from an object under the action.",
    ],
    String.raw`e\cdot x=x,\qquad(gh)\cdot x=g\cdot(h\cdot x)`,
    [
      "旋转点云、平移图像、置换图节点都能用群作用描述，但具体任务保留的对称性不同。",
      "Rotating point clouds, translating images and permuting graph nodes are actions; tasks preserve different symmetries.",
    ],
    String.raw`G\cdot x=\{g\cdot x:g\in G\}`,
  ),
  concept(
    "representation",
    "groups",
    ["群表示", "Group representations"],
    [
      "用向量空间上的可逆线性变换表示群元素，把抽象组合规则变成矩阵乘法。",
      "Represent group elements by invertible linear maps, turning abstract composition into matrix multiplication.",
    ],
    String.raw`\rho:G\to GL(V),\qquad\rho(gh)=\rho(g)\rho(h)`,
    [
      "群表示是群在线性空间上的一种作用，不是机器学习里任意的“特征表示”。",
      "A group representation is a linear group action, not an arbitrary learned feature representation.",
    ],
    String.raw`\rho(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}`,
  ),
  concept(
    "lie-group",
    "groups",
    ["李群与旋转群", "Lie groups & rotations"],
    [
      "李群兼有群结构与光滑流形结构，乘法和求逆都光滑；旋转群是重要例子。",
      "A Lie group is a smooth manifold with smooth multiplication and inversion; rotation groups are key examples.",
    ],
    String.raw`SO(n)=\{R\in\mathbb R^{n\times n}:R^TR=I,\ \det R=1\}`,
    [
      "需要补充光滑流形概念。SO(3) 描述三维旋转，任意两个旋转通常不交换。",
      "Smooth-manifold foundations are needed. SO(3) describes three-dimensional rotations, which generally do not commute.",
    ],
    String.raw`R^{-1}=R^T\quad(R\in SO(n))`,
  ),
  concept(
    "lie-algebra",
    "groups",
    ["李代数与指数映射", "Lie algebras & exponential"],
    [
      "李代数在单位元附近线性化李群；对矩阵李群，括号由矩阵交换子给出。",
      "A Lie algebra linearizes a Lie group near its identity; matrix Lie groups use the matrix commutator as their bracket.",
    ],
    String.raw`[A,B]=AB-BA,\qquad\mathfrak{so}(n)=\{A:A^T=-A\}`,
    [
      "矩阵指数把无穷小旋转映为旋转。指数映射在零点附近给出局部坐标，但不保证全局一一对应。",
      "Matrix exponentials turn infinitesimal rotations into rotations. They give local coordinates near zero, not a global one-to-one parametrization.",
    ],
    String.raw`A^T=-A\quad\Rightarrow\quad e^A\in SO(n)`,
  ),

  concept(
    "probability",
    "ai-foundations",
    ["概率与随机变量", "Probability & random variables"],
    [
      "随机变量是概率空间上的可测函数；分布描述它的取值如何分配概率。",
      "A random variable is a measurable function on a probability space; its distribution describes the allocation of probability to values.",
    ],
    String.raw`P(X\in A)=\int_A p(x)\,dx\quad\text{(when a density exists)}`,
    [
      "概率密度不是单点概率，密度数值可以大于 1，但全空间积分必须为 1。",
      "A density is not a point probability and can exceed one, while its integral over the space must be one.",
    ],
    String.raw`p(x)=2\quad(0\le x\le\tfrac12)`,
  ),
  concept(
    "expectation",
    "ai-foundations",
    ["期望与协方差", "Expectation & covariance"],
    [
      "期望是按概率加权的平均；协方差矩阵描述各方向的波动与共同变化。",
      "Expectation is a probability-weighted average; covariance records directional variation and co-variation.",
    ],
    String.raw`\mu=\mathbb E[X],\qquad\operatorname{Cov}(X)=\mathbb E[(X-\mu)(X-\mu)^T]`,
    [
      "需存在相应矩。协方差矩阵半正定；零协方差通常不等于独立。",
      "Relevant moments must exist. Covariance matrices are positive semidefinite; zero covariance usually does not imply independence.",
    ],
    String.raw`v^T\operatorname{Cov}(X)v=\operatorname{Var}(v^TX)\ge0`,
  ),
  concept(
    "bayes",
    "ai-foundations",
    ["条件概率与贝叶斯", "Conditioning & Bayes"],
    [
      "用观测证据更新先验，把条件概率的两个方向联系起来。",
      "Update a prior using evidence, connecting the two directions of conditional probability.",
    ],
    String.raw`P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}\quad(P(B)>0)`,
    [
      "后验同时依赖似然与先验；连续模型使用密度的对应形式。",
      "The posterior depends on both likelihood and prior; continuous models use the corresponding density formula.",
    ],
    String.raw`p(\theta\mid D)\propto p(D\mid\theta)p(\theta)`,
  ),
  concept(
    "likelihood",
    "ai-foundations",
    ["似然与参数估计", "Likelihood & estimation"],
    [
      "把观测固定，选择使它们的联合概率或密度最大的参数。",
      "Hold observations fixed and choose parameters maximizing their joint probability or density.",
    ],
    String.raw`\hat\theta=\arg\min_\theta\left[-\sum_i\log p_\theta(x_i)\right]\quad\text{(i.i.d.)}`,
    [
      "似然是参数的函数，不自动是参数上的概率分布。独立同分布假设才允许直接拆成样本项之和。",
      "Likelihood is a function of parameters, not automatically a distribution over them. The displayed sum assumes i.i.d. observations.",
    ],
    String.raw`x_i\sim\mathcal N(\mu,\sigma^2):\quad\hat\mu=\frac1n\sum_i x_i`,
  ),
  concept(
    "entropy",
    "ai-foundations",
    ["熵、交叉熵与 KL", "Entropy, cross-entropy & KL"],
    [
      "熵衡量离散分布的不确定性；交叉熵和 KL 散度描述用另一个分布建模的代价。",
      "Entropy measures uncertainty of a discrete distribution; cross-entropy and KL quantify the cost of modeling it with another distribution.",
    ],
    String.raw`H(p,q)=-\sum_i p_i\log q_i=H(p)+D_{\mathrm{KL}}(p\|q)`,
    [
      "若 p_i>0 而 q_i=0，代价为无穷；约定 0 log 0=0。KL 不对称，不是距离度量。",
      "If p_i>0 but q_i=0 the cost is infinite; use 0 log 0=0. KL is asymmetric and is not a metric.",
    ],
    String.raw`p=e_k:\quad H(p,q)=-\log q_k`,
  ),
  concept(
    "convex",
    "ai-foundations",
    ["凸性与优化", "Convexity & optimization"],
    [
      "凸函数在任意两点之间不高于连线；在凸可行域上，局部极小也是全局极小。",
      "A convex function lies below each chord; over a convex feasible set every local minimum is global.",
    ],
    String.raw`f(tx+(1-t)y)\le tf(x)+(1-t)f(y),\quad t\in[0,1]`,
    [
      "二阶可微函数在开凸域内，Hessian 处处半正定等价于凸。神经网络训练通常不是凸优化。",
      "For C² functions on open convex domains, a positive semidefinite Hessian everywhere characterizes convexity. Neural-network training is usually nonconvex.",
    ],
    String.raw`f(x)=\tfrac12\|Ax-b\|^2:\quad H_f=A^TA\succeq0`,
  ),
  concept(
    "gradient-descent",
    "ai-foundations",
    ["梯度下降", "Gradient descent"],
    [
      "沿负梯度更新参数，利用局部一阶信息降低损失。",
      "Update parameters along the negative gradient to reduce a loss using local first-order information.",
    ],
    String.raw`\theta_{t+1}=\theta_t-\eta\nabla L(\theta_t)`,
    [
      "步长过大会使损失上升。即使每步下降，也不意味着在非凸问题中找到全局最优。",
      "Too large a step can increase loss. Descent alone does not guarantee a global optimum in nonconvex problems.",
    ],
    String.raw`L=\tfrac12\theta^2:\quad\theta_{t+1}=(1-\eta)\theta_t`,
  ),
  {
    ...concept(
      "backprop",
      "ai-foundations",
      ["反向传播", "Backpropagation"],
      [
        "在计算图上从损失向输入反向应用链式法则，复用中间结果并累加多条路径的贡献。",
        "Apply the chain rule backward through a computation graph, reusing intermediates and summing contributions from multiple paths.",
      ],
      String.raw`a_{\ell+1}=f_\ell(a_\ell):\quad\nabla_{a_\ell}L=J_{f_\ell}^T\nabla_{a_{\ell+1}}L`,
      [
        "反向传播计算导数，优化器才更新参数；不是同一操作。不可微点由框架采用约定的局部规则。",
        "Backpropagation computes derivatives; an optimizer updates parameters. At nonsmooth points frameworks use specified local rules.",
      ],
      String.raw`y=Wx:\quad\nabla_W L=(\nabla_y L)x^T`,
    ),
    href: "/learning/deep-learning",
  },
  concept(
    "pca",
    "ai-foundations",
    ["PCA 与低秩表示", "PCA & low-rank models"],
    [
      "对中心化数据寻找方差最大的正交方向，可用协方差特征分解或数据矩阵 SVD 实现。",
      "Find orthogonal directions of maximal variance in centered data, using covariance eigenvectors or the data matrix's SVD.",
    ],
    String.raw`X_c=U\Sigma V^T,\qquad Z=X_cV_k`,
    [
      "这里每行是一个样本。必须先说明是否中心化、标准化；两者对结果影响不同。",
      "Rows are samples here. Centering and standardizing are different operations and affect results differently.",
    ],
    String.raw`\frac1{N-1}X_c^TX_c=V\frac{\Sigma^T\Sigma}{N-1}V^T`,
  ),
  {
    ...concept(
      "equivariance",
      "ai-foundations",
      ["不变性与等变性", "Invariance & equivariance"],
      [
        "不变性要求变换输入后输出不变；等变性要求输出按对应的群作用一起变化。",
        "Invariance keeps output unchanged under input transformations; equivariance makes output transform under the corresponding action.",
      ],
      String.raw`f(\rho_{\rm in}(g)x)=\rho_{\rm out}(g)f(x)`,
      [
        "分类常需要不变性，位置或方向预测常需要等变性。输出作用为恒等时，等变性退化为不变性。",
        "Classification often needs invariance; position or orientation prediction often needs equivariance. A trivial output action gives invariance.",
      ],
      String.raw`\rho_{\rm out}(g)=I\quad\Rightarrow\quad f(\rho_{\rm in}(g)x)=f(x)`,
    ),
    sources: ["gdl", "representation"],
  },
  concept(
    "softmax",
    "ai-foundations",
    ["Softmax 与交叉熵梯度", "Softmax & loss gradient"],
    [
      "把实数 logits 映成概率向量，与交叉熵结合后得到简洁的训练梯度。",
      "Map real logits to a probability vector; combining with cross-entropy yields a simple training gradient.",
    ],
    String.raw`p_i=\frac{e^{z_i}}{\sum_j e^{z_j}},\quad J_p=\operatorname{diag}(p)-pp^T`,
    [
      "对和为 1 的目标分布 y，交叉熵对 logits 的梯度为 p−y。数值计算先减去最大 logit 避免溢出。",
      "For a target distribution y summing to one, cross-entropy has logit gradient p−y. Subtract the maximum logit for numerical stability.",
    ],
    String.raw`L=-\sum_i y_i\log p_i:\quad\nabla_z L=p-y`,
  ),
];

const prerequisites: readonly [string, string][] = [
  ["limit", "continuity"],
  ["continuity", "derivative"],
  ["derivative", "integral"],
  ["limit", "series"],
  ["series", "uniform"],
  ["derivative", "taylor"],
  ["vector-space", "linear-map"],
  ["vector-space", "inner-product"],
  ["linear-map", "eigen"],
  ["inner-product", "svd"],
  ["eigen", "svd"],
  ["eigen", "positive-definite"],
  ["linear-map", "trace"],
  ["linear-map", "determinant"],
  ["derivative", "partial"],
  ["partial", "total"],
  ["linear-map", "total"],
  ["total", "jacobian"],
  ["jacobian", "chain"],
  ["partial", "hessian"],
  ["taylor", "hessian"],
  ["gradient", "directional"],
  ["integral", "change-variables"],
  ["jacobian", "change-variables"],
  ["determinant", "change-variables"],
  ["gradient", "lagrange"],
  ["partial", "nabla"],
  ["nabla", "gradient"],
  ["total", "gradient"],
  ["inner-product", "gradient"],
  ["nabla", "divergence"],
  ["nabla", "curl"],
  ["gradient", "laplacian"],
  ["divergence", "laplacian"],
  ["divergence", "stokes"],
  ["curl", "stokes"],
  ["change-variables", "stokes"],
  ["total", "matrix-differential"],
  ["linear-map", "matrix-differential"],
  ["matrix-differential", "frobenius"],
  ["trace", "frobenius"],
  ["inner-product", "frobenius"],
  ["frobenius", "quadratic"],
  ["frobenius", "least-squares"],
  ["chain", "least-squares"],
  ["matrix-differential", "inverse"],
  ["inverse", "logdet"],
  ["determinant", "logdet"],
  ["trace", "logdet"],
  ["jacobian", "vjp"],
  ["chain", "vjp"],
  ["group", "subgroup"],
  ["subgroup", "homomorphism"],
  ["group", "group-action"],
  ["group-action", "representation"],
  ["homomorphism", "representation"],
  ["linear-map", "representation"],
  ["group", "lie-group"],
  ["determinant", "lie-group"],
  ["lie-group", "lie-algebra"],
  ["matrix-differential", "lie-algebra"],
  ["integral", "probability"],
  ["probability", "expectation"],
  ["probability", "bayes"],
  ["probability", "likelihood"],
  ["probability", "entropy"],
  ["hessian", "convex"],
  ["positive-definite", "convex"],
  ["gradient", "gradient-descent"],
  ["vjp", "backprop"],
  ["expectation", "pca"],
  ["svd", "pca"],
  ["representation", "equivariance"],
  ["chain", "softmax"],
  ["entropy", "softmax"],
];
const connections: readonly [string, string][] = [
  ["uniform", "integral"],
  ["taylor", "series"],
  ["jacobian", "gradient"],
  ["hessian", "laplacian"],
  ["trace", "divergence"],
  ["matrix-differential", "jacobian"],
  ["least-squares", "convex"],
  ["least-squares", "svd"],
  ["logdet", "likelihood"],
  ["bayes", "likelihood"],
  ["likelihood", "entropy"],
  ["gradient-descent", "backprop"],
  ["lie-algebra", "equivariance"],
  ["softmax", "backprop"],
  ["lagrange", "convex"],
  ["quadratic", "hessian"],
];
export const mathMapEdges: readonly MathMapEdge[] = [
  ...prerequisites.map(([source, target]) => ({
    source,
    target,
    kind: "prereq" as const,
  })),
  ...connections.map(([source, target]) => ({
    source,
    target,
    kind: "related" as const,
  })),
];

export const mathMapPaths = [
  {
    id: "differentiation",
    label: { zh: "从导数到反向传播", en: "Derivatives → backprop" },
    description: {
      zh: "先把导数看作线性映射，再学会反向传递梯度。",
      en: "Read derivatives as linear maps, then propagate gradients backward.",
    },
    nodes: [
      "derivative",
      "partial",
      "total",
      "jacobian",
      "chain",
      "vjp",
      "backprop",
    ],
  },
  {
    id: "matrix",
    label: { zh: "矩阵损失怎么求导", en: "Differentiate a matrix loss" },
    description: {
      zh: "从矩阵扰动出发，用 Frobenius 内积读出梯度。",
      en: "Start with matrix perturbations; read gradients through the Frobenius inner product.",
    },
    nodes: [
      "linear-map",
      "total",
      "matrix-differential",
      "frobenius",
      "least-squares",
      "gradient-descent",
    ],
  },
  {
    id: "operators",
    label: { zh: "读懂 ∇ 的几种用法", en: "Read the ∇ operators" },
    description: {
      zh: "逐个核对输入与输出：标量、向量，还是线性映射？",
      en: "Check the input and output types: scalar, vector or linear map?",
    },
    nodes: [
      "partial",
      "nabla",
      "gradient",
      "divergence",
      "curl",
      "laplacian",
      "stokes",
    ],
  },
  {
    id: "symmetry",
    label: { zh: "从群到等变网络", en: "Groups → equivariant models" },
    description: {
      zh: "从变换的组合规则，走到模型应遵守的对称性。",
      en: "Move from transformation composition to symmetry constraints on models.",
    },
    nodes: [
      "group",
      "subgroup",
      "homomorphism",
      "group-action",
      "representation",
      "lie-group",
      "lie-algebra",
      "equivariance",
    ],
  },
];

export function mathMapNode(id: string) {
  return mathMapNodes.find((node) => node.id === id);
}
export function mathMapNeighbors(id: string) {
  return mathMapEdges
    .filter((edge) => edge.source === id || edge.target === id)
    .map((edge) => ({
      node: mathMapNode(edge.source === id ? edge.target : edge.source)!,
      edge,
    }));
}

// Compact labels keep the overview readable; detail cards retain full titles.
const shortLabels: Record<string, Localized> = {
  limit: { zh: "极限与完备性", en: "Limits" },
  integral: { zh: "积分 · FTC", en: "Integral · FTC" },
  derivative: { zh: "导数与中值定理", en: "Derivative · MVT" },
  "vector-space": { zh: "向量空间与基", en: "Vector space" },
  "linear-map": { zh: "线性映射", en: "Linear maps" },
  "inner-product": { zh: "内积与投影", en: "Inner products" },
  eigen: { zh: "特征值", en: "Eigenvalues" },
  svd: { zh: "奇异值分解", en: "SVD" },
  "positive-definite": { zh: "正定矩阵", en: "Positive definite" },
  trace: { zh: "迹", en: "Trace" },
  determinant: { zh: "行列式", en: "Determinant" },
  total: { zh: "全微分", en: "Total differential" },
  hessian: { zh: "Hessian", en: "Hessian" },
  taylor: { zh: "泰勒与余项", en: "Taylor & remainder" },
  chain: { zh: "链式法则", en: "Chain rule" },
  "change-variables": { zh: "多重积分与换元", en: "Change of variables" },
  lagrange: { zh: "拉格朗日乘子", en: "Lagrange multipliers" },
  nabla: { zh: "∇ · nabla", en: "∇ · nabla" },
  stokes: { zh: "通量与积分定理", en: "Integral theorems" },
  frobenius: { zh: "Frobenius 梯度", en: "Frobenius gradient" },
  quadratic: { zh: "二次型求导", en: "Quadratic forms" },
  "least-squares": { zh: "最小二乘", en: "Least squares" },
  logdet: { zh: "log det", en: "Log determinant" },
  group: { zh: "群", en: "Groups" },
  subgroup: { zh: "子群与陪集", en: "Subgroups & cosets" },
  homomorphism: { zh: "同态与商群", en: "Homomorphisms" },
  "group-action": { zh: "群作用", en: "Group actions" },
  "lie-group": { zh: "李群与旋转", en: "Lie groups" },
  "lie-algebra": { zh: "李代数", en: "Lie algebras" },
  probability: { zh: "概率与随机变量", en: "Probability" },
  expectation: { zh: "期望与协方差", en: "Mean & covariance" },
  bayes: { zh: "贝叶斯", en: "Bayes" },
  likelihood: { zh: "似然估计", en: "Likelihood" },
  entropy: { zh: "熵与 KL", en: "Entropy & KL" },
  convex: { zh: "凸优化", en: "Convexity" },
  pca: { zh: "PCA", en: "PCA" },
  equivariance: { zh: "不变与等变", en: "Equivariance" },
  softmax: { zh: "Softmax", en: "Softmax" },
};
export function mathMapLabel(node: AtlasNode, locale: "zh" | "en") {
  return (
    node.shortLabel?.[locale] ??
    shortLabels[node.id]?.[locale] ??
    node.label[locale]
  );
}
