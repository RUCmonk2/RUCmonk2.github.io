import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";

import type { ShanhaiEdge, ShanhaiNode } from "@/data/shanhai";

export interface ShanhaiPosition {
  x: number;
  y: number;
}

interface LayoutNode extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  radius: number;
}

export type ShanhaiPositions = Record<string, ShanhaiPosition>;

export function constrainShanhaiPosition(position: ShanhaiPosition) {
  return {
    x: Math.max(60, Math.min(1040, position.x)),
    y: Math.max(60, Math.min(650, position.y)),
  };
}

/** A stopped, deterministic force layout; source entries and edges stay immutable. */
export function createShanhaiPhysics(
  entries: ShanhaiNode[],
  edges: ShanhaiEdge[],
) {
  const nodes: LayoutNode[] = entries.map((entry) => ({
    id: entry.id,
    x: entry.x,
    y: entry.y,
    homeX: entry.x,
    homeY: entry.y,
    // Include the text below the dot, rather than colliding only the tiny dots.
    radius: Math.max(45, entry.name.length * 10 + 8),
  }));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const links = edges.map((edge) => ({
    ...edge,
    comparison: edge.label.includes("对读") || edge.label.includes("同名"),
    distance: Math.max(
      105,
      Math.min(
        180,
        Math.hypot(
          byId.get(edge.source)!.x - byId.get(edge.target)!.x,
          byId.get(edge.source)!.y - byId.get(edge.target)!.y,
        ) * 0.85,
      ),
    ),
  }));
  let seed = 0x5a17;
  const simulation = forceSimulation(nodes)
    .stop()
    .randomSource(() => {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      return seed / 4294967296;
    })
    .alphaDecay(0.055)
    .alphaMin(0.008)
    .velocityDecay(0.45)
    .force(
      "links",
      forceLink<LayoutNode, (typeof links)[number]>(links)
        .id((node) => node.id)
        .distance((link) => link.distance)
        .strength((link) => (link.comparison ? 0.025 : 0.1)),
    )
    .force(
      "repulsion",
      forceManyBody<LayoutNode>().strength(-165).distanceMax(260),
    )
    .force(
      "collision",
      forceCollide<LayoutNode>((node) => node.radius).iterations(3),
    )
    // Original editorial clusters remain anchors, not geographical coordinates.
    .force("home-x", forceX<LayoutNode>((node) => node.homeX).strength(0.075))
    .force("home-y", forceY<LayoutNode>((node) => node.homeY).strength(0.09))
    .force("bounds", () => {
      for (const node of nodes) {
        const bounded = constrainShanhaiPosition(node);
        node.x = bounded.x;
        node.y = bounded.y;
        const next = constrainShanhaiPosition({
          x: node.x + (node.vx || 0),
          y: node.y + (node.vy || 0),
        });
        node.vx = next.x - node.x;
        node.vy = next.y - node.y;
      }
    });

  function snapshot(): ShanhaiPositions {
    return Object.fromEntries(
      nodes.map((node) => [node.id, constrainShanhaiPosition(node)]),
    );
  }

  function settle() {
    simulation.stop().alphaTarget(0).alpha(0.8).tick(160);
    return snapshot();
  }

  const initial = settle();

  function reset() {
    simulation.stop().alphaTarget(0);
    for (const node of nodes) {
      node.x = initial[node.id].x;
      node.y = initial[node.id].y;
      node.vx = 0;
      node.vy = 0;
      node.fx = null;
      node.fy = null;
    }
    return snapshot();
  }

  return { simulation, byId, snapshot, settle, reset, initial };
}
