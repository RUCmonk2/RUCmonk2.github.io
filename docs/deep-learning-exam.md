# 前七周公式自推与考前练习

2026-11-08。范围为第1–7周课件：机器学习基础、全连接网络与BP、CNN、RNN。往年题只选与此范围对应的部分，不把作业补充或往年题出现的其他主题自动作为本次范围。

## 内容入口

- `/learning/deep-learning/review/`：六小时两轮路线、公式和练习汇总。
- 既有损失、Softmax、优化、网络、BP和自动微分章节：公式、提示、推导、题目分层显示。
- 新增 `convolution`、`cnn-architectures`、`rnn`、`bptt`、`gated-rnn` 五章。
- `/learning/deep-learning/knowledge-map/`：同源内容与新增主题节点，推导和解答仍在答案折叠区。

## 唯一内容源

`src/data/learning/deep-learning-exam-core.ts` 和 `deep-learning-exam-sequence.ts` 保存结构化内容，`exam-types.ts` 定义数据契约。`deep-learning-exam.ts` 将条目归入章节，并直接复用同一对象组成考前集合。不要在汇总页手写第二份答案。

公式默认显示结论、符号与条件、推导任务；提示、推导、易错点分开折叠。题目显示题干与必要图，提示、最终答案、完整解答分开折叠。旧章的完整讲解和实验仍可展开阅读，避免默认提前给出推导。题目与公式的稳定ID同时用于锚点与本浏览器的手动标记，更新时应尽量保留。

图在 `public/images/deep-learning/exam/`，按公式定义或课件结构重新绘制，保留来源周次与实际幻灯片序号。图像不包含整份私有课件、个人信息或学习记录。展示含数值答案的图时应放在解答层，不能破坏先独立作答的流程。

## 数学约定

- 单样本为列向量，权重为输出维度×输入维度；批量数据按行存样本时明确转置。
- MSE中的二分之一、批量平均、正则系数均写明。
- 卷积手算用不翻核的互相关，数学卷积另说明。
- GRU按第七周68–69页：新状态为旧状态乘一减更新门，加候选状态乘更新门。
- LSTM固定门的直接记忆通路与完整总导数分开；范数乘积上界大于一不构成梯度实际爆炸的充分条件。
- 往年第7题没有给具体函数，所有补充算例须标明；参考解答不冒充教师标准答案。

外部核对使用[计算图与BP](https://zh.d2l.ai/chapter_multilayer-perceptrons/backprop.html)、[卷积](https://zh.d2l.ai/chapter_convolutional-neural-networks/conv-layer.html)、[BPTT](https://zh.d2l.ai/chapter_recurrent-neural-networks/bptt.html)。课程原始范围优先。

## 验证

`npm run test:deep-learning` 检查字段、公式渲染、资源、锚点、汇总同源、知识网解答边界及独立数值。它也接入课程知识网检查与既有CI。发布前仍运行项目要求的lint、内容/图谱检查、构建与导出链接检查。

浏览器需要实测默认折叠、提示/答案独立展开、全部收起、隐藏公式结论、手动标记与刷新保留、跨章节同步、搜索及待重做筛选、手机长公式局部滚动、配图放大和知识网。自动检查不代表逐页视觉正确，也不将访问记录为掌握。
