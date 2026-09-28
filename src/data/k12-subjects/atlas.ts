import type { KnowledgeAtlas } from "../knowledge-atlas";
import rawManifest from "./atlas-manifest.json";
import {
  curriculumSources,
  type SchoolStage,
  schoolStages,
  schoolSubjects,
  subjectAtlasHref,
  subjectHref,
  subjectUpdated,
} from "./index";

export type SubjectConcept = {
  id: string;
  title: string;
  module: string;
  blurb: string;
  prompt: string;
};
export type SubjectAtlasRecord = {
  subject: string;
  stage: SchoolStage;
  nodes: SubjectConcept[];
  edges: { source: string; target: string; kind: "prereq" | "related" }[];
};
export const subjectAtlasRecords = rawManifest as SubjectAtlasRecord[];
export function getSubjectAtlas(
  subject: string,
  stage: SchoolStage,
): KnowledgeAtlas {
  const record = subjectAtlasRecords.find(
    (a) => a.subject === subject && a.stage === stage,
  );
  const meta = schoolSubjects.find((s) => s.id === subject);
  const section = meta?.stages.find((s) => s.id === stage);
  if (!record || !meta || !section)
    throw new Error(`Unknown subject atlas: ${subject}/${stage}`);
  const stageName = schoolStages.find((s) => s.id === stage)!.title;
  const tones = ["analysis", "linear-algebra", "matrix-calculus"] as const;
  const centers = [
    { x: 260, y: 250 },
    { x: 730, y: 210 },
    { x: 320, y: 630 },
    { x: 790, y: 610 },
  ];
  const sources = curriculumSources.map((s, i) => ({
    id: i === 0 ? "compulsory" : "high-school",
    ...s,
  }));
  return {
    id: `school-${subject}-${stage}`,
    title: {
      zh: `${stageName}${meta.title}知识网`,
      en: `${meta.en} · ${stage} knowledge map`,
    },
    description: { zh: section.goal, en: section.goal },
    href: subjectAtlasHref(subject, stage),
    courseHref: subjectHref(subject),
    updated: subjectUpdated,
    defaultNode: record.nodes[0].id,
    lessonKicker: {
      zh: "理解 · 例证 · 练习",
      en: "UNDERSTAND · EXAMPLES · PRACTISE",
    },
    readingGuide: {
      beginner: {
        zh: "从具体情境理解概念，跟着例子尝试，再用问题检查。",
        en: "Understand the idea through a concrete example, then try the practice question.",
      },
      formal: {
        zh: "核对概念的定义、适用条件、判断依据与知识联系。",
        en: "Check definitions, conditions, evidence and connections.",
      },
    },
    nodes: record.nodes.map((node) => ({
      id: node.id,
      domain: node.module,
      label: { zh: node.title, en: node.title },
      blurb: { zh: node.blurb, en: node.blurb },
      insight: { zh: node.blurb, en: node.blurb },
      formula: "",
      preview: { zh: `想一想：${node.prompt}`, en: `想一想：${node.prompt}` },
      href: `${subjectHref(subject)}#${stage}-${node.module}`,
      hrefLabel: {
        zh: "回到模块任务与学习路线",
        en: "Open the module and learning route",
      },
      lesson: {
        namespace: `school-lessons/${subject}`,
        id: node.id,
        locale: "zh",
      },
      sources: [stage === "high" ? "high-school" : "compulsory"],
    })),
    edges: record.edges,
    domains: section.modules.map((module, i) => ({
      id: module.id,
      label: { zh: module.title, en: module.title },
      symbol: "",
      tone: tones[i % 3],
      sources: [],
    })),
    centers: Object.fromEntries(
      section.modules.map((module, i) => [module.id, centers[i]]),
    ),
    sources,
    paths: section.modules.map((module) => ({
      id: module.id,
      label: { zh: module.title, en: module.title },
      description: { zh: module.task, en: module.task },
      nodes: record.nodes
        .filter((n) => n.module === module.id)
        .map((n) => n.id),
    })),
    legend: tones.flatMap((tone, i) => {
      const names = section.modules
        .filter((_, j) => j % 3 === i)
        .map((m) => m.title);
      return names.length
        ? [{ tone, label: { zh: names.join(" / "), en: names.join(" / ") } }]
        : [];
    }),
  };
}
export const subjectAtlases = subjectAtlasRecords.map((record) =>
  getSubjectAtlas(record.subject, record.stage),
);
