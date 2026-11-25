export type Edge = { id: string; u: string; v: string; w: number };
export type Vertex = { id: string; x: number; y: number; label?: string };
export type Graph = { nodes: Vertex[]; edges: Edge[] };
export type Text = { zh: string; en: string };
export type GraphStep = {
  title: Text;
  detail: Text;
  diagram?: Graph;
  kept?: string[];
  rejected?: string[];
  sampled?: string[];
  active?: string[];
  vertices?: string[];
  rows?: { label: Text; value: string }[];
};

export const words = (zh: string, en: string): Text => ({ zh, en });
const node = (id: string, x: number, y: number): Vertex => ({ id, x, y });
const edge = (u: string, v: string, w = 1): Edge => ({ id: u + v, u, v, w });
const byWeight = (a: Edge, b: Edge) => a.w - b.w || a.id.localeCompare(b.id);
export const edgeList = (edges: readonly Edge[]) =>
  edges.map((e) => `${e.u}–${e.v}`).join(", ") || "∅";
const row = (zh: string, en: string, value: string) => ({
  label: words(zh, en),
  value,
});
const total = (edges: readonly Edge[]) =>
  edges.reduce((sum, e) => sum + e.w, 0);

function adjacency(graph: Graph) {
  const outgoing = new Map(graph.nodes.map((node) => [node.id, [] as Edge[]]));
  for (const edge of graph.edges) outgoing.get(edge.u)!.push(edge);
  return outgoing;
}

function projectedGraph(
  graph: Graph,
  component: (id: string) => string,
  edges: Edge[],
): Graph {
  const members = new Map<string, Vertex[]>();
  for (const v of graph.nodes) {
    const key = component(v.id);
    if (!members.has(key)) members.set(key, []);
    members.get(key)!.push(v);
  }
  const nodes = [...members].map(([id, group]) => ({
    id,
    label: group.map((v) => v.id).join(""),
    x: group.reduce((sum, v) => sum + v.x, 0) / group.length,
    y: group.reduce((sum, v) => sum + v.y, 0) / group.length,
  }));
  return { nodes, edges };
}

function onePerDirection(edges: Edge[]) {
  const selected = new Map<string, Edge>();
  for (const e of edges) {
    const key = e.u + "|" + e.v;
    const previous = selected.get(key);
    if (!previous || byWeight(e, previous) < 0) selected.set(key, e);
  }
  return [...selected.values()];
}

export const classicGraph: Graph = {
  nodes: [
    node("A", 55, 112),
    node("B", 148, 45),
    node("C", 148, 197),
    node("D", 315, 45),
    node("E", 315, 197),
    node("F", 421, 112),
  ],
  edges: [
    edge("A", "B", 4),
    edge("A", "C", 2),
    edge("B", "C", 1),
    edge("B", "D", 5),
    edge("C", "D", 8),
    edge("C", "E", 10),
    edge("D", "E", 3),
    edge("D", "F", 6),
    edge("E", "F", 7),
  ],
};

export const samplingGraph: Graph = {
  nodes: [
    node("A", 48, 53),
    node("B", 48, 101),
    node("C", 128, 53),
    node("D", 128, 101),
    node("E", 194, 139),
    node("F", 194, 192),
    node("G", 274, 139),
    node("H", 274, 192),
    node("I", 344, 53),
    node("J", 344, 101),
    node("K", 425, 53),
    node("L", 425, 101),
  ],
  edges: [
    edge("A", "B", 1),
    edge("C", "D", 2),
    edge("E", "F", 3),
    edge("G", "H", 4),
    edge("I", "J", 5),
    edge("K", "L", 6),
    edge("A", "C", 7),
    edge("F", "H", 8),
    edge("I", "K", 9),
    edge("D", "E", 10),
    edge("G", "J", 11),
    edge("C", "I", 16),
    edge("A", "F", 19),
    edge("H", "K", 20),
  ],
};

class Components {
  parents = new Map<string, string>();
  ranks = new Map<string, number>();
  constructor(ids: readonly string[]) {
    for (const id of ids) {
      this.parents.set(id, id);
      this.ranks.set(id, 0);
    }
  }
  find(id: string): string {
    const parent = this.parents.get(id)!;
    if (parent === id) return id;
    const root = this.find(parent);
    this.parents.set(id, root);
    return root;
  }
  join(a: string, b: string) {
    let first = this.find(a),
      second = this.find(b);
    if (first === second) return false;
    if (this.ranks.get(first)! < this.ranks.get(second)!)
      [first, second] = [second, first];
    this.parents.set(second, first);
    if (this.ranks.get(first) === this.ranks.get(second))
      this.ranks.set(first, this.ranks.get(first)! + 1);
    return true;
  }
  groups(ids: readonly string[]) {
    const groups = new Map<string, string[]>();
    for (const id of ids) {
      const key = this.find(id);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(id);
    }
    return [...groups.values()]
      .map((group) => `{${group.join(",")}}`)
      .join(" ");
  }
}

const selection = (kept: Edge[]) => [
  row("选中的边", "Selected edges", edgeList(kept)),
  row("当前总权重", "Current weight", String(total(kept))),
];

function finish(edges: Edge[], ids: string[]): GraphStep {
  return {
    title: words(
      edges.length === ids.length - 1 ? "生成树完成" : "生成森林完成",
      edges.length === ids.length - 1
        ? "Spanning tree complete"
        : "Spanning forest complete",
    ),
    detail: words(
      `共选 ${edges.length} 条边，总权重 ${total(edges)}。`,
      `Selected ${edges.length} edges, total weight ${total(edges)}.`,
    ),
    kept: edges.map((e) => e.id),
    rows: selection(edges),
  };
}

function start(): GraphStep {
  return {
    title: words("读图", "Read the graph"),
    detail: words(
      "边上的数字是权重。每一步检查选了哪条边、为什么能选。",
      "The numbers on edges are weights. Step through the algorithm to see which edges it can select.",
    ),
  };
}

export function kruskal(graph: Graph) {
  const ids = graph.nodes.map((n) => n.id),
    groups = new Components(ids);
  const kept: Edge[] = [];
  const rejected: string[] = [];
  const steps = [start()];
  for (const candidate of [...graph.edges].sort(byWeight)) {
    const accepted = groups.join(candidate.u, candidate.v);
    if (accepted) kept.push(candidate);
    else rejected.push(candidate.id);
    steps.push({
      title: words(
        accepted ? "跨分量，加入" : "会成环，跳过",
        accepted ? "Accept a crossing edge" : "Skip a cycle edge",
      ),
      detail: words(
        `${edgeList([candidate])} 的权重为 ${candidate.w}。${accepted ? "两个端点原先分属不同分量。" : "两个端点已经通过已选边连通。"}`,
        `Edge ${edgeList([candidate])} has weight ${candidate.w}. ${accepted ? "Its ends were in different components." : "Its ends are already connected."}`,
      ),
      active: [candidate.id],
      kept: kept.map((e) => e.id),
      rejected: [...rejected],
      rows: [
        ...selection(kept),
        row("当前分量", "Components", groups.groups(ids)),
      ],
    });
    if (kept.length === ids.length - 1) break;
  }
  steps.push(finish(kept, ids));
  return { kept, steps };
}

export function prim(graph: Graph) {
  const ids = graph.nodes.map((n) => n.id);
  const inTree = new Set<string>(),
    kept: Edge[] = [];
  const steps = [start()];
  for (const seed of ids) {
    if (inTree.has(seed)) continue;
    inTree.add(seed);
    steps.push({
      title: words(`从 ${seed} 开始`, `Start at ${seed}`),
      detail: words(
        "从树内到树外，只在跨过这个边界的边里挑。",
        "Choose only edges that cross from the current tree to an unvisited vertex.",
      ),
      vertices: [...inTree],
      kept: kept.map((e) => e.id),
      rows: selection(kept),
    });
    for (;;) {
      const frontier = graph.edges
        .filter((e) => inTree.has(e.u) !== inTree.has(e.v))
        .sort(byWeight);
      const pick = frontier[0];
      if (!pick) break;
      const added = inTree.has(pick.u) ? pick.v : pick.u;
      inTree.add(added);
      kept.push(pick);
      steps.push({
        title: words(`把 ${added} 接进来`, `Add ${added}`),
        detail: words(
          `跨边界最轻的是 ${edgeList([pick])}，权重 ${pick.w}。`,
          `The lightest crossing edge is ${edgeList([pick])}, of weight ${pick.w}.`,
        ),
        active: [pick.id],
        vertices: [...inTree],
        kept: kept.map((e) => e.id),
        rows: [
          row("本轮候选", "Frontier before selection", edgeList(frontier)),
          ...selection(kept),
        ],
      });
    }
  }
  steps.push(finish(kept, ids));
  return { kept, steps };
}

function lightestOutgoing(components: Components, edges: Edge[]) {
  const best = new Map<string, Edge>();
  for (const edge of edges) {
    const a = components.find(edge.u),
      b = components.find(edge.v);
    if (a === b) continue;
    for (const id of [a, b])
      if (!best.has(id) || byWeight(edge, best.get(id)!) < 0)
        best.set(id, edge);
  }
  return [...new Set(best.values())].sort(byWeight);
}

export function boruvka(graph: Graph) {
  const ids = graph.nodes.map((n) => n.id),
    groups = new Components(ids);
  const kept: Edge[] = [];
  const steps = [start()];
  for (let round = 1; ; round++) {
    const before = groups.groups(ids);
    const chosen = lightestOutgoing(groups, graph.edges).filter((e) =>
      groups.join(e.u, e.v),
    );
    if (!chosen.length) break;
    kept.push(...chosen);
    steps.push({
      title: words(
        `第 ${round} 轮并行选边`,
        `Round ${round}: combine components`,
      ),
      detail: words(
        "每个旧分量各挑最轻的出边；同一条边被挑两次也只并一次。",
        "Each old component names its lightest outgoing edge. Merge a duplicate choice just once.",
      ),
      active: chosen.map((e) => e.id),
      kept: kept.map((e) => e.id),
      rows: [
        row("选边前", "Before the round", before),
        row("本轮新增", "Added this round", edgeList(chosen)),
        row("合并后", "After merging", groups.groups(ids)),
        ...selection(kept),
      ],
    });
  }
  steps.push(finish(kept, ids));
  return { kept, steps };
}

function forestPath(
  forest: Edge[],
  from: string,
  to: string,
): Edge[] | undefined {
  const visited = new Set<string>();
  function visit(v: string): Edge[] | undefined {
    if (v === to) return [];
    visited.add(v);
    for (const e of forest) {
      const next = e.u === v ? e.v : e.v === v ? e.u : undefined;
      if (next === undefined || visited.has(next)) continue;
      const rest = visit(next);
      if (rest) return [e, ...rest];
    }
  }
  return visit(from);
}

export function kargerKleinTarjan(graph: Graph, seed: number) {
  const ids = graph.nodes.map((n) => n.id),
    originals = new Map(graph.edges.map((e) => [e.id, e]));
  const initial = seed >>> 0;
  let randomState = initial;
  const sample = () => {
    randomState = (Math.imul(1664525, randomState) + 1013904223) >>> 0;
    return randomState < 0x80000000;
  };
  const steps = [start()];
  function solve(vertices: string[], edges: Edge[], outer: boolean): string[] {
    if (!edges.length) return [];
    const groups = new Components(vertices),
      fixed: string[] = [];
    for (let round = 1; round <= 2; round++) {
      const picked = lightestOutgoing(groups, edges).filter((e) =>
        groups.join(e.u, e.v),
      );
      fixed.push(...picked.map((e) => e.id));
      if (outer)
        steps.push({
          title: words(`Borůvka 第 ${round} 轮`, `Borůvka round ${round}`),
          detail: words(
            "安全边先入森林，相连的顶点缩成一个超级点。",
            "Contract the safe edges into supervertices.",
          ),
          active: picked.map((e) => e.id),
          kept: [...fixed],
          rows: [
            row(
              "缩点后的分量",
              "Contracted components",
              groups.groups(vertices),
            ),
            ...selection(fixed.map((id) => originals.get(id)!)),
          ],
        });
    }
    const lightest = new Map<string, Edge>();
    for (const e of edges) {
      const u = groups.find(e.u),
        v = groups.find(e.v);
      if (u === v) continue;
      const key = [u, v].sort().join("|");
      if (!lightest.has(key) || byWeight(e, lightest.get(key)!) < 0)
        lightest.set(key, { ...e, u, v });
    }
    const contracted = [...lightest.values()];
    if (!contracted.length) return fixed;
    const remainingNodes = [...new Set(contracted.flatMap((e) => [e.u, e.v]))];
    const droppedParallel = edges
      .filter(
        (e) =>
          groups.find(e.u) !== groups.find(e.v) &&
          !contracted.some((active) => active.id === e.id),
      )
      .map((e) => e.id);
    const sampled = contracted.filter(sample);
    const diagram = outer
      ? projectedGraph(graph, (id) => groups.find(id), contracted)
      : undefined;
    if (outer)
      steps.push({
        title: words("缩点后采样", "Sample the contracted graph"),
        diagram,
        detail: words(
          "在缩点图上作采样。平行边只留最轻一条；每条剩余边各自决定是否入样本。",
          "Sample the contracted graph after retaining only the lightest parallel edge. Each remaining edge makes its own sampling decision.",
        ),
        kept: [...fixed],
        rejected: droppedParallel,
        sampled: sampled.map((e) => e.id),
        rows: [
          row(
            "缩点后待采样的边",
            "Edges after contraction",
            edgeList(contracted.map((e) => originals.get(e.id)!)),
          ),
          row(
            "抽中的原边",
            "Sampled original edges",
            edgeList(sampled.map((e) => originals.get(e.id)!)),
          ),
        ],
      });
    const forestIds = solve(remainingNodes, sampled, false);
    const forest = sampled.filter((e) => forestIds.includes(e.id));
    const heavy: string[] = [];
    for (const e of contracted) {
      const path = forestPath(forest, e.u, e.v);
      const maximum = path?.reduce<Edge | undefined>(
        (max, next) => (!max || byWeight(next, max) > 0 ? next : max),
        undefined,
      );
      const remove = maximum !== undefined && byWeight(e, maximum) > 0;
      if (remove) heavy.push(e.id);
      const displayName = (id: string) =>
        diagram?.nodes.find((v) => v.id === id)?.label ?? id;
      let endpoint = e.u;
      const witness =
        path?.reduce((text, item) => {
          endpoint = item.u === endpoint ? item.v : item.u;
          return text + ` –(${item.w})– ${displayName(endpoint)}`;
        }, displayName(endpoint)) ?? "∅";
      const comparison =
        maximum && path
          ? e.w === maximum.w
            ? `(${e.w}, ${e.id}) ${remove ? ">" : "≤"} (${maximum.w}, ${maximum.id})`
            : `${e.w} ${remove ? ">" : "≤"} max(${path.map((item) => item.w).join(", ")}) = ${maximum.w}`
          : undefined;
      if (outer)
        steps.push({
          title: words(
            remove ? "F-偏重边，删除" : "保留给下一次递归",
            remove ? "Delete an F-heavy edge" : "Keep the edge for recursion",
          ),
          detail: words(
            comparison
              ? `检查 ${edgeList([originals.get(e.id)!])}。候选边与路径最大边比较：${comparison}。`
              : "样本森林中两端不连通，当前边保留。",
            comparison
              ? `Compare the candidate with the maximum on the sampled forest path: ${comparison}.`
              : "The sample forest does not connect the two ends; keep the edge.",
          ),
          active: [e.id],
          diagram,
          kept: [...fixed],
          sampled: forestIds,
          rejected: [...droppedParallel, ...heavy],
          rows: [
            ...(e === contracted.at(-1)
              ? [
                  row(
                    "本轮保留的 F-轻边 / 候选边",
                    "F-light edges retained / candidates",
                    `${contracted.length - heavy.length} / ${contracted.length}`,
                  ),
                  row(
                    "F-轻边数量的期望上界",
                    "Upper bound on the expected F-light count",
                    `2n′ = 2 × ${remainingNodes.length} = ${2 * remainingNodes.length}`,
                  ),
                ]
              : []),
            row(
              "缩点图上的路径与边权",
              "Path and weights in the contracted graph",
              witness,
            ),
            row(
              "路径对应的原图边",
              "Original edges behind the path",
              path
                ? edgeList(path.map((item) => originals.get(item.id)!))
                : "∅",
            ),
          ],
        });
    }
    return fixed.concat(
      solve(
        remainingNodes,
        contracted.filter((e) => !heavy.includes(e.id)),
        false,
      ),
    );
  }
  const result = solve(ids, graph.edges, true).map((id) => originals.get(id)!);
  steps.push(finish(result, ids));
  return { kept: result, steps };
}

export const dagGraph: Graph = {
  nodes: [
    node("A", 53, 120),
    node("B", 157, 54),
    node("C", 157, 190),
    node("D", 300, 55),
    node("E", 300, 190),
    node("F", 426, 120),
  ],
  edges: [
    edge("A", "B", 4),
    edge("A", "C", 2),
    edge("B", "D", -3),
    edge("C", "D", 4),
    edge("C", "E", 3),
    edge("D", "F", 2),
    edge("E", "F", 1),
  ],
};

export function topological(graph: Graph) {
  const ids = graph.nodes.map((n) => n.id);
  const degree = Object.fromEntries(ids.map((id) => [id, 0]));
  for (const e of graph.edges) degree[e.v]++;
  const adjacencyList = adjacency(graph);
  const queue = ids.filter((id) => degree[id] === 0),
    order: string[] = [],
    deleted: string[] = [];
  const facts = () => [
    row("零入度队列", "Zero-indegree queue", queue.join(", ") || "∅"),
    row("当前顺序", "Current order", order.join(" → ") || "∅"),
    row(
      "剩余入度",
      "Remaining indegrees",
      ids
        .filter((id) => !order.includes(id))
        .map((id) => `${id}:${degree[id]}`)
        .join("  ") || "∅",
    ),
  ];
  const steps: GraphStep[] = [
    {
      title: words("先数入度", "Count incoming edges"),
      detail: words(
        "把入度为 0 的顶点送进队列。",
        "Enqueue each vertex with indegree zero.",
      ),
      rows: facts(),
    },
  ];
  while (queue.length) {
    const id = queue.shift()!,
      outgoing = adjacencyList.get(id)!;
    order.push(id);
    for (const e of outgoing) {
      deleted.push(e.id);
      if (--degree[e.v] === 0) queue.push(e.v);
    }
    steps.push({
      title: words(`取出 ${id}`, `Remove ${id}`),
      detail: words(
        "删去从它出发的边；新变成零入度的点入队。",
        "Delete its outgoing edges and enqueue vertices whose indegree falls to zero.",
      ),
      active: outgoing.map((e) => e.id),
      rejected: [...deleted],
      vertices: [...order],
      rows: facts(),
    });
  }
  const cyclic = order.length !== ids.length;
  steps.push({
    title: words(
      cyclic ? "仍有环" : "拓扑序完成",
      cyclic ? "Cycle detected" : "Topological order complete",
    ),
    detail: words(
      cyclic
        ? "队列已空，仍有顶点没有取出。"
        : "每条边都从排序靠前的点指向靠后的点。",
      cyclic
        ? "The queue emptied before all vertices were removed."
        : "Every edge points from an earlier to a later vertex.",
    ),
    rows: facts(),
    vertices: [...order],
  });
  return { order, steps, cyclic };
}

export function dagDistances(graph: Graph, source: string) {
  const { order, cyclic } = topological(graph);
  if (cyclic) throw new Error("DAG shortest paths require an acyclic graph.");
  const dist = Object.fromEntries(order.map((id) => [id, Infinity])),
    pred = new Map<string, Edge>();
  dist[source] = 0;
  const facts = () => [
    row("拓扑序", "Topological order", order.join(" → ")),
    row(
      `从 ${source} 出发的距离`,
      `Distances from ${source}`,
      order
        .map((v) => `${v}:${Number.isFinite(dist[v]) ? dist[v] : "∞"}`)
        .join("  "),
    ),
  ];
  const steps: GraphStep[] = [
    {
      title: words("先把起点距离置零", "Initialize the source"),
      detail: words(
        "其余距离先设为无穷，随后按拓扑序处理出边。",
        "All other distances start at infinity. Process outgoing edges in topological order.",
      ),
      rows: facts(),
      vertices: [source],
    },
  ];
  const adjacencyList = adjacency(graph);
  for (const id of order)
    for (const e of adjacencyList.get(id)!) {
      const previous = dist[e.v],
        candidate = dist[id] + e.w;
      if (candidate < previous) {
        dist[e.v] = candidate;
        pred.set(e.v, e);
      }
      const fmt = (v: number) => (Number.isFinite(v) ? String(v) : "∞");
      steps.push({
        title: words(`松弛 ${e.u} → ${e.v}`, `Relax ${e.u} → ${e.v}`),
        detail: words(
          `d[${e.v}] = min(${fmt(previous)}, ${fmt(dist[id])} + (${e.w})) = ${fmt(dist[e.v])}。`,
          `d[${e.v}] = min(${fmt(previous)}, ${fmt(dist[id])} + (${e.w})) = ${fmt(dist[e.v])}.`,
        ),
        active: [e.id],
        kept: [...pred.values()].map((x) => x.id),
        vertices: [id],
        rows: facts(),
      });
    }
  steps.push({
    title: words("最短路结果", "Shortest-path result"),
    detail: words(
      "每点的前驱边可以反向串回起点；不可达的点保留 ∞。",
      "Follow predecessors back to the source. Unreachable vertices keep distance infinity.",
    ),
    kept: [...pred.values()].map((e) => e.id),
    rows: facts(),
  });
  return { dist, steps };
}

export const sccGraph: Graph = {
  nodes: [
    node("A", 55, 70),
    node("B", 118, 126),
    node("C", 55, 183),
    node("D", 230, 77),
    node("E", 230, 176),
    node("F", 352, 77),
    node("G", 352, 176),
    node("H", 434, 128),
  ],
  edges: [
    edge("A", "B"),
    edge("B", "C"),
    edge("C", "A"),
    edge("C", "D"),
    edge("D", "E"),
    edge("E", "D"),
    edge("E", "F"),
    edge("F", "G"),
    edge("G", "F"),
    edge("G", "H"),
  ],
};

export function tarjan(graph: Graph) {
  const ids = graph.nodes.map((n) => n.id),
    stack: string[] = [],
    onStack = new Set<string>();
  const adjacencyList = adjacency(graph);
  const index = new Map<string, number>(),
    low = new Map<string, number>(),
    groups: string[][] = [];
  const facts = () => [
    row("栈底 → 栈顶", "Stack bottom → top", stack.join(", ") || "∅"),
    row(
      "点 : index / low",
      "Vertex : index / low",
      ids
        .filter((v) => index.has(v))
        .map((v) => `${v}:${index.get(v)}/${low.get(v)}`)
        .join("  ") || "∅",
    ),
    row(
      "已弹出的分量",
      "Components already popped",
      groups.map((group) => `{${group.join(",")}}`).join(" ") || "∅",
    ),
  ];
  const steps: GraphStep[] = [
    {
      title: words("深度优先搜索", "Depth-first search"),
      detail: words(
        "index 记录进入时间，low 追踪能连到的栈中较早下标。",
        "Use index for discovery order and low to track the earliest relevant stack index.",
      ),
      rows: facts(),
    },
  ];
  function visit(v: string) {
    index.set(v, index.size);
    low.set(v, index.get(v)!);
    stack.push(v);
    onStack.add(v);
    steps.push({
      title: words(`进入 ${v} 并压栈`, `Visit and push ${v}`),
      detail: words(
        `先把 low[${v}] 初始化为 index[${v}]。`,
        `Initialize low[${v}] to index[${v}].`,
      ),
      vertices: [v],
      rows: facts(),
    });
    for (const e of adjacencyList.get(v)!) {
      const w = e.v;
      if (!index.has(w)) {
        visit(w);
        low.set(v, Math.min(low.get(v)!, low.get(w)!));
        steps.push({
          title: words(`从子节点 ${w} 返回`, `Return from child ${w}`),
          detail: words(
            `用 low[${w}] 更新 low[${v}]。`,
            `Use low[${w}] to update low[${v}].`,
          ),
          active: [e.id],
          vertices: [v, w],
          rows: facts(),
        });
      } else if (onStack.has(w)) {
        low.set(v, Math.min(low.get(v)!, index.get(w)!));
        steps.push({
          title: words(`遇到仍在栈中的 ${w}`, `Meet ${w} still on the stack`),
          detail: words(
            `用 index[${w}] 更新 low[${v}]。`,
            `Use index[${w}] to update low[${v}].`,
          ),
          active: [e.id],
          vertices: [v, w],
          rows: facts(),
        });
      } else {
        steps.push({
          title: words(`${w} 已经出栈`, `${w} is already off the stack`),
          detail: words(
            "这个点已归入一个分量，low 保持原值。",
            "That vertex already belongs to a completed component; leave low unchanged.",
          ),
          active: [e.id],
          vertices: [v, w],
          rows: facts(),
        });
      }
    }
    if (index.get(v) === low.get(v)) {
      const component: string[] = [];
      for (;;) {
        const w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
        if (w === v) break;
      }
      groups.push(component.sort());
      steps.push({
        title: words(
          `弹出 {${component.join(",")}}`,
          `Pop {${component.join(",")}}`,
        ),
        detail: words(
          "index = low，从栈顶一路弹到根，得到一个强连通分量。",
          "When index = low, pop through the root to get one SCC.",
        ),
        vertices: component,
        rows: facts(),
      });
    }
  }
  for (const v of ids) if (!index.has(v)) visit(v);
  const numbering = new Map(
    groups.flatMap((g, i) => g.map((v) => [v, i] as const)),
  );
  const links = [
    ...new Set(
      graph.edges
        .filter((e) => numbering.get(e.u) !== numbering.get(e.v)!)
        .map(
          (e) =>
            `{${groups[numbering.get(e.u)!].join("")}} → {${groups[numbering.get(e.v)!].join("")}}`,
        ),
    ),
  ];
  const component = (id: string) => String(numbering.get(id));
  const arcs = onePerDirection(
    graph.edges
      .filter((e) => component(e.u) !== component(e.v))
      .map((e) => ({ ...e, u: component(e.u), v: component(e.v) })),
  );
  steps.push({
    diagram: projectedGraph(graph, component, arcs),
    title: words("把每个分量缩成一个点", "Condense each SCC"),
    detail: words(
      "分量内部互相可达。缩点图只保留跨分量的边，因此是 DAG。",
      "Vertices inside each SCC are mutually reachable. The condensation keeps only cross-component edges and is a DAG.",
    ),
    rows: [
      ...facts(),
      row("缩点图的边", "Condensation edges", links.join("  ") || "∅"),
    ],
    kept: graph.edges
      .filter((e) => numbering.get(e.u) !== numbering.get(e.v)!)
      .map((e) => e.id),
  });
  return { groups, steps };
}

export const directedTreeGraph: Graph = {
  nodes: [
    node("R", 53, 120),
    node("A", 186, 43),
    node("B", 186, 194),
    node("C", 325, 117),
    node("D", 434, 185),
  ],
  edges: [
    edge("R", "A", 8),
    edge("R", "B", 6),
    edge("R", "C", 8),
    edge("R", "D", 10),
    edge("A", "B", 1),
    edge("B", "C", 2),
    edge("C", "A", 1),
    edge("C", "D", 3),
    edge("D", "B", 9),
  ],
};

function cycleIn(incoming: Map<string, Edge>) {
  const done = new Set<string>();
  for (const vertex of incoming.keys()) {
    const path = new Map<string, number>();
    let current = vertex;
    while (incoming.has(current) && !done.has(current)) {
      const earlier = path.get(current);
      if (earlier !== undefined) return [...path.keys()].slice(earlier);
      path.set(current, path.size);
      current = incoming.get(current)!.u;
    }
    for (const id of path.keys()) done.add(id);
  }
  return [];
}

export function arborescence(graph: Graph, root: string) {
  const ids = graph.nodes.map((n) => n.id);
  const steps: GraphStep[] = [
    {
      title: words(`固定根 ${root}`, `Fix the root ${root}`),
      detail: words(
        "根不选入边。其他每个点恰好有一条入边，并且都要从根沿箭头到达。",
        "The root receives no edge. Every other vertex receives one edge and must be reachable from the root.",
      ),
    },
  ];
  let groupNumber = 0;
  function solve(
    vertices: string[],
    edges: Edge[],
    outer: boolean,
  ): Edge[] | null {
    const incoming = new Map<string, Edge>();
    for (const e of edges) {
      if (e.v === root || e.u === e.v) continue;
      const previous = incoming.get(e.v);
      if (!previous || byWeight(e, previous) < 0) incoming.set(e.v, e);
    }
    if (vertices.some((v) => v !== root && !incoming.has(v))) return null;
    const provisional = [...incoming.values()];
    const cycle = cycleIn(incoming);
    if (outer)
      steps.push({
        title: words(
          "每点先选最轻入边",
          "Choose the lightest edge entering each vertex",
        ),
        detail: words(
          cycle.length
            ? "本次选边中有环，需要先处理环。"
            : "所有暂选入边没有环，已组成最优树。",
          cycle.length
            ? "These provisional choices contain a cycle; resolve it before committing."
            : "The choices are acyclic and already form an optimum tree.",
        ),
        active: provisional.map((e) => e.id),
        vertices: cycle,
        rows: [
          row("暂选入边", "Provisional incoming edges", edgeList(provisional)),
          row("环内顶点", "Vertices on the cycle", cycle.join(", ") || "∅"),
        ],
      });
    if (!cycle.length) return provisional;
    const inCycle = new Set(cycle);
    const supernode = `@${++groupNumber}`;
    const reduced: Edge[] = [];
    const changes: string[] = [];
    for (const e of edges) {
      const enters = !inCycle.has(e.u) && inCycle.has(e.v);
      const u = inCycle.has(e.u) ? supernode : e.u;
      const v = inCycle.has(e.v) ? supernode : e.v;
      if (u === v) continue;
      const previous = enters ? incoming.get(e.v)! : undefined;
      const old = previous?.w ?? 0;
      reduced.push({ ...e, u, v, w: e.w - old });
      if (previous)
        changes.push(
          `${e.u}→${e.v}: ${e.w} − ${old} = ${e.w - old}   [in[${e.v}]: ${previous.u}→${previous.v}]`,
        );
    }
    if (outer) {
      const diagram = projectedGraph(
        graph,
        (id) => (inCycle.has(id) ? supernode : id),
        onePerDirection(reduced),
      );
      const names = new Map(diagram.nodes.map((v) => [v.id, v.label ?? v.id]));
      steps.push({
        diagram,
        title: words(
          "缩环，改进入边的权重",
          "Contract the cycle and reweight entering edges",
        ),
        detail: words(
          "外部进入 v 以后会顶替 v 先前选中的入边。图中同方向平行边只画最轻一条，所有进入代价列在下面。",
          "An external edge into v replaces its provisional incoming edge. The diagram shows the lightest edge among parallel arcs; all entering costs are listed.",
        ),
        active: edges
          .filter((e) => !inCycle.has(e.u) && inCycle.has(e.v))
          .map((e) => e.id),
        vertices: cycle,
        rows: [
          row(
            "进入环的额外代价",
            "Extra cost to enter the cycle",
            changes.join("\n"),
          ),
          row(
            "缩点图上的有向边",
            "Directed edges after contraction",
            diagram.edges
              .map((e) => `${names.get(e.u)} → ${names.get(e.v)} (${e.w})`)
              .join("\n"),
          ),
        ],
      });
    }
    const selected = solve(
      [...vertices.filter((v) => !inCycle.has(v)), supernode],
      reduced,
      false,
    );
    if (!selected) return null;
    const entry = selected.find((e) => e.v === supernode)!;
    const edgesById = new Map(edges.map((e) => [e.id, e]));
    const originalEntry = edgesById.get(entry.id)!;
    const result = selected.map((e) => edgesById.get(e.id)!);
    result.push(
      ...cycle
        .filter((v) => v !== originalEntry.v)
        .map((v) => incoming.get(v)!),
    );
    if (outer)
      steps.push({
        title: words(
          "展开，用进入边打断环",
          "Expand and break the cycle at the entry",
        ),
        detail: words(
          `用 ${originalEntry.u}→${originalEntry.v} 进入，撤下 ${incoming.get(originalEntry.v)!.u}→${originalEntry.v}；环上其余暂选边保留。`,
          `Enter through ${originalEntry.u}→${originalEntry.v}, remove ${incoming.get(originalEntry.v)!.u}→${originalEntry.v}, and retain the other provisional cycle edges.`,
        ),
        active: [originalEntry.id],
        rejected: [incoming.get(originalEntry.v)!.id],
        kept: result.map((e) => e.id),
        rows: selection(result),
      });
    return result;
  }
  const kept = solve(ids, graph.edges, true);
  steps.push({
    title: words(
      kept ? "最小有向生成树" : "没有以该点为根的生成树",
      kept ? "Minimum rooted arborescence" : "No arborescence rooted here",
    ),
    detail: words(
      kept
        ? `从根 ${root} 可达所有点，按原权重相加为 ${total(kept)}。`
        : `根 ${root} 到不了所有顶点。`,
      kept
        ? `Every vertex is reachable from ${root}. Original weights add to ${total(kept)}.`
        : `Some vertices are unreachable from ${root}.`,
    ),
    vertices: [root],
    kept: kept?.map((e) => e.id),
    rows: kept ? selection(kept) : [],
  });
  return { kept, steps };
}
