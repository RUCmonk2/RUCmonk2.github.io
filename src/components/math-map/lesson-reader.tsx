"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export type ReadingMode = "beginner" | "formal";
export type Lesson = {
  beginner: string;
  formal: string;
  intro: Record<ReadingMode, string>;
};

export function MathProse({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { strict: "error", throwOnError: true }]]}
      components={{
        a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
        pre: (props) => <pre {...props} tabIndex={0} />,
        table: (props) => (
          <div className="mathmap-notation-scroll" tabIndex={0}>
            <table {...props} />
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export function ReadingModes({
  mode,
  onChange,
  en,
  label,
}: {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
  en: boolean;
  label: string;
}) {
  return (
    <div className="mathmap-reading-modes" role="group" aria-label={label}>
      {(["beginner", "formal"] as const).map((value) => (
        <button
          type="button"
          key={value}
          aria-pressed={mode === value}
          onClick={() => onChange(value)}
        >
          {value === "beginner"
            ? en
              ? "Guided learning"
              : "从零理解"
            : en
              ? "Formal treatment"
              : "严谨表述"}
        </button>
      ))}
    </div>
  );
}

const cache = new Map<string, Lesson>();
export function useMathLesson(id: string, locale: "zh" | "en") {
  const key = `${locale}/${id}`;
  const [loaded, setLoaded] = useState<{ key: string; lesson: Lesson } | null>(
    null,
  );
  const [failed, setFailed] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const known = cache.get(key);
    if (known) {
      setLoaded({ key, lesson: known });
      return;
    }
    fetch(`/assets/math-lessons/${key}.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Lesson response: ${response.status}`);
        return response.json() as Promise<Lesson>;
      })
      .then((lesson) => {
        if (controller.signal.aborted) return;
        cache.set(key, lesson);
        setLoaded({ key, lesson });
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(key);
      });
    return () => controller.abort();
  }, [key, retry]);
  return {
    lesson: loaded?.key === key ? loaded.lesson : null,
    error: failed === key,
    retry: () => {
      setFailed(null);
      setRetry((n) => n + 1);
    },
  };
}

export function LessonBody({
  lesson,
  mode,
  en,
  error,
  retry,
}: {
  lesson: Lesson | null;
  mode: ReadingMode;
  en: boolean;
  error: boolean;
  retry: () => void;
}) {
  if (!lesson)
    return (
      <div role="status" className="mathmap-lesson-status">
        <p>
          {error
            ? en
              ? "The lesson could not be loaded."
              : "讲解暂时未能加载。"
            : en
              ? "Loading the lesson…"
              : "正在加载讲解…"}
        </p>
        {error && (
          <button type="button" onClick={retry}>
            {en ? "Try again" : "重试"}
          </button>
        )}
      </div>
    );
  // A new key resets native exercise disclosures when the topic or mode changes.
  const [main, solutions] = lesson[mode].split("<!-- solutions -->");
  return (
    <div className="mathmap-lesson-prose">
      <MathProse>{main}</MathProse>
      {solutions && (
        <details className="mathmap-solutions">
          <summary>
            {en ? "Show worked solutions" : "展开参考解答与步骤"}
          </summary>
          <MathProse>{solutions}</MathProse>
        </details>
      )}
    </div>
  );
}
