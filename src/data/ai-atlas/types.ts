export type AIDomainId =
  | "mathematics"
  | "probability"
  | "optimization"
  | "computing"
  | "machine-learning"
  | "deep-learning"
  | "probabilistic-causal"
  | "reasoning"
  | "language"
  | "vision"
  | "reinforcement"
  | "systems"
  | "research"
  | "responsibility";
export type AILevel = "foundation" | "core" | "research";
export type AINode = {
  id: string;
  domain: AIDomainId;
  title: { zh: string; en: string };
  level: AILevel;
  scope: "shared" | "specialist";
  summary: string;
  why: string;
  mastery: [string, string];
  example: string;
  pitfall: string;
  prerequisites: string[];
  related?: string[];
  formula?: string;
  sources: { title: string; url: string }[];
};
export type AIDomain = {
  id: AIDomainId;
  title: { zh: string; en: string };
  symbol: string;
  description: string;
  color: string;
  center: { x: number; y: number };
};
export type AIRoute = {
  id: string;
  title: { zh: string; en: string };
  description: string;
  nodes: string[];
};
