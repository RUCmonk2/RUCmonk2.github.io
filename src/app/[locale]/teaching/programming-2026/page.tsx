import "./programming-reader.css";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { ArrowRight, ChevronDown, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { CourseReader } from "@/components/learning/course-reader";
import { CodeCopyButton } from "@/components/teaching/code-copy-button";
import { getLearningItem } from "@/data/learning/catalog";
import {
  programming2026Copy,
  programming2026Lectures,
  type TeachingLocale,
} from "@/data/teaching/programming-2026";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeKey: TeachingLocale = locale === "en" ? "en" : "zh";
  const item = getLearningItem("programming-2026");

  return constructMetadata({
    title: item.title[localeKey],
    description: item.description[localeKey],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function Programming2026Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeKey: TeachingLocale = locale === "en" ? "en" : "zh";
  const copy = programming2026Copy[localeKey];
  const title = getLearningItem("programming-2026").title[localeKey];
  const en = localeKey === "en";
  const prefix = en ? "/en" : "";
  const courseHref = "/teaching/programming-2026";
  const exampleCount = programming2026Lectures.reduce(
    (total, lecture) => total + lecture.examples.length,
    0,
  );
  const lectures = await Promise.all(
    programming2026Lectures.map(async (lecture) => ({
      ...lecture,
      examples: await Promise.all(
        lecture.examples.map(async (example) => ({
          ...example,
          code: await readFile(
            path.join(
              process.cwd(),
              "public",
              "teaching",
              "programming-2026",
              lecture.sourceDirectory,
              example.filename,
            ),
            "utf8",
          ),
        })),
      ),
    })),
  );

  const contents = (
    <nav aria-label={en ? "Course chapters" : "课程章节"}>
      <div className="reader-nav-group">
        <p>{en ? "Published lectures" : "已发布讲次"}</p>
        {lectures.map((lecture) => (
          <Link key={lecture.number} href={"#" + lecture.number.toLowerCase()}>
            <span>{lecture.number.slice(1)}</span>
            <span>{lecture.title[localeKey]}</span>
          </Link>
        ))}
      </div>
      <div className="reader-nav-group">
        <p>{en ? "Reading & practice" : "阅读与练习"}</p>
        <Link href="#course-notes">
          <span>01</span>
          <span>{copy.notesTitle}</span>
        </Link>
        <Link href="#course-downloads">
          <span>02</span>
          <span>{copy.download}</span>
        </Link>
        <Link href={prefix + courseHref + "/knowledge-map"}>
          <span>03</span>
          <span>{en ? "Explore the knowledge map" : "按知识点探索"}</span>
        </Link>
      </div>
    </nav>
  );

  return (
    <CourseReader
      locale={localeKey}
      slug="programming-2026"
      title={title}
      sidebarMeta={
        <>
          {lectures.length} {en ? "lecture" : "讲资料"} · {exampleCount}{" "}
          {en ? "code examples" : "个代码示例"}
        </>
      }
      contents={contents}
      mobileLabel={
        <>
          {en ? "Contents" : "课程目录"} · {lectures.length}{" "}
          {en ? "lecture" : "讲资料"}
        </>
      }
      courseHref={courseHref}
      mapHref={courseHref + "/knowledge-map"}
    >
      {lectures.map((lecture) => (
        <article
          className="note-article"
          id={lecture.number.toLowerCase()}
          key={lecture.number}
        >
          <header className="note-header">
            <div className="note-eyebrow">
              <span>{title}</span>
              <span>
                {lecture.number} · {lecture.examples.length}{" "}
                {en ? "examples" : "个示例"}
              </span>
            </div>
            <h1>{lecture.title[localeKey]}</h1>
            <p>{lecture.description[localeKey]}</p>
          </header>
          <div className="note-prose">
            <p>{copy.browseDescription}</p>
          </div>
          <section
            className="note-checks programming-examples"
            aria-label={copy.browseTitle}
          >
            <div className="note-section-heading">
              <h2>{copy.browseTitle}</h2>
              <span>{en ? "Slide / example" : "课件编号 / 示例"}</span>
            </div>
            {lecture.examples.map((example, index) => {
              const codeId = `${lecture.number.toLowerCase()}-code-${index + 1}`;
              return (
                <details key={example.filename}>
                  <summary>
                    <span className="note-check-number">{example.slide}</span>
                    <span className="programming-example-title">
                      <b>{example.title[localeKey]}</b>
                      <small>{example.filename}</small>
                    </span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <div className="note-prose programming-code-panel">
                    <div className="programming-code-toolbar">
                      <span>C++17</span>
                      <CodeCopyButton
                        targetId={codeId}
                        label={copy.copyCode}
                        copiedLabel={copy.copiedCode}
                        filename={example.filename}
                      />
                    </div>
                    <pre tabIndex={0}>
                      <code id={codeId}>{example.code}</code>
                    </pre>
                  </div>
                </details>
              );
            })}
          </section>
        </article>
      ))}
      <article className="note-article programming-reference" id="course-notes">
        <div className="note-prose">
          <h2>{copy.notesTitle}</h2>
          <ol>
            {copy.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
          <h2 id="course-downloads">{copy.download}</h2>
          {lectures.map((lecture) => (
            <div className="programming-download-row" key={lecture.number}>
              <p>
                <strong>
                  {lecture.number} · {lecture.title[localeKey]}
                </strong>
                <small>{lecture.archiveLabel[localeKey]}</small>
              </p>
              <a className="programming-download" href={lecture.href} download>
                <Download size={15} aria-hidden="true" />
                {copy.download}
              </a>
            </div>
          ))}
        </div>
        <details className="note-source">
          <summary>
            {copy.boundaryTitle}
            <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <p>{copy.boundaryText}</p>
        </details>
        <details className="note-source">
          <summary>
            {copy.futureTitle}
            <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <p>{copy.futureText}</p>
        </details>
      </article>
      <nav
        className="reader-pagination"
        aria-label={en ? "Continue learning" : "继续学习"}
      >
        <Link href={prefix + courseHref + "/knowledge-map"}>
          <span>
            {en ? "Explore connections" : "沿着关联探索"}
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <strong>{en ? "Programming knowledge map" : "程序设计知识网"}</strong>
        </Link>
        <Link href={prefix + "/learning#courses"}>
          <span>
            {en ? "Back to courses" : "回到课程目录"}
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <strong>
            {en ? "Explore another course" : "继续探索另一门课程"}
          </strong>
        </Link>
      </nav>
    </CourseReader>
  );
}
