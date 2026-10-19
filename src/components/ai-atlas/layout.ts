import type { AINode } from "@/data/ai-atlas/types";
export type MapPoint = { id: string; x: number; y: number };
export function conceptLayout(nodes: readonly AINode[]): MapPoint[] {
  const ids = new Set(nodes.map((n) => n.id));
  const ranks = new Map<string, number>();
  function depth(id: string, visiting = new Set<string>()): number {
    if (ranks.has(id)) return ranks.get(id)!;
    if (visiting.has(id)) return 0;
    const next = new Set(visiting);
    next.add(id);
    const pre =
      nodes.find((n) => n.id === id)?.prerequisites.filter((p) => ids.has(p)) ??
      [];
    const rank = pre.length
      ? 1 + Math.max(...pre.map((p) => depth(p, next)))
      : 0;
    ranks.set(id, rank);
    return rank;
  }
  const sorted = [...nodes].sort(
    (a, b) => depth(a.id) - depth(b.id) || nodes.indexOf(a) - nodes.indexOf(b),
  );
  const cols = nodes.length <= 6 ? 2 : nodes.length <= 12 ? 3 : 4;
  return sorted.map((n, i) => ({
    id: n.id,
    x: 160 + (i % cols) * 300,
    y: 125 + Math.floor(i / cols) * 210,
  }));
}
export function wrapLabel(text: string, locale: "zh" | "en"): string[] {
  if (locale === "zh") {
    const lines: string[] = [];
    let line = "",
      width = 0;
    for (const token of text.match(/[A-Za-z0-9_-]+|./gu) ?? []) {
      const size = /^[A-Za-z0-9_-]+$/.test(token) ? token.length * 0.52 : 1;
      if (width + size > 9.5 && line) {
        lines.push(line);
        line = "";
        width = 0;
      }
      line += token;
      width += size;
    }
    if (line) lines.push(line);
    return lines;
  }
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).length > 23 && line) {
      lines.push(line);
      line = word;
    } else line += (line ? " " : "") + word;
  }
  if (line) lines.push(line);
  return lines;
}
export function connector(a: MapPoint, b: MapPoint, trim = 48) {
  if (trim === 0) {
    // Route through the empty gutters, never through another concept card.
    if (a.y === b.y) {
      const lane = a.y - 85;
      return `M${a.x},${a.y - 63} L${a.x},${lane} L${b.x},${lane} L${b.x},${b.y - 63}`;
    }
    const downward = b.y > a.y ? 1 : -1;
    const firstLane = a.y + downward * 105;
    const lastLane = b.y - downward * 105;
    const columnLane = b.x + (a.x <= b.x ? -150 : 150);
    return `M${a.x},${a.y + downward * 63} L${a.x},${firstLane} L${columnLane},${firstLane} L${columnLane},${lastLane} L${b.x},${lastLane} L${b.x},${b.y - downward * 63}`;
  }
  const dx = b.x - a.x,
    dy = b.y - a.y,
    d = Math.hypot(dx, dy) || 1;
  const sx = a.x + (dx / d) * trim,
    sy = a.y + (dy / d) * trim,
    tx = b.x - (dx / d) * trim,
    ty = b.y - (dy / d) * trim;
  const bend = d > 500 ? Math.min(220, d * 0.35) : Math.min(65, d * 0.12);
  return `M${sx},${sy} Q${(sx + tx) / 2 - (dy / d) * bend},${(sy + ty) / 2 + (dx / d) * bend} ${tx},${ty}`;
}
