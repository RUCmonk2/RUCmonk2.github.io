"use client";

import {
  BookOpen,
  Check,
  ChevronRight,
  Clipboard,
  ExternalLink,
  Info,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";

import {
  getDeepseekHarnessTutorialRoutes,
  type HarnessTutorialRoute,
} from "@/data/deepseek-harness-tutorial";
import {
  getLeanAiTutorialRoutes,
  type LeanAiTutorialRoute,
} from "@/data/lean-ai-tutorial";
import {
  type TutorialPlatform,
  tutorialPlatforms,
  type TutorialRouteContent,
} from "@/data/vscode-tutorial";

type GuidedTutorialReaderProps<RouteKey extends string> = {
  isEnglish: boolean;
  routes: Record<RouteKey, TutorialRouteContent>;
  initialRoute: RouteKey;
  sourceLabel?: string;
  sourceNote: string;
  sourceDescription: string;
  safetyNote: string;
};

function GuidedTutorialReader<RouteKey extends string>({
  isEnglish,
  routes,
  initialRoute,
  sourceLabel,
  sourceNote,
  sourceDescription,
  safetyNote,
}: GuidedTutorialReaderProps<RouteKey>) {
  const [route, setRoute] = useState<RouteKey>(initialRoute);
  const [stepIndex, setStepIndex] = useState(0);
  const [copyState, setCopyState] = useState<{
    id: string;
    status: "copied" | "error";
  } | null>(null);
  const copyResetTimer = useRef<number | null>(null);
  const routeKeys = Object.keys(routes) as RouteKey[];
  const current = routes[route];
  const step = current.steps[stepIndex];
  const alternativeRoutes = routeKeys.filter((key) => key !== route);

  const chooseRoute = (value: RouteKey) => {
    setRoute(value);
    setStepIndex(0);
  };

  const legacyCopy = (value: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.inset = "0 auto auto -9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Legacy clipboard copy failed");
  };

  const copy = async (value: string, id: string) => {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        legacyCopy(value);
      }
      setCopyState({ id, status: "copied" });
    } catch {
      setCopyState({ id, status: "error" });
    }
    if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
    copyResetTimer.current = window.setTimeout(() => setCopyState(null), 2200);
  };

  const ui = isEnglish
    ? {
        source: sourceLabel ?? "Source basis",
        why: "Why it matters",
        success: "Success check",
        note: "Before continuing",
        copy: "Copy",
        copied: "Copied",
        copyError: "Select manually",
        detail: "Detailed guidance",
        links: "Useful links",
        official: "Official",
        reference: "Source link",
        thirdParty: "Third-party",
        previous: "Previous",
        next: "Next",
        original: sourceNote,
      }
    : {
        source: sourceLabel ?? "资料依据",
        why: "为什么要做",
        success: "成功时会看到",
        note: "继续前留意",
        copy: "复制",
        copied: "已复制",
        copyError: "请手动选择",
        detail: "展开详细说明",
        links: "相关链接",
        official: "官方网站",
        reference: "资料链接",
        thirdParty: "第三方",
        previous: "上一步",
        next: "下一步",
        original: sourceNote,
      };

  return (
    <section className="tutorial-reader" id="reader">
      <div
        className="tutorial-platforms"
        aria-label={isEnglish ? "Choose tutorial route" : "选择教程路线"}
      >
        {routeKeys.map((key) => {
          const item = routes[key];
          const active = route === key;
          return (
            <button
              key={key}
              type="button"
              className={active ? "active" : ""}
              onClick={() => chooseRoute(key)}
              aria-pressed={active}
            >
              <span aria-hidden="true">{item.badge}</span>
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
            <div className="tutorial-step-meta">
              <p>
                STEP {String(stepIndex + 1).padStart(2, "0")} · {current.label}
              </p>
              {step.sourcePages && <span>{step.sourcePages}</span>}
            </div>
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

          {step.links && step.links.length > 0 && (
            <section className="tutorial-links" aria-label={ui.links}>
              <div className="tutorial-section-heading">
                <ExternalLink aria-hidden="true" />
                <b>{ui.links}</b>
              </div>
              <div className="tutorial-link-grid">
                {step.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      {link.kind === "official"
                        ? ui.official
                        : link.kind === "third-party"
                          ? ui.thirdParty
                          : ui.reference}
                    </span>
                    <strong>{link.label}</strong>
                    <small>{link.note}</small>
                    <ExternalLink aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {step.details && step.details.length > 0 && (
            <section className="tutorial-details" aria-label={ui.detail}>
              <div className="tutorial-section-heading">
                <BookOpen aria-hidden="true" />
                <b>{ui.detail}</b>
                <span>{step.details.length}</span>
              </div>
              {step.details.map((detail, index) => (
                <details key={detail.title} open={index === 0}>
                  <summary>
                    <ChevronRight aria-hidden="true" />
                    {detail.title}
                  </summary>
                  <ol>
                    {detail.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </details>
              ))}
            </section>
          )}

          {step.copyBlocks?.map((block, index) => {
            const id = `${step.id}-${index}`;
            return (
              <div className="tutorial-command" key={id}>
                <div>
                  <Terminal aria-hidden="true" />
                  <span>{block.label}</span>
                  <i>{block.format}</i>
                </div>
                <pre>
                  <code>{block.value}</code>
                </pre>
                {block.note && <p>{block.note}</p>}
                <button type="button" onClick={() => copy(block.value, id)}>
                  {copyState?.id === id && copyState.status === "copied" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Clipboard aria-hidden="true" />
                  )}
                  {copyState?.id === id
                    ? copyState.status === "copied"
                      ? ui.copied
                      : ui.copyError
                    : ui.copy}
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
                <span>{sourceDescription}</span>
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
            {alternativeRoutes.map((alternativeRoute) => (
              <div className="inactive" key={alternativeRoute}>
                <dt />
                <dd>
                  <b>{routes[alternativeRoute].label}</b>
                  <span>
                    {isEnglish
                      ? "Available from the route selector above"
                      : "可从上方路径选择器切换进入"}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="tutorial-safety">
            <TriangleAlert aria-hidden="true" />
            <p>{safetyNote}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function VscodeTutorialReader({ isEnglish }: { isEnglish: boolean }) {
  return (
    <GuidedTutorialReader<TutorialPlatform>
      isEnglish={isEnglish}
      routes={tutorialPlatforms}
      initialRoute="windows"
      sourceLabel={isEnglish ? "From the source" : "资料原意"}
      sourceNote={
        isEnglish
          ? "The supplied tutorials are in Chinese; technical steps below stay source-faithful."
          : "以下步骤整理自用户提供的中文 PDF / Word 教程；命令只供阅读与复制，网页不会执行。"
      }
      sourceDescription={
        isEnglish
          ? "Directly traceable to the supplied material"
          : "可追溯到提供的教程资料"
      }
      safetyNote={
        isEnglish
          ? "Review commands before running them. This page never installs software or changes your device."
          : "运行任何命令前先理解其作用。本页不会替你安装软件，也不会更改电脑设置。"
      }
    />
  );
}

export function DeepseekHarnessTutorialReader({
  isEnglish,
}: {
  isEnglish: boolean;
}) {
  const routes = getDeepseekHarnessTutorialRoutes(isEnglish);
  return (
    <GuidedTutorialReader<HarnessTutorialRoute>
      isEnglish={isEnglish}
      routes={routes}
      initialRoute="quick"
      sourceLabel={isEnglish ? "Evidence and reference" : "依据与参考"}
      sourceNote={
        isEnglish
          ? "The reference video informs the learning path; commands and requirements are checked against DeepSeek's official repository and documentation. This page never runs them."
          : "参考视频用于组织入门路径；命令与要求以 DeepSeek 官方仓库和开发者文档复核。本页只展示、解释与复制，不会执行。"
      }
      sourceDescription={
        isEnglish
          ? "Traceable to the linked official source or reference video"
          : "可追溯到页面列出的官方资料或参考视频"
      }
      safetyNote={
        isEnglish
          ? "Harness can edit files and run commands. Start in a disposable workspace, keep meaningful operations approval-gated, and review every command and plugin."
          : "Harness 能编辑文件和运行命令。请从可丢弃工作区开始，对重要操作保留审批，并审查每条命令与插件来源。"
      }
    />
  );
}

export function LeanAiTutorialReader({ isEnglish }: { isEnglish: boolean }) {
  const routes = getLeanAiTutorialRoutes(isEnglish);
  return (
    <GuidedTutorialReader<LeanAiTutorialRoute>
      isEnglish={isEnglish}
      routes={routes}
      initialRoute="foundation"
      sourceLabel={isEnglish ? "Course basis" : "课程依据"}
      sourceNote={
        isEnglish
          ? "The course reorganizes the supplied Lean, AI4Math, and AI4TCS notes into a self-study sequence. Current setup steps and resource links are checked against official Lean and mathlib documentation."
          : "本课程将用户提供的 Lean、AI4Math 与 AI4TCS 笔记重组为自学路径；环境步骤和资源链接另按 Lean 与 mathlib 当前官方文档复核。"
      }
      sourceDescription={
        isEnglish
          ? "Traceable to the supplied notes or the linked first-party documentation"
          : "可追溯到提供的笔记或页面列出的第一方资料"
      }
      safetyNote={
        isEnglish
          ? "Commands are examples to review and copy; this page does not install Lean, create projects, run proofs, or invoke an AI model."
          : "命令仅供理解与复制；本页不会安装 Lean、创建项目、运行证明或调用 AI 模型。"
      }
    />
  );
}
