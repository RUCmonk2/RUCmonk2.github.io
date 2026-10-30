import Link from "next/link";

import { mockExamHref } from "@/data/physics-midterm/mock-exam";

import styles from "./physics-formulas.module.css";

export function MockExamEntry({ locale }: { locale: "zh" | "en" }) {
  return (
    <aside className={styles.entry} aria-label="90分钟静电场模拟卷">
      <div>
        <span className="notes-overline">MOCK EXAM / 90 MINUTES</span>
        <h2>串讲之后，独立做一套模拟卷</h2>
        <p>
          第九、十章 · 20 题 · 100 分 · 90
          分钟。原创北京风格模拟，配学生卷、教师解析与分步评分标准。
        </p>
      </div>
      <Link
        className="k12-button"
        href={(locale === "en" ? "/en" : "") + mockExamHref}
      >
        进入 90 分钟模拟卷 ↗
      </Link>
    </aside>
  );
}
