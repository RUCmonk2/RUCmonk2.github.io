# 数学家人物志：分析、概率与数论人物来源

核对日期：2026-10-19。对应 `src/data/mathematicians-analysis.ts`，包含 13 位人物、39 项成果、52 个生平节点、21 条关系。正文为原创双语转述；公式和条件采用现代教学表述，不作为历史原文引语。

## 人物与成果依据

各人物的姓名、生卒年与任职轨迹均核对圣安德鲁斯大学 MacTutor 传记。成果另与原著、大学档案、数学史论文或专业教材交叉核对。

| 人物           | 传记                                                                            | 成果的补充依据                                                                                                                                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 莱布尼茨       | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Leibniz/)          | [1703 年二进位算术原文英译](https://kastalia.medienhaus.udk-berlin.de/odl/Leibniz.pdf)；[MIT Press 原始文献汇编](https://direct.mit.edu/books/monograph/5492/Leibniz-on-BinaryThe-Invention-of-Computer)。微分和积分发表年分别为 1684、1686。                                                                                               |
| 雅各布·伯努利  | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Bernoulli_Jacob/)  | [Martin Mattmüller 对《猜度术》的史料研究](https://bez.unibas.ch/fileadmin/user_upload/bez/The-difficult-birth-of-stochastics-Jacob-Bernoulli-s-Ars-Conjectandi-1713-_2014_Historia-Mathematica.pdf)；[大数定律三百年研究](https://arxiv.org/abs/1309.6488)。1713 是遗著出版年。                                                            |
| 约翰·伯努利    | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Bernoulli_Johann/) | [巴塞尔大学所藏 Fleckenstein 研究](https://bez.unibas.ch/fileadmin/user_upload/bez/Fleckenstein-Bernoulli-1949-small.pdf)。悬链线、洛必达教科书与课程、最速降线分别说明，不用家族轶事替代研究成果。                                                                                                                                         |
| 拉普拉斯       | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Laplace/)          | [David Pulskamp 整理的原始概率文献](https://www.gtfp.cs.rhul.ac.uk/pulskamp/Laplace/index.html)；[势论发展史研究](https://www.ukm.my/kamal3/ecm/bem/History%20of%20BEM.pdf)，关于 1782、1787 年势方程形式。                                                                                                                                 |
| 傅里叶         | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Fourier/)          | [1822 年《热的分析理论》原书](https://fr.wikisource.org/wiki/Th%C3%A9orie_analytique_de_la_chaleur)；[J.-P. Kahane 关于傅里叶级数起源的研究](https://bibliotheque.imo.universite-paris-saclay.fr/media/filer_public/b7/3f/b73f1679-49d5-407b-bdc9-ed73a0eff4e0/k_kahane-70.pdf)。                                                           |
| 索菲·热尔曼    | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Germain/)          | [Laubenbacher 与 Pengelley 对费马研究手稿的分析](https://arxiv.org/abs/0801.1809)；[1831 年曲率论文](https://eudml.org/doc/146720)；[Douglas Holmes 对平均曲率工作的研究](https://arxiv.org/abs/2303.13615)。                                                                                                                               |
| 雅可比         | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Jacobi/)           | [京都大学所藏 1829 年《椭圆函数新基础》](https://rmda.kulib.kyoto-u.ac.jp/item/rb00028935)；[美因茨大学提供的英译](https://download.uni-mainz.de/mathematik/Algebraische%20Geometrie/Euler-Kreis%20Mainz/Jacobi_Fundamenta%20Nova.pdf)；[原偏微分方程论文](https://gdz.sub.uni-goettingen.de/download/pdf/PPN243919689_0017/LOG_0012.pdf)。 |
| 魏尔斯特拉斯   | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Weierstrass/)      | [Allan Pinkus 关于逼近定理的研究](https://arxiv.org/abs/math/0611038)；[Trefethen 教材，第 6 章](https://people.maths.ox.ac.uk/trefethen/ATAP/ATAPfirst6chapters.pdf)。1872 指反例报告，1885 指逼近定理。                                                                                                                                   |
| 柯瓦列夫斯卡娅 | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Kovalevskaya/)     | [1875 年偏微分方程论文 DOI](https://doi.org/10.1515/crll.1875.80.1)；[1889 年刚体运动论文英译](https://arxiv.org/abs/2603.07154)。积分化简工作属于 1874 年博士研究，后来才发表。                                                                                                                                                            |
| 康托尔         | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Cantor/)           | [1895、1897 年超穷数论文英译](https://webhomes.maths.ed.ac.uk/~v1ranick/papers/cantor1.pdf)；[1891 年对角线论文转录与史学研究](https://rbhm.org.br/index.php/RBHM/article/view/441)。                                                                                                                                                       |
| 庞加莱         | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Poincare/)         | [CNRS 的 Analysis Situs 原文与讲解](https://analysis-situs.math.cnrs.fr/)；[南特大学的 1890 年动力学论文档案](https://henripoincarepapers.univ-nantes.fr/en/bibliohp/bibtex.php?bibkey=hp1890am)；[John Stillwell 原著英译](https://webhomes.maths.ed.ac.uk/~aar/papers/poincare2009.pdf)。                                                 |
| 拉马努金       | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Ramanujan/)        | [与哈代的 1918 年论文](https://doi.org/10.1112/plms/s2-17.1.75)；[1919 年分拆同余论文转录](https://ramanujan.sirinudi.org/Volumes/published/ram25.html)；[三一学院所藏 1920 年拟 theta 函数信件](https://archives.trin.cam.ac.uk/index.php/letter-by-ramanujan-on-mock-theta-functions-2)。                                                 |
| 哈代           | [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Hardy/)            | [1908 年遗传比例论文](https://pubmed.ncbi.nlm.nih.gov/17779291/)；[1914 年 ζ 零点论文原文](https://fr.wikisource.org/wiki/Page:Comptes_rendus_hebdomadaires_des_s%C3%A9ances_de_l%E2%80%99Acad%C3%A9mie_des_sciences,_tome_158,_1914.djvu/1014)；上述与拉马努金合著论文。                                                                   |

## 解释中的条件与年代

- 雅各布·伯努利出生年按公历记为 1655，原始旧历日期属于 1654；正文时间点显式说明。不要把不同历法误认成两个人。
- 莱布尼茨的微分记号不等于后来的极限定义；二进位成果也不声称所有二元表示都由他发明。
- 大数定律卡片限定独立、同成功概率的试验。傅里叶级数卡片区分表示主张与逐点收敛，反演同样保留条件。
- 拉普拉斯方程限定无源区域；摄动计算不声称无限时间尺度的绝对稳定性。
- 热尔曼素数的费马结论限定奇素数及第一情形；没有声称证明完整费马大定理。薄板工作保留其历史局限；平均曲率公式标明为现代记号。
- Jacobian 的体积解释限定光滑、局部可逆换元，并说明该对象先见于柯西。
- 柯瓦列夫斯卡娅的偏微分方程定理限定解析性、非特征初始面和局部解，不推广到一般光滑数据。她获得的是研究博士学位，不写成荣誉博士。
- 康托尔的 1874 年不可数性论证与 1891 年对角线法分别呈现；基数和序数不混同。
- 分拆公式中的渐近关系不是等式；拟 theta 函数的后世统一理论不归于拉马努金本人。
- 哈代的临界线结果是无穷多个零点，不是全部非平凡零点。遗传比例以理想随机交配模型为前提。

## 关系审计

| 关系                       | 分类                        | 核对位置或限定                                                                                                                     |
| -------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Newton—Leibniz             | 同题研究                    | Leibniz 传记的独立方法、不同发表路径与争论史；不沿用优先权指控。                                                                   |
| Leibniz → Jacob Bernoulli  | 思想承接                    | Jacob 传记的论文研读与通信。                                                                                                       |
| Leibniz ↔ Johann Bernoulli | 思想交流，`direction: both` | Johann 传记记述长期、富有成果的通信；起初学习不抹去后来的互相推进。                                                                |
| Jacob → Johann Bernoulli   | 师承                        | Johann 传记明确记录随兄学习；没有仅因亲缘连线。                                                                                    |
| Johann Bernoulli → Euler   | 师承                        | [Purdue 保存的 Euler 讲座](https://www.cs.purdue.edu/homes/wxg/Euler/EulerLect.pdf) 引述欧拉对定期接受指导的记述。                 |
| Lagrange—Laplace           | 同题研究                    | Laplace 传记对共同天体力学问题与交流的叙述。                                                                                       |
| Laplace → Fourier          | 师承                        | Fourier 传记明确记述 1795 年 École Normale 课程。                                                                                  |
| Fourier → Dirichlet        | 思想承接                    | [Elstrodt 的 Dirichlet 研究](https://math.nyu.edu/~tschinke/books/gauss-dirichlet/elstrodt-new.pdf)，原书页 6 的交往与热理论影响。 |
| Lagrange → Germain         | 学术支持                    | Germain 传记中的提交研究、认可与鼓励；不写成正式大学学籍。                                                                         |
| Gauss → Germain            | 学术支持                    | Germain 传记中的 1804–1809 年数论通信与评价。                                                                                      |
| Abel—Jacobi                | 同题研究                    | Jacobi 传记中的独立椭圆函数工作与后续交流。                                                                                        |
| Jacobi → Weierstrass       | 思想承接                    | Weierstrass 传记中的早期研读；课堂导师古德曼另有说明。                                                                             |
| Riemann—Weierstrass        | 同题研究                    | [Riemann 传记](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/) 的 1857 年阿贝尔函数研究与狄利克雷原理争论。            |
| Weierstrass → Kovalevskaya | 师承                        | Kovalevskaya 传记中的私人指导及 1874 年博士研究。                                                                                  |
| Cauchy → Kovalevskaya      | 思想承接                    | [MacTutor 所藏 DSB Cauchy 条目](https://mathshistory.st-andrews.ac.uk/DSB/Cauchy.pdf) 对偏微分方程存在性发展的说明。               |
| Dedekind ↔ Cantor          | 思想交流，`direction: both` | Cantor 传记中的可数性、实数与通信讨论，不暗示单向授受。                                                                            |
| Weierstrass → Cantor       | 师承                        | Cantor 传记中的柏林课程；博士导师为库默尔。                                                                                        |
| Klein—Poincaré             | 同题研究                    | [Klein 传记](https://mathshistory.st-andrews.ac.uk/Biographies/Klein/) 中自守函数通信与竞争。                                      |
| Riemann → Poincaré         | 思想承接                    | Stillwell 译本，原著 _On Analysis Situs_ 开头，印刷页 15，直接讨论 Riemann 与 Betti 的连通性问题。                                 |
| Hardy → Ramanujan          | 学术支持                    | Ramanujan 传记中的邀请与共同研究；明确其合作者身份。                                                                               |
| Riemann → Hardy            | 思想承接                    | Hardy 1914 年论文原题及开头的零点命题；不是会面或博士指导。                                                                        |

## 肖像与许可

完整机器可读档案位于 `public/images/mathematicians/analysis/sources.json`：每张含原文件名称、Commons 记录、原图及下载 URL、原始许可 metadata、本地尺寸与字节数、SHA-256、显示署名和处理说明。13 张均已逐张通过 `view_image` 查看，不使用生成头像或占位图。

- 12 张的 Commons 文件记录为公共领域；原作者、原作年代不明时照实注明。Germain 文件的 `Artist` 指向书籍作者，不能据此把肖像署名为 Germain 自绘，档案中保留这一 metadata 注意事项。
- Germain 采用 1896 年《哲学著作》插图，标为 `later-depiction`；该年份仅是此次图像的出版年代。Poincaré 的 1913 同样是期刊刊载年代，而不是摄影日期。
- Ramanujan 采用 [1913 年护照照片的 Commons 裁切版](<https://commons.wikimedia.org/wiki/File:Srinivasa_Ramanujan-Add._MS_a94_version2_(cropped).jpg>)，依该数字图像记录使用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。署名含原摄影者不详、剑桥三一学院与裁切者 Goszei，并说明缩小展示。它没有被标为公共领域。
- 图像优先下载 500px 宽缩略图；Laplace、Kovalevskaya、Hardy 的此版本原图小于目标尺寸，保留原大小，避免无意义放大。Johann Bernoulli 仅进行 JPEG 压缩以控制体积，未裁切或改画。
- 所有图像小于 200 KB；最终文件与来源记录的校验和一致。
