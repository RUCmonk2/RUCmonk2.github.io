import type { Localized } from "./learning/types";

export type AtlasNode = {
  id: string;
  domain: string;
  label: Localized;
  shortLabel?: Localized;
  blurb: Localized;
  formula: string;
  preview?: Localized;
  nature?: Localized;
  code?: string;
  insight: Localized;
  example?: string;
  href?: string;
  hrefLabel?: Localized;
  sources?: string[];
  inlineLesson?: {
    beginner: string;
    formal: string;
    intro: { beginner: Localized; formal: Localized };
  };
  badges?: Localized[];
  mapImportance?: number;
  lesson?: { namespace: string; id: string; locale?: "zh" | "en" };
};
export type AtlasEdge = {
  source: string;
  target: string;
  kind: "prereq" | "related";
  relation?: "definition" | "deduction" | "condition" | "analogy";
  label?: Localized;
  explanation?: Localized;
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
  readingGuide?: { beginner: Localized; formal: Localized };
  lessonKicker?: Localized;
  readingModeLabels?: { beginner: Localized; formal: Localized };
  readingModeStorageKey?: string;
  screenSpaceLabels?: boolean;
  relationGuide?: Localized;
  relationHeadings?: Record<"before" | "after" | "related", Localized>;
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
