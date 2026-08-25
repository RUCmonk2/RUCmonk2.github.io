"use client";

import {
  Check,
  ChevronRight,
  Clipboard,
  ExternalLink,
  Laptop,
  MonitorCog,
  ShieldAlert,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";

type Platform = "mac" | "windows";

type GuideLink = {
  label: string;
  href: string;
};

type GuideCommand = {
  label: string;
  value: string;
  note?: string;
  optional?: boolean;
};

type GuideIssue = {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  actions: string[];
  avoid?: string[];
  commands?: GuideCommand[];
  links?: GuideLink[];
};

type PlatformContent = {
  label: string;
  badge: string;
  terminal: string;
  support: string;
  shell: string;
  issues: GuideIssue[];
};

const officialLinks = {
  deepseekReadme: "https://github.com/deepseek-ai/deepseek-harness",
  deepseekQuickstart:
    "https://deepseek-harness.github.io/deepseek-harness/guide/quickstart",
  deepseekProviders:
    "https://deepseek-harness.github.io/deepseek-harness/guide/providers",
  deepseekWindows:
    "https://github.com/deepseek-ai/deepseek-harness/blob/master/.agents/notes/implemented/feature/2026-08-01-windows-pwsh-default.zh.md",
  deepseekPicker:
    "https://github.com/deepseek-ai/deepseek-harness/discussions/998",
  deepseekPython:
    "https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/python-sdk.zh.md",
  executionPolicy:
    "https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies",
  commandPrecedence:
    "https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_command_precedence",
  node: "https://nodejs.org/en/download",
};

const zhPlatforms: Record<Platform, PlatformContent> = {
  windows: {
    label: "Windows 10 / 11",
    badge: "⊞",
    terminal: "Windows Terminal · PowerShell 或命令提示符",
    support:
      "官方 dsh web 已提供 Windows 原生路径；启动后的 Agent Shell 默认使用 PowerShell，而不是 Bash。",
    shell: "PowerShell 路径、$env:NAME 环境变量与 Windows ACL 权限语义",
    issues: [
      {
        id: "windows-execution-policy",
        title: "PowerShell 提示“无法加载 npx.ps1”",
        symptom:
          "错误中出现 PSSecurityException、UnauthorizedAccess，或“在此系统上禁止运行脚本”；路径通常指向 C:\\Program Files\\nodejs\\npx.ps1。",
        cause:
          "Node.js 已经安装，真正被拦截的是 PowerShell 的 npx.ps1 命令包装脚本。它发生在 DeepSeek Harness 启动之前，不代表 dsh 包损坏。",
        actions: [
          "先运行 Get-ExecutionPolicy -List，判断限制来自当前用户、当前进程还是单位组策略。",
          "首选直接调用 npx.cmd；它不需要修改 PowerShell 执行策略。",
          "也可以打开“命令提示符（cmd）”，在那里运行普通 npx 命令。",
          "只有在个人电脑、理解影响且确实希望 PowerShell 运行本地脚本时，才考虑把 CurrentUser 调整为 RemoteSigned。",
          "若 MachinePolicy 或 UserPolicy 有值，说明由组织策略管理；不要尝试绕过，应联系管理员。",
        ],
        avoid: [
          "不要为了这一个错误把 LocalMachine 设置为 Bypass 或 Unrestricted。",
          "不要仅为运行 npx 就以管理员身份执行来路不明的修复脚本。",
          "不要把截图中的微软帮助链接误认为 DeepSeek Harness 报错链接。",
        ],
        commands: [
          {
            label: "只读检查：查看全部策略",
            value: "Get-ExecutionPolicy -List",
          },
          {
            label: "推荐：不修改策略，直接调用 Windows 包装器",
            value: "npx.cmd @deepseek-ai/dsh web",
          },
          {
            label: "可选：仅当前用户允许本地脚本",
            value:
              "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned",
            note: "这会持续影响当前用户。先阅读微软说明，并在 PowerShell 要求确认时理解选择含义。",
            optional: true,
          },
          {
            label: "撤销上面的 CurrentUser 自定义设置",
            value:
              "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Undefined",
            note: "只用于撤销你自己设置的 CurrentUser 项；不会覆盖更高优先级的组策略。",
            optional: true,
          },
        ],
        links: [
          {
            label: "Microsoft：PowerShell 执行策略",
            href: officialLinks.executionPolicy,
          },
          {
            label: "Microsoft：命令解析顺序",
            href: officialLinks.commandPrecedence,
          },
        ],
      },
      {
        id: "windows-path",
        title: "node、npm 或 npx 显示“不是内部或外部命令”",
        symptom:
          "PowerShell 或 cmd 无法识别 node / npm / npx，或者安装 Node.js 后仍显示旧版本。",
        cause:
          "最常见原因是终端尚未读取更新后的 PATH，或系统安装了多个 Node.js 版本。",
        actions: [
          "关闭所有终端窗口，再重新打开 Windows Terminal。",
          "依次检查 node、npm 和 npx.cmd；用 where.exe 查看命令实际来自哪里。",
          "若仍缺失，从 Node.js 官方页面重新安装当前 LTS 版本，并确认安装器启用了 PATH。",
          "不要在一次排错中同时安装多个 Node 版本管理器。",
        ],
        commands: [
          {
            label: "版本与路径检查",
            value:
              "node --version\nnpm --version\nnpx.cmd --version\nwhere.exe node\nwhere.exe npx",
            note: "逐行执行；如果出现多个路径，优先确认当前使用的是预期的 Node.js 安装。",
          },
        ],
        links: [{ label: "Node.js 官方下载", href: officialLinks.node }],
      },
      {
        id: "windows-shell",
        title: "Harness 启动了，但 Agent 的命令看起来不像教程",
        symptom:
          "Agent 使用 Get-ChildItem、$env:NAME 或反斜杠路径；照搬 Mac 教程中的 export、$PWD/foo 或 Bash 管道后失败。",
        cause:
          "Windows 交付 profile 会自动选择 PowerShell 工具栈。Windows 与 macOS 的 Shell 方言和路径语义本来就不同。",
        actions: [
          "让 Agent 明确按 PowerShell 语法生成命令。",
          "不要把 Bash 提示词或脚本原样交给 Windows Agent。",
          "每次执行前检查盘符、反斜杠路径和 $env:NAME 环境变量。",
          "需要跨平台时，分别写 PowerShell 与 Bash 两个版本。",
        ],
        avoid: ["不要为了获得 Bash 就随意混用 Git Bash、MSYS2、WSL 与原生 Node。"],
        links: [
          {
            label: "DeepSeek：Windows 默认 PowerShell",
            href: officialLinks.deepseekWindows,
          },
        ],
      },
      {
        id: "windows-picker",
        title: "点击 Choose workspace / Add workspace 没反应",
        symptom:
          "Web UI 正常打开，但点击添加工作区后没有文件夹选择窗口，也没有明显错误。",
        cause:
          "Windows 和 macOS 默认可能调用原生目录选择器；当 dsh 由后台、服务或无交互桌面的进程启动时，窗口可能无法显示。开发者预览版也出现过相关报告。",
        actions: [
          "在可见的 Windows Terminal 前台直接启动 dsh，不要先做后台服务。",
          "保持启动终端打开，再回到浏览器重试。",
          "确认文件夹选择窗口没有出现在其他桌面或窗口后方。",
          "若问题持续，记录 dsh 版本、Windows 版本和启动方式，再搜索官方 Discussions。",
        ],
        avoid: ["不要用第三方一键包掩盖问题，也不要因此把整个用户目录设为工作区。"],
        links: [
          {
            label: "官方讨论：后台启动时目录选择器无响应",
            href: officialLinks.deepseekPicker,
          },
        ],
      },
      {
        id: "windows-permissions",
        title: "公司电脑、OneDrive 或受保护目录中无法写入",
        symptom:
          "命令能运行，但创建文件、安装依赖或修改工作区时被拒绝；执行策略也可能被 MachinePolicy / UserPolicy 固定。",
        cause:
          "组织组策略、杀毒软件、受控文件夹访问、云盘同步和 NTFS ACL 都可能限制本地 Agent。Harness 的 Windows ACL 沙箱也只报告部分强制。",
        actions: [
          "先在自己拥有的短路径测试目录中验证，例如用户目录下新建的 dsh-sandbox。",
          "查看 Get-ExecutionPolicy -List；若是组策略，不要自行绕过。",
          "不要把 OneDrive、公司项目盘或受保护系统目录作为第一次工作区。",
          "需要使用单位电脑时，先获得管理员或信息安全人员许可。",
        ],
        avoid: ["不要把 danger-full-access 或管理员终端当作一般权限错误的默认解决办法。"],
      },
    ],
  },
  mac: {
    label: "macOS",
    badge: "⌘",
    terminal: "Terminal · zsh（Harness 工具为 POSIX/Bash 路线）",
    support:
      "npx Web UI 主线可以在 macOS 使用；Shell、隐私权限与芯片架构需要按 Mac 环境判断。",
    shell: "POSIX 路径、Bash 工具语义与 macOS 隐私授权",
    issues: [
      {
        id: "mac-path",
        title: "终端提示 command not found: node / npm / npx",
        symptom:
          "运行版本检查或启动命令时，zsh 表示找不到 node、npm 或 npx。",
        cause:
          "Node.js 未安装、终端尚未重新读取 PATH，或多个 Node 安装方式相互覆盖。",
        actions: [
          "从 Node.js 官方页面安装当前 LTS 版本。",
          "完全退出并重新打开 Terminal，再检查版本和命令位置。",
          "用 command -v 判断当前命令来自哪个路径。",
          "若已有多个 Node 管理方式，先弄清当前 shell 配置，不要继续叠加安装。",
        ],
        commands: [
          {
            label: "版本与路径检查",
            value:
              "node --version\nnpm --version\nnpx --version\ncommand -v node\ncommand -v npx",
            note: "逐行执行；路径应指向你实际安装的 Node.js。",
          },
        ],
        links: [{ label: "Node.js 官方下载", href: officialLinks.node }],
      },
      {
        id: "mac-privacy",
        title: "无法访问桌面、文稿或下载目录",
        symptom:
          "选择目录或读取文件时出现 macOS 隐私提示，或者 Terminal / dsh 对某些目录没有访问权限。",
        cause:
          "macOS 会单独保护桌面、文稿、下载、外置磁盘等位置；是否允许取决于启动 dsh 的终端应用及系统隐私设置。",
        actions: [
          "第一次在用户拥有的新建测试目录中运行，不要直接选择整个主目录。",
          "若系统弹出文件与文件夹授权，只为确实需要的位置授权。",
          "在系统设置 → 隐私与安全性中检查启动 dsh 的 Terminal 或终端应用。",
          "完成测试后复查授权范围，避免无必要的完全磁盘访问。",
        ],
        avoid: ["不要把“完全磁盘访问”作为所有读写问题的第一解决办法。"],
      },
      {
        id: "mac-shell",
        title: "把 Windows PowerShell 命令复制到 Mac 后失败",
        symptom:
          "命令中包含 Get-ChildItem、$env:NAME、盘符或反斜杠路径，在 zsh / Bash 中无法识别。",
        cause:
          "macOS 使用 POSIX 路线，和 Windows PowerShell 的命令、环境变量和路径格式不同。",
        actions: [
          "让 Agent 明确按 macOS / Bash 语法生成命令。",
          "环境变量通常使用 export NAME=value，路径使用正斜杠。",
          "跨平台教程应分别提供 PowerShell 和 Bash 版本，不做逐字照搬。",
        ],
        avoid: ["不要只修改斜杠就假设一段 PowerShell 脚本已经变成 Bash。"],
      },
      {
        id: "mac-picker",
        title: "添加工作区时文件夹窗口不出现",
        symptom:
          "Web UI 可用，但 Choose workspace 没有打开 macOS 原生目录选择窗口。",
        cause:
          "当 dsh 被后台进程、自动化工具或没有可见桌面的父进程启动时，原生选择器可能无法呈现。",
        actions: [
          "在一个可见的 Terminal 窗口中前台运行 dsh。",
          "保持终端开启，检查选择窗口是否藏在浏览器或其他桌面后面。",
          "停止后台实例后，再从测试目录重新前台启动。",
          "仍无法使用时记录 macOS、dsh 与 Node 版本并查阅官方讨论。",
        ],
        links: [
          {
            label: "官方讨论：后台启动时目录选择器无响应",
            href: officialLinks.deepseekPicker,
          },
        ],
      },
      {
        id: "mac-architecture",
        title: "Apple Silicon、Intel Mac 与 Python SDK 混淆",
        symptom:
          "npx Web UI、源码构建和 Python SDK 的平台要求被当成同一件事，导致误判自己的 Mac 是否支持。",
        cause:
          "这三条路线的分发方式不同。当前官方 Python SDK 明确列出 macOS 14+ arm64，但本教程的 npx Web UI 并不是 Python SDK。",
        actions: [
          "只使用本教程 Web UI 时，先按 Node.js / npx 主线检查，不要套用 Python wheel 要求。",
          "准备使用 Python SDK 时，确认 macOS 版本和 uname -m 输出为 arm64。",
          "Intel Mac 或非官方组合应先查当前发布说明，不要把社区打包版当作官方兼容承诺。",
        ],
        commands: [
          {
            label: "检查 macOS 与芯片架构",
            value: "sw_vers\nuname -m",
            note: "Apple Silicon 原生终端通常输出 arm64；x86_64 可能是 Intel Mac 或 Rosetta 环境。",
          },
        ],
        links: [
          {
            label: "DeepSeek：Python SDK 平台要求",
            href: officialLinks.deepseekPython,
          },
        ],
      },
    ],
  },
};

const zhCommonIssues: GuideIssue[] = [
  {
    id: "common-package-prompt",
    title: "首次启动询问是否安装软件包，或下载一直失败",
    symptom:
      "npx 显示 Need to install the following packages，或出现 registry、TLS、proxy、ETIMEDOUT 等网络错误。",
    cause:
      "npx 首次运行需要从 npm 获取 @deepseek-ai/dsh；网络代理、证书检查或错误 registry 会在 Harness 启动前阻断下载。",
    actions: [
      "先核对包名必须准确为 @deepseek-ai/dsh，再决定是否继续。",
      "检查 npm 当前 registry 与包版本是否可读取。",
      "单位网络出现代理或证书错误时，使用组织提供的配置，不关闭 TLS 校验。",
      "不要从陌生网盘下载所谓免安装包来绕过网络问题。",
    ],
    avoid: ["不要设置 strict-ssl=false，也不要永久替换成无法确认来源的 registry。"],
    commands: [
      {
        label: "只读检查：registry 与官方包版本",
        value:
          "npm config get registry\nnpm view @deepseek-ai/dsh version",
        note: "这两条只读取配置与包元数据，不会安装 Harness。",
      },
    ],
    links: [
      { label: "DeepSeek 官方仓库", href: officialLinks.deepseekReadme },
    ],
  },
  {
    id: "common-server",
    title: "命令没有报错，但网页打不开或终端一关网页就失效",
    symptom:
      "127.0.0.1:3080 无法访问、浏览器没有自动打开，或关闭终端后页面立即断开。",
    cause:
      "Web UI 由当前 dsh 进程提供。终端关闭或 Ctrl+C 会停止服务；3080 也可能被其他程序占用。",
    actions: [
      "以终端实际打印的 URL 为准，不凭空猜测地址。",
      "保持启动终端打开；浏览器没自动打开时手动复制 URL。",
      "3080 被占用时改用 3081，并确认浏览器也访问新端口。",
      "需要排错时使用 --no-open，让启动日志保持清晰。",
    ],
    commands: [
      {
        label: "只启动服务，不自动打开浏览器",
        value: "npx @deepseek-ai/dsh web --no-open",
      },
      {
        label: "改用 3081 端口",
        value: "npx @deepseek-ai/dsh web --port 3081",
      },
    ],
    links: [
      {
        label: "DeepSeek 官方 Web UI 指南",
        href: officialLinks.deepseekQuickstart,
      },
    ],
  },
  {
    id: "common-model",
    title: "页面能打开，但不能发送消息或出现 401 / MISSING_CREDENTIAL",
    symptom:
      "模型不可选、输入框被阻止，或请求返回 MISSING_CREDENTIAL、UNKNOWN_MODEL、401。",
    cause:
      "Web UI 启动成功不等于模型和工作区已经配置。凭据、模型 ID、账户状态与工作区选择是独立检查点。",
    actions: [
      "确认已经选择工作区；没有工作区时输入框可能不可用。",
      "进入 Settings → Models，重新保存正确的提供方凭据。",
      "401 优先检查 Key 与账户状态；UNKNOWN_MODEL 则重新选择已配置模型。",
      "不要把真实 API Key 粘贴到聊天、截图或公开 issue。",
    ],
    links: [
      {
        label: "DeepSeek 官方模型排错",
        href: officialLinks.deepseekProviders,
      },
    ],
  },
  {
    id: "common-provider",
    title: "自定义本地模型端点能连接，但每个请求都失败",
    symptom:
      "Base URL 与 Key 看似正确，却出现 developer role、max_completion_tokens、图片模态或请求格式错误。",
    cause:
      "“OpenAI 兼容”并不保证所有字段完全一致。Harness 会按协议与模型能力生成请求，自建网关可能只实现其中一部分。",
    actions: [
      "先用 DeepSeek 官方提供方跑通基础链路，再单独排查自定义端点。",
      "核对协议、模型 ID、/models 支持情况与官方 compat 字段。",
      "修改兼容性设置后开启新会话，避免旧会话继续携带不兼容内容。",
      "不要把本地 Harness 与本地模型推理混为一谈。",
    ],
    links: [
      {
        label: "DeepSeek 官方自定义提供方说明",
        href: officialLinks.deepseekProviders,
      },
    ],
  },
  {
    id: "common-preview",
    title: "同样的教程突然与新版本界面不同",
    symptom:
      "按钮名称、模式、插件或配置位置发生变化；旧命令能启动但行为与截图不一致。",
    cause:
      "DeepSeek Harness 仍是开发者预览版，官方明确说明会快速迭代并可能引入破坏兼容性的变化。",
    actions: [
      "记录 node、dsh 与操作系统版本，再描述问题。",
      "以当前官方 README 与开发者文档为准，不要求界面逐像素一致。",
      "重要工作前先在隔离目录验证更新。",
      "不要在有未提交改动的源码仓库里用破坏性 Git 命令强行追平版本。",
    ],
    commands: [
      {
        label: "记录环境版本",
        value: "node --version\nnpm view @deepseek-ai/dsh version",
        note: "Windows PowerShell 若再次阻止 npm.ps1，可改用 npm.cmd 执行第二行。",
      },
    ],
    links: [
      { label: "DeepSeek 官方仓库", href: officialLinks.deepseekReadme },
    ],
  },
];

const enPlatforms: Record<Platform, PlatformContent> = {
  windows: {
    label: "Windows 10 / 11",
    badge: "⊞",
    terminal: "Windows Terminal · PowerShell or Command Prompt",
    support:
      "The shipped web profile has a native Windows path and uses PowerShell rather than Bash for agent shell calls.",
    shell: "PowerShell paths, $env:NAME variables, and Windows ACL semantics",
    issues: [
      {
        id: "windows-execution-policy",
        title: "PowerShell refuses to load npx.ps1",
        symptom:
          "The error names PSSecurityException, UnauthorizedAccess, or says that scripts are disabled, usually at C:\\Program Files\\nodejs\\npx.ps1.",
        cause:
          "Node is installed; PowerShell is blocking the npx.ps1 command shim before DeepSeek Harness starts.",
        actions: [
          "Inspect every effective scope with Get-ExecutionPolicy -List.",
          "Prefer npx.cmd, which avoids changing the PowerShell execution policy.",
          "Command Prompt can also run the regular npx command.",
          "On a personal machine only, consider CurrentUser RemoteSigned after reading the Microsoft documentation.",
          "If MachinePolicy or UserPolicy is set, follow the organization's policy instead of trying to bypass it.",
        ],
        avoid: [
          "Do not set LocalMachine to Bypass or Unrestricted for this one error.",
          "Do not run an unknown repair script as administrator.",
        ],
        commands: [
          {
            label: "Read-only policy check",
            value: "Get-ExecutionPolicy -List",
          },
          {
            label: "Recommended: use the Windows command shim",
            value: "npx.cmd @deepseek-ai/dsh web",
          },
          {
            label: "Optional persistent CurrentUser policy",
            value:
              "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned",
            note: "This persists for the current user. Review the policy scopes before confirming.",
            optional: true,
          },
          {
            label: "Remove that CurrentUser override",
            value:
              "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Undefined",
            optional: true,
          },
        ],
        links: [
          {
            label: "Microsoft: execution policies",
            href: officialLinks.executionPolicy,
          },
        ],
      },
      {
        id: "windows-path",
        title: "node, npm, or npx is not recognized",
        symptom:
          "The terminal cannot find a command, or still reports an older Node version after installation.",
        cause:
          "The terminal may not have reloaded PATH, or several Node installations are competing.",
        actions: [
          "Close all terminal windows and reopen Windows Terminal.",
          "Check versions and resolve the actual command paths with where.exe.",
          "If missing, reinstall the current Node LTS from the official site with PATH enabled.",
        ],
        commands: [
          {
            label: "Version and path checks",
            value:
              "node --version\nnpm --version\nnpx.cmd --version\nwhere.exe node\nwhere.exe npx",
          },
        ],
        links: [{ label: "Official Node.js download", href: officialLinks.node }],
      },
      {
        id: "windows-shell",
        title: "Agent commands differ from macOS examples",
        symptom:
          "The agent uses Get-ChildItem, $env:NAME, or backslash paths; copied Bash commands fail.",
        cause:
          "The Windows profile intentionally uses the PowerShell tool stack rather than translating Bash syntax.",
        actions: [
          "Ask the agent for PowerShell commands explicitly.",
          "Review drive letters, backslash paths, and $env:NAME variables.",
          "Maintain separate PowerShell and Bash examples for cross-platform work.",
        ],
        links: [
          {
            label: "DeepSeek: Windows defaults to PowerShell",
            href: officialLinks.deepseekWindows,
          },
        ],
      },
      {
        id: "windows-picker",
        title: "Choose workspace appears to do nothing",
        symptom:
          "The Web UI is running, but no folder picker appears after adding a workspace.",
        cause:
          "The native picker may not be visible when dsh is launched by a detached process or without an interactive desktop.",
        actions: [
          "Launch dsh directly in a visible foreground Windows Terminal.",
          "Keep that terminal open and check behind other windows for the picker.",
          "Record the dsh and Windows versions if the problem persists.",
        ],
        links: [
          {
            label: "Official discussion: background picker failure",
            href: officialLinks.deepseekPicker,
          },
        ],
      },
    ],
  },
  mac: {
    label: "macOS",
    badge: "⌘",
    terminal: "Terminal · zsh, with the POSIX/Bash Harness path",
    support:
      "The npx Web UI path is usable on macOS; shell syntax, privacy permissions, and architecture still need Mac-specific checks.",
    shell: "POSIX paths, Bash tool semantics, and macOS privacy permissions",
    issues: [
      {
        id: "mac-path",
        title: "command not found: node / npm / npx",
        symptom:
          "zsh cannot locate one of the Node commands during the version check or launch.",
        cause:
          "Node may be missing, the terminal may have stale PATH state, or multiple installation methods may conflict.",
        actions: [
          "Install the current Node LTS from the official site.",
          "Quit and reopen Terminal, then inspect versions and command paths.",
          "Understand the active shell configuration before adding another version manager.",
        ],
        commands: [
          {
            label: "Version and path checks",
            value:
              "node --version\nnpm --version\nnpx --version\ncommand -v node\ncommand -v npx",
          },
        ],
        links: [{ label: "Official Node.js download", href: officialLinks.node }],
      },
      {
        id: "mac-privacy",
        title: "Desktop, Documents, or Downloads cannot be accessed",
        symptom:
          "macOS asks for file access, or the terminal cannot read or change a protected folder.",
        cause:
          "macOS grants access to protected folders per launching terminal application.",
        actions: [
          "Begin in a new user-owned test folder instead of the full home directory.",
          "Grant only the folder access the task actually needs.",
          "Review the terminal app under System Settings → Privacy & Security.",
        ],
        avoid: ["Do not make Full Disk Access the default fix for every permission error."],
      },
      {
        id: "mac-picker",
        title: "The workspace picker never appears",
        symptom:
          "The Web UI works, but Choose workspace does not display the macOS folder dialog.",
        cause:
          "A native dialog may not render when dsh was launched in the background or without a visible desktop parent.",
        actions: [
          "Run dsh in a visible foreground Terminal window.",
          "Keep Terminal open and check whether the dialog is behind another window.",
          "Stop detached instances before restarting from the test directory.",
        ],
        links: [
          {
            label: "Official discussion: background picker failure",
            href: officialLinks.deepseekPicker,
          },
        ],
      },
      {
        id: "mac-architecture",
        title: "Web UI and Python SDK platform requirements get mixed up",
        symptom:
          "Python wheel requirements are incorrectly treated as the compatibility matrix for the Node-based Web UI.",
        cause:
          "The npx Web UI, source build, and Python SDK are separate distribution paths.",
        actions: [
          "For this Web UI guide, validate the Node/npx path first.",
          "For the Python SDK, verify macOS 14+ and arm64 as currently documented.",
          "Do not treat a community Intel package as an official support promise.",
        ],
        commands: [
          {
            label: "Check macOS and architecture",
            value: "sw_vers\nuname -m",
          },
        ],
        links: [
          {
            label: "DeepSeek Python SDK requirements",
            href: officialLinks.deepseekPython,
          },
        ],
      },
    ],
  },
};

const enCommonIssues: GuideIssue[] = [
  {
    id: "common-package-prompt",
    title: "The first npx run asks to install a package or cannot download it",
    symptom:
      "npx asks to install packages, or reports registry, TLS, proxy, or timeout errors.",
    cause:
      "The first run must obtain @deepseek-ai/dsh from npm before Harness can start.",
    actions: [
      "Verify the exact package name before accepting the prompt.",
      "Read the configured registry and published package version.",
      "Use organization-provided proxy or certificate settings on managed networks.",
    ],
    avoid: ["Do not disable TLS verification or download an unknown repackaged build."],
    commands: [
      {
        label: "Read-only registry and package checks",
        value:
          "npm config get registry\nnpm view @deepseek-ai/dsh version",
      },
    ],
    links: [{ label: "Official DeepSeek repository", href: officialLinks.deepseekReadme }],
  },
  {
    id: "common-server",
    title: "The command stays open, but the page does not",
    symptom:
      "The browser does not open, 127.0.0.1:3080 is unreachable, or closing Terminal immediately stops the page.",
    cause:
      "The current dsh process serves the Web UI; closing it stops the service, and port 3080 may already be occupied.",
    actions: [
      "Use the exact URL printed by the terminal and keep the process open.",
      "Open the URL manually when browser launch is suppressed.",
      "Use a different port when 3080 is occupied.",
    ],
    commands: [
      {
        label: "Start without opening a browser",
        value: "npx @deepseek-ai/dsh web --no-open",
      },
      {
        label: "Use port 3081",
        value: "npx @deepseek-ai/dsh web --port 3081",
      },
    ],
    links: [
      {
        label: "Official Web UI guide",
        href: officialLinks.deepseekQuickstart,
      },
    ],
  },
  {
    id: "common-model",
    title: "The UI opens, but messages cannot be sent",
    symptom:
      "No model is selectable, the composer is disabled, or the request returns MISSING_CREDENTIAL, UNKNOWN_MODEL, or 401.",
    cause:
      "A running UI is separate from provider credentials, model selection, account state, and workspace selection.",
    actions: [
      "Select a workspace first.",
      "Save the provider credential again under Settings → Models.",
      "Check the key for 401 and reselect a configured model for UNKNOWN_MODEL.",
    ],
    avoid: ["Never paste a real API key into chat, screenshots, or a public issue."],
    links: [
      {
        label: "Official provider troubleshooting",
        href: officialLinks.deepseekProviders,
      },
    ],
  },
  {
    id: "common-preview",
    title: "A new release no longer matches the tutorial screenshots",
    symptom:
      "Labels, modes, plugins, or configuration locations differ from an earlier guide.",
    cause:
      "DeepSeek Harness remains a fast-moving developer preview with possible breaking changes.",
    actions: [
      "Record the operating system, Node version, and current dsh package version.",
      "Prefer the current official README over pixel-matching an older screenshot.",
      "Validate updates in an isolated directory before important work.",
    ],
    commands: [
      {
        label: "Record relevant versions",
        value: "node --version\nnpm view @deepseek-ai/dsh version",
      },
    ],
    links: [{ label: "Official DeepSeek repository", href: officialLinks.deepseekReadme }],
  },
];

function CommandBlock({
  command,
  copied,
  onCopy,
  isEnglish,
}: {
  command: GuideCommand;
  copied: boolean;
  onCopy: () => void;
  isEnglish: boolean;
}) {
  return (
    <div className={`harness-fix-command${command.optional ? " optional" : ""}`}>
      <div>
        <Terminal aria-hidden="true" />
        <span>{command.label}</span>
        {command.optional && <i>{isEnglish ? "optional" : "可选变更"}</i>}
      </div>
      <pre>
        <code>{command.value}</code>
      </pre>
      {command.note && <p>{command.note}</p>}
      <button type="button" onClick={onCopy}>
        {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
        {copied ? (isEnglish ? "Copied" : "已复制") : isEnglish ? "Copy" : "复制"}
      </button>
    </div>
  );
}

export function HarnessPlatformGuide({ isEnglish }: { isEnglish: boolean }) {
  const [platform, setPlatform] = useState<Platform>("windows");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const resetTimer = useRef<number | null>(null);
  const platforms = isEnglish ? enPlatforms : zhPlatforms;
  const commonIssues = isEnglish ? enCommonIssues : zhCommonIssues;
  const current = platforms[platform];

  const copy = async (value: string, id: string) => {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setCopiedId(id);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopiedId(null), 2200);
    } catch {
      setCopiedId(null);
    }
  };

  const renderIssue = (issue: GuideIssue, index: number, prefix: string) => (
    <details key={issue.id} open={index === 0}>
      <summary>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <b>{issue.title}</b>
        <ChevronRight aria-hidden="true" />
      </summary>
      <div className="harness-issue-body">
        <div className="harness-issue-diagnosis">
          <article>
            <span>{isEnglish ? "Symptom" : "你会看到"}</span>
            <p>{issue.symptom}</p>
          </article>
          <article>
            <span>{isEnglish ? "Diagnosis" : "实际原因"}</span>
            <p>{issue.cause}</p>
          </article>
        </div>
        <section>
          <h4>{isEnglish ? "Recommended order" : "建议按这个顺序处理"}</h4>
          <ol>
            {issue.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </section>
        {issue.commands?.map((command, commandIndex) => {
          const id = `${prefix}-${issue.id}-${commandIndex}`;
          return (
            <CommandBlock
              key={id}
              command={command}
              copied={copiedId === id}
              onCopy={() => copy(command.value, id)}
              isEnglish={isEnglish}
            />
          );
        })}
        {issue.avoid && (
          <section className="harness-avoid">
            <ShieldAlert aria-hidden="true" />
            <div>
              <h4>{isEnglish ? "Do not use as a shortcut" : "不要用这些方式走捷径"}</h4>
              <ul>
                {issue.avoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {issue.links && (
          <footer>
            {issue.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </footer>
        )}
      </div>
    </details>
  );

  return (
    <section className="harness-platform-guide" id="platform-guide">
      <header>
        <div>
          <p className="academic-kicker">PLATFORM NOTES · FAILURE MODES</p>
          <h2>
            {isEnglish
              ? "Choose the system first, then diagnose the layer"
              : "先选系统，再判断错误发生在哪一层"}
          </h2>
          <p>
            {isEnglish
              ? "The happy path is shared. Shells, permissions, package shims, and native dialogs are not. Start with the exact symptom rather than changing system-wide settings."
              : "理想路径大体共用，但 Shell、权限、命令包装器和原生窗口并不相同。先对照错误现象，不要一上来就改全局系统设置。"}
          </p>
        </div>
        <div className="harness-diagnostic-flow" aria-label={isEnglish ? "Diagnostic order" : "排错顺序"}>
          <span>01 {isEnglish ? "Toolchain" : "工具链"}</span>
          <i>→</i>
          <span>02 {isEnglish ? "Local service" : "本地服务"}</span>
          <i>→</i>
          <span>03 {isEnglish ? "Workspace / model" : "工作区 / 模型"}</span>
        </div>
      </header>

      <div className="harness-platform-tabs" role="group" aria-label={isEnglish ? "Operating system" : "选择操作系统"}>
        {(Object.keys(platforms) as Platform[]).map((key) => {
          const item = platforms[key];
          return (
            <button
              key={key}
              type="button"
              className={platform === key ? "active" : ""}
              onClick={() => setPlatform(key)}
              aria-pressed={platform === key}
            >
              <span aria-hidden="true">{item.badge}</span>
              <b>{item.label}</b>
              <small>{item.terminal}</small>
            </button>
          );
        })}
      </div>

      <div className="harness-platform-summary">
        <div>
          {platform === "windows" ? (
            <MonitorCog aria-hidden="true" />
          ) : (
            <Laptop aria-hidden="true" />
          )}
          <span>
            <b>{current.label}</b>
            <small>{current.shell}</small>
          </span>
        </div>
        <p>{current.support}</p>
      </div>

      <div className="harness-issue-list">
        <div className="harness-issue-heading">
          <span>{current.badge}</span>
          <div>
            <p>{isEnglish ? "Platform-specific" : "系统专属"}</p>
            <h3>
              {isEnglish
                ? `${current.label} checks`
                : `${current.label} 常见情况`}
            </h3>
          </div>
        </div>
        <div className="harness-issue-details">
          {current.issues.map((issue, index) =>
            renderIssue(issue, index, platform),
          )}
        </div>
      </div>

      <div className="harness-issue-list shared">
        <div className="harness-issue-heading">
          <TriangleAlert aria-hidden="true" />
          <div>
            <p>{isEnglish ? "Shared checks" : "两端共用"}</p>
            <h3>{isEnglish ? "Common failure modes" : "共同故障与判断方式"}</h3>
          </div>
        </div>
        <div className="harness-issue-details">
          {commonIssues.map((issue, index) =>
            renderIssue(issue, index, "common"),
          )}
        </div>
      </div>

      <div className="harness-screenshot-note">
        <Clipboard aria-hidden="true" />
        <p>
          {isEnglish
            ? "The supplied screenshot was used only to identify the PowerShell execution-policy pattern. The image, local username, and machine path are not published."
            : "用户提供的截图只用于识别 PowerShell 执行策略错误；原图、本地用户名和机器路径均不在本站公开。"}
        </p>
      </div>
    </section>
  );
}
