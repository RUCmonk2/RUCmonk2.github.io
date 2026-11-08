"use client";

import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import type { StudyFigure, StudySet } from "@/data/learning/exam-types";

type StudyStatus = "ready" | "stuck" | "redo";
type Progress = Record<string, StudyStatus>;
export type StudyOrigins = Record<string, { href: string; title: string }>;
const storageKey = "deep-learning-study-progress-v1";
const statusLabels: Record<StudyStatus, string> = {
  ready: "会做",
  stuck: "卡住",
  redo: "重做",
};

function readProgress(): Progress {
  const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "{}");
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
  return Object.fromEntries(
    Object.entries(saved).filter(
      ([, value]) => value === "ready" || value === "stuck" || value === "redo",
    ),
  ) as Progress;
}

const StudyMarkdown = memo(function StudyMarkdown({
  children,
}: {
  children: string;
}) {
  return (
    <div className="note-prose exam-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: ({ children }) => (
            <div className="note-table-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
});

function StudyImage({ figure }: { figure: StudyFigure }) {
  return (
    <figure className="exam-figure">
      <a href={figure.src} target="_blank" rel="noopener noreferrer">
        <img src={figure.src} alt={figure.alt} loading="lazy" />
      </a>
      <figcaption>
        <span>{figure.caption}</span>
        <a href={figure.src} target="_blank" rel="noopener noreferrer">
          查看大图 ↗
        </a>
      </figcaption>
      <p className="exam-figure-scroll-hint">
        窄屏可横向滑动图片，也可点击查看大图。
      </p>
    </figure>
  );
}

function Disclosure({ label, children }: { label: string; children: string }) {
  if (!children.trim()) return null;
  return (
    <details className="exam-disclosure">
      <summary>{label}</summary>
      <StudyMarkdown>{children}</StudyMarkdown>
    </details>
  );
}

function ProgressButtons({
  id,
  status,
  onChange,
}: {
  id: string;
  status?: StudyStatus;
  onChange: (id: string, status: StudyStatus) => void;
}) {
  return (
    <div className="exam-progress" role="group" aria-label="手动标记掌握情况">
      <span>我的标记</span>
      {(Object.keys(statusLabels) as StudyStatus[]).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={status === value}
          data-status={value}
          onClick={() => onChange(id, value)}
        >
          {status === value ? "✓ " : ""}
          {statusLabels[value]}
        </button>
      ))}
    </div>
  );
}

export function ExamStudy({
  study,
  origins = {},
}: {
  study: StudySet;
  origins?: StudyOrigins;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [onlyRedo, setOnlyRedo] = useState(false);
  const [query, setQuery] = useState("");
  const [hideFormula, setHideFormula] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const sync = () => {
      try {
        setProgress(readProgress());
        setStorageAvailable(true);
      } catch {
        setStorageAvailable(false);
      }
    };
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const mark = (id: string, status: StudyStatus) => {
    let current = progress;
    try {
      // Read the latest state so another open chapter's marks are retained.
      if (storageAvailable) current = readProgress();
    } catch {
      setStorageAvailable(false);
    }
    const next = { ...current };
    if (next[id] === status) delete next[id];
    else next[id] = status;
    setProgress(next);
    setNotice(
      next[id] ? `已标记为“${statusLabels[status]}”。` : "已清除此项标记。",
    );
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  };

  const isPending = (id: string) =>
    progress[id] === "stuck" || progress[id] === "redo";
  const search = query.trim().toLocaleLowerCase();
  const matchesSearch = (text: string) =>
    !search || text.toLocaleLowerCase().includes(search);
  const formulas = study.formulas.filter(
    (item) =>
      (!onlyRedo || isPending(item.id)) &&
      matchesSearch(
        `${item.title} ${item.context} ${item.task} ${item.source} ${origins[item.id]?.title ?? ""}`,
      ),
  );
  const exercises = study.exercises.filter(
    (item) =>
      (!onlyRedo || isPending(item.id)) &&
      matchesSearch(
        `${item.title} ${item.prompt} ${item.source} ${origins[item.id]?.title ?? ""}`,
      ),
  );
  const allIds = [...study.formulas, ...study.exercises].map((item) => item.id);
  const completed = allIds.filter((id) => progress[id] === "ready").length;
  const pending = allIds.filter(isPending).length;

  const itemMeta = (id: string, source: string) => (
    <div className="exam-item-meta">
      <StudyMarkdown>{source}</StudyMarkdown>
      {origins[id] && (
        <a className="exam-origin" href={`${origins[id].href}#${id}`}>
          对应章节：{origins[id].title} ↗
        </a>
      )}
    </div>
  );

  return (
    <div className="exam-study" ref={root}>
      <div className="exam-tools">
        <div className="exam-tools-top">
          <nav aria-label="本页复习内容" className="exam-jumps">
            {!!study.formulas.length && (
              <a href="#study-formulas">公式与手推 {study.formulas.length}</a>
            )}
            {!!study.exercises.length && (
              <a href="#study-exercises">题目 {study.exercises.length}</a>
            )}
            {!!study.figures?.length && !onlyRedo && !search && (
              <a href="#study-figures">关键图</a>
            )}
          </nav>
          <button
            type="button"
            className="exam-collapse"
            onClick={() => {
              root.current
                ?.closest(".note-article")
                ?.querySelectorAll("details[open]")
                .forEach((item) => item.removeAttribute("open"));
              setNotice("本页推导、提示与答案已全部收起。");
            }}
          >
            全部收起
          </button>
        </div>
        <label className="exam-search">
          <span>查找考点或题目</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：Softmax、卷积、往年"
            autoComplete="off"
          />
        </label>
        <div className="exam-options">
          <label>
            <input
              type="checkbox"
              checked={hideFormula}
              onChange={(event) => setHideFormula(event.target.checked)}
            />
            隐藏公式结论，先自己写
          </label>
          <label>
            <input
              type="checkbox"
              checked={onlyRedo}
              onChange={(event) => setOnlyRedo(event.target.checked)}
            />
            只看待重做（卡住 / 重做）
          </label>
        </div>
        <p className="exam-storage-note">
          {storageAvailable
            ? `标记仅保存在当前浏览器；点击同一标记可取消。会做 ${completed} / ${allIds.length}，待重做 ${pending}。展开答案不会自动标记。`
            : "当前浏览器无法保存标记，本次页面内仍可使用；刷新后可能丢失。"}
        </p>
        {(search || onlyRedo) && (
          <p className="exam-filter-count" role="status">
            当前显示 {formulas.length} 条公式、{exercises.length} 道题。
          </p>
        )}
        <p className="exam-sr-only" role="status" aria-live="polite">
          {notice}
        </p>
      </div>

      {(onlyRedo || search) && !formulas.length && !exercises.length && (
        <div className="exam-empty">
          <p>
            {search
              ? "当前筛选下没有匹配的条目，可以换个词或清除筛选。"
              : "还没有“卡住”或“重做”的条目。取消筛选后可逐项标记。"}
          </p>
          <button
            type="button"
            onClick={() => {
              setOnlyRedo(false);
              setQuery("");
            }}
          >
            显示全部内容
          </button>
        </div>
      )}

      {!!study.formulas.length && (
        <section
          id="study-formulas"
          className="exam-section"
          aria-labelledby="study-formulas-title"
        >
          <div className="exam-section-heading">
            <h2 id="study-formulas-title">公式与手推</h2>
            <p>先在纸上推，卡住再看提示。</p>
          </div>
          {formulas.map((item) => (
            <article key={item.id} id={item.id} className="exam-item">
              <header className="exam-item-heading">
                <h3>
                  <a href={`#${item.id}`}>{item.title}</a>
                </h3>
                <span>手推</span>
              </header>
              <StudyMarkdown>{item.context}</StudyMarkdown>
              {hideFormula ? (
                <Disclosure label="查看公式结论" key="hidden-formula">
                  {item.formula}
                </Disclosure>
              ) : (
                <div className="exam-formula">
                  <StudyMarkdown>{item.formula}</StudyMarkdown>
                </div>
              )}
              <div className="exam-task">
                <span>自己推导</span>
                <StudyMarkdown>{item.task}</StudyMarkdown>
              </div>
              {item.figure &&
                (hideFormula ? (
                  <details className="exam-disclosure">
                    <summary>查看结构图</summary>
                    <StudyImage figure={item.figure} />
                  </details>
                ) : (
                  <StudyImage figure={item.figure} />
                ))}
              <div className="exam-disclosures">
                <Disclosure label="给一点提示">{item.hint}</Disclosure>
                <Disclosure label="展开完整推导">{item.derivation}</Disclosure>
                <Disclosure label="核对易错点">{item.pitfall}</Disclosure>
              </div>
              <ProgressButtons
                id={item.id}
                status={progress[item.id]}
                onChange={mark}
              />
              {itemMeta(item.id, item.source)}
            </article>
          ))}
        </section>
      )}

      {!!study.exercises.length && (
        <section
          id="study-exercises"
          className="exam-section"
          aria-labelledby="study-exercises-title"
        >
          <div className="exam-section-heading">
            <h2 id="study-exercises-title">题目与自测</h2>
            <p>题干保持可见；答案和解题过程分别展开。</p>
          </div>
          {exercises.map((item) => (
            <article key={item.id} id={item.id} className="exam-item">
              <header className="exam-item-heading">
                <h3>
                  <a href={`#${item.id}`}>{item.title}</a>
                </h3>
                <span>建议 {item.minutes} 分钟</span>
              </header>
              <StudyMarkdown>{item.prompt}</StudyMarkdown>
              {item.figure && <StudyImage figure={item.figure} />}
              <div className="exam-disclosures">
                <Disclosure label="给一点提示">{item.hint}</Disclosure>
                <Disclosure label="只核对答案">{item.answer}</Disclosure>
                <Disclosure label="展开解题过程">{item.solution}</Disclosure>
              </div>
              <ProgressButtons
                id={item.id}
                status={progress[item.id]}
                onChange={mark}
              />
              {itemMeta(item.id, item.source)}
            </article>
          ))}
        </section>
      )}

      {!!study.figures?.length && !onlyRedo && !search && (
        <section
          id="study-figures"
          className="exam-section"
          aria-labelledby="study-figures-title"
        >
          <div className="exam-section-heading">
            <h2 id="study-figures-title">关键图</h2>
            <p>对着图说出计算顺序，再核对对应公式。</p>
          </div>
          {study.figures.map((figure) => (
            <StudyImage key={figure.src} figure={figure} />
          ))}
        </section>
      )}
    </div>
  );
}
