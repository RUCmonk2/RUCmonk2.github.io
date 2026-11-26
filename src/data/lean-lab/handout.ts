import type { LessonId } from "./lessons";

export const handoutPath = "/learning/lean-lab/handout/";
export const handoutAssets = "/assets/lean-handout";
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
