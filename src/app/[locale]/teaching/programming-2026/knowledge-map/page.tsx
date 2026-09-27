import { courseMapMetadata,CourseMapPage } from "@/components/learning/course-map-page";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return courseMapMetadata("programming-2026", locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <CourseMapPage slug="programming-2026" locale={locale} />;
}
