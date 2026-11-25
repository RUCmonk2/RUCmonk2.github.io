import "../math-lab.css";
import "../algorithm-notebook.css";

import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { GraphWorkshop } from "@/components/algorithm-lab/graph-workshop";
import { NotebookPage } from "@/components/algorithm-lab/notebook-page";
import { words } from "@/lib/math-lab/graph-algorithms";
import { constructMetadata } from "@/lib/metadata";

const title = words("有向图算法", "Directed graph algorithms");
const description = words(
  "在 DAG 上排序和求最短路，用 Tarjan 找强连通分量，再看有向生成树怎么打破一个环。",
  "Order a DAG, find shortest paths, trace Tarjan’s components, and resolve a cycle in a rooted arborescence.",
);
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: title[lang],
    description: description[lang],
    path: "/learning/math-lab/directed-graphs",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <NotebookPage locale={locale} title={title} description={description}>
      <GraphWorkshop kind="directed" english={locale === "en"} />
    </NotebookPage>
  );
}
