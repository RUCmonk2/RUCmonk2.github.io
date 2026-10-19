# 数学家人物志：狄利克雷、克莱因、希尔伯特来源说明

核对日期：2026-10-19。对应数据为 `src/data/mathematicians-goettingen.ts`。中英文人物摘要及解释为原创转述；公式采用现代记号，不视为原著引文。

## 人物与成果

| 人物     | 核对来源                                                                                                                                                                         | 本次使用范围                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 狄利克雷 | [MacTutor biography](https://mathshistory.st-andrews.ac.uk/Biographies/Dirichlet/)                                                                                               | 1805–1859；巴黎学习、柏林任教、1855 年转赴哥廷根；1837 年等差数列素数定理。                            |
| 狄利克雷 | [Jürgen Elstrodt, _The Life and Work of Gustav Lejeune Dirichlet_, Clay Mathematics Proceedings 7 (2007)](https://math.nyu.edu/~tschinke/books/gauss-dirichlet/elstrodt-new.pdf) | 原书页 4–5 的高斯著作研读；第 8 节的分析数论与单位定理，尤其页 25–26 的现代单位群表述。                |
| 狄利克雷 | [1829 年三角级数论文原文校订转录](https://arxiv.org/abs/0806.1294)、[出版者原刊书目](https://doi.org/10.1515/crll.1829.4.157)                                                    | 年代取原刊 1829 年，区别于网上重刊日期。                                                               |
| 狄利克雷 | [SMU 课程讲义，Fourier Series](https://www.physics.smu.edu/scalise/P4321sp22/fs.pdf)                                                                                             | 现代教学表述：分段 C¹ 周期函数的傅里叶级数收敛至左右极限平均。                                         |
| 狄利克雷 | [原《著作集》卷一前言](https://de.wikisource.org/wiki/Seite:G._Lejeune_Dirichlet%27s_Werke,_vol._1.pdf/11)                                                                       | 原编者明确注明 _Zur Theorie der complexen Einheiten_ 发表于 1846 年 3 月学院月报。该页是原书转录。     |
| 克莱因   | [MacTutor biography](https://mathshistory.st-andrews.ac.uk/Biographies/Klein/)                                                                                                   | 1849–1925；普吕克指导的 1868 年博士研究；1871 年非欧几何、1872 年纲领、1884 年二十面体著作及任职轨迹。 |
| 克莱因   | [Klein, _A comparative review of recent researches in geometry_](https://arxiv.org/abs/0807.3161)                                                                                | 1872 年纲领的英译转录；几何中的群作用与不变量，以及末节与伽罗瓦理论的明确比较。                        |
| 克莱因   | [Oliver Nash, _On Klein’s Icosahedral Solution of the Quintic_](https://arxiv.org/abs/1308.0955)                                                                                 | 二十面体旋转群 A₅ 与五次方程之间的关系，以及超越函数求解方法。                                         |
| 希尔伯特 | [MacTutor biography](https://mathshistory.st-andrews.ac.uk/Biographies/Hilbert/)                                                                                                 | 1862–1943；林德曼指导的 1885 年博士研究；1888 年基底定理、1895 年哥廷根任职及 1899 年《几何基础》。    |
| 希尔伯特 | [University of Chicago, P. May, _Algebra_, Theorem 37](https://www.math.uchicago.edu/~may/MISC/Algebra.pdf)                                                                      | 基底定理的现代交换 Noether 环形式。                                                                    |
| 希尔伯特 | [《几何基础》第二版节选与英译，Trinity College Dublin](https://www.maths.tcd.ie/~dwilkins/Courses/MA232A/MA232A_Mich2017/HilbertAxioms_ParallelText.html)                        | 关联、顺序、合同、平行及连续性的公理结构。页面提供 1903 年第二版；成果年 1899 取第一版。               |
| 希尔伯特 | [Hilbert, _Mathematical Problems_, 1902 英译本](https://www.gutenberg.org/ebooks/71655)                                                                                          | 完整 23 个问题的文本。页面没有把完整清单等同于当场逐一讲述，也没有把提出问题写成解决问题。             |

## 关系的含义

箭头由影响、教授或支持的一方指向受影响、学习或受支持的一方。`mentorship` 可表示明确的授课关系，节点说明进一步区分博士指导；`support` 仅表示邀请、延聘与任职支持。

| 关系 ID              | 类型         | 证据与限定                                                                                                                                                                                        |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gauss-dirichlet`    | `influence`  | Elstrodt 原书页 4–5 记述《算术研究》的反复研读；不声称高斯为其博士导师。                                                                                                                          |
| `dirichlet-riemann`  | `mentorship` | [MacTutor · Riemann](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/) 记述 1847 年起柏林学习及课程影响。黎曼博士导师仍为高斯。                                                         |
| `dirichlet-dedekind` | `mentorship` | [MacTutor · Dedekind](https://mathshistory.st-andrews.ac.uk/Biographies/Dedekind/) 记述听课及 1863 年《数论讲义》的撰写编辑；这是博士毕业后的学习关系。                                           |
| `galois-klein`       | `influence`  | 《埃尔朗根纲领》英译转录 PDF 第 20 页直接比较方程的群与几何的变换群。这是文献与理论承接。                                                                                                         |
| `klein-hilbert`      | `support`    | MacTutor 的 Hilbert 条目记述克莱因推动延聘，于 1895 年成功；希尔伯特的博士导师为林德曼。                                                                                                          |
| `klein-noether`      | `support`    | [哥廷根大学 Noether 纪念页](https://www.uni-goettingen.de/en/74993.html) 记述 1915 年由克莱因和希尔伯特邀请诺特来校研究。                                                                         |
| `hilbert-noether`    | `support`    | [哥廷根大学 Noether 资料汇编](https://emmy-noether.uni-goettingen.de/materialsammlung/) 记述希尔伯特支持其资格申请、1915–1919 年课程安排及 1919 年获授课资格。诺特 1907 年博士导师为保罗·戈尔丹。 |

## 数学表述边界

- 等差数列素数定理明确要求公差为正、首项与公差互素；不声称每一项都是素数。
- 傅里叶收敛卡片给出一个常用充分条件，不把结论推广到所有周期函数。
- 单位群的数域整数环表述及 Hilbert 基底定理的 Noether 环表述均标明是现代形式；不将后世概念原样归给十九世纪原文。
- 克莱因圆盘模型中的弦代表双曲直线，其距离不是欧氏距离。
- 克莱因的五次方程方法使用超越函数，与阿贝尔、伽罗瓦关于根式的限制相容。
- 邀请诺特与争取任教资格均记录为学术支持，不建立希尔伯特或克莱因到诺特的博士师承边。

## 肖像

与图像代理逐项核对后，数据中使用 `public/images/mathematicians/sources-expansion.json` 的最终来源信息：

| 人物     | 原图记录                                                                                                                                                  | 采用的署名与年代                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 狄利克雷 | [Peter Gustav Lejeune Dirichlet.jpg](https://commons.wikimedia.org/wiki/File:Peter_Gustav_Lejeune_Dirichlet.jpg)                                          | 佚名，1859 年以前；公共领域。            |
| 克莱因   | [Accademia delle Scienze di Torino 0078 B](https://commons.wikimedia.org/wiki/File:Felix_Klein,_ante_1897_-_Accademia_delle_Scienze_di_Torino_0078_B.jpg) | Gebrüder Noelle，1897 年以前；公共领域。 |
| 希尔伯特 | [Hilbert.jpg](https://commons.wikimedia.org/wiki/File:Hilbert.jpg)                                                                                        | 摄影者不详，1912 年以前；公共领域。      |

本次没有生成或推测人物容貌。照片文件、原图网址、许可与处理记录由肖像清单统一保存。
