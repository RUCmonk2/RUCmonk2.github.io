# 数学家人物志：资料与图像记录

核验日期：2026-10-19。页面数据位于 `src/data/mathematicians.ts`，原图位于 `public/images/mathematicians/`。

## 第三批：50 人图谱

当前共 **50 位人物、150 项代表贡献、200 个生平或传播节点、76 条关系、9 条阅读路线**。全部人物在同一连通图中；关系有明确说明与来源，不将主题对照、读过著作、通信和博士师承混为一谈。

- [古代与近世来源说明](mathematicians-origins-sources.md)：13 人与 16 条关系。
- [分析、概率与数论来源说明](mathematicians-analysis-sources.md)：13 人与 21 条关系。
- [现代数学来源说明](mathematicians-modern-sources.md)：12 人与 20 条关系。
- 新图像分别在 `public/images/mathematicians/{origins,analysis,modern}/`，各组 `sources.json` 保存来源和许可。39 张作为历史肖像使用，2 张明确标注为后世形象，9 张为原创姓名或字母字标；不把现代想象像冒充生前容貌。开放许可未统一改称公共领域；照片作者、CC 许可及 LANL 声明随各自来源保留。
- `lifeDates` 保存未知或约略生卒信息；`born` / `died` 在这些案例中只是排序用的约略数值。前端优先显示 `lifeDates`，并格式化公元前年份。年代筛选按出生年归组；传播事件可以晚于人物卒年。
- `direction: "both"` 用于明确的双向交流；同题对照也不画单向箭头。
- `layout.ts` 使用确定性的 D3 布局和柔和的主题聚拢。头像半径为 31 / 36 / 43，约为 1 : 1.16 : 1.39 的直径比。较熟悉的人物作为视觉标记；大小不代表客观学术价值排名。连线端点随头像半径变化，标签尝试上下左右位置以避免遮挡。
- 星图支持年代、相关人物、搜索和路线筛选；可缩放、平移，并在从索引切换到视野外人物时调整相机。时间视图改为可滚动的分期列表，避免把古代与现代挤到同一根均匀横轴上。手机首次打开默认分期时间视图，也可切换星图。
- `scholar-map.tsx` 管理图谱、时间视图和相机；`mathematicians-atlas.tsx` 管理筛选与人物档案。姓名和出处始终可通过可访问名称、人物索引与档案读取，完整图中只逐步显示标签。

### 间距、屏幕比例与主题子图

布局保留斥力和碰撞计算后的真实距离，只平移居中，不再把所有中心压回固定矩形。头像、圆形裁切、光环、标签和连线端点采用同一套屏幕尺度：头像直径约38–70像素，姓名约13–18像素，避免头像越放大越占满画布。双击用附近人物的包围范围构图，保持留白。

新增高中数学、大学数学、群论、集合论、中国数学五张子图。子图使用自己的稳定布局，只画原有关系，不因共同标签虚构连线。课程子图是阅读入口，不意味着人物的全部研究属于该学段。中国数学子图目前包含刘徽、祖冲之、陈省身。

### 总览与局部展开

总览不再同时铺开 50 张头像。`visibility.ts` 依据相对缩放、当前视口和屏幕间距逐步展开人物：先显示少量主要人物，放大时优先展开当前人物的邻居与次级人物，再显示局部细节。画像的位置与关系曲线固定，不因为层级变化重新布局。姓名的避让只考虑当前已展开的人物。

搜索、年代、路线和相关人物等明确筛选的小范围结果直接展开；完整索引、时间列表和人物资料仍保留全部筛选结果。选中人物及键盘焦点不因层级变化被隐藏，隐藏头像不进入 Tab 顺序，关系线只连接两个已展开的端点。“范围”表示筛选结果，“已展开”表示图中的显示层级。双击人物可进入附近细节，“回到总览”恢复疏朗视图。

## 第二批扩充

新增欧拉、拉格朗日、柯西、狄利克雷、克莱因、希尔伯特；第二批完成时合计 **12 人、36 项成果、48 个生平节点、19 条关系**。第一批六人的资料与图像记录保留在下文。

- `src/data/mathematicians-early.ts`：前三人的双语内容和 6 条新关系；详见 [早期数学家来源说明](mathematicians-early-sources.md)。
- `src/data/mathematicians-goettingen.ts`：后三人的双语内容和 7 条新关系；详见 [哥廷根相关人物来源说明](mathematicians-goettingen-sources.md)。
- `public/images/mathematicians/sources-expansion.json`：新增六张公共领域肖像的原作、下载地址、许可和校验记录。
- `support` 单列学术支持：通信鼓励、延聘与任教资格支持不当作博士师承。当前共 4 条师承、9 条思想承接、1 条同题研究、5 条学术支持。
- 全部人物按出生年排序。时间轴按生年精确定位，拥挤年份自动换行；纵向行位只为避免重叠。关系图位置由编辑安排，不表示数值上的学术距离。
- 图谱默认展示当前人物的关系，可切换全部连线；连线弯曲只为绕开肖像。沿用原人物 hash 深链接。

## 编排与事实边界

- 关系线以可说明的学术联系为主，时间表示先后，不等于因果。首版未用亲缘关系组织人物。
- 两条 `mentorship` 分别是高斯指导黎曼的 1851 年博士论文，以及高斯指导戴德金的 1852 年博士论文。
- 黎曼与戴德金的关系包含听课、友谊与著作整理；不是博士师承。黎曼文集于 1876 年由 Heinrich Weber 在 Dedekind 协助下出版。[原著书目，ETH](https://www.e-rara.ch/zut/content/titleinfo/5507588)；[EMS 对编辑通信与档案的研究](https://euromathsoc.org/magazine/articles/18)。
- 伽罗瓦到戴德金表示著作研读与理论传播；戴德金到诺特表示理想理论的延展。不能理解为直接师生关系。
- 阿贝尔与伽罗瓦同样研究根式可解性。伽罗瓦确实阅读过阿贝尔著作，但此线不声称两人相识、合作或互为师生。[MacTutor: Galois](https://mathshistory.st-andrews.ac.uk/Biographies/Galois/)
- 伽罗瓦研究历时多年，决斗前夜书信不等于整套理论当晚诞生。避免把不能核实的决斗细节、考试故事当作人物核心。
- 现代术语用于解释贡献，不暗示历史作者当时已使用同样定义或符号。根式可解性说明限定特征零；理想唯一分解限定数域整数环；诺特定理限定作用量框架。

## 文献核对

| 人物   | 主要资料                                                                                                                                                                                                                                       | 处理过的日期或内容问题                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 高斯   | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Gauss/)；[1828 年曲面论原著，ETH](https://www.e-rara.ch/zut/doi/10.3931/e-rara-59755)                                                                                             | 曲面论文 1827 年提交、1828 年刊出，成果年份写为 1827–1828。未采用「用最小二乘找回谷神星」等有史学争议的简化叙述。     |
| 阿贝尔 | [阿贝尔奖官方简介](https://abelprize.no/page/about-niels-henrik-abel)；[官方游学传记](https://abelprize.no/page/biography-niels-henrik-abel-great-journey-abroad)；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Abel/)         | 五次方程结论是一般方程没有通用根式公式，不能写成所有五次方程无根式解。巴黎论文 1826 年提交、1841 年首印。             |
| 伽罗瓦 | [1846 年原著合集，Numdam](https://www.numdam.org/item/JMPA_1846_1_11__381_0/)；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Galois/)                                                                                           | 1830 年有限域论文；1831 年根式可解性论文。1846 年是刘维尔整理刊出的年份，在年表中明确为身后传播。                     |
| 黎曼   | [原著合集，Trinity College Dublin](https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Papers.html)；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/)                                                                   | 1854 年几何演讲后来才刊出。ζ 级数表达式只用于 Re(s)>1；黎曼猜想标为猜想，不列为已证明结果。                           |
| 戴德金 | [《数论论集》原著英译](https://www.gutenberg.org/ebooks/21016)；[1871、1878 年论文注释译本](https://arxiv.org/abs/2107.08905)；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Dedekind/)                                         | 理想理论 1871 年已见于狄利克雷讲义第二版附录；没有误用后续 1879 年第三版为首次。分割思想形成于 1858 年、1872 年发表。 |
| 诺特   | [1918 年论文英译](https://arxiv.org/abs/physics/0503066)；[1921 年理想论英译](https://arxiv.org/abs/1401.2577)；[1927 年论文](https://doi.org/10.1007/BF01209152)；[MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Noether_Emmy/) | 1924 年相关简报与 1927 年完整论文易混淆；卡片选用可据原刊核验的 1927 年论文。准素分解、素理想乘积分解分开表述。       |

正文为简短的原创中英解释。每个人物内有可点击资料入口，每条关系线另有一条直接支持关系说明的来源。

## 肖像选择与授权

全部下载自 Wikimedia Commons，逐张读取文件页及 API 的许可字段并检查像素内容。六张均标为公共领域；未使用生成肖像、上色或面部重建。使用 Commons 文件本身，没有本地修改像素。界面可通过 CSS 调整取景。

| 本地文件       | 原作与来源                                                                                                                                                                                                                      | 许可与说明                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `gauss.jpg`    | [Carl Friedrich Gauss.jpg](https://commons.wikimedia.org/wiki/File:Carl_Friedrich_Gauss.jpg)：Gottlieb Biermann 于 1887 年临摹 Christian Albrecht Jensen 的 1840 年肖像；Gauß-Gesellschaft Göttingen，A. Wittmann 摄制          | Public domain / PD-Art。Commons 的简短日期字段仍显示 1840，但说明与作者明确记录 1887 年临摹，页面署名据后者。 |
| `abel.jpg`     | [Gørbitz - Niels Henrik Abel.jpg](https://commons.wikimedia.org/wiki/File:G%C3%B8rbitz_-_Niels_Henrik_Abel.jpg)：Johan Gørbitz，1820 年代；C. A. Bjerknes 1885 年传记的复制图                                                   | Public domain / PD-Art。官方阿贝尔奖站把原肖像定为 1826 年，图注保留 Commons 较宽的年代。                     |
| `galois.jpg`   | [Evariste Galois.jpg](https://commons.wikimedia.org/wiki/File:Evariste_Galois.jpg)：佚名，约 1826 年素描；1897 年《数学著作集》所收                                                                                             | Public domain。图中约十五岁；不把它当作成年时的照片，也不误署为兄弟 Alfred 的另一幅肖像。                     |
| `riemann.jpg`  | [BernhardRiemannAWeger.jpg](https://commons.wikimedia.org/wiki/File:BernhardRiemannAWeger.jpg)：August Weger，1863 年版画；Bildarchiv Austria                                                                                   | Public domain。保留版画身份，不称照片。                                                                       |
| `dedekind.jpg` | [ETH-BIB-Dedekind … Portr 11953 (cropped).jpg](<https://commons.wikimedia.org/wiki/File:ETH-BIB-Dedekind,_Julius_Wilhelm_Richard_(1831-1916)-Portrait-Portr_11953.tif_(cropped).jpg>)：Johannes Ganz，1886 年前；ETH-Bibliothek | Public domain。Commons 裁切版本，为全身照；圆形头像需靠上取景。                                               |
| `noether.jpg`  | [Noether.jpg](https://commons.wikimedia.org/wiki/File:Noether.jpg)：佚名摄影，约 1900 年；由 Mathematical Association of America 等机构传播                                                                                     | Public domain。明确作者未知、约略日期；不是晚年肖像。                                                         |

`public/images/mathematicians/sources.json` 保存 Commons 文件名、原始下载地址、说明页地址、作者、许可及来源 metadata，便于复核。图像原件合计约 4 MB，使用本地路径以免运行时依赖 Wikimedia。

## 验证

- `npx prettier --write src/data/mathematicians.ts`
- `npx eslint src/data/mathematicians.ts`
- 六张本地文件已逐张目视确认身份、画面与来源类型。
- 数据含 6 人、18 项成果、24 条时间点、6 条关系；所有关系端点均为首版人物。
