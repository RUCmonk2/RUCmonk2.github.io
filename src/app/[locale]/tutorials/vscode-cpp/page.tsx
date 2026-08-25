import { ArrowDown, BookOpen, Clock, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { VscodeTutorialReader } from "@/components/tutorial/vscode-tutorial-reader";
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
      ? "VS Code C/C++ setup companion"
      : "VS Code C/C++ 环境配置伴读",
    description: isEnglish
      ? "A source-faithful, checkpoint-based companion for setting up VS Code C/C++ on macOS and Windows."
      : "按平台拆分、带解释与成功检查点的 VS Code C/C++ 环境配置伴读教程。",
    path: "/tutorials/vscode-cpp",
    locale: locale as Locale,
  });
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const tutorialsHref = isEnglish ? "/en/tutorials" : "/tutorials";
  return (
    <main className="tutorial-page">
      <nav
        className="tutorial-breadcrumbs"
        aria-label={isEnglish ? "Tutorial hierarchy" : "教程层级"}
      >
        <Link href={tutorialsHref}>{isEnglish ? "Tutorials" : "教程中心"}</Link>
        <span>/</span>
        <span>{isEnglish ? "Development environments" : "开发环境与工具"}</span>
        <span>/</span>
        <b>VS Code C/C++</b>
      </nav>
      <section className="tutorial-hero">
        <div>
          <p className="academic-kicker">
            GUIDED SETUP · {isEnglish ? "LEARNING NOTES" : "分步伴读"}
          </p>
          <h1>
            {isEnglish
              ? "Set up VS Code for C/C++, one checkpoint at a time"
              : "把 C/C++ 环境配置，读成一条可检查的路径"}
          </h1>
          <p>
            {isEnglish
              ? "Choose your system, keep the source instructions and explanations together, and verify each stage before moving on."
              : "选择你的系统，让资料原意、通俗解释与成功标志始终留在同一个阅读位置。每次只处理一步，不必在长文档里来回翻找。"}
          </p>
          <a href="#reader">
            {isEnglish ? "Start guided reading" : "开始伴读"}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <aside>
          <div>
            <BookOpen aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Two routes" : "双平台"}</b>
              <small>macOS / Windows 10–11</small>
            </span>
          </div>
          <div>
            <Clock aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Checkpoint-paced" : "检查点节奏"}</b>
              <small>
                {isEnglish ? "Read · act · verify" : "阅读 · 操作 · 验证"}
              </small>
            </span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>
              <b>{isEnglish ? "Read-only guide" : "只读教程"}</b>
              <small>
                {isEnglish
                  ? "No command runs automatically"
                  : "不自动运行任何命令"}
              </small>
            </span>
          </div>
        </aside>
      </section>
      <div
        className="tutorial-sequence"
        aria-label={isEnglish ? "Tutorial structure" : "教程结构"}
      >
        <span>{isEnglish ? "Choose platform" : "选择平台"}</span>
        <i>→</i>
        <span>{isEnglish ? "Follow one step" : "逐步伴读"}</span>
        <i>→</i>
        <span>{isEnglish ? "Check the result" : "核对结果"}</span>
        <i>→</i>
        <span>{isEnglish ? "Continue safely" : "再进入下一步"}</span>
      </div>
      <VscodeTutorialReader isEnglish={isEnglish} />
      <section className="tutorial-scope">
        <p className="academic-kicker">
          SOURCE SCOPE · {isEnglish ? "MATERIAL BOUNDARY" : "资料边界"}
        </p>
        <h2>
          {isEnglish
            ? "What this page does—and does not—contain"
            : "这页包含什么，也明确不包含什么"}
        </h2>
        <div>
          <article>
            <b>{isEnglish ? "Included" : "已纳入"}</b>
            <p>
              {isEnglish
                ? "The procedural content of the supplied macOS 5-page and Windows 31-page tutorials, reorganized around actions, reasons, and visible checks."
                : "用户提供的 macOS 5 页、Windows 31 页教程中的操作内容，并按“做什么—为什么—如何确认”重新组织。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Not distributed" : "未公开分发"}</b>
            <p>
              {isEnglish
                ? "Bundled installers, VSIX packages, WinLibs archives, and the original Word/PDF files remain private source material."
                : "随附安装器、VSIX、WinLibs 压缩包以及原始 Word / PDF 均保留为私有资料，不从本站提供下载。"}
            </p>
          </article>
          <article>
            <b>{isEnglish ? "Version note" : "版本提醒"}</b>
            <p>
              {isEnglish
                ? "Screens and package versions can change. Prefer stable official releases and use the checkpoints rather than matching screenshots pixel for pixel."
                : "软件界面与版本会变化。优先选择官方稳定版本，以检查点判断是否成功，不必逐像素复刻资料截图。"}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
