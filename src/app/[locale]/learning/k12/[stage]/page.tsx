import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Catalog } from "@/components/k12/k12-catalog";
import { K12Shell } from "@/components/k12/k12-shell";
import { MathMapGraph } from "@/components/math-map/math-map-graph";
import { getK12Atlas, type K12Stage, k12Stages } from "@/data/k12";
import { constructMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string; stage: string }> };
export function generateStaticParams() {
  return k12Stages.map((stage) => ({ stage: stage.id }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, stage } = await params;
  const item = k12Stages.find((item) => item.id === stage);
  if (!item) notFound();
  const atlas = getK12Atlas(stage as K12Stage);
  return constructMetadata({
    title: atlas.title[locale === "en" ? "en" : "zh"],
    description: item.description,
    path: atlas.href,
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale, stage } = await params;
  const item = k12Stages.find((item) => item.id === stage);
  if (!item) notFound();
  const atlas = getK12Atlas(stage as K12Stage);
  const language = locale === "en" ? "en" : "zh";
  return (
    <K12Shell locale={language} active={stage}>
      <header className="k12-hero k12-hero-compact">
        <span className="notes-overline">
          THE SCHOOL ATLAS / {item.en.toUpperCase()}
        </span>
        <h1>{atlas.title.zh}</h1>
        <p>
          {item.description}{" "}
          每个墨点都有完整双模式讲解，独立讲义中可回看跨学段先修知识。
        </p>
        <div className="k12-hero-meta">
          <span>{atlas.nodes.length} 个概念</span>
          <span>悬停片刻聚焦 · 主动打开详情</span>
          <a href="#catalog">直接按目录学习 ↓</a>
        </div>
      </header>
      <MathMapGraph locale={language} atlas={atlas} />
      <K12Catalog locale={language} stage={stage as K12Stage} />
    </K12Shell>
  );
}
