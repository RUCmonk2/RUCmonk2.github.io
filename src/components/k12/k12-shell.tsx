import "@/app/[locale]/learning/learning.css";
import "@/app/[locale]/learning/math-map/math-map.css";
import "./k12.css";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { k12Stages } from "@/data/k12";

export function K12Shell({
  locale,
  children,
  active = "overview",
  section = "mathematics",
}: {
  locale: "zh" | "en";
  children: ReactNode;
  active?: string;
  section?: "mathematics" | "subjects";
}) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <main className="notes-page k12-page">
      <div className="reader-topbar">
        <Link href={prefix + "/learning#schools"} className="notes-back">
          <ArrowLeft size={14} />
          学习 · 中小学
        </Link>
        <nav className="reader-course-switch" aria-label="中小学学习导航">
          <Link
            href={prefix + "/learning/k12"}
            aria-current={
              section === "subjects" && active === "overview"
                ? "page"
                : undefined
            }
          >
            全科导航
          </Link>
          <Link
            href={prefix + "/learning/k12/mathematics"}
            aria-current={
              section === "mathematics" && active === "overview"
                ? "page"
                : undefined
            }
          >
            数学总览
          </Link>
          {section === "mathematics" &&
            k12Stages.map((stage) => (
              <Link
                key={stage.id}
                href={prefix + "/learning/k12/" + stage.id}
                aria-current={active === stage.id ? "page" : undefined}
              >
                {stage.title}
              </Link>
            ))}
          <Link
            href={prefix + "/learning/math-lab"}
            aria-current={active === "lab" ? "page" : undefined}
          >
            数学实验室
          </Link>
        </nav>
      </div>
      <div className="k12-shell">
        {locale === "en" && (
          <p className="course-map-language" lang="en">
            These school-learning guides and activities are written in Chinese
            for tutoring and independent study.
          </p>
        )}
        {children}
        <footer className="mathmap-footer">
          <span>中小学学习 · 理解、练习、再连接</span>
          <Link
            href={
              prefix +
              (section === "subjects"
                ? "/learning/k12/mathematics"
                : "/learning/math-map")
            }
          >
            {section === "subjects" ? "深入数学学习" : "走向高等数学"}{" "}
            <ArrowRight size={13} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
