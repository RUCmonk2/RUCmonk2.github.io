import "katex/dist/katex.min.css";
import "../math-map/math-map.css";
import "./ai-map.css";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AIAtlas } from "@/components/ai-atlas/ai-atlas";
import { aiDomains, aiNodes, aiRoutes } from "@/data/ai-atlas";
import { getLearningItem } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

const curriculumSources = [
  {
    title: "ACM / IEEE-CS / AAAI · CS2023 Artificial Intelligence",
    href: "https://csed.acm.org/artificial-intelligence/",
  },
  {
    title: "Carnegie Mellon · Machine Learning PhD Curriculum",
    href: "https://ml.cmu.edu/current-students/phd-curriculum",
  },
  {
    title: "Stanford · Computer Science MS Program Sheets",
    href: "https://www.cs.stanford.edu/masters-specializations/ms-program-sheets",
  },
];

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

export default async function AIMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en";
  const language = en ? "en" : "zh";
  const prefix = en ? "/en" : "";
  const item = getLearningItem("ai-map");

  return (
    <main className="notes-page mathmap-page ai-map-page">
      <div className="mathmap-shell">
        <Link className="notes-back" href={`${prefix}/learning`}>
          <ArrowLeft size={14} aria-hidden="true" />
          {en ? "Back to learning" : "返回学习目录"}
        </Link>
        <header className="mathmap-hero">
          <div>
            <span className="mathmap-section-label">
              THE ARTIFICIAL INTELLIGENCE ATLAS — VOL. 01
            </span>
            <h1>{item.title[language]}</h1>
            <p>
              {en
                ? "From a gradient to a learning system, from a model to a research question. Follow the ideas that connect artificial intelligence."
                : "从一个梯度走向学习系统，从一个模型走向研究问题。沿着关系，理解人工智能的知识如何相遇。"}
            </p>
            <div className="ai-map-companions">
              <Link
                className="mathmap-course-link"
                href={`${prefix}/learning/math-map`}
              >
                {en ? "Mathematics atlas" : "数学知识图谱"}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link
                className="mathmap-course-link"
                href={`${prefix}/learning/deep-learning`}
              >
                {en ? "Deep learning notes" : "深度学习笔记"}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mathmap-hero-figure" aria-hidden="true">
            <svg viewBox="0 0 400 240">
              <defs>
                <marker
                  id="ai-cover-gradient"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M0 0L10 5L0 10Z" fill="currentColor" />
                </marker>
              </defs>
              <g className="mathmap-contour">
                <g transform="rotate(-20 235 100)">
                  {[24, 46, 68, 90, 112].map((radius) => (
                    <ellipse
                      key={radius}
                      cx="235"
                      cy="100"
                      rx={radius}
                      ry={radius * 0.6}
                    />
                  ))}
                </g>
                <path
                  d="M95 151L368 52M198 2L268 195"
                  className="mathmap-axis"
                />
              </g>
              <path
                d="M115 45L150 91L183 104L208 104L227 101"
                className="mathmap-gradient-arrow ai-map-cover-descent"
                markerEnd="url(#ai-cover-gradient)"
              />
              <g className="mathmap-point">
                <circle cx="115" cy="45" r="3" />
                <circle cx="150" cy="91" r="2.7" />
                <circle cx="183" cy="104" r="2.4" />
                <circle cx="208" cy="104" r="2.1" />
              </g>
              <text x="91" y="34" className="mathmap-figure-label">
                θ₀
              </text>
              <text x="244" y="120" className="mathmap-figure-label">
                θ
              </text>
              <text x="13" y="199" className="mathmap-figure-math">
                θ ← θ − η∇L(θ)
              </text>
              <text x="13" y="224" className="mathmap-figure-label">
                LEARNING, STEP BY STEP.
              </text>
            </svg>
          </div>
        </header>
        <div className="mathmap-meta-strip">
          <span>
            {en
              ? "FOUNDATIONS · METHODS · RESEARCH"
              : "本科基础 / 专业主干 / 研究起步"}
          </span>
          <div>
            <b>{aiDomains.length}</b>
            {en ? "subjects" : "领域"}
            <i />
            <b>{aiNodes.length}</b>
            {en ? "concepts" : "知识点"}
            <i />
            <b>{String(aiRoutes.length).padStart(2, "0")}</b>
            {en ? "reading routes" : "学习路线"}
          </div>
        </div>
        <AIAtlas locale={language} />
        <section className="mathmap-notes" aria-labelledby="ai-map-notes-title">
          <div>
            <span className="mathmap-section-label">READING THE MAP</span>
            <h2 id="ai-map-notes-title">
              {en
                ? "From foundations to research"
                : "从共同基础，走向自己的方向"}
            </h2>
            <p>
              {en
                ? "Start with mathematics, probability, optimization and computing, then explore learning methods, language, vision, decision making and systems. Shared foundations support further study; specialist topics offer paths to investigate. The depth labels are guides, not degree requirements."
                : "从数学、概率、优化与计算出发，逐步走向学习方法、语言、视觉、决策与系统。共通主干帮助建立公共基础，方向专题供选题后深入；学习层次表示建议深度，不等同于学校培养方案。"}
            </p>
            <p>
              {en
                ? "Concept titles and navigation are bilingual; explanatory notes, examples and mastery criteria are in Chinese. Arrows suggest useful preparation, and dashed lines show connections. Follow the sources attached to each concept for full derivations and further practice."
                : "知识点提供简明解释、具体算例、掌握标准与适用条件。标题与导航支持中英切换，讲解正文为中文。箭头表示建议先修，虚线表示关联；完整推导与系统练习，可沿每个知识点所附的课程、教材与论文继续阅读。"}
            </p>
          </div>
          <div className="mathmap-sources">
            <span className="mathmap-section-label">CONTINUE READING</span>
            <h2>{en ? "Courses & references" : "课程与参考资料"}</h2>
            <p>
              {en
                ? "This independently organized study guide draws on undergraduate AI curriculum guidance and graduate ML study structures. It is not an official program of these institutions."
                : "图谱是独立整理的学习提纲，范围参考本科 AI 课程框架与研究生机器学习课程结构；下列机构未参与或背书本图。"}
            </p>
            {curriculumSources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                {source.title}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
        <footer className="mathmap-footer">
          <span>
            {en
              ? "Edition 01 · Foundations, methods & research"
              : "第一版 · 基础、方法与研究"}
          </span>
          <time dateTime={item.updated}>
            {item.updated.replaceAll("-", ".")}
          </time>
        </footer>
      </div>
    </main>
  );
}
