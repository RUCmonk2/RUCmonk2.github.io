import { ArrowDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type { Text } from "@/lib/math-lab/graph-algorithms";

export function NotebookPage({
  locale,
  title,
  description,
  children,
  jump,
}: {
  locale: string;
  title: Text;
  description: Text;
  children: ReactNode;
  jump?: { href: string; label: Text };
}) {
  const lang = locale === "en" ? "en" : "zh",
    english = lang === "en";
  return (
    <main className="math-lab algo-page">
      <div className="lab-shell">
        <Link
          className="lab-back"
          href={(english ? "/en" : "") + "/learning/math-lab/"}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {english ? "Mathematics Lab" : "数学实验室"}
        </Link>
        <header className="algo-intro">
          <h1>{title[lang]}</h1>
          <p>{description[lang]}</p>
          <a className="algo-skip" href={jump?.href ?? "#pseudocode"}>
            {jump?.label[lang] ??
              (english ? "Jump to the pseudocode" : "跳到伪代码")}
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </header>
        {children}
      </div>
    </main>
  );
}
