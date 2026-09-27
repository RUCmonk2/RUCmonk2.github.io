# 课程知识网维护

四个课程内入口分别位于各课程 URL 的 `/knowledge-map`。`CourseViewSwitch` 在阅读页与图谱页提供入口，普通章节链接携带对应节点 hash；图谱使用 hash 表达选中状态，不使用文章位置锚点。

## 复用边界

- 五张图（数学总图与四门课程图）共用 `MathMapGraph`、D3 布局、墨点轮廓、手势、800ms 悬停聚焦、阅读器和 CSS。
- `src/data/knowledge-atlas.ts` 定义可序列化的图谱结构。`math-atlas.ts` 适配既有数学数据；`course-maps/index.ts` 策展课程概念、主题、先修边和阅读路线。
- `centers` 是柔性的主题吸引中心，不是边界、固定坐标或节点锁定。保留自然力学布局，不给课程图增加盒子或背景墙。
- `tone` 复用黛青、松烟墨、赭石。颜色仍只表达领域；尺寸与文字层级由关联度产生。
- `shortLabel` 控制图内短标题，完整讲解以节点标题和正文承载信息。改中文标签后运行 `scripts/subset-math-map-font.mjs` 更新 Atlas Kai 子集，详见字体目录 README。

## 内容与构建

`content/course-maps/<course>/<topic>.md` 保存课程专属补充讲解。`<!-- formal -->` 分隔“从零理解”与“严谨表述”，`<!-- solutions -->` 后的内容在答案折叠区显示。

三个笔记课程的初学部分用 `<!-- chapter -->` 引入 `src/data/learning/` 的原章节正文，并追加原有自测题和整理依据。这样修订课程原文后，不必维护第二份拷贝。补充内容负责符号表、独立算例和严谨表述。英文图谱明确标注课程正文为中文。

数学支点通过 `lesson` 引用已有 `math-lessons` 中英资源。课程正文资源使用 `course-lessons/<course>/zh` 命名空间，缓存键包含完整命名空间，避免同名概念串内容。

程序设计只覆盖当前公开 L02，参考代码从既有公开代码清单选取。状态检查等补充内容明确标注，不把后续未公开讲次视作已发布。预览区显示代码片段，完整讲解提供独立可编译的 C++17 程序。

`build-course-lessons.mjs` 组合内容、严格检查 KaTeX 并生成按需加载的 JSON。`public/assets/course-lessons/` 是忽略提交的构建产物；源码 Markdown 必须提交。不要把私有课件或交接文件放到 public。

## 验证

使用 Node.js 22，并确保有支持 C++17 的 `c++` 编译器：

```sh
npm run lint
npm run test:content
npm run test:math-map
npm run build
npm run check:export
```

`test:math-map` 同时检查四门课程图：节点、连线、无循环先修、原章节覆盖、布局与标签、双模式资源、独立算例以及 C++ 示例的实际输出。程序反例只作文字教学，不执行未定义行为。静态导出检查覆盖课程入口、图谱节点 hash 和按需讲解资源。

页面实测至少覆盖：课程入口定位、节点切换保持图谱阅读位置、双模式、数学支点复用、答案折叠、手机长公式和代码的局部滚动。静态检查不能替代课程内容的持续人工校对。
