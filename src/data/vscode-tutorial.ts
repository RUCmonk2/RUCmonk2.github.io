export type TutorialPlatform = "mac" | "windows";

export type TutorialLink = {
  label: string;
  href: string;
  note: string;
  kind: "official" | "reference" | "third-party";
};

export type TutorialDetail = {
  title: string;
  items: string[];
};

export type TutorialCopyBlock = {
  label: string;
  value: string;
  format: "terminal" | "path" | "code" | "json" | "text";
  note?: string;
};

export type TutorialStep = {
  id: string;
  title: string;
  summary: string;
  source: string[];
  why: string;
  success: string;
  caution?: string;
  sourcePages?: string;
  links?: TutorialLink[];
  details?: TutorialDetail[];
  copyBlocks?: TutorialCopyBlock[];
};

export type TutorialRouteContent = {
  badge: string;
  label: string;
  time: string;
  intro: string;
  steps: TutorialStep[];
};

export const tutorialPlatforms: Record<
  TutorialPlatform,
  TutorialRouteContent
> = {
  mac: {
    badge: "⌘",
    label: "macOS",
    time: "约 20–45 分钟",
    intro:
      "先确认系统有没有可用编译器，再按需补装 Apple Command Line Tools，最后用一个最小程序验证编辑、编译与运行链路。",
    steps: [
      {
        id: "mac-download",
        title: "下载并安装 VS Code",
        summary:
          "只从 VS Code 官方网站获取 macOS 版本，下载后把应用放入“应用程序”文件夹。",
        source: [
          "教程指定官网 code.visualstudio.com。",
          "在下载菜单中选择 Mac 版本，完成常规应用安装。",
        ],
        why: "VS Code 是后续编写、运行与调试代码的编辑器。",
        success: "可以正常打开 VS Code，并看到欢迎界面。",
        sourcePages: "macOS PDF · 第 1 页",
        links: [
          {
            label: "Visual Studio Code 官网",
            href: "https://code.visualstudio.com/",
            note: "官方主页；点击 Download for Mac 或进入下载页选择 macOS 版本。",
            kind: "official",
          },
        ],
        details: [
          {
            title: "完成安装",
            items: [
              "等待下载完成，打开下载文件。",
              "把 Visual Studio Code 拖入“应用程序”文件夹。",
              "首次打开若出现系统安全提示，核对应用名称与来源后再确认。",
            ],
          },
        ],
      },
      {
        id: "mac-compiler-check",
        title: "检查已有编译器",
        summary: "打开“终端”，分别查看 g++ 与 clang++ 的版本信息。",
        source: ["Command + 空格搜索“终端”。", "依次输入两条版本检查命令。"],
        why: "编辑器本身不负责把 C/C++ 源码编译成程序；先检查可避免重复安装。",
        success:
          "至少 clang++ 能打印版本信息；若两条命令都有版本输出，可直接进入扩展安装。",
        caution:
          "若系统提示安装工具，转到下一步。本页只展示命令，不会替你执行。",
        sourcePages: "macOS PDF · 第 2 页",
        details: [
          {
            title: "怎样判断输出是否有效",
            items: [
              "看到 Apple clang version、Target 等版本信息，说明编译器可用。",
              "若提示 command not found，或弹出开发者工具安装提示，继续下一步。",
              "版本号不必与资料截图完全相同；软件版本会随系统更新。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "检查 g++",
            value: "g++ --version",
            format: "terminal",
          },
          {
            label: "检查 clang++",
            value: "clang++ --version",
            format: "terminal",
          },
        ],
      },
      {
        id: "mac-xcode-tools",
        title: "按需补充命令行工具",
        summary: "仅当上一步没有可用编译器时，安装 Apple Command Line Tools。",
        source: [
          "首选通过 xcode-select 触发官方安装界面。",
          "若失败，可登录 Apple Developer 下载稳定版 Command Line Tools。",
        ],
        why: "Command Line Tools 提供 clang 等基础编译工具。",
        success: "回到上一步，版本检查命令能够输出版本信息。",
        caution:
          "这一步需要你主动确认系统安装；避免 beta 版本，也不要从第三方站点下载安装包。",
        sourcePages: "macOS PDF · 第 2–3 页",
        links: [
          {
            label: "Apple Developer 下载",
            href: "https://developer.apple.com/download/more/",
            note: "备用官方入口；通常需要登录 Apple Account。筛选 Command Line Tools，并选择稳定版。",
            kind: "official",
          },
        ],
        details: [
          {
            title: "方法一：由系统弹出安装窗口",
            items: [
              "复制下方命令，在终端中运行。",
              "系统弹出安装窗口后阅读许可与空间提示，再由你主动确认。",
              "等待安装完成，重新运行 g++ 与 clang++ 的版本检查。",
            ],
          },
          {
            title: "方法二：从 Apple Developer 手动下载",
            items: [
              "只在方法一无法正常启动时使用。",
              "登录 Apple Developer 下载页，搜索 Command Line Tools。",
              "选择与你的 macOS 相容的稳定版本，不选 beta。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "触发官方安装界面",
            value: "xcode-select --install",
            format: "terminal",
            note: "运行后仍需你在 macOS 弹窗中主动确认；网页不会执行它。",
          },
        ],
      },
      {
        id: "mac-extensions",
        title: "安装课程所需扩展",
        summary:
          "在扩展商店安装 C/C++、C/C++ Clang Command Adapter 与 Code Runner。",
        source: ["打开左侧扩展商店并逐项搜索。", "Mac 原教程列出三个扩展。"],
        why: "扩展提供语言支持以及教程采用的运行入口。",
        success: "三个扩展均显示为已安装。",
        caution:
          "Windows 原资料不推荐 Code Runner；这里保留 Mac 教程的独立路线。安装前核对扩展名称与发布者。",
        sourcePages: "macOS PDF · 第 4 页",
        links: [
          {
            label: "C/C++（Microsoft）",
            href: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools",
            note: "Microsoft 官方扩展，提供 C/C++ 语言、构建与调试支持。",
            kind: "official",
          },
          {
            label: "Code Runner",
            href: "https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner",
            note: "Mac 原教程采用的运行扩展；Windows 路线不依赖它。",
            kind: "reference",
          },
        ],
        details: [
          {
            title: "逐项安装与核对",
            items: [
              "点击左侧扩展图标，或按 Command + Shift + X。",
              "搜索 C/C++，优先核对发布者为 Microsoft。",
              "继续搜索 C/C++ Clang Command Adapter 与 Code Runner，按资料安装。",
              "若扩展要求重新加载窗口，完成重载后再继续。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "扩展搜索清单",
            value: "C/C++\nC/C++ Clang Command Adapter\nCode Runner",
            format: "text",
            note: "逐项搜索，不要把三行一起粘贴进扩展商店。",
          },
        ],
      },
      {
        id: "mac-workspace",
        title: "建立练习文件夹",
        summary: "先在 VS Code 中打开一个文件夹，再在文件夹内创建 hello.cpp。",
        source: [
          "必须先打开文件夹，再在其中创建 cpp 文件。",
          "教程使用最小的 Hello World 程序验证环境。",
        ],
        why: "以文件夹为工作区，扩展才能稳定识别文件关系与后续配置。",
        success: "左侧资源管理器能看到 hello.cpp，文件内容已保存。",
        sourcePages: "macOS PDF · 第 5 页",
        details: [
          {
            title: "创建并保存示例文件",
            items: [
              "选择“文件 → 打开文件夹”，打开一个自己创建的练习目录。",
              "在左侧资源管理器中新建 hello.cpp；扩展名必须保留。",
              "粘贴下方示例代码，按 Command + S 保存。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "hello.cpp",
            value:
              '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
            format: "code",
          },
        ],
      },
      {
        id: "mac-run",
        title: "运行并核对结果",
        summary: "保持 hello.cpp 为当前文件，使用教程所示的运行入口执行程序。",
        source: [
          "原教程使用编辑器右上角的运行按钮。",
          "终端输出 Hello, World! 即完成环境验证。",
        ],
        why: "这一检查同时覆盖编辑器、扩展、编译器与当前工作区。",
        success: "VS Code 下方终端出现 Hello, World!，且没有编译错误。",
        caution:
          "若右上角有多个运行选项，选择与 C/C++ 或 Code Runner 对应的入口。",
        sourcePages: "macOS PDF · 第 5 页",
        details: [
          {
            title: "遇到错误时先检查这三处",
            items: [
              "确认 hello.cpp 已保存，标签页上没有未保存的小圆点。",
              "确认上一步的 clang++ 或 g++ 版本检查仍能通过。",
              "确认当前打开的是整个练习文件夹，而不是只打开 hello.cpp。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "期望输出",
            value: "Hello, World!",
            format: "text",
          },
        ],
      },
    ],
  },
  windows: {
    badge: "⊞",
    label: "Windows 10 / 11",
    time: "约 60–120 分钟",
    intro:
      "依次准备路径、安装 MinGW-W64、连接 VS Code 的构建与调试配置。路线较长，但每一步都有独立检查点与故障分支。",
    steps: [
      {
        id: "win-prepare",
        title: "安装前检查",
        summary:
          "确认 Windows 用户名及计划使用的代码路径不含中文、空格或特殊字符。",
        source: [
          "原教程特别提示中文用户名可能引发编程环境报错。",
          "代码文件夹路径应避免中文、空格及多数特殊字符。",
        ],
        why: "部分编译与调试工具对路径处理不一致，先规避可减少后续定位成本。",
        success: "已确定一个简单的英文路径，例如 D:\\vscode_c。",
        caution:
          "修改 Windows 用户名风险较高，本页不展开或自动引导；不要直接重命名用户目录或修改注册表。",
        sourcePages: "Windows PDF · 安装准备章节",
        details: [
          {
            title: "只检查，不贸然修改系统账户",
            items: [
              "按 Win + R，输入 cmd 并回车；命令提示符开头通常会显示当前用户目录。",
              "若用户名含中文，先记录情况，不要直接重命名用户文件夹或修改注册表。",
              "无论用户名如何，都为课程代码准备一个纯英文、无空格的独立目录。",
            ],
          },
          {
            title: "如果以前配置过 C/C++ 环境",
            items: [
              "先运行 gcc --version，记录是否已有旧工具链。",
              "暂时不要删除任何 Path；完成新安装后再根据版本输出判断顺序。",
              "旧工作区中的 .vscode 可能指向旧路径，故障恢复步骤会单独说明。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "建议练习目录",
            value: "D:\\vscode_c",
            format: "path",
            note: "没有 D 盘时可使用 C:\\vscode_c；后续示例以你实际打开的文件夹为准。",
          },
        ],
      },
      {
        id: "win-mingw-download",
        title: "下载 MinGW-W64",
        summary:
          "从 WinLibs 选择 Win64、without LLVM/Clang/LLD/LLDB 的稳定 ZIP 版本。",
        source: [
          "教程建议选择 WinLibs 最新稳定的 Win64 ZIP。",
          "选择 without LLVM/Clang/LLD/LLDB 的条目。",
        ],
        why: "MinGW-W64 提供 gcc、g++ 与 gdb，是 Windows 路线的编译和调试基础。",
        success: "下载得到一个 Win64 ZIP 压缩包，文件大小与网站所示大致相符。",
        caution:
          "temps 中存在工具链压缩包，但本站不会替用户执行、分发或安装该二进制文件。",
        sourcePages: "Windows PDF · 第 8–10 页",
        links: [
          {
            label: "WinLibs 下载页",
            href: "https://winlibs.com/",
            note: "资料采用的工具链来源；页面列有多个版本，请按教程筛选。",
            kind: "reference",
          },
        ],
        details: [
          {
            title: "下载时怎样选对条目",
            items: [
              "选择最新稳定版本，不选 snapshot、preview 或 beta。",
              "平台选择 Win64；压缩格式选择 ZIP。",
              "按原教程选择 without LLVM/Clang/LLD/LLDB 的构建。",
            ],
          },
        ],
      },
      {
        id: "win-mingw-extract",
        title: "解压到固定目录",
        summary: "把压缩包内的 mingw64 文件夹完整解压到 C 盘根目录。",
        source: [
          "标准目标位置为 C:\\mingw64。",
          "教程要求等待完整解压，并用 bin、lib 目录作为检查点。",
        ],
        why: "固定而简短的路径可减少 Path、构建任务和调试配置出错。",
        success: "C:\\mingw64 下直接看到 bin、include、lib 等文件夹。",
        caution:
          "不要在压缩包预览窗口里直接运行程序。若改用其他目录，后续示例都要同步替换。",
        sourcePages: "Windows PDF · 第 10–13 页",
        details: [
          {
            title: "完整解压",
            items: [
              "打开 ZIP，找到里面的 mingw64 文件夹。",
              "把整个文件夹解压到 C 盘根目录；遇到权限提示时核对目标后再确认。",
              "文件数量较多，资料提示可能需要 10–20 分钟；进度结束前不要继续。",
            ],
          },
          {
            title: "确认目录没有多套一层",
            items: [
              "正确：C:\\mingw64\\bin\\gcc.exe。",
              "错误示例：C:\\mingw64\\mingw64\\bin\\gcc.exe。",
              "若多了一层，只调整外层目录，不要移动 bin 内的单个文件。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "推荐安装目录",
            value: "C:\\mingw64",
            format: "path",
            note: "若改用其他目录，Path、tasks.json 与 launch.json 都要同步修改。",
          },
        ],
      },
      {
        id: "win-path",
        title: "把工具链加入 Path",
        summary:
          "在环境变量 Path 中新增 C:\\mingw64\\bin，并保留所有既有条目。",
        source: [
          "Win + R 输入 sysdm.cpl，进入高级系统设置。",
          "编辑 Path、新建条目，并依次确认三个窗口。",
        ],
        why: "Path 让命令行与 VS Code 能找到 gcc、g++ 和 gdb。",
        success: "Path 列表中能看到 C:\\mingw64\\bin，所有窗口都已点击确定。",
        caution: "不要删除原有 Path；修改前可先截图记录。",
        sourcePages: "Windows PDF · 第 14–17 页",
        details: [
          {
            title: "打开环境变量窗口",
            items: [
              "按 Win + R，输入 sysdm.cpl 后回车。",
              "进入“高级”选项卡，打开“环境变量”。",
              "选中 Path，点击“编辑”与“新建”，粘贴 C:\\mingw64\\bin。",
              "依次确认所有打开的窗口，否则修改可能不会保存。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "运行窗口命令",
            value: "sysdm.cpl",
            format: "terminal",
          },
          {
            label: "新增到 Path",
            value: "C:\\mingw64\\bin",
            format: "path",
          },
          {
            label: "旧版系统单行写法",
            value: ";C:\\mingw64\\bin",
            format: "path",
            note: "仅用于只能编辑单行 Path 的旧界面；Windows 10/11 常见列表界面不需要前导分号。",
          },
        ],
      },
      {
        id: "win-verify",
        title: "验证 gcc 并排查旧版本",
        summary: "新开命令行窗口检查 gcc；区分 Path 未生效与旧版本抢先。",
        source: [
          "教程用 gcc --version 作为环境变量检查点。",
          "若版本不符，应检查 Path 顺序。",
        ],
        why: "先让系统命令行稳定找到工具链，VS Code 才有可靠基础。",
        success: "gcc --version 输出版本信息，且版本与刚下载的工具链相符。",
        caution: "不要删除不认识的系统 Path 条目；调整前先记录原顺序。",
        sourcePages: "Windows PDF · 第 17–18 页",
        details: [
          {
            title: "提示 gcc 不是内部或外部命令",
            items: [
              "关闭旧 cmd，再新开一个窗口；旧窗口不会自动读取新 Path。",
              "确认 C:\\mingw64\\bin\\gcc.exe 实际存在。",
              "检查 Path 是否误填成 C:\\mingw64，或带了多余引号和空格。",
            ],
          },
          {
            title: "能运行，但显示意外的旧版本",
            items: [
              "说明电脑上可能还有另一套 gcc，并且它在 Path 中更靠前。",
              "先记录原顺序，再把 C:\\mingw64\\bin 上移。",
              "重新打开命令行验证，直到版本与下载包相符。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "版本验证命令",
            value: "gcc --version",
            format: "terminal",
            note: "请在新打开的 cmd 或 PowerShell 中运行。",
          },
        ],
      },
      {
        id: "win-vscode",
        title: "安装 VS Code",
        summary: "从官网下载 Windows x64 的 System Installer，并完成常规安装。",
        source: [
          "原教程优先 System Installer x64。",
          "安装附加选项可帮助从资源管理器打开文件或文件夹。",
        ],
        why: "VS Code 提供编辑器、任务与调试界面；编译器仍由 MinGW-W64 提供。",
        success: "VS Code 可以正常启动并进入欢迎界面。",
        sourcePages: "Windows PDF · 第 19–20 页",
        links: [
          {
            label: "VS Code 官方下载页",
            href: "https://code.visualstudio.com/Download",
            note: "选择 Windows x64 的 System Installer；不要从陌生镜像下载安装器。",
            kind: "official",
          },
        ],
        details: [
          {
            title: "安装选项怎样选择",
            items: [
              "保持默认安装位置通常最稳妥。",
              "可勾选把“通过 Code 打开”加入文件与目录右键菜单。",
              "可勾选添加到 PATH；这是 VS Code 自身入口，与 MinGW 的 Path 不是一回事。",
              "安装完成后启动 VS Code。",
            ],
          },
        ],
      },
      {
        id: "win-extensions",
        title: "在线安装语言扩展",
        summary:
          "安装 Microsoft C/C++ 与简体中文语言包，然后重新打开 VS Code。",
        source: [
          "原教程要求安装 C/C++ 与 Chinese (Simplified) Language Pack。",
          "原 Windows 路线不推荐 Code Runner。",
        ],
        why: "C/C++ 扩展负责构建与调试；语言包只改变界面语言。",
        success: "两个扩展均显示已安装，重启后可正常使用。",
        caution: "本 Windows 路线不依赖 Code Runner，避免加入额外运行链路。",
        sourcePages: "Windows PDF · 第 20–22 页",
        links: [
          {
            label: "C/C++（Microsoft）",
            href: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools",
            note: "官方扩展；安装前核对发布者为 Microsoft。",
            kind: "official",
          },
          {
            label: "简体中文语言包",
            href: "https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans",
            note: "Microsoft 发布的 VS Code 简体中文界面语言包。",
            kind: "official",
          },
        ],
        details: [
          {
            title: "从扩展商店安装",
            items: [
              "点击左侧扩展图标，或按 Ctrl + Shift + X。",
              "搜索 C/C++，核对发布者为 Microsoft 后安装。",
              "搜索 Chinese (Simplified) Language Pack 并安装。",
              "关闭并重新打开 VS Code，使扩展完整生效。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "扩展搜索清单",
            value:
              "C/C++\nChinese (Simplified) Language Pack for Visual Studio Code",
            format: "text",
          },
        ],
      },
      {
        id: "win-offline-extensions",
        title: "可选：离线安装扩展",
        summary: "只有扩展商店无法访问时，才使用来源可信的 VSIX 离线包。",
        source: [
          "原教程提供“Extensions: Install from VSIX…”的备用路径。",
          "资料列出第三方下载站与课程文件包；本站不公开分发这些二进制文件。",
        ],
        why: "离线安装是网络受限时的备用通道，不应覆盖可用的官方市场。",
        success: "扩展列表能看到目标扩展，重启后可正常启用。",
        caution:
          "VSIX 可包含可执行代码。优先官方市场；第三方来源只作资料索引，本站不为其文件背书。",
        sourcePages: "Windows PDF · 离线扩展安装章节",
        links: [
          {
            label: "VS Code 扩展市场",
            href: "https://marketplace.visualstudio.com/vscode",
            note: "优先入口；能在线安装时不要改用第三方包。",
            kind: "official",
          },
          {
            label: "DevWorld",
            href: "https://devworld.top/",
            note: "原资料出现的第三方来源；下载前必须自行核对发布者、版本与风险。",
            kind: "third-party",
          },
        ],
        details: [
          {
            title: "从 VSIX 安装",
            items: [
              "先确认 VSIX 的来源、扩展名称、发布者和版本。",
              "按 Ctrl + Shift + P 打开命令面板。",
              "搜索 Extensions: Install from VSIX…，选择本地 VSIX。",
              "重启 VS Code，并在扩展页核对启用状态。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "命令面板操作",
            value: "Extensions: Install from VSIX...",
            format: "text",
          },
        ],
      },
      {
        id: "win-autosave",
        title: "开启自动保存",
        summary: "在“文件”菜单中开启自动保存，减少构建到旧代码的情况。",
        source: ["教程要求在“文件”菜单勾选“自动保存”。"],
        why: "构建读取磁盘文件；未保存时，屏幕上的新代码可能没有进入编译。",
        success: "“文件 → 自动保存”前有勾选，文件修改后会自动保存。",
        sourcePages: "Windows PDF · 自动保存章节",
        details: [
          {
            title: "用标签页状态自检",
            items: [
              "打开“文件”菜单，点击“自动保存”。",
              "修改任意一行时，标签页短暂显示未保存，随后自动恢复。",
              "关键修改后仍可按 Ctrl + S 主动保存。",
            ],
          },
        ],
      },
      {
        id: "win-workspace",
        title: "建立练习工作区",
        summary: "用 VS Code 打开英文路径文件夹，并创建 bin 文件夹。",
        source: [
          "以“打开文件夹”方式进入工作区。",
          "bin 用于集中保存编译产生的 exe。",
        ],
        why: "任务和调试配置以工作区为边界；只打开单个文件通常无法使用配置。",
        success: "窗口标题显示练习文件夹，左侧资源管理器中能看到 bin。",
        sourcePages: "Windows PDF · 第 23–24 页",
        details: [
          {
            title: "用“打开文件夹”进入工作区",
            items: [
              "选择“文件 → 打开文件夹”，打开 D:\\vscode_c 或你的英文目录。",
              "若出现信任提示，只对自己创建并确认来源的文件夹选择信任。",
              "在资源管理器中新建 bin 文件夹；名称全部小写。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "示例工作区",
            value: "D:\\vscode_c",
            format: "path",
          },
          {
            label: "输出文件夹",
            value: "bin",
            format: "path",
          },
        ],
      },
      {
        id: "win-hello",
        title: "创建第一个 C++ 文件",
        summary: "在工作区新建 hello.cpp，粘贴最小示例并保存。",
        source: [
          "教程使用 hello.cpp 检查 C++ 构建与调试链路。",
          ".cpp 扩展名表示 C++ 源文件。",
        ],
        why: "后面的 tasks.json 与 launch.json 都以当前活动文件为输入。",
        success: "资源管理器中同时看到 hello.cpp 与 bin，文件已经保存。",
        sourcePages: "Windows PDF · 第 24–25 页",
        details: [
          {
            title: "创建并保存",
            items: [
              "在资源管理器点击新建文件，输入 hello.cpp。",
              "粘贴下方代码；不要把 Markdown 代码围栏一起复制。",
              "按 Ctrl + S 保存，并保持 hello.cpp 为活动标签页。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "hello.cpp",
            value:
              '#include <stdio.h>\n\nint main() {\n  printf("Hello world!\\n");\n  return 0;\n}',
            format: "code",
          },
        ],
      },
      {
        id: "win-task",
        title: "配置构建任务",
        summary: "从 hello.cpp 生成默认任务，并让 exe 进入 bin 文件夹。",
        source: [
          "命令面板选择“任务：配置默认生成任务”。",
          "选择 C:\\mingw64\\bin\\g++.exe。",
          "把输出路径改为 ${fileDirname}\\bin\\${fileBasenameNoExtension}.exe。",
        ],
        why: "tasks.json 决定用哪个编译器、如何把当前源码编译成程序。",
        success: "Ctrl + Shift + B 后显示“生成已成功完成”，bin 中出现 exe。",
        caution: "若失败，先核对路径和 JSON，不要反复运行未知命令。",
        sourcePages: "Windows PDF · 第 25–27 页",
        details: [
          {
            title: "先让 VS Code 生成基础文件",
            items: [
              "确保当前打开的是 hello.cpp。",
              "打开命令面板，选择“任务：配置默认生成任务”。",
              "选择指向 C:\\mingw64\\bin\\g++.exe 的 C/C++ 项。",
              "VS Code 会在 .vscode 中生成 tasks.json。",
            ],
          },
          {
            title: "只修改输出文件位置",
            items: [
              "在 args 数组中找到 -o；下一项就是输出路径。",
              "把该项改为下方 bin 路径，不要删掉 -o。",
              "保存后按 Ctrl + Shift + B，exe 应出现在 bin。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "tasks.json 输出路径",
            value: '"${fileDirname}\\\\bin\\\\${fileBasenameNoExtension}.exe"',
            format: "json",
            note: "这是 JSON 字符串，反斜杠要写成双反斜杠。只替换 -o 后面的值。",
          },
          {
            label: "资料中的任务标签",
            value: "C/C++: g++.exe 生成活动文件",
            format: "text",
            note: "launch.json 的 preLaunchTask 必须与 tasks.json 的 label 完全一致。",
          },
          {
            label: "默认构建快捷键",
            value: "Ctrl + Shift + B",
            format: "text",
          },
        ],
      },
      {
        id: "win-debug",
        title: "配置 launch.json",
        summary: "创建调试配置，指定 exe、gdb 路径和预启动构建任务。",
        source: [
          "选择 C++ (GDB/LLDB)，添加 C/C++: (gdb) 启动配置。",
          "程序路径与 tasks.json 的 bin 输出一致。",
          "gdb 指向 C:\\mingw64\\bin\\gdb.exe。",
        ],
        why: "launch.json 把“先构建、再启动 gdb、运行当前程序”连接起来。",
        success: ".vscode 中出现 launch.json，三个关键字段与当前工作区一致。",
        caution:
          "不同版本自动生成的其他字段可能变化。优先修改关键字段，不要整份覆盖已有配置。",
        sourcePages: "Windows PDF · 第 27–29 页",
        details: [
          {
            title: "先生成基础配置",
            items: [
              "保持 hello.cpp 为活动文件，打开“运行和调试”。",
              "选择创建 launch.json，再选择 C++ (GDB/LLDB)。",
              "添加 C/C++: (gdb) 启动配置；不要误选 Bash 调试。",
            ],
          },
          {
            title: "核对三个关键字段",
            items: [
              "program 指向 tasks.json 生成在 bin 中的当前文件 exe。",
              "miDebuggerPath 指向 C:\\mingw64\\bin\\gdb.exe。",
              "preLaunchTask 与 tasks.json 的 label 逐字一致。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "program",
            value:
              '"program": "${fileDirname}\\\\bin\\\\${fileBasenameNoExtension}.exe"',
            format: "json",
          },
          {
            label: "miDebuggerPath",
            value: '"miDebuggerPath": "C:\\\\mingw64\\\\bin\\\\gdb.exe"',
            format: "json",
          },
          {
            label: "preLaunchTask",
            value: '"preLaunchTask": "C/C++: g++.exe 生成活动文件"',
            format: "json",
            note: "若 tasks.json 标签不同，请复制实际 label，不要机械照抄。",
          },
        ],
      },
      {
        id: "win-breakpoint",
        title: "断点验证构建与调试",
        summary: "在 return 0 处设置断点，启动调试并观察程序是否暂停。",
        source: [
          "教程在 return 0 处点击行号左侧设置断点。",
          "按 F5 或 Fn + F5 启动调试。",
        ],
        why: "能停在断点说明源码、exe、gdb 和预启动任务已正确串联。",
        success: "左侧出现红色断点，启动后程序停在该行，调试工具栏可见。",
        caution:
          "若程序一闪而过，先确认断点是实心红点，并核对 program 与 preLaunchTask。",
        sourcePages: "Windows PDF · 第 29–30 页",
        details: [
          {
            title: "完整验证顺序",
            items: [
              "在 return 0 左侧行号边栏单击，出现红点。",
              "按 F5；部分笔记本需要 Fn + F5。",
              "观察是否先自动构建，再进入调试并停在断点。",
              "使用调试工具栏继续或停止。",
            ],
          },
          {
            title: "常见失败定位",
            items: [
              "找不到 exe：先按 Ctrl + Shift + B，确认 bin 中生成了文件。",
              "找不到 gdb：核对 C:\\mingw64\\bin\\gdb.exe 是否存在。",
              "找不到任务：核对 preLaunchTask 与 tasks.json 的 label。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "启动调试",
            value: "F5 / Fn + F5",
            format: "text",
          },
        ],
      },
      {
        id: "win-use",
        title: "日常使用与故障恢复",
        summary: "沿用当前工作区新建 C/C++ 文件，并知道失效时从哪里重查。",
        source: [
          ".c 表示 C，.cpp 表示 C++。",
          "有键盘输入时应把焦点放到终端。",
          "原教程给出了清理旧环境后重做的恢复思路。",
        ],
        why: "把一次成功配置转化为可重复、也可定位故障的工作方式。",
        success: "可以新建文件、保存、构建、输入数据、设置断点并重复运行。",
        caution:
          "删除旧 MinGW、Path 或 .vscode 会影响现有项目。本页只解释恢复思路；操作前先备份。",
        sourcePages: "Windows PDF · 前言与第 31 页",
        details: [
          {
            title: "日常使用节奏",
            items: [
              "新建 .c 或 .cpp 并保存，保持它为活动文件。",
              "Ctrl + Shift + B 只构建；F5 构建并调试。",
              "程序需要 scanf、cin 输入时，先单击终端再输入。",
              "Ctrl + / 可切换当前行或选中内容的注释。",
            ],
          },
          {
            title: "配置失效时的恢复顺序",
            items: [
              "先重新验证 gcc --version，不要一开始就重装全部软件。",
              "若工具链路径变过，修正 Path、tasks.json 与 launch.json。",
              "若只有一个工作区失效，备份后再考虑重建其 .vscode。",
              "确认旧 MinGW 不再被任何项目使用后，才考虑移除旧目录与 Path。",
            ],
          },
        ],
        copyBlocks: [
          {
            label: "构建当前文件",
            value: "Ctrl + Shift + B",
            format: "text",
          },
          {
            label: "切换注释",
            value: "Ctrl + /",
            format: "text",
          },
        ],
      },
    ],
  },
};
