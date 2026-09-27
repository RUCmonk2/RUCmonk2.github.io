import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "next-intl";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CourseLab } from "@/components/learning/course-lab";
import { CourseReader } from "@/components/learning/course-reader";
import {
  chapterPath,
  type CourseSlug,
  getLearningCourse,
  type LearningLocale,
} from "@/data/learning";
import { constructMetadata } from "@/lib/metadata";

function NoteMarkdown({
  children,
  inline = false,
}: {
  children: string;
  inline?: boolean;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) =>
          inline ? <span>{children}</span> : <p>{children}</p>,
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
    <CourseReader
      locale={language}
      slug={slug}
      title={course.title[language]}
      sidebarMeta={
        <>
          {course.chapters.length}{" "}
          {isEnglish ? "chapters · Chinese notes" : "节笔记 · 按章节阅读"}
        </>
      }
      contents={contents}
      mobileLabel={
        <>
          {isEnglish ? "Contents" : "章节目录"} ·{" "}
          {String(index + 1).padStart(2, "0")} / {course.chapters.length}
        </>
      }
      courseHref={chapterPath(slug, chapter.id)}
      mapHref={`/learning/${slug}/knowledge-map#${slug}-${chapter.id}`}
    >
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
            <small lang="en">The course notes are written in Chinese.</small>
          )}
        </header>
        {chapter.figure && (
          <figure className="note-slide-figure">
            <a
              href={chapter.figure.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={chapter.figure.src}
                alt={chapter.figure.alt}
                loading="lazy"
              />
            </a>
            <figcaption>
              {chapter.figure.caption} <span>点击图片查看大图</span>
            </figcaption>
          </figure>
        )}
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
                <span>
                  <NoteMarkdown inline>{check.question}</NoteMarkdown>
                </span>
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
    </CourseReader>
  );
}
