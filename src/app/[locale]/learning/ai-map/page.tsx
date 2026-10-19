import "katex/dist/katex.min.css";
import "./ai-map.css";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AIAtlas } from "@/components/ai-atlas/ai-atlas";
import { aiDomains, aiNodes, aiRoutes } from "@/data/ai-atlas";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return constructMetadata({
    title: en ? "Artificial Intelligence Knowledge Atlas" : "人工智能知识地图",
    description: en
      ? "Explore AI from undergraduate foundations to early doctoral research: connected concepts, prerequisites, examples and study paths. Explanatory notes in Chinese."
      : "从本科基础到博士研究起步，连接数学、机器学习、深度学习、大模型、视觉、强化学习、系统与研究方法。",
    path: "/learning/ai-map",
    locale: en ? "en" : "zh",
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en",
    language = en ? "en" : "zh",
    prefix = en ? "/en" : "";
  return (
    <main className="ai-page">
      <div className="ai-shell">
        <nav className="ai-breadcrumb">
          <Link href={`${prefix}/learning/`}>
            <ArrowLeft size={13} />
            {en ? "Learning" : "学习目录"}
          </Link>
          <Link href={`${prefix}/learning/math-map/`}>
            {en ? "Mathematics map" : "数学知识网"}
            <ArrowUpRight size={13} />
          </Link>
        </nav>
        <header className="ai-hero">
          <div>
            <p className="ai-eyebrow">THE ARTIFICIAL INTELLIGENCE ATLAS / 01</p>
            <h1>
              {en
                ? "Artificial Intelligence Knowledge Atlas"
                : "人工智能知识地图"}
            </h1>
            <p>
              {en
                ? "From mathematical foundations to research questions. Follow prerequisites, connect methods, and turn understanding into working knowledge."
                : "从数学基础走向研究问题。沿着先修关系，连接方法，把“听过”变成真正掌握。"}
            </p>
          </div>
          <div className="ai-edition">
            <span>
              {en ? "Learn. Connect. Investigate." : "基础 · 方法 · 研究"}
            </span>
            <p>{en ? "Undergraduate → early PhD" : "本科生 → 低年级博士生"}</p>
            <small>
              {en
                ? "A MAP TO STUDY, NOT A LIST TO COLLECT"
                : "先看主干，再沿方向深入"}
            </small>
          </div>
        </header>
        <div className="ai-meta">
          <span>
            {en
              ? "SHARED CORE + SPECIALIST PATHS · NOTES IN CHINESE"
              : "共通主干 + 方向专题 · 按先修关系阅读"}
          </span>
          <div>
            <span>
              <b>{aiDomains.length}</b>
              {en ? "fields" : "领域"}
            </span>
            <span>
              <b>{aiNodes.length}</b>
              {en ? "concepts" : "知识点"}
            </span>
            <span>
              <b>{aiRoutes.length}</b>
              {en ? "routes" : "阅读路线"}
            </span>
          </div>
        </div>
        <AIAtlas locale={language} />
        <footer className="ai-colophon">
          <div>
            <span className="ai-eyebrow">HOW TO READ THIS ATLAS</span>
            <p>
              {en
                ? "This independently organized curriculum map separates shared foundations from specialist topics. Level labels suggest learning depth; they are not degree requirements. Arrows between concepts suggest useful preparation, not logical necessity. Overview links show broad connections."
                : "这是独立整理的专业学习地图：共通主干帮助建立公共基础，方向专题供选题后深入。学习层次表示建议深度，不等同于学校培养方案。知识点之间的箭头表示建议先修；领域总图的连线只表示大方向的联系。"}
            </p>
            <p>
              {en
                ? "Each card offers an original concise explanation, a concrete exercise and mastery criteria. Use the linked courses, textbooks and papers for full derivations and deeper study. Updated 19 October 2026."
                : "每张知识卡提供原创简明说明、具体例子与掌握标准。完整推导和系统练习需结合所附课程、教材与论文。内容整理于 2026 年 10 月 19 日。"}
            </p>
          </div>
          <div>
            <span className="ai-eyebrow">CURRICULUM REFERENCES</span>
            <p>
              {en
                ? "The breadth is informed by undergraduate AI curriculum guidance and graduate ML study structures; this is not an official program of any institution."
                : "范围参考本科 AI 课程框架和研究生机器学习课程结构；下列机构未参与或背书本图。具体知识来源随每张卡片列出。"}
            </p>
            <a
              href="https://csed.acm.org/artificial-intelligence/"
              target="_blank"
              rel="noreferrer"
            >
              ACM / IEEE-CS / AAAI · CS2023 Artificial Intelligence ↗
            </a>
            <a
              href="https://ml.cmu.edu/current-students/phd-curriculum"
              target="_blank"
              rel="noreferrer"
            >
              Carnegie Mellon · Machine Learning PhD Curriculum ↗
            </a>
            <a
              href="https://www.cs.stanford.edu/masters-specializations/ms-program-sheets"
              target="_blank"
              rel="noreferrer"
            >
              Stanford · Computer Science MS Program Sheets ↗
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
