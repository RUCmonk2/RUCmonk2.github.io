export type TutorialPlatform = "mac" | "windows";

export type TutorialStep = {
  id: string;
  title: string;
  summary: string;
  source: string[];
  why: string;
  success: string;
  caution?: string;
  commands?: string[];
};

export const tutorialPlatforms: Record<
  TutorialPlatform,
  { label: string; time: string; intro: string; steps: TutorialStep[] }
> = {
  mac: {
    label: "macOS",
    time: "约 20–45 分钟",
    intro:
      "安装 VS Code，并确认系统具备可用的 C/C++ 编译工具。已安装编译器的电脑可以跳过命令行工具安装。",
    steps: [
      {
        id: "mac-download",
        title: "下载 VS Code",
        summary: "从 VS Code 官网选择 Mac 版本下载并完成安装。",
        source: [
          "教程指定官网 code.visualstudio.com。",
          "在下载菜单中选择 Mac 版本。",
        ],
        why: "VS Code 是后续编写、运行与调试代码的编辑器。",
        success: "可以正常打开 VS Code，并看到欢迎界面。",
      },
      {
        id: "mac-compiler-check",
        title: "检查编译器",
        summary: "打开“终端”，分别查看 g++ 与 clang++ 的版本信息。",
        source: ["Command + 空格搜索“终端”。", "依次输入两条版本检查命令。"],
        why: "编辑器本身不负责把 C/C++ 源码编译成程序；先检查可避免重复安装。",
        success: "两条命令都打印版本信息，可直接进入扩展安装。",
        caution:
          "若系统提示安装工具，教程要求转到下一步，不要在网页或 Codex 中自动执行。",
        commands: ["g++ --version", "clang++ --version"],
      },
      {
        id: "mac-xcode-tools",
        title: "补充命令行工具",
        summary: "仅当上一步没有可用编译器时，安装 Apple Command Line Tools。",
        source: [
          "首选通过 xcode-select 触发官方安装界面。",
          "若失败，可登录 Apple Developer 下载稳定版 Command Line Tools。",
        ],
        why: "Command Line Tools 提供 clang 等基础编译工具。",
        success: "回到上一步，两条版本检查命令能够输出版本信息。",
        caution:
          "这一步需要用户主动确认系统安装；页面只展示命令。避免 beta 版本。",
        commands: ["xcode-select --install"],
      },
      {
        id: "mac-extensions",
        title: "安装扩展",
        summary:
          "在 VS Code 扩展商店安装 C/C++、C/C++ Clang Command Adapter 与 Code Runner。",
        source: ["打开左侧扩展商店并逐项搜索。", "原教程列出三个扩展。"],
        why: "扩展提供语言支持以及教程采用的运行入口。",
        success: "三个扩展均显示为已安装。",
        caution:
          "不同教程对 Code Runner 的建议不同；这里忠实保留 Mac 原资料的路径。",
      },
      {
        id: "mac-hello",
        title: "运行 Hello World",
        summary:
          "用 VS Code 打开一个文件夹，新建 hello.cpp，写入示例代码并运行。",
        source: [
          "必须先打开文件夹，再在其中创建 cpp 文件。",
          "使用右上角运行按钮执行示例。",
        ],
        why: "这是一次端到端检查：编辑器、扩展与编译器必须同时工作。",
        success: "下方终端出现 Hello, World!。",
        commands: [
          '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
        ],
      },
    ],
  },
  windows: {
    label: "Windows 10 / 11",
    time: "约 45–90 分钟",
    intro:
      "配置 MinGW-W64、VS Code、构建任务与调试入口。步骤较长，但每一阶段都有明确检查点。",
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
          "修改 Windows 用户名风险较高，本页不展开或自动引导该操作；遇到此情况应先备份并查阅系统级资料。",
      },
      {
        id: "win-mingw",
        title: "准备 MinGW-W64",
        summary:
          "获取 Win64、without LLVM/Clang/LLD/LLDB 的 ZIP 版本，并把 mingw64 解压到 C 盘根目录。",
        source: [
          "教程建议选择 WinLibs 最新稳定的 Win64 ZIP。",
          "标准目标位置为 C:\\mingw64；其他路径必须同步修改后续配置。",
        ],
        why: "MinGW-W64 提供 gcc、g++ 与 gdb，是 Windows 路径的编译和调试基础。",
        success: "C:\\mingw64 下可以看到 bin、lib 等文件夹。",
        caution:
          "temps 中存在 2026 年版工具链压缩包，但本站不会替用户执行、分发或安装该二进制文件。",
      },
      {
        id: "win-path",
        title: "配置 Path",
        summary:
          "在系统环境变量的 Path 中新增 C:\\mingw64\\bin，并保留所有既有条目。",
        source: [
          "Win + R 输入 sysdm.cpl，进入高级系统设置。",
          "编辑 Path、新建条目，并依次确认三个窗口。",
        ],
        why: "Path 让命令行与 VS Code 能找到 gcc、g++ 和 gdb。",
        success: "新开 cmd 后，gcc --version 显示与安装包相符的版本。",
        caution:
          "不要删除原有 Path。若版本不符，可能存在旧编译器；应检查顺序而不是盲目删除。",
        commands: ["gcc --version"],
      },
      {
        id: "win-vscode",
        title: "安装 VS Code 与扩展",
        summary:
          "安装 Windows x64 版本 VS Code，再安装 C/C++ 与简体中文语言包并开启自动保存。",
        source: [
          "原教程优先 System Installer x64。",
          "扩展安装完成后关闭并重新打开 VS Code。",
          "在“文件”菜单开启自动保存。",
        ],
        why: "C/C++ 扩展提供任务生成和调试配置；自动保存减少运行旧文件的情况。",
        success: "VS Code 可启动，两个扩展已安装，“自动保存”前有勾选。",
        caution: "原 Windows 教程不推荐 Code Runner，本页按资料保留这一差异。",
      },
      {
        id: "win-workspace",
        title: "建立练习工作区",
        summary:
          "用 VS Code 打开英文路径文件夹，创建 hello.cpp 与 bin 文件夹。",
        source: [
          "以“打开文件夹”方式进入工作区并确认信任自己创建的文件。",
          "bin 用于集中保存编译产生的 exe。",
        ],
        why: "任务和调试配置以工作区为边界；只打开单个源文件通常无法使用这些配置。",
        success: "资源管理器中同时看到 hello.cpp 与 bin 文件夹。",
        commands: [
          '#include <stdio.h>\nint main() {\n  printf("Hello world!\\n");\n  return 0;\n}',
        ],
      },
      {
        id: "win-task",
        title: "配置构建任务",
        summary: "从 hello.cpp 生成默认构建任务，并让输出文件进入 bin 文件夹。",
        source: [
          "命令面板选择“任务：配置默认生成任务”。",
          "选择 C:\\mingw64\\bin\\g++.exe。",
          "把输出路径改为 ${fileDirname}\\bin\\${fileBasenameNoExtension}.exe。",
        ],
        why: "tasks.json 决定用哪个编译器、如何把当前源码编译成程序。",
        success: "Ctrl + Shift + B 后，终端显示“生成已成功完成”。",
        caution:
          "若失败，先核对 Path、g++.exe 路径和 JSON 修改，不要反复运行未知命令。",
      },
      {
        id: "win-debug",
        title: "配置并验证调试",
        summary: "创建 launch.json，指定生成的 exe、gdb 路径和预启动构建任务。",
        source: [
          "选择 C++ (GDB/LLDB)，添加 C/C++: (gdb) 启动配置。",
          "程序路径与 tasks.json 的 bin 输出保持一致。",
          "gdb 路径指向 C:\\mingw64\\bin\\gdb.exe。",
        ],
        why: "launch.json 把“先编译、再启动 gdb、运行当前程序”连接成一次调试操作。",
        success: "在 return 0 处加断点后按 F5 或 Fn + F5，程序停在断点。",
      },
      {
        id: "win-use",
        title: "开始日常使用",
        summary:
          "在同一工作区继续创建 .c 或 .cpp 文件，通过构建与调试入口运行。",
        source: [
          "扩展名 .c 表示 C，.cpp 表示 C++。",
          "有输入需求时应在终端中运行。",
        ],
        why: "把一次成功配置转化为可重复的工作方式。",
        success: "可以新建程序、保存、构建、输入数据并调试。",
      },
    ],
  },
};
