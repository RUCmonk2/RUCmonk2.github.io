import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { createJiti } from "jiti";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { subjectAtlases } = await jiti.import(
  "../src/data/k12-subjects/atlas.ts",
);
const {
  schoolSubjects,
  subjectAtlasHref,
  subjectConceptHref,
  subjectStageHref,
  subjectHref,
} = await jiti.import("../src/data/k12-subjects/index.ts");
const { k12Topics } = await jiti.import("../src/data/k12/index.ts");
const { layoutGraph, fitCamera, visibleLabels, labelBox } = await jiti.import(
  "../src/components/math-map/layout.ts",
);
const parser = unified().use(remarkParse).use(remarkMath);
const targets = new Map();
for (const atlas of subjectAtlases)
  targets.set(atlas.href, new Set(atlas.nodes.map((n) => n.id)));
for (const subject of schoolSubjects)
  targets.set(
    subjectHref(subject.id),
    new Set(
      subject.stages.flatMap((s) => [
        s.id,
        ...s.modules.map((m) => `${s.id}-${m.id}`),
      ]),
    ),
  );
for (const topic of k12Topics)
  targets.set(`/learning/k12/lesson/${topic.id}`, new Set());
assert.equal(subjectAtlases.length, 37);
assert.equal(
  subjectAtlases.reduce((n, a) => n + a.nodes.length, 0),
  671,
);
let links = 0,
  relations = 0;
const payloads = new Set();
for (const subject of schoolSubjects) {
  const authored = JSON.parse(
    readFileSync(`content/k12-atlas/${subject.id}.json`, "utf8"),
  );
  const sourceNodes = new Map(
    authored.modules.flatMap((m) => m.nodes.map((n) => [n.id, n])),
  );
  for (const stage of subject.stages) {
    const atlas = subjectAtlases.find(
      (a) => a.href === subjectAtlasHref(subject.id, stage.id),
    );
    assert(atlas, `Missing stage graph ${subject.id}/${stage.id}`);
    assert.equal(subjectStageHref(subject.id, stage.id), atlas.href);
    assert.deepEqual(
      atlas.nodes.map((n) => n.label.zh),
      stage.modules.flatMap((m) => m.topics),
    );
    const ids = new Set(atlas.nodes.map((n) => n.id));
    assert.equal(ids.size, atlas.nodes.length);
    assert(ids.has(atlas.defaultNode));
    assert(
      atlas.edges.some(
        (e) =>
          atlas.nodes.find((n) => n.id === e.source).domain !==
          atlas.nodes.find((n) => n.id === e.target).domain,
      ),
      atlas.id + ": modules need substantive connections",
    );
    for (const module of stage.modules)
      module.topics.forEach((title, index) => {
        const url = new URL(
          subjectConceptHref(subject.id, stage.id, module.id, index),
          "https://local.invalid",
        );
        assert(ids.has(url.hash.slice(1)), `Broken topic entry ${title}`);
      });
    for (const node of atlas.nodes) {
      assert(atlas.centers[node.domain]);
      assert(
        atlas.edges.some((e) => e.source === node.id || e.target === node.id),
        `Visually isolated node ${atlas.id}/${node.id}`,
      );
      assert(node.preview?.zh, `Missing concept prompt ${node.id}`);
      const ref = node.lesson;
      const file = `public/assets/${ref.namespace}/${ref.locale}/${ref.id}.json`;
      assert(!payloads.has(file), `Overwritten lesson ${file}`);
      payloads.add(file);
      const payload = JSON.parse(readFileSync(file, "utf8"));
      const source = sourceNodes.get(node.id);
      for (const mode of ["beginner", "formal"]) {
        const [body, answers, extra] =
          payload[mode].split("<!-- solutions -->");
        assert(
          body && answers && !extra,
          `Missing or duplicate answer boundary ${file}/${mode}`,
        );
        assert(
          body.includes(source.question) &&
            body.includes(source.example) &&
            body.includes(source.pitfall),
        );
        assert(
          body.includes("## 知识联系"),
          `Connections hidden in answer ${file}/${mode}`,
        );
        assert(answers.includes(source.answer));
        assert(payload.intro[mode]);
        function visit(n) {
          if (n.type === "link" && n.url.startsWith("/learning/")) {
            const url = new URL(n.url, "https://local.invalid");
            const anchors = targets.get(url.pathname.replace(/\/$/, ""));
            assert(anchors, `Unknown lesson destination ${file}: ${n.url}`);
            assert(
              !url.hash || anchors.has(decodeURIComponent(url.hash.slice(1))),
              `Broken concept link ${file}: ${n.url}`,
            );
            links++;
          }
          for (const child of n.children ?? []) visit(child);
        }
        visit(parser.parse(payload[mode]));
      }
    }
    for (const route of atlas.paths) {
      assert.equal(new Set(route.nodes).size, route.nodes.length);
      route.nodes.forEach((id) => assert(ids.has(id)));
    }
    const points = layoutGraph(atlas.nodes, atlas.edges, "zh", atlas.centers);
    assert.deepEqual(
      points,
      layoutGraph(atlas.nodes, atlas.edges, "zh", atlas.centers),
    );
    assert(fitCamera(points).zoom > 0);
    points.forEach((p) => assert(Number.isFinite(p.x) && Number.isFinite(p.y)));
    const shown = visibleLabels(points, ids, null);
    const boxes = points.filter((p) => shown.has(p.id)).map(labelBox);
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i],
          b = boxes[j];
        assert(
          a.right <= b.left ||
            b.right <= a.left ||
            a.bottom <= b.top ||
            b.bottom <= a.top,
          atlas.id + ": overlapping overview labels",
        );
      }
    for (const node of points)
      assert(visibleLabels(points, ids, node.id).has(node.id));
    relations += atlas.edges.length;
  }
}
const labels = subjectAtlases
  .flatMap((a) => a.nodes.map((n) => n.label.zh))
  .join("");
execFileSync("python3", [
  "-c",
  "from fontTools.ttLib import TTFont; import sys; f=TTFont('public/fonts/math-map/kai-labels.woff'); missing=set(map(ord,sys.argv[1]))-set(f.getBestCmap()); assert not missing, ''.join(map(chr,sorted(missing)))",
  labels,
]);
console.log(
  `School atlas integration verified: 37 maps, ${payloads.size} dual-mode lessons, ${relations} visible relations, ${links} lesson links, deterministic layouts and complete label font coverage.`,
);
