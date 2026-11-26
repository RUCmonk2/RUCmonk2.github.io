import "katex/dist/katex.min.css";
import "../math-map/math-map.css";
import "./tcs-map.css";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { TcsInkMap } from "@/components/learning/tcs-ink-map";
import { getLearningItem } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

const item = getLearningItem("tcs-map");

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: language,
  });
}

export default async function TcsMapPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === "en";
  const language = en ? "en" : "zh";

  return (
    <main className="notes-page mathmap-page tcs-page">
      <div className="mathmap-shell tcs-shell">
        <Link className="notes-back" href={en ? "/en/learning" : "/learning"}>
          <ArrowLeft size={14} aria-hidden="true" />
          {en ? "Back to learning" : "返回学习目录"}
        </Link>
        <header className="tcs-hero">
          <h1>{item.title[language]}</h1>
          <p>
            {en
              ? "What can we compute? How do we compute it, what does it cost, and how do we know the result is right? Explore the questions through algorithms, lower bounds and hypotheses."
              : "什么能算？怎样算、要花多少资源、怎么确认算对了？从最小生成树、矩阵乘法到 P 与 NP，沿着具体问题看分支之间的联系。"}
          </p>
        </header>
        <TcsInkMap locale={language} />
      </div>
    </main>
  );
}
