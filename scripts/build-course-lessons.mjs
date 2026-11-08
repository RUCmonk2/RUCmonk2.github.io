import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createJiti } from "jiti";
import katex from "katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { courseAtlases } = await jiti.import("../src/data/course-maps/index.ts");
const { getLearningCourse, chapterPath } = await jiti.import(
  "../src/data/learning.ts",
);
const { programming2026Lectures } = await jiti.import(
  "../src/data/teaching/programming-2026.ts",
);
const examples = programming2026Lectures[0].examples;
const examplePages = {
  program: ["2"],
  headers: ["9"],
  variables: ["6", "20"],
  initialization: ["20", "21"],
  identifiers: ["24"],
  cout: ["6", "12", "13"],
  formatting: ["12", "13", "14"],
  printf: ["7"],
  cin: ["27", "28"],
  "input-check": ["29"],
};
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
let formulas = 0,
  count = 0;
for (const atlas of courseAtlases) {
  const target = path.resolve("public/assets/course-lessons", atlas.id, "zh");
  await mkdir(target, { recursive: true });
  for (const node of atlas.nodes.filter((n) =>
    n.lesson?.namespace.startsWith("course-lessons/"),
  )) {
    const id = node.lesson.id;
    const file = path.resolve("content/course-maps", atlas.id, `${id}.md`);
    const raw = await readFile(file, "utf8");
    const parts = raw.split("<!-- formal -->");
    assert.equal(
      parts.length,
      2,
      `${file}: exactly two reading modes required`,
    );
    let [beginner, formal] = parts.map((p) => p.trim());
    if (atlas.id !== "programming-2026") {
      const chapter = getLearningCourse(atlas.id).chapters.find(
        (c) => c.id === id,
      );
      assert(chapter, `${file}: missing published course chapter`);
      assert.equal(
        beginner.split("<!-- chapter -->").length,
        2,
        `${file}: one chapter insertion required`,
      );
      const figure = chapter.figure
        ? `![${chapter.figure.alt}](${chapter.figure.src})\n\n${chapter.figure.caption}\n\n`
        : "";
      beginner = beginner.replace("<!-- chapter -->", figure + chapter.body);
      beginner +=
        "\n\n## 自己试试\n\n" +
        chapter.checks.map((c, i) => `${i + 1}. ${c.question}`).join("\n\n");
      beginner +=
        "\n\n<!-- solutions -->\n\n" +
        chapter.checks
          .map((c, i) => `### 第 ${i + 1} 题\n\n${c.answer}`)
          .join("\n\n");
      const reference = `\n\n## 对应章节与整理依据\n\n[${chapter.title}](${chapterPath(atlas.id, chapter.id)})\n\n${chapter.source}`;
      beginner = beginner.replace("## 自己试试", reference + "\n\n## 自己试试");
      formal += reference;
      if (chapter.study) {
        // One content source: preserve the exam reader's answer boundary in both map modes.
        const study = chapter.study;
        const picture = (f) =>
          f ? `![${f.alt}](${f.src})\n\n${f.caption}\n\n` : "";
        const notation =
          "| 约定 | 核对要点 |\n| --- | --- |\n| 单样本列向量 | 梯度与参数同形状，先检查转置 |\n| 损失归约 | 区分求和与平均，保留正则系数 |\n| 独立练习 | 题目在前，提示和推导统一位于答案折叠区 |";
        const visible =
          study.formulas
            .map(
              (f) =>
                `### ${f.title}\n\n${f.formula}\n\n${f.context}\n\n**自己推导：** ${f.task}\n\n${picture(f.figure)}来源：${f.source}`,
            )
            .join("\n\n") +
          "\n\n## 先独立作答\n\n" +
          study.exercises
            .map(
              (e, i) =>
                `### ${i + 1}. ${e.title}\n\n${e.prompt}\n\n${picture(e.figure)}来源：${e.source}`,
            )
            .join("\n\n");
        const solutions =
          "\n\n<!-- solutions -->\n\n" +
          study.formulas
            .map(
              (f) =>
                `### ${f.title}：推导\n\n**提示：** ${f.hint}\n\n${f.derivation}\n\n**易错点：** ${f.pitfall}`,
            )
            .join("\n\n") +
          "\n\n" +
          study.exercises
            .map(
              (e, i) =>
                `### 练习 ${i + 1}：${e.title}\n\n**提示：** ${e.hint}\n\n**结果：** ${e.answer}\n\n${e.solution}`,
            )
            .join("\n\n");
        const pictures = (study.figures ?? []).map(picture).join("\n");
        beginner = `## ${chapter.title}\n\n${chapter.lead}\n\n${notation}\n\n${chapter.id === "review" ? chapter.body : "先看图与公式，在纸上完成推导任务，再展开下方答案。完整章节支持逐题提示、隐藏公式结论和手动重做标记。"}\n\n${pictures}\n\n${visible}${reference}${solutions}`;
        formal = `## ${chapter.title}：条件与推导\n\n从函数定义出发，逐项固定变量、形状和归约约定。标量损失的参数梯度与参数具有相同形状；如果同一参数沿多条路径影响损失，各路径贡献相加。先说明适用条件，再核对每个中间量，不能仅凭最终数值相近断言推导正确。\n\n${notation}\n\n${visible}${reference}${solutions}`;
      }
    } else {
      const selected = examples.filter((e) =>
        examplePages[id].some((p) => e.filename.startsWith(`slides${p}_`)),
      );
      assert(selected.length, `${id}: must connect to published examples`);
      const references =
        "\n\n## 对应公开代码\n\n" +
        selected
          .map(
            (e) =>
              `- [${e.title.zh} · ${e.slide}](/teaching/programming-2026/l02/${e.filename})`,
          )
          .join("\n") +
        "\n\n[返回 L02 课程材料](/teaching/programming-2026) · [C++17 工作草案 N4659](https://timsong-cpp.github.io/cppwp/n4659/)";
      beginner = beginner.replace(
        "## 自己试试",
        references + "\n\n## 自己试试",
      );
      formal += references;
    }
    assert(beginner.length > 1000, `${file}: incomplete guided lesson`);
    assert(formal.length > 350, `${file}: incomplete formal treatment`);
    assert.notEqual(beginner, formal);
    assert.equal(
      beginner.split("<!-- solutions -->").length,
      2,
      `${file}: worked solutions required`,
    );
    const tree = parser.parse(beginner + "\n\n" + formal);
    let tables = 0;
    function visit(n) {
      if (n.type === "table") tables++;
      if (n.type === "math" || n.type === "inlineMath") {
        katex.renderToString(n.value, {
          displayMode: n.type === "math",
          strict: "error",
          throwOnError: true,
          trust: false,
        });
        formulas++;
      }
      if (n.type === "text")
        assert(
          !/\\(?:frac|nabla|sum|partial|delta)|\b[a-zA-Z]_[a-zA-Z0-9]/.test(
            n.value,
          ),
          `${file}: raw formula outside math: ${n.value}`,
        );
      for (const c of n.children ?? []) visit(c);
    }
    visit(tree);
    assert(tables, `${file}: notation table required`);
    const firstParagraph = (text) =>
      text.split(/\n\s*\n/).find((p) => !p.startsWith("#"));
    const lesson = {
      beginner,
      formal,
      intro: {
        beginner: firstParagraph(beginner),
        formal: firstParagraph(formal),
      },
    };
    await writeFile(path.join(target, `${id}.json`), JSON.stringify(lesson));
    count++;
  }
}
console.log(
  `Course lessons exported: ${count} Chinese lessons × 2 modes; ${formulas} formulas checked; shared mathematics uses existing bilingual assets.`,
);
