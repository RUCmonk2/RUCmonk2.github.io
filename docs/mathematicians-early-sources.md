# 数学家人物志扩展：欧拉、拉格朗日、柯西

核验日期：2026-10-19。数据文件为 `src/data/mathematicians-early.ts`，导出 `earlyMathematicians` 与 `earlyRelations`。本批增加 3 人、9 项成果、12 个时间点、6 条关系。

## 文献与日期

| 人物     | 已核验资料                                                                                                                                                                                                                                                                                              | 展示范围与日期处理                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 欧拉     | [MacTutor 传记](https://mathshistory.st-andrews.ac.uk/Biographies/Euler/)；[Euler Archive E53](https://scholarlycommons.pacific.edu/euler-works/53/)；[E72](https://scholarlycommons.pacific.edu/euler-works/72/)；[E101](https://scholarlycommons.pacific.edu/euler-works/101/)                        | 七桥论文档案记写于 1735 年、刊于 1741 年，故不把常见的 1736 卷年直接当成印刷年份。欧拉乘积论文写于 1737 年、刊于 1744 年。1748 年为《无穷分析引论》出版年。 |
| 拉格朗日 | [MacTutor 传记](https://mathshistory.st-andrews.ac.uk/Biographies/Lagrange/)；[DSB 传记与 1755 年通信记录](https://mathshistory.st-andrews.ac.uk/DSB/Lagrange.pdf)；[《分析力学》1788 年原著，ETH](https://www.e-rara.ch/zut/content/titleinfo/2488394)                                                 | 1755 年向欧拉致信讨论变分法。方程研究标为 1770–1771，对应原学院论文的研究/卷年，不暗示两篇都于 1770 年印行。1788 年采用首版书目。                           |
| 柯西     | [MacTutor 传记](https://mathshistory.st-andrews.ac.uk/Biographies/Cauchy/)；[《分析教程》1821 年原版，ETH](https://www.e-rara.ch/zut/content/titleinfo/8442794)；[MAA 展示 1825 年复积分原稿页面](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-cauchy-on-definite-integrals) | 凸多面体研究在 1811 年已提交，卡片按 1813 年刊出记年。1825 年复积分论文与较早的 1814 年工作有关，但不合并为同一条出版记录。                                 |

简述以研究问题和贡献意义为主。没有把柯西等人的工作写成一次完成了今日所有严密基础；例如早期一致收敛论证、刚性证明辅助引理等仍有后来修补的历史。

## 数学表述的适用条件

- 七桥问题：针对原柯尼斯堡桥图，四个奇度顶点排除一笔走完所有桥。没有把欧拉的原文说成已经给出了今天任意图的全部充分必要证明。
- 欧拉乘积：展示式限定实数 `s > 1`；没有把收敛乘积直接代入 `s = 1`。公式采用现代记法。
- 欧拉公式：单位圆旋转解释限定实数角度 `θ`。
- 变分法：欧拉—拉格朗日方程用于足够光滑、固定端点的极值曲线，只是必要条件，不等于极小值充分条件。
- 拉格朗日力学：`L = T - V` 的解释限于常见保守机械系统，不声称任何受力与约束都能直接套用这一形式。
- 柯西刚性：对应面全等、相同面连接方式和凸性一起保留；不推广为所有非凸多面体都刚性。
- 柯西准则：解释使用实数序列，依赖实数完备性；没有声称一般度量空间的柯西列都收敛。
- 复积分：写明分段光滑简单闭曲线，以及函数在曲线及其内部邻域全纯。没有省略内部无奇点的要求。

## 新增关系

| 关系              | 类型        | 直接依据与边界                                                                                                                                                                                                       |
| ----------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Euler → Lagrange  | `support`   | [拉格朗日传记](https://mathshistory.st-andrews.ac.uk/Biographies/Lagrange/)记录 1755-08-12 来信与 1755-09-06 回信。表示通信鼓励和方法交流，不能写成博士师承，也不将拉格朗日的方法归为单向灌输。                      |
| Euler → Gauss     | `influence` | [高斯《算术研究》序言原文](https://la.wikisource.org/wiki/Disquisitiones_arithmeticae/Praefatio)明确列举欧拉等人，并回忆后来研读他们的著作。表示成果的继承，非见面或指导。                                           |
| Euler → Dirichlet | `influence` | [狄利克雷 1837 年论文的英译与说明](https://arxiv.org/abs/0808.1408)直接说明对欧拉 ζ 函数与素数方法的使用。这里连接的是方法发展。                                                                                     |
| Lagrange → Galois | `influence` | [伽罗瓦传记](https://mathshistory.st-andrews.ac.uk/Biographies/Galois/)记述其研读拉格朗日；[拉格朗日传记](https://mathshistory.st-andrews.ac.uk/Biographies/Lagrange/)说明根置换研究到后续群论的联系。两人不是师生。 |
| Lagrange → Cauchy | `support`   | [柯西传记](https://mathshistory.st-andrews.ac.uk/Biographies/Cauchy/)记述拉格朗日拜访其家、给父亲教育建议，以及柯西携带其著作赴工程岗位。属于早期个人支持，不等同正式指导。                                          |
| Cauchy → Riemann  | `influence` | [黎曼传记](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/)明确说明 1851 年论文建立在柯西等人的复函数研究上。由于有接续证据，使用 `influence` 而非仅仅 `parallel`；黎曼的博士导师仍为高斯。               |

`support` 的箭头表示支持者到受支持者，用于说明，不意指所有通信只沿箭头方向发生。所有关系均有各自 `sourceUrl`。

## 肖像与图片协作

图片均由本次图片任务下载并逐张目视检查；内容任务按对方核验后的实际文件信息填写。详细元数据存于 `public/images/mathematicians/sources-expansion.json`，没有保留占位出处。

| 图片           | 最终来源与署名                                                                                                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `euler.jpg`    | [Commons：Leonhard Euler – Jakob Emanuel Handmann (Kunstmuseum Basel)](<https://commons.wikimedia.org/wiki/File:Leonhard_Euler_-_Jakob_Emanuel_Handmann_(Kunstmuseum_Basel).jpg>)。Handmann，1753 年，**粉彩**肖像，公共领域；没有误称油画。                                           |
| `lagrange.jpg` | [Commons：Joseph Louis Lagrange.jpg](https://commons.wikimedia.org/wiki/File:Joseph_Louis_Lagrange.jpg)。佚名版画，原作年代未记载，公共领域；没有将上传或裁切日期当作创作时间。                                                                                                        |
| `cauchy.jpg`   | [Commons：French School – Portrait of Augustin-Louis Cauchy](<https://commons.wikimedia.org/wiki/File:French_School_-_Portrait_of_Augustin-Louis_Cauchy_(1789-1857).jpg>)。当前描述页署名 **Jean Roller**，约 1840 年油画，公共领域；文件名中的旧归属 French School 不是最终作者字段。 |

## 验证范围

- 该数据文件通过 Prettier 与 ESLint。
- 逐条核验 3 人各 3 成果、4 时间点、至少 2 项可靠资料；六条关系端点均属于计划中的 12 人。
- 所有成果链接只指向已有站内数学地图锚点；外部文献放在 `sources` / `sourceUrl`，肖像原页放在 `portrait.href`。
- 数学公式经 KaTeX 解析检查。未运行整站 build，交由主任务整合后统一验证。
