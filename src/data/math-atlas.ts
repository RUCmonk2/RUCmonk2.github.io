import type { KnowledgeAtlas } from "./knowledge-atlas";
import { getLearningItem } from "./learning/catalog";
import {
  mathMapDomains,
  mathMapEdges,
  mathMapNodes,
  mathMapPaths,
  mathMapSources,
} from "./math-map";

export const mathAtlas: KnowledgeAtlas = {
  ...getLearningItem("math-map"),
  defaultNode: "gradient",
  nodes: mathMapNodes,
  edges: mathMapEdges,
  domains: mathMapDomains,
  sources: mathMapSources,
  paths: mathMapPaths,
  legend: [
    { tone: "analysis", label: { zh: "分析与变化", en: "Analysis & change" } },
    {
      tone: "linear-algebra",
      label: { zh: "空间与对称", en: "Space & symmetry" },
    },
    {
      tone: "matrix-calculus",
      label: { zh: "矩阵与学习", en: "Matrices & learning" },
    },
  ],
};
