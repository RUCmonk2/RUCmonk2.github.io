import { readFile } from "node:fs/promises";
import path from "node:path";

import { ArrowLeft, ArrowRight, Network } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12LessonReader } from "@/components/k12/k12-lesson-reader";
import { K12Shell } from "@/components/k12/k12-shell";
import type { Lesson } from "@/components/math-map/lesson-reader";
import {
  k12Domains,
  k12LessonHref,
  k12LevelLabel,
  k12Stages,
  k12Topic,
  k12Topics,
} from "@/data/k12";
import { constructMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string; id: string }> };
export function generateStaticParams() {
  return k12Topics.map((topic) => ({ id: topic.id }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const topic = k12Topic(id);
  if (!topic) notFound();
  return constructMetadata({
    title: topic.title + " · 中小学数学",
    description: topic.goal,
    path: k12LessonHref(id),
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  const topic = k12Topic(id);
  if (!topic) notFound();
  const language = locale === "en" ? "en" : "zh",
    prefix = language === "en" ? "/en" : "";
  const lesson: Lesson = JSON.parse(
    await readFile(
      path.join(process.cwd(), "public/assets/k12-lessons/zh", id + ".json"),
      "utf8",
    ),
  );
  const stage = k12Stages.find((item) => item.id === topic.stage)!;
  const peers = k12Topics.filter(
      (item) => item.stage === topic.stage && item.domain === topic.domain,
    ),
    index = peers.findIndex((item) => item.id === id);
  const previous = peers[index - 1],
    next = peers[index + 1];
  return (
    <K12Shell locale={language} active={topic.stage}>
      <div className="k12-reader-layout">
        <aside className="k12-reader-sidebar">
          <h2>{stage.title}</h2>
          <p>{k12Domains[topic.domain].title}</p>
          <nav aria-label="本主题讲义">
            {peers.map((item) => (
              <Link
                key={item.id}
                href={prefix + k12LessonHref(item.id)}
                aria-current={item.id === id ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Link
            className="notes-back"
            href={prefix + "/learning/k12/" + topic.stage + "#" + id}
          >
            <Network size={14} />
            回到知识网
          </Link>
        </aside>
        <div className="reader-main">
          <details className="reader-mobile-nav">
            <summary>本主题目录 · {k12Domains[topic.domain].title}</summary>
            <nav aria-label="手机讲义目录">
              {peers.map((item) => (
                <Link
                  key={item.id}
                  href={prefix + k12LessonHref(item.id)}
                  aria-current={item.id === id ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </details>
          <article className="note-article" lang="zh">
            <header className="note-header">
              <div className="note-eyebrow">
                <span>
                  {stage.title} / {k12Domains[topic.domain].title}
                </span>
                <span>{k12LevelLabel[topic.level]}</span>
              </div>
              <h1>{topic.title}</h1>
              <p>{topic.goal}。</p>
            </header>
            <section className="k12-preparation" aria-label="学习准备">
              <h2>学之前，先看看</h2>
              {topic.prerequisites.length ? (
                <ul>
                  {topic.prerequisites.map((prereq) => (
                    <li key={prereq}>
                      <Link href={prefix + k12LessonHref(prereq)}>
                        {k12Topic(prereq)!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  可从这一节开始。准备纸笔，必要时用积木、纸片或尺子帮助理解。
                </p>
              )}
              <p>
                学会的标志：能说明本节方法为什么成立，独立完成练习，并检查答案是否符合题意。
              </p>
            </section>
            <K12LessonReader lesson={lesson} id={id} />
          </article>
          <nav className="reader-pagination" aria-label="讲义前后页">
            {previous && (
              <Link href={prefix + k12LessonHref(previous.id)}>
                <span>
                  <ArrowLeft size={14} />
                  同主题上一节
                </span>
                <strong>{previous.title}</strong>
              </Link>
            )}
            {next && (
              <Link href={prefix + k12LessonHref(next.id)}>
                <span>
                  同主题下一节
                  <ArrowRight size={14} />
                </span>
                <strong>{next.title}</strong>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </K12Shell>
  );
}
