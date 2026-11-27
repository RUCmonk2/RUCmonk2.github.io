import { readFile } from "node:fs/promises";
import path from "node:path";

import katex from "katex";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import {
  chapterPage,
  handoutAssets,
  handoutTitles,
  lessonForPage,
  unitId,
} from "@/data/lean-lab/handout";
import { lessonNotes } from "@/data/lean-lab/lessons";
import type { LearningLocale } from "@/data/learning/types";

import { CopyCode, HandoutNavigation } from "./handout-navigation";
import s from "./handout-reader.module.css";

function ProofDiagram() {
  return (
    <figure className={s.diagram}>
      <figcaption>插入排序的证明依赖</figcaption>
      <div className={s.proofGrid} aria-hidden="true">
        <code>insert_perm</code>
        <i>→</i>
        <code>insert_ordered</code>
        <i>↓</i>
        <span />
        <i>↓</i>
        <code>sortFrom_perm</code>
        <span />
        <code>sortFrom_ordered</code>
        <i>↘</i>
        <span />
        <i>↙</i>
        <code className={s.finalNode}>insertionSort_correct</code>
      </div>
      <p className="sr-only">
        insert_perm 推出 insert_ordered，也用于证明
        sortFrom_perm。insert_ordered 用于证明 sortFrom_ordered。最后两个
        sortFrom 引理一起证明 insertionSort_correct。
      </p>
    </figure>
  );
}

function LeanTokens({ text }: { text: string }) {
  return text
    .split(
      /(#[A-Za-z]+|\b(?:theorem|def|example|by|intro|exact|constructor|change|induction|generalizing|with|cases|simp|simpa|using|have|fun|if|then|else|let|rw|rfl|omega|grind|obtain|apply|where|return|for|in|do|Nat|Int|Bool|List|Prop|Option)\b|⊢|→|↔|:=)/u,
    )
    .map((token, i) =>
      i % 2 ? (
        <span key={i} className={s.token}>
          {token}
        </span>
      ) : (
        token
      ),
    );
}

function Equation({
  tex,
  display = false,
}: {
  tex: string;
  display?: boolean;
}) {
  const Tag = display ? "div" : "span";
  // Browser math tools may annotate the static KaTeX markup before hydration.
  return (
    <Tag
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: display,
          strict: "ignore",
          throwOnError: true,
        }),
      }}
    />
  );
}

function Prose({
  text,
  english,
  standalone,
}: {
  text: string;
  english: boolean;
  standalone: boolean;
}) {
  const Subheading = standalone ? "h3" : "h4";
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        code: ({ children, className }) =>
          className?.split(" ").includes("math-inline") ? (
            <Equation tex={String(children)} />
          ) : (
            <code className={className}>{children}</code>
          ),
        h3: ({ children }) => <Subheading>{children}</Subheading>,
        table: ({ children }) => (
          <div
            className={s.tableWrap}
            tabIndex={0}
            role="region"
            aria-label="讲义表格"
          >
            <table>{children}</table>
          </div>
        ),
        pre: ({ node }) => {
          const code = node?.children[0];
          if (!code || code.type !== "element" || code.tagName !== "code")
            throw new Error("Expected fenced code in Lean handout");
          const value = code.children
            .map((child) => (child.type === "text" ? child.value : ""))
            .join("")
            .replace(/\n$/, "");
          if (
            Array.isArray(code.properties.className) &&
            code.properties.className.includes("math-display")
          )
            return <Equation tex={value} display />;
          const lean =
            Array.isArray(code.properties.className) &&
            code.properties.className.includes("language-lean");
          const label = lean
            ? "Lean 4"
            : value.includes("⊢")
              ? "证明状态"
              : "伪代码";
          return (
            <figure className={s.listing}>
              <figcaption>
                <span>{label}</span>
                <CopyCode english={english} />
              </figcaption>
              <pre tabIndex={0}>
                <code>{lean ? <LeanTokens text={value} /> : value}</code>
              </pre>
            </figure>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export async function HandoutReader({
  locale,
  standalone = true,
}: {
  locale: LearningLocale;
  standalone?: boolean;
}) {
  const english = locale === "en";
  const t = (zh: string, en: string) => (english ? en : zh);
  const labPath = (english ? "/en" : "") + "/learning/lean-lab/";
  const raw = await readFile(
    path.join(process.cwd(), "content/handouts/lean/lean.zh.md"),
    "utf8",
  );
  const parts = raw.split(/^## (\d+) \| ([^\n]+)$/m);
  const sections = [];
  for (let i = 1; i < parts.length; i += 3) {
    const number = Number(parts[i]),
      title = parts[i + 1],
      text = parts[i + 2].trim();
    if (number !== sections.length + 1 || !text)
      throw new Error("Invalid Lean handout section " + number);
    sections.push({ number, title, text });
  }
  if (sections.length !== handoutTitles.length)
    throw new Error("Missing Lean handout sections");
  const titles = sections.map(({ number, title }) => {
    const chapter = chapterPage(number);
    return chapter ? chapter.exercise + " · " + title : title;
  });
  const Heading = standalone ? "h1" : "h2";
  const SectionHeading = standalone ? "h2" : "h3";
  const article = (
    <article
      lang="zh-CN"
      id="lean-handout"
      className={s.article}
      data-embedded={standalone ? undefined : true}
    >
      <header className={s.masthead}>
        {standalone ? (
          <a className={s.back} href={labPath}>
            <ArrowLeft size={15} aria-hidden />
            {t("Lean 实验室", "Lean Lab")}
          </a>
        ) : (
          <a className={s.back} href={labPath + "handout/"}>
            {t("单独阅读讲义", "Open the study notes")}{" "}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
        <div className={s.mastGrid}>
          <div>
            <div className={s.edition}>
              Lean 4.28.0 <span>/</span> {t("自学讲义", "Chinese study notes")}
            </div>
            <Heading>
              从第一行 <em>Lean</em>
              <br />
              到算法正确性
            </Heading>
            <p className={s.lede}>
              从一个合取命题开始，学会读假设和目标，再动手验证《算法导论》第四版第
              2 章。
            </p>
          </div>
          <figure className={s.proofCard}>
            <figcaption>交换合取的顺序</figcaption>
            <div className={s.premise}>
              <span>已知</span>
              <code>h : P ∧ Q</code>
            </div>
            <div className={s.projections}>
              <code>h.right : Q</code>
              <code>h.left : P</code>
            </div>
            <div className={s.conclusion}>
              <span>结论</span>
              <code>Q ∧ P</code>
            </div>
            <a href="#unit-3">
              读这段证明 <ArrowRight size={14} aria-hidden />
            </a>
          </figure>
        </div>
      </header>
      <div className={s.layout}>
        <HandoutNavigation
          english={english}
          titles={titles}
          standalone={standalone}
        />
        <div className={s.column}>
          {sections.map(({ number, title, text }) => {
            const chapter = chapterPage(number),
              lesson = lessonForPage(number);
            return (
              <section key={number} id={unitId(number)} className={s.unit}>
                <div className={s.locator}>
                  第 {number} 节{" "}
                  {chapter && (
                    <>
                      <span>/</span>《算法导论》 {chapter.exercise}
                    </>
                  )}
                </div>
                <SectionHeading>{title}</SectionHeading>
                <div className={s.prose}>
                  {text.split("{{sort-proof-diagram}}").map((part, index) => (
                    <div key={index}>
                      {index > 0 && <ProofDiagram />}
                      <Prose
                        text={part}
                        english={english}
                        standalone={standalone}
                      />
                    </div>
                  ))}
                </div>
                {(chapter || lesson || number === 19) && (
                  <footer className={s.unitLinks}>
                    {chapter && (
                      <>
                        <a
                          href={
                            "https://live.lean-lang.org/#url=" +
                            encodeURIComponent(
                              "https://yeyaozhi.eu.cc" +
                                handoutAssets +
                                "/" +
                                chapter.file,
                            )
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          在线运行本题 <ArrowUpRight size={14} aria-hidden />
                        </a>
                        <a href={handoutAssets + "/" + chapter.file} download>
                          {chapter.file} <Download size={13} aria-hidden />
                        </a>
                      </>
                    )}
                    {lesson && (
                      <a href={labPath + "?lesson=" + lesson + "#proof"}>
                        动手验证 · {lessonNotes[lesson].title[locale]}{" "}
                        <ArrowRight size={14} aria-hidden />
                      </a>
                    )}
                    {number === 19 && (
                      <a href={handoutAssets + "/Practice.lean"} download>
                        下载练习解答 <Download size={14} aria-hidden />
                      </a>
                    )}
                  </footer>
                )}
              </section>
            );
          })}
          <footer className={s.end}>
            <a href={handoutAssets + "/chapter-two-lean.zip"} download>
              下载第 2 章 Lean 源码包 <Download size={14} aria-hidden />
            </a>
            <a href="#lean-handout">回到开头 ↑</a>
          </footer>
        </div>
      </div>
    </article>
  );
  return standalone ? <main className={s.standalone}>{article}</main> : article;
}
