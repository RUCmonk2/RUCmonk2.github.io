import type { Localized } from "./learning/types";

export type AtlasNode = {
  id: string;
  domain: string;
  label: Localized;
  shortLabel?: Localized;
  blurb: Localized;
  formula: string;
  code?: string;
  insight: Localized;
  example?: string;
  href?: string;
  hrefLabel?: Localized;
  sources?: string[];
  lesson?: { namespace: string; id: string; locale?: "zh" | "en" };
};
export type AtlasEdge = {
  source: string;
  target: string;
  kind: "prereq" | "related";
};
export type AtlasDomain = {
  id: string;
  label: Localized;
  symbol: string;
  sources: string[];
  tone?: "analysis" | "linear-algebra" | "matrix-calculus";
};
export type KnowledgeAtlas = {
  id: string;
  title: Localized;
  description: Localized;
  href: string;
  courseHref?: string;
  updated: string;
  defaultNode: string;
  nodes: readonly AtlasNode[];
  edges: readonly AtlasEdge[];
  domains: readonly AtlasDomain[];
  centers?: Readonly<Record<string, { x: number; y: number }>>;
  sources: readonly { id: string; title: string; href: string }[];
  paths: readonly {
    id: string;
    label: Localized;
    description: Localized;
    nodes: string[];
  }[];
  legend: readonly { tone: string; label: Localized }[];
};
