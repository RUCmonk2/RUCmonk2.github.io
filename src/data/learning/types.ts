export type LearningLocale = "zh" | "en";
export type CourseSlug = "deep-learning" | "robotics";
export type Localized = Record<LearningLocale, string>;

export type CourseChapter = {
  id: string;
  title: string;
  group: string;
  lead: string;
  body: string;
  checks: { question: string; answer: string }[];
  source: string;
  lab?: "gradient" | "rotation";
};

export type LearningCourse = {
  slug: CourseSlug;
  index: string;
  title: Localized;
  description: Localized;
  scope: Localized;
  chapters: readonly CourseChapter[];
};
