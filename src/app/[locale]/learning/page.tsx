import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { learningCourses, type LearningLocale } from "@/data/learning";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Course notes" : "课程笔记",
    description:
      "深度学习与机器人学的网页学习笔记，包含公式推导、手算例题与自测。",
    path: "/learning",
    locale: locale as Locale,
  });
}

function CourseDrawing({ robotics }: { robotics: boolean }) {
  return (
    <svg viewBox="0 0 460 160" fill="none" aria-hidden="true">
      <path d="M30 135H430M60 25V140" className="cover-guide" />
      {robotics ? (
        <>
          <path
            d="M103 132H171M120 132V112H152V132"
            className="cover-structure"
          />
          <path d="M136 112L223 49L316 87" className="cover-arm-shadow" />
          <path d="M136 112L223 49L316 87" className="cover-structure" />
          <path
            d="M316 87L336 68M316 87L329 110M336 68L350 73M329 110L343 115"
            className="cover-structure"
          />
          <circle cx="136" cy="112" r="9" className="cover-joint" />
          <circle cx="223" cy="49" r="9" className="cover-joint" />
          <circle cx="316" cy="87" r="7" className="cover-joint" />
          <path
            d="M136 87A25 25 0 0 1 160 104M199 67A30 30 0 0 1 250 60"
            className="cover-guide"
          />
          <path d="M370 104V79M357 91H382" className="cover-target" />
          <circle cx="370" cy="91" r="20" className="cover-guide" />
          <text x="357" y="138">
            p = f(q)
          </text>
        </>
      ) : (
        <>
          {[43, 80, 117].flatMap((y) =>
            [25, 62, 99, 136].map((nextY) => (
              <path
                key={y + "-" + nextY}
                d={"M115 " + y + "L232 " + nextY}
                className="cover-connection"
              />
            )),
          )}
          {[25, 62, 99, 136].flatMap((y) =>
            [53, 108].map((nextY) => (
              <path
                key={y + "-" + nextY}
                d={"M232 " + y + "L351 " + nextY}
                className="cover-connection"
              />
            )),
          )}
          {[43, 80, 117].map((y) => (
            <circle key={y} cx="115" cy={y} r="9" className="cover-node" />
          ))}
          {[25, 62, 99, 136].map((y) => (
            <circle
              key={y}
              cx="232"
              cy={y}
              r="9"
              className="cover-node cover-hidden"
            />
          ))}
          {[53, 108].map((y) => (
            <circle key={y} cx="351" cy={y} r="9" className="cover-node" />
          ))}
          <text x="65" y="85">
            x
          </text>
          <text x="386" y="85">
            ŷ
          </text>
        </>
      )}
    </svg>
  );
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

  return (
    <main className="notes-page notes-library">
      <div className="notes-library-shell">
        <Link className="notes-back" href={prefix || "/"}>
          <ArrowLeft size={14} aria-hidden="true" />
          {isEnglish ? "Back home" : "返回主页"}
        </Link>
        <header className="notes-library-heading">
          <div>
            <span className="notes-overline">
              {isEnglish ? "LEARNING / NOTES" : "学习 · 课程笔记"}
            </span>
            <h1>
              {isEnglish ? "Learn it, work it out." : "把知识，慢慢算明白。"}
            </h1>
          </div>
          <p>
            {isEnglish
              ? "Read a chapter, work through an example, then check your understanding. Notes are written in Chinese."
              : "读一节讲解，跟着算一个例子，再用自测检查理解。"}
          </p>
        </header>

        <section
          className="notes-course-grid"
          aria-label={isEnglish ? "Courses" : "课程"}
        >
          {learningCourses.map((course) => (
            <article
              className={"notes-course-card notes-" + course.slug}
              key={course.slug}
            >
              <Link
                href={prefix + "/learning/" + course.slug}
                className="notes-course-cover"
                aria-label={course.title[language]}
              >
                <span>
                  {course.slug === "deep-learning"
                    ? "DEEP LEARNING"
                    : "ROBOTICS"}
                </span>
                <CourseDrawing robotics={course.slug === "robotics"} />
              </Link>
              <div className="notes-course-copy">
                <div className="notes-course-meta">
                  <span>{course.scope[language]}</span>
                  <span>
                    {course.chapters.length} {isEnglish ? "chapters" : "节"}
                  </span>
                </div>
                <h2>
                  <Link href={prefix + "/learning/" + course.slug}>
                    {course.title[language]}
                  </Link>
                </h2>
                <p>{course.description[language]}</p>
                <Link
                  className="notes-read-link"
                  href={prefix + "/learning/" + course.slug}
                >
                  {isEnglish ? "Start reading" : "开始阅读"}{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="notes-questions">
          <h2>
            {isEnglish ? "Start with a question" : "也可以从一个问题开始"}
          </h2>
          <div>
            <Link href={prefix + "/learning/deep-learning/softmax"}>
              <span>{isEnglish ? "Deep learning" : "深度学习"}</span>
              <strong>Softmax 的梯度为什么是 p − y？</strong>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={prefix + "/learning/robotics/transforms"}>
              <span>{isEnglish ? "Robotics" : "机器人学"}</span>
              <strong>相机看到的坐标，怎样交给机械臂？</strong>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <p className="notes-library-footnote">
          {isEnglish
            ? "Personal study notes · worked examples and self-checks · updated September 25, 2026"
            : "个人学习笔记 · 含手算例题与自测 · 更新于 2026.09.25"}
        </p>
      </div>
    </main>
  );
}
