import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { CourseDrawing } from "@/components/learning/course-drawing";
import { learningCourses, type LearningLocale } from "@/data/learning";
import {
  learningCatalog,
  learningCategories,
  learningItemHref,
} from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Learning" : "学习",
    description:
      locale === "en"
        ? "Course notes and practical guides, together in one learning directory."
        : "按课程打基础，围绕具体问题动手实践。课程笔记、代码伴读与技术指南的统一目录。",
    path: "/learning",
    locale: locale as Locale,
  });
}

export default async function LearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language: LearningLocale = locale === "en" ? "en" : "zh";
  const isEnglish = language === "en";
  const prefix = isEnglish ? "/en" : "";
  const courses = learningCatalog.filter((item) => item.category === "course");
  const guides = learningCatalog.filter((item) => item.category === "guide");

  return (
    <main className="notes-page notes-library">
      <div className="notes-library-shell">
        <Link className="notes-back" href={prefix || "/"}>
          <ArrowLeft size={14} aria-hidden="true" />
          {isEnglish ? "Back home" : "返回主页"}
        </Link>
        <header className="notes-library-heading">
          <div>
            <span className="notes-overline">A PERSONAL STUDY / LEARNING</span>
            <h1>
              {isEnglish
                ? "Learn, then put it into practice."
                : "学习，也动手实践。"}
            </h1>
          </div>
          <p>
            {isEnglish
              ? "Follow a course to build foundations, or a practical guide to work through a specific task."
              : "沿着课程打基础，也围绕一个具体问题，逐步理解、动手和验证。"}
          </p>
        </header>
        <nav
          className="learning-jump-links"
          aria-label={isEnglish ? "Learning categories" : "学习分类"}
        >
          {learningCategories.map((category) => (
            <a href={"#" + category.anchor} key={category.id}>
              {category.title[language]}
              <span>
                {String(
                  learningCatalog.filter(
                    (item) => item.category === category.id,
                  ).length,
                ).padStart(2, "0")}
              </span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          ))}
        </nav>

        <section
          className="learning-section"
          id="courses"
          aria-labelledby="courses-title"
        >
          <header className="learning-section-heading">
            <div>
              <span>01 / COURSES</span>
              <h2 id="courses-title">{isEnglish ? "Courses" : "课程学习"}</h2>
            </div>
            <p>
              {isEnglish
                ? "Read, calculate, and check your understanding."
                : "按章节阅读，用例题与练习检查理解。"}
            </p>
          </header>
          <div className="notes-course-grid">
            {courses.map((course) => {
              const chapterCount = learningCourses.find(
                (item) => item.slug === course.id,
              )?.chapters.length;
              const href = learningItemHref(course, language);
              return (
                <article
                  className={"notes-course-card notes-" + course.id}
                  key={course.id}
                >
                  <Link
                    href={href}
                    className="notes-course-cover"
                    aria-label={course.title[language]}
                  >
                    <span>{course.topic[language]}</span>
                    <CourseDrawing kind={course.id} />
                  </Link>
                  <div className="notes-course-copy">
                    <div className="notes-course-meta">
                      <span>{course.scope[language]}</span>
                      {chapterCount && (
                        <span>
                          {chapterCount} {isEnglish ? "chapters" : "节"}
                        </span>
                      )}
                    </div>
                    <h3>
                      <Link href={href}>{course.title[language]}</Link>
                    </h3>
                    <p>{course.description[language]}</p>
                    <div className="learning-card-footer">
                      <Link className="notes-read-link" href={href}>
                        {isEnglish ? "Start reading" : "开始阅读"}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      <time dateTime={course.updated}>
                        {course.updated.replaceAll("-", ".")}
                      </time>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="learning-section"
          id="guides"
          aria-labelledby="guides-title"
        >
          <header className="learning-section-heading">
            <div>
              <span>02 / PRACTICE</span>
              <h2 id="guides-title">
                {isEnglish ? "Practical guides" : "实践指南"}
              </h2>
            </div>
            <p>
              {isEnglish
                ? "Start with a task. Work toward a result you can verify."
                : "从具体任务出发，走到可以验证的结果。"}
            </p>
          </header>
          <div className="learning-guide-grid">
            {guides.map((guide) => (
              <Link
                href={learningItemHref(guide, language)}
                className="learning-guide-card"
                key={guide.id}
              >
                <div className="learning-guide-topline">
                  <span>{guide.topic[language]}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </div>
                <h3>{guide.title[language]}</h3>
                <p>{guide.description[language]}</p>
                <div className="learning-guide-meta">
                  <span>{guide.scope[language]}</span>
                  <time dateTime={guide.updated}>
                    {guide.updated.replaceAll("-", ".")}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <p className="notes-library-footnote">
          {isEnglish
            ? "Dates reflect content updates. For reflections and progress notes, visit "
            : "日期为内容更新时间。随想与阶段记录，收在"}
          <Link href={prefix + "/blog"}>
            {isEnglish ? "Writing" : "「写作」"}
          </Link>
          {isEnglish ? "." : "。"}
        </p>
      </div>
    </main>
  );
}
