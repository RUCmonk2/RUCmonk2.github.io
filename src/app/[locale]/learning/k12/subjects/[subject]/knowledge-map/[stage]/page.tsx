import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { MathMapGraph } from "@/components/math-map/math-map-graph";
import {
  type SchoolStage,
  schoolStages,
  schoolSubjects,
  subjectAtlasHref,
  subjectHref,
} from "@/data/k12-subjects";
import { getSubjectAtlas } from "@/data/k12-subjects/atlas";
import { constructMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; subject: string; stage: string }>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return schoolSubjects.flatMap((subject) =>
    subject.stages.map((stage) => ({ subject: subject.id, stage: stage.id })),
  );
}
function requireAtlas(subject: string, stage: string) {
  if (
    !schoolSubjects
      .find((s) => s.id === subject)
      ?.stages.some((s) => s.id === stage)
  )
    notFound();
  return getSubjectAtlas(subject, stage as SchoolStage);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, subject, stage } = await params;
  const atlas = requireAtlas(subject, stage);
  return constructMetadata({
    title: atlas.title[locale === "en" ? "en" : "zh"],
    description: atlas.description.zh,
    path: atlas.href,
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale, subject, stage } = await params;
  const atlas = requireAtlas(subject, stage);
  const meta = schoolSubjects.find((s) => s.id === subject)!;
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} section="subjects" active={subject}>
      <header className="k12-hero k12-hero-compact">
        <span className="notes-overline">
          THE SCHOOL ATLAS / {meta.en.toUpperCase()}
        </span>
        <h1>{atlas.title.zh}</h1>
        <p>
          {atlas.description.zh}{" "}
          每个知识点都可查看概念解释、例子、辨析与自测，沿着建议先学和关联知识继续探索。
        </p>
        <div className="k12-hero-meta">
          <span>
            {atlas.nodes.length} 个知识点 · {atlas.edges.length} 条学段内关系
          </span>
          <span>悬停聚焦 · 点击选中 · 主动打开详情</span>
          <Link href={prefix + subjectHref(subject)}>回到学科目录 →</Link>
        </div>
        <nav
          className="subject-stage-tabs subject-map-tabs"
          aria-label="切换学段图谱"
        >
          {meta.stages.map((item) => (
            <Link
              href={prefix + subjectAtlasHref(subject, item.id)}
              key={item.id}
              aria-current={item.id === stage ? "page" : undefined}
            >
              {schoolStages.find((s) => s.id === item.id)!.title}知识网
            </Link>
          ))}
        </nav>
      </header>
      <MathMapGraph key={subject + stage} locale={language} atlas={atlas} />
      <section className="subject-sources">
        <h2>怎样读这些关系</h2>
        <p>
          箭头表示建议学习顺序；关联线表示可以放在一起比较或应用。历史时间先后、作品相似和学科联系都不自动等于先修关系。跨学段、跨学科的链接放在每个知识点的「知识联系」中。
        </p>
        <p>
          按当前学科目录覆盖主干主题，具体年级顺序和选学范围结合在用教材。外语图谱当前为英语主线。
        </p>
      </section>
    </K12Shell>
  );
}
