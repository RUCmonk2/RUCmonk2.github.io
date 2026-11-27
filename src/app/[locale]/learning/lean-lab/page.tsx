import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { HandoutReader } from "@/components/lean-lab/handout-reader";
import s from "@/components/lean-lab/lean-lab.module.css";
import { Workbench } from "@/components/lean-lab/workbench";
import { lessonNotes } from "@/data/lean-lab/lessons";
import replays from "@/data/lean-lab/replays.json";
import { getLearningItem } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const item = getLearningItem("lean-lab");
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function LeanLabPage({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  const t = (zh: string, en: string) => (language === "en" ? en : zh);
  const sourceDir = path.join(process.cwd(), "public", "assets", "lean-lab");
  const proofs = Object.entries(replays.lessons);
  for (const [id, proof] of proofs) {
    const notes = lessonNotes[id as keyof typeof lessonNotes];
    if (
      !notes ||
      proof.steps.length !== Object.keys(notes.steps).length ||
      proof.steps.some((frame) => !(frame.id in notes.steps))
    ) {
      throw new Error("Lean lesson notes and replay must match: " + id);
    }
  }
  const sources = Object.fromEntries(
    await Promise.all(
      Object.keys(replays.hashes).map(async (file) => [
        file,
        await readFile(path.join(sourceDir, file), "utf8"),
      ]),
    ),
  );

  return (
    <main className={s.page}>
      <div className={s.shell}>
        <nav className={s.breadcrumb} aria-label={t("当前位置", "Breadcrumb")}>
          <Link href={prefix + "/learning"}>
            <ArrowLeft size={15} aria-hidden="true" />{" "}
            {t("学习目录", "Learning")}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{t("Lean 实验室", "Lean Lab")}</span>
        </nav>

        <header className={s.hero}>
          <div>
            <h1>{t("Lean 实验室", "Lean Lab")}</h1>
            <p>
              {t(
                "从纸上的「已知」和「待证」读起，逐行运行 Lean，再跟着手算例子完成《算法导论》第四版第 2 章。",
                "Read Lean code alongside proof states, then work through the exercises and problems of CLRS chapter 2 in the Chinese handout.",
              )}
            </p>
            <div className={s.heroActions}>
              <a href="#lean-handout" className={s.primary}>
                <BookOpen size={17} aria-hidden="true" />{" "}
                {t("阅读自学讲义", "Read handout (Chinese)")}
              </a>
              <a href="#proof" className={s.secondary}>
                {t("开始读证明", "Start proving")}{" "}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a href="#clrs" className={s.secondary}>
                <BookOpen size={17} aria-hidden="true" />{" "}
                {t("查《算法导论》", "Browse CLRS")}
              </a>
            </div>
          </div>
          <a
            href="#proof"
            className={s.heroExample}
            aria-label={t(
              "进入第一课：交换合取顺序",
              "Start lesson one: swap a conjunction",
            )}
          >
            <div>
              <span>{t("已知", "Given")}</span>
              <code>h : P ∧ Q</code>
            </div>
            <div>
              <span>{t("待证", "Goal")}</span>
              <code>
                <b>⊢</b> Q ∧ P
              </code>
            </div>
            <div className={s.heroExampleFoot}>
              <span>
                {t(
                  "能从 h 里取出哪两个证明？",
                  "Which two proofs can you take out of h?",
                )}
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </div>
          </a>
        </header>

        <section className={s.concepts} aria-labelledby="concept-heading">
          <h2 id="concept-heading">
            {t("读懂这个窗口", "Read the proof window")}
          </h2>
          <dl>
            <div>
              <dt>
                <code>Prop</code>
              </dt>
              <dd>
                {t(
                  "命题的类型。要证明 P，就要给出一个类型为 P 的项。",
                  "The type of propositions. To prove P, give a term of type P.",
                )}
              </dd>
            </div>
            <div>
              <dt>
                <code>⊢</code> {t("目标", "goal")}
              </dt>
              <dd>
                {t(
                  "上面是当前能用的变量和假设，⊢ 后面是当前还要证明的式子。",
                  "The context above lists available variables and assumptions. The expression after ⊢ is the current target.",
                )}
              </dd>
            </div>
            <div>
              <dt>
                <code>tactic</code> {t("策略", "step")}
              </dt>
              <dd>
                {t(
                  "例如 intro 引入假设，constructor 拆目标，exact 交出已有证明。",
                  "For example, intro introduces an assumption, constructor splits a goal, and exact supplies a proof.",
                )}
              </dd>
            </div>
            <div>
              <dt>{t("内核检查", "Kernel check")}</dt>
              <dd>
                {t(
                  "策略构造证明项，Lean 内核检查它的类型是否就是定理。下面回放的是编译时捕获的真实状态。",
                  "Tactics build proof terms and Lean's kernel checks them against the theorem. The replay below uses states captured during compilation.",
                )}
              </dd>
            </div>
          </dl>
        </section>

        <Workbench
          locale={language}
          toolchain={replays.toolchain}
          replays={replays.lessons}
          samples={replays.samples}
          sources={sources}
        />

        <HandoutReader locale={language} standalone={false} />

        <footer className={s.footer}>
          <Link href={prefix + "/tutorials/lean-ai4math-ai4tcs"}>
            {t(
              "Lean × AI4Math / AI4TCS 自学路线",
              "Lean × AI4Math / AI4TCS study route",
            )}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href="https://lean-lang.org/theorem_proving_in_lean4/"
            target="_blank"
            rel="noreferrer"
          >
            {t("Lean 官方证明教程", "Official Lean proof tutorial")}{" "}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </main>
  );
}
