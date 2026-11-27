import chapterTwoPages from "./chapter-two-pages.json";
import introductoryTitles from "./handout-titles.json";
import type { LessonId } from "./lessons";

export const handoutPath = "/learning/lean-lab/handout/";
export const handoutAssets = "/assets/lean-handout";
export const handoutTitles = [
  ...introductoryTitles,
  ...chapterTwoPages.map((p) => p.exercise + " · " + p.title),
];
export const chapterStart = introductoryTitles.length + 1;
export function chapterPage(page: number) {
  return chapterTwoPages[page - chapterStart];
}

export const lessonPage: Record<LessonId, number> = {
  propositions: 3,
  rewrite: 5,
  induction: 6,
  sum: 8,
  "insertion-order": 10,
  "insertion-spec": 11,
  descending: 15,
  search: 16,
};

export function lessonForPage(page: number): LessonId | undefined {
  if (page <= 4) return "propositions";
  if (page === 5) return "rewrite";
  if (page <= 7) return "induction";
  if (page <= 9) return "sum";
  if (page === 10 || page === 13) return "insertion-order";
  if (page <= 14) return "insertion-spec";
  if (page === 15) return "descending";
  if (page <= 18) return "search";
}

export const unitId = (number: number) => "unit-" + number;
export const handoutGroups = [
  { start: 1, end: 5, title: "命题与证明" },
  { start: 6, end: 9, title: "列表、归纳与求和" },
  { start: 10, end: 15, title: "插入排序的正确性" },
  { start: 16, end: 18, title: "线性查找" },
  { start: 19, end: 22, title: "自测与参考解答" },
  { start: 23, end: 29, title: "二进制加法与算法分析" },
  { start: 30, end: 40, title: "归并、二分与两数之和" },
  { start: 41, end: 51, title: "章末思考题" },
];
