import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { MathMapGraph } from "@/components/math-map/math-map-graph";
import styles from "@/components/physics/physics-formulas.module.css";
import {
  physicsFormulaAtlas,
  physicsFormulaHref,
  physicsFormulaUpdated,
} from "@/data/physics-formulas";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; subject: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ subject: "physics" }];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, subject } = await params;
  if (subject !== "physics") notFound();
  return constructMetadata({
    title: "功与能 · 静电场公式推导图",
    description:
      "从运动学和做功走向机械能、静电场。逐行核对公式来源、符号、条件与完整例题。",
    path: physicsFormulaHref,
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale, subject } = await params;
  if (subject !== "physics") notFound();
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} section="subjects" active="physics">
      <div className={styles.page}>
        <header className="k12-hero k12-hero-compact">
          <span className="notes-overline">
            PHYSICS / FOLLOW THE DERIVATION
          </span>
          <h1>从功与能出发，读懂静电场</h1>
          <p>
            公式不是彼此孤立的结论。先认清物理量、对象与过程，再沿着前提看每一步为什么成立，最后带着适用条件回到题目。
          </p>
          <div className="k12-hero-meta">
            <span>{physicsFormulaAtlas.nodes.length} 个概念与公式</span>
            <span>定义 · 实验规律 · 推导结果 · 模型应用</span>
            <span>更新于 {physicsFormulaUpdated}</span>
          </div>
          <nav className="subject-stage-tabs" aria-label="物理学习入口">
            <Link href={prefix + "/learning/k12/subjects/physics"}>
              物理学习目录
            </Link>
            <Link
              href={
                prefix + "/learning/k12/subjects/physics/knowledge-map/high"
              }
            >
              高中主干知识网
            </Link>
            <a href="#mathmap-explorer">从公式图开始 ↓</a>
            <a href="#mathmap-routes">按学习路线读 ↓</a>
          </nav>
        </header>
        <details className={styles.notation}>
          <summary>先分清：场强 E 与能量 Eₖ，功与动能变化</summary>
          <p>
            场强用 E 或带方向的矢量符号，单位是 N/C 或 V/m；动能
            Eₖ、重力势能和电势能都保留下标，单位是
            J。每个节点都附自己的符号表，先读名称与单位，再代数值。
          </p>
          <p>
            总功给出的是动能变化，末动能还要加上初动能。判断守恒前，先说清准备计入哪几种能量；同一个力的功与对应势能变化不要重复记账。
          </p>
        </details>
        <MathMapGraph locale={language} atlas={physicsFormulaAtlas} />
        <section className={styles.scope}>
          <h2>怎样使用这张推导图</h2>
          <p>
            选择节点后，先看它是定义、实验规律还是推导结果；沿「推导前提」补齐基础，再打开完整讲解。逐步推导、例题和自检共用同一套公式与条件。「严谨表述」补充适用边界，涉及微积分的说明可按学习阶段选读。
          </p>
          <p>
            本专题覆盖运动、功与机械能到静电场的主要关系，电容与更后面的电磁学内容继续保留在主干知识网。讲解采用质点、固定静电场等模型，各公式的额外条件在对应节点中说明。
          </p>
        </section>
      </div>
    </K12Shell>
  );
}
