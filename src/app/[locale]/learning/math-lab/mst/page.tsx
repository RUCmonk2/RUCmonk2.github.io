import "../math-lab.css";
import "../algorithm-notebook.css";

import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { GraphWorkshop } from "@/components/algorithm-lab/graph-workshop";
import { NotebookPage } from "@/components/algorithm-lab/notebook-page";
import { words } from "@/lib/math-lab/graph-algorithms";
import { constructMetadata } from "@/lib/metadata";

const title = words("最小生成树", "Minimum spanning trees");
const description = words(
  "同一张图比较 Kruskal、Prim 和 Borůvka，再看 KKT 怎样通过缩点与随机采样筛掉 F-偏重边。",
  "Compare Kruskal, Prim, and Borůvka, then trace the contractions and sampling of the KKT algorithm.",
);
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: title[lang],
    description: description[lang],
    path: "/learning/math-lab/mst",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <NotebookPage locale={locale} title={title} description={description}>
      <GraphWorkshop kind="mst" english={locale === "en"} />
    </NotebookPage>
  );
}
