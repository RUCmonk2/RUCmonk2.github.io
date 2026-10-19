import "./mathematicians.css";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { MathematiciansAtlas } from "@/components/mathematicians/mathematicians-atlas";
import { mathematicians } from "@/data/mathematicians";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: language === "en" ? "Lives of Mathematicians" : "数学家人物志",
    description:
      language === "en"
        ? `${mathematicians.length} lives across civilizations and centuries. Explore Euclid, Liu Hui, Newton, Gauss, Noether, Turing and Mirzakhani through portraits, discoveries and documented connections.`
        : `从欧几里得、刘徽、牛顿到高斯、诺特、图灵与米尔扎哈尼，沿着学术关系与共同的问题，探索 ${mathematicians.length} 位数学家的成果与人生。`,
    path: "/learning/mathematicians/",
    locale: language,
  });
}

export default async function MathematiciansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en";
  const prefix = en ? "/en" : "";
  return (
    <main className="lives-page">
      <div className="lives-shell">
        <nav
          className="lives-breadcrumb"
          aria-label={en ? "Related pages" : "相关页面"}
        >
          <Link href={`${prefix}/learning/`}>
            <ArrowLeft size={13} />
            {en ? "Learning" : "学习目录"}
          </Link>
          <Link href={`${prefix}/learning/math-map/`}>
            {en ? "The mathematics atlas" : "数学知识图谱"}
            <ArrowUpRight size={13} />
          </Link>
        </nav>
        <header className="lives-hero">
          <div>
            <p className="lives-eyebrow">
              THE MATHEMATICS ATLAS / LIVES & IDEAS
            </p>
            <h1>
              {en ? "Lives of Mathematicians" : "数学家人物志"}
              <span>Ⅲ</span>
            </h1>
            <p className="lives-deck">
              {en
                ? "Behind every theorem, a person. Between them, a history of ideas."
                : "定理背后是人，人与人之间，是思想的来路。"}
            </p>
          </div>
          <div className="lives-edition">
            <span>{en ? "Antiquity — Modernity" : "古典时代 — 现代数学"}</span>
            <p>
              {en
                ? `${mathematicians.length} lives. A growing history of ideas.`
                : `${mathematicians.length} 位人物，一张生长中的思想地图。`}
            </p>
            <small>
              {en
                ? "EDITION 03 · ACROSS CIVILIZATIONS & CENTURIES"
                : "第三辑 · 跨越文明与世纪"}
            </small>
          </div>
        </header>
        <MathematiciansAtlas locale={en ? "en" : "zh"} />
        <footer className="lives-colophon">
          <div>
            <span className="lives-eyebrow">EDITOR’S NOTE</span>
            <p>
              {en
                ? "Follow academic connections or read by period and birth year. Dates preserve historical uncertainty. Every relationship has an explanation and source; shared questions need not imply personal contact. Portrait sizes provide editorial landmarks rather than a numerical ranking."
                : "沿学术关系探索，也可按出生年代分期阅读；约略纪年保留史料中的不确定性。每条关系都有说明与出处，同题研究不意味着彼此相识。头像的大小层次用于帮助定位，不作数值排名。"}
            </p>
          </div>
          <div>
            <span className="lives-eyebrow">THE PORTRAITS</span>
            <p>
              {en
                ? "Historical images carry their sources and licenses. Later depictions are identified; where a verified open portrait is unavailable, an original name mark is used instead of an invented face."
                : "历史画像与照片随人物标明来源和许可；后世形象单独注明。没有可靠开放肖像时，采用原创姓名字标，保留空白的历史。"}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
