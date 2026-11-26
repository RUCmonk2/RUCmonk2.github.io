import type { Localized } from "./learning/types";

type Point = readonly [x: number, y: number];

export type TcsNode = {
  id: string;
  title: Localized;
  mapLabel?: Partial<Localized>;
  question: Localized;
  description: Localized;
  wide: Point;
  narrow: Point;
  kind: "core" | "branch" | "case";
};

export const tcsNodes: readonly TcsNode[] = [
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
    wide: [16, 13],
    narrow: [17, 8],
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
    wide: [46, 12],
    narrow: [50, 8],
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
    wide: [77, 15],
    narrow: [83, 8],
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
    wide: [15, 42],
    narrow: [17, 30],
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
    wide: [45, 39],
    narrow: [50, 30],
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
    wide: [78, 44],
    narrow: [83, 30],
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
    wide: [16, 67],
    narrow: [17, 52],
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
    wide: [43, 66],
    narrow: [50, 52],
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
    wide: [77, 68],
    narrow: [83, 52],
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
    wide: [29, 89],
    narrow: [27, 79],
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
    wide: [69, 90],
    narrow: [73, 79],
    kind: "case",
  },
];

export const tcsEdges: ReadonlyArray<readonly [string, string]> = [
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
