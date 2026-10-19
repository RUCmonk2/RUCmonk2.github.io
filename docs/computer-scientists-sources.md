# 信息学家人物志：内容、关系与影像证据

核验截至 **2026-10-19**。50位研究者，150项代表贡献，200条生平节点，67条有源关系；47张真实历史影像、3张明确标为非肖像的原创姓名字标。范围涵盖计算理论、算法、体系结构、程序语言与软件、数据库、网络、密码、信息论和人工智能。

## 数据边界与核验说明

- `computerScientists` 与 `computerScientistRelations` 位于 `src/data/computer-scientists.ts`，类型从数学家数据共享；在世者使用 `died: null` 和中英出生年标签。生卒与当前状态核对过机构档案、个人主页、讣告及最新百科导引；正文不把过期机构主页上的职务当作当前身份。
- 霍尔于 **2026-03-05** 去世，以牛津Wolfson及计算机系讣告为据；拉宾于 **2026-04-14** 去世，以IAS 2026-04-20纪念页为据；玛格丽特·汉密尔顿于 **2026-09-30** 去世，以MIT 2026-10-07纪念页为据。三人均未误标为在世。
- Goldwasser的出生年份存在1958/1959的资料差异。本版采用魏茨曼机构传记及AAAS记录的 **1958**；不采用未进一步证实的月日。她的博士完成与加入MIT写为1983–1984阶段，避免把论文、授予学位与任职日期混成单一日期。
- Rabin的博士年份资料有1956/1957差异，IAS及哈佛CV列1957；本版生平用“1950年代在普林斯顿随丘奇研究”，师承有AMS资料独立佐证。
- 不沿用部分简历中里奇“1968获博士学位”的表述：正文仅写哈佛学习背景与1967加入贝尔实验室。
- 贡献不是奖项清单。通用机器设计与实物、首次论文与后续实现、个人贡献与团队成果分别处理；FORTRAN、COBOL、Unix、RSA、Apollo、ImageNet及神经网络工作均说明协作。

## 必要的技术限定

- 哥德尔不完备性保留一致性、有效公理化及足够算术能力；Church–Turing论题不写成一般形式定理。
- Dijkstra最短路限定非负边权；Quicksort区分期望复杂度和最坏情况；DFA最小化的O(n log n)注明固定字母表。
- NP完备不被误写成P≠NP已证，也不表示每个具体实例都难；Hopcroft–Karp的O(E√V)针对二分图。
- Hoare部分正确性不自动保证终止；Church–Rosser合流性不自动保证终止；行为子类型关注行为规范而非仅签名。
- **Paxos明确采用非拜占庭崩溃／恢复故障模型**，并区分安全性与活性。拜占庭3f+1界限说明经典模型；不把两类故障混用。
- 原始RSA和未经认证的Diffie–Hellman不作为可直接安全部署的完整方案；MD4/MD5的历史贡献与已知碰撞缺陷同时说明。
- 阈值秘密分享注明有限域和随机多项式；零知识与公钥安全依赖其明确模型。
- Shannon熵区分统计信息量与语义价值；容量结论限定离散无记忆信道和渐近错误概率。
- 神经网络表述不把特定感知机限制泛化成所有网络无效，不把1986论文写成反向传播全部思想的唯一源头，不把注意力翻译等同完整Transformer。

## 人物证据目录

### 巴贝奇 / Charles Babbage

- ID：`babbage`；生卒：1791—1871。
- 代表贡献：1822 差分机方案；1830年代 分析机；1847–1849 差分机二号的简化设计。
- [Science Museum · Charles Babbage](https://collection.sciencemuseumgroup.org.uk/people/cp36993)
- [Oxford History of Science Museum · Babbage & Lovelace](https://www.hsm.ox.ac.uk/imagining-ai)
- [MacTutor · Babbage](https://mathshistory.st-andrews.ac.uk/Biographies/Babbage/)

### 布尔 / George Boole

- ID：`boole`；生卒：1815—1864。
- 代表贡献：1847 逻辑的数学分析；1854 《思维规律》；1854 逻辑约束下的概率推断。
- [University College Cork · George Boole](https://www.ucc.ie/en/heritage/history/people/ucc-staff/professor-george-boole/)
- [MacTutor · George Boole](https://mathshistory.st-andrews.ac.uk/Biographies/Boole/)

### 洛夫莱斯 / Ada Lovelace

- ID：`lovelace`；生卒：1815—1852。
- 代表贡献：1843 扩充分析机的技术说明；1843 伯努利数计算表；1843 超越算术的符号操作。
- [MacTutor · Ada Lovelace](https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/)
- [Oxford History of Science Museum · Babbage & Lovelace](https://www.hsm.ox.ac.uk/imagining-ai)

### 霍勒里斯 / Herman Hollerith

- ID：`hollerith`；生卒：1860—1929。
- 代表贡献：1889 电气制表系统；1890 大规模人口普查处理；1890年代 可重复分类的数据记录。
- [U.S. Census Bureau · Hollerith machine](https://www.census.gov/about/history/bureau-history/census-innovations/technology/hollerith-machine.html)
- [Smithsonian · From Hollerith to IBM](https://www.si.edu/spotlight/tabulating-equipment/from-herman-hollerith-to-ibm)
- [IBM · Punched card tabulator](https://www.ibm.com/history/punched-card-tabulator)

### 丘奇 / Alonzo Church

- ID：`church`；生卒：1903—1995。
- 代表贡献：1932–1936 λ演算；1936 一阶逻辑判定问题无通解；1936 Church–Rosser 定理。
- [MacTutor · Alonzo Church](https://mathshistory.st-andrews.ac.uk/Biographies/Church/)
- [Princeton · Alonzo Church papers](https://www.princeton.edu/news/2003/05/06/library-acquires-papers-eminent-mathematician)
- [Princeton Alumni Weekly · Alonzo Church](https://paw.princeton.edu/memorial/alonzo-church-24-27)

### 冯·诺伊曼 / John von Neumann

- ID：`von-neumann`；生卒：1903—1957。
- 代表贡献：1928 有限零和博弈的极小极大定理；1932 量子理论的希尔伯特空间框架；1945 EDVAC 报告与存储程序思想。
- [MacTutor · John von Neumann](https://mathshistory.st-andrews.ac.uk/Biographies/Von_Neumann/)
- [IAS · John von Neumann: Life, Work, and Legacy](https://www.ias.edu/von-neumann)
- [IAS · Electronic Computer Project records](https://www.ias.edu/sites/default/files/library/page/ECP.html)

### 哥德尔 / Kurt Gödel

- ID：`godel`；生卒：1906—1978。
- 代表贡献：1929–1930 一阶逻辑的完备性；1931 不完备性定理；1938–1940 可构造宇宙与相对一致性。
- [MacTutor · Kurt Gödel](https://mathshistory.st-andrews.ac.uk/Biographies/Godel/)
- [Stanford Encyclopedia · Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/)
- [IAS · Kurt Gödel](https://www.ias.edu/scholars/godel)

### 霍珀 / Grace Hopper

- ID：`hopper`；生卒：1906—1992。
- 代表贡献：1940年代 Mark I程序与技术文档；1952 A-0自动编程系统；1957–1959 FLOW-MATIC与商业语言。
- [IEEE Computer Society · Grace Hopper](https://history.computer.org/pioneers/hopper.html)
- [MacTutor · Grace Hopper](https://mathshistory.st-andrews.ac.uk/Biographies/Hopper/)

### 楚泽 / Konrad Zuse

- ID：`zuse`；生卒：1910—1995。
- 代表贡献：1938 Z1的二进制机械设计；1941 继电器计算机Z3；1940年代 Plankalkül。
- [IEEE Computer Society · Konrad Zuse](https://history.computer.org/pioneers/zuse.html)
- [MacTutor · Konrad Zuse](https://mathshistory.st-andrews.ac.uk/Biographies/Zuse/)

### 图灵 / Alan Mathison Turing

- ID：`turing`；生卒：1912—1954。
- 代表贡献：1936–1937 通用机器与不可判定性；1950 把机器智能变成可讨论的实验；1952 反应与扩散产生图案。
- [MacTutor · Alan Turing](https://mathshistory.st-andrews.ac.uk/Biographies/Turing/)
- [Turing · On Computable Numbers (1936–1937)](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf)
- [Oxford Mathematics · Turing’s morphogenesis](https://www.maths.ox.ac.uk/outreach/oxford-mathematics-alphabet/m-morphogenesis)

### 威尔克斯 / Maurice Wilkes

- ID：`wilkes`；生卒：1913—2010。
- 代表贡献：1949 EDSAC；1951 程序库与子程序方法；1951 微程序控制。
- [Cambridge · Maurice Wilkes biography](https://www.cl.cam.ac.uk/archive/mvw1/short-biography.html)
- [IEEE Computer Society · Maurice Wilkes](https://history.computer.org/pioneers/wilkes.html)

### 香农 / Claude Elwood Shannon

- ID：`shannon`；生卒：1916—2001。
- 代表贡献：1937–1938 用布尔代数设计电路；1948 熵与无损压缩的极限；1948 有噪声信道的容量。
- [MacTutor · Claude Shannon](https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/)
- [Shannon · A Mathematical Theory of Communication (1948)](https://web.mit.edu/6.976/www/handout/shannon.pdf)

### 西蒙 / Herbert A. Simon

- ID：`simon`；生卒：1916—2001。
- 代表贡献：1955 有限理性；1956–1959 早期符号问题求解程序；1972 人类问题求解的计算研究。
- [Carnegie Mellon · Herbert Simon](https://www.cs.cmu.edu/simon/)
- [Nobel · Herbert Simon autobiographical account](https://www.nobelprize.org/prizes/economic-sciences/1978/simon/biographical/)
- [CMU Libraries · Newell and Simon collaboration](https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell)

### 科德 / Edgar F. Codd

- ID：`codd`；生卒：1923—2003。
- 代表贡献：1970 关系数据模型；1970–1972 规范化与依赖关系；1972 关系查询的表达能力。
- [IBM Research · Relational model paper](https://research.ibm.com/publications/a-relational-model-of-data-for-large-shared-data-banks)
- [IBM · Relational database history](https://www.ibm.com/history/relational-database)

### 夏培肃 / Xia Peisu

- ID：`xia-peisu`；生卒：1923—2014。
- 代表贡献：1958–1960 107计算机的整体设计；1960 可靠存储与电路设计；1950年代起 计算机原理教学体系。
- [Chinese Academy of Sciences · Xia Peisu](https://www.cas.cn/xzfc/202302/t20230210_4874534.shtml)
- [USTC · Xia Peisu oral history](https://arch.ustc.edu.cn/2023/0905/c30534a611227/page.htm)
- [China Scientists Museum · Xia and Model 107](https://mmcs.cast.org.cn/kxjfc/kxjfc/xps/bd4300/art/2023/art_a0dd1a9a70584ab098127d1019640568.html)

### 巴科斯 / John Backus

- ID：`backus`；生卒：1924—2007。
- 代表贡献：1957 FORTRAN编译器；1959–1960 BNF语法记法；1977–1978 函数级程序构造。
- [CHM · John Backus](https://computerhistory.org/profile/john-backus/)
- [Alex Aiken · John Backus](https://theory.stanford.edu/~aiken/other/backus.pdf)
- [Backus · The history of FORTRAN](https://softwarepreservation.computerhistory.org/FORTRAN/paper/p45-backus.pdf)

### 麦卡锡 / John McCarthy

- ID：`mccarthy`；生卒：1927—2011。
- 代表贡献：1958–1960 Lisp；1959–1961 通用分时计算的倡议；1963–1969 情境演算与常识推理。
- [Stanford · John McCarthy](https://www-formal.stanford.edu/jmc/personal.html)
- [McCarthy · Recursive Functions of Symbolic Expressions](https://www-formal.stanford.edu/jmc/recursive.html)
- [McCarthy et al. · Dartmouth proposal](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html)

### 明斯基 / Marvin Minsky

- ID：`minsky`；生卒：1927—2016。
- 代表贡献：1969 感知机能力的数学分析；1974 框架式知识表示；1986 《心智社会》。
- [MIT · Minsky biography](https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/minskybiog.html)
- [MIT · Society of Mind course](https://ocw.mit.edu/courses/6-868j-the-society-of-mind-fall-2011/)
- [Dartmouth AI research proposal](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html)

### 纽厄尔 / Allen Newell

- ID：`newell`；生卒：1927—1992。
- 代表贡献：1956 逻辑理论机；1957–1959 通用问题求解器GPS；1980年代 Soar认知架构。
- [Carnegie Mellon Libraries · Allen Newell](https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell)
- [IEEE Computer Society · Allen Newell](https://www.computer.org/profiles/allen-newell)

### 戴克斯特拉 / Edsger W. Dijkstra

- ID：`dijkstra`；生卒：1930—2002。
- 代表贡献：1959 最短路径算法；1965 并发互斥与信号量；1968–1976 结构化程序与谓词变换。
- [University of Texas · Dijkstra archive](https://www.cs.utexas.edu/~EWD/)
- [MacTutor · Dijkstra](https://mathshistory.st-andrews.ac.uk/Biographies/Dijkstra/)

### 拉宾 / Michael Oser Rabin

- ID：`rabin`；生卒：1931—2026。
- 代表贡献：1959 有限自动机与非确定性；1976–1980 随机素性检验；1979 基于平方求根的公钥方案。
- [IAS · Michael Rabin memorial, 2026](https://www.ias.edu/news/memoriam-michael-o-rabin)
- [AMS · Church and his doctoral students](https://mathvoices.ams.org/featurecolumn/2024/10/01/people-and-computers-compared/)
- [IEEE · Dana Scott and joint automata work](https://history.computer.org/scott.html)

### 弗朗西丝·艾伦 / Frances Allen

- ID：`frances-allen`；生卒：1932—2020。
- 代表贡献：1966 系统化程序优化；1970年代 控制流与数据流分析；1980年代 自动并行化PTRAN。
- [CHM · Frances Allen](https://computerhistory.org/profile/frances-allen/)
- [ACM · Fran Allen oral history](https://ceohp.heritage.acm.org/allenf-overview/)
- [ACM · Compiler research citation](https://www.acm.org/binaries/content/assets/press-releases/2006/2006-turing-award-laureate.pdf)

### 达纳·斯科特 / Dana Scott

- ID：`scott`；生卒：1932年生。
- 代表贡献：1959 自动机的确定性与非确定性；1969起 域理论；1970年代 指称语义。
- [Carnegie Mellon · Dana Scott](https://www.csd.cs.cmu.edu/people/faculty/dana-scott)
- [IEEE Computer Society · Dana Scott](https://history.computer.org/scott.html)

### 霍尔 / Tony Hoare

- ID：`hoare`；生卒：1934—2026。
- 代表贡献：1959–1962 快速排序；1969 霍尔逻辑；1978起 通信顺序进程CSP。
- [CHM · Sir Antony Hoare](https://computerhistory.org/profile/sir-antony-hoare/)
- [Oxford Wolfson · Hoare memorial](https://www.wolfson.ox.ac.uk/news/wolfson-emeritus-fellow-professor-sir-tony-hoare-dies/)
- [Oxford Computer Science · Tony Hoare](https://www.cs.ox.ac.uk/people/tony.hoare/index1.html)

### 沃思 / Niklaus Wirth

- ID：`wirth`；生卒：1934—2024。
- 代表贡献：1970 Pascal；1978–1979 Modula-2；1986–1988 Oberon系统。
- [CHM · Niklaus Wirth](https://computerhistory.org/profile/niklaus-wirth/)
- [ETH · Wirth publications](https://people.inf.ethz.ch/wirth/)

### 卡普 / Richard M. Karp

- ID：`karp`；生卒：1935年生。
- 代表贡献：1962 Held–Karp动态规划；1972 21类NP完备问题；1987 Rabin–Karp字符串搜索。
- [UC Berkeley · Richard Karp](https://www2.eecs.berkeley.edu/Faculty/Homepages/karp.html)
- [Karp · Reducibility Among Combinatorial Problems](https://doi.org/10.1007/978-1-4684-2001-2_9)

### 斯帕克·琼斯 / Karen Spärck Jones

- ID：`sparck-jones`；生卒：1935—2007。
- 代表贡献：1960年代 语义分类与自动语言处理；1972 逆文档频率IDF；1976起 概率信息检索。
- [Cambridge · Karen Spärck Jones archive](https://www.cl.cam.ac.uk/archive/ksj21/)
- [Cambridge · Spärck Jones obituary](https://www.cl.cam.ac.uk/misc/obituaries/sparck-jones/)
- [Cambridge · Publications](https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/ksjbib3.html)

### 玛格丽特·汉密尔顿 / Margaret Elaine Hamilton

- ID：`margaret-hamilton`；生卒：1936—2026。
- 代表贡献：1960年代 阿波罗飞行软件工程；1968–1969 防御式软件与任务优先级；1976–1986起 系统建模与错误预防。
- [MIT · Hamilton memorial, 2026](https://news.mit.edu/2026/margaret-hamilton-computing-pioneer-dies-1007)
- [MIT · Apollo software recollections](https://news.mit.edu/2009/apollo-vign-0717)

### 卡恩 / Robert Elliot Kahn

- ID：`kahn`；生卒：1938年生。
- 代表贡献：1960年代末 ARPANET系统设计；1973–1974 开放网络互联；1990年代 数字对象架构。
- [CHM · Robert Kahn](https://computerhistory.org/profile/robert-kahn/)
- [Cerf–Kahn · Packet Network Intercommunication](https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf)
- [CNRI · Digital Object Architecture](https://www.cnri.reston.va.us/k-w.html)

### 高德纳 / Donald Knuth

- ID：`knuth`；生卒：1938年生。
- 代表贡献：1968起 《计算机程序设计艺术》；1977起 TeX与METAFONT；1984 文学化编程。
- [Stanford · Donald Knuth](https://profiles.stanford.edu/donald-knuth)
- [Stanford · Knuth publications and CV](https://cs.stanford.edu/~knuth/vita.html)
- [CHM · Donald Knuth](https://computerhistory.org/profile/donald-knuth/)

### 库克 / Stephen Cook

- ID：`cook`；生卒：1939年生。
- 代表贡献：1971 SAT的NP完备性；1975 多项式时间计算的形式理论；1979 命题证明系统的复杂度。
- [Toronto · Theory faculty](https://www.cs.toronto.edu/theory/faculty.html)
- [ACM · Stephen Cook oral history](https://amturing.acm.org/pdf/CookTuringTranscript.pdf)
- [Stephen Cook · Research homepage](https://www.cs.toronto.edu/~sacook/)

### 霍普克罗夫特 / John Hopcroft

- ID：`hopcroft`；生卒：1939年生。
- 代表贡献：1971 确定有限自动机最小化；1973 二分图最大匹配；1974 线性时间平面性检验。
- [Cornell · John Hopcroft and bibliography](https://www.cs.cornell.edu/jeh/)
- [Hopcroft–Karp · Bipartite matching](https://doi.org/10.1137/0202019)

### 利斯科夫 / Barbara Liskov

- ID：`liskov`；生卒：1939年生。
- 代表贡献：1974–1977 CLU与数据抽象；1987–1994 行为子类型；1999 实用拜占庭容错。
- [CHM · Barbara Liskov](https://computerhistory.org/profile/barbara-liskov/)
- [MIT · Liskov and the Turing Award](https://news.mit.edu/2009/turing-liskov-0310)
- [Castro–Liskov · PBFT](https://pmg.csail.mit.edu/papers/osdi99.pdf)

### 兰波特 / Leslie Lamport

- ID：`lamport`；生卒：1941年生。
- 代表贡献：1978 逻辑时钟与先发生关系；1982 拜占庭将军问题；1989 / 1998 Paxos一致性协议。
- [Leslie Lamport · Publications with commentary](https://lamport.azurewebsites.net/pubs/pubs.html)
- [ACM · Leslie Lamport biography](https://amturing.acm.org/award_winners/lamport_1205376.cfm)

### 里奇 / Dennis Ritchie

- ID：`ritchie`；生卒：1941—2011。
- 代表贡献：1972起 C语言；1969–1973 共同发展Unix；1978 清楚描述C的语言与用法。
- [CHM · Dennis Ritchie](https://computerhistory.org/profile/dennis-ritchie/)
- [Ritchie · The development of the C language](https://www.bell-labs.com/usr/dmr/www/chist.html)

### 瑟夫 / Vint Cerf

- ID：`cerf`；生卒：1943年生。
- 代表贡献：1973–1974 互联网络传输协议；1983–1989 MCI Mail与网络邮件互联；1990年代起 延迟容忍网络。
- [CHM · Vinton Cerf](https://computerhistory.org/profile/vint-cerf/)
- [Cerf–Kahn · A Protocol for Packet Network Intercommunication](https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf)
- [RFC 4838 · Delay-Tolerant Networking Architecture](https://www.rfc-editor.org/rfc/rfc4838.html)

### 斯通布雷克 / Michael Stonebraker

- ID：`stonebraker`；生卒：1943年生。
- 代表贡献：1974–1976 INGRES；1986起 POSTGRES；2005 C-Store与列式系统。
- [MIT CSAIL · Michael Stonebraker](https://www.csail.mit.edu/person/michael-stonebraker)
- [CHM · Michael Stonebraker](https://computerhistory.org/profile/michael-stonebraker/)

### 汤普森 / Ken Thompson

- ID：`thompson`；生卒：1943年生。
- 代表贡献：1969 Unix的初始实现；1968 正则表达式搜索实现；1992 UTF-8编码。
- [CHM · Ken Thompson](https://computerhistory.org/profile/ken-thompson/)
- [Rob Pike · UTF-8 history](https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt)

### 迪菲 / Whitfield Diffie

- ID：`diffie`；生卒：1944年生。
- 代表贡献：1976 公开密钥的构想；1976 Diffie–Hellman密钥交换；1992 认证密钥交换。
- [CHM · Whitfield Diffie](https://computerhistory.org/profile/whitfield-diffie/)
- [Diffie–Hellman · New Directions in Cryptography](https://ee.stanford.edu/~hellman/publications/24.pdf)
- [Diffie, van Oorschot & Wiener · Authentication and authenticated key exchanges](https://people.scs.carleton.ca/~paulv/papers/sts-final.pdf)

### 赫尔曼 / Martin Hellman

- ID：`hellman`；生卒：1945年生。
- 代表贡献：1976 公钥密码框架；1976 共享秘密的公开协商；1980 时间—存储折衷。
- [CHM · Martin Hellman](https://computerhistory.org/profile/martin-hellman/)
- [Stanford · Hellman publications](https://ee.stanford.edu/~hellman/publications.html)

### 姚期智 / Andrew Chi-Chih Yao

- ID：`yao`；生卒：1946年生。
- 代表贡献：1977 随机算法的极小极大方法；1979 通信复杂性；1982–1986 安全两方计算。
- [Tsinghua · Andrew Yao](https://iiis.tsinghua.edu.cn/en/People/Faculty/yaoqizhi.htm)
- [ACM · Andrew Yao biography](https://amturing.acm.org/award_winners/yao_1611524.cfm)

### 辛顿 / Geoffrey Hinton

- ID：`hinton`；生卒：1947年生。
- 代表贡献：1986 推广多层网络的反向传播；2006 深度信念网络；2012 AlexNet合作研究。
- [University of Toronto · Geoffrey Hinton](https://www.cs.toronto.edu/~hinton/)
- [LeCun, Bengio & Hinton · Deep learning](https://www.nature.com/articles/nature14539)
- [Krizhevsky, Sutskever & Hinton · ImageNet classification](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)

### 里维斯特 / Ron Rivest

- ID：`rivest`；生卒：1947年生。
- 代表贡献：1977–1978 RSA；1990–1992 MD4与MD5；2000年代起 选举验证与审计。
- [MIT · Ronald Rivest](https://people.csail.mit.edu/rivest/)
- [Rivest, Shamir & Adleman · RSA paper](https://people.csail.mit.edu/rivest/Rsapaper.pdf)

### 珀尔曼 / Radia Perlman

- ID：`perlman`；生卒：1951年生。
- 代表贡献：1985 生成树协议；1980年代 链路状态路由设计；2004–2011 TRILL与路由桥。
- [Internet Hall of Fame · Radia Perlman](https://www.internethalloffame.org/inductee/radia-perlman/)
- [RFC 6325 · Routing Bridges: Base Protocol](https://www.rfc-editor.org/rfc/rfc6325.html)

### 沙米尔 / Adi Shamir

- ID：`shamir`；生卒：1952年生。
- 代表贡献：1977–1978 共同提出RSA；1979 阈值秘密分享；1992 IP=PSPACE。
- [Weizmann · Adi Shamir](https://www.wisdom.weizmann.ac.il/~shamir/)
- [Rivest, Shamir & Adleman · RSA](https://people.csail.mit.edu/rivest/Rsapaper.pdf)
- [Shamir · IP = PSPACE](https://doi.org/10.1145/146585.146609)

### 伯纳斯-李 / Tim Berners-Lee

- ID：`berners-lee`；生卒：1955年生。
- 代表贡献：1989–1990 万维网的模型与实现；1990年代 URI、HTTP与HTML；2010年代 Solid与个人数据控制。
- [W3C · Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/)
- [CERN · The birth of the Web](https://home.cern/science/computing/the-birth-of-the-web)

### 戈德瓦塞尔 / Shafi Goldwasser

- ID：`goldwasser`；生卒：1958年生。
- 代表贡献：1982–1984 概率加密与语义安全；1985–1989 零知识交互证明；1988 抵抗选择消息攻击的签名。
- [MIT CSAIL · Shafi Goldwasser](https://www.csail.mit.edu/person/shafi-goldwasser)
- [Weizmann · Institutional biography](https://www.wisdom.weizmann.ac.il/~/oded/COL/bio.pdf)
- [Goldwasser–Micali · Probabilistic encryption](https://doi.org/10.1016/0022-0000(84)90070-9)

### 勒昆 / Yann LeCun

- ID：`lecun`；生卒：1960年生。
- 代表贡献：1989 可训练卷积网络；1998 LeNet与文档识别；2006起 能量模型的学习框架。
- [Yann LeCun · Research website](https://yann.lecun.com/)
- [LeCun et al. · Gradient-Based Learning Applied to Document Recognition](http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf)
- [LeCun, Bengio & Hinton · Deep learning](https://www.nature.com/articles/nature14539)

### 本吉奥 / Yoshua Bengio

- ID：`bengio`；生卒：1964年生。
- 代表贡献：2003 神经概率语言模型；2006–2007 深层网络的逐层训练；2014–2015 神经机器翻译中的注意力。
- [Yoshua Bengio · Research biography](https://yoshuabengio.org/)
- [Bengio et al. · A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html)
- [Bahdanau, Cho & Bengio · Neural Machine Translation](https://arxiv.org/abs/1409.0473)

### 李飞飞 / Fei-Fei Li

- ID：`fei-fei-li`；生卒：1976年生。
- 代表贡献：2003–2006 少样本视觉学习；2009 ImageNet；2016 视觉关系识别。
- [Stanford · Fei-Fei Li](https://profiles.stanford.edu/fei-fei-li)
- [Stanford Vision Lab · Publications](https://vision.stanford.edu/publications.html)
- [ImageNet Large Scale Visual Recognition Challenge](https://arxiv.org/abs/1409.0575)

## 关系的解释边界

`mentorship`只用于有据可查的博士或明确研究指导。共同论文与组织交流使用`support`，共同研究明确`direction: both`。`influence`包括可追查的文献、协议和技术依赖，不能据此推断相识。

- Hollerith→Backus追踪早期FORTRAN手册中的Hollerith编码和卡片介质，不主张两人见面；Hopper→Backus有巴科斯本人回忆1954年霍珀组织研讨会的证据，不假定FORTRAN直接来自A-0。
- Zuse↔von Neumann的`parallel`有楚泽本人回顾中明确的自我复制方案比较；Dijkstra↔Hamilton的`parallel`有1983年EWD852对HOS的具体文献评议。两者都不是为补连接而编造的人际关系。
- 图灵、斯科特、拉宾的丘奇师承与哥德尔对拉宾的1958年定期指导区分；勒昆在辛顿处为博士后，不是博士导师关系。

- **babbage → lovelace** · `support` · 双向：两人讨论分析机实例与注释，洛夫莱斯扩写技术说明并检查计算。 [证据](https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/)
- **lovelace → turing** · `influence`：图灵1950年论文直接讨论「洛夫莱斯的反对意见」，回应机器能否产生新事物的问题。 [证据](https://academic.oup.com/mind/article/LIX/236/433/986238)
- **boole → shannon** · `influence`：香农用布尔式逻辑分析继电器电路，把推理运算变成工程设计工具。 [证据](https://dspace.mit.edu/handle/1721.1/11173)
- **hollerith → backus** · `influence`：早期FORTRAN手册明确使用Hollerith文本与卡片输入。此线追踪编码和介质的技术延续，并非两人相识。 [证据](https://bitsavers.trailing-edge.com/pdf/ibm/704/704_FortranProgRefMan_Oct56.pdf)
- **godel → church** · `influence`：哥德尔的不完备性结果构成丘奇研究有效可计算性与不可判定性的逻辑背景。 [证据](https://plato.stanford.edu/entries/church/)
- **godel → turing** · `influence`：图灵1936年论文把计算模型与哥德尔结果联系起来，研究机械程序的限制。 [证据](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf)
- **church → turing** · `mentorship`：图灵在丘奇指导下研究逻辑系统，于1938年完成普林斯顿博士学位。 [证据](https://mathshistory.st-andrews.ac.uk/Biographies/Turing/)
- **church → scott** · `mentorship`：斯科特在普林斯顿由丘奇指导，1958年获博士学位。 [证据](https://history.computer.org/scott.html)
- **church → rabin** · `mentorship`：拉宾在丘奇指导下完成博士研究，随后把逻辑训练带入自动机与复杂性。 [证据](https://mathvoices.ams.org/featurecolumn/2024/10/01/people-and-computers-compared/)
- **godel → rabin** · `mentorship`：拉宾1958年在高等研究院与哥德尔每周讨论；这是研究指导，不是其博士师承。 [证据](https://www.ias.edu/news/memoriam-michael-o-rabin)
- **rabin → scott** · `support` · 双向：1959年合著有限自动机与判定问题论文，引入并分析非确定性有限自动机。 [证据](https://doi.org/10.1147/rd.32.0114)
- **turing → shannon** · `influence`：香农1956年研究两状态通用图灵机，直接延展图灵的计算模型。 [证据](https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/)
- **von-neumann → wilkes** · `influence`：威尔克斯阅读EDVAC报告并考察美国计算机工作后，领导剑桥的EDSAC项目。 [证据](https://www.cl.cam.ac.uk/archive/mvw1/short-biography.html)
- **von-neumann → xia-peisu** · `influence`：夏培肃主持的107机采用冯·诺伊曼型存储程序结构；这是技术体系传承，不是个人授课。 [证据](https://mmcs.cast.org.cn/kxjfc/kxjfc/xps/bd4300/art/2023/art_a0dd1a9a70584ab098127d1019640568.html)
- **zuse → von-neumann** · `parallel`：楚泽在回顾中明确比较自己的可复制工厂设想与冯·诺伊曼的细胞自动机。此处有文本比较，不主张合作。 [证据](https://history.computer.org/pioneers/zuse.html)
- **wilkes → sparck-jones** · `support`：斯帕克·琼斯在IEEE口述史中回忆，威尔克斯认可其研究，并让她在剑桥实验室开展工作。 [证据](https://ethw.org/Oral-History:Karen_Sp%C3%A4rck_Jones)
- **hopper → backus** · `support`：巴科斯回忆他在霍珀组织的1954年研讨会报告自动编程工作；这有别于断言FORTRAN直接抄自A-0。 [证据](https://softwarepreservation.computerhistory.org/FORTRAN/paper/p45-backus.pdf)
- **backus → frances-allen** · `influence`：艾伦1957年加入IBM时教授FORTRAN，随后研究如何自动生成更高效的程序。 [证据](https://ceohp.heritage.acm.org/allenf-overview/)
- **backus → wirth** · `influence`：巴科斯参与ALGOL和语法记法工作；沃思的ALGOL W、Pascal等继续发展这一语言传统。 [证据](https://computerhistory.org/profile/niklaus-wirth/)
- **backus → hoare** · `influence`：霍尔在Elliott Brothers开发ALGOL 60编译器，使用巴科斯等人参与定义的语言。 [证据](https://www.cs.ox.ac.uk/people/tony.hoare/index1.html)
- **hoare → wirth** · `support` · 双向：两人合著Pascal的公理化定义，把语言构造与正确性推理直接对应起来。 [证据](https://ora.ox.ac.uk/objects/uuid:32c368e2-bee1-41fd-ae58-a10f00fc03d3)
- **dijkstra → hoare** · `support` · 双向：与奥勒-约翰·达尔共同出版《结构化程序设计》，呈现互相补充的程序设计方法。 [证据](https://mathshistory.st-andrews.ac.uk/Biographies/Dijkstra/)
- **dijkstra → knuth** · `influence`：高德纳1974年专文回应结构化编程与goto问题，认真讨论戴克斯特拉等人的观点。 [证据](https://doi.org/10.1145/356635.356640)
- **hoare → knuth** · `influence`：高德纳在算法著作中分析霍尔的快速排序，研究其比较次数和实现选择。 [证据](https://cs.stanford.edu/~knuth/taocp.html)
- **knuth → lamport** · `influence`：兰波特在高德纳TeX排版引擎之上开发LaTeX，把文档结构和低层排版操作分开。 [证据](https://lamport.azurewebsites.net/pubs/pubs.html)
- **hoare → thompson** · `influence`：汤普森共同设计的Go经Newsqueak、Limbo等语言承接霍尔CSP的通信思想。 [证据](https://go.dev/doc/faq#ancestors)
- **wirth → thompson** · `influence`：Go官方设计说明列出Pascal、Modula、Oberon对声明和包的影响；汤普森是共同设计者之一。 [证据](https://go.dev/doc/faq#ancestors)
- **ritchie → thompson** · `support` · 双向：两人在贝尔实验室共同发展Unix，C语言又帮助系统脱离单一硬件。 [证据](https://computerhistory.org/profile/dennis-ritchie/)
- **mccarthy → liskov** · `mentorship`：利斯科夫在麦卡锡指导下研究棋类残局程序，于1968年完成博士学位。 [证据](https://computerhistory.org/profile/barbara-liskov/)
- **mccarthy → minsky** · `support` · 双向：两人共同署名1955年人工智能夏季研究提案，并参与推动这一研究方向。 [证据](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html)
- **shannon → mccarthy** · `support` · 双向：香农与麦卡锡、明斯基、罗切斯特共同署名提案，汇集机器学习与符号处理问题。 [证据](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html)
- **shannon → minsky** · `support` · 双向：达特茅斯提案中，两人共同参与关于机器学习、神经网络与计算的研究倡议。 [证据](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html)
- **church → mccarthy** · `influence`：麦卡锡的Lisp论文使用Church的λ记法描述函数；语言实现也有自己不同的求值机制。 [证据](https://www-formal.stanford.edu/jmc/recursive.html)
- **newell → simon** · `support` · 双向：与克利夫·肖合作开发逻辑理论机、GPS，并持续进行认知与符号计算研究。 [证据](https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell)
- **mccarthy → newell** · `support`：纽厄尔在麦卡锡等人组织的1956年讨论班交流逻辑理论机工作，并非博士师生。 [证据](https://www.computer.org/profiles/allen-newell)
- **mccarthy → simon** · `support`：西蒙与纽厄尔的逻辑程序进入达特茅斯研究交流，与麦卡锡组织的计划相交汇。 [证据](https://www.computer.org/profiles/allen-newell)
- **dijkstra → lamport** · `influence`：兰波特的面包店算法等工作继续研究戴克斯特拉提出的并发互斥问题，改进假设与解法。 [证据](https://lamport.azurewebsites.net/pubs/pubs.html)
- **hoare → liskov** · `influence`：利斯科夫与周以真用前后条件等规范讨论子类型能否替代父类型，承接程序正确性逻辑。 [证据](https://doi.org/10.1145/197320.197383)
- **lamport → liskov** · `influence`：卡斯特罗与利斯科夫的PBFT延展拜占庭容错问题，讨论适合复制服务的实践协议。 [证据](https://pmg.csail.mit.edu/papers/osdi99.pdf)
- **lamport → perlman** · `influence`：珀尔曼1988年论文研究恶意或任意故障节点下的路由，使用拜占庭故障这一明确问题框架。 [证据](https://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TR-429.pdf)
- **dijkstra → margaret-hamilton** · `parallel`：戴克斯特拉1983年专文评议汉密尔顿与泽尔丁的HOS。此线记录方法讨论与分歧，不表示合作或师承。 [证据](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD852.html)
- **codd → stonebraker** · `influence`：斯通布雷克与同事通过INGRES实现和检验科德的关系数据库思想。 [证据](https://computerhistory.org/profile/michael-stonebraker/)
- **cook → karp** · `influence`：卡普以库克的可满足性结果为起点，建立多种组合问题之间的多项式规约。 [证据](https://doi.org/10.1007/978-1-4684-2001-2_9)
- **turing → cook** · `influence`：库克的复杂性分析以图灵机等形式计算模型为基础，从能否计算进一步问需要多少资源。 [证据](https://amturing.acm.org/pdf/CookTuringTranscript.pdf)
- **karp → hopcroft** · `support` · 双向：两人合著快速二分图最大匹配算法，以成批最短增广路改进复杂度。 [证据](https://doi.org/10.1137/0202019)
- **rabin → karp** · `support` · 双向：两人共同研究以哈希指纹筛选字符串匹配位置的算法。 [证据](https://doi.org/10.1147/rd.312.0249)
- **diffie → hellman** · `support` · 双向：1976年共同发表公钥密码与密钥交换工作，并讨论开放网络中的认证问题。 [证据](https://ee.stanford.edu/~hellman/publications/24.pdf)
- **diffie → rivest** · `influence`：RSA原论文明确回应迪菲与赫尔曼提出的公钥密码构想，提供具体数论方案。 [证据](https://people.csail.mit.edu/rivest/Rsapaper.pdf)
- **hellman → rivest** · `influence`：赫尔曼与迪菲提出的问题成为RSA设计背景；后续安全定义与实际编码仍需分别研究。 [证据](https://people.csail.mit.edu/rivest/Rsapaper.pdf)
- **rivest → shamir** · `support` · 双向：与伦纳德·阿德尔曼共同提出RSA，三位作者的贡献共同构成这项工作。 [证据](https://people.csail.mit.edu/rivest/Rsapaper.pdf)
- **goldwasser → rivest** · `support` · 双向：与米卡利合著抵抗适应性选择消息攻击的数字签名研究。 [证据](https://doi.org/10.1137/0217017)
- **goldwasser → shamir** · `influence`：沙米尔的IP=PSPACE结果研究由戈德瓦塞尔、米卡利、拉科夫等人发展的交互证明模型。 [证据](https://doi.org/10.1145/146585.146609)
- **rabin → goldwasser** · `influence`：概率加密论文在RSA、Rabin等公钥工作的背景下引入新的安全定义与随机化构造。 [证据](https://doi.org/10.1016/0022-0000(84)90070-9)
- **cook → goldwasser** · `influence`：交互证明工作以高效验证和NP证书为基础问题，扩展验证者与证明者的交互方式。 [证据](https://doi.org/10.1137/0218012)
- **shamir → rabin** · `influence`：拉宾1979年的公钥方案明确讨论RSA，并寻求可与因数分解建立更直接联系的构造。 [证据](https://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TR-212.pdf)
- **cerf → kahn** · `support` · 双向：1974年合著跨分组网络通信论文，随后持续推动TCP/IP及互联体系。 [证据](https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf)
- **cerf → berners-lee** · `influence`：伯纳斯-李的Web使用已经形成的互联网传输基础；此线表示协议层的承接，不把Web与互联网混为一物。 [证据](https://home.cern/science/computing/the-birth-of-the-web)
- **kahn → berners-lee** · `influence`：卡恩参与发展的开放互联基础，使跨网络的Web客户端与服务器能够通信；Web另行定义文档与超链接。 [证据](https://www.w3.org/People/Berners-Lee/)
- **minsky → hinton** · `influence`：多层网络研究回应早期感知机模型的限制；明斯基与派珀特的结论不能误读为所有神经网络都无效。 [证据](https://www.nature.com/articles/nature14539)
- **hinton → lecun** · `mentorship`：勒昆1987年在多伦多随辛顿进行博士后研究；其博士学位此前已在巴黎完成。 [证据](https://yann.lecun.com/ex/bio.html)
- **lecun → bengio** · `support` · 双向：两人与博图、哈夫纳合著1998年梯度学习文档识别论文。 [证据](http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf)
- **hinton → bengio** · `support` · 双向：两人与勒昆合著2015年《Nature》深度学习综述，系统说明这一研究方向。 [证据](https://www.nature.com/articles/nature14539)
- **fei-fei-li → hinton** · `influence`：辛顿与学生的AlexNet使用李飞飞团队参与建设的ImageNet数据与竞赛，不意味着李飞飞参与设计该网络。 [证据](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)
- **shannon → bengio** · `influence`：本吉奥等人的神经语言模型承接文本概率估计问题，论文引用香农关于英语预测与熵的工作。 [证据](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf)
- **von-neumann → backus** · `influence`：巴科斯1978年以「摆脱冯·诺伊曼风格」为题讨论函数级编程；承接也可以包含批判性重构。 [证据](https://theory.stanford.edu/~aiken/other/backus.pdf)
- **von-neumann → yao** · `influence`：姚期智1977年用冯·诺伊曼极小极大原理连接随机算法与输入分布下的确定性算法。 [证据](https://doi.org/10.1109/SFCS.1977.24)
- **shannon → diffie** · `influence`：《密码学的新方向》明确以香农的保密通信研究为背景，再转向计算困难和公开密钥的设定。 [证据](https://ee.stanford.edu/~hellman/publications/24.pdf)

## 影像来源与授权

原图页、原始下载地址、实际本地文件、原始Commons许可元数据、SHA-256、尺寸和视觉核验记录见 `public/images/computer-scientists/sources.json`。全部原件未作本地像素编辑；已有Commons裁切版本在署名中注明。页面显示取景与图片本身分开。

| 人物ID | 作者、时间与原作页 | 许可 |
| --- | --- | --- |
| `babbage` | [Unknown photographer · 1860 · Public domain](https://commons.wikimedia.org/wiki/File:Charles_Babbage_-_1860.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `lovelace` | [Antoine Claudet · c. 1843 · Commons crop · Public domain](https://commons.wikimedia.org/wiki/File:Ada_Lovelace_daguerreotype_by_Antoine_Claudet_1843_-_cropped.png) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `boole` | [Unknown artist · 1865 publication · Public domain](https://commons.wikimedia.org/wiki/File:Portrait_of_George_Boole.png) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `hollerith` | [Charles Milton Bell · c. 1888 · Public domain](https://commons.wikimedia.org/wiki/File:Hollerith.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `godel` | [Unknown photographer · c. 1926 · Public domain](https://commons.wikimedia.org/wiki/File:Kurt_g%C3%B6del.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `church` | [Original lettermark; no verified openly licensed portrait used](https://mathshistory.st-andrews.ac.uk/Biographies/Church/) | 原创姓名字标 |
| `turing` | [Elliott & Fry · 1951 · Public domain](https://commons.wikimedia.org/wiki/File:Alan_turing_header.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `shannon` | [Unknown photographer / Tekniska museet · date unrecorded · Commons crop · CC BY 2.0](https://commons.wikimedia.org/wiki/File:C.E._Shannon._Tekniska_museet_43069_(2x3_crop).jpg) | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `von-neumann` | [Los Alamos National Laboratory · Attribution required; see notice](https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.jpg) | [LANL attribution notice](/images/computer-scientists/von-neumann-NOTICE.txt) |
| `zuse` | [Wolfgang Hunscher, Dortmund · 1992 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Konrad_Zuse_(1992).jpg) | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) |
| `hopper` | [James S. Davis · 1984 · Commons crop · Public domain](https://commons.wikimedia.org/wiki/File:Commodore_Grace_M._Hopper,_USN_(covered)_head_and_shoulders_crop.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `wilkes` | [Computer Laboratory, University of Cambridge; photographer unrecorded · 1980 · Commons crop · CC BY 2.0 uk](https://commons.wikimedia.org/wiki/File:Maurice_Vincent_Wilkes_1980_(3,_cropped).jpg) | [CC BY 2.0 uk](https://creativecommons.org/licenses/by/2.0/uk/deed.en) |
| `backus` | [PIerre.Lescanne · 1989 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:John_Backus_2.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `dijkstra` | [Hamilton Richards · 2002 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Edsger_Wybe_Dijkstra.jpg) | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) |
| `knuth` | [Alex Handy · 2011 · Commons crop · CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:Donald_Ervin_Knuth_(cropped).jpg) | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| `hoare` | [Rama · 2011 · CC BY-SA 2.0 fr](https://commons.wikimedia.org/wiki/File:Sir_Tony_Hoare_IMG_5125.jpg) | [CC BY-SA 2.0 fr](https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en) |
| `wirth` | [Tyomitch · 2005 · Copyrighted free use](https://commons.wikimedia.org/wiki/File:Niklaus_Wirth,_UrGU.jpg) | [Copyrighted free use](https://commons.wikimedia.org/wiki/File:Niklaus_Wirth,_UrGU.jpg#Licensing) |
| `ritchie` | [Denise Panyik-Dale · 2011 · CC BY 2.0](https://commons.wikimedia.org/wiki/File:Dennis_Ritchie_2011.jpg) | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `thompson` | [A.C.Diller · 2019 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Ken_Thompson,_2019.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `liskov` | [Kenneth C. Zirkel · 2010 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Barbara_Liskov_MIT_computer_scientist_2010.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `frances-allen` | [Rama · 2008 · CC BY-SA 2.0 fr](https://commons.wikimedia.org/wiki/File:Allen_mg_2528-3750K-b.jpg) | [CC BY-SA 2.0 fr](https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en) |
| `margaret-hamilton` | [Daphne Weld Nichols · 1995 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Margaret_Hamilton_1995.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `rabin` | [Konrad Jacobs / MFO · date unrecorded · CC BY-SA 2.0 de](https://commons.wikimedia.org/wiki/File:M_O_Rabin.jpg) | [CC BY-SA 2.0 de](https://creativecommons.org/licenses/by-sa/2.0/de/deed.en) |
| `scott` | [Logos Semantikos · 2026 · CC0](https://commons.wikimedia.org/wiki/File:Dana_Scott_in_2026.jpg) | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| `cook` | [Jiří Janíček · 2008 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Prof.Cook.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `karp` | [Rama · 2009 · CC BY-SA 2.0 fr](https://commons.wikimedia.org/wiki/File:Karp_mg_7725-b.cr2.jpg) | [CC BY-SA 2.0 fr](https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en) |
| `hopcroft` | [Pavel.mavrin · 2009 · Commons crop · Public domain](https://commons.wikimedia.org/wiki/File:Hopcrofg_(cropped2).jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `yao` | [David.Monniaux · 2015 · Commons crop · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Andrew_Yao_P1130016_(cropped).jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `lamport` | [Leslie Lamport · date unrecorded · Copyrighted free use](https://commons.wikimedia.org/wiki/File:Leslie_Lamport.jpg) | [Copyrighted free use](https://commons.wikimedia.org/wiki/File:Leslie_Lamport.jpg#Licensing) |
| `codd` | [Original lettermark; no verified openly licensed portrait used](https://www.ibm.com/history/relational-database) | 原创姓名字标 |
| `stonebraker` | [David.Monniaux · 2015 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Michael_Stonebraker_P1120062.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `cerf` | [Duncan.Hull · 2016 · Commons crop · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Dr_Vint_Cerf_ForMemRS_(cropped).jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `kahn` | [Veni Markovski · 2013 · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Bob_Kahn.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| `berners-lee` | [Summit · 2025 · Commons crop · CC BY 4.0](https://commons.wikimedia.org/wiki/File:Tim_Berners-Lee_at_the_2025_Web_Summit_(Cropped).jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| `perlman` | [Scientist-100 at English Wikipedia · date unrecorded · Public domain](https://commons.wikimedia.org/wiki/File:Radia_Perlman_2009.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `diffie` | [Duncan.Hull · 2017 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Whitfield_Diffie_Royal_Society.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `hellman` | [User .:Ajvol:. on en.wikipedia · date unrecorded · CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Martin-Hellman.jpg) | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) |
| `rivest` | [Ronald L. Rivest · date unrecorded · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Ronald_L_Rivest_photo.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `shamir` | [Duncan.Hull · 2018 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Adi_Shamir_Royal_Society.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `goldwasser` | [Weizmann Institute of Science · date unrecorded · Public domain](https://commons.wikimedia.org/wiki/File:Shafi_Goldwasser.JPG) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `mccarthy` | ["null0" · 2006 · CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:John_McCarthy_Stanford.jpg) | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| `minsky` | [Seth Woodworth · date unrecorded · Commons crop · CC BY 3.0](https://commons.wikimedia.org/wiki/File:Marvin_Minsky_at_OLPCb_(3x4_cropped).jpg) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| `newell` | [Original lettermark; no verified openly licensed portrait used](https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell) | 原创姓名字标 |
| `simon` | [Rochester Institute of Technology · 1981 publication · Public domain](https://commons.wikimedia.org/wiki/File:Herbert_Simon,_RIT_NandE_Vol13Num11_1981_Mar19_Complete.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `sparck-jones` | [en:user:Markus Kuhn · 2007 · CC BY 2.5](https://commons.wikimedia.org/wiki/File:Karen_Sp%C3%A4rck.jpg) | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5) |
| `hinton` | [Cmichel67 · 2026 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Geoffrey_Hinton_in_2026.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `lecun` | [Jérémy Barande · 2024 · Commons crop · CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:Laura_Chaubard_%26_Yann_Le_Cun_-_2024_(53814052697)_(cropped).jpg) | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| `bengio` | [Xuthoria · 2025 · CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:ICLR_2025_-_Yoshua_Bengio_02.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `fei-fei-li` | [ITU Pictures · 2017 · CC BY 2.0](https://commons.wikimedia.org/wiki/File:Fei-Fei_Li_at_AI_for_Good_2017.jpg) | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `xia-peisu` | [Unknown photographer · 1946 · Public domain](https://commons.wikimedia.org/wiki/File:Xia_Peisu.jpg) | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |

- Church、Codd、Newell没有采用缺少可靠开放许可的常见照片。原创SVG直接写明“LETTERMARK · NOT A PORTRAIT”，页面`kind: monogram`也公开说明；Church同名的乔治亚大学校长不是本人，未误用。
- Boole采用1865年发表的历史版画，标为`later-depiction`。Lovelace为Claudet约1843年的达盖尔摄影，不是AI或现代演员形象。
- von Neumann照片适用LANL附署名开放使用条件，不是CC。完整声明保存在 `public/images/computer-scientists/von-neumann-NOTICE.txt`，对应license链接直接指向该文件；重分发照片须保留声明。
- Wirth与Lamport照片使用Commons记录的`Copyrighted free use`授权；页面链接到原文件授权部分，不误标CC。其他CC照片分别保留BY、SA、版本及司法辖区。
- 日期缺失或仅有上传日期的照片未杜撰拍摄年份；比如Hellman、Lamport、Rabin和Perlman不把上传年份当拍摄年份。
- 43张本轮逐张打开检查，Gödel/Turing/Shannon/von Neumann四张与已视觉核验的数学集合文件逐字节相同；3张字标均渲染后检查。
- Cook和Xia Peisu原图为较宽的环境照，`sources.json`记录可选的仅显示取景建议，保留原照片不动。

## 验证记录

- 数据50人，ID唯一；每人3项贡献、4条生平、至少2个引用来源；全部基础字段含中英文。
- 67条关系ID唯一、端点均存在，每个人至少一条关系。23位在世者全部采用null死亡年份及中英出生年标签。
- 本地50个展示资源全部存在；47张真实影像总计约3.72MB，45张小于200KB。较大的两张为保留原格式的Lovelace/Boole历史PNG。
- 9条数学公式以KaTeX严格模式检查通过，独立TypeScript语法检查无诊断。未运行项目build，也未发布。
- 检查了141个外部来源地址，更换已确认失效的旧路径（CERN、清华、Minsky旧MIT主页、旧Karp扫描件、Goldwasser论文、Hopcroft不存在的MacTutor路径、Harvard旧Rabin CV、FORTRAN旧档案路径）。部分期刊/机构防自动抓取返回403或网络超时；这些不等同于404，保留已由搜索或阅读核验的文献/DOI。
