import type { LearningLocale, Localized } from "./types";

export type LearningCategory = "course" | "guide";
export type LearningItem = {
  id: string;
  category: LearningCategory;
  href: string;
  localized: boolean;
  title: Localized;
  description: Localized;
  topic: Localized;
  scope: Localized;
  updated: string;
  featuredOrder?: number;
};

// The homepage, learning directory, reader metadata, and sitemap share this list.
// Dates track content revisions, not cosmetic changes to the directory.
export const learningCatalog: readonly LearningItem[] = [
  {
    id: "deep-learning",
    category: "course",
    href: "/learning/deep-learning",
    localized: true,
    title: { zh: "深度学习导论", en: "Introduction to Deep Learning" },
    description: {
      zh: "从数据和损失出发，手算梯度下降、Softmax 与反向传播，把前三周的知识连成一次完整训练。",
      en: "Work through data, losses, gradient descent, Softmax, and backpropagation. The reading notes are in Chinese.",
    },
    topic: { zh: "机器学习", en: "Machine learning" },
    scope: { zh: "前三周 · 自学讲义伴读", en: "Weeks 1–3 · study notes" },
    updated: "2026-09-25",
    featuredOrder: 1,
  },
  {
    id: "robotics",
    category: "course",
    href: "/learning/robotics",
    localized: true,
    title: { zh: "机器人学导论", en: "Introduction to Robotics" },
    description: {
      zh: "从一次抓取理解机器人系统，再算清坐标变换、关节轨迹、末端速度与下一步行动。",
      en: "Connect robot hardware with coordinate transforms, trajectories, Jacobians, and decision-making. Notes are in Chinese.",
    },
    topic: { zh: "具身智能", en: "Embodied intelligence" },
    scope: {
      zh: "导论、硬件与数学基础",
      en: "Systems, hardware, and mathematics",
    },
    updated: "2026-09-25",
    featuredOrder: 2,
  },
  {
    id: "programming-2026",
    category: "course",
    href: "/teaching/programming-2026",
    localized: true,
    title: { zh: "程序设计 · 2026", en: "Programming · 2026" },
    description: {
      zh: "从基础输入输出开始，按讲次和课件编号查看、复制或下载 C++ 示例代码。",
      en: "Browse, copy, or download introductory C++ examples organized by lecture and slide number.",
    },
    topic: { zh: "程序设计", en: "Programming" },
    scope: { zh: "2026 学年 · C++ 代码伴读", en: "2026 · C++ code companion" },
    updated: "2026-09-07",
  },
  {
    id: "vscode-cpp",
    category: "guide",
    href: "/tutorials/vscode-cpp",
    localized: true,
    title: {
      zh: "VS Code C/C++ 环境配置伴读",
      en: "VS Code C/C++ setup companion",
    },
    description: {
      zh: "按 macOS 与 Windows 分流，把资料原意、解释和成功检查点放在同一阅读位置。",
      en: "Set up C/C++ on macOS or Windows with source instructions, explanations, and checkpoints together.",
    },
    topic: { zh: "开发环境", en: "Development environments" },
    scope: { zh: "双平台 · 分步完成", en: "Two platforms · step by step" },
    updated: "2026-08-25",
    featuredOrder: 3,
  },
  {
    id: "deepseek-harness",
    category: "guide",
    href: "/tutorials/deepseek-harness",
    localized: true,
    title: {
      zh: "DeepSeek Harness 本地部署伴读",
      en: "Run DeepSeek Harness locally",
    },
    description: {
      zh: "分 npx 快速启动与源码构建两条路线，讲清本地运行、模型端点、工作区安全和插件边界。",
      en: "Choose an npx quick start or a source build, with local runtime and workspace safety explained.",
    },
    topic: { zh: "AI 工具", en: "AI tools" },
    scope: { zh: "双路线 · 分步完成", en: "Two guided routes" },
    updated: "2026-08-25",
  },
  {
    id: "lean-ai4math-ai4tcs",
    category: "guide",
    href: "/tutorials/lean-ai4math-ai4tcs",
    localized: true,
    title: {
      zh: "Lean × AI4Math / AI4TCS 自学教程",
      en: "Lean for AI4Math and AI4TCS",
    },
    description: {
      zh: "从 Lean 与 mathlib 的共同基础出发，分流到形式数学或可验证算法，完成一个可审计小项目。",
      en: "Build a Lean and mathlib foundation, then pursue formal mathematics or verified algorithms in a small project.",
    },
    topic: { zh: "形式化方法", en: "Formal methods" },
    scope: {
      zh: "约 6 周 · 按检查点推进",
      en: "About 6 weeks · checkpoint-paced",
    },
    updated: "2026-08-25",
  },
  {
    id: "codex-guide",
    category: "guide",
    href: "/assets/codex-guide.html",
    localized: false,
    title: { zh: "Codex 项目交接指南", en: "Codex project handoff guide" },
    description: {
      zh: "用一套可复用的结构，整理项目上下文、决策、文件地图和临时资料。",
      en: "Organize project context, decisions, file maps, and temporary materials with a reusable structure.",
    },
    topic: { zh: "项目协作", en: "Project collaboration" },
    scope: { zh: "实践指南 · 含模板", en: "Chinese guide · templates" },
    updated: "2026-08-25",
  },
  {
    id: "personal-site-guide",
    category: "guide",
    href: "/assets/personal-site-guide.html",
    localized: false,
    title: { zh: "个人主页搭建指南", en: "Personal site guide" },
    description: {
      zh: "从页面整理到 GitHub Pages 发布，记录维护个人主页的流程与域名设置注意事项。",
      en: "A practical guide to a personal site, GitHub Pages publishing, and domain setup.",
    },
    topic: { zh: "网站维护", en: "Site maintenance" },
    scope: {
      zh: "实践指南 · 含操作提示",
      en: "Chinese guide · practical steps",
    },
    updated: "2026-08-25",
  },
  {
    id: "latex-style-notes",
    category: "guide",
    href: "/assets/latex-style-notes.html",
    localized: false,
    title: { zh: "LaTeX 讲义格式速记", en: "LaTeX lecture formatting notes" },
    description: {
      zh: "整理讲义排版的常用格式，直接在网页预览 PDF，也可下载留存。",
      en: "A compact formatting reference with an embedded PDF preview and a downloadable copy.",
    },
    topic: { zh: "技术写作", en: "Technical writing" },
    scope: { zh: "PDF 速查", en: "Chinese PDF reference" },
    updated: "2026-08-24",
  },
];

export const learningCategories = [
  { id: "course", anchor: "courses", title: { zh: "课程学习", en: "Courses" } },
  {
    id: "guide",
    anchor: "guides",
    title: { zh: "实践指南", en: "Practical guides" },
  },
] as const;

export function getLearningItem(id: string): LearningItem {
  const item = learningCatalog.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown learning item: ${id}`);
  return item;
}

export function learningItemHref(
  item: LearningItem,
  locale: LearningLocale,
): string {
  return (item.localized && locale === "en" ? "/en" : "") + item.href;
}

export function getFeaturedLearning(): LearningItem[] {
  return learningCatalog
    .filter((item) => item.featuredOrder !== undefined)
    .toSorted((a, b) => a.featuredOrder! - b.featuredOrder!)
    .slice(0, 3);
}
