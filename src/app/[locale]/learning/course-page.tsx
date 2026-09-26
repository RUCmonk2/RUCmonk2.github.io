import { ArrowLeft, ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "next-intl";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CourseLab } from "@/components/learning/course-lab";
import {
  chapterPath,
  type CourseSlug,
  getLearningCourse,
  type LearningLocale,
} from "@/data/learning";
import { learningCatalog, learningItemHref } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

function NoteMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        table: ({ children }) => (
          <div className="note-table-scroll">
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export async function courseMetadata(
  slug: CourseSlug,
  locale: string,
  chapterId?: string,
): Promise<Metadata> {
  const language: LearningLocale = locale === "en" ? "en" : "zh";
  const course = getLearningCourse(slug);
  const chapter = course.chapters.find((item) => item.id === chapterId);
  return constructMetadata({
    title: chapter
      ? chapter.title + " · " + course.title[language]
      : course.title[language],
    description: chapter?.lead ?? course.description[language],
    path: chapter ? chapterPath(slug, chapter.id) : "/learning/" + slug,
    locale: locale as Locale,
  });
}

export function CoursePage({
  slug,
  locale,
  chapterId,
}: {
  slug: CourseSlug;
  locale: string;
  chapterId?: string;
}) {
  const language: LearningLocale = locale === "en" ? "en" : "zh";
  const isEnglish = language === "en";
  const course = getLearningCourse(slug);
  const prefix = isEnglish ? "/en" : "";
  const index = chapterId
    ? course.chapters.findIndex((item) => item.id === chapterId)
    : 0;
  const chapter = course.chapters[index];
  if (!chapter) notFound();
  const previous = course.chapters[index - 1];
  const next = course.chapters[index + 1];
  const groups = [...new Set(course.chapters.map((item) => item.group))];

  const contents = (
    <nav aria-label={isEnglish ? "Course chapters" : "课程章节"}>
      {groups.map((group) => (
        <div className="reader-nav-group" key={group}>
          <p>{group}</p>
          {course.chapters.map((item, chapterIndex) =>
            item.group === group ? (
              <Link
                key={item.id}
                href={prefix + chapterPath(slug, item.id)}
                aria-current={item.id === chapter.id ? "page" : undefined}
              >
                <span>{String(chapterIndex + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </Link>
            ) : null,
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <main className={"notes-page notes-" + slug}>
      <div className="reader-topbar">
        <Link href={prefix + "/learning"} className="notes-back">
          <ArrowLeft size={14} aria-hidden="true" />
          {isEnglish ? "Learning" : "学习"}
        </Link>
        <div
          className="reader-course-switch"
          aria-label={isEnglish ? "Switch course" : "切换课程"}
        >
          {learningCatalog
            .filter((item) => item.category === "course")
            .map((item) => (
              <Link
                key={item.id}
                href={learningItemHref(item, language)}
                aria-current={slug === item.id ? "true" : undefined}
              >
                {item.title[language]}
              </Link>
            ))}
        </div>
      </div>

      <div className="reader-layout">
        <aside className="reader-sidebar">
          <div className="reader-sidebar-heading">
            <BookOpen size={18} aria-hidden="true" />
            <h2>{course.title[language]}</h2>
          </div>
          <p className="reader-sidebar-meta">
            {course.chapters.length}{" "}
            {isEnglish ? "chapters · Chinese notes" : "节笔记 · 按章节阅读"}
          </p>
          {contents}
          <Link
            className="reader-all-courses"
            href={prefix + "/learning#courses"}
          >
            {isEnglish ? "All courses" : "全部课程"}{" "}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </aside>

        <div className="reader-main">
          <details className="reader-mobile-nav" key={chapter.id}>
            <summary>
              <span>
                {isEnglish ? "Contents" : "章节目录"} ·{" "}
                {String(index + 1).padStart(2, "0")} / {course.chapters.length}
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            {contents}
          </details>

          <article className="note-article" lang="zh">
            <header className="note-header">
              <div className="note-eyebrow">
                <span>{course.title.zh}</span>
                <span>
                  第 {index + 1} 节 / 共 {course.chapters.length} 节
                </span>
              </div>
              <h1>{chapter.title}</h1>
              <p>{chapter.lead}</p>
              {isEnglish && (
                <small lang="en">
                  The course notes are written in Chinese.
                </small>
              )}
            </header>
            <div className="note-prose">
              <NoteMarkdown>{chapter.body}</NoteMarkdown>
            </div>
            {chapter.lab && <CourseLab kind={chapter.lab} />}
            <section className="note-checks" aria-labelledby="checks-title">
              <div className="note-section-heading">
                <h2 id="checks-title">停一下，自己试试</h2>
                <span>先想答案，再展开</span>
              </div>
              {chapter.checks.map((check, checkIndex) => (
                <details key={check.question}>
                  <summary>
                    <span className="note-check-number">
                      {String(checkIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{check.question}</span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <div className="note-answer note-prose">
                    <NoteMarkdown>{check.answer}</NoteMarkdown>
                  </div>
                </details>
              ))}
            </section>
            <details className="note-source">
              <summary>
                整理依据 <ChevronDown size={13} aria-hidden="true" />
              </summary>
              <p>{chapter.source}</p>
            </details>
          </article>

          <nav
            className="reader-pagination"
            aria-label={isEnglish ? "Chapter navigation" : "前后章节"}
          >
            {previous ? (
              <Link href={prefix + chapterPath(slug, previous.id)}>
                <span>
                  <ArrowLeft size={14} aria-hidden="true" /> 上一节
                </span>
                <strong>{previous.title}</strong>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={prefix + chapterPath(slug, next.id)}>
                <span>
                  下一节 <ArrowRight size={14} aria-hidden="true" />
                </span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <Link href={prefix + "/learning#courses"}>
                <span>
                  回到目录 <ArrowRight size={14} aria-hidden="true" />
                </span>
                <strong>继续探索另一门课程</strong>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
