import { ArrowRight, BookOpen, Clock3, Layers3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import {
  plannedTutorialCategories,
  tutorialCatalog,
} from "@/data/tutorials/catalog";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return constructMetadata({
    title: isEnglish ? "Tutorial library" : "教程与伴读",
    description: isEnglish
      ? "A growing, topic-based library of technical companions, learning workflows, and reproducible guides."
      : "按主题持续扩展的技术伴读、学习工作流与可复用指南目录。",
    path: "/tutorials",
    locale: locale as Locale,
  });
}

export default async function TutorialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const localeKey = isEnglish ? "en" : "zh";
  const prefix = isEnglish ? "/en" : "";
  const tutorialCount = tutorialCatalog.reduce(
    (total, category) => total + category.tutorials.length,
    0,
  );

  return (
    <main className="tutorial-library">
      <section className="tutorial-library-hero">
        <p>TUTORIAL LIBRARY · {isEnglish ? "GUIDED NOTES" : "分层目录"}</p>
        <h1>{isEnglish ? "Tutorials and companions" : "教程与伴读"}</h1>
        <span>
          {isEnglish
            ? "A growing library organized by subject rather than by a single tool. Each guide keeps context, action, and verification close together."
            : "这里不会只收录某一个软件的安装说明。教程按主题组织，让背景、操作与验证始终处在清晰的阅读层级中。"}
        </span>
        <div className="tutorial-library-stats">
          <div>
            <BookOpen aria-hidden="true" />
            <span>
              <b>{String(tutorialCount).padStart(2, "0")}</b>
              <small>{isEnglish ? "Published" : "已发布"}</small>
            </span>
          </div>
          <div>
            <Layers3 aria-hidden="true" />
            <span>
              <b>{String(tutorialCatalog.length).padStart(2, "0")}</b>
              <small>{isEnglish ? "Active topics" : "当前主题"}</small>
            </span>
          </div>
        </div>
      </section>

      <div className="tutorial-library-content">
        {tutorialCatalog.map((category) => (
          <section className="tutorial-category" key={category.slug}>
            <header>
              <span>{category.index}</span>
              <div>
                <h2>{category.title[localeKey]}</h2>
                <p>{category.description[localeKey]}</p>
              </div>
            </header>

            <div className="tutorial-catalog-list">
              {category.tutorials.map((tutorial) => (
                <Link
                  className="tutorial-catalog-card"
                  href={`${prefix}${tutorial.href}`}
                  key={tutorial.slug}
                >
                  <div className="tutorial-catalog-topline">
                    <span>{isEnglish ? "Published" : "已发布"}</span>
                    <ArrowRight aria-hidden="true" />
                  </div>
                  <h3>{tutorial.title[localeKey]}</h3>
                  <p>{tutorial.description[localeKey]}</p>
                  <footer>
                    <span>{tutorial.platforms.join(" / ")}</span>
                    <span>
                      <Clock3 aria-hidden="true" />
                      {tutorial.readingTime[localeKey]}
                    </span>
                  </footer>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="tutorial-planned">
          <div>
            <span>NEXT</span>
            <h2>{isEnglish ? "Reserved topic layers" : "后续主题层级"}</h2>
          </div>
          <p>
            {isEnglish
              ? "Future guides can enter the library as new categories without turning the navigation into a list of individual pages."
              : "后续教程会先归入主题，再进入具体页面；顶栏不会随着教程增加而堆满单页链接。"}
          </p>
          <div className="tutorial-planned-tags">
            {plannedTutorialCategories.map((category) => (
              <span key={category.en}>{category[localeKey]}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
