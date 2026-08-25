import {
  ArrowDown,
  Binary,
  BookOpenCheck,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { LeanAiTutorialReader } from "@/components/tutorial/vscode-tutorial-reader";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return constructMetadata({
    title: isEnglish
      ? "Lean for AI4Math and AI4TCS"
      : "Lean × AI4Math / AI4TCS 自学教程",
    description: isEnglish
      ? "A guided Lean 4 and mathlib curriculum that branches into verifiable AI4Math and AI4TCS projects."
      : "从 Lean 4 与 mathlib 共同基础出发，分流到可验证的 AI4Math 与 AI4TCS 小项目。",
    path: "/tutorials/lean-ai4math-ai4tcs",
    locale: locale as Locale,
  });
}

export default async function LeanAiTutorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const tutorialsHref = isEnglish ? "/en/tutorials" : "/tutorials";

  return (
    <main className="tutorial-page lean-ai-tutorial-page">
      <nav
        className="tutorial-breadcrumbs"
        aria-label={isEnglish ? "Tutorial hierarchy" : "教程层级"}
      >
        <Link href={tutorialsHref}>{isEnglish ? "Tutorials" : "教程中心"}</Link>
        <span>/</span>
        <span>{isEnglish ? "Formal methods and AI" : "形式化方法与 AI"}</span>
        <span>/</span>
        <b>Lean × AI4Math / AI4TCS</b>
      </nav>

      <section className="tutorial-hero lean-ai-hero">
        <div>
          <p className="academic-kicker">
            FORMAL METHODS · {isEnglish ? "SELF-STUDY STUDIO" : "可验证自学课"}
          </p>
          <h1>
            {isEnglish
              ? "Learn Lean once, then branch into mathematics or algorithms"
              : "先学共同的 Lean，再分流到数学与算法"}
          </h1>
          <p>
            {isEnglish
              ? "A six-week, evidence-aware path through Lean 4 and mathlib, with separate AI4Math and AI4TCS branches and one auditable final project."
              : "一条约六周、重视证据边界的 Lean 4 与 mathlib 路线；完成共同基础后，可进入 AI4Math 或 AI4TCS 支线，并用一个可审计小项目收束。"}
          </p>
          <a href="#reader">
            {isEnglish ? "Enter the course" : "进入课程"}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>

        <aside>
          <div>
            <BookOpenCheck aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Shared foundation" : "共同基础"}</b>
              <small>Lean 4 · mathlib · proof state</small>
            </span>
          </div>
          <div>
            <GitBranch aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Two branches" : "双支线"}</b>
              <small>AI4Math / AI4TCS</small>
            </span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Evidence first" : "证据优先"}</b>
              <small>kernel · tests · semantic audit</small>
            </span>
          </div>
        </aside>
      </section>

      <div
        className="tutorial-sequence lean-course-sequence"
        aria-label={isEnglish ? "Course structure" : "课程结构"}
      >
        <span>{isEnglish ? "Model the claim" : "澄清命题"}</span>
        <i>→</i>
        <span>{isEnglish ? "Write and inspect" : "编写与读状态"}</span>
        <i>→</i>
        <span>{isEnglish ? "Choose a branch" : "选择支线"}</span>
        <i>→</i>
        <span>{isEnglish ? "Ship evidence" : "交付证据"}</span>
      </div>

      <section className="lean-curriculum-map" aria-labelledby="lean-map-title">
        <header>
          <p className="academic-kicker">CURRICULUM MAP · 2 + 2 + 2 WEEKS</p>
          <h2 id="lean-map-title">
            {isEnglish
              ? "One trunk, two branches, one research-shaped finish"
              : "一条主干、两条支线、一个研究式收尾"}
          </h2>
        </header>
        <div>
          <article>
            <span>01 · CORE</span>
            <Binary aria-hidden="true" />
            <h3>{isEnglish ? "Lean foundation" : "Lean 共同基础"}</h3>
            <p>
              {isEnglish
                ? "Projects, expressions, propositions-as-types, tactics, induction, mathlib search, and debugging."
                : "项目环境、命题即类型、tactic、归纳、mathlib 检索与失败调试。"}
            </p>
          </article>
          <article>
            <span>02A · MATH</span>
            <span className="lean-track-mark">∀</span>
            <h3>AI4Math</h3>
            <p>
              {isEnglish
                ? "Formal theorem proving, autoformalization, proof repair, retrieval, and semantic fidelity."
                : "形式定理证明、自动形式化、proof repair、检索与语义忠实。"}
            </p>
          </article>
          <article>
            <span>02B · TCS</span>
            <span className="lean-track-mark">{`{ }`}</span>
            <h3>AI4TCS</h3>
            <p>
              {isEnglish
                ? "Algorithm invariants, finite randomness, layered verifiers, hidden tests, and complexity boundaries."
                : "算法不变量、有限随机性、分层 verifier、隐藏测试与复杂度边界。"}
            </p>
          </article>
        </div>
      </section>

      <LeanAiTutorialReader isEnglish={isEnglish} />

      <section className="lean-evidence-ladder" aria-labelledby="lean-evidence-title">
        <header>
          <p className="academic-kicker">EVIDENCE LADDER · CLAIM DISCIPLINE</p>
          <h2 id="lean-evidence-title">
            {isEnglish
              ? "Five checks, five different claims"
              : "五层检查，对应五种不同结论"}
          </h2>
          <p>
            {isEnglish
              ? "Do not let evidence from one layer silently stand in for the next."
              : "任何一层的成功，都不能悄悄替代下一层的证据。"}
          </p>
        </header>
        <div>
          <article>
            <span>01</span>
            <h3>{isEnglish ? "Well-formed object" : "对象可表达"}</h3>
            <p>
              {isEnglish
                ? "The code parses, types align, and the candidate obeys its interface."
                : "代码可解析、类型匹配，候选满足接口。"}
            </p>
            <small>{isEnglish ? "Parser · type checker" : "Parser · type checker"}</small>
          </article>
          <article>
            <span>02</span>
            <h3>{isEnglish ? "Observed behavior" : "观察到的行为"}</h3>
            <p>
              {isEnglish
                ? "Finite enumeration or tests find no counterexample within a stated scope."
                : "有限穷举或测试在声明范围内没有找到反例。"}
            </p>
            <small>{isEnglish ? "Tests · enumeration" : "Tests · enumeration"}</small>
          </article>
          <article>
            <span>03</span>
            <h3>{isEnglish ? "Formal theorem" : "形式 theorem"}</h3>
            <p>
              {isEnglish
                ? "A proof term establishes the exact Lean statement in a fixed environment."
                : "proof term 在固定环境中证明精确的 Lean statement。"}
            </p>
            <small>Lean kernel · SMT certificate</small>
          </article>
          <article>
            <span>04</span>
            <h3>{isEnglish ? "Faithful meaning" : "语义忠实"}</h3>
            <p>
              {isEnglish
                ? "The formal statement preserves the intended natural-language problem and assumptions."
                : "形式 statement 忠实保留自然语言问题与假设。"}
            </p>
            <small>{isEnglish ? "Alignment · counterexamples" : "对齐表 · 反例"}</small>
          </article>
          <article>
            <span>05</span>
            <h3>{isEnglish ? "Research contribution" : "研究贡献"}</h3>
            <p>
              {isEnglish
                ? "Novelty, generality, complexity, usefulness, and relation to prior work are reviewed."
                : "审查新颖性、一般性、复杂度、用途及与已有工作的关系。"}
            </p>
            <small>{isEnglish ? "Literature · human review" : "文献核验 · 人类审查"}</small>
          </article>
        </div>
      </section>

      <section className="lean-course-finish" aria-labelledby="lean-finish-title">
        <div>
          <p className="academic-kicker">SIX-WEEK PACE · 3 × 25 MIN / WEEK</p>
          <h2 id="lean-finish-title">
            {isEnglish
              ? "A finish line that produces evidence, not a reading streak"
              : "终点不是连续阅读，而是留下可复核证据"}
          </h2>
          <p>
            {isEnglish
              ? "Each week keeps the loop small: one concept, one executable or formal artifact, and one written boundary."
              : "每周只维持一个小循环：一个概念、一个可运行或可形式检查的产物，以及一条书面边界。"}
          </p>
        </div>
        <ol>
          <li>
            <span>W01</span>
            <b>{isEnglish ? "Lean model and project" : "Lean 模型与项目"}</b>
            <p>{isEnglish ? "Kernel boundary, official setup, first build." : "kernel 边界、官方环境、第一次 build。"}</p>
          </li>
          <li>
            <span>W02</span>
            <b>{isEnglish ? "Proof literacy" : "证明读写能力"}</b>
            <p>{isEnglish ? "Ten theorems, induction, mathlib search, one failure trace." : "十条 theorem、归纳、mathlib 检索、一份失败轨迹。"}</p>
          </li>
          <li>
            <span>W03</span>
            <b>{isEnglish ? "Branch concepts" : "支线核心概念"}</b>
            <p>{isEnglish ? "Statement fidelity or algorithm object and invariants." : "statement fidelity，或算法对象与不变量。"}</p>
          </li>
          <li>
            <span>W04</span>
            <b>{isEnglish ? "Verifier protocol" : "Verifier 协议"}</b>
            <p>{isEnglish ? "Freeze the environment, edit scope, splits, and budgets." : "冻结环境、可编辑范围、数据划分与预算。"}</p>
          </li>
          <li>
            <span>W05</span>
            <b>{isEnglish ? "Run the small study" : "运行小型研究"}</b>
            <p>{isEnglish ? "Baselines, candidates, hidden variants, and counterexamples." : "baseline、候选、hidden variants 与反例。"}</p>
          </li>
          <li>
            <span>W06</span>
            <b>{isEnglish ? "Audit and publish" : "审计与整理"}</b>
            <p>{isEnglish ? "Clean build, evidence register, failure analysis, stop decision." : "干净构建、证据表、失败分析与停止判断。"}</p>
          </li>
        </ol>
      </section>

      <section className="tutorial-scope lean-source-scope">
        <p className="academic-kicker">
          SOURCE SCOPE · {isEnglish ? "MATERIAL AND VERSION BOUNDARY" : "资料与版本边界"}
        </p>
        <h2>
          {isEnglish
            ? "Built from the supplied course material, corrected at the moving edges"
            : "主体来自现有讲义，变化较快的边缘按官方资料校正"}
        </h2>
        <div>
          <article>
            <b>{isEnglish ? "Material actually used" : "实际使用的资料"}</b>
            <p>
              {isEnglish
                ? "The supplied AI4Math/AI4TCS research map, Lean Markdown notes, modular LaTeX chapters, exercises, and project briefs were readable and reorganized. The duplicate PDFs were not uploaded to the site."
                : "AI4Math/AI4TCS 研究地图、Lean Markdown、分章 LaTeX、习题与项目说明均可读并已重组；内容重复的 PDF 没有上传到网站。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Official check" : "官方复核"}</b>
            <p>
              {isEnglish
                ? "On 25 August 2026, setup and project commands were checked against the current Lean install guide and mathlib project documentation. Version numbers are intentionally not hard-coded into the course."
                : "环境与项目命令于 2026 年 8 月 25 日按 Lean 安装页及 mathlib 项目文档复核；教程刻意不写死会快速变化的版本号。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Execution boundary" : "执行边界"}</b>
            <p>
              {isEnglish
                ? "The page explains and copies commands but does not run installers, create Lean projects, download mathlib, execute proofs, or invoke any model."
                : "网页只解释并提供复制，不会运行安装器、创建 Lean 项目、下载 mathlib、执行证明或调用任何模型。"}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
