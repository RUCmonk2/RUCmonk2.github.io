export type LocalizedTutorialText = {
  zh: string;
  en: string;
};

export type TutorialCatalogItem = {
  slug: string;
  href: string;
  title: LocalizedTutorialText;
  description: LocalizedTutorialText;
  platforms: string[];
  readingTime: LocalizedTutorialText;
  status: "published";
};

export type TutorialCategory = {
  slug: string;
  index: string;
  title: LocalizedTutorialText;
  description: LocalizedTutorialText;
  tutorials: TutorialCatalogItem[];
};

export const tutorialCatalog: TutorialCategory[] = [
  {
    slug: "development-environment",
    index: "01",
    title: {
      zh: "开发环境与工具",
      en: "Development environments",
    },
    description: {
      zh: "把安装、配置与验证过程整理成能够逐步检查的技术路径。",
      en: "Turn installation, configuration, and verification into technical paths that can be checked step by step.",
    },
    tutorials: [
      {
        slug: "vscode-cpp",
        href: "/tutorials/vscode-cpp",
        title: {
          zh: "VS Code C/C++ 环境配置伴读",
          en: "VS Code C/C++ setup companion",
        },
        description: {
          zh: "按 macOS 与 Windows 分流，把资料原意、解释和成功检查点放在同一阅读位置。",
          en: "Separate the macOS and Windows routes while keeping source instructions, explanations, and checkpoints together.",
        },
        platforms: ["macOS", "Windows 10–11"],
        readingTime: {
          zh: "分步完成",
          en: "Checkpoint-paced",
        },
        status: "published",
      },
    ],
  },
];

export const plannedTutorialCategories: LocalizedTutorialText[] = [
  { zh: "AI 与研究工作流", en: "AI and research workflows" },
  { zh: "学习系统", en: "Learning systems" },
  { zh: "技术写作", en: "Technical writing" },
];
