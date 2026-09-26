import type { Metadata } from "next";

import { getLearningCourse } from "@/data/learning";

import { courseMetadata,CoursePage } from "../../course-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLearningCourse("robotics")
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
  return courseMetadata("robotics", locale, chapter);
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: string; chapter: string }>;
}) {
  const { locale, chapter } = await params;
  return <CoursePage slug="robotics" locale={locale} chapterId={chapter} />;
}
