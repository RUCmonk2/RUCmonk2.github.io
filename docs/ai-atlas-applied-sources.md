# AI 知识网络：应用与系统节点来源

核查日期：2026-10-19。数据文件：`src/data/ai-atlas/applied.ts`。本组共 58 节点：语言 16、视觉与多模态 14、强化学习 14、系统 14。正文是面向学习者原创的概念解释、学习标准与小实验，来源提供定义、方法及适用条件的核查入口，不复制论文摘要。

## 编辑与学习边界

- 23 节点标记为 shared，35 节点标记为 specialist；专业方向节点用于继续学习，不表示所有本科生或低年级博士均须精通所有分支。
- 先修仅指向基础、核心方法或较早的应用节点，每节点 1–3 条；研究实践和责任议题作为 related，避免反向形成学习环。
- 偏好学习与 PPO 互为相关概念，不互设先修；RAG 的先修明确区分检索和语言建模。
- checkpointing 指模型、优化器、调度器、随机状态和数据进度的训练恢复；激活重算归入 memory-efficiency，避免两个“检查点”概念混淆。
- 公式与例子标明关键条件：双目深度需要校正与对应；策略梯度按从初始时刻定义的折扣目标保留时间权重；表格 Q 学习的收敛条件不扩张到一般神经网络；PPO 裁剪不是单调改进保证；近邻召回率与任务相关性分开。
- 检索材料与工具返回当作外部数据处理；智能体实验包含步数、权限和失败恢复边界。

## 核查方式

使用论文原文页、作者书籍页、大学课程和官方框架文档逐项浏览核查标题、方法范围与关键条件。arXiv 和 ACL 页面保留准确文献入口；TensorFlow、PyTorch、CUDA 等文档可能随版本更新，实验需同时记录实际软件版本。PyTorch stable 页面已跟随到其版本文档核查；DVC 页面使用当前重定向后的官方入口。部分作者旧站或课程 PDF 超时，因此最终采用能打开的期刊正式页及大学课程材料索引，没有把失败的候选链接放入数据。

## 节点与参考来源

### 语言与语言模型

| ID                           | 节点               | 核查来源                                                                                                                                                                                                       |
| ---------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenization`               | 文本分词与词元化   | [SentencePiece: A Simple and Language Independent Subword Tokenizer and Detokenizer for Neural Text Processing](https://aclanthology.org/D18-2012/)                                                            |
| `language-modeling`          | 语言建模           | [A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html)                                                                                                                         |
| `word-vectors`               | 词向量与分布语义   | [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)                                                                                                                |
| `nlp-tasks`                  | 语言任务与问题定义 | [Stanford CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/)                                                                                                      |
| `pretraining`                | 语言模型预训练     | [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://aclanthology.org/N19-1423/)；[A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html) |
| `instruction-tuning`         | 指令微调           | [Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652)                                                                                                                           |
| `parameter-efficient-tuning` | 参数高效适配       | [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)                                                                                                                         |
| `preference-learning`        | 偏好学习与后训练   | [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)                                                                                             |
| `decoding`                   | 生成解码与采样     | [The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)                                                                                                                               |
| `retrieval`                  | 文本检索与排序     | [Dense Passage Retrieval for Open-Domain Question Answering](https://aclanthology.org/2020.emnlp-main.550/)                                                                                                    |
| `rag`                        | 检索增强生成       | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)                                                                                                           |
| `tool-use-agents`            | 工具使用与智能体   | [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)                                                                                                                 |
| `long-context`               | 长上下文建模       | [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)；[Longformer: The Long-Document Transformer](https://arxiv.org/abs/2004.05150)                                   |
| `language-evaluation`        | 语言模型评估       | [Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110)                                                                                                                                     |
| `scaling-laws`               | 规模规律与计算分配 | [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)；[Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)                                                |
| `model-editing`              | 模型知识编辑       | [Locating and Editing Factual Associations in GPT](https://arxiv.org/abs/2202.05262)                                                                                                                           |

### 视觉、语音与多模态

| ID                       | 节点                 | 核查来源                                                                                                                                                                                        |
| ------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image-signals`          | 图像与采样信号       | [MIT 6.003: Signals and Systems](https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/)                                                                                              |
| `image-classification`   | 图像分类             | [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)                                                                                                                |
| `object-detection`       | 目标检测             | [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497)                                                                              |
| `segmentation`           | 像素分割             | [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)                                                                                             |
| `visual-transformers`    | 视觉 Transformer     | [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)                                                                                  |
| `self-supervised-vision` | 视觉自监督学习       | [A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)；[Masked Autoencoders Are Scalable Vision Learners](https://arxiv.org/abs/2111.06377) |
| `geometry-3d`            | 三维几何与多视图     | [Hartley & Zisserman: Multiple View Geometry in Computer Vision](https://www.robots.ox.ac.uk/~vgg/hzbook/)                                                                                      |
| `optical-flow-video`     | 光流与视频理解       | [RAFT: Recurrent All-Pairs Field Transforms for Optical Flow](https://arxiv.org/abs/2003.12039)                                                                                                 |
| `vision-language`        | 视觉语言对齐         | [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)                                                                                       |
| `image-generation`       | 图像生成与条件控制   | [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)                                                                                                |
| `audio-speech`           | 音频与语音建模       | [wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations](https://arxiv.org/abs/2006.11477)                                                                             |
| `multimodal-fusion`      | 多模态融合与缺失模态 | [Multimodal Machine Learning: A Survey and Taxonomy](https://arxiv.org/abs/1705.09406)                                                                                                          |
| `visual-evaluation`      | 视觉评估与泛化检查   | [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)                                                                                                                    |
| `equivariance`           | 对称性与等变性       | [Group Equivariant Convolutional Networks](https://arxiv.org/abs/1602.07576)                                                                                                                    |

### 强化学习与控制

| ID                       | 节点               | 核查来源                                                                                                                                                                                                                |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mdp`                    | 马尔可夫决策过程   | [Stanford CS234: Reinforcement Learning](https://web.stanford.edu/class/cs234/)                                                                                                                                         |
| `bellman-equations`      | 贝尔曼方程         | [Underactuated Robotics: Dynamic Programming](https://underactuated.mit.edu/dp.html)                                                                                                                                    |
| `dynamic-programming-rl` | 决策中的动态规划   | [Stanford CS234 Lecture Materials: Tabular MDP Planning](https://web.stanford.edu/class/cs234/modules.html)；[Underactuated Robotics: Dynamic Programming](https://underactuated.mit.edu/dp.html)                       |
| `monte-carlo-td`         | 蒙特卡洛与时序差分 | [Learning to Predict by the Methods of Temporal Differences](https://link.springer.com/article/10.1007/BF00115009)                                                                                                      |
| `q-learning`             | Q 学习             | [Watkins & Dayan: Q-learning](https://www.gatsby.ucl.ac.uk/~dayan/papers/cjch.pdf)                                                                                                                                      |
| `policy-gradients`       | 策略梯度           | [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://link.springer.com/article/10.1007/BF00992696)                                                                       |
| `actor-critic`           | 行动者与评论者     | [Konda & Tsitsiklis: Actor-Critic Algorithms](https://papers.nips.cc/paper/1786-actor-critic-algorithms.pdf)                                                                                                            |
| `ppo`                    | 近端策略优化       | [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)                                                                                                                                             |
| `exploration`            | 探索与利用         | [Finite-time Analysis of the Multiarmed Bandit Problem](https://homes.di.unimi.it/~cesabian/Pubblicazioni/ml-02.pdf)                                                                                                    |
| `off-policy-learning`    | 异策略学习与校正   | [Safe and Efficient Off-Policy Reinforcement Learning](https://arxiv.org/abs/1606.02647)                                                                                                                                |
| `model-based-rl`         | 基于模型的强化学习 | [When to Trust Your Model: Model-Based Policy Optimization](https://arxiv.org/abs/1906.08253)                                                                                                                           |
| `offline-rl`             | 离线强化学习       | [Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open Problems](https://arxiv.org/abs/2005.01643)；[Conservative Q-Learning for Offline Reinforcement Learning](https://arxiv.org/abs/2006.04779) |
| `imitation-learning`     | 模仿学习           | [A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning](https://arxiv.org/abs/1011.0686)                                                                                             |
| `control-robotics`       | 控制与机器人决策   | [Underactuated Robotics: Linear Quadratic Regulators](https://underactuated.mit.edu/lqr.html)                                                                                                                           |

### AI 系统与部署

| ID                     | 节点               | 核查来源                                                                                                                                                                                                                                    |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-pipelines`       | 数据管道与输入吞吐 | [TensorFlow: Build Input Pipelines with tf.data](https://www.tensorflow.org/guide/data)                                                                                                                                                     |
| `dataset-versioning`   | 数据版本与谱系     | [DVC: Get Started with Data Version Control](https://doc.dvc.org/start)；[Datasheets for Datasets](https://arxiv.org/abs/1803.09010)                                                                                                        |
| `gpu-computing`        | GPU 计算与内存层次 | [NVIDIA CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)                                                                                                                                                 |
| `distributed-training` | 分布式训练         | [PyTorch: DistributedDataParallel](https://docs.pytorch.org/docs/stable/generated/torch.nn.parallel.DistributedDataParallel.html)；[ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054) |
| `mixed-precision`      | 混合精度训练       | [Mixed Precision Training](https://arxiv.org/abs/1710.03740)；[Google Cloud TPU: Improve Your Model's Performance with bfloat16](https://docs.cloud.google.com/tpu/docs/bfloat16)                                                           |
| `memory-efficiency`    | 训练显存与激活重算 | [Training Deep Nets with Sublinear Memory Cost](https://arxiv.org/abs/1604.06174)；[ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)                                                 |
| `checkpointing`        | 训练检查点与恢复   | [PyTorch: Saving and Loading a General Checkpoint](https://docs.pytorch.org/tutorials/recipes/recipes/saving_and_loading_a_general_checkpoint.html)                                                                                         |
| `inference-serving`    | 推理服务与批处理   | [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)；[Clipper: A Low-Latency Online Prediction Serving System](https://arxiv.org/abs/1612.03079)                           |
| `quantization`         | 模型量化           | [Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference](https://arxiv.org/abs/1712.05877)                                                                                                            |
| `distillation`         | 知识蒸馏           | [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531)                                                                                                                                                            |
| `profiling`            | 性能分析与瓶颈定位 | [NVIDIA Nsight Systems User Guide](https://docs.nvidia.com/nsight-systems/UserGuide/index.html)                                                                                                                                             |
| `mlops-monitoring`     | 模型运维与持续监测 | [Hidden Technical Debt in Machine Learning Systems](https://research.google/pubs/hidden-technical-debt-in-machine-learning-systems/)                                                                                                        |
| `edge-deployment`      | 端侧与资源受限部署 | [MLPerf Tiny Benchmark](https://arxiv.org/abs/2106.07597)                                                                                                                                                                                   |
| `retrieval-systems`    | 向量索引与检索系统 | [Billion-scale Similarity Search with GPUs](https://arxiv.org/abs/1702.08734)；[Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs](https://arxiv.org/abs/1603.09320)                 |

## 数据验证

本组已检查固定 ID 覆盖、领域归属、双语标题、两条掌握标准、每节点来源数、所有先修与关联引用、先修无环，以及 14 条 KaTeX 公式可解析；本文件通过独立 TypeScript 类型检查与局部 ESLint。全站构建与交互验收由主线程负责。
