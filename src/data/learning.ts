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
    slug: "deep-learning",
    index: "01",
    title: { zh: "深度学习导论", en: "Introduction to Deep Learning" },
    description: {
      zh: "从数据和损失出发，手算梯度下降、Softmax 与反向传播，把前三周的知识连成一次完整训练。",
      en: "Work through data, losses, gradient descent, Softmax, and backpropagation. The reading notes are in Chinese.",
    },
    scope: { zh: "前三周 · 自学讲义伴读", en: "Weeks 1–3 · study notes" },
    chapters: deepLearningChapters,
  },
  {
    slug: "robotics",
    index: "02",
    title: { zh: "机器人学导论", en: "Introduction to Robotics" },
    description: {
      zh: "从一次抓取理解机器人系统，再算清坐标变换、关节轨迹、末端速度与下一步行动。",
      en: "Connect robot hardware with coordinate transforms, trajectories, Jacobians, and decision-making. Notes are in Chinese.",
    },
    scope: {
      zh: "导论、硬件与数学基础",
      en: "Systems, hardware, and mathematics",
    },
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
