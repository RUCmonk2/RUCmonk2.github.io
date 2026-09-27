import {
  type Force,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";

import {
  type MathMapDomainId,
  type MathMapEdge,
  mathMapLabel,
  type MathMapNode,
} from "../../data/math-map";

export const GRAPH_WIDTH = 1080;
export const GRAPH_HEIGHT = 860;
export type Point = { x: number; y: number };
export type Camera = Point & { zoom: number };
export type PositionedNode = Point & {
  id: string;
  width: number;
  radius: number;
  importance: number;
  landmark: boolean;
  domain: MathMapDomainId;
};
export type ForceNode = PositionedNode & SimulationNodeDatum;
type ForceLink = SimulationLinkDatum<ForceNode>;
export type GraphSimulation = Simulation<ForceNode, ForceLink>;
export type ForceSettings = {
  center: number;
  repel: number;
  link: number;
  distance: number;
};
export const DEFAULT_FORCES: ForceSettings = {
  center: 0.04,
  repel: 200,
  link: 0.12,
  distance: 100,
};

export function labelWidth(label: string) {
  return [...label].reduce(
    (width, char) => width + (char.codePointAt(0)! > 255 ? 16 : 8.5),
    24,
  );
}

// Soft subject attraction provides composition; these are not bounds or pins.
// Uneven spacing leaves open passages between related areas of the map.
const subjectCenters: Record<MathMapDomainId, Point> = {
  analysis: { x: 240, y: 170 },
  multivariable: { x: 560, y: 230 },
  nabla: { x: 855, y: 165 },
  "linear-algebra": { x: 230, y: 490 },
  "matrix-calculus": { x: 480, y: 670 },
  "ai-foundations": { x: 780, y: 495 },
  groups: { x: 935, y: 750 },
};

export function nodeTier(p: PositionedNode) {
  return p.landmark || p.importance >= 0.55
    ? "hub"
    : p.importance >= 0.3
      ? "branch"
      : "leaf";
}
export function nodeLabelSize(p: PositionedNode) {
  return nodeTier(p) === "hub" ? 23 : nodeTier(p) === "branch" ? 20 : 18;
}
export function labelBox(p: PositionedNode) {
  const width = (p.width * nodeLabelSize(p)) / 16;
  const y = p.y + p.radius + 19;
  return {
    left: p.x - width / 2,
    right: p.x + width / 2,
    top: y - 13,
    bottom: y + 13,
  };
}
// Semantic zoom chooses candidates; the active label wins any collision.
// This also protects Chinese labels during a live simulation or a drag.
export function visibleLabels(
  points: readonly PositionedNode[],
  candidates: ReadonlySet<string>,
  active: string | null,
) {
  const boxes: ReturnType<typeof labelBox>[] = [];
  const shown = new Set<string>();
  const ordered = points
    .filter((p) => candidates.has(p.id))
    .toSorted((a, b) =>
      a.id === active ? -1 : b.id === active ? 1 : b.importance - a.importance,
    );
  for (const p of ordered) {
    const box = labelBox(p);
    const overlapsLabel = boxes.some(
      (b) =>
        box.left < b.right + 10 &&
        box.right + 10 > b.left &&
        box.top < b.bottom + 9 &&
        box.bottom + 9 > b.top,
    );
    const overlapsNode = points.some(
      (other) =>
        other.id !== p.id &&
        box.left < other.x + other.radius + 4 &&
        box.right > other.x - other.radius - 4 &&
        box.top < other.y + other.radius + 4 &&
        box.bottom > other.y - other.radius - 4,
    );
    if (p.id === active || (!overlapsLabel && !overlapsNode)) {
      shown.add(p.id);
      boxes.push(box);
    }
  }
  return shown;
}

// Reserve label space for hubs; smaller satellites can form denser groups.
// Predicted positions include velocity so labels settle instead of oscillating.
function labelCollision(): Force<ForceNode, ForceLink> {
  let nodes: ForceNode[] = [];
  const force = () => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const dx = b.x + (b.vx ?? 0) - a.x - (a.vx ?? 0) || 0.01;
        const dy = b.y + (b.vy ?? 0) - a.y - (a.vy ?? 0) || 0.01;
        const aw =
          nodeTier(a) === "hub"
            ? (a.width * nodeLabelSize(a)) / 16
            : a.radius * 2 + 22;
        const bw =
          nodeTier(b) === "hub"
            ? (b.width * nodeLabelSize(b)) / 16
            : b.radius * 2 + 22;
        const overlapX = (aw + bw) / 2 + 14 - Math.abs(dx);
        const overlapY =
          (nodeTier(a) === "hub" || nodeTier(b) === "hub"
            ? 75
            : a.radius + b.radius + 30) - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;
        const aFree = a.fx == null,
          bFree = b.fx == null;
        const share = aFree && bFree ? 0.5 : 1;
        if (overlapY < overlapX) {
          const shift = Math.sign(dy) * overlapY * share * 0.85;
          if (aFree) a.vy = (a.vy ?? 0) - shift;
          if (bFree) b.vy = (b.vy ?? 0) + shift;
        } else {
          const shift = Math.sign(dx) * overlapX * share * 0.85;
          if (aFree) a.vx = (a.vx ?? 0) - shift;
          if (bFree) b.vx = (b.vx ?? 0) + shift;
        }
      }
    }
  };
  force.initialize = (next: ForceNode[]) => {
    nodes = next;
  };
  return force;
}

// Obsidian's documented force controls inspire these four parameters.
// This implementation uses D3, not Obsidian's private engine.
export function configureForces(
  simulation: GraphSimulation,
  edges: readonly MathMapEdge[],
  settings: ForceSettings,
) {
  simulation
    .force(
      "center-x",
      forceX<ForceNode>((p) => subjectCenters[p.domain].x).strength(
        settings.center,
      ),
    )
    .force(
      "center-y",
      forceY<ForceNode>((p) => subjectCenters[p.domain].y).strength(
        settings.center,
      ),
    )
    .force(
      "repel",
      forceManyBody<ForceNode>().strength(-settings.repel).distanceMin(25),
    )
    .force(
      "links",
      forceLink<ForceNode, ForceLink>(
        edges.map((e) => ({
          source: e.source,
          target: e.target,
        })),
      )
        .id((n) => n.id)
        .distance(
          (edge) =>
            settings.distance *
            ((edge.source as ForceNode).domain ===
            (edge.target as ForceNode).domain
              ? 1
              : 1.8),
        )
        .strength(
          (edge) =>
            settings.link *
            ((edge.source as ForceNode).domain ===
            (edge.target as ForceNode).domain
              ? 1
              : 0.16),
        ),
    )
    .force("labels", labelCollision());
  return simulation;
}

export function createGraphSimulation(
  points: readonly PositionedNode[],
  edges: readonly MathMapEdge[],
  settings: ForceSettings = DEFAULT_FORCES,
): GraphSimulation {
  // D3 mutates simulation nodes and links. Never pass shared content or React
  // state objects into it; render from a snapshot of its private copies.
  const simulation = forceSimulation<ForceNode>(points.map((p) => ({ ...p })))
    .stop()
    .velocityDecay(0.42)
    .alphaDecay(0.025);
  return configureForces(simulation, edges, settings);
}

export function snapshotSimulation(
  simulation: GraphSimulation,
): PositionedNode[] {
  return simulation
    .nodes()
    .map(({ id, x, y, width, radius, importance, domain, landmark }) => ({
      id,
      x,
      y,
      width,
      radius,
      importance,
      domain,
      landmark,
    }));
}

export function layoutGraph(
  nodes: readonly MathMapNode[],
  edges: readonly MathMapEdge[],
  locale: "zh" | "en",
): PositionedNode[] {
  const degrees = new Map(nodes.map((node) => [node.id, 0]));
  for (const edge of edges) {
    degrees.set(edge.source, (degrees.get(edge.source) ?? 0) + 1);
    degrees.set(edge.target, (degrees.get(edge.target) ?? 0) + 1);
  }
  const maxDegree = Math.max(...degrees.values(), 1);
  const subjectCounts = new Map<string, number>();
  const subjectDegrees = new Map<string, number>();
  for (const node of nodes)
    subjectDegrees.set(
      node.domain,
      Math.max(subjectDegrees.get(node.domain) ?? 0, degrees.get(node.id) ?? 0),
    );
  const points = nodes.map((node) => {
    const index = subjectCounts.get(node.domain) ?? 0;
    subjectCounts.set(node.domain, index + 1);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const distance = 36 * Math.sqrt(index + 0.5);
    const importance = (degrees.get(node.id) ?? 0) / maxDegree;
    const center = subjectCenters[node.domain];
    return {
      id: node.id,
      domain: node.domain,
      width: labelWidth(mathMapLabel(node, locale)),
      radius: 3 + 19 * importance ** 1.75,
      importance,
      landmark: degrees.get(node.id) === subjectDegrees.get(node.domain),
      x: center.x + Math.cos(angle) * distance,
      y: center.y + Math.sin(angle) * distance,
    };
  });
  const simulation = createGraphSimulation(points, edges);
  simulation.tick(500);
  return snapshotSimulation(simulation);
}

export function fitCamera(points: readonly PositionedNode[]): Camera {
  if (!points.length) return { x: 0, y: 0, zoom: 1 };
  const left = Math.min(...points.map((p) => p.x - p.width / 2)) - 95;
  const right = Math.max(...points.map((p) => p.x + p.width / 2)) + 95;
  const top = Math.min(...points.map((p) => p.y)) - 100;
  const bottom = Math.max(...points.map((p) => p.y)) + 115;
  const zoom = Math.min(
    1.9,
    GRAPH_WIDTH / (right - left),
    GRAPH_HEIGHT / (bottom - top),
  );
  return {
    zoom,
    x: (GRAPH_WIDTH - (right + left) * zoom) / 2,
    y: (GRAPH_HEIGHT - (bottom + top) * zoom) / 2,
  };
}
