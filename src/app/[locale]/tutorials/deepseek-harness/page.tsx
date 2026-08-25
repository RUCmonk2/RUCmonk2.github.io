import {
  ArrowDown,
  Blocks,
  Clock,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { HarnessPlatformGuide } from "@/components/tutorial/harness-platform-guide";
import { DeepseekHarnessTutorialReader } from "@/components/tutorial/vscode-tutorial-reader";
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
      ? "Run DeepSeek Harness locally"
      : "DeepSeek Harness 本地部署伴读",
    description: isEnglish
      ? "A source-checked, two-route guide to running the DeepSeek Harness Web UI locally with a safe first workspace."
      : "以官方仓库和文档复核命令，分 npx 快速启动与源码构建两条路线完成 DeepSeek Harness 本地部署。",
    path: "/tutorials/deepseek-harness",
    locale: locale as Locale,
  });
}


export default async function DeepseekHarnessTutorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const tutorialsHref = isEnglish ? "/en/tutorials" : "/tutorials";

  return (
    <main className="tutorial-page harness-tutorial-page">
      <nav
        className="tutorial-breadcrumbs"
        aria-label={isEnglish ? "Tutorial hierarchy" : "教程层级"}
      >
        <Link href={tutorialsHref}>{isEnglish ? "Tutorials" : "教程中心"}</Link>
        <span>/</span>
        <span>{isEnglish ? "AI and research workflows" : "AI 与研究工作流"}</span>
        <span>/</span>
        <b>DeepSeek Harness</b>
      </nav>

      <section className="tutorial-hero harness-tutorial-hero">
        <div>
          <p className="academic-kicker">
            LOCAL AGENT · {isEnglish ? "GUIDED DEPLOYMENT" : "本地部署伴读"}
          </p>
          <h1>
            {isEnglish
              ? "Run DeepSeek Harness locally, with the boundaries made explicit"
              : "把 DeepSeek Harness 跑在本机，也把能力边界讲清楚"}
          </h1>
          <p>
            {isEnglish
              ? "Start with the npx route or build from source. Every stage keeps the official basis, explanation, command, checkpoint, and security boundary together."
              : "可选择 npx 快速启动，也可从源码构建。每一步把官方依据、通俗解释、可复制命令、成功检查点与安全边界放在同一处。"}
          </p>
          <a href="#reader">
            {isEnglish ? "Choose a route" : "选择部署路线"}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>

        <aside>
          <div>
            <Laptop aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Local-first UI" : "本地优先"}</b>
              <small>Web UI · workspace · sessions</small>
            </span>
          </div>
          <div>
            <Clock aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Two routes" : "双路线"}</b>
              <small>npx / source build</small>
            </span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Platform-aware" : "双系统分流"}</b>
              <small>
                {isEnglish ? "macOS / Windows" : "macOS / Windows"}
              </small>
            </span>
          </div>
        </aside>
      </section>

      <div
        className="tutorial-sequence"
        aria-label={isEnglish ? "Tutorial structure" : "教程结构"}
      >
        <span>{isEnglish ? "Define local" : "厘清本地边界"}</span>
        <i>→</i>
        <span>{isEnglish ? "Choose a route" : "选择部署路线"}</span>
        <i>→</i>
        <span>{isEnglish ? "Isolate workspace" : "隔离工作区"}</span>
        <i>→</i>
        <span>{isEnglish ? "Verify safely" : "安全验证"}</span>
      </div>

      <DeepseekHarnessTutorialReader isEnglish={isEnglish} />

      <section className="tutorial-scope">
        <p className="academic-kicker">
          SOURCE SCOPE · {isEnglish ? "MATERIAL BOUNDARY" : "资料与版本边界"}
        </p>
        <h2>
          {isEnglish
            ? "Reference-led, but checked against first-party documentation"
            : "参考视频组织体验，官方资料决定命令"}
        </h2>
        <div>
          <article>
            <b>{isEnglish ? "Reference used" : "参考内容"}</b>
            <p>
              {isEnglish
                ? "The linked Bilibili video informs the learning order: install, configure a model, try a task, compare the four modes, then approach plugins. Its narration and project demonstrations are not reproduced."
                : "使用用户提供的 B 站视频梳理学习顺序：安装、模型配置、任务实测、四种模式与插件进阶；不转载视频字幕或实战项目内容。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Local does not imply offline" : "本地不等于离线"}</b>
            <p>
              {isEnglish
                ? "The Harness process and workspace are local. Choosing the official DeepSeek provider still sends model requests to its API; a truly local model requires a separately operated compatible endpoint."
                : "Harness 进程与工作区在本机；选择 DeepSeek 官方提供方时，模型请求仍会发送至其 API。要实现本地模型推理，还需另行准备兼容端点。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Version checked" : "版本核验"}</b>
            <p>
              {isEnglish
                ? "Commands were checked on 25 August 2026 against the official repository and the @deepseek-ai/dsh 0.1.1-rc.2 release. The project is a developer preview and may make breaking changes."
                : "命令于 2026 年 8 月 25 日按官方仓库与 @deepseek-ai/dsh 0.1.1-rc.2 复核。项目仍处于开发者预览阶段，后续可能发生破坏兼容性的变化。"}
            </p>
          </article>
        </div>
      </section>

      <HarnessPlatformGuide isEnglish={isEnglish} />

      <section className="harness-concepts" aria-labelledby="harness-concepts-title">
        <div>
          <p className="academic-kicker">MENTAL MODEL · HARNESS LAYERS</p>
          <h2 id="harness-concepts-title">
            {isEnglish ? "Keep three layers separate" : "先把三层关系分开"}
          </h2>
        </div>
        <div className="harness-concept-grid">
          <article>
            <Laptop aria-hidden="true" />
            <span>01</span>
            <h3>{isEnglish ? "Local runtime" : "本地运行时"}</h3>
            <p>
              {isEnglish
                ? "The Web UI, workspace access, sessions, tools, and trajectories controlled by the dsh process."
                : "由 dsh 进程管理的 Web UI、工作区访问、会话、工具与执行轨迹。"}
            </p>
          </article>
          <article>
            <Blocks aria-hidden="true" />
            <span>02</span>
            <h3>{isEnglish ? "Plugin composition" : "插件组合"}</h3>
            <p>
              {isEnglish
                ? "Models, tools, skills, storage, loops, scheduling, and UI are composed as replaceable capabilities."
                : "模型、工具、技能、存储、循环、调度与 UI 都以可组合能力接入。"}
            </p>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <span>03</span>
            <h3>{isEnglish ? "Model and trust boundary" : "模型与信任边界"}</h3>
            <p>
              {isEnglish
                ? "The chosen provider determines where inference happens; workspace, approvals, and reviewed extensions determine operational risk."
                : "模型提供方决定推理发生在哪里；工作区、审批策略和扩展审查决定操作风险。"}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
