import Link from "next/link";

import { physicsFormulaHref } from "@/data/physics-formulas";

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
