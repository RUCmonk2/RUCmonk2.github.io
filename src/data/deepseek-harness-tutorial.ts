import type {
  TutorialRouteContent,
  TutorialStep,
} from "@/data/vscode-tutorial";

export type HarnessTutorialRoute = "quick" | "source";

type HarnessTutorialLocale = "zh" | "en";

const links = {
  video:
    "https://www.bilibili.com/video/BV1VkgK6NEZS/?share_source=copy_web&vd_source=c952e07faa5f811f92f6c1b8bfd22c95",
  product: "https://www.deepseek.com/harness/",
  repository: "https://github.com/deepseek-ai/deepseek-harness",
  quickstart:
    "https://deepseek-harness.github.io/deepseek-harness/guide/quickstart",
  providers:
    "https://deepseek-harness.github.io/deepseek-harness/guide/providers",
  pluginGuide:
    "https://deepseek-harness.github.io/deepseek-harness/develop/basic/",
  plugins: "https://github.com/topics/dsh-plugin",
  safety: "https://www.deepseek.com/harness/privacy/",
  node: "https://nodejs.org/en/download",
  nodeReleases: "https://nodejs.org/en/about/previous-releases",
  pnpm: "https://pnpm.io/installation",
  api: "https://platform.deepseek.com/",
};

const zhQuickSteps: TutorialStep[] = [
  {
    id: "quick-boundary",
    title: "先理解“本地部署”的边界",
    summary:
      "DeepSeek Harness 的 Web UI、工作区工具和会话运行在你的电脑上；默认配置 DeepSeek API 时，模型推理仍通过网络完成。",
    source: [
      "官方将 Harness 描述为本地优先、可扩展的 Coding Agent 与 Agent 开发运行环境。",
      "参考视频从本机启动、模型配置、运行模式和插件生态展开实测。",
      "项目仍处于开发者预览阶段，官方明确提醒后续可能出现破坏兼容性的变更。",
    ],
    why: "先分清本地 Harness 与本地模型，才能正确判断网络、API 费用、数据边界和硬件需求。仅启动 Harness 不等于把 DeepSeek 模型权重下载到了电脑上。",
    success:
      "你已经决定使用官方 DeepSeek API，或稍后在“自定义提供方”中连接自己控制的 OpenAI 兼容端点。",
    caution:
      "把本教程视为开发者预览版的入门路线。界面、命令参数和插件兼容性都可能继续变化。",
    sourcePages: "参考视频 + 官方产品页 / README · 核验于 2026-08-25",
    links: [
      {
        label: "DeepSeek Harness 官方产品页",
        href: links.product,
        note: "查看产品定位、四种运行模式、快速启动命令与开发者预览说明。",
        kind: "official",
      },
      {
        label: "参考视频：程序员鱼皮",
        href: links.video,
        note: "用于理解上手流程与实际体验；具体命令以官方仓库和文档为准。",
        kind: "reference",
      },
      {
        label: "官方安全使用政策",
        href: links.safety,
        note: "了解本地工具、提示注入、敏感信息与第三方插件带来的风险。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "这条路线会得到什么",
        items: [
          "本机浏览器中的 Harness Web UI。",
          "一个由你明确选择、允许 Agent 访问的本地工作区。",
          "通过 API 使用的模型；是否真正本地推理由你配置的模型端点决定。",
        ],
      },
      {
        title: "开始前的最低安全线",
        items: [
          "第一次只选择新建的空白测试文件夹，不选择桌面、主目录或重要项目。",
          "不要把 API Key、密码、私钥或未公开研究资料放进测试工作区。",
          "对写文件、运行命令、安装依赖和联网操作保留人工确认。",
        ],
      },
    ],
  },
  {
    id: "quick-node",
    title: "准备 Node.js 与隔离工作区",
    summary:
      "安装当前 LTS 版 Node.js，并为第一次试运行单独建立一个无敏感文件的目录。",
    source: [
      "官方快速启动要求先安装 Node.js。",
      "源码仓库当前声明 Node.js ^22.19.0 或 >=24.0.0；本教程建议使用 Node.js 24 LTS。",
      "运行 dsh 时所在目录会成为默认文件系统位置，但新 Web UI 仍需手动选择工作区。",
    ],
    why: "LTS 版本更适合入门与复现；隔离目录则把 Agent 初次试运行的可见范围限制在你准备好的材料内。",
    success:
      "终端能打印 Node.js 24.x 与 npm 版本；当前目录是专门创建的 Harness 测试目录。",
    caution:
      "安装 Node.js 后若命令仍无法识别，先关闭并重新打开终端。不要为了省事把整个用户目录作为工作区。",
    sourcePages: "官方 README / Node.js 发布页",
    links: [
      {
        label: "Node.js 官方下载",
        href: links.node,
        note: "优先选择页面标注的 LTS 版本，而不是已结束支持的旧版本。",
        kind: "official",
      },
      {
        label: "Node.js 版本生命周期",
        href: links.nodeReleases,
        note: "核对所用大版本是否仍处于 LTS 支持期。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "建立测试目录",
        items: [
          "在文件管理器中创建一个新目录，例如 dsh-sandbox。",
          "用终端进入该目录；后续从这里启动 Harness。",
          "目录内只放可以被读取、修改或删除的练习文件。",
        ],
      },
      {
        title: "版本检查怎么判断",
        items: [
          "node --version 应输出 v24 开头的版本号；v22.19 或更高的 v22 也符合当前源码要求。",
          "npm --version 应输出一个版本号，而不是 command not found。",
          "不要求与你看到的截图逐位一致，只需满足支持范围。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "检查 Node.js",
        value: "node --version",
        format: "terminal",
      },
      {
        label: "检查 npm",
        value: "npm --version",
        format: "terminal",
      },
    ],
  },
  {
    id: "quick-start",
    title: "启动本地 Web UI",
    summary:
      "在测试目录中运行官方 npx 命令；首次启动会获取所需软件包，然后在本机端口提供界面。",
    source: [
      "官方快速体验命令为 npx @deepseek-ai/dsh web。",
      "默认地址是 http://127.0.0.1:3080，本机启动时通常会自动打开浏览器。",
      "--no-open 可以只启动服务，--port 可以改用其他端口。",
    ],
    why: "npx 路线无需克隆和构建整个源码仓库，适合先确认界面、模型配置和工作区流程是否适合自己。",
    success:
      "终端显示本地访问地址，浏览器可以打开 Harness Web UI；终端进程保持运行。",
    caution:
      "第一次运行前核对包名必须是 @deepseek-ai/dsh。命令会下载并运行代码；不要从不明教程复制相似包名。",
    sourcePages: "官方 README · Run from npm",
    links: [
      {
        label: "DeepSeek Harness GitHub",
        href: links.repository,
        note: "README 维护快速启动与源码运行命令，也是版本变化时的首要核对位置。",
        kind: "official",
      },
      {
        label: "官方 Web UI 快速上手",
        href: links.quickstart,
        note: "启动后继续配置模型、选择工作区并运行第一个任务。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "首次运行时会发生什么",
        items: [
          "npx 解析并获取 @deepseek-ai/dsh 包。",
          "dsh 初始化 web profile 并启动本机服务。",
          "浏览器访问 127.0.0.1；这个地址只指向你自己的电脑。",
        ],
      },
      {
        title: "端口或浏览器有问题",
        items: [
          "若 3080 被占用，使用下方备用端口命令。",
          "若不希望自动打开浏览器，使用 --no-open，再手动复制终端地址。",
          "不要把服务直接暴露到公网；远程访问需要另行设计认证与网络边界。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "官方快速启动",
        value: "npx @deepseek-ai/dsh web",
        format: "terminal",
        note: "在准备好的隔离测试目录中运行；本网页不会执行。",
      },
      {
        label: "不自动打开浏览器",
        value: "npx @deepseek-ai/dsh web --no-open",
        format: "terminal",
      },
      {
        label: "改用 3081 端口",
        value: "npx @deepseek-ai/dsh web --port 3081",
        format: "terminal",
      },
    ],
  },
  {
    id: "quick-model",
    title: "配置模型与 API Key",
    summary:
      "进入 Settings → Models，在 DeepSeek 卡片中填写 API Key；也可以添加其他提供方或自定义兼容端点。",
    source: [
      "官方 Web UI 指南要求先配置模型，保存后不需要重启服务。",
      "DeepSeek Key 保存到 $DSH_HOME/.credentials.yaml，页面只接收脱敏描述，不会回显明文。",
      "自定义提供方需要 Provider ID、Base URL、协议、凭据和至少一个模型。",
    ],
    why: "Harness 负责 Agent 的工具、工作区和运行循环，模型提供方负责推理。没有可用模型时，会话输入不会形成完整执行链路。",
    success:
      "模型选择器中出现可用模型；新会话可以选中它，且没有 MISSING_CREDENTIAL 或 401 错误。",
    caution:
      "不要把真实 API Key 粘贴进聊天、截图、代码仓库或本教程的示例。使用官方 DeepSeek API 时会产生网络请求与可能的调用费用。",
    sourcePages: "官方模型配置指南",
    links: [
      {
        label: "DeepSeek 开放平台",
        href: links.api,
        note: "登录后管理 API Key、余额与调用信息。",
        kind: "official",
      },
      {
        label: "官方模型配置指南",
        href: links.providers,
        note: "包含 DeepSeek、目录提供方、自定义端点、模态与兼容性排错。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "使用 DeepSeek 官方 API",
        items: [
          "打开 Settings → Models。",
          "在 DeepSeek 卡片中粘贴自己的 API Key 并保存。",
          "返回会话页，从模型选择器中选择可用模型。",
        ],
      },
      {
        title: "连接真正的本地模型端点",
        items: [
          "先在本机准备一个 Harness 支持的 OpenAI 兼容服务；这不属于本教程的安装范围。",
          "在 Add custom provider 中填写小写 Provider ID、本地 Base URL、API 协议和模型 ID。",
          "端点可访问不等于请求格式一定兼容；遇到 developer role 或 max token 字段错误时查阅官方兼容性章节。",
        ],
      },
    ],
  },
  {
    id: "quick-workspace",
    title: "选择隔离工作区并收紧权限",
    summary:
      "点击 Choose workspace，添加启动 dsh 时所在的测试目录，并确认会话只围绕这块可丢弃内容展开。",
    source: [
      "官方指南说明：新 Web UI 不会自动选中工作区，选中之前会话输入框不可用。",
      "Agent 可以读取和编辑工作区文件、运行命令、委派工作并维护计划。",
      "官方安全政策建议使用专用虚拟机或容器、限制权限，并对重大操作始终要求人工确认。",
    ],
    why: "工作区决定了 Agent 最直接的操作对象。用空白测试目录开始，可以在不拿真实项目冒险的前提下理解审批和文件变更。",
    success:
      "页面显示你新建的测试目录，会话输入框变为可用；目录中没有密钥、私人文档或重要源码。",
    caution:
      "工作区不是绝对安全沙箱。对 Shell、联网和外部内容保持警惕；提示注入可能诱导 Agent 偏离原任务。",
    sourcePages: "官方 Web UI 指南 / 安全使用政策",
    links: [
      {
        label: "官方安全使用政策",
        href: links.safety,
        note: "建议隔离环境、限制权限、保护敏感信息并审查第三方扩展。",
        kind: "official",
      },
      {
        label: "官方 Web UI 指南",
        href: links.quickstart,
        note: "查看工作区选择和首个任务的官方最短路径。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "第一次不要选择这些位置",
        items: [
          "整个用户主目录、桌面或下载目录。",
          "包含 SSH 私钥、云凭据、浏览器资料或密码管理器导出的目录。",
          "未提交的重要论文、实验数据或正在使用的生产项目。",
        ],
      },
      {
        title: "更稳妥的选择",
        items: [
          "新建且内容可丢弃的练习目录。",
          "有 Git 版本控制、可以查看 diff 的测试仓库。",
          "需要更强隔离时，再迁移到权限受限的虚拟机或容器。",
        ],
      },
    ],
  },
  {
    id: "quick-first-task",
    title: "运行第一个只读任务",
    summary:
      "先让 Agent 总结工作区并列出计划，不允许修改文件；观察模型选择、审批请求、工具记录和最终回答。",
    source: [
      "官方示例任务是总结仓库并识别主要包。",
      "参考视频用实际项目展示 Harness 的执行、模式切换和轨迹能力。",
      "本教程把首次任务收窄为只读检查，先验证链路再开放写入。",
    ],
    why: "第一个任务的目标不是展示最大能力，而是确认模型、工作区、权限和会话日志按预期工作。",
    success:
      "Agent 能描述测试目录；没有擅自修改文件；你能在界面中查看执行过程或轨迹，并理解审批出现在哪里。",
    caution:
      "模型回答正确不代表所有工具调用都安全。允许写入前先查看计划与目标文件，完成后检查 Git diff 或文件变化。",
    sourcePages: "官方 Web UI 指南 + 参考视频",
    details: [
      {
        title: "建议的观察顺序",
        items: [
          "确认当前模型与工作区名称。",
          "发送只读提示词，观察是否产生工具调用。",
          "查看轨迹中模型输入、工具调用与结果的关系。",
          "确认没有文件变化，再开始一个允许创建单个练习文件的新会话。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "第一个安全提示词",
        value:
          "请只读取并总结当前工作区：列出文件结构、用途和你建议的下一步。不要修改文件，不要安装依赖，也不要执行命令；如确实需要任何操作，先说明原因并等我确认。",
        format: "text",
        note: "先验证只读链路；熟悉审批和轨迹后再逐步开放操作。",
      },
    ],
  },
  {
    id: "quick-modes",
    title: "理解四种运行模式",
    summary:
      "标准、PTC、极简与创造模式服务于不同目的；初学者先用标准模式完成小任务，再比较工具组合。",
    source: [
      "标准模式提供完整 Coding Agent 能力。",
      "PTC 模式让模型用 TypeScript 程序组合多步工具调用。",
      "极简模式仅保留持久 Shell 与文件编辑工具；创造模式用于检查运行时、试验插件和创作 preset。",
    ],
    why: "模式改变的不只是界面名称，也会改变 Agent 能看到和组合的能力。先理解工具面，再判断某次结果是否来自模型本身或 Harness 编排。",
    success:
      "你能说明四种模式各自适用的场景，并把标准模式作为日常入门默认值。",
    caution:
      "模式越灵活，越需要清晰的工作区与权限边界。创造模式和插件实验适合在源码路线与隔离环境中进行。",
    sourcePages: "官方产品页 · 多种运行模式 / 参考视频",
    links: [
      {
        label: "官方产品页：多种运行模式",
        href: links.product,
        note: "查看标准、PTC、极简和创造模式的官方定位。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "标准模式 · 日常使用",
        items: [
          "适合阅读代码、编辑文件、运行命令、计划任务与使用子 Agent。",
          "第一次体验和大多数常规编码任务从这里开始。",
        ],
      },
      {
        title: "PTC 模式 · 组合多步操作",
        items: [
          "保留标准能力，并让模型通过 Code Mode SDK 编排多轮工具调用。",
          "适合观察更程序化的工具组合，但仍需审查将要执行的动作。",
        ],
      },
      {
        title: "极简与创造模式",
        items: [
          "极简模式适合研究最小工具面或做对照测试。",
          "创造模式适合运行时检查、插件实验和 preset 创作，不是初次安装的必经步骤。",
        ],
      },
    ],
  },
  {
    id: "quick-maintain",
    title: "停止、重启与基础排错",
    summary:
      "在启动终端中按 Ctrl+C 停止服务；重新进入同一测试目录并运行启动命令即可再次打开。",
    source: [
      "web profile 首次使用会自动初始化，后续可再次启动。",
      "启动参数可以控制端口或禁止自动打开浏览器。",
      "官方模型指南列出 MISSING_CREDENTIAL、UNKNOWN_MODEL、401 和兼容端点错误。",
    ],
    why: "理解进程、端口、配置与模型错误的边界，可以避免把所有问题都误判成“安装失败”。",
    success:
      "你能主动停止服务，并在重启后重新进入 Web UI、看到模型与工作区配置。",
    caution:
      "开发者预览版更新很快。出现异常时先查看官方 README 与 Discussions，不要直接运行来路不明的修复脚本或删除配置目录。",
    sourcePages: "官方 CLI / 模型配置指南",
    links: [
      {
        label: "GitHub Discussions",
        href: "https://github.com/deepseek-ai/deepseek-harness/discussions",
        note: "搜索当前版本的已知问题，或按官方建议提交反馈。",
        kind: "official",
      },
      {
        label: "官方模型排错",
        href: `${links.providers}#排错`,
        note: "区分凭据、模型名称、401 与兼容端点请求格式问题。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "按现象定位",
        items: [
          "页面打不开：先看启动终端是否仍在运行，以及它实际打印的端口。",
          "MISSING_CREDENTIAL 或 401：回到 Models 检查 Key 与账户状态。",
          "UNKNOWN_MODEL：重新选择已配置模型，或检查自定义提供方的模型 ID。",
          "自定义端点拒绝请求：核对协议、Base URL 与官方 compat 配置说明。",
        ],
      },
      {
        title: "关于更新",
        items: [
          "重新运行未固定版本的 npx 命令时，可能获取更新版本。",
          "重要任务前记录当前版本，并先在隔离目录验证升级。",
          "兼容性变化以官方 README、发布记录和文档为准。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "重新启动",
        value: "npx @deepseek-ai/dsh web",
        format: "terminal",
      },
      {
        label: "停止服务",
        value: "Ctrl+C",
        format: "text",
        note: "在正在运行 dsh 的终端窗口中按下，不要粘贴到网页输入框。",
      },
    ],
  },
];

const zhSourceSteps: TutorialStep[] = [
  {
    id: "source-decide",
    title: "确认你确实需要源码路线",
    summary:
      "如果目标只是使用 Web UI，优先选择 npx；只有准备阅读源码、开发插件或修改运行时，才需要克隆并构建仓库。",
    source: [
      "官方 README 同时提供 npm 快速启动和源码运行两条路径。",
      "官方第一个插件教程要求先完成源码运行路径。",
      "参考视频把插件开发作为安装与基础实战之后的进阶内容。",
    ],
    why: "源码仓库依赖更多、构建更久，也更容易受快速迭代影响。先选择合适路线，可以减少无意义的下载与排错。",
    success:
      "你的目标包含阅读/修改 Harness 源码、开发本地插件或研究 Cordis 组合；否则返回快速启动路线。",
    caution:
      "以下命令只展示和复制，不会在你的电脑上执行。源码构建也不会自动获得模型访问权限。",
    sourcePages: "官方 README / 插件开发指南 / 参考视频",
    links: [
      {
        label: "DeepSeek Harness 官方仓库",
        href: links.repository,
        note: "查看源码、当前 README、许可证与最新兼容性说明。",
        kind: "official",
      },
      {
        label: "官方第一个插件教程",
        href: links.pluginGuide,
        note: "从完成源码构建的仓库开始创建最小插件。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "适合源码路线的目标",
        items: [
          "阅读 Harness 的包结构与 Cordis 插件组合。",
          "修改源码、参与贡献或调试尚未发布的变更。",
          "开发需要从本地 TypeScript 源文件加载的实验插件。",
        ],
      },
    ],
  },
  {
    id: "source-prerequisites",
    title: "准备 Git、Node.js 与 pnpm",
    summary:
      "使用 Node.js 24 LTS、Git 和仓库声明的 pnpm 11.7.0；先检查版本，再决定是否安装缺失工具。",
    source: [
      "仓库当前 engines 要求 Node.js ^22.19.0 或 >=24.0.0。",
      "根 package.json 当前声明 packageManager 为 pnpm@11.7.0。",
      "官方 README 的源码命令依赖 git 与 pnpm。",
    ],
    why: "源码构建对包管理器与运行时版本更敏感。与仓库声明对齐，能减少 lockfile 和构建工具链差异。",
    success:
      "git、node、npm 与 pnpm 都能输出版本；Node 使用受支持版本，pnpm 为 11.7.x。",
    caution:
      "不要同时使用 npm、yarn 和 pnpm 安装同一仓库依赖，也不要提交由错误包管理器生成的锁文件。",
    sourcePages: "仓库 package.json / 官方 README",
    links: [
      {
        label: "Node.js 官方下载",
        href: links.node,
        note: "推荐 Node.js 24 LTS。",
        kind: "official",
      },
      {
        label: "pnpm 官方安装文档",
        href: links.pnpm,
        note: "根据自己的系统选择官方支持的安装方式。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "只在检查失败时安装",
        items: [
          "先逐项运行版本检查，已有合适版本就不要重复安装。",
          "安装 Node.js 或 Git 后重新打开终端，再次检查。",
          "pnpm 安装方式随系统变化，以 pnpm 官方页面为准。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "检查工具链",
        value:
          "git --version\nnode --version\nnpm --version\npnpm --version",
        format: "terminal",
        note: "逐行执行；不要把多行输出误当成一条命令。",
      },
    ],
  },
  {
    id: "source-clone",
    title: "克隆官方仓库并确认来源",
    summary:
      "从 deepseek-ai/deepseek-harness 克隆源码，进入仓库后先查看当前分支和 README。",
    source: [
      "官方源码安装入口指向 github.com/deepseek-ai/deepseek-harness。",
      "README 的第一步是 git clone，随后进入 deepseek-harness 目录。",
    ],
    why: "核对组织名与远端地址，可以避免安装同名仿冒仓库；先读 README 能发现教程发布后出现的新要求。",
    success:
      "当前目录是 deepseek-harness，git remote -v 指向官方仓库，工作区没有你自己的敏感文件。",
    caution:
      "仓库体积和依赖量会随开发者预览版增长。确认磁盘空间和网络条件，不要把它克隆进现有项目内部。",
    sourcePages: "官方 README · Run from source",
    links: [
      {
        label: "官方源码仓库",
        href: links.repository,
        note: "组织名应为 deepseek-ai，仓库名应为 deepseek-harness。",
        kind: "official",
      },
    ],
    copyBlocks: [
      {
        label: "克隆官方仓库",
        value:
          "git clone https://github.com/deepseek-ai/deepseek-harness.git\ncd deepseek-harness",
        format: "terminal",
        note: "两行依次执行；克隆会下载完整源码。",
      },
      {
        label: "核对远端",
        value: "git remote -v",
        format: "terminal",
      },
    ],
  },
  {
    id: "source-install",
    title: "安装仓库依赖",
    summary:
      "在仓库根目录使用 pnpm install，并保留官方 lockfile；不要在安装过程中混入第三方脚本。",
    source: [
      "官方源码路线使用 pnpm install。",
      "仓库是多包工作区，依赖安装为后续构建准备各个 package。",
    ],
    why: "源码运行依赖仓库内多个 workspace 包，单独安装 CLI 子目录无法复现官方构建关系。",
    success:
      "pnpm install 正常结束，没有 lockfile 被其他包管理器替换；终端回到可输入状态。",
    caution:
      "安装依赖会执行软件包声明的生命周期脚本。先确认远端与提交来源，并在隔离环境中进行。",
    sourcePages: "官方 README · Run from source",
    details: [
      {
        title: "遇到错误先检查",
        items: [
          "确认位于包含 pnpm-workspace.yaml 的仓库根目录。",
          "确认 Node.js 与 pnpm 版本符合上一步。",
          "保留第一条真实错误信息，不要连续运行来源不明的清缓存或权限修复命令。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "安装依赖",
        value: "pnpm install",
        format: "terminal",
        note: "在 deepseek-harness 仓库根目录中运行。",
      },
    ],
  },
  {
    id: "source-build-run",
    title: "构建并启动源码版 Web UI",
    summary:
      "先运行完整构建，再使用 pnpm dsh web 启动已经生成的仓库产物。",
    source: [
      "官方顺序是 pnpm run build，然后 pnpm dsh web。",
      "README 说明 pnpm dsh web 会使用已构建产物，不会在每次启动时重新构建。",
      "默认 Web UI 地址仍是 http://127.0.0.1:3080。",
    ],
    why: "把构建与运行分开，能够区分 TypeScript/打包错误和 Web 服务启动错误，也便于修改源码后重新构建。",
    success:
      "构建命令成功结束；启动后终端给出本地地址，浏览器能打开 Web UI。",
    caution:
      "构建可能耗时并占用较多磁盘。若源码发生变化，需要根据修改范围重新构建，不能假设旧产物自动更新。",
    sourcePages: "官方 README · Run from source",
    copyBlocks: [
      {
        label: "构建仓库",
        value: "pnpm run build",
        format: "terminal",
      },
      {
        label: "启动源码版 Web UI",
        value: "pnpm dsh web",
        format: "terminal",
      },
    ],
  },
  {
    id: "source-configure",
    title: "配置模型、工作区与首个任务",
    summary:
      "源码版与 npx 版共用同一套 Web UI 逻辑：先配置模型，再选择隔离工作区，最后运行只读任务。",
    source: [
      "模型保存后下一次请求立即生效，不需要重启。",
      "选择工作区之前，会话输入框保持不可用。",
      "Agent 能读写文件和运行命令，因此源码仓库本身不应直接成为第一次可写试验对象。",
    ],
    why: "能启动界面只证明前端与运行时工作；完成模型、工作区和安全任务才算真正跑通端到端链路。",
    success:
      "模型可选、测试工作区已选中、只读任务有回复，且没有修改 Harness 源码或其他文件。",
    caution:
      "不要让第一次任务直接“优化整个 Harness 仓库”。另外建立 scratch workspace，并用版本控制检查所有变化。",
    sourcePages: "官方 Web UI / 模型配置指南",
    links: [
      {
        label: "官方 Web UI 指南",
        href: links.quickstart,
        note: "配置模型、选择工作区、运行任务。",
        kind: "official",
      },
      {
        label: "官方模型配置指南",
        href: links.providers,
        note: "DeepSeek API 与自定义 OpenAI 兼容端点。",
        kind: "official",
      },
    ],
    copyBlocks: [
      {
        label: "只读验证提示词",
        value:
          "请只读取当前测试工作区并说明它包含什么。不要修改文件，不要安装依赖，不要运行命令；先给出你准备采取的步骤。",
        format: "text",
      },
    ],
  },
  {
    id: "source-plugins",
    title: "把插件实验放在独立层",
    summary:
      "先完成基础链路，再按官方教程创建最小本地插件；社区插件只在审查仓库、权限和依赖后安装。",
    source: [
      "Harness 的模型、工具、技能、会话、沙箱、存储、循环、调度与 UI 都由插件组合。",
      "官方最小插件是导出 apply 函数的 TypeScript 模块，并通过 patch 载入 Web UI。",
      "CLI 的 plugin 子命令会把参数转发给目标 profile 中的 pnpm。",
    ],
    why: "插件拥有扩展工具和运行时行为的能力。把插件开发与日常工作区分开，便于理解新增权限、依赖和故障来源。",
    success:
      "你已阅读官方第一个插件教程，能区分本地源码插件、profile 插件依赖与未经审查的社区项目。",
    caution:
      "GitHub topic 只是发现入口，不代表 DeepSeek 审核或背书。只安装来源可信、代码可审查、权限范围明确的插件。",
    sourcePages: "官方插件教程 / CLI README / 安全使用政策",
    links: [
      {
        label: "官方第一个插件教程",
        href: links.pluginGuide,
        note: "从最小 apply 函数、patch 配置和本地加载理解插件生命周期。",
        kind: "official",
      },
      {
        label: "dsh-plugin 发现页",
        href: links.plugins,
        note: "仅用于发现社区项目；安装前必须自行审查。",
        kind: "third-party",
      },
      {
        label: "官方安全使用政策",
        href: links.safety,
        note: "明确要求只安装和运行来源可信、经过审查的插件与扩展。",
        kind: "official",
      },
    ],
    details: [
      {
        title: "安装前的审查清单",
        items: [
          "确认仓库维护者、许可证、最近提交与 issue 情况。",
          "阅读 package.json、安装脚本和插件申请的工具能力。",
          "先在隔离 profile 与测试工作区运行，不直接接触敏感项目。",
          "记录安装命令与版本，确保出现问题时知道新增了什么。",
        ],
      },
    ],
    copyBlocks: [
      {
        label: "社区插件安装命令模板",
        value:
          "pnpm dsh plugin --profile web add <reviewed-package-name>",
        format: "terminal",
        note: "这是需要替换占位符的命令结构，不可原样执行；先阅读插件自己的官方说明。",
      },
    ],
  },
  {
    id: "source-update",
    title: "记录版本，再更新源码",
    summary:
      "开发者预览阶段先记录当前提交和工作区状态；确认没有本地改动后，再获取官方更新并重新安装、构建。",
    source: [
      "官方明确说明未来会有破坏兼容性的变化。",
      "源码版运行依赖构建产物，因此更新代码后应重新检查依赖并构建。",
    ],
    why: "记录版本与本地修改可以让问题复现，也能判断错误来自自己的插件、未提交代码还是上游变更。",
    success:
      "你能用 git status 和 git rev-parse 记录当前状态，并知道更新前先备份自己的 patch、插件和配置。",
    caution:
      "不要在存在未提交改动时盲目 pull，也不要用 reset --hard 或批量删除来处理冲突。先备份并理解差异。",
    sourcePages: "官方 README · Developer preview",
    links: [
      {
        label: "官方仓库提交记录",
        href: `${links.repository}/commits/master/`,
        note: "更新前查看近期变更与发布提交。",
        kind: "official",
      },
      {
        label: "GitHub Discussions",
        href: `${links.repository}/discussions`,
        note: "搜索版本相关问题和兼容性反馈。",
        kind: "official",
      },
    ],
    copyBlocks: [
      {
        label: "记录当前状态",
        value: "git status --short\ngit rev-parse HEAD",
        format: "terminal",
        note: "先查看输出；本教程不提供覆盖本地改动的破坏性更新命令。",
      },
    ],
  },
];

function englishStep(
  step: TutorialStep,
  overrides: Partial<TutorialStep>,
): TutorialStep {
  return { ...step, ...overrides };
}

const enQuickSteps: TutorialStep[] = [
  englishStep(zhQuickSteps[0], {
    title: "Define what “local” means",
    summary:
      "The Harness UI and tools run on your computer; with the default DeepSeek API configuration, model inference still happens over the network.",
    source: [
      "DeepSeek describes Harness as a local-first, extensible coding-agent runtime.",
      "The reference video covers local launch, model setup, four modes, and plugins.",
      "The project is a developer preview and may introduce breaking changes.",
    ],
    why: "Separating a local harness from a local model clarifies network use, API cost, data boundaries, and hardware requirements.",
    success:
      "You have chosen the official DeepSeek API or a compatible endpoint that you control.",
    caution:
      "Treat this as a developer-preview workflow and recheck the official README when versions change.",
    sourcePages: "Reference video + official product page / README · checked 2026-08-25",
  }),
  englishStep(zhQuickSteps[1], {
    title: "Prepare Node.js and an isolated workspace",
    summary:
      "Use Node.js 24 LTS and create a disposable folder with no sensitive files for the first run.",
    source: [
      "The official quick start requires Node.js.",
      "The source repository currently accepts Node ^22.19.0 or >=24.0.0.",
      "The launch directory is the default filesystem location, but a workspace must still be selected in a fresh UI.",
    ],
    why: "An LTS runtime improves reproducibility, while an isolated folder limits the material exposed during first use.",
    success:
      "Node and npm print versions, and your terminal is inside a disposable Harness test directory.",
    caution:
      "Restart the terminal after installing Node. Do not select your entire home directory as a workspace.",
    sourcePages: "Official README / Node.js release page",
  }),
  englishStep(zhQuickSteps[2], {
    title: "Start the local Web UI",
    summary:
      "Run the official npx command from the test directory; it starts the UI on a loopback address.",
    source: [
      "The official command is npx @deepseek-ai/dsh web.",
      "The default URL is http://127.0.0.1:3080.",
      "Use --no-open to suppress browser launch or --port to choose another port.",
    ],
    why: "The npx path lets you validate the product before cloning and building the full monorepo.",
    success:
      "The terminal prints a local URL and the Harness UI opens while the process keeps running.",
    caution:
      "Verify the exact package name @deepseek-ai/dsh before allowing npx to download and execute it.",
    sourcePages: "Official README · Run from npm",
  }),
  englishStep(zhQuickSteps[3], {
    title: "Configure a model and credential",
    summary:
      "Open Settings → Models, save a DeepSeek API key, or configure a provider and endpoint that you control.",
    source: [
      "Model changes apply to the next request without a restart.",
      "The key is write-only in the UI and is stored in $DSH_HOME/.credentials.yaml.",
      "A custom provider needs an ID, base URL, protocol, credential, and model.",
    ],
    why: "Harness supplies the agent runtime; the configured provider supplies model inference.",
    success:
      "A model is selectable with no MISSING_CREDENTIAL or 401 error.",
    caution:
      "Never place a real API key in chat, screenshots, or a repository. Official API use involves network requests and possible charges.",
    sourcePages: "Official provider guide",
  }),
  englishStep(zhQuickSteps[4], {
    title: "Select an isolated workspace",
    summary:
      "Choose the disposable launch directory and keep approval required for meaningful file, shell, or network changes.",
    source: [
      "A fresh Web UI has no selected workspace and disables the composer until one is chosen.",
      "The agent can read and edit files, run commands, delegate work, and maintain a plan.",
      "DeepSeek recommends limited privileges and human confirmation for consequential actions.",
    ],
    why: "The workspace is the agent's primary operating surface, so a disposable directory makes early behavior easier to inspect.",
    success:
      "The composer is enabled for a workspace containing no credentials, private documents, or important source code.",
    caution:
      "A workspace is not an absolute sandbox. Treat web content and other untrusted data as prompt-injection risks.",
    sourcePages: "Official Web UI guide / safety policy",
  }),
  englishStep(zhQuickSteps[5], {
    title: "Run a read-only first task",
    summary:
      "Ask for a workspace summary without file changes, then inspect approvals, tool calls, trajectory, and the final answer.",
    source: [
      "The official quick start begins with a repository summary task.",
      "The reference video demonstrates execution, modes, and trajectories on projects.",
      "This guide narrows the first task to a read-only verification.",
    ],
    why: "The first goal is to verify the model, workspace, permissions, and session log—not maximum autonomy.",
    success:
      "The agent describes the directory without modifying it, and you can follow the recorded execution path.",
    caution:
      "A plausible final answer does not make every tool call safe. Inspect proposed and completed changes.",
    sourcePages: "Official Web UI guide + reference video",
    copyBlocks: [
      {
        label: "Safe first prompt",
        value:
          "Read and summarize the current workspace only. List its structure, purpose, and suggested next step. Do not modify files, install dependencies, or run commands; explain and wait for my approval if any action is necessary.",
        format: "text",
      },
    ],
  }),
  englishStep(zhQuickSteps[6], {
    title: "Understand the four modes",
    summary:
      "Standard, PTC, minimal, and creator modes expose different compositions; begin with standard mode.",
    source: [
      "Standard mode supplies the full coding-agent toolset.",
      "PTC lets the model compose multi-step tool use through TypeScript.",
      "Minimal retains a persistent shell and editor; creator mode is for runtime and plugin experimentation.",
    ],
    why: "Mode selection changes the tool surface and orchestration, not merely the label in the UI.",
    success:
      "You can explain the purpose of each mode and use standard mode as the default starting point.",
    caution:
      "Flexible modes still require explicit workspace and approval boundaries.",
    sourcePages: "Official product page · execution modes / reference video",
  }),
  englishStep(zhQuickSteps[7], {
    title: "Stop, restart, and troubleshoot",
    summary:
      "Press Ctrl+C in the launch terminal to stop; rerun the same command from the same directory to restart.",
    source: [
      "The web profile initializes on first use and can be launched again.",
      "Launch flags control the browser and port.",
      "The provider guide documents credential, model, 401, and endpoint-compatibility errors.",
    ],
    why: "Separating process, port, credential, and model errors prevents every failure from being treated as an installation failure.",
    success:
      "You can stop and restart the service and recover the configured UI.",
    caution:
      "Consult the official README and Discussions before running third-party repair scripts or deleting state.",
    sourcePages: "Official CLI / provider guide",
  }),
];

const enSourceSteps: TutorialStep[] = [
  englishStep(zhSourceSteps[0], {
    title: "Confirm that you need the source path",
    summary:
      "Use npx for normal Web UI use; clone the monorepo when you intend to inspect, modify, or extend Harness.",
    source: [
      "The official README documents both npm and source workflows.",
      "The first-party plugin tutorial starts from a completed source build.",
      "The reference video treats plugin development as an advanced stage.",
    ],
    why: "A source build has more dependencies and compatibility surface, so it should serve a concrete development goal.",
    success:
      "Your goal includes source inspection, runtime changes, or local plugin development.",
    caution:
      "The commands are presented for review and copying only; this page does not execute them.",
    sourcePages: "Official README / plugin guide / reference video",
  }),
  englishStep(zhSourceSteps[1], {
    title: "Prepare Git, Node.js, and pnpm",
    summary:
      "Use Node.js 24 LTS, Git, and the repository-declared pnpm 11.7.0, checking versions before installing anything.",
    source: [
      "The repository currently requires Node ^22.19.0 or >=24.0.0.",
      "Its root packageManager field currently names pnpm@11.7.0.",
      "The source workflow requires Git and pnpm.",
    ],
    why: "Matching the declared toolchain reduces lockfile and build-system differences.",
    success:
      "Git, Node, npm, and pnpm all print supported versions.",
    caution:
      "Do not mix npm, Yarn, and pnpm inside the same checkout.",
    sourcePages: "Repository package.json / official README",
  }),
  englishStep(zhSourceSteps[2], {
    title: "Clone and verify the official repository",
    summary:
      "Clone deepseek-ai/deepseek-harness, enter the checkout, and verify the remote before installing dependencies.",
    source: [
      "The official source URL belongs to the deepseek-ai organization.",
      "The README enters the deepseek-harness directory after cloning.",
    ],
    why: "Verifying the remote reduces the risk of building a similarly named repository from another publisher.",
    success:
      "The origin remote points to the official repository and the checkout contains no private project files.",
    caution:
      "Check disk and network availability, and do not nest this checkout inside an existing project.",
    sourcePages: "Official README · Run from source",
  }),
  englishStep(zhSourceSteps[3], {
    title: "Install workspace dependencies",
    summary:
      "Run pnpm install at the repository root and keep the checked-in lockfile authoritative.",
    source: [
      "The official source workflow uses pnpm install.",
      "The monorepo installation prepares multiple workspace packages for the build.",
    ],
    why: "Installing only the CLI subdirectory does not reproduce the repository's workspace relationships.",
    success:
      "pnpm exits successfully without replacing the lockfile through another package manager.",
    caution:
      "Dependency installation can execute lifecycle scripts; perform it only after verifying the source in an isolated environment.",
    sourcePages: "Official README · Run from source",
  }),
  englishStep(zhSourceSteps[4], {
    title: "Build and run the source Web UI",
    summary:
      "Build the repository, then launch dsh from the prepared artifacts.",
    source: [
      "The official order is pnpm run build followed by pnpm dsh web.",
      "The launch command uses existing build artifacts without rebuilding.",
      "The default local URL remains http://127.0.0.1:3080.",
    ],
    why: "Separate build and run stages distinguish compilation failures from server-start failures.",
    success:
      "The build completes and the Web UI opens from the URL printed in the terminal.",
    caution:
      "Source changes may require another build; old artifacts do not update themselves.",
    sourcePages: "Official README · Run from source",
  }),
  englishStep(zhSourceSteps[5], {
    title: "Configure the end-to-end path",
    summary:
      "Configure a model, select a disposable workspace, and run the read-only verification task.",
    source: [
      "Model changes apply without a restart.",
      "The composer remains disabled until a workspace is selected.",
      "The agent can edit and execute, so do not use the Harness checkout as the first writable test target.",
    ],
    why: "A running UI proves only startup; a safe model-and-workspace task validates the full path.",
    success:
      "The selected model answers inside the disposable workspace without changing files.",
    caution:
      "Create a separate scratch workspace and inspect all later changes with version control.",
    sourcePages: "Official Web UI / provider guide",
    copyBlocks: [
      {
        label: "Read-only verification prompt",
        value:
          "Read the current test workspace and explain what it contains. Do not modify files, install dependencies, or run commands; give me your proposed steps first.",
        format: "text",
      },
    ],
  }),
  englishStep(zhSourceSteps[6], {
    title: "Keep plugin experiments isolated",
    summary:
      "Complete the basic path first, then follow the first-party minimal-plugin tutorial and review every community dependency.",
    source: [
      "Harness composes models, tools, sessions, storage, loops, scheduling, and UI through plugins.",
      "The official minimal plugin exports an apply function and loads through a patch.",
      "The CLI plugin command forwards package-manager arguments into a profile.",
    ],
    why: "Plugins can extend tools and runtime behavior, so they deserve their own profile, workspace, and review boundary.",
    success:
      "You can distinguish a local source plugin, profile dependency, and unreviewed community project.",
    caution:
      "A GitHub topic is a discovery surface, not an endorsement. Install only reviewed and trusted code.",
    sourcePages: "Official plugin guide / CLI README / safety policy",
    copyBlocks: [
      {
        label: "Community plugin command template",
        value:
          "pnpm dsh plugin --profile web add <reviewed-package-name>",
        format: "terminal",
        note: "Replace the placeholder only after reviewing a plugin's own documentation; do not run this literal string.",
      },
    ],
  }),
  englishStep(zhSourceSteps[7], {
    title: "Record state before updating",
    summary:
      "Record the current commit and working tree before fetching preview changes and rebuilding.",
    source: [
      "DeepSeek warns that the developer preview will include breaking changes.",
      "A source update changes inputs to the built artifacts and requires fresh validation.",
    ],
    why: "Version and diff records distinguish local plugin changes from upstream compatibility breaks.",
    success:
      "You can record git status and the current commit and have backed up your own patches and configuration.",
    caution:
      "Do not pull over uncommitted work or use destructive reset commands to bypass conflicts.",
    sourcePages: "Official README · Developer preview",
  }),
];

const localizedRoutes: Record<
  HarnessTutorialLocale,
  Record<HarnessTutorialRoute, TutorialRouteContent>
> = {
  zh: {
    quick: {
      badge: ">_",
      label: "npx 快速启动",
      time: "约 20–40 分钟",
      intro:
        "适合第一次体验：准备 Node.js，在隔离目录启动 Web UI，配置模型并完成一个只读任务。不会克隆或构建完整源码仓库。",
      steps: zhQuickSteps,
    },
    source: {
      badge: "{ }",
      label: "源码构建",
      time: "约 45–120 分钟",
      intro:
        "适合准备阅读源码、开发插件或修改 Harness 的用户：核对工具链，克隆官方仓库，安装依赖、构建并运行。",
      steps: zhSourceSteps,
    },
  },
  en: {
    quick: {
      badge: ">_",
      label: "Quick start with npx",
      time: "About 20–40 minutes",
      intro:
        "Best for a first run: prepare Node.js, start the Web UI from an isolated directory, configure a model, and complete a read-only task.",
      steps: enQuickSteps,
    },
    source: {
      badge: "{ }",
      label: "Build from source",
      time: "About 45–120 minutes",
      intro:
        "For source inspection, plugin development, or runtime changes: verify the toolchain, clone the official repository, install, build, and run.",
      steps: enSourceSteps,
    },
  },
};

export function getDeepseekHarnessTutorialRoutes(
  isEnglish: boolean,
): Record<HarnessTutorialRoute, TutorialRouteContent> {
  return localizedRoutes[isEnglish ? "en" : "zh"];
}

