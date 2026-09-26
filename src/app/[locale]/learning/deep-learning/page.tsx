import type { Metadata } from "next";

import { courseMetadata, CoursePage } from "../course-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return courseMetadata("deep-learning", locale);
}

export default async function DeepLearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CoursePage slug="deep-learning" locale={locale} />;
}
