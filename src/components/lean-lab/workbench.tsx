"use client";

import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CircleCheck,
  Download,
  ExternalLink,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  chapters,
  clrsBook,
  clrsRepository,
  clrsUpstream,
} from "@/data/lean-lab/chapters";
import {
  algorithms,
  basics,
  type LessonId,
  type LessonNotes,
  lessonNotes,
} from "@/data/lean-lab/lessons";
import type { LearningLocale } from "@/data/learning/types";

import s from "./lean-lab.module.css";

export type Replay = {
  file: string;
  lineNumbers: number[];
  code: string[];
  steps: { id: string; from: number; through: number; state: string }[];
};

type Sample = { input: number[]; prefixes: number[][] };

export function Workbench({
  locale,
  toolchain,
  replays,
  sources,
  samples,
}: {
  locale: LearningLocale;
  toolchain: string;
  replays: Record<LessonId, Replay>;
  sources: Record<string, string>;
  samples: Record<string, Sample>;
}) {
  const en = locale === "en";
  const t = (zh: string, english: string) => (en ? english : zh);
  const [lesson, setLesson] = useState<LessonId>("propositions");
  const groups = [
    { label: t("Lean 基础", "Lean basics"), ids: basics },
    {
      label: t("第 2 章 · 算法基础", "Chapter 2 · Getting started"),
      ids: algorithms,
    },
  ];

  return (
    <>
      <section id="proof" className={s.section} aria-labelledby="proof-heading">
        <div className={s.sectionHeading}>
          <div>
            <h2 id="proof-heading">
              {t("逐步读证明", "Read a proof step by step")}
            </h2>
            <p>
              {t(
                "选一课，点击代码或「下一步」，看假设和目标怎样变化。",
                "Pick a lesson. Click a line of code or Next to see how the assumptions and goals change.",
              )}
            </p>
          </div>
          <span className={s.checked}>
            <CircleCheck size={15} aria-hidden="true" /> Lean{" "}
            {toolchain.split(":v")[1]}
          </span>
        </div>
        <div className={s.workbench}>
          <nav className={s.lessons} aria-label={t("课程", "Lessons")}>
            {groups.map(({ label, ids }) => (
              <div className={s.lessonGroup} key={label}>
                <h3>{label}</h3>
                {ids.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLesson(id)}
                    aria-current={lesson === id ? "true" : undefined}
                  >
                    <span>{lessonNotes[id].title[locale]}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <label className={s.lessonSelect}>
            {t("选择课程", "Choose a lesson")}
            <select
              value={lesson}
              onChange={(event) => setLesson(event.target.value as LessonId)}
            >
              {groups.map(({ label, ids }) => (
                <optgroup key={label} label={label}>
                  {ids.map((id) => (
                    <option key={id} value={id}>
                      {lessonNotes[id].title[locale]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <ReplayPanel
            key={lesson}
            id={lesson}
            locale={locale}
            replay={replays[lesson]}
            source={sources[replays[lesson].file]}
            samples={samples}
          />
        </div>
      </section>
      <ChapterIndex locale={locale} onLesson={setLesson} />
    </>
  );
}

function ReplayPanel({
  id,
  locale,
  replay,
  source,
  samples,
}: {
  id: LessonId;
  locale: LearningLocale;
  replay: Replay;
  source: string;
  samples: Record<string, Sample>;
}) {
  const t = (zh: string, en: string) => (locale === "en" ? en : zh);
  const notes: LessonNotes = lessonNotes[id];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const frame = replay.steps[index];
  const reading = notes.steps[frame.id];
  const before = replay.steps[index - 1];
  const isDone = frame.state === "no goals";
  const question = notes.question;
  const previousInBranch = before && before.state !== "no goals";
  const online =
    "https://live.lean-lang.org/#code=" + encodeURIComponent(source);

  return (
    <article className={s.replay}>
      <header className={s.lessonHeader}>
        <div>
          {notes.reference && (
            <div className={s.reference}>
              {t("第四版", "4th ed.")} {notes.reference}
            </div>
          )}
          <h3>{notes.title[locale]}</h3>
          <p>{notes.intro[locale]}</p>
        </div>
        <div className={s.sourceActions}>
          <a href={online} target="_blank" rel="noreferrer">
            <ExternalLink size={14} aria-hidden="true" />{" "}
            {t("在线运行", "Run online")}
          </a>
          <a href={`/assets/lean-lab/${replay.file}`} download>
            <Download size={14} aria-hidden="true" />{" "}
            {t("下载 .lean", "Download .lean")}
          </a>
        </div>
      </header>
      {id === "insertion-order" && (
        <InsertionTrace locale={locale} samples={samples} />
      )}

      <div className={s.replayControls}>
        <span>
          {t(
            `第 ${index + 1} 步 / 共 ${replay.steps.length} 步`,
            `Step ${index + 1} of ${replay.steps.length}`,
          )}
        </span>
        <div>
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ArrowLeft size={15} aria-hidden="true" /> {t("上一步", "Previous")}
          </button>
          <button
            type="button"
            disabled={index === replay.steps.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            {t("下一步", "Next")} <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={s.editor}>
        <section className={s.editorCode} aria-labelledby="lean-code-heading">
          <h4 id="lean-code-heading">
            <Terminal size={15} aria-hidden="true" /> Lean{" "}
            <span>{replay.file}</span>
          </h4>
          <div className={s.codeBody}>
            {replay.steps.map(({ id, from, through }, frameIndex) => (
              <button
                key={id}
                type="button"
                className={s.codeGroup}
                onClick={() => setIndex(frameIndex)}
                aria-label={
                  t("跳到", "Go to") + " " + notes.steps[id].title[locale]
                }
                aria-current={frameIndex === index ? "step" : undefined}
              >
                {replay.code.slice(from - 1, through).map((line, row) => (
                  <span className={s.codeLine} key={from + row}>
                    <span className={s.lineNumber} aria-hidden="true">
                      {replay.lineNumbers[from + row - 1]}
                    </span>
                    <code>
                      <LeanSyntax line={line} />
                    </code>
                  </span>
                ))}
              </button>
            ))}
          </div>
        </section>

        <section
          className={s.goalPanel}
          aria-labelledby="lean-state-heading"
          aria-live="polite"
        >
          <h4 id="lean-state-heading">
            <span aria-hidden="true">⊢</span>{" "}
            {t("Lean 证明状态", "Lean proof state")}
          </h4>
          <div className={s.goalBody}>
            {isDone ? (
              <p className={s.goalDone}>
                <CircleCheck size={19} aria-hidden="true" />
                {index === replay.steps.length - 1
                  ? t("整个证明已完成", "Proof complete")
                  : t("当前分支已完成", "Current branch closed")}
              </p>
            ) : (
              <GoalState state={frame.state} />
            )}
          </div>
          {previousInBranch && (
            <details key={index} className={s.before}>
              <summary>{t("查看上一步的状态", "View previous state")}</summary>
              <GoalState state={before.state} />
            </details>
          )}
        </section>
      </div>

      <div className={s.paper} aria-live="polite">
        <div>{t("纸笔推理", "On paper")}</div>
        <h4>{reading.title[locale]}</h4>
        <p>{reading.paper[locale]}</p>
      </div>
      {question?.at === frame.id && (
        <div className={s.question}>
          <h4>{question.prompt[locale]}</h4>
          <div>
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                type="button"
                aria-pressed={picked === optionIndex}
                onClick={() => setPicked(optionIndex)}
              >
                {option[locale]}
              </button>
            ))}
          </div>
          {picked !== null && (
            <p role="status">
              {picked === question.answer
                ? t("对。", "Correct. ")
                : t("再看看当前目标。", "Look again at the current target. ")}
              {question.reason[locale]}
            </p>
          )}
        </div>
      )}
      {notes.markers && <p className={s.scope}>{notes.markers[locale]}</p>}
    </article>
  );
}

function LeanSyntax({ line }: { line: string }) {
  return line
    .split(
      /(\b(?:theorem|def|by|induction|generalizing|with|exact|apply|intro|constructor|change|rw|simp|simpa|have|using|rfl|by_cases)\b)/u,
    )
    .map((fragment, index) =>
      index % 2 ? (
        <span className={s.keyword} key={index}>
          {fragment}
        </span>
      ) : (
        fragment
      ),
    );
}

function GoalState({ state }: { state: string }) {
  return (
    <pre className={s.goalState}>
      {state.split("\n").map((line, index) => (
        <span
          key={index}
          className={
            line.startsWith("⊢")
              ? s.target
              : line.startsWith("case")
                ? s.branch
                : undefined
          }
        >
          {line || " "}
        </span>
      ))}
    </pre>
  );
}

function InsertionTrace({
  locale,
  samples,
}: {
  locale: LearningLocale;
  samples: Record<string, Sample>;
}) {
  const t = (zh: string, en: string) => (locale === "en" ? en : zh);
  const [sampleId, select] = useState("mixed");
  const [count, setCount] = useState(0);
  const { prefixes, input } = samples[sampleId];
  return (
    <details className={s.trace}>
      <summary>
        {t("2.1-1 · 逐轮走一遍插入排序", "2.1-1 · Trace insertion sort")}{" "}
        <ChevronDown size={16} aria-hidden="true" />
      </summary>
      <div className={s.traceContent}>
        <div className={s.traceControls}>
          <label>
            {t("输入", "Input")}
            <select
              value={sampleId}
              onChange={(event) => {
                select(event.target.value);
                setCount(0);
              }}
            >
              {Object.entries(samples).map(([key, { input }]) => (
                <option key={key} value={key}>
                  [{input.join(", ")}]
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setCount(0)}
            disabled={count === 0}
          >
            {t("重置", "Reset")}
          </button>
          <button
            type="button"
            onClick={() => setCount(count + 1)}
            disabled={count === input.length}
          >
            {t("插入下一项", "Insert next")}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div className={s.traceGrid} aria-live="polite">
          <div>
            <span>{t("已排前缀 acc", "Sorted prefix acc")}</span>
            <ol aria-label={t("已排前缀", "Sorted prefix")}>
              {prefixes[count].length === 0 ? (
                <li>[]</li>
              ) : (
                prefixes[count].map((value, i) => <li key={i}>{value}</li>)
              )}
            </ol>
          </div>
          <div>
            <span>{t("剩余输入 rest", "Remaining input rest")}</span>
            <ol aria-label={t("剩余输入", "Remaining input")}>
              {count === input.length ? (
                <li>[]</li>
              ) : (
                input.slice(count).map((value, i) => (
                  <li className={i === 0 ? s.nextItem : undefined} key={i}>
                    {value}
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
        <p>
          {t(
            `已处理 ${count} / ${input.length} 项。回放数据由 Lean 的 #eval 生成。`,
            `${count} of ${input.length} items processed. The trace was computed by #eval in Lean.`,
          )}
        </p>
      </div>
    </details>
  );
}

function ChapterIndex({
  locale,
  onLesson,
}: {
  locale: LearningLocale;
  onLesson: (id: LessonId) => void;
}) {
  const t = (zh: string, en: string) => (locale === "en" ? en : zh);
  const [query, setQuery] = useState("");
  const search = query
    .toLowerCase()
    .trim()
    .replace(/^(?:第\s*|ch(?:apter)?\.?\s*)/, "")
    .replace(/\s*章$/, "");
  const results = chapters.filter(({ number, title }) =>
    /^\d+$/.test(search)
      ? number === Number(search)
      : `${title.zh} ${title.en}`.toLowerCase().includes(search),
  );

  return (
    <section id="clrs" className={s.section} aria-labelledby="clrs-heading">
      <div className={s.sectionHeading}>
        <div>
          <h2 id="clrs-heading">
            {t("《算法导论》第四版", "Introduction to Algorithms, 4th edition")}
          </h2>
          <p>
            {t(
              "按 35 章查阅 CLRS-Lean 的选定算法与定理。整本书的伪代码和习题仍有缺项；站内逐步课目前集中在 §2.1。",
              "Browse selected algorithms and theorems in CLRS-Lean by chapter. Textbook pseudocode and exercises still have gaps. The local lessons focus on §2.1.",
            )}
          </p>
        </div>
        <a
          className={s.textLink}
          href={clrsRepository}
          target="_blank"
          rel="noreferrer"
        >
          CLRS-Lean <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <div className={s.index}>
        <div className={s.indexHead}>
          <div className={s.search}>
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label={t("查找章节", "Find chapters")}
              placeholder={t(
                "输入章号或名称，如 14、动态规划",
                "Enter a chapter or title, e.g. 14, dynamic programming",
              )}
            />
            {query && (
              <button
                type="button"
                aria-label={t("清空搜索", "Clear search")}
                onClick={() => setQuery("")}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <span role="status">
            {t(
              `${results.length} / ${chapters.length} 章`,
              `${results.length} of ${chapters.length} chapters`,
            )}
          </span>
        </div>
        {results.length === 0 ? (
          <p className={s.empty}>
            {t("没有匹配的章节。", "No matching chapters.")}
          </p>
        ) : (
          <ol className={s.chapterList}>
            {results.map(({ number, title }) => {
              const padded = String(number).padStart(2, "0");
              return (
                <li key={number} value={number}>
                  <span className={s.chapterNumber}>{padded}</span>
                  <strong>{title[locale]}</strong>
                  {number === 2 && (
                    <a
                      href="#proof"
                      className={s.localChapter}
                      onClick={() => onLesson("insertion-order")}
                    >
                      {t("站内逐步课", "Local walkthrough")}{" "}
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={`${clrsUpstream}CLRSLean/FourthEdition/Chapter_${padded}/`}
                    target="_blank"
                    rel="noreferrer"
                    className={s.upstreamChapter}
                    aria-label={t(
                      `CLRS-Lean 第 ${number} 章 ${title.zh}`,
                      `CLRS-Lean chapter ${number}: ${title.en}`,
                    )}
                  >
                    {number === 1
                      ? t("上游导读", "Upstream guide")
                      : t("上游证明", "Upstream proofs")}{" "}
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ol>
        )}
        <div className={s.indexFoot}>
          <span>
            {t(
              "站内范围：§2.1 插入排序、2.1-1 的原创输入走查，以及 2.1-2 至 2.1-4 的列表模型。2.1-5（二进制加法）仍待补齐。",
              "Local coverage: §2.1 insertion sort, an original trace for 2.1-1, and list models for 2.1-2 through 2.1-4. Binary addition (2.1-5) is still open.",
            )}
          </span>
          <a href={clrsBook} target="_blank" rel="noreferrer">
            {t("出版社资料", "Publisher resources")}{" "}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
