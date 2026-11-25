import { type Text, words } from "@/lib/math-lab/graph-algorithms";

export type Note = {
  definition: Text;
  cost: string | Text;
  code: string;
  why: Text;
  source?: { label: string; url: string };
};
export const graphNotes = {
  kruskal: {
    definition: words(
      "目标是用 n−1 条边把无向连通图连起来，并使边权总和最小。Kruskal 按全图边权从小到大试边。",
      "Connect an undirected graph with n−1 edges of minimum total weight. Kruskal considers edges in global weight order.",
    ),
    cost: "O(m log m)",
    code: `Kruskal(V, E):
  F ← ∅
  MakeSet(v) for every v in V
  for (u, v, w) in E sorted by (w, id):
    if Find(u) ≠ Find(v):
      F.add((u, v, w))
      Union(u, v)
  return F`,
    why: words(
      "加入跨分量的最轻可用边符合割性质。边权排序主导时间，并查集用按秩合并和路径压缩。图不连通时得到最小生成森林。",
      "The lightest available crossing edge is safe by the cut property. Sorting dominates the cost with rank and path compression. A disconnected input gives a minimum spanning forest.",
    ),
  },
  prim: {
    definition: words(
      "任取一个起点，始终挑一条从已在树里的点通往树外的最轻边。",
      "Start at any vertex and repeatedly take the lightest edge from the current tree to a vertex outside it.",
    ),
    cost: "O((n + m) log n)",
    code: `Prim(G, root):
  key[v] ← (+∞, +∞); parent[v] ← none  for every v
  key[root] ← (−∞, root id)
  Q ← indexed binary min-heap of all vertices by key
  while Q is not empty:
    u ← ExtractMin(Q)
    for edge (u, v, w) in Adj[u]:
      if v in Q and (w, edge id) < key[v]:
        parent[v] ← u
        DecreaseKey(Q, v, (w, edge id))
  return {(parent[v], v) : parent[v] ≠ none}`,
    why: words(
      "树内与树外组成一个割，最轻跨边可以安全加入。这里的复杂度按支持 DecreaseKey 的二叉堆计算，小图逐步列出跨边供核对。若弹出无穷键，便从下一个连通分量重新长一棵树。",
      "The inside and outside of the tree define a cut. Its lightest crossing edge is safe. The bound uses an indexed binary heap with DecreaseKey; the small trace lists the frontier explicitly. Extracting an infinite key starts another component.",
    ),
  },
  boruvka: {
    definition: words(
      "每个当前分量并行选一条最轻出边，再把连在一起的分量合并。",
      "Each current component nominates its lightest outgoing edge. Merge the components joined by those edges.",
    ),
    cost: words("连通图 O(m log n)", "Connected graph O(m log n)"),
    code: `Borůvka(V, E):
  F ← ∅; each vertex starts in its own component
  repeat:
    best ← empty table, indexed by current component
    for e = (u, v) in E:
      if comp[u] ≠ comp[v]:
        update best[comp[u]] and best[comp[v]] by (w(e), id(e))
    if best is empty: return F
    merge components along the distinct edges in best
    add those edges to F
    relabel every vertex by its new component`,
    why: words(
      "用 (权重, 边编号) 定一个全序来处理并列。每条选边由分量割保证安全；在连通图中每轮分量数至少减半，因此最多对数轮。",
      "Use (weight, edge id) as a total tie-breaking order. A component cut certifies each choice. With a connected graph the component count at least halves each round, so there are logarithmically many passes.",
    ),
  },
  kkt: {
    definition: words(
      "先缩点，再借一个随机样本森林找出可以安全删除的边。对给定森林 F，若边 e 的两端在 F 中连通，且 e 比那条路径上最重的边还重，就称 e 为 F-偏重边。",
      "Contract first, then use a sampled forest to certify deletions. An edge e is F-heavy when F connects its ends and e is heavier than the heaviest edge on that path.",
    ),
    cost: words("期望 O(n + m)", "Expected O(n + m)"),
    code: `KKT(G):
  if E(G) = ∅: return ∅
  (G′, S) ← BorůvkaTwice(G)
    contract after each pass
  remove loops from G′
  keep least edge per pair
  H ← sample(G′, p = 1/2)
       each edge independently
  F ← KKT(H)
  R ← MarkHeavyLinear(G′, F)
  return S ∪ KKT(G′ − R)

MarkHeavyLinear(G, F):
  compute path maxima in batch
  for each edge e = (x, y):
    if F connects x to y:
      t ← maxKey(F[x→y])
      if key(e) > t: mark e
  return marked edges

key(e) = (weight(e), id(e))`,
    why: words(
      "任意 F-偏重边与见证路径组成一个环，按环性质可安全删除。两轮 Borůvka 使非孤立超级点数量至多为原来的四分之一。若缩点后有 n′ 个点，采样引理给出期望 F-轻边数至多 2n′，样本本身平均只有原来缩点边数的一半。左右子问题各至多 n/4 个点，期望边数分别至多 m/2 和 n/2。去掉孤立点后 n ≤ 2m，所以子问题规模之和的期望至多为原规模的 5/6。期望取自算法自己的独立随机选择，在单位代价 RAM、边权仅可比较的模型下，用线性的批量路径验证完成过滤。论文的最坏上界是 O(min{n², m log n})。网页用固定种子逐边演示见证路径。",
      "A heavy edge closes a cycle with its witness path and can be removed by the cycle property. Two Borůvka rounds reduce the non-isolated vertex count by a factor of four. With n′ contracted vertices, the sampling lemma bounds the expected surviving light edges by 2n′. The sample has half the contracted edges in expectation. Each child has at most n/4 vertices; the expected edge counts are at most m/2 and n/2. After dropping isolated vertices, n ≤ 2m, so expected total child size is at most 5/6 of the parent. The bound averages over the algorithm’s random choices and assumes a unit-cost RAM, weight comparisons, and a linear batch path verifier. The paper gives O(min{n², m log n}) in the worst case. The trace shows paths one at a time with a fixed seed.",
    ),
    source: {
      label: "Karger, Klein & Tarjan · JACM 1995",
      url: "https://www.cs.cmu.edu/~guyb/paralg/papers/KargerKleinTarjan95.pdf",
    },
  },
  topo: {
    definition: words(
      "DAG 是无有向环的有向图。拓扑序要求每条边的起点排在终点之前。",
      "A DAG is a directed graph without directed cycles. A topological ordering puts every edge's tail before its head.",
    ),
    cost: "O(n + m)",
    code: `TopologicalOrder(G):
  deg[v] ← number of incoming edges of v
  Q ← queue of vertices with deg[v] = 0
  order ← []
  while Q is not empty:
    u ← pop front of Q
    order.append(u)
    for v in Out[u]:
      deg[v] ← deg[v] − 1
      if deg[v] = 0: push v into Q
  if length(order) < |V|: report a directed cycle
  return order`,
    why: words(
      "一个零入度点没有尚未完成的前置条件，可以放到当前序列末尾。拓扑序可能有多个；例子用固定队列顺序。",
      "A zero-indegree vertex has no unfinished predecessor. It can be appended next. Several correct orders may exist; this example uses a fixed queue order.",
    ),
    source: {
      label: "A. B. Kahn · Topological Sorting of Large Networks",
      url: "https://doi.org/10.1145/368996.369025",
    },
  },
  distances: {
    definition: words(
      "按拓扑序依次松弛出边。图中有 −3 的边，这个算法仍然能用。",
      "Relax outgoing edges in topological order. The example includes a weight of −3, which this algorithm can handle.",
    ),
    cost: "O(n + m)",
    code: `DAGShortestPaths(G, s):
  order ← TopologicalOrder(G)
  d[v] ← ∞; predecessor[v] ← none
  d[s] ← 0
  for u in order:
    if d[u] is finite:
      for edge (u, v, w) in Out[u]:
        if d[u] + w < d[v]:
          d[v] ← d[u] + w
          predecessor[v] ← u
  return (d, predecessor)`,
    why: words(
      "顶点被处理时，可能改善它的前驱都已处理完。负权边不会让后面的点回头改动前面的距离，因为图中没有有向环。",
      "When a vertex is processed, all predecessors that can improve its distance have been processed. A negative edge cannot carry a distance update backward in the topological order.",
    ),
  },
  scc: {
    definition: words(
      "SCC 是一个极大顶点集合，组内任意两点都互相可达。Tarjan 用一次 DFS 识别所有组，再把每组缩成一个点。",
      "An SCC is a maximal set of vertices that can all reach one another. Tarjan finds them in one DFS; contracting them gives a DAG.",
    ),
    cost: "O(n + m)",
    code: `DFS(u):
  index[u] ← low[u] ← next discovery index
  push u on stack and mark it onStack
  for v in Out[u]:
    if v has no index:
      DFS(v)
      low[u] ← min(low[u], low[v])
    else if onStack[v]:
      low[u] ← min(low[u], index[v])
  if low[u] = index[u]:
    pop vertices through u to form one SCC
    clear onStack for all popped vertices

Tarjan(G):
  for u in V where index[u] is unset:
    DFS(u)`,
    why: words(
      "DFS 子节点返回时用 low；遇到已访问且仍在栈中的点用 index。对已出栈的点不更新。若缩点图有环，环上的分量之间可互达，原来就该合成同一个分量。",
      "On a DFS child return use its low value; for a previously visited on-stack neighbor use its discovery index. Ignore popped vertices. A cycle in the condensation would make its components mutually reachable and therefore one SCC.",
    ),
    source: {
      label: "Robert Tarjan · Depth-First Search and Linear Graph Algorithms",
      url: "https://www.cs.cmu.edu/~cdm/resources/Tarjan1972-sccs.pdf",
    },
  },
  dst: {
    definition: words(
      "这里把 DST 用作有向生成树，以给定根向外可达所有点。Chu–Liu/Edmonds 在满足这个条件的树里最小化边权总和。",
      "Here DST means a directed spanning tree outward from a given root. Chu–Liu/Edmonds minimizes total edge weight among these rooted arborescences.",
    ),
    cost: words("逐轮缩环 O(nm)", "Straightforward contraction O(nm)"),
    code: `Arborescence(G, root):
  for each vertex v other than root:
    in[v] ← least incoming edge of v
    if none exists: report infeasible
  if the in-edges contain no cycle: return all in[v]
  C ← one cycle in the provisional edges
  contract C to a supervertex; discard internal edges
  for every edge (u, v) entering C from outside:
    its new weight ← w(u, v) − w(in[v])
  T ← Arborescence(contracted graph, root)
  if infeasible: report infeasible
  let T's entering edge target original vertex t in C
  return T expanded to original endpoints plus in[v] for v in C except t`,
    why: words(
      "图里环内的最轻入边原本已经计入基准成本。用外部进入 v 的边替换它时，只需支付两条边的权重差。DAG 最短路优化起点到各点的距离；这里优化选入树的边权总和。",
      "The provisional cycle edges give the baseline cost. Entering the cycle at v replaces its provisional incoming edge and charges the difference. A DAG shortest-path tree optimizes individual root distances; this algorithm minimizes the sum of selected edge weights.",
    ),
    source: {
      label: "Jack Edmonds · Optimum Branchings",
      url: "https://nvlpubs.nist.gov/nistpubs/jres/71B/jresv71Bn4p233_A1b.pdf",
    },
  },
} satisfies Record<string, Note>;

export const matrixNotes = {
  multiply: {
    definition: words(
      "内维度要相等。m×k 乘 k×n 得 m×n，每一格是一个点积。",
      "The inner dimensions must match. An m×k matrix times k×n gives m×n; each entry is a dot product.",
    ),
    cost: "O(mkn)",
    code: `Multiply(A, B):
  require columns(A) = rows(B)
  C ← zero matrix with rows(A) and columns(B)
  for i in rows of A:
    for j in columns of B:
      for t in columns of A:
        C[i,j] ← C[i,j] + A[i,t] × B[t,j]
  return C`,
    why: words(
      "如果把 A、B 看成线性变换，AB 表示一个向量先过 B，再过 A。所选输出格始终取 A 的一行和 B 的一列。",
      "Interpreted as linear maps, AB sends a vector through B and then A. Every selected output cell uses one row of A and one column of B.",
    ),
  },
  lu: {
    definition: words(
      "用部分选主元的消元，得到 PA = LU。P 记录行交换，L 记录消元倍数，U 是上三角矩阵。例子包含两次换行。",
      "Elimination with partial pivoting gives PA = LU. P records row swaps, L stores multipliers, and U is upper triangular. This example needs two row swaps.",
    ),
    cost: "O(n³)",
    code: `PivotedLU(A):
  P ← I; L ← I; U ← copy(A)
  for k = 0 … n−1:
    p ← row of largest |U[p,k]| among p ≥ k
    if U[p,k] = 0: report singular pivot
    swap rows k and p in U and P
    swap rows k and p of L only in columns before k
    for i = k+1 … n−1:
      L[i,k] ← U[i,k] / U[k,k]
      U[i,k…] ← U[i,k…] − L[i,k] × U[k,k…]
  return P, L, U`,
    why: words(
      "在已完成的列里，某个消元倍数绑定的是它所在的行。后面换行时，L 的那部分也必须换。实际解 Ax=b 时，先解 Ly=Pb，再解 Ux=y。",
      "A previously computed multiplier belongs to its row. Later pivot swaps must move that part of L as well. To solve Ax=b, first solve Ly=Pb, then Ux=y.",
    ),
    source: {
      label: "MIT 18.06 · Factorization into A = LU",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/resources/mit18_06scf11_ses1-4sum/",
    },
  },
  svd: {
    definition: words(
      "A = UΣVᵀ 把一个线性变换拆成输入方向、非负伸缩和输出方向。这里用 3×2 的矩阵算薄 SVD，最后比较秩 1 与秩 2 的重构。",
      "A = UΣVᵀ separates input directions, nonnegative scales, and output directions. This example uses a 3×2 thin SVD and compares rank-one and rank-two reconstructions.",
    ),
    cost: "AᵀA → V, Σ → U → UΣVᵀ",
    code: `SVD via the Gram matrix (for this example):
  G ← transpose(A) × A
  (λ, V) ← eigenpairs of symmetric G, sorted by λ descending
  σ[i] ← sqrt(λ[i])
  for each σ[i] > 0:
    u[i] ← A × v[i] / σ[i]
  choose remaining columns of U orthonormally if σ[i] = 0
  return U, diag(σ), transpose(V)`,
    why: words(
      "实数矩阵的 AᵀA 是半正定的。只保留较大奇异值，重构误差的 Frobenius 范数是丢弃奇异值平方和的平方根。在数值软件中通常用更稳健的方法直接做 SVD，构造 AᵀA 适合跟算这个小例子。",
      "AᵀA is positive semidefinite. The Frobenius error after truncation is the square root of the sum of squared discarded singular values. This Gram-matrix construction is useful for the small example; numerical libraries typically use more stable SVD algorithms.",
    ),
    source: {
      label: "MIT 18.065 · Singular Value Decomposition",
      url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-6-singular-value-decomposition-svd/",
    },
  },
} satisfies Record<string, Note>;
