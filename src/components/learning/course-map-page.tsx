import "@/app/[locale]/learning/learning.css";
import "@/app/[locale]/learning/math-map/math-map.css";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { MathMapGraph } from "@/components/math-map/math-map-graph";
import { type CourseMapSlug, getCourseAtlas } from "@/data/course-maps";
import { constructMetadata } from "@/lib/metadata";

import { CourseViewSwitch } from "./course-view-switch";

export function courseMapMetadata(
  slug: CourseMapSlug,
  locale: string,
): Promise<Metadata> {
  const atlas = getCourseAtlas(slug),
    language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: atlas.title[language],
    description: atlas.description[language],
    path: atlas.href,
    locale: locale as Locale,
  });
}
export function CourseMapPage({
  slug,
  locale,
}: {
  slug: CourseMapSlug;
  locale: string;
}) {
  const atlas = getCourseAtlas(slug),
    language = locale === "en" ? "en" : "zh",
    en = language === "en",
    prefix = en ? "/en" : "";
  return (
    <main className="notes-page mathmap-page">
      <div className="mathmap-shell">
        <Link className="notes-back" href={prefix + atlas.courseHref}>
          <ArrowLeft size={14} />
          {en ? "Back to course" : "返回本课程"}
        </Link>
        <CourseViewSwitch
          locale={language}
          courseHref={atlas.courseHref!}
          mapHref={atlas.href}
          active="map"
        />
        <header className="mathmap-hero">
          <div>
            <span className="mathmap-section-label">
              THE COURSE ATLAS · {slug.toUpperCase().replaceAll("-", " ")}
            </span>
            <h1>{atlas.title[language]}</h1>
            <p>{atlas.description[language]}</p>
          </div>
          <div className="mathmap-hero-figure" aria-hidden="true">
            <svg viewBox="0 0 400 240">
              <g className="mathmap-contour">
                <path d="M75 150Q140 80 205 95T335 65M205 95Q200 165 295 192M75 150Q110 225 175 200" />
              </g>
              <g className="mathmap-point">
                <circle cx="75" cy="150" r="6" />
                <circle cx="205" cy="95" r="13" />
                <circle cx="335" cy="65" r="4" />
                <circle cx="295" cy="192" r="8" />
                <circle cx="175" cy="200" r="3" />
              </g>
              <text x="15" y="30" className="mathmap-figure-label">
                IDEAS, IN RELATION.
              </text>
            </svg>
          </div>
        </header>
        <div className="mathmap-meta-strip">
          <span>
            {en ? "EXPLORE / UNDERSTAND / PRACTISE" : "探索 / 理解 / 演算"}
          </span>
          <div>
            <b>{String(atlas.domains.length).padStart(2, "0")}</b>
            {en ? "areas" : "主题"}
            <i />
            <b>{atlas.nodes.length}</b>
            {en ? "concepts" : "概念"}
            <i />
            <b>{String(atlas.paths.length).padStart(2, "0")}</b>
            {en ? "reading routes" : "学习路线"}
          </div>
        </div>
        {en && (
          <p className="course-map-language">
            Course-specific lessons are written in Chinese, as are the original
            course notes. Mathematical foundation lessons are available in
            English.
          </p>
        )}
        <MathMapGraph key={slug} locale={language} atlas={atlas} />
        <section className="mathmap-notes" aria-labelledby="course-map-notes">
          <div>
            <span className="mathmap-section-label">READING THE MAP</span>
            <h2 id="course-map-notes">
              {en
                ? "Keep the ideas and their context together"
                : "沿着关联学，也回到章节里验证"}
            </h2>
            <p>
              {en
                ? "Arrows indicate suggested preparation; dashed lines indicate connections. Dwell to focus without scrolling, then open the full lesson when you want to read. Both reading modes, worked solutions and view controls use the same mathematics-atlas reader."
                : "箭头表示建议先修，虚线表示相关概念。悬停片刻即可聚焦，想深入时再点“阅读完整讲解”。每个节点都有“从零理解”和“严谨表述”，例题与答案沿用同一套阅读方式。"}
            </p>
            <p>
              {slug === "programming-2026"
                ? en
                  ? "This edition covers the published L02 examples. Input-state checks are marked as supplementary explanations. The code examples use C++17."
                  : "本版覆盖当前公开的 L02 输入输出与变量示例；读取状态检查等补充内容在讲解中标明。代码按 C++17 讲解，每个节点都链接到相应公开示例。"
                : en
                  ? "Course concepts connect to their original chapters. Mathematical prerequisites reuse the same complete lessons as the mathematics atlas."
                  : "课程概念可回到对应章节，数学支点与总数学知识网共用完整讲解。课程原有章节、算例和整理依据仍是阅读主线。"}
            </p>
          </div>
          <div className="mathmap-sources">
            <span className="mathmap-section-label">CONTINUE READING</span>
            <h2>{en ? "Keep studying" : "继续学习"}</h2>
            <Link href={prefix + atlas.courseHref}>
              {en ? "Read this course in chapter order" : "按章节阅读本课程"}
              <ArrowRight size={14} />
            </Link>
            <Link href={prefix + "/learning/math-map"}>
              {en ? "Explore the mathematics atlas" : "进入数学基础总图"}
              <ArrowRight size={14} />
            </Link>
            <Link href={prefix + "/learning#courses"}>
              {en ? "All four courses" : "返回四门课程目录"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
        <footer className="mathmap-footer">
          <span>{atlas.title[language]}</span>
          <time dateTime={atlas.updated}>
            {atlas.updated.replaceAll("-", ".")}
          </time>
        </footer>
      </div>
    </main>
  );
}
