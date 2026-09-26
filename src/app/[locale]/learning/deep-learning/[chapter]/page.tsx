import type { Metadata } from "next";

import { getLearningCourse } from "@/data/learning";

import { courseMetadata,CoursePage } from "../../course-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLearningCourse("deep-learning")
    .chapters.slice(1)
    .map((chapter) => ({
      chapter: chapter.id,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; chapter: string }>;
}): Promise<Metadata> {
  const { locale, chapter } = await params;
  return courseMetadata("deep-learning", locale, chapter);
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: string; chapter: string }>;
}) {
  const { locale, chapter } = await params;
  return (
    <CoursePage slug="deep-learning" locale={locale} chapterId={chapter} />
  );
}
