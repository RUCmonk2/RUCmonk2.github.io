# AI知识网络：四域基础节点来源与先修说明

核查日期：2026-10-19。对应 `src/data/ai-atlas/foundations.ts`，56节点，数学、概率、优化、计算各14。节点ID按固定范围文件核对；正文、算例与掌握标准独立编写，引用用于进一步学习，没有摘抄教材段落。

## 覆盖与课程定位

共同主干既包括概念，也包括能执行的检查：维度核算、数值误差、概率条件、统计覆盖率、优化日志、数据查询、测试和运行环境。每个节点保留两条可操作掌握标准，并给出具体算例或实验。摘要约60字，不以大量名词替代解释。

以下四项为方向进阶，`scope: specialist`：

- information-geometry：研究层次的信息几何和自然梯度。
- duality-kkt：凸优化方向的对偶与最优性条件。
- second-order：Newton、拟Newton和曲率方法。
- proximal-methods：非光滑、稀疏或结构化问题的近端算法。

“specialist”表示不默认所有方向都须先学，不能解释为不重要。基础/核心/研究层次与共同/方向范围是两条独立标记。

## 先修结构

- 向量 → 线性映射/内积 → 秩与谱 → SVD及矩阵分解。
- 导数 → 多元微分 → 链式法则/Taylor；链式法则与Python共同指向自动微分。
- 概率规则 → 随机变量与条件概率 → 矩、分布、独立性 → 估计与极限定理 → 区间和检验。
- 目标函数与梯度 → 梯度下降 → 随机梯度 → 动量/Adam、调度与诊断；约束、对偶、二阶和近端为有条件的扩展。
- Python → 数组与数据结构 → 算法及计算体系 → 操作系统、数值表示、网络与并行。
- 计算中的浮点表示指向数学中的数值稳定性，再与自动微分汇合为数值梯度检查；没有反向依赖。
- 100条先修边全部位于这56个ID内部，已验证无环。ML、DL、因果、语言、视觉、强化学习、系统等应用只放在 `related`，避免跨组反向环。

先修边表示建议的理解依赖，非对所有教学路径的唯一规定。词义重复或概念相关不足以自动成为先修。

## 来源核查

主要来源均已通过网页工具打开核对，优先采用原课程、教材作者网站、原始论文和软件官方文档：MIT OCW、Stanford/Berkeley课程、Harvard Stat110、Wasserman课程、Boyd与Vandenberghe、MML作者站、PyTorch/JAX/NumPy/Python/PostgreSQL/pytest/Git文档等。

- Harvard Stat110旧域名已重定向，数据采用当前规范入口。
- 软件文档使用官方稳定入口，不把当前页面版本号写成长期不变的概念事实。
- 未把访问失败的Art Owen页面或Nocedal图书页加入节点来源；相关内容改由已核对的概率课程、Bottou等原始综述与凸优化作者站支撑。
- 自动微分与梯度检查采用JAX cookbook和PyTorch教程；未依赖仅返回重定向而未呈现正文的gradcheck旧入口。

### 数学

| ID                     | 节点                      | 层次 / 范围           | 参考资料                                                                                                                                                                                                  |
| ---------------------- | ------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vectors-matrices       | 向量与矩阵                | foundation / shared   | [Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)；[MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)         |
| linear-maps            | 线性映射与基变换          | foundation / shared   | [MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)；[Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)         |
| rank-nullspace         | 秩、零空间与可辨识性      | foundation / shared   | [MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)；[Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)         |
| inner-products         | 内积、范数与正交投影      | foundation / shared   | [Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)；[MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)         |
| eigenvalues            | 特征值与谱分解            | foundation / shared   | [MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)   |
| svd                    | 奇异值分解与低秩近似      | core / shared         | [MIT 18.06 · Gilbert Strang, Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)   |
| matrix-factorization   | 矩阵分解与线性求解        | core / shared         | [Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)                          |
| derivatives            | 导数与局部线性近似        | foundation / shared   | [Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)；[MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/) |
| multivariable-calculus | 多元微分、梯度与Jacobian  | foundation / shared   | [MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/) |
| chain-rule             | 链式法则与计算图          | foundation / shared   | [MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/) |
| taylor-hessian         | Taylor展开、Hessian与曲率 | core / shared         | [MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/) |
| integrals              | 积分、累积与变量替换      | foundation / shared   | [MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/) |
| numerical-stability    | 条件数、误差与数值稳定性  | core / shared         | [David Goldberg · Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)；[Boyd & Vandenberghe · Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)       |
| information-geometry   | 信息几何与自然梯度        | research / specialist | [Amari · Natural Gradient Works Efficiently in Learning](https://doi.org/10.1162/089976698300017746)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)          |

### 概率与统计

| ID                      | 节点                       | 层次 / 范围         | 参考资料                                                                                                                                                                                                                  |
| ----------------------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| probability-rules       | 概率空间与基本规则         | foundation / shared | [Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)                       |
| random-variables        | 随机变量、分布与密度       | foundation / shared | [Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)；[Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)                       |
| expectation-variance    | 期望、方差与协方差         | foundation / shared | [Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)                       |
| conditional-probability | 条件概率与联合分布         | foundation / shared | [Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)；[Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)                       |
| bayes-rule              | 贝叶斯公式与基准率         | foundation / shared | [Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)；[Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)                       |
| common-distributions    | 常见分布与建模假设         | foundation / shared | [Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)；[Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)                       |
| multivariate-gaussian   | 多元高斯与协方差结构       | core / shared       | [Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)        |
| independence            | 独立、相关与采样依赖       | foundation / shared | [Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)                       |
| lln-clt                 | 大数定律与中心极限定理     | core / shared       | [Harvard Stat 110 · Joseph Blitzstein](https://stat110.hsites.harvard.edu/)；[Larry Wasserman · CMU 36-705 Intermediate Statistics](https://www.stat.cmu.edu/~larry/=stat705/)                                            |
| estimation              | 参数估计与似然             | core / shared       | [Larry Wasserman · CMU 36-705 Intermediate Statistics](https://www.stat.cmu.edu/~larry/=stat705/)；[Deisenroth, Faisal & Ong · Mathematics for Machine Learning](https://mml-book.github.io/)                             |
| hypothesis-tests        | 假设检验、效应量与多重比较 | core / shared       | [Larry Wasserman · CMU 36-705 Intermediate Statistics](https://www.stat.cmu.edu/~larry/=stat705/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/) |
| confidence-intervals    | 置信区间与覆盖率           | core / shared       | [Larry Wasserman · CMU 36-705 Intermediate Statistics](https://www.stat.cmu.edu/~larry/=stat705/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/) |
| entropy-kl              | 熵、交叉熵与KL散度         | core / shared       | [Stanford EE376A · Information Theory](https://web.stanford.edu/class/ee376a/)；[Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)                    |
| monte-carlo             | Monte Carlo估计与误差      | core / shared       | [Chris Piech · Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)；[Larry Wasserman · CMU 36-705 Intermediate Statistics](https://www.stat.cmu.edu/~larry/=stat705/) |

### 优化

| ID                        | 节点                         | 层次 / 范围           | 参考资料                                                                                                                                                                                                           |
| ------------------------- | ---------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| objective-functions       | 目标函数、风险与正则项       | foundation / shared   | [Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)；[Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)                                      |
| convexity                 | 凸集、凸函数与全局最优       | core / shared         | [Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                          |
| gradient-descent          | 梯度下降与迭代更新           | core / shared         | [Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)；[Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)                          |
| stochastic-gradients      | 随机梯度与小批量             | core / shared         | [Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                       |
| momentum-adam             | 动量、Adam与自适应更新       | core / shared         | [Kingma & Ba · Adam](https://arxiv.org/abs/1412.6980)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                                                         |
| learning-rate             | 学习率与调度                 | core / shared         | [Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)；[Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)                       |
| constrained-optimization  | 约束优化与投影               | core / shared         | [Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                          |
| duality-kkt               | 对偶、KKT与最优性条件        | core / specialist     | [Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)                                                                                                                               |
| second-order              | Newton、拟Newton与曲率预条件 | core / specialist     | [Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)；[Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)                                      |
| proximal-methods          | 近端方法与非光滑优化         | research / specialist | [Parikh & Boyd · Proximal Algorithms](https://web.stanford.edu/~boyd/papers/prox_algs.html)；[Boyd & Vandenberghe · Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)                                  |
| nonconvex-optimization    | 非凸目标、驻点与鞍点         | core / shared         | [Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                       |
| automatic-differentiation | 自动微分与向量积             | core / shared         | [PyTorch · Automatic Differentiation](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)；[JAX · The Autodiff Cookbook](https://docs.jax.dev/en/latest/notebooks/autodiff_cookbook.html) |
| numerical-gradient-check  | 数值梯度校验                 | core / shared         | [JAX · The Autodiff Cookbook](https://docs.jax.dev/en/latest/notebooks/autodiff_cookbook.html)；[David Goldberg · Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)      |
| optimization-diagnostics  | 优化诊断与故障定位           | core / shared         | [Bottou, Curtis & Nocedal · Large-Scale Optimization](https://arxiv.org/abs/1606.04838)；[Dive into Deep Learning · Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html)                       |

### 计算基础

| ID                         | 节点                        | 层次 / 范围         | 参考资料                                                                                                                                                                                                |
| -------------------------- | --------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| python-programming         | Python程序与数据对象        | foundation / shared | [Python · Official Tutorial](https://docs.python.org/3/tutorial/)                                                                                                                                       |
| array-computing            | 数组、张量与向量化          | foundation / shared | [NumPy · Array Fundamentals](https://numpy.org/doc/stable/user/absolute_beginners.html)                                                                                                                 |
| data-structures            | 数据结构与访问模式          | foundation / shared | [MIT 6.006 · Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)；[Python · Official Tutorial](https://docs.python.org/3/tutorial/)                    |
| algorithm-complexity       | 算法复杂度与资源预算        | foundation / shared | [MIT 6.006 · Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)；[UC Berkeley CS61C · Computer Architecture](https://cs61c.org/fa26/)                 |
| graphs-dynamic-programming | 图算法与动态规划            | core / shared       | [MIT 6.006 · Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)                                                                                       |
| computer-architecture      | 计算机体系结构与存储层次    | foundation / shared | [UC Berkeley CS61C · Computer Architecture](https://cs61c.org/fa26/)                                                                                                                                    |
| operating-systems          | 进程、线程、内存与I/O       | foundation / shared | [Arpaci-Dusseau & Arpaci-Dusseau · OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)                                                                                                                      |
| databases-sql              | 关系数据库、SQL与数据完整性 | core / shared       | [PostgreSQL · Official Tutorial](https://www.postgresql.org/docs/current/tutorial.html)                                                                                                                 |
| networking                 | 网络协议、请求与可靠通信    | core / shared       | [Stanford CS144 · Computer Networking](https://cs144.github.io/)                                                                                                                                        |
| software-testing           | 软件测试与实验代码可靠性    | foundation / shared | [pytest · Official Getting Started Guide](https://docs.pytest.org/en/stable/getting-started.html)；[Python · Official Tutorial](https://docs.python.org/3/tutorial/)                                    |
| git-environments           | 版本控制与依赖环境          | foundation / shared | [Chacon & Straub · Pro Git](https://git-scm.com/book/en/v2)；[Python · Virtual Environments](https://docs.python.org/3/library/venv.html)                                                               |
| linux-tooling              | 命令行、文件与运行管理      | foundation / shared | [MIT · The Missing Semester](https://missing.csail.mit.edu/)；[Arpaci-Dusseau & Arpaci-Dusseau · OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)                                                        |
| parallel-programming       | 并行、通信与加速上限        | core / shared       | [UC Berkeley CS61C · Computer Architecture](https://cs61c.org/fa26/)；[Arpaci-Dusseau & Arpaci-Dusseau · OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)                                                |
| numerical-precision        | 浮点表示、舍入与数值范围    | foundation / shared | [NumPy · numpy.finfo](https://numpy.org/doc/stable/reference/generated/numpy.finfo.html)；[David Goldberg · Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html) |

## 必要的数学与统计限定

- 实对称矩阵的正交谱分解不推广到任意方阵；SVD的最佳低秩结论注明谱范数/Frobenius范数。Cholesky要求对称正定。
- 连续不保证可导，偏导存在不保证可微；多路径链式法则需要累加。Taylor展开是局部性质。
- 多维积分换元要检查可微、一一对应等条件并使用绝对Jacobian；变量的密度值不是概率。
- 条件数与算法稳定性分开说明；小残差不保证小解误差。
- CLT的独立同分布、有限非零方差条件与大数定律的不同角色保留；零相关不能普遍替代独立。
- 连续高斯的给定取值条件分布，不使用离散零概率事件的比值公式。奇异协方差情形有单独提示。
- 置信区间以重复抽样覆盖率解释；p值不是零假设的后验，未拒绝也不是证明相等。
- KL的支持集、方向与对数单位保留；微分熵可以为负。
- 随机梯度无偏性依赖抽样和权重；Adam不保证普遍更优，L2与解耦权重衰减不混同。
- KKT的必要性涉及约束资格，非凸KKT点不是全局最优证明。Newton的下降性需检查曲率及步长控制。
- 自动微分不是有限差分，仍受程序本身与浮点实现影响；检查时固定随机性并避开不可导点。
- Python线程是否并行与解释器及底层扩展有关；数据竞争、嵌套线程和通信开销单独提示。

## 算例与结构验证

已核对矩阵乘法、正交关系、Bernoulli矩、Bayes后验、二项/Poisson零计数、高斯条件分布、标准误、梯度下降迭代、内存估算和Amdahl上限。关键数值包括：

- 缺陷检测的阳性后验：0.009/(0.009+0.0495)≈0.153846。
- Binomial(20,0.1)零计数≈0.121577；Poisson(2)零计数≈0.135335。
- 二维标准高斯相关系数0.8，给定第一维为1，第二维条件均值0.8、方差0.36。
- 已知总体标准差2，n=100、样本均值3，95%正态区间为[2.608,3.392]。
- 公平硬币100次中65次正面的精确对称双侧p值≈0.00351764，不能把未校正的正态近似当作精确值。
- f(w)=(w−3)²，η=0.1、w₀=0，前两步为0.6与1.08；η=1时参数误差符号翻转、损失不下降。
- 4096²个float32元素为64MiB；80%可并行工作使用4个执行单元，理想加速上限为2.5。

56个唯一ID、每域14节点、每节点两条掌握标准、1–2个来源；全部先修与关联引用有效。30个标准KaTeX公式严格渲染通过。范围验证、本组DAG、ESLint、Prettier及单文件TypeScript无输出类型检查均通过。未改共享类型、UI、目录或构建脚本，未发布。
