import mcq from "./mcq.json";
import written from "./written.json";

export type MockPart = {
  label: string;
  points: number;
  question: string;
  answer: string;
  steps: string[];
  rubric: { points: number; criterion: string }[];
};
export type MockQuestion = {
  id: number;
  type: "single" | "multiple" | "experiment" | "written";
  points: number;
  title: string;
  topic: string;
  prompt: string;
  options?: Record<string, string>;
  table?: { headers: string[]; rows: string[][] };
  answer?: string;
  parts?: MockPart[];
  analysis: string[];
  pitfall: string;
  diagram: string;
  diagram_spec: string;
  difficulty: string;
};
export const mockExamHref = "/learning/k12/subjects/physics/midterm/mock-exam";
export const mockExamUpdated = "2026-10-30";
export const mockQuestions = [
  ...mcq.questions,
  ...written.questions,
] as MockQuestion[];
export const mockSections = [
  {
    id: "single-choice",
    type: "single",
    title: "单项选择题",
    range: "01—12",
    points: 36,
    instruction: "共 12 题，每题 3 分。每题只有一个选项符合题意。",
  },
  {
    id: "multiple-choice",
    type: "multiple",
    title: "多项选择题",
    range: "13—16",
    points: 16,
    instruction:
      "共 4 题，每题 4 分。全部选对得 4 分，漏选且无错选得 2 分，含错选或未选得 0 分。",
  },
  {
    id: "experiment",
    type: "experiment",
    title: "实验题",
    range: "17",
    points: 12,
    instruction: "请在纸上作答，保留数据处理、实验依据与必要计算。",
  },
  {
    id: "written",
    type: "written",
    title: "计算与论证题",
    range: "18—20",
    points: 36,
    instruction: "写出研究对象、物理关系和必要步骤；仅有最终答案不能代替过程。",
  },
] as const;
