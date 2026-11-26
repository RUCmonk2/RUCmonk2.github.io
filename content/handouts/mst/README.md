# 最小生成树讲义

`mst.zh.md` 是网页和 PDF 共用的正文。`mst-handout-figures.tsx` 使用实验的顶点、边和权重画图。网页版在 `/learning/math-lab/mst/#mst-handout`。用 Chromium 打印本页的 A4 打印样式即可更新 `public/assets/mst-handout/mst-handout.pdf`。更新后检查目录链接、五幅图、四段伪代码和表格的分页。

| 正文章节 | 对照来源 | 可核对的结果 |
| --- | --- | --- |
| 六点入门、割与环、三个经典算法 | `classicGraph`，Kruskal 1956、Prim 1957、KKT §1.1、§3 | A–C–B 构成跳过 AB 的见证，三种算法的边集一致，权重 17 |
| KKT 伪代码与 12 点轨迹 | `samplingGraph`，KKT §2–3 | 种子 1 删除 CI，种子 3 保留 CI 到第二次递归，两者输出权重 66 |
| 期望时间 | KKT §2 与 §4，Dixon–Rauch–Tarjan 的树验证一节 | 抽样引理，子规模的条件期望不超过父规模的 5/6 |
| 验算 | 树路径最大边条件 | 连通无环后，六点图上的四条非树边均通过比较 |
