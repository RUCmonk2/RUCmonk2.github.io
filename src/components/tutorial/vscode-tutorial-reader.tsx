"use client";

import {
  Check,
  ChevronRight,
  Clipboard,
  Info,
  Monitor,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

import {
  type TutorialPlatform,
  tutorialPlatforms,
} from "@/data/vscode-tutorial";

export function VscodeTutorialReader({ isEnglish }: { isEnglish: boolean }) {
  const [platform, setPlatform] = useState<TutorialPlatform>("windows");
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const current = tutorialPlatforms[platform];
  const step = current.steps[stepIndex];

  const choosePlatform = (value: TutorialPlatform) => {
    setPlatform(value);
    setStepIndex(0);
  };

  const copy = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const ui = isEnglish
    ? {
        source: "From the source",
        why: "Why it matters",
        success: "Success check",
        note: "Before continuing",
        copy: "Copy",
        copied: "Copied",
        previous: "Previous",
        next: "Next",
        original:
          "The supplied tutorials are in Chinese; technical steps below stay source-faithful.",
      }
    : {
        source: "资料原意",
        why: "为什么要做",
        success: "成功时会看到",
        note: "继续前留意",
        copy: "复制",
        copied: "已复制",
        previous: "上一步",
        next: "下一步",
        original:
          "以下步骤整理自用户提供的中文 PDF / Word 教程；命令只供阅读与复制，网页不会执行。",
      };

  return (
    <section className="tutorial-reader" id="reader">
      <div
        className="tutorial-platforms"
        aria-label={isEnglish ? "Choose operating system" : "选择操作系统"}
      >
        {(Object.keys(tutorialPlatforms) as TutorialPlatform[]).map((key) => {
          const item = tutorialPlatforms[key];
          const active = platform === key;
          return (
            <button
              key={key}
              type="button"
              className={active ? "active" : ""}
              onClick={() => choosePlatform(key)}
              aria-pressed={active}
            >
              <span>
                {key === "mac" ? "⌘" : <Monitor aria-hidden="true" />}
              </span>
              <strong>{item.label}</strong>
              <small>{item.time}</small>
            </button>
          );
        })}
      </div>

      <div className="tutorial-context">
        <div>
          <span>{isEnglish ? "Selected route" : "当前路径"}</span>
          <strong>{current.label}</strong>
        </div>
        <p>{current.intro}</p>
        <p className="tutorial-source-note">
          <Info aria-hidden="true" />
          {ui.original}
        </p>
      </div>

      <div className="tutorial-workspace">
        <aside
          className="tutorial-step-nav"
          aria-label={isEnglish ? "Tutorial steps" : "教程步骤"}
        >
          <p>
            {isEnglish ? "Progress" : "章节进度"} ·{" "}
            {String(stepIndex + 1).padStart(2, "0")} /{" "}
            {String(current.steps.length).padStart(2, "0")}
          </p>
          {current.steps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === stepIndex ? "active" : ""}
              onClick={() => setStepIndex(index)}
              aria-current={index === stepIndex ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.title}</b>
              <ChevronRight aria-hidden="true" />
            </button>
          ))}
        </aside>

        <article className="tutorial-step-card" aria-live="polite">
          <header>
            <p>
              STEP {String(stepIndex + 1).padStart(2, "0")} · {current.label}
            </p>
            <h2>{step.title}</h2>
            <p>{step.summary}</p>
          </header>

          <div className="tutorial-reading-grid">
            <section className="source-pane">
              <div className="tutorial-pane-label">
                <Clipboard aria-hidden="true" />
                <b>{ui.source}</b>
              </div>
              <ol>
                {step.source.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </section>
            <section className="why-pane">
              <div className="tutorial-pane-label">
                <Info aria-hidden="true" />
                <b>{ui.why}</b>
              </div>
              <p>{step.why}</p>
            </section>
          </div>

          {step.commands?.map((command, index) => {
            const id = `${step.id}-${index}`;
            return (
              <div className="tutorial-command" key={id}>
                <div>
                  <Terminal aria-hidden="true" />
                  <span>
                    {command.includes("\n")
                      ? isEnglish
                        ? "Example file"
                        : "示例文件"
                      : isEnglish
                        ? "Command shown in source"
                        : "资料中的命令"}
                  </span>
                </div>
                <pre>
                  <code>{command}</code>
                </pre>
                <button type="button" onClick={() => copy(command, id)}>
                  {copied === id ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Clipboard aria-hidden="true" />
                  )}
                  {copied === id ? ui.copied : ui.copy}
                </button>
              </div>
            );
          })}

          <div className="tutorial-checkpoint">
            <Check aria-hidden="true" />
            <div>
              <b>{ui.success}</b>
              <p>{step.success}</p>
            </div>
          </div>
          {step.caution && (
            <div className="tutorial-caution">
              <TriangleAlert aria-hidden="true" />
              <div>
                <b>{ui.note}</b>
                <p>{step.caution}</p>
              </div>
            </div>
          )}

          <footer>
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((value) => value - 1)}
            >
              {ui.previous}
            </button>
            <span>
              {current.steps.map((item, index) => (
                <i
                  key={item.id}
                  className={index === stepIndex ? "active" : ""}
                />
              ))}
            </span>
            <button
              type="button"
              disabled={stepIndex === current.steps.length - 1}
              onClick={() => setStepIndex((value) => value + 1)}
            >
              {ui.next}
              <ChevronRight aria-hidden="true" />
            </button>
          </footer>
        </article>

        <aside className="tutorial-companion">
          <p>{isEnglish ? "Reading key" : "伴读图例"}</p>
          <dl>
            <div>
              <dt className="source-dot" />
              <dd>
                <b>{ui.source}</b>
                <span>
                  {isEnglish
                    ? "Directly traceable to the supplied material"
                    : "可追溯到提供的教程资料"}
                </span>
              </dd>
            </div>
            <div>
              <dt className="why-dot" />
              <dd>
                <b>{ui.why}</b>
                <span>
                  {isEnglish
                    ? "Explanation added for comprehension"
                    : "为理解补充的通俗解释"}
                </span>
              </dd>
            </div>
            <div>
              <dt className="success-dot" />
              <dd>
                <b>{ui.success}</b>
                <span>
                  {isEnglish
                    ? "Observable checkpoint before moving on"
                    : "进入下一步前的可观察检查点"}
                </span>
              </dd>
            </div>
            <div className="inactive">
              <dt />
              <dd>
                <b>{platform === "mac" ? "Windows" : "macOS"}</b>
                <span>
                  {isEnglish
                    ? "Not applicable to the selected route"
                    : "当前平台不适用，因此灰显"}
                </span>
              </dd>
            </div>
          </dl>
          <div className="tutorial-safety">
            <TriangleAlert aria-hidden="true" />
            <p>
              {isEnglish
                ? "Review commands before running them. This page never installs software or changes your device."
                : "运行任何命令前先理解其作用。本页不会替你安装软件，也不会更改电脑设置。"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
