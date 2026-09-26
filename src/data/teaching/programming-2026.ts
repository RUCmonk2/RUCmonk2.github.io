export type TeachingLocale = "zh" | "en";

type LocalizedText = Record<TeachingLocale, string>;

export type PublishedExample = {
  slide: string;
  filename: string;
  title: LocalizedText;
};

export type PublishedLecture = {
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  sourceDirectory: string;
  archiveLabel: LocalizedText;
  examples: PublishedExample[];
};

export const programming2026Lectures: PublishedLecture[] = [
  {
    number: "L02",
    title: {
      zh: "数据的基本输入输出",
      en: "Basic data input and output",
    },
    description: {
      zh: "19 个按课件编号整理的 C++ 示例，涵盖 cout、printf、变量与 cin；压缩包内附页码说明和使用方法。",
      en: "Nineteen C++ examples organized by slide number, covering cout, printf, variables, and cin, with an archive guide included.",
    },
    href: "/teaching/programming-2026/l02-cpp-examples.zip",
    sourceDirectory: "l02",
    archiveLabel: {
      zh: "ZIP · 约 11 KB · 19 个 CPP + README",
      en: "ZIP · about 11 KB · 19 CPP files + README",
    },
    examples: [
      {
        slide: "02",
        filename: "slides2_minimal_program.cpp",
        title: { zh: "最小 C++ 程序", en: "Minimal C++ program" },
      },
      {
        slide: "06",
        filename: "slides6_cout_welcome.cpp",
        title: { zh: "cout 输出字符串", en: "Print text with cout" },
      },
      {
        slide: "06",
        filename: "slides6_cout_string_variable.cpp",
        title: {
          zh: "cout 输出字符串变量",
          en: "Print a string variable with cout",
        },
      },
      {
        slide: "07",
        filename: "slides7_printf_welcome.cpp",
        title: { zh: "printf 输出字符串", en: "Print text with printf" },
      },
      {
        slide: "07",
        filename: "slides7_printf_string_variable.cpp",
        title: {
          zh: "printf 输出字符数组",
          en: "Print a character array with printf",
        },
      },
      {
        slide: "09",
        filename: "slides9_include_and_namespace.cpp",
        title: {
          zh: "头文件与命名空间",
          en: "Headers and namespaces",
        },
      },
      {
        slide: "12",
        filename: "slides12_cout_text_multiline.cpp",
        title: {
          zh: "一条 cout 语句分行书写",
          en: "Write one cout statement across lines",
        },
      },
      {
        slide: "12",
        filename: "slides12_cout_text_statements.cpp",
        title: {
          zh: "多条 cout 语句连续输出",
          en: "Print with consecutive cout statements",
        },
      },
      {
        slide: "13",
        filename: "slides13_cout_numbers_single_line.cpp",
        title: {
          zh: "数字输出：一行写法",
          en: "Number output on one line",
        },
      },
      {
        slide: "13",
        filename: "slides13_cout_numbers_multiline.cpp",
        title: {
          zh: "数字输出：分行写法",
          en: "Number output across lines",
        },
      },
      {
        slide: "13",
        filename: "slides13_cout_numbers_statements.cpp",
        title: {
          zh: "数字输出：拆分语句",
          en: "Number output in separate statements",
        },
      },
      {
        slide: "14–15",
        filename: "slides14_cout_without_spaces.cpp",
        title: {
          zh: "去掉空格后的输出",
          en: "Output without inserted spaces",
        },
      },
      {
        slide: "20",
        filename: "slides20_variable_initialized.cpp",
        title: {
          zh: "定义变量并赋初值",
          en: "Define and initialize a variable",
        },
      },
      {
        slide: "21",
        filename: "slides21_variable_uninitialized.cpp",
        title: {
          zh: "局部变量与全局变量",
          en: "Local and global variables",
        },
      },
      {
        slide: "24–25",
        filename: "slides24_variable_names.cpp",
        title: { zh: "变量命名小测试", en: "Variable naming exercise" },
      },
      {
        slide: "27",
        filename: "slides27_cin_multiline.cpp",
        title: {
          zh: "一条 cin 语句分行书写",
          en: "Write one cin statement across lines",
        },
      },
      {
        slide: "27",
        filename: "slides27_cin_statements.cpp",
        title: {
          zh: "多条 cin 语句依次输入",
          en: "Read input with consecutive cin statements",
        },
      },
      {
        slide: "28",
        filename: "slides28_cin_two_integers.cpp",
        title: {
          zh: "输入并输出两个整数",
          en: "Read and print two integers",
        },
      },
      {
        slide: "29",
        filename: "slides29_cin_echo_integer.cpp",
        title: {
          zh: "输入并原样输出一个整数",
          en: "Read and echo one integer",
        },
      },
    ],
  },
];

export const programming2026Copy = {
  zh: {
    backHome: "叶耀之 · 个人主页",
    eyebrow: "TEACHING · PROGRAMMING · 2026",
    description:
      "程序设计课程的公开学习资料。按讲次查看、复制或下载可独立运行的 C++ 示例；后续内容将在完成整理与授权确认后逐步加入。",
    publishedCount: "已发布讲次",
    exampleCount: "代码示例",
    materialsTitle: "每讲资料",
    materialsDescription:
      "当前只提供已经确认可以公开的整理版文件，可直接展开阅读。",
    published: "已发布",
    browseTitle: "在线查看示例",
    browseDescription: "按课件编号展开代码，无需下载即可阅读和复制。",
    copyCode: "复制代码",
    copiedCode: "已复制",
    download: "下载全部代码",
    notesTitle: "使用说明",
    notes: [
      "文件名中的 slidesNN 对应课件画面右下角编号，不是 PDF 阅读器页码。",
      "课件编号 16 未出现在原 PDF 中，因此后续编号与 PDF 页码相差一页。",
      "课件编号 9、21、24 包含故意设计的反例或观察任务，请先阅读文件顶部注释。",
      "19 个示例均已使用 C++17 检查；未初始化变量和未使用变量警告属于相应示例的教学内容。",
    ],
    boundaryTitle: "本页的公开范围",
    boundaryText:
      "本站仅保存公开发布副本。教师课件、往年 PPT、完整教材、课程题目表以及内部工作文件均未在此发布。",
    futureTitle: "后续更新",
    futureText:
      "L03 及后续讲次会在资料整理、内容核对和公开权限确认完成后追加；现阶段没有公开时间承诺。",
  },
  en: {
    backHome: "Yaozhi Ye · Homepage",
    eyebrow: "TEACHING · PROGRAMMING · 2026",
    description:
      "Public learning materials for the programming course. Browse, copy, or download runnable C++ examples by lecture; later materials will follow after review and publication approval.",
    publishedCount: "Published lecture",
    exampleCount: "Code examples",
    materialsTitle: "Lecture materials",
    materialsDescription:
      "Only reviewed files cleared for public access are listed here, ready to read in the page.",
    published: "Published",
    browseTitle: "Browse examples",
    browseDescription:
      "Expand examples by slide number and copy code without downloading anything.",
    copyCode: "Copy code",
    copiedCode: "Copied",
    download: "Download all code",
    notesTitle: "How to use the archive",
    notes: [
      "The slidesNN filename refers to the number printed on the slide, not the PDF reader page number.",
      "Slide 16 is absent from the source PDF, so later slide numbers are one ahead of the PDF page count.",
      "Slides 9, 21, and 24 contain deliberate counterexamples or observation tasks; read each file's opening comments first.",
      "All 19 examples were checked as C++17. Warnings about an uninitialized or unused variable are intentional in the relevant teaching examples.",
    ],
    boundaryTitle: "What is public here",
    boundaryText:
      "This site stores publication copies only. Instructor slides, previous-year presentations, the complete textbook, course problem sheets, and internal working files are not published here.",
    futureTitle: "Future updates",
    futureText:
      "L03 and later lectures may be added after their materials are organized, checked, and cleared for public release. No publication schedule is promised yet.",
  },
} as const;
