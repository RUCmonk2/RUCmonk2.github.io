import "@/app/[locale]/learning/learning.css";

import { ArrowLeft, ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { learningCatalog, learningItemHref } from "@/data/learning/catalog";
import type { LearningLocale } from "@/data/learning/types";

import { CourseViewSwitch } from "./course-view-switch";

export function CourseReader({
  locale,
  slug,
  title,
  sidebarMeta,
  contents,
  mobileLabel,
  courseHref,
  mapHref,
  children,
}: {
  locale: LearningLocale;
  slug: string;
  title: string;
  sidebarMeta: ReactNode;
  contents: ReactNode;
  mobileLabel: ReactNode;
  courseHref: string;
  mapHref: string;
  children: ReactNode;
}) {
  const en = locale === "en",
    prefix = en ? "/en" : "";
  return (
    <main className={"notes-page notes-" + slug}>
      <div className="reader-topbar">
        <Link href={prefix + "/learning"} className="notes-back">
          <ArrowLeft size={14} aria-hidden="true" />
          {en ? "Learning" : "学习"}
        </Link>
        <div
          className="reader-course-switch"
          aria-label={en ? "Switch course" : "切换课程"}
        >
          {learningCatalog
            .filter((item) => item.category === "course")
            .map((item) => (
              <Link
                key={item.id}
                href={learningItemHref(item, locale)}
                aria-current={slug === item.id ? "true" : undefined}
              >
                {item.title[locale]}
              </Link>
            ))}
        </div>
      </div>
      <div className="reader-layout">
        <aside className="reader-sidebar">
          <div className="reader-sidebar-heading">
            <BookOpen size={18} aria-hidden="true" />
            <h2>{title}</h2>
          </div>
          <p className="reader-sidebar-meta">{sidebarMeta}</p>
          {contents}
          <Link
            className="reader-all-courses"
            href={prefix + "/learning#courses"}
          >
            {en ? "All courses" : "全部课程"}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </aside>
        <div className="reader-main">
          <CourseViewSwitch
            locale={locale}
            courseHref={courseHref}
            mapHref={mapHref}
            active="notes"
          />
          <details className="reader-mobile-nav" key={courseHref}>
            <summary>
              <span>{mobileLabel}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            {contents}
          </details>
          {children}
        </div>
      </div>
    </main>
  );
}
