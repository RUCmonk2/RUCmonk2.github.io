import type { Metadata } from "next";

import { courseMetadata, CoursePage } from "../course-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return courseMetadata("robotics", locale);
}

export default async function RoboticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CoursePage slug="robotics" locale={locale} />;
}
