import type { AtlasEdge, AtlasNode } from "@/data/knowledge-atlas";

export type AtlasRelationGroups = {
  before: AtlasNode[];
  after: AtlasNode[];
  related: AtlasNode[];
};

/** Prerequisite arrows run from a foundation to the concept that builds on it. */
export function atlasRelationsFor(
  id: string,
  nodes: readonly AtlasNode[],
  edges: readonly AtlasEdge[],
): AtlasRelationGroups {
  const groups: AtlasRelationGroups = { before: [], after: [], related: [] };
  const byId = new Map(nodes.map((node) => [node.id, node]));
  if (!byId.has(id)) return groups;

  for (const edge of edges) {
    if (edge.source !== id && edge.target !== id) continue;
    const neighborId = edge.source === id ? edge.target : edge.source;
    const neighbor = byId.get(neighborId);
    if (!neighbor || neighborId === id) continue;

    // Related edges have no study direction, regardless of their stored order.
    const kind =
      edge.kind === "related"
        ? "related"
        : edge.target === id
          ? "before"
          : "after";
    groups[kind].push(neighbor);
  }
  return groups;
}
