import { coreStudy } from "./deep-learning-exam-core";
import { sequenceChapters, sequenceStudy } from "./deep-learning-exam-sequence";
import type { StudySet } from "./exam-types";
import type { CourseChapter } from "./types";

const reviewBody = String.raw`
## 先看范围，再开始动笔

本轮以**第 1–7 周课件**为范围。公式结论默认可见，提示、推导与题解默认收起。先在纸上写，再点开核对；标记只代表你的自评，不会因为打开答案而自动变成“会做”。

四组内容都过一遍：基础与训练 → 全连接与 BP → CNN → RNN。上午或下午先理解结构，第二轮再独立计算。下表是约六小时的可选安排，不要求一次做完全部扩展阅读。

| 模块 | 第一轮：理解与一题手算 | 第二轮：独立推导 |
| --- | --- | --- |
| [基础与训练](/learning/deep-learning/losses) · [Softmax](/learning/deep-learning/softmax) | 35 分钟 | 30 分钟 |
| [网络与激活](/learning/deep-learning/networks) · [BP](/learning/deep-learning/backprop) · [自动微分](/learning/deep-learning/autodiff) | 45 分钟 | 40 分钟 |
| [卷积与池化](/learning/deep-learning/convolution) · [CNN 与残差](/learning/deep-learning/cnn-architectures) | 45 分钟 | 40 分钟 |
| [RNN](/learning/deep-learning/rnn) · [BPTT](/learning/deep-learning/bptt) · [LSTM/GRU](/learning/deep-learning/gated-rnn) | 40 分钟 | 40 分钟 |
| 休息与错题 | 分散休息 15 分钟 | 错题 20 分钟，休息 10 分钟 |

## 往年题放在哪里

| 往年题 | 对应练习位置 | 本轮处理 |
| --- | --- | --- |
| 2、3、4：三要素与梯度下降 | [基础](/learning/deep-learning/)、[优化](/learning/deep-learning/optimization) | 主线 |
| 6、7：激活导数与自动微分 | [网络](/learning/deep-learning/networks)、[自动微分](/learning/deep-learning/autodiff) | 主线；第 7 题原文没有具体函数，例题明确为补充 |
| 8、9、10、16：增强、卷积、残差、Dropout | [泛化](/learning/deep-learning/generalization)、[卷积](/learning/deep-learning/convolution)、[CNN](/learning/deep-learning/cnn-architectures) | 按课件深度练习 |
| 1、15：强化学习、BN/LN | 概念边界 | 强化学习仅保留三分法；BN随残差结构说明，不拓展完整BN/LN比较 |
| 5、11–14、17 | 范围外资料 | PAC、注意力、Warmup、Nesterov、初始化及PPO/GRPO不列本轮必做 |

RNN在这份往年卷中缺少直接对应题，本页另配课件手算练习。往年题解是参考解答，不是教师标准答案；本页也不据一道旧题推断今年的分值。

## 使用方法

先做下面的公式推导任务，再做练习。卡住时先开提示；写完再核对最终答案；最后对照完整解答定位第一处错误。可用“仅看待重做”回访卡住的题，或从每条来源返回对应章节。记录只保存在当前浏览器。

补充解释可回查 [D2L 的计算图与反向传播](https://zh.d2l.ai/chapter_multilayer-perceptrons/backprop.html)、[卷积](https://zh.d2l.ai/chapter_convolutional-neural-networks/conv-layer.html)、[BPTT](https://zh.d2l.ai/chapter_recurrent-neural-networks/bptt.html)。范围和记号仍以本课程前七周与已标出的勘误为准。
`;

export function assembleExamChapters(
  original: CourseChapter[],
): CourseChapter[] {
  const studies: Record<string, StudySet> = { ...coreStudy, ...sequenceStudy };
  const chapters: CourseChapter[] = [
    ...original.filter((c) => c.id !== "review"),
    ...sequenceChapters,
  ].map((chapter) => ({
    ...chapter,
    body:
      chapter.id === "foundations"
        ? chapter.body.replace(
            /> \*\*课程已更新至第四周。\*\*[^\n]*/,
            "> **已补齐前七周复习内容。** 从[考前复习入口](/learning/deep-learning/review)开始，先推公式、再做题；提示与完整解答默认收起。",
          )
        : chapter.body,
    study: studies[chapter.id],
  }));
  const allStudy: StudySet = { formulas: [], exercises: [] };
  for (const chapter of chapters) {
    if (!chapter.study) continue;
    allStudy.formulas.push(...chapter.study.formulas);
    allStudy.exercises.push(...chapter.study.exercises);
  }
  chapters.push({
    id: "review",
    title: "前七周考前复习：先推，再核对",
    group: "七 · 考前自测",
    lead: "一份公式与题目清单，串起基础、BP、CNN 和 RNN。推导和答案默认收起，六小时做两轮。",
    body: reviewBody,
    checks: [],
    source:
      "第1–7周原课件、课件覆盖索引及修订讲义；往年题仅选与课件明确对应的部分。补充手算题另有标注。更新于2026年11月8日。",
    study: allStudy,
  });
  return chapters;
}
