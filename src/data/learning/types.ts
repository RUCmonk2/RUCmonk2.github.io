export type LearningLocale = "zh" | "en";
export type CourseSlug = "deep-learning" | "robotics" | "ai-practice";
export type Localized = Record<LearningLocale, string>;

export type CourseChapter = {
  id: string;
  title: string;
  group: string;
  lead: string;
  body: string;
  checks: { question: string; answer: string }[];
  source: string;
  lab?: "gradient" | "rotation" | "euler" | "planar-forward" | "planar-inverse";
  figure?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type LearningCourse = {
  slug: CourseSlug;
  index: string;
  title: Localized;
  description: Localized;
  scope: Localized;
  chapters: readonly CourseChapter[];
};
