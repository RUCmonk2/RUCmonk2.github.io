import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import { createJiti } from "jiti";
import katex from "katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";
const jiti = createJiti(import.meta.url);
const { k12Topics, k12Topic, k12LessonHref, k12Sources } = await jiti.import(
  "../src/data/k12/index.ts",
);
const partial = process.argv.includes("--partial");
const target = path.resolve("public/assets/k12-lessons/zh");
mkdirSync(target, { recursive: true });
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
let formulas = 0,
  characters = 0,
  completed = 0;
const link = (topic) =>
  "[" + topic.title + "](" + k12LessonHref(topic.id) + ")";
for (const topic of k12Topics) {
  const file = path.resolve("content/k12", topic.stage, topic.id + ".md");
  if (partial && !existsSync(file)) continue;
  const raw = readFileSync(file, "utf8");
  const parts = raw.split("<!-- formal -->");
  assert.equal(parts.length, 2, topic.id + ": two reading modes required");
  const [beginner, formal] = parts.map((part) => part.trim());
  assert(
    beginner.length > 1000,
    topic.id + ": guided explanation too short (" + beginner.length + ")",
  );
  assert(
    formal.length > 300,
    topic.id + ": formal explanation too short (" + formal.length + ")",
  );
  assert(beginner.includes("## 自己试试"), topic.id + ": exercises missing");
  assert.equal(
    beginner.split("<!-- solutions -->").length,
    2,
    topic.id + ": worked answers missing",
  );
  assert(
    (beginner.split("<!-- solutions -->")[0].match(/^\d+\./gm) || []).length >=
      3,
    topic.id + ": at least three practice questions",
  );
  assert(
    (beginner.split("<!-- solutions -->")[1].match(/^### 第 \d+ 题/gm) || [])
      .length >= 3,
    topic.id + ": answer each question",
  );
  assert(/\|.*\|/.test(beginner), topic.id + ": explain notation in a table");
  const tree = parser.parse(raw);
  function visit(node) {
    if (["math", "inlineMath"].includes(node.type)) {
      katex.renderToString(node.value, {
        displayMode: node.type === "math",
        strict: "error",
        throwOnError: true,
        trust: false,
      });
      formulas++;
    }
    if (node.type === "text") {
      assert(
        !/\\(?:frac|sqrt|sum|prod|begin|alpha|theta)|\b[a-zA-Z]_[a-zA-Z0-9]/.test(
          node.value,
        ),
        topic.id + ": unrendered formula " + node.value,
      );
      assert(
        !/TODO|待补充|此处省略|暂无内容/.test(node.value),
        topic.id + ": placeholder",
      );
    }
    for (const child of node.children ?? []) visit(child);
  }
  visit(tree);
  katex.renderToString(topic.formula, {
    strict: "error",
    throwOnError: true,
    trust: false,
  });
  const prep = topic.prerequisites.map((id) => link(k12Topic(id))).join(" · ");
  const next = k12Topics
    .filter((item) => item.prerequisites.includes(topic.id))
    .map(link)
    .join(" · ");
  const links =
    "\n\n## 前后知识与教学使用\n\n" +
    (prep
      ? "先修：" + prep + "。\n\n"
      : "先修：可从这一节开始，准备纸笔和少量可移动的小物件。\n\n") +
    (next ? "继续：" + next + "。\n\n" : "") +
    (topic.id.startsWith("factor-")
      ? "[打开因式工坊，练习同类题](/learning/math-lab/factorization)。\n\n"
      : "") +
    "本节目标：" +
    topic.goal +
    "。先独立尝试练习，再展开解答；能解释理由并完成变式，比记住某一道题的结果更重要。";
  const reference =
    "\n\n## 范围与参考\n\n" +
    k12Sources
      .map((source) => "- [" + source.title + "](" + source.href + ")")
      .join("\n") +
    "\n\n课程标准用于核对主题范围；本文讲解、例题与练习为本站独立编写。不同教材的年级顺序可能不同，先修链接表示建议准备，不代表全国统一授课顺序。";
  const insert = (content) =>
    content.includes("<!-- solutions -->")
      ? content.replace(
          "<!-- solutions -->",
          links + reference + "\n\n<!-- solutions -->",
        )
      : content + links + reference;
  const firstParagraph = (content) =>
    content.split(/\n\s*\n/).find((p) => !p.startsWith("#")) ?? topic.goal;
  const lesson = {
    beginner: insert(beginner),
    formal: insert(formal),
    intro: { beginner: firstParagraph(beginner), formal: topic.goal },
  };
  writeFileSync(path.join(target, topic.id + ".json"), JSON.stringify(lesson));
  characters += raw.length;
  completed++;
}
assert(
  partial || completed === k12Topics.length,
  "All planned K12 lessons must exist before release",
);
writeFileSync(
  path.resolve("public/assets/k12-lessons/manifest.json"),
  JSON.stringify({ completed, total: k12Topics.length, formulas, characters }),
);
console.log(
  "K12 " +
    (partial ? "partial authoring check" : "complete export") +
    ": " +
    completed +
    "/" +
    k12Topics.length +
    " dual-mode lessons; " +
    formulas +
    " strict formulas; " +
    characters +
    " source characters.",
);
