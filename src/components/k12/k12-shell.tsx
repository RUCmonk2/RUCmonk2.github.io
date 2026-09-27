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
}: {
  locale: "zh" | "en";
  children: ReactNode;
  active?: string;
}) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <main className="notes-page k12-page">
      <div className="reader-topbar">
        <Link href={prefix + "/learning#mathematics"} className="notes-back">
          <ArrowLeft size={14} />
          学习 · 数学探索
        </Link>
        <nav className="reader-course-switch" aria-label="数学学习导航">
          <Link
            href={prefix + "/learning/k12"}
            aria-current={active === "overview" ? "page" : undefined}
          >
            学习总览
          </Link>
          {k12Stages.map((stage) => (
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
            These school-mathematics lessons and activities are written in
            Chinese for tutoring and independent study.
          </p>
        )}
        {children}
        <footer className="mathmap-footer">
          <span>中小学数学 · 理解、练习、再连接</span>
          <Link href={prefix + "/learning/math-map"}>
            走向高等数学 <ArrowRight size={13} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
