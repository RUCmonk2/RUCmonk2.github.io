import "./math-map.css";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { MathMapGraph } from "@/components/math-map/math-map-graph";
import { getLearningItem } from "@/data/learning/catalog";
import { mathMapDomains, mathMapNodes, mathMapSources } from "@/data/math-map";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const item = getLearningItem("math-map");
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function MathMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const en = language === "en";
  return (
    <main className="notes-page mathmap-page">
      <div className="mathmap-shell">
        <Link className="notes-back" href={(en ? "/en" : "") + "/learning"}>
          <ArrowLeft size={14} aria-hidden="true" />
          {en ? "Back to learning" : "返回学习目录"}
        </Link>
        <header className="mathmap-hero">
          <div>
            <span className="mathmap-section-label">
              THE MATHEMATICS ATLAS — VOL. 01
            </span>
            <h1>{getLearningItem("math-map").title[language]}</h1>
            <p>
              {en
                ? "Follow a derivative into a matrix, a symmetry into a model. Trace how mathematical ideas meet."
                : "从一个导数走向矩阵，从一种对称走向模型。沿着关系，理解数学概念如何相遇。"}
            </p>
          </div>
          <div className="mathmap-hero-figure" aria-hidden="true">
            <svg viewBox="0 0 400 240">
              <defs>
                <marker
                  id="cover-gradient"
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
                {[24, 46, 68, 90, 112].map((r) => (
                  <circle key={r} cx="226" cy="128" r={r} />
                ))}
                <path d="M86 128H372M226 4V238" className="mathmap-axis" />
                <path
                  d="M134 36L318 220M134 220L318 36"
                  className="mathmap-axis"
                />
              </g>
              <path
                d="M248 106L302 52"
                className="mathmap-gradient-arrow"
                markerEnd="url(#cover-gradient)"
              />
              <circle cx="248" cy="106" r="4" className="mathmap-point" />
              <text x="315" y="50" className="mathmap-figure-math">
                ∇f
              </text>
              <text x="255" y="124" className="mathmap-figure-label">
                x
              </text>
              <text x="13" y="199" className="mathmap-figure-math">
                df = ∇fᵀdx
              </text>
              <text x="13" y="224" className="mathmap-figure-label">
                LOCAL CHANGE, CONNECTED.
              </text>
            </svg>
          </div>
        </header>
        <div className="mathmap-meta-strip">
          <span>
            {en ? "CALCULUS · MATRICES · SYMMETRY" : "微积分 / 矩阵 / 对称性"}
          </span>
          <div>
            <b>0{mathMapDomains.length}</b>
            {en ? "subjects" : "领域"}
            <i />
            <b>{mathMapNodes.length}</b>
            {en ? "concepts" : "概念"}
            <i />
            <b>04</b>
            {en ? "reading routes" : "学习路线"}
          </div>
        </div>
        <MathMapGraph locale={language} />
        <section
          className="mathmap-notes"
          aria-labelledby="mathmap-notes-title"
        >
          <div>
            <span className="mathmap-section-label">READING THE MAP</span>
            <h2 id="mathmap-notes-title">
              {en ? "A growing map of foundations" : "一张持续生长的基础地图"}
            </h2>
            <p>
              {en
                ? "Explore analysis, linear algebra, multivariable calculus, vector operators, matrix differentials, groups and AI foundations. Every concept has guided learning with notation, worked examples and exercises, alongside a formal treatment of definitions and conditions."
                : "从数分、线代、多元微积分、向量算子、矩阵微分、群论和 AI 数学基础入手。每个概念都有“从零理解”和“严谨表述”：前者解释符号、展开算例与练习，后者梳理定义、推导和适用条件。"}
            </p>
            <p>
              {en
                ? "Unless noted otherwise, vectors are columns and variables are real. Jacobians use output-by-input layout; matrix gradients use the Frobenius inner product. Arrows indicate suggested preparation, and dashed edges indicate connections. Reading routes may cross several subjects."
                : "默认使用实变量、列向量、欧氏内积；Jacobian 按“输出 × 输入”排列，矩阵梯度使用 Frobenius 内积。箭头表示建议先修，虚线表示关联；学习路线可以跨越多个领域。"}
            </p>
          </div>
          <div className="mathmap-sources">
            <span className="mathmap-section-label">CONTINUE READING</span>
            <h2>{en ? "Courses & references" : "课程与参考资料"}</h2>
            <p>
              {en
                ? "The map is an independently organized study guide. These courses and books offer deeper treatments of the topics."
                : "图谱是独立整理的学习提纲，下面的课程与教材用于继续学习各领域。"}
            </p>
            {mathMapSources.map((source) => (
              <a
                key={source.id}
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
              ? "Edition 01 · Calculus, matrices & symmetry"
              : "第一版 · 微积分、矩阵与对称性"}
          </span>
          <time dateTime={getLearningItem("math-map").updated}>
            {getLearningItem("math-map").updated.replaceAll("-", ".")}
          </time>
        </footer>
      </div>
    </main>
  );
}
