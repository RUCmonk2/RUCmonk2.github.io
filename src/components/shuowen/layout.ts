import {
  forceCollide,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";

import type { CharacterEntry } from "@/data/shuowen/types";

export const MAP_WIDTH = 1080;
export const MAP_HEIGHT = 820;
export const clusterCenters = [
  { x: 190, y: 153 },
  { x: 540, y: 153 },
  { x: 890, y: 153 },
  { x: 190, y: 421 },
  { x: 540, y: 421 },
  { x: 890, y: 421 },
  { x: 190, y: 655 },
  { x: 540, y: 655 },
  { x: 890, y: 655 },
];
const groups = [
  "dao",
  "nature",
  "stillness",
  "return",
  "mind",
  "action",
  "living",
  "zhuangzi",
  "name",
];
export type Position = { x: number; y: number };
interface LayoutNode extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
}
export function boundPosition(point: Position): Position {
  return {
    x: Math.max(35, Math.min(MAP_WIDTH - 35, point.x)),
    y: Math.max(32, Math.min(MAP_HEIGHT - 58, point.y)),
  };
}

export function createCharacterLayout(entries: CharacterEntry[]) {
  const nodes: LayoutNode[] = entries.map((entry) => {
    const siblings = entries.filter((item) => item.theme === entry.theme);
    const index = siblings.findIndex((item) => item.id === entry.id);
    const center = clusterCenters[groups.indexOf(entry.theme)];
    const angle = (index / siblings.length) * Math.PI * 2 - Math.PI / 2;
    const radius = siblings.length === 3 ? 73 : 104;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;
    return { id: entry.id, x, y, homeX: x, homeY: y };
  });
  const simulation = forceSimulation(nodes)
    .stop()
    .alphaDecay(0.065)
    .velocityDecay(0.5)
    .force("collision", forceCollide(35).iterations(3))
    .force("repel", forceManyBody().strength(-50).distanceMax(160))
    .force("x", forceX<LayoutNode>((node) => node.homeX).strength(0.18))
    .force("y", forceY<LayoutNode>((node) => node.homeY).strength(0.18));
  simulation.tick(150);
  const snapshot = () =>
    Object.fromEntries(nodes.map((node) => [node.id, boundPosition(node)]));
  const initial = snapshot();
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return {
    initial,
    byId,
    simulation,
    snapshot,
    reset: () => {
      simulation.stop();
      for (const node of nodes) {
        Object.assign(node, initial[node.id], {
          vx: 0,
          vy: 0,
          fx: null,
          fy: null,
        });
      }
      return snapshot();
    },
  };
}
