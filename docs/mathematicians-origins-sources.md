# 数学家人物志：古代至十七世纪资料记录

核验日期：2026-10-19。数据位于 `src/data/mathematicians-origins.ts`，导出 `originsMathematicians` 与 `originsRelations`。图片位于 `public/images/mathematicians/origins/`。

本组实际增加 **13 人、39 项代表贡献、52 个年表节点、16 条关系**。每人有 3 项贡献、4 个时间节点及至少 2 项文献。稀缺生平的节点明确包含著作及身后传播，不补造经历。

## 日期与身份

古代人物的 `born` / `died` 只为布局排序提供约略数值，**对外应展示 `lifeDates`**。不得把排序数字二次引用为确切生卒年。

| 人物       | 对外日期处理                 | 较可靠的依据                                                                                                                                                                                                                                                                   |
| ---------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 欧几里得   | 约前300年活动；生卒不详      | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Euclid/)说明生平资料极少。排序采用传统的约前325—前265，但页面不以其作为精确年表。                                                                                                                                 |
| 阿基米德   | 约前287—前212                | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Archimedes/)。出生为后世估计，死于叙拉古陷落；不采用遇害对白等传奇细节。                                                                                                                                          |
| 刘徽       | 3世纪；263年有著述，生卒不详 | [中科院自然科学史研究所](https://ihns.cas.cn/xwdt/xsdt/202604/t20260408_8182719.html)强调正史无传、零星史料。避免把220—280的传统估计当事实。                                                                                                                                   |
| 祖冲之     | 429—500/501，卒年有异        | [香港教育局研究文章](https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/ma/res/smn_29.pdf)用429—500；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Zu_Chongzhi/)用429—501。保留差异。                                                              |
| 阿耶波多   | 476—约550，卒年未详          | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Aryabhata_I/)与[Clark译本](https://en.wikisource.org/wiki/Āryabhaṭīya_of_Āryabhaṭa)。499年与自述年龄支持476年；出生地点不可武断。                                                                                 |
| 婆罗摩笈多 | 598—约670，卒年未详          | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/)。628与665为著述锚点，不能编造与他人的直接会面。                                                                                                                                                     |
| 花拉子米   | 约780—约850                  | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/)。出生地点、经历缺乏可靠细节，保留巴格达活动与马蒙赞助。                                                                                                                                            |
| 斐波那契   | 约1170—约1250，1240仍有记录  | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/)；[ETH展览](https://library.ethz.ch/en/collections-and-archives/platforms/virtual-exhibitions/fibonacci-un-ponte-sul-mediterraneo/fibonacci-as-mathematician.html)。终年为估计，不由约数计算确切年龄。 |
| 笛卡尔     | 1596—1650                    | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Descartes/)与[1637年原著书目](https://www.loc.gov/item/32034972/)。                                                                                                                                               |
| 费马       | 17世纪初—1665，出生年有争议  | [MAA专题](https://old.maa.org/press/periodicals/convergence/when-was-pierre-de-fermat-born)解释1601与约1607的争议；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Fermat/)仍保留传统日期。排序用1607，公开文字不选定一个未经争议的精确年份。                     |
| 帕斯卡     | 1623—1662                    | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Pascal/)与1654年通信。                                                                                                                                                                                            |
| 惠更斯     | 1629—1695                    | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Huygens/)与[《摆钟论》原版](https://www.e-rara.ch/zut/content/titleinfo/3347187)。                                                                                                                                |
| 牛顿       | 1643—1727，标明公历          | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Newton/)采用公历；英国当时旧历生年为1642。不会将两种纪年混作史料矛盾。                                                                                                                                            |

## 贡献的原著与研究依据

- 欧几里得：[Joyce整理的《原本》第一卷](https://mathcs.clarku.edu/~djoyce/elements/bookI/bookI.html)，[IX.20素数命题](https://webspace.ship.edu/mrcohe/inside-out/vu1/d_joyce/elements/bookIX/propIX20.html)。使用“组织、保存、展示”，不把全部内容断为欧几里得原创。
- 阿基米德：[《抛物线求积》大学译本](https://web.calstatela.edu/faculty/hmendel/Ancient%20Mathematics/Archimedes/QuadraturaParabolae/QP.contents.html)，[圆周率史](https://mathshistory.st-andrews.ac.uk/HistTopics/Pi_through_the_ages/)。保留严格界限，不把22/7称为π。
- 刘徽：[郭书春《析理以辞——刘徽传》介绍](https://www.ihns.cas.cn/yjcg/xszz/zztj/202604/t20260408_8182760.html)，[《海岛算经》原文](https://zh.wikisource.org/zh-hans/海島算經)，[Swetz 1986研究](https://www.sciencedirect.com/science/article/pii/0315086086900248)。没有把《九章算术》本身归为刘徽独著。
- 祖冲之：[《大明历》算法研究](https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/ma/res/smn_29.pdf)与传记。密率是近似，球体积的父子合作写明祖暅，《缀术》失传限制了对推导过程的断言。
- 阿耶波多：[Walter E. Clark 1930译本](https://en.wikisource.org/wiki/Āryabhaṭīya_of_Āryabhaṭa)与传记。展示π近似、正弦表和碎散术；不采用“已经证明π无理”或“已经提出椭圆轨道”等争议性陈述。
- 婆罗摩笈多：[Colebrooke 1817翻译](https://en.wikisource.org/wiki/Algebra,_with_Arithmetic_and_Mensuration)与传记。零的运算史与现代有效规则分开，圆内接条件明确，合成恒等式用现代符号。
- 花拉子米：[Rosen 1831原著英译，ETH](https://www.e-rara.ch/zut/doi/10.3931/e-rara-56713)。写明原著用文字与几何，方程符号是现代辅助记法；不称其发明零。
- 斐波那契：[ETH专题](https://library.ethz.ch/en/collections-and-archives/platforms/virtual-exhibitions/fibonacci-un-ponte-sul-mediterraneo/fibonacci-as-mathematician.html)与传记。强调位值计算、实践几何和平方数，不把兔子题当作全部成就或数列全球首创。
- 笛卡尔：[《几何学》原文](https://www.gutenberg.org/ebooks/26400)。符号法、根的符号规则和几何代数化分开叙述，不声称今日坐标图已经原样存在。
- 费马与帕斯卡：[1654年通信译文与说明](https://www.york.ac.uk/depts/maths/histstat/pascal.htm)，[1654-08-24原文](<https://fr.wikisource.org/wiki/Œuvres_de_Blaise_Pascal/Lettre_de_Pascal_à_Fermat_(24_août_1654)>)。费马小定理在此作为当时的陈述，未假称现存信件附完整证明。帕斯卡三角形记1654写作、1665出版，并承认更早传统。
- 惠更斯：[《摆钟论》1673原著，ETH](https://www.e-rara.ch/zut/content/titleinfo/3347187)，[美国国会图书馆书目及扫描](https://www.loc.gov/item/83461961/)，传记中的1657概率、1690光论记载。
- 牛顿：[剑桥大学图书馆对《原理》成书的说明](https://wwwe.lib.cam.ac.uk/CUL/exhibitions/Footprints_of_the_Lion/gravity_glory.html)，[数字原件记录](https://www.repository.cam.ac.uk/items/4e101d5e-b2d2-4e27-a189-3229f4f0938b)。写长期发展与哈雷支持，不把成果归于孤立的苹果事件。

## 数学限定

- 辗转相除式用于正整数；碎散术的现代可解性条件用于非零整数系数a、b与整数c。
- 婆罗摩笈多面积公式限定圆内接四边形，s为半周长。
- 笛卡尔符号法则限定非零实系数多项式，忽略零系数，正根计重数，差为偶数。
- 帕斯卡定理使用非退化圆锥曲线上六个互异点，并以射影平面处理平行边。
- 期望公式展示有限取值的离散情形。
- 摆线等时性限定均匀重力、无摩擦、从静止下降的理想模型。
- 微积分基本关系限定被积函数连续；一般实指数的二项式级数限定绝对值小于1。
- 平方反比引力说明质点或球对称物体外部条件，不直接用于任意形状物体。

## 关系的含义与来源

| 关系                       | 类型      | 依据及边界                                                                                                                                                                                       |
| -------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Euclid → Newton            | influence | 牛顿传记记录阅读巴罗版《原本》，不是直接师承。                                                                                                                                                   |
| Euclid → Hilbert           | influence | [希尔伯特传记](https://mathshistory.st-andrews.ac.uk/Biographies/Hilbert/)的《几何基础》工作；表示理论重建。                                                                                     |
| Archimedes — Liu Hui       | parallel  | 阿基米德圆周率文献与刘徽割圆研究各自支持比较；没有直接传播的证明。本线的出处页描述刘徽方法，另一端文献见人物资料。                                                                               |
| Liu Hui → Zu Chongzhi      | influence | 祖冲之传记明确说明研读刘徽注释。                                                                                                                                                                 |
| Zu Chongzhi — Aryabhata    | parallel  | 两人的π计算各有文献支持；近似时间不等于历史接触。                                                                                                                                                |
| Aryabhata — Brahmagupta    | parallel  | 两部天文著作的正弦表、不定方程与周期议题比较；不把复杂批评关系写成正式师承。                                                                                                                     |
| Brahmagupta → Al-Khwarizmi | influence | [印度数学向阿拉伯世界传播研究](https://mathshistory.st-andrews.ac.uk/Projects/Pearce/chapter-11/)。保留“相关传统、译者与修订”，不虚构面对面联系。                                                |
| Al-Khwarizmi → Fibonacci   | influence | ETH展览明确辨认文本来源；[研究说明中间文本的作用](https://forskning.ruc.dk/en/publications/intermediaries-between-ab%C5%AB-k%C4%81mils-and-fibonaccis-algebras-lost-bu/)，不假称所有借鉴均直接。 |
| Fibonacci — Fermat         | parallel  | 斐波那契传记讨论平方数与费马时代数论的比较；不主张费马读过《平方数书》。                                                                                                                         |
| Descartes — Fermat         | parallel  | 费马、笛卡尔两篇传记中的解析几何发展；不是老师与学生。                                                                                                                                           |
| Fermat — Pascal            | support   | 1654年双向通信；数据显式设置 `direction: "both"`，不表示成果只有单向归属。                                                                                                                       |
| Pascal → Huygens           | influence | 惠更斯传记记录1655年获知概率工作，并发展为1657年论著。                                                                                                                                           |
| Huygens → Leibniz          | support   | 1672年巴黎相识与个人数学指导，不是博士师承。                                                                                                                                                     |
| Descartes → Newton         | influence | 牛顿传记记录《几何学》及范斯霍滕扩充译注的研读。                                                                                                                                                 |
| Newton → Euler             | influence | 欧拉传记关于《力学》将牛顿力学转为分析方法的记载。                                                                                                                                               |
| Fermat → Euler             | influence | 欧拉传记列出对费马问题的证明、检验与纠错。                                                                                                                                                       |

每位人物至少连接一条边。Newton—Leibniz由其他组提供，本组不重复添加。

## 图片来源与选择

所有13个图像文件均已目视检查。每张小于200KB；五张位图宽度为500px，费马采用原始299px宽版本。完整Commons API作者、日期、许可、来源与下载地址存于同目录 `sources.json`。

| 文件                                                                                                                                      | 原作或说明                                                                                                                                                                            | 许可与类型                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `euclid.svg`、`archimedes.svg`、`liu-hui.svg`、`zu-chongzhi.svg`、`aryabhata.svg`、`brahmagupta.svg`、`al-khwarizmi.svg`、`fibonacci.svg` | 本站原创姓名字标，没有绘制或推断面孔。图内注明“NAME MARK · NOT A LIKENESS”，页面署名注明无可靠在世肖像。                                                                              | CC0；kind=`monogram`，出处链接至对应可靠传记。              |
| `descartes.jpg`                                                                                                                           | [Commons](https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_René_Descartes.jpg)，作者字段为“After Frans Hals”，原型记1649年。保留摹本身份，不冒充画家原作扫描。        | Public domain / PD-Art；kind=`portrait`。                   |
| `fermat.jpg`                                                                                                                              | [Commons](https://commons.wikimedia.org/wiki/File:Pierre_de_Fermat.jpg)，佚名17世纪肖像，来源St Andrews肖像档案。                                                                     | Public domain；kind=`portrait`。                            |
| `pascal.jpg`                                                                                                                              | [Commons](https://commons.wikimedia.org/wiki/File:Blaise_Pascal_Versailles.JPG)，佚名，编目约1690年；帕斯卡1662年已去世，因此明确为身后肖像。没有采用作者字段中尚需引证的具体临摹链。 | Public domain / PD-Art；kind=`later-depiction`。            |
| `huygens.jpg`                                                                                                                             | [Commons](https://commons.wikimedia.org/wiki/File:Christiaan_Huygens-painting.jpeg)，Caspar Netscher，1671年。                                                                        | Public domain / PD-Art；kind=`portrait`。                   |
| `newton.jpg`                                                                                                                              | [Commons](https://commons.wikimedia.org/wiki/File:GodfreyKneller-IsaacNewton-1689.jpg)，文件说明为Godfrey Kneller 1689年肖像的复制像。                                                | Public domain / PD-Art；kind=`portrait`，署名保留复制说明。 |

位图采用Commons提供的缩略图/原始小图，不在本地重画、上色或改变人物五官。SVG是原生矢量代码；为目视检查而渲染的联系表仅存临时目录，没有取代SVG源文件。

## 验证

- Prettier与ESLint通过。
- 数据检查确认13个固定ID、39项贡献、52个时间点、16条关系；每人至少2项资料、至少一条关系。
- 所有图像路径存在、文件均小于200KB；8张姓名字标及5幅历史肖像已亲自查看。
- 所有数学公式通过KaTeX解析；没有新增未经核实的站内链接。
- 未运行全站build，整站整合与视图检查由主任务执行。
