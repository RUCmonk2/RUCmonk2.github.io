import "./build-course-lessons.mjs";
import "./check-robotics.mjs";

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { createJiti } from "jiti";
import katex from "katex";

const jiti = createJiti(import.meta.url);
const { courseAtlases } = await jiti.import("../src/data/course-maps/index.ts");
const { getLearningCourse } = await jiti.import("../src/data/learning.ts");
const { layoutGraph, fitCamera, visibleLabels, labelBox } = await jiti.import(
  "../src/components/math-map/layout.ts",
);
assert.equal(courseAtlases.length, 4);
let concepts = 0,
  relations = 0;
for (const atlas of courseAtlases) {
  const ids = new Set(atlas.nodes.map((n) => n.id));
  assert.equal(ids.size, atlas.nodes.length, `${atlas.id}: duplicate ids`);
  assert(ids.has(atlas.defaultNode));
  for (const n of atlas.nodes) {
    assert(atlas.domains.some((d) => d.id === n.domain));
    assert(atlas.centers[n.domain], `Missing layout center ${n.domain}`);
    assert(
      atlas.edges.some((e) => e.source === n.id || e.target === n.id),
      `Isolated ${n.id}`,
    );
    assert(n.formula || n.code, `Missing concept example ${n.id}`);
    if (n.formula)
      katex.renderToString(n.formula, {
        strict: "error",
        throwOnError: true,
        trust: false,
      });
    const ref = n.lesson;
    const content =
      ref.namespace === "math-lessons"
        ? `content/math-map/zh/${ref.id}.md`
        : `content/course-maps/${atlas.id}/${ref.id}.md`;
    assert(
      readFileSync(content, "utf8").includes("<!-- formal -->"),
      `Both modes required: ${n.id}`,
    );
  }
  const pairs = new Set();
  for (const e of atlas.edges) {
    assert(
      ids.has(e.source) && ids.has(e.target),
      `Dangling edge ${JSON.stringify(e)}`,
    );
    assert.notEqual(e.source, e.target);
    const key = [e.source, e.target].sort().join("|");
    assert(!pairs.has(key), `Duplicate edge ${key}`);
    pairs.add(key);
  }
  const visiting = new Set(),
    seen = new Set();
  function visit(id) {
    assert(!visiting.has(id), `Prerequisite cycle ${id}`);
    if (seen.has(id)) return;
    visiting.add(id);
    for (const e of atlas.edges.filter(
      (e) => e.kind === "prereq" && e.source === id,
    ))
      visit(e.target);
    visiting.delete(id);
    seen.add(id);
  }
  for (const id of ids) visit(id);
  for (const route of atlas.paths) {
    assert.equal(new Set(route.nodes).size, route.nodes.length);
    for (const id of route.nodes)
      assert(ids.has(id), `Unknown route topic ${id}`);
  }
  if (atlas.id !== "programming-2026")
    for (const chapter of getLearningCourse(atlas.id).chapters)
      assert(
        ids.has(atlas.chapterNodes[chapter.id]),
        `Chapter missing from map ${chapter.id}`,
      );
  for (const locale of ["zh", "en"]) {
    const points = layoutGraph(atlas.nodes, atlas.edges, locale, atlas.centers);
    assert.deepEqual(
      points,
      layoutGraph(atlas.nodes, atlas.edges, locale, atlas.centers),
    );
    const camera = fitCamera(points);
    assert(camera.zoom > 0);
    for (const p of points)
      assert(Number.isFinite(p.x) && Number.isFinite(p.y));
    const labels = visibleLabels(points, ids, null);
    const boxes = points.filter((p) => labels.has(p.id)).map(labelBox);
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i],
          b = boxes[j];
        assert(
          a.right <= b.left ||
            b.right <= a.left ||
            a.bottom <= b.top ||
            b.bottom <= a.top,
          `${atlas.id}: labels overlap`,
        );
      }
    for (const p of points) assert(visibleLabels(points, ids, p.id).has(p.id));
  }
  concepts += ids.size;
  relations += atlas.edges.length;
}
// Check the actual complete C++ programs shown to learners, including input failure.
const cases = {
  program: [[["", ""]], [["", "Hello\n"]]],
  headers: [[["", "Welcome!\n"]]],
  variables: [[["", "90\n95\nscore\n"]]],
  initialization: [[["", "0 1\n"]]],
  identifiers: [[["", "2 90\n3 4\n"]]],
  cout: [[["", "score=95\n123\n"]]],
  formatting: [[["", "12\n1 2\n\\n\n"]]],
  printf: [[["", "Ada: 95%\n"]]],
  cin: [
    [
      ["12 34\n", "12 34\n"],
      ["12\n34\n", "12 34\n"],
      ["12 x\n", ""],
    ],
  ],
  "input-check": [
    [
      ["42\n", "42\n"],
      ["-7\n", "-7\n"],
      ["hello\n", "invalid\n"],
      ["0\n", "0\n"],
      ["12abc\n", "12\n"],
    ],
  ],
};
const temp = mkdtempSync(path.join(os.tmpdir(), "course-code-check-"));
let programs = 0,
  runs = 0;
try {
  for (const [id, groups] of Object.entries(cases)) {
    const text = readFileSync(
      `content/course-maps/programming-2026/${id}.md`,
      "utf8",
    );
    const blocks = [...text.matchAll(/```cpp\n([\s\S]*?)```/g)].map(
      (m) => m[1],
    );
    assert.equal(
      blocks.length,
      groups.length,
      `${id}: every shown program needs expected output`,
    );
    blocks.forEach((code, index) => {
      const file = path.join(temp, `${id}-${index}.cpp`),
        binary = file.slice(0, -4);
      writeFileSync(file, code);
      execFileSync(
        "c++",
        [
          "-std=c++17",
          "-Wall",
          "-Wextra",
          "-pedantic-errors",
          file,
          "-o",
          binary,
        ],
        { stdio: "pipe", timeout: 30000 },
      );
      programs++;
      for (const [input, expected] of groups[index]) {
        assert.equal(
          execFileSync(binary, [], { input, encoding: "utf8", timeout: 3000 }),
          expected,
          `${id}: unexpected output for ${JSON.stringify(input)}`,
        );
        runs++;
      }
    });
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
// Independent arithmetic checks for added course examples (not renderer snapshots).
const close = (a, b) => assert(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
close((3 * 2 - 1 + 4 - 7) ** 2 / 2, 2);
close((0.1 / 2) * (3 ** 2 + 4 ** 2), 1.25);
close((0 - 0.1 * -6 - 3) ** 2, 5.76);
close((0 - 2 * -6 - 3) ** 2, 81);
close(60 / 10, 6);
close(0.8 * 10 * 0.5, 4);
close((6 * 4) / (60 * 0.5), 0.8);
close(5 * (1 - 0.8), 1);
close(-15 * 1.5 ** 2 + 35 * 1.5 + 10, 28.75);
close(2 + 0.9 * 0 + 0.9 ** 2 * 10, 10.1);
close(5 / (5 + 5), 0.5);
close(2 / 4 + (6 * 3) / 4, 5);
assert.deepEqual(
  [
    [1, 2],
    [3, 4],
  ].map((row) => row[0] * 5 + row[1] * 6),
  [17, 39],
);
close(3 ** 2 + 4 ** 2 + 6 ** 2 + 8 ** 2, 125);
close(2 * 3 * 6, 36);
console.log(
  `Course maps checked: 4 maps, ${concepts} concepts, ${relations} relations; all published chapters covered; ${programs} C++17 programs, ${runs} output checks; independent arithmetic examples.`,
);
