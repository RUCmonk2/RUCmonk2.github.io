import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createJiti } from "jiti";
import katex from "katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const { mathMapNodes } = await createJiti(import.meta.url).import(
  "../src/data/math-map.ts",
);
let formulas = 0;
for (const locale of ["zh", "en"]) {
  const target = path.resolve("public/assets/math-lessons", locale);
  await mkdir(target, { recursive: true });
  for (const node of mathMapNodes) {
    const file = path.resolve("content/math-map", locale, node.id + ".md");
    const raw = await readFile(file, "utf8");
    const parts = raw.split("<!-- formal -->");
    assert.equal(
      parts.length,
      2,
      `${file}: exactly two reading modes required`,
    );
    const [beginner, formal] = parts.map((part) => part.trim());
    assert.equal(
      beginner.split("<!-- solutions -->").length,
      2,
      `${file}: one worked-solutions section required`,
    );
    assert(beginner.length > 1600, `${file}: guided lesson is too short`);
    assert(formal.length > 650, `${file}: formal treatment is too short`);
    assert(/\|.+\|/.test(beginner), `${file}: notation table required`);
    const tree = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .parse(raw);
    function visit(node) {
      if (node.type === "tableRow")
        assert.equal(node.children.length, 3, `${file}: broken notation table`);
      if (node.type === "math" || node.type === "inlineMath") {
        katex.renderToString(node.value, {
          displayMode: node.type === "math",
          strict: "error",
          throwOnError: true,
          trust: false,
        });
        formulas++;
      }
      if (node.type === "text")
        assert(
          !/\\(?:frac|nabla|sum|partial)|\b[a-zA-Z]_[a-zA-Z0-9]/.test(
            node.value,
          ),
          `${file}: raw TeX outside math: ${node.value}`,
        );
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
    const firstParagraph = (text) =>
      text.split(/\n\s*\n/).find((p) => !p.startsWith("#"));
    const intro = {
      beginner: firstParagraph(beginner),
      formal: firstParagraph(formal),
    };
    await writeFile(
      path.join(target, node.id + ".json"),
      JSON.stringify({ beginner, formal, intro }),
    );
  }
}
console.log(
  `Math lessons exported: ${mathMapNodes.length} concepts × 2 languages × 2 modes; ${formulas} formulas checked.`,
);
