import { getLearningItem } from "./learning/catalog";
import { deepLearningChapters } from "./learning/deep-learning";
import { roboticsChapters } from "./learning/robotics";
import type { CourseSlug, LearningCourse } from "./learning/types";

export type {
  CourseChapter,
  CourseSlug,
  LearningLocale,
} from "./learning/types";

export const learningCourses: readonly LearningCourse[] = [
  {
    ...getLearningItem("deep-learning"),
    slug: "deep-learning",
    index: "01",
    chapters: deepLearningChapters,
  },
  {
    ...getLearningItem("robotics"),
    slug: "robotics",
    index: "02",
    chapters: roboticsChapters,
  },
];

export function getLearningCourse(slug: CourseSlug): LearningCourse {
  const course = learningCourses.find((item) => item.slug === slug);
  if (!course) throw new Error(`Unknown learning course: ${slug}`);
  return course;
}

export function chapterPath(slug: CourseSlug, chapterId: string): string {
  const course = getLearningCourse(slug);
  return chapterId === course.chapters[0].id
    ? `/learning/${slug}`
    : `/learning/${slug}/${chapterId}`;
}
