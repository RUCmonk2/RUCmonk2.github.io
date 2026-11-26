import {
  classicGraph,
  type Edge,
  type Graph,
  kargerKleinTarjan,
  kruskal,
  samplingGraph,
} from "@/lib/math-lab/graph-algorithms";

const cheapest = new Set(
  [...classicGraph.edges]
    .sort((a, b) => a.w - b.w)
    .slice(0, classicGraph.nodes.length - 1)
    .map((edge) => edge.id),
);
const resultIds = new Set(kruskal(classicGraph).kept.map((edge) => edge.id));
const exchangeExample: Graph = {
  nodes: [
    { id: "A", x: 95, y: 119 },
    { id: "B", x: 283, y: 48 },
    { id: "C", x: 283, y: 187 },
  ],
  edges: classicGraph.edges.filter((edge) =>
    ["AB", "AC", "BC"].includes(edge.id),
  ),
};
const witness = kargerKleinTarjan(samplingGraph, 1).steps.find(
  (step) => step.diagram && step.active?.includes("CI"),
);
if (!witness?.diagram) throw new Error("Missing the KKT seed 1 witness");
const sampleForest = new Set(witness.sampled);
const rejectedEdges = new Set(witness.rejected);
const positions = [
  { id: "P", x: 80, y: 174 },
  { id: "Q", x: 240, y: 57 },
  { id: "R", x: 400, y: 174 },
];
const supervertices = new Map(
  witness.diagram.nodes.map((node, index) => [node.id, positions[index].id]),
);
const contractedExample: Graph = {
  nodes: positions,
  edges: witness.diagram.edges.map((e) => ({
    ...e,
    u: supervertices.get(e.u)!,
    v: supervertices.get(e.v)!,
  })),
};

const samplingLabelShifts: Partial<Record<string, readonly [number, number]>> =
  {
    AB: [-17, 0],
    CD: [-17, 0],
    EF: [17, 0],
    GH: [-17, 0],
    IJ: [-17, 0],
    KL: [17, 0],
    AF: [20, 19],
    HK: [-10, 9],
  };

const graphNotes = {
  classic: "图 1 · 六点输入。金线标出全局最轻的五条边，F 仍然孤立。",
  exchange:
    "图 2 · 淡绿框圈出割的一侧。加绿边 AC、删朱砂虚线 AB 后，A 仍经原边 BC 连回 B。",
  tree: "图 3 · 换边后得到的五条绿边，总权重 17。下面用三种算法分别计算这组边。",
  sampling: "图 4 · KKT 的 12 点输入。两轮缩点先锁定权重 1 到 9 的九条边。",
  sampled:
    "图 5 · 种子 1。金色实线是样本森林的两条边，朱砂虚线是被证据排除的 CI。",
} as const;

export function MstHandoutFigure({ name }: { name: string }) {
  if (!Object.hasOwn(graphNotes, name))
    throw new Error(`Unknown MST figure: ${name}`);
  const figure = name as keyof typeof graphNotes;
  const sampled = figure === "sampled";
  const exchange = figure === "exchange";
  const graph = sampled
    ? contractedExample
    : figure === "sampling"
      ? samplingGraph
      : exchange
        ? exchangeExample
        : classicGraph;
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  const tone = (edge: Edge) => {
    if (sampled) {
      if (rejectedEdges.has(edge.id)) return "rejected";
      return sampleForest.has(edge.id) ? "sampled" : "input";
    }
    if (figure === "classic")
      return cheapest.has(edge.id) ? "proposed" : "quiet";
    if (exchange) {
      if (edge.id === "AB") return "rejected";
      if (edge.id === "AC") return "kept";
    }
    if (figure === "tree") return resultIds.has(edge.id) ? "kept" : "quiet";
    return "input";
  };
  const stateLabel = {
    kept: "，已选",
    rejected: "，删除",
    sampled: "，在样本森林中",
    proposed: "，试选",
    quiet: "",
    input: "",
  };
  const edgeXy = (edge: Edge) => {
    const u = nodes.get(edge.u)!;
    const v = nodes.get(edge.v)!;
    const [dx, dy] =
      figure === "sampling" ? (samplingLabelShifts[edge.id] ?? [0, 0]) : [0, 0];
    return [(u.x + v.x) / 2 + dx, (u.y + v.y) / 2 + dy] as const;
  };
  const diagram = (
    <svg
      viewBox={
        sampled ? "0 24 480 184" : exchange ? "0 12 380 200" : "0 15 480 213"
      }
      role="img"
      aria-label={graph.edges
        .map((e) => `${e.u} 到 ${e.v}，权重 ${e.w}${stateLabel[tone(e)]}`)
        .join("；")}
    >
      {exchange && (
        <>
          <rect
            className="mst-cut-region"
            x="33"
            y="25"
            width="128"
            height="171"
            rx="9"
          />
          <text x="97" y="52" textAnchor="middle">
            U = &#123;A&#125;
          </text>
        </>
      )}
      {graph.edges.map((edge) => {
        const u = nodes.get(edge.u)!;
        const v = nodes.get(edge.v)!;
        return (
          <line
            key={edge.id}
            x1={u.x}
            y1={u.y}
            x2={v.x}
            y2={v.y}
            data-tone={tone(edge)}
          />
        );
      })}
      {graph.edges.map((edge) => {
        const [x, y] = edgeXy(edge);
        return (
          <text
            key={edge.id}
            x={x}
            y={y}
            data-tone={tone(edge)}
            className="mst-edge-weight"
            dominantBaseline="central"
            textAnchor="middle"
          >
            {sampled ? `${edge.id} (${edge.w})` : edge.w}
          </text>
        );
      })}
      {graph.nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
          <circle r="14" />
          <text dominantBaseline="central" textAnchor="middle">
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
  return (
    <figure className="mst-handout-graph" data-figure={figure}>
      {figure === "sampling" ? (
        <div
          className="mst-graph-viewport"
          tabIndex={0}
          role="region"
          aria-label="12 点原图，可左右滑动"
        >
          {diagram}
        </div>
      ) : (
        diagram
      )}
      <figcaption>{graphNotes[figure]}</figcaption>
    </figure>
  );
}
