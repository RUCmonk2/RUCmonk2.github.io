import type { Localized } from "./learning/types";

export type TcsNode = {
  id: string;
  title: Localized;
  mapLabel?: Partial<Localized>;
  question: Localized;
  description: Localized;
  formula?: string;
  example?: Localized;
  sources?: ReadonlyArray<{ label: string; href: string }>;
  kind: "core" | "branch" | "case";
};

export const tcsNodes: readonly TcsNode[] = [
  {
    id: "mst",
    formula: String.raw`\mathbb{E}[T(G)] = O(m+n)`,
    kind: "case",
    title: {
      zh: "MST 的期望线性时间算法",
      en: "Minimum spanning trees in expected linear time",
    },
    mapLabel: { zh: "MST 线性算法", en: "Linear-time MST" },
    question: {
      zh: "Kruskal 要给边排序，求最小生成树也必须付出排序的代价吗？",
      en: "Must finding a minimum spanning tree cost as much as sorting its edges?",
    },
    description: {
      zh: "在有 n 个顶点、m 条边的连通无向带权图上，Karger、Klein 和 Tarjan 给出了期望 O(m+n) 时间的随机算法。权重只需能比较。对每个固定输入，输出总是一棵最小生成树，期望取在算法自己的随机抽样上。",
      en: "For a connected undirected weighted graph with n vertices and m edges, Karger, Klein and Tarjan find an MST in expected O(m+n) time in a comparison-based model. For each fixed input the tree is always correct. The expectation is over the algorithm’s sampling.",
    },
    example: {
      zh: "先用 Borůvka 步骤收缩顶点，再抽取一半左右的边，递归求样本的最小生成森林。若原图的一条边重于森林中连接它两端的路径上的每一条边，它就是该环最重的边，可以删去。例如路径边权为 2、5，端点间权重为 8 的边即可过滤。线性时间的批量过滤，加上对剩余边数的期望界，使递归总工作量保持线性。",
      en: "Borůvka steps shrink the graph. Recursively find a minimum spanning forest in a half-sample of the edges. If an original edge is heavier than every edge on its forest path, the cycle rule discards it. A shortcut of weight 8 across path weights 2 and 5 is one example. Batch filtering and a bound on the expected survivors control the total work.",
    },
    sources: [
      {
        label: "Karger, Klein & Tarjan · 1995",
        href: "https://people.csail.mit.edu/karger/Papers/mst.pdf",
      },
    ],
  },
  {
    id: "matrix-exponent",
    formula: String.raw`\forall\,\varepsilon>0,\quad T_F(n)=O_{\varepsilon}(n^{9/4+\varepsilon})`,
    kind: "case",
    title: {
      zh: "矩阵乘法指数 ω 与 9/4",
      en: "Matrix multiplication exponent ω and 9/4",
    },
    mapLabel: { zh: "矩阵乘法 9/4", en: "Matrix exponent 9/4" },
    question: {
      zh: "两个 n 阶方阵相乘，标量算术运算次数究竟随 n 的几次方增长？",
      en: "What exponent governs arithmetic operations for multiplying two square matrices?",
    },
    description: {
      zh: "固定一个域 F，把可达到 O(nᵗ) 次域运算的所有 t 取下确界，得到该域上的矩阵乘法指数。若指数至多为 9/4，算法的指数就能从上方任意逼近 9/4，代价是隐藏常数可以随精度 ε 改变。Strassen 用 7 次块乘替代 8 次，递归给出 log₂7 的上界，已经展示了固定尺寸恒等式怎样影响渐近指数。",
      en: "Fix a field F. The infimum of t for which square multiplication takes O(nᵗ) field operations defines the exponent over F. With an upper bound of 9/4 we can approach 9/4 from above, allowing the hidden constant to depend on ε. Strassen’s seven block products in place of eight give the earlier upper bound log₂7 by recursion.",
    },
    example: {
      zh: "2026 年 10 月的工作给出复数域上界 ω ≤ 9/4。11 月 24 日的预印本报告了任意域上形式算术电路的匹配下界，得到指数恰等于 9/4。作者标出的 Lean 形式化范围是计算形式多项式恒等式的无除法电路。这个指数回答规模增长时的算术代价；给定矩阵尺寸、浮点精度和硬件，实际用时还取决于常数、访存与实现。",
      en: "The October 2026 work gives the upper bound over the complex numbers. A November 24 preprint reports a matching lower bound for formal arithmetic circuits over every field, yielding an exponent of exactly 9/4. Its stated Lean scope covers division-free circuits computing formal polynomial identities. At a given size and precision, constants, memory traffic and hardware still determine wall-clock time.",
    },
    sources: [
      {
        label: "Shpilka · ECCC TR26-281",
        href: "https://eccc.weizmann.ac.il/report/2026/281/",
      },
      {
        label: "OpenAI · 2026-11-24",
        href: "https://github.com/openai/math/blob/3344da59991ed94f9ba711217b29c1d760badfa6/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/README.md",
      },
    ],
  },
  {
    id: "p-vs-np",
    formula: String.raw`\mathsf{P}\subseteq\mathsf{NP},\qquad \mathsf{P}\stackrel{?}{=}\mathsf{NP}`,
    kind: "case",
    title: { zh: "P 与 NP", en: "P versus NP" },
    mapLabel: { zh: "P vs NP", en: "P vs NP" },
    question: {
      zh: "如果「是」实例总有一份能快速核对的短证书，能否也快速判定每个实例？",
      en: "If every yes-instance has a short, efficiently checkable witness, can we efficiently decide every instance?",
    },
    description: {
      zh: "P 收集能在确定性多项式时间内判定的问题。NP 要求「是」实例存在多项式长度的证书，验证器能在多项式时间内检查它，而「否」实例没有任何能通过的证书。P 包含在 NP 中；两者是否相等仍是开放问题。",
      en: "P contains decision problems solvable in deterministic polynomial time. An NP verifier accepts a polynomial-size witness for every yes-instance and no witness for a no-instance. P is contained in NP. Whether the two coincide remains open.",
    },
    example: {
      zh: "旅行商的决策版问是否有一条巡回路线使总长度至多 B。有人交给你城市顺序，你可以检查每座城市是否恰好访问一次，再累加路程。能检查这一条路线，还要跨过怎样在所有可能路线中作出是非判断这一步。",
      en: "Decision TSP asks whether a tour of length at most B exists. Given an ordering of the cities, check its visits and sum the edge lengths. This efficient witness check leaves open how to decide existence over all possible tours.",
    },
    sources: [
      {
        label: "Clay Mathematics Institute · P vs NP",
        href: "https://www.claymath.org/millennium/p-vs-np/",
      },
    ],
  },
  {
    id: "eth",
    formula: String.raw`\text{ETH}\ \Longrightarrow\ 3\text{-SAT}\notin\mathrm{TIME}(2^{o(n)}\,\mathrm{poly}(L))`,
    kind: "case",
    title: { zh: "指数时间假设 ETH", en: "The exponential time hypothesis" },
    mapLabel: { zh: "ETH", en: "ETH" },
    question: {
      zh: "即便 3-SAT 没有多项式算法，变量数 n 上的次指数算法还有没有可能？",
      en: "Could 3-SAT still have a subexponential algorithm in its variable count?",
    },
    description: {
      zh: "ETH 假设 3-SAT 的确定性指数时间增长率严格为正。以 n 表示变量数，输入长度的多项式因子另计；该假设排除 2^o(n) 时间算法。P ≠ NP 本身还容得下 2^√n 这样的增长率，因此 ETH 给出了更强的条件。",
      en: "ETH posits a positive deterministic exponential growth rate for 3-SAT in its n variables, allowing polynomial factors in the input length. It rules out 2^o(n) time. P ≠ NP alone leaves room for growth such as 2^√n, so ETH makes a stronger claim.",
    },
    example: {
      zh: "若把稀疏 3-SAT 的 n 变量实例归约成规模 N = O(n) 的新问题，后者的 2^o(N) 算法就会反过来给稀疏 3-SAT 一个次指数算法。由稀疏化引理可把这一矛盾接回 ETH。若归约得到的是 N = O(n²)，同样的代入就不够了，所以下界证明必须追踪规模。",
      en: "Suppose sparse 3-SAT maps to a problem of size N = O(n). A 2^o(N) algorithm gives a subexponential solver for sparse 3-SAT, contradicting ETH via sparsification. A quadratic size blow-up would not support the same inference.",
    },
    sources: [
      {
        label: "Impagliazzo & Paturi · On the Complexity of k-SAT",
        href: "https://courses.cs.washington.edu/courses/cse599i/24sp/papers/ImpagliazzoPaturi_2001_jcss.pdf",
      },
    ],
  },
  {
    id: "sat-completeness",
    kind: "case",
    title: {
      zh: "3-SAT、团与 NP 完全性",
      en: "3-SAT, clique and NP-completeness",
    },
    mapLabel: { zh: "3-SAT 与归约", en: "3-SAT & reductions" },
    question: {
      zh: "怎样用一个图问题的求解器解一个逻辑问题？",
      en: "How can a graph solver decide a Boolean formula?",
    },
    description: {
      zh: "为每个子句中的每个文字建一个点。给来自不同子句、且互不矛盾的文字连边。若有 m 个子句，公式可满足当且仅当图中存在大小为 m 的团。变换在多项式时间内完成，箭头从 3-SAT 指向团问题。",
      en: "Make a vertex for each literal occurrence. Join compatible literals from different clauses. A formula with m clauses is satisfiable exactly when the graph contains a clique of size m. This polynomial-time reduction runs from 3-SAT to Clique.",
    },
    example: {
      zh: "满足赋值让你从每个子句挑一个真文字。反过来，m 团从每个子句恰取一点，且不会同时选 x 和 ¬x，可以补成一致赋值。3-SAT 的困难性由此传给团问题，再用顶点集作证书就得到 NP 完全性。",
      en: "A satisfying assignment supplies one true literal per clause. An m-clique chooses one per clause without a contradictory pair, so the choices extend to an assignment. Hardness transfers from 3-SAT; a vertex set supplies the NP witness.",
    },
  },
  {
    id: "max-flow",
    formula: String.raw`\max_f |f|=\min_{(S,T)} c(S,T)`,
    kind: "case",
    title: { zh: "最大流与最小割", en: "Max flow and min cut" },
    mapLabel: { zh: "最大流最小割", en: "Flow & cut" },
    question: {
      zh: "怎样让别人一眼看出当前流量已达最优？",
      en: "What certifies that a feasible flow is optimal?",
    },
    description: {
      zh: "在有容量的有向网络里，每个 s–t 割的容量都是可行流值的上界。最大流最小割定理保证总能找到一个割，其容量等于最大流值。流和割分别给出下界与上界，两者相等就证明了最优。",
      en: "Every s–t cut bounds the value of a feasible flow from above in a capacitated directed network. The theorem guarantees a cut whose capacity equals the maximum flow. A feasible flow and a cut of the same value certify optimality.",
    },
    example: {
      zh: "设 s 到 a、b 的容量为 3、2，a、b 到 t 的容量也为 3、2。两条路可以送 5 单位流，而割开 s 的两条出边总容量恰好为 5。一般图中，当残量图里走不到 t 时，从 s 可达的点集就给出一个这样的割。",
      en: "Two independent s–t paths of capacities 3 and 2 carry 5 units. Cutting both edges out of s costs exactly 5. More generally, once t is unreachable in the residual graph, the vertices reachable from s define a matching cut.",
    },
  },
  {
    id: "vertex-cover",
    formula: String.raw`|M|\leq\mathrm{OPT}\leq 2|M|`,
    kind: "case",
    title: {
      zh: "顶点覆盖的 2-近似",
      en: "A 2-approximation for vertex cover",
    },
    mapLabel: { zh: "顶点覆盖近似", en: "Vertex cover" },
    question: {
      zh: "精确最优解很难求，怎样保证手上的解不会太差？",
      en: "How can we guarantee the quality of a nonoptimal solution?",
    },
    description: {
      zh: "取一个极大匹配，把匹配边的两个端点都放进覆盖。每条边都碰到已选端点，否则还可以扩充匹配。匹配中的边互不共享端点，任何覆盖至少要为每条匹配边付一个点，因此输出大小至多是最优的两倍。",
      en: "Take a maximal matching and select both endpoints of every matched edge. An uncovered edge would extend the matching. Its disjoint edges force every cover to use at least one vertex each, so the output costs at most twice the optimum.",
    },
    example: {
      zh: "星形图上任选一条边就得到极大匹配，算法选中心和一个叶子。最优解只选中心。这个例子同时告诉你，系数 2 确实可能达到。",
      en: "On a star, one edge already forms a maximal matching. Its two endpoints are selected although the center alone suffices. This attains the factor of two.",
    },
  },
  {
    id: "index",
    kind: "case",
    title: { zh: "INDEX 与数据流空间下界", en: "INDEX and streaming space" },
    mapLabel: { zh: "INDEX 通信下界", en: "INDEX" },
    question: {
      zh: "只能传一条消息时，Alice 得让 Bob 记住多少？",
      en: "How much must Alice convey in a single message?",
    },
    description: {
      zh: "Alice 有 n 位串，Bob 有位置 i，要输出第 i 位。对确定性精确协议，任意两个不同的串在某处不同，不能留下同一条定长消息。因此需要至少 n 位。把流的前缀状态当成这条消息，就能证明相应的空间下界。",
      en: "Alice has an n-bit string and Bob holds an index i. Distinct strings differ at some index, so an exact deterministic one-way protocol needs at least n bits in a fixed-size message. A stream’s prefix state can serve as that message.",
    },
    example: {
      zh: "Alice 把所有取值为 1 的位置依次送入重复检测器。Bob 接收内存快照后再输入 i，出现重复恰好说明第 i 位是 1。这个计数证明使用单遍、确定性和精确输出三项条件。",
      en: "Feed the indices of all one-bits into a duplicate detector. After receiving the memory snapshot, Bob appends i. A duplicate reveals a one-bit. The counting argument here assumes a deterministic, exact, one-pass algorithm.",
    },
  },
  {
    id: "seth",
    kind: "case",
    title: {
      zh: "强指数时间假设 SETH",
      en: "The strong exponential time hypothesis",
    },
    mapLabel: { zh: "SETH", en: "SETH" },
    question: {
      zh: "随着子句变宽，能否始终把枚举的底数从 2 降低同一个常数？",
      en: "Can a uniform saving over exhaustive search survive arbitrarily wide clauses?",
    },
    description: {
      zh: "SETH 假设对每个固定的 0 < δ < 1，总存在一个宽度 k，使 k-SAT 没有 O((2−δ)ⁿ · poly(L)) 的确定性算法。n 是变量数，L 是公式的编码长度。它把不同 k 的难度连在一起，并蕴含 ETH。",
      en: "SETH says that for every fixed 0 < δ < 1 there is a width k for which deterministic k-SAT cannot run in O((2−δ)ⁿ · poly(L)), with n variables and encoding length L. It relates the difficulties at different widths and implies ETH.",
    },
    example: {
      zh: "把 3-SAT 的底数从 2 降到 1.9，仍与 SETH 相容。若能对所有固定 k 都做到同一个 1.9ⁿ 乘输入长度多项式的上界，才会与这里的量词发生冲突。",
      en: "A base of 1.9 for 3-SAT is compatible with SETH. Achieving that same base for every fixed k, up to polynomial input factors, would contradict it.",
    },
  },
  {
    id: "two-sat",
    kind: "case",
    title: {
      zh: "2-SAT 与强连通分量",
      en: "2-SAT and strongly connected components",
    },
    mapLabel: { zh: "2-SAT", en: "2-SAT" },
    question: {
      zh: "每个子句从三个文字减到两个，为什么可以改用图遍历？",
      en: "Why do binary clauses admit a graph traversal algorithm?",
    },
    description: {
      zh: "子句 (a ∨ b) 等价于两条蕴含 ¬a → b 和 ¬b → a。建图后，公式可满足当且仅当每个变量 x 与 ¬x 都处在不同的强连通分量。求强连通分量只需与图规模成线性的时间。",
      en: "A clause (a ∨ b) gives two implications, ¬a → b and ¬b → a. The formula is satisfiable exactly when no literal and its negation share a strongly connected component. SCCs can be found in linear time.",
    },
    example: {
      zh: "若 x 沿有向路径推出 ¬x，且 ¬x 也推出 x，赋值无论取哪一边都会矛盾。与 3-SAT 对照，同样叫可满足性，子句结构的细微改变就足以改变算法。",
      en: "When x reaches ¬x and ¬x reaches x, either truth value forces a contradiction. Comparing 2-SAT with 3-SAT shows how a small structural restriction can change tractability.",
    },
  },
  {
    id: "computability",
    title: { zh: "自动机与可计算性", en: "Automata & computability" },
    question: {
      zh: "机器能记住什么？有没有问题永远无法判定？",
      en: "What can a machine remember or decide?",
    },
    description: {
      zh: "有限自动机可以用两个状态记奇偶，栈可以记住括号嵌套。即使允许程序使用可扩展的存储，也没有通用算法能判断任意程序在任意输入上是否会停机。先确定什么能算，再谈算得有多快。",
      en: "A finite automaton can track parity with two states, and a stack can track nested parentheses. Even with expandable memory, no general algorithm decides whether an arbitrary program halts on its input. Computability comes before the cost of computing.",
    },
    kind: "core",
  },
  {
    id: "algorithms",
    title: { zh: "算法与组合优化", en: "Algorithms & optimization" },
    question: {
      zh: "怎样把问题的结构变成一套可证明正确的方法？",
      en: "How can we turn structure into a provably correct method?",
    },
    description: {
      zh: "BFS 按距离一层层扫描，能找到无权图上的最短路。遇到精确最优解难求的问题，还可以换成有质量保证的近似算法。设计给出可达到的上界，复杂性接着问还有多少改进空间。",
      en: "Breadth-first search explores distance layers and finds shortest paths in an unweighted graph. For some hard optimization problems, an approximation with a proven quality guarantee is possible. An algorithm gives an upper bound; complexity asks how much room remains to improve it.",
    },
    kind: "core",
  },
  {
    id: "complexity",
    title: { zh: "复杂性与下界", en: "Complexity & lower bounds" },
    question: {
      zh: "在同一个模型里，所有算法至少要花多少资源？",
      en: "How many resources must every algorithm in a model use?",
    },
    description: {
      zh: "复杂性按时间、空间或其他资源给问题分类。比较排序的下界数的是比较次数。归约是把问题 A 的实例变成问题 B 的实例，从而借 B 的解来解 A。排序网络则会分别数比较器总数和并行深度。",
      en: "Complexity classifies problems by time, space, and other resources. A comparison-sorting bound counts comparisons. A reduction turns instances of A into instances of B so a solver for B can solve A. Sorting networks let us count total comparators and parallel depth separately.",
    },
    kind: "core",
  },
  {
    id: "logic",
    title: { zh: "逻辑与程序语言", en: "Logic & programming languages" },
    question: {
      zh: "程序的行为怎样定义，正确性怎样检查？",
      en: "What does a program do, and how can we check its guarantees?",
    },
    description: {
      zh: "程序语义定义代码怎样运行，类型系统刻画运行前能排除的错误。SAT 可以检查约束是否有解，Lean 可以检查形式证明。判断排序正确时，规格要同时要求输出有序和保留原元素及重数。",
      en: "Semantics defines execution; type systems specify which errors can be ruled out before execution. SAT solvers decide whether Boolean constraints have a solution, and Lean checks formal proofs. A sorting specification requires ordered output and preservation of the input multiset.",
    },
    kind: "core",
  },
  {
    id: "randomness",
    title: { zh: "随机化与伪随机性", en: "Randomness & pseudorandomness" },
    mapLabel: { en: "Randomness" },
    question: {
      zh: "加入随机选择后，能省下什么？会以多大概率出错？",
      en: "What can randomness save, and where can errors occur?",
    },
    description: {
      zh: "随机快排总能排对，随机性改变的是运行时间。Sketch 往往用随机抽样或哈希节省空间，再为误差和失败概率给出保证。伪随机性还问，能否用很少的随机位产生足够好的样本。",
      en: "Randomized quicksort always sorts correctly; randomness changes its running time. Sketches often use random sampling or hashing to save space, then bound their error and failure probability. Pseudorandomness asks how far a small supply of random bits can go.",
    },
    kind: "branch",
  },
  {
    id: "models",
    title: { zh: "数据流与受限模型", en: "Streaming & resource models" },
    question: {
      zh: "数据只能扫一遍、探查几次，或分散在多台机器上时，还能做什么？",
      en: "What changes with one pass, limited queries, or distributed input?",
    },
    description: {
      zh: "数据流数内存和遍数，通信复杂性数消息的比特，查询模型数看了多少次输入，分布式模型还要说明每轮能传什么。一种证明空间下界的办法，是让前一半数据流留下的状态充当两方之间的消息。",
      en: "Streaming counts memory and passes, communication counts message bits, and query models count accesses. Distributed models also specify what can be sent per round. A streaming-space lower bound can come from treating the state after a prefix as a message between two parties.",
    },
    kind: "branch",
  },
  {
    id: "information",
    title: { zh: "信息论与编码", en: "Information & coding" },
    question: {
      zh: "得保留多少信息？加入多少冗余才经得起错误？",
      en: "How much information is needed, and how can redundancy correct errors?",
    },
    description: {
      zh: "压缩利用数据的统计结构，纠错通过冗余抵抗噪声。信息论的计数和度量也常用于通信下界。图流摘要只需回答指定查询，因此首先要明确哪些信息必须保留。",
      en: "Compression exploits statistical structure, while error correction adds redundancy to withstand noise. Information measures and counting also support communication lower bounds. A graph sketch only has to preserve what its specified queries need.",
    },
    kind: "branch",
  },
  {
    id: "cryptography",
    title: { zh: "密码学", en: "Cryptography" },
    question: {
      zh: "限定对手能看什么、能算多久后，怎样证明方案安全？",
      en: "What can a bounded adversary learn or forge?",
    },
    description: {
      zh: "密码学先把安全目标写成一个实验。常见证明会把能破坏方案的高效对手变成求解某个困难问题的高效算法，因此同时用到随机性、复杂性与归约。",
      en: "Cryptography defines its security goals as experiments. A typical proof would turn an efficient attacker into an efficient solver for an assumed hard problem. Randomness, complexity, and reductions meet in that argument.",
    },
    kind: "branch",
  },
  {
    id: "connections",
    title: { zh: "学习、量子与博弈", en: "Learning, quantum & games" },
    question: {
      zh: "如果换成样本、量子操作或有自身利益的参与者，代价会怎样变？",
      en: "What changes with samples, quantum operations, or strategic players?",
    },
    description: {
      zh: "学习理论问样本要多少、找预测规则要多久。量子计算在量子模型下重新比较算法和下界。算法博弈研究参与者的激励，以及各自做决定时全局效率会损失多少。",
      en: "Learning theory counts training samples as well as computation. Quantum computing compares algorithms and lower bounds in a different model. Algorithmic game theory studies incentives and the collective cost of independent decisions.",
    },
    kind: "branch",
  },
  {
    id: "graph-streams",
    title: { zh: "图流与 Sketch", en: "Graph streams & sketches" },
    question: {
      zh: "同样问两点是否连通，只准把边读一遍，会发生什么？",
      en: "Does connectivity change when edges arrive in one pass?",
    },
    description: {
      zh: "静态邻接表可以直接跑 BFS。边只插入且只能读一遍时，并查集记录当前连通分量，读到一条边便把两端所在的集合合并。允许删边时，一次删除可能将分量拆开，摘要需要保留更多结构。若想证明内存不能再省，可以把前半段扫描留下的状态交给另一方，从通信问题推回空间下界。",
      en: "Run BFS on a static adjacency list. On a one-pass, insertion-only edge stream, union–find maintains the current components by merging the endpoints of each edge. Deleting an edge can split a component and requires a richer summary. For lower bounds, send the state after the first half of a stream as a communication message.",
    },
    kind: "case",
  },
  {
    id: "sorting-networks",
    title: { zh: "排序网络", en: "Sorting networks" },
    question: {
      zh: "把每次比较的位置提前固定，怎样让所有输入都排好？",
      en: "Can fixed comparisons sort every input?",
    },
    description: {
      zh: "三根线用 (1,2)、(2,3)、(1,2) 三个比较器就能排好。扩大规模后，算法设计负责构造网络，复杂性分别问比较器能否更少、并行层能否更浅。零一原理允许对一个固定网络只验证二值输入。SAT 可以帮助找网络或排除指定大小的网络。",
      en: "On three wires, compare (1,2), then (2,3), then (1,2). At larger sizes, algorithms construct networks, and complexity asks about the number of comparators and the number of parallel layers. By the zero–one principle, all binary inputs suffice to verify a fixed network. SAT can search for networks or rule out a specified size.",
    },
    kind: "case",
  },
];

export const tcsEdges: ReadonlyArray<readonly [string, string]> = [
  ["mst", "algorithms"],
  ["mst", "randomness"],
  ["mst", "graph-streams"],
  ["mst", "max-flow"],
  ["matrix-exponent", "algorithms"],
  ["matrix-exponent", "complexity"],
  ["matrix-exponent", "sorting-networks"],
  ["p-vs-np", "complexity"],
  ["p-vs-np", "sat-completeness"],
  ["p-vs-np", "eth"],
  ["eth", "seth"],
  ["eth", "sat-completeness"],
  ["eth", "complexity"],
  ["sat-completeness", "logic"],
  ["sat-completeness", "two-sat"],
  ["sat-completeness", "sorting-networks"],
  ["two-sat", "algorithms"],
  ["two-sat", "logic"],
  ["max-flow", "algorithms"],
  ["max-flow", "graph-streams"],
  ["vertex-cover", "algorithms"],
  ["vertex-cover", "p-vs-np"],
  ["vertex-cover", "max-flow"],
  ["index", "information"],
  ["index", "models"],
  ["index", "graph-streams"],
  ["computability", "logic"],
  ["computability", "complexity"],
  ["algorithms", "complexity"],
  ["algorithms", "randomness"],
  ["complexity", "models"],
  ["randomness", "models"],
  ["randomness", "cryptography"],
  ["information", "cryptography"],
  ["information", "models"],
  ["models", "connections"],
  ["randomness", "connections"],
  ["graph-streams", "models"],
  ["graph-streams", "information"],
  ["graph-streams", "randomness"],
  ["sorting-networks", "algorithms"],
  ["sorting-networks", "complexity"],
  ["sorting-networks", "logic"],
];
