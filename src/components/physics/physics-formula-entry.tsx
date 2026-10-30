import Link from "next/link";

import { physicsFormulaHref } from "@/data/physics-formulas";
import { midtermHref } from "@/data/physics-midterm";

import styles from "./physics-formulas.module.css";

export function PhysicsFormulaEntry({ locale }: { locale: "zh" | "en" }) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <aside className={styles.entry} aria-label="功与能、静电场公式推导">
      <div>
        <span className="notes-overline">FOLLOW THE DERIVATION</span>
        <h2>从机械能到静电场，把公式接起来</h2>
        <p>
          先认符号与条件，再沿着前提逐步推导。16个概念与公式，配完整例题、易错辨析和自检。
        </p>
      </div>
      <Link className="k12-button" href={prefix + physicsFormulaHref}>
        进入公式推导图 ↗
      </Link>
    </aside>
  );
}

export function PhysicsMidtermEntry({ locale }: { locale: "zh" | "en" }) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <aside className={styles.entry} aria-label="必修三第九、十章期中复习">
      <div>
        <span className="notes-overline">MIDTERM / 120 MINUTES</span>
        <h2>期中前，把静电场的力与能串起来</h2>
        <p>
          人教版必修三第九、十章。开场诊断、四组例题与变式、两项互动实验，配教师横屏与学生
          A4 讲义。
        </p>
      </div>
      <Link className="k12-button" href={prefix + midtermHref}>
        进入期中复习专题 ↗
      </Link>
    </aside>
  );
}
