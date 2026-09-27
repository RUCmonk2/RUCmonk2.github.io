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
