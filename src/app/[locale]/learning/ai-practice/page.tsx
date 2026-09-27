import type { Metadata } from "next";

import { courseMetadata, CoursePage } from "../course-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return courseMetadata("ai-practice", locale);
}

export default async function AIPracticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CoursePage slug="ai-practice" locale={locale} />;
}
