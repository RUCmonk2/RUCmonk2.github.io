import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";

import type { Mathematician, ScholarRelation } from "@/data/mathematicians";
import type { ScholarVisuals } from "@/data/scientist-atlas";
export type Point = { x: number; y: number };
export type Camera = Point & { zoom: number };
export const GRAPH_WIDTH = 1360,
  GRAPH_HEIGHT = 1100,
  MIN_ZOOM = 0.25,
  MAX_ZOOM = 4;
// Editorial visual accents, not a numerical ranking of mathematical worth.
const landmarks = new Set([
  "euclid",
  "archimedes",
  "newton",
  "leibniz",
  "euler",
  "gauss",
  "riemann",
  "galois",
  "hilbert",
  "noether",
  "turing",
]);
const accents = new Set([
  "descartes",
  "fermat",
  "pascal",
  "lagrange",
  "cauchy",
  "poincare",
  "cantor",
  "godel",
  "ramanujan",
  "chern",
  "grothendieck",
  "kolmogorov",
  "mirzakhani",
  "liu-hui",
]);
export function portraitTier(id: string, visual?: ScholarVisuals) {
  if (visual)
    return visual.landmarks.includes(id)
      ? 3
      : visual.accents.includes(id)
        ? 2
        : 1;
  return landmarks.has(id) ? 3 : accents.has(id) ? 2 : 1;
}
export function portraitRadius(id: string, visual?: ScholarVisuals) {
  return portraitTier(id, visual) === 3
    ? 43
    : portraitTier(id, visual) === 2
      ? 36
      : 31;
}
export function labelSize(id: string, visual?: ScholarVisuals) {
  return portraitTier(id, visual) === 3
    ? 25
    : portraitTier(id, visual) === 2
      ? 22
      : 20;
}
export function nodeAppearance(
  id: string,
  scale: number,
  visual?: ScholarVisuals,
) {
  const safeScale = Math.max(0.05, scale),
    tier = portraitTier(id, visual);
  const minRadius = tier === 3 ? 25 : tier === 2 ? 22 : 19;
  const maxRadius = tier === 3 ? 35 : tier === 2 ? 31 : 27;
  const radiusPx = Math.max(
    minRadius,
    Math.min(maxRadius, portraitRadius(id, visual) * safeScale),
  );
  const fontPx = Math.max(
    13,
    Math.min(tier === 3 ? 18 : 16, labelSize(id, visual) * safeScale),
  );
  return {
    radius: radiusPx / safeScale,
    fontSize: fontPx / safeScale,
    radiusPx,
    fontPx,
    ring: 3 / safeScale,
    halo: 7 / safeScale,
    labelGap: 10 / safeScale,
  };
}
export const eras = [
  {
    id: "origins",
    zh: "古代与中世纪",
    en: "Before 1500",
    from: -Infinity,
    to: 1500,
  },
  { id: "early", zh: "微积分的时代", en: "1500–1749", from: 1500, to: 1750 },
  {
    id: "classical",
    zh: "十九世纪的转向",
    en: "1750–1849",
    from: 1750,
    to: 1850,
  },
  {
    id: "modern",
    zh: "走向现代数学",
    en: "From 1850",
    from: 1850,
    to: Infinity,
  },
] as const;
export function eraOf(p: Mathematician) {
  return eras.find((e) => p.born >= e.from && p.born < e.to)!.id;
}
export function yearLabel(y: number, l: "zh" | "en") {
  return y < 0 ? (l === "en" ? `${-y} BCE` : `公元前${-y}`) : String(y);
}
export function lifeLabel(p: Mathematician, l: "zh" | "en") {
  return (
    p.lifeDates?.[l] ??
    (p.died === null
      ? l === "en"
        ? `Born ${p.born}`
        : `${p.born}年生`
      : `${yearLabel(p.born, l)} — ${yearLabel(p.died, l)}`)
  );
}
const clusters = [
  {
    center: { x: 235, y: 200 },
    ids: [
      "euclid",
      "archimedes",
      "liu-hui",
      "zu-chongzhi",
      "aryabhata",
      "brahmagupta",
      "al-khwarizmi",
      "fibonacci",
    ],
  },
  {
    center: { x: 700, y: 190 },
    ids: [
      "descartes",
      "fermat",
      "newton",
      "leibniz",
      "jacob-bernoulli",
      "johann-bernoulli",
      "euler",
      "lagrange",
    ],
  },
  {
    center: { x: 1100, y: 420 },
    ids: [
      "cauchy",
      "fourier",
      "dirichlet",
      "riemann",
      "weierstrass",
      "kovalevskaya",
    ],
  },
  {
    center: { x: 665, y: 550 },
    ids: [
      "gauss",
      "abel",
      "galois",
      "dedekind",
      "jacobi",
      "germain",
      "hardy",
      "ramanujan",
      "erdos",
    ],
  },
  {
    center: { x: 1060, y: 880 },
    ids: [
      "klein",
      "hilbert",
      "noether",
      "poincare",
      "chern",
      "weil",
      "grothendieck",
      "mirzakhani",
    ],
  },
  {
    center: { x: 225, y: 555 },
    ids: ["pascal", "huygens", "laplace", "kolmogorov"],
  },
  {
    center: { x: 360, y: 920 },
    ids: [
      "cantor",
      "russell",
      "godel",
      "turing",
      "church",
      "von-neumann",
      "shannon",
    ],
  },
];
type LayoutNode = SimulationNodeDatum & Point & { id: string; anchor: Point };
export function layoutScholars(
  people: Mathematician[],
  relations: ScholarRelation[],
  visual?: ScholarVisuals,
) {
  const nodes: LayoutNode[] = people.map((p) => {
    const c = (visual?.groups ?? clusters).find((g) => g.ids.includes(p.id)),
      i = c?.ids.indexOf(p.id) ?? 0,
      anchor = c
        ? {
            x: 680 + (c.center.x - 680) * 1.45,
            y: 550 + (c.center.y - 550) * 1.45,
          }
        : { x: 680, y: 550 },
      a = i * 2.399963,
      s = Math.sqrt(i + 1) * 90;
    return {
      id: p.id,
      anchor,
      x: anchor.x + Math.cos(a) * s,
      y: anchor.y + Math.sin(a) * s,
    };
  });
  const links = relations.map((e) => ({ source: e.source, target: e.target }));
  const sim = forceSimulation(nodes)
    .stop()
    .force("x", forceX<LayoutNode>((n) => n.anchor.x).strength(0.045))
    .force("y", forceY<LayoutNode>((n) => n.anchor.y).strength(0.045))
    .force("charge", forceManyBody<LayoutNode>().strength(-900))
    .force(
      "links",
      forceLink<LayoutNode, (typeof links)[number]>(links)
        .id((n) => n.id)
        .distance(260)
        .strength(0.012),
    )
    .force(
      "collision",
      forceCollide<LayoutNode>((n) => portraitRadius(n.id, visual) + 75)
        .strength(1)
        .iterations(3),
    );
  sim.tick(350);
  sim.stop();
  const minX = Math.min(
      ...nodes.map((n) => n.x - portraitRadius(n.id, visual) - 20),
    ),
    maxX = Math.max(
      ...nodes.map((n) => n.x + portraitRadius(n.id, visual) + 20),
    ),
    minY = Math.min(
      ...nodes.map((n) => n.y - portraitRadius(n.id, visual) - 20),
    ),
    maxY = Math.max(
      ...nodes.map((n) => n.y + portraitRadius(n.id, visual) + 65),
    );
  const cx = (minX + maxX) / 2,
    cy = (minY + maxY) / 2;
  return Object.fromEntries(
    nodes.map((n) => [
      n.id,
      {
        x: n.x - cx + GRAPH_WIDTH / 2,
        y: n.y - cy + GRAPH_HEIGHT / 2,
      },
    ]),
  );
}
export function layoutSubgraph(
  people: Mathematician[],
  relations: ScholarRelation[],
) {
  const ids = new Set(people.map((p) => p.id));
  const nodes = people.map((p, i) => ({
    id: p.id,
    x: GRAPH_WIDTH / 2 + Math.cos(i * 2.399963) * Math.sqrt(i + 1) * 145,
    y: GRAPH_HEIGHT / 2 + Math.sin(i * 2.399963) * Math.sqrt(i + 1) * 145,
  }));
  const links = relations
    .filter((e) => ids.has(e.source) && ids.has(e.target))
    .map((e) => ({ source: e.source, target: e.target }));
  const sim = forceSimulation(nodes)
    .stop()
    .force("x", forceX(GRAPH_WIDTH / 2).strength(0.05))
    .force("y", forceY(GRAPH_HEIGHT / 2).strength(0.05))
    .force("charge", forceManyBody().strength(-1500))
    .force(
      "links",
      forceLink<(typeof nodes)[number], (typeof links)[number]>(links)
        .id((n) => n.id)
        .distance(320)
        .strength(0.018),
    )
    .force("collision", forceCollide(145).iterations(4));
  sim.tick(350);
  sim.stop();
  return Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
}
export function fitPeople(
  people: Mathematician[],
  positions: Record<string, Point>,
  viewportWidth = 800,
): Camera {
  if (!people.length) return { x: 0, y: 0, zoom: 1 };
  const minX = Math.min(...people.map((p) => positions[p.id].x)),
    maxX = Math.max(...people.map((p) => positions[p.id].x));
  const minY = Math.min(...people.map((p) => positions[p.id].y)),
    maxY = Math.max(...people.map((p) => positions[p.id].y));
  const availableWidth = Math.max(140, viewportWidth - 140),
    availableHeight = Math.max(
      160,
      (viewportWidth * GRAPH_HEIGHT) / GRAPH_WIDTH - 175,
    );
  const scale = Math.min(
    availableWidth / Math.max(120, maxX - minX),
    availableHeight / Math.max(150, maxY - minY),
  );
  const zoom = Math.max(
    MIN_ZOOM,
    Math.min(2.2, (scale * GRAPH_WIDTH) / viewportWidth),
  );
  return {
    x: (minX + maxX) / 2 - GRAPH_WIDTH / 2,
    y:
      (minY + maxY) / 2 -
      GRAPH_HEIGHT / 2 +
      12 / ((viewportWidth / GRAPH_WIDTH) * zoom),
    zoom,
  };
}
export function labelsFor(
  people: Mathematician[],
  positions: Record<string, Point>,
  candidates: Set<string>,
  priority: string,
  locale: "zh" | "en",
  maxLabelSize = Infinity,
  screenScale?: number,
  visual?: ScholarVisuals,
) {
  type Placement = {
    dx: number;
    dy: number;
    anchor: "middle" | "start" | "end";
  };
  const boxes: { left: number; right: number; top: number; bottom: number }[] =
    [];
  const shown = new Map<string, Placement>();
  for (const person of [...people].sort((a, b) =>
    a.id === priority
      ? -1
      : b.id === priority
        ? 1
        : portraitTier(b.id, visual) - portraitTier(a.id, visual),
  )) {
    if (!candidates.has(person.id)) continue;
    const point = positions[person.id],
      appearance = screenScale
        ? nodeAppearance(person.id, screenScale, visual)
        : null,
      size =
        appearance?.fontSize ??
        Math.min(labelSize(person.id, visual), maxLabelSize),
      radius = appearance?.radius ?? portraitRadius(person.id, visual),
      gap = appearance?.labelGap ?? 12,
      clearance = screenScale ? 9 / screenScale : 7;
    const width = [...person.name[locale]].reduce(
      (sum, c) => sum + (c.codePointAt(0)! > 255 ? size : size * 0.56),
      12,
    );
    const alternatives: Placement[] = [
      { dx: 0, dy: radius + gap + size * 0.9, anchor: "middle" },
      { dx: 0, dy: -radius - gap - size * 0.25, anchor: "middle" },
      { dx: radius + gap, dy: size * 0.3, anchor: "start" },
      { dx: -radius - gap, dy: size * 0.3, anchor: "end" },
    ];
    for (const placement of alternatives) {
      const x = point.x + placement.dx,
        y = point.y + placement.dy;
      const left =
        placement.anchor === "start"
          ? x
          : placement.anchor === "end"
            ? x - width
            : x - width / 2;
      const box = {
        left,
        right: left + width,
        top: y - size * 0.9,
        bottom: y + size * 0.25,
      };
      const overlap =
        boxes.some(
          (b) =>
            box.left < b.right + clearance &&
            box.right + clearance > b.left &&
            box.top < b.bottom + clearance &&
            box.bottom + clearance > b.top,
        ) ||
        people.some((other) => {
          if (other.id === person.id) return false;
          const q = positions[other.id],
            r =
              (screenScale
                ? nodeAppearance(other.id, screenScale, visual).radius
                : portraitRadius(other.id, visual)) + clearance;
          return (
            box.left < q.x + r &&
            box.right > q.x - r &&
            box.top < q.y + r &&
            box.bottom > q.y - r
          );
        });
      if (!overlap) {
        shown.set(person.id, placement);
        boxes.push(box);
        break;
      }
    }
    if (!shown.has(person.id) && person.id === priority)
      shown.set(person.id, alternatives[0]);
  }
  return shown;
}

// Edge endpoints follow the portrait sizes; bends only avoid other portraits.
export function relationCurve(
  a: Point,
  b: Point,
  obstacles: (Point & { radius?: number })[],
  height = GRAPH_HEIGHT,
  sourceRadius = 43,
  targetRadius = 43,
) {
  void height;
  const length = Math.max(1, Math.hypot(b.x - a.x, b.y - a.y)),
    nx = -(b.y - a.y) / length,
    ny = (b.x - a.x) / length;
  let best = { bend: 0, score: Infinity };
  for (const bend of [0, 80, -80, 160, -160, 240, -240]) {
    const c = {
      x: (a.x + b.x) / 2 + nx * bend,
      y: (a.y + b.y) / 2 + ny * bend,
    };
    let score = Math.abs(bend) * 0.2;
    for (let i = 2; i < 19; i++) {
      const t = i / 20,
        x = (1 - t) ** 2 * a.x + 2 * (1 - t) * t * c.x + t * t * b.x,
        y = (1 - t) ** 2 * a.y + 2 * (1 - t) * t * c.y + t * t * b.y;

      for (const p of obstacles)
        score +=
          Math.max(0, (p.radius ?? 43) + 25 - Math.hypot(x - p.x, y - p.y)) **
          2;
    }
    if (score < best.score) best = { bend, score };
  }
  const c = {
      x: (a.x + b.x) / 2 + nx * best.bend,
      y: (a.y + b.y) / 2 + ny * best.bend,
    },
    da = Math.max(1, Math.hypot(c.x - a.x, c.y - a.y)),
    db = Math.max(1, Math.hypot(c.x - b.x, c.y - b.y)),
    s = {
      x: a.x + ((c.x - a.x) / da) * (sourceRadius + 12),
      y: a.y + ((c.y - a.y) / da) * (sourceRadius + 12),
    },
    e = {
      x: b.x + ((c.x - b.x) / db) * (targetRadius + 12),
      y: b.y + ((c.y - b.y) / db) * (targetRadius + 12),
    };
  return {
    control: c,
    path: `M${s.x} ${s.y}Q${c.x} ${c.y} ${e.x} ${e.y}`,
    label: {
      x: (s.x + 2 * c.x + e.x) / 4 + nx * 12,
      y: (s.y + 2 * c.y + e.y) / 4 + ny * 12,
    },
  };
}

export function trimRelation(
  a: Point,
  b: Point,
  c: Point,
  sourceRadius: number,
  targetRadius: number,
  gap: number,
) {
  const da = Math.max(1, Math.hypot(c.x - a.x, c.y - a.y)),
    db = Math.max(1, Math.hypot(c.x - b.x, c.y - b.y));
  const s = {
      x: a.x + ((c.x - a.x) / da) * (sourceRadius + gap),
      y: a.y + ((c.y - a.y) / da) * (sourceRadius + gap),
    },
    e = {
      x: b.x + ((c.x - b.x) / db) * (targetRadius + gap),
      y: b.y + ((c.y - b.y) / db) * (targetRadius + gap),
    };
  return `M${s.x} ${s.y}Q${c.x} ${c.y} ${e.x} ${e.y}`;
}
