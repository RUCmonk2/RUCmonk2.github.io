# AI 知识网络：模型、概率因果与推理资料说明

本文件对应 `src/data/ai-atlas/core.ts`，核查日期为 2026-10-19。覆盖机器学习 16、深度学习 16、概率与因果 14、搜索与推理 12，共 58 个节点。摘要、用途、掌握标准、例子与误区均为原创教学文字；来源用于核对方法定义、条件和进一步阅读，不将论文摘要翻译后充当课程内容。

## 内容组织

- `prerequisites` 是建议学习顺序，每节点 1–3 项；不是历史影响关系，也不是完成研究所需知识的穷举。经典推理从数据结构、搜索和命题逻辑进入，不要求先学大模型。
- `related` 表示可对照的知识或后续应用，不附加先修约束。研究域仅出现在相关连接中，避免基础与研究方法之间形成先修循环。
- `foundation` 为开始使用模型前应掌握的入口；`core` 为专业共同主干或明确方向的基础；`research` 为需要更深入推断、条件分析或形式工具的进阶入口。这些标签表达学习深度，不宣称算法的发明年代或研究是否已经成熟。
- `shared` 共 47 项，`specialist` 共 11 项。时间序列、推荐、高斯过程、精确图推断、MCMC、图神经网络等列为方向深化；搜索、逻辑、规划保留为共同主干。
- 每条掌握标准要求推导、实现、作图、比较或解释具体对象；小例子用于最小规模验证，不替代完整实验协议。

## 已重点核查的条件

### 机器学习

训练、验证和测试承担不同用途。标准化、填补、特征选择与目标编码应遵循训练折边界；分组与时间相关数据不能机械随机拆分。最小二乘唯一参数需要满列秩，解线性系统优先使用 QR/SVD；可分数据上的无正则逻辑回归可能没有有限最大似然解。偏差方差的经典分解限定于平方损失及明确的重复采样机制。核矩阵需半正定，K-means 不保证全局最优，PCA 的高方差方向不必与标签有关。分类排序、阈值决策和概率校准分别评价。

### 深度学习

反向传播计算梯度，优化器更新参数；初始化规则不是任意深度网络的稳定性保证。BatchNorm 与 LayerNorm 的统计轴及训练/推理行为不同。框架常用的卷积运算是互相关，平移等变性受边界与步幅影响。注意力明确 Q/K/V、softmax 轴、缩放与掩码；Transformer 包括注意力以外的前馈、残差、归一化与位置结构。全注意力的二次复杂度不泛指所有变体。

自编码重构不等于有效语义或概率生成，自监督的增强与正负样本带有假设。VAE 的 ELBO、GAN 的样本生成及可计算似然分开说明。扩散公式是给定高斯前向过程的条件分布；训练的反向过程不是对随机噪声逐样本精确求逆。图消息传递须检查排列性质、深度退化及任务允许的图信息。

### 概率与因果

普通概率图箭头不自动具有因果解释。d-分离蕴含独立需要相应马尔可夫假设，反向读取所有独立关系还涉及忠实性。精确消元的成本受中间因子及树宽影响；有环信念传播不默认精确。

ELBO 恒等式注明支持集与有限期望条件，受限变分族和优化误差不可忽略。MCMC 区分平稳分布、遍历性、混合和有限样本误差，不把多链诊断说成收敛证明。EM 的单调性需正确的 E/M 步，不意味着全局最优；混合模型可能出现退化似然。

因果图、干预、识别、反事实与估计分别设节点。标准化写出一致性、条件可交换性和正值性；调整处理后变量或碰撞点可能引入偏差。潜在结果与结构模型中的个体反事实依赖明确假设。双重稳健性不能修复不可识别问题，也不意味着两个辅助模型同时错设时仍然有效。

### 搜索、逻辑与验证

BFS 的最短代价保证限定等步长代价；A* 区分树搜索的可采纳性与不重开状态的图搜索所需一致性等条件。局部弧一致不保证全局有解。材料蕴含不代表因果，量词交换通常改变语义；一般一阶有效性不可判定，证明搜索未找到答案不等于反驳。

经典规划明确确定性与完全可观测等模型边界。极大极小注明双人零和、完全信息，随机节点与隐藏信息需另外处理。神经符号软约束不等于硬保证，形式验证只覆盖明确规格及模型，求解器超时或 `unknown` 不当作正确结论。

## 小例子的数值复核

- 线性回归 `(1,3),(2,5),(3,7)` 得到截距 1、斜率 2。
- 逻辑函数在 `ln 3` 处为 `3/4`；注意力得分 `0, ln 3` 产生 `1/4, 3/4`，对应值 `2,6` 的输出为 5。
- 梯度算例 `x=2,w=1,y=3` 的半平方损失为 0.5，参数梯度为 −2。
- 均值为 2、方差为 1 的向量 `(1,3)` 在忽略稳定项及仿射参数时归一化为 `(−1,1)`。
- Beta(1,1) 先验加 7 正 3 反得到 Beta(8,4)，后验预测正面概率为 2/3。
- 两个等权层的处理/对照风险分别为 `(0.1,0.2)`、`(0.3,0.4)`，标准化风险差为 −0.1。
- 三角形两色问题说明弧一致不能保证全局可满足；极大极小叶组 `(3,5)`、`(2,9)` 的根值为 3。

## 来源与核查

优先使用作者教材、大学课程、原始论文与项目官方文档。主要课程和原始论文已通过网页检索打开核对；未使用聚合博客作为定义或条件的依据。外部网页会更新，因此节点给出作者/课程名称及稳定入口，不把当前接口版本写成永久保证。

下列为数据内全部独立来源，具体节点保留 1–2 个直接阅读入口。

- [Stanford CS229 · Main Notes](https://cs229.stanford.edu/main_notes.pdf)
- [scikit-learn · Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html)
- [Loshchilov & Hutter · Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)
- [scikit-learn · Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html)
- [scikit-learn · Decision Trees](https://scikit-learn.org/stable/modules/tree.html)
- [scikit-learn · Ensembles](https://scikit-learn.org/stable/modules/ensemble.html)
- [scikit-learn · Support Vector Machines](https://scikit-learn.org/stable/modules/svm.html)
- [scikit-learn · Clustering](https://scikit-learn.org/stable/modules/clustering.html)
- [scikit-learn · Probability Calibration](https://scikit-learn.org/stable/modules/calibration.html)
- [scikit-learn · Pipelines and Composite Estimators](https://scikit-learn.org/stable/modules/compose.html)
- [Hyndman & Athanasopoulos · Forecasting: Principles and Practice](https://otexts.com/fpp3/)
- [Dive into Deep Learning · Matrix Factorization for Recommendation](https://d2l.ai/chapter_recommender-systems/mf.html)
- [Dive into Deep Learning · Multilayer Perceptrons](https://d2l.ai/chapter_multilayer-perceptrons/mlp.html)
- [Dive into Deep Learning · Backpropagation](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html)
- [Dive into Deep Learning · Numerical Stability and Initialization](https://d2l.ai/chapter_multilayer-perceptrons/numerical-stability-and-init.html)
- [Ioffe & Szegedy · Batch Normalization](https://arxiv.org/abs/1502.03167)
- [Ba, Kiros & Hinton · Layer Normalization](https://arxiv.org/abs/1607.06450)
- [Srivastava et al. · Dropout](https://jmlr.org/papers/v15/srivastava14a.html)
- [Dive into Deep Learning · Convolutions for Images](https://d2l.ai/chapter_convolutional-neural-networks/conv-layer.html)
- [Dive into Deep Learning · Recurrent Neural Networks](https://d2l.ai/chapter_recurrent-neural-networks/rnn.html)
- [Vaswani et al. · Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)
- [Bengio, Courville & Vincent · Representation Learning](https://arxiv.org/abs/1206.5538)
- [Chen et al. · A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)
- [Goodfellow, Bengio & Courville · Deep Learning, Autoencoders](https://www.deeplearningbook.org/contents/autoencoders.html)
- [Kingma & Welling · Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114)
- [Goodfellow et al. · Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)
- [Ho, Jain & Abbeel · Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [Kipf & Welling · Semi-Supervised Classification with Graph Convolutional Networks](https://arxiv.org/abs/1609.02907)
- [Rasmussen & Williams · Gaussian Processes for Machine Learning](https://gaussianprocess.org/gpml/chapters/RW.pdf)
- [Stanford CS228 · Bayesian Networks](https://ermongroup.github.io/cs228-notes/representation/directed/)
- [Pearl, Glymour & Jewell · Causal Inference in Statistics: A Primer](https://bayes.cs.ucla.edu/PRIMER/)
- [Stanford CS228 · Variable Elimination](https://ermongroup.github.io/cs228-notes/inference/ve/)
- [Blei, Kucukelbir & McAuliffe · Variational Inference: A Review for Statisticians](https://arxiv.org/abs/1601.00670)
- [Stanford CS228 · Variational Inference](https://ermongroup.github.io/cs228-notes/inference/variational/)
- [Stanford CS228 · Sampling Methods](https://ermongroup.github.io/cs228-notes/inference/sampling/)
- [Neal · Probabilistic Inference Using Markov Chain Monte Carlo Methods](https://www.cs.toronto.edu/~radford/ftp/review.pdf)
- [Hernán & Robins · Causal Inference: What If](https://miguelhernan.org/whatifbook)
- [UC Berkeley CS188 · State Space Search](https://inst.eecs.berkeley.edu/~cs188/textbook/search/state.html)
- [UC Berkeley CS188 · Informed Search](https://inst.eecs.berkeley.edu/~cs188/textbook/search/informed.html)
- [UC Berkeley CS188 · Constraint Satisfaction Problems](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/csps.html)
- [UC Berkeley CS188 · Propositional Logic](https://inst.eecs.berkeley.edu/~cs188/textbook/logic/propositional.html)
- [Russell & Norvig · Artificial Intelligence: A Modern Approach](https://aima.cs.berkeley.edu/)
- [W3C · RDF 1.1 Concepts and Abstract Syntax](https://www.w3.org/TR/rdf11-concepts/)
- [UC Berkeley CS188 · Game Trees](https://inst.eecs.berkeley.edu/~cs188/textbook/games/games.html)
- [Manhaeve et al. · DeepProbLog: Neural Probabilistic Logic Programming](https://arxiv.org/abs/1805.10872)
- [de Moura & Bjørner · Z3: An Efficient SMT Solver](https://www.microsoft.com/en-us/research/publication/z3-an-efficient-smt-solver/)

## 本组验证

- Prettier、单文件 ESLint 和针对 `core.ts` 的 TypeScript 编译通过；未运行全站 build 或发布。
- 固定范围覆盖 58/58，四领域数量为 16/16/14/12，ID 无重复。
- 119 条先修、127 条相关引用全部位于统一 ID 清单，无自引用；本组先修无环。跨组完整 DAG 由集成检查继续验证。
- 每节点 2 条掌握标准、1–2 个来源；共 46 个独立来源。
- 16 条公式在无额外宏的标准 KaTeX 中以 `throwOnError: true, strict: "error"` 渲染通过。
- 摘要长度 61–78 个 Unicode 字符，平均 69。
- 临时检查脚本 `/tmp/validate-ai-core.cjs`，结构结果 `/tmp/ai-core-validation.json`；这些不是站点运行依赖。
