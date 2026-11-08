import assert from "node:assert/strict";
import { existsSync,readFileSync } from "node:fs";

import { createJiti } from "jiti";
import katex from "katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { deepLearningChapters } = await jiti.import(
  "../src/data/learning/deep-learning.ts",
);
const chapterIds = new Set(deepLearningChapters.map((c) => c.id));
for (const id of [
  "convolution",
  "cnn-architectures",
  "rnn",
  "bptt",
  "gated-rnn",
  "review",
])
  assert(chapterIds.has(id), `Missing chapter: ${id}`);
const sources = deepLearningChapters.filter(
  (c) => c.id !== "review" && c.study,
);
const review = deepLearningChapters.find((c) => c.id === "review");
assert.deepEqual(
  review.study.formulas,
  sources.flatMap((c) => c.study.formulas),
);
assert.deepEqual(
  review.study.exercises,
  sources.flatMap((c) => c.study.exercises),
);
const parser = unified().use(remarkParse).use(remarkMath);
const ids = new Set(),
  figures = new Set();
let formulas = 0,
  problems = 0,
  math = 0;
function inspectMarkdown(text) {
  const visit = (n) => {
    if (n.type === "math" || n.type === "inlineMath") {
      katex.renderToString(n.value, {
        displayMode: n.type === "math",
        strict: "error",
        throwOnError: true,
      });
      math++;
    }
    for (const child of n.children ?? []) visit(child);
  };
  visit(parser.parse(text));
  for (const [, url] of text.matchAll(
    /\]\((\/learning\/deep-learning(?:\/[^)#\s]+)?)(?:#[^)]*)?\)/g,
  )) {
    const chapterId = url.split("/").filter(Boolean)[2];
    assert(
      !chapterId || chapterIds.has(chapterId),
      `Invalid chapter link ${url}`,
    );
  }
}
function inspectFigure(figure) {
  if (!figure) return;
  assert(figure.alt.length > 10 && figure.caption.length > 5);
  assert(figure.src.startsWith("/images/deep-learning/"));
  assert(existsSync(`public${figure.src}`), `Missing figure ${figure.src}`);
  const svg = readFileSync(`public${figure.src}`, "utf8");
  assert(svg.includes("viewBox="), `Figure must scale: ${figure.src}`);
  assert(!/<script|<foreignObject/i.test(svg));
  figures.add(figure.src);
}
for (const chapter of sources) {
  inspectMarkdown(chapter.body);
  for (const figure of chapter.study.figures ?? []) inspectFigure(figure);
  for (const [kind, entries] of [
    ["formula", chapter.study.formulas],
    ["exercise", chapter.study.exercises],
  ]) {
    for (const entry of entries) {
      assert(/^[a-z][a-z0-9-]+$/.test(entry.id));
      assert(!ids.has(entry.id), `Duplicate anchor/progress id ${entry.id}`);
      ids.add(entry.id);
      const required =
        kind === "formula"
          ? [
              "title",
              "formula",
              "context",
              "task",
              "hint",
              "derivation",
              "pitfall",
              "source",
            ]
          : ["title", "prompt", "hint", "answer", "solution", "source"];
      for (const key of required) {
        assert(
          typeof entry[key] === "string" && entry[key].trim(),
          `${entry.id}: missing ${key}`,
        );
        inspectMarkdown(entry[key]);
      }
      inspectFigure(entry.figure);
      if (kind === "formula") formulas++;
      else {
        problems++;
        assert(entry.minutes > 0 && entry.minutes <= 30);
      }
    }
  }
}
assert(formulas >= 20 && problems >= 12 && figures.size >= 9);
inspectMarkdown(review.body);

// The graph view must never insert the old worked body before the solution boundary.
for (const chapter of sources) {
  const file = `public/assets/course-lessons/deep-learning/zh/${chapter.id}.json`;
  if (!existsSync(file)) continue;
  const lesson = JSON.parse(readFileSync(file, "utf8"));
  for (const mode of ["beginner", "formal"]) {
    const parts = lesson[mode].split("<!-- solutions -->");
    assert.equal(
      parts.length,
      2,
      `${chapter.id}/${mode}: hidden solution boundary`,
    );
    for (const f of chapter.study.formulas) {
      assert(
        parts[1].includes(f.derivation),
        `${f.id}: graph derivation differs`,
      );
      if (f.derivation.length > 100)
        assert(
          !parts[0].includes(f.derivation),
          `${f.id}: premature derivation`,
        );
    }
    for (const e of chapter.study.exercises) {
      assert(parts[0].includes(e.prompt));
      assert(parts[1].includes(e.solution));
      if (e.solution.length > 100)
        assert(!parts[0].includes(e.solution), `${e.id}: premature answer`);
    }
  }
}
console.log(
  `Exam review: ${formulas} formula groups, ${problems} exercises, ${figures.size} diagrams; ${math} math expressions valid; shared content and graph answer boundaries verified.`,
);
