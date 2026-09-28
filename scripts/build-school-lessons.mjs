import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import katex from "katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const subjects = JSON.parse(
  readFileSync("src/data/k12-subjects/subjects.json", "utf8"),
);
const mathTopics = JSON.parse(readFileSync("src/data/k12/topics.json", "utf8"));
const partial = process.argv.includes("--partial");
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
const documents = subjects.flatMap((subject) => {
  const file = `content/k12-atlas/${subject.id}.json`;
  if (partial && !existsSync(file)) return [];
  const doc = JSON.parse(readFileSync(file, "utf8"));
  assert.equal(doc.subject, subject.id);
  return [{ subject, doc }];
});
const records = [];
const conceptIndex = new Map();
for (const { subject, doc } of documents)
  for (const module of doc.modules)
    for (const node of module.nodes) {
      const key = `${subject.id}/${node.id}`;
      assert(!conceptIndex.has(key), `Duplicate concept: ${key}`);
      conceptIndex.set(key, {
        ...node,
        subject: subject.id,
        stage: module.stage,
        module: module.id,
      });
    }
const mapHref = (subject, stage) =>
  `/learning/k12/subjects/${subject}/knowledge-map/${stage}`;
const nodeLink = (node) =>
  `[${node.title}](${mapHref(node.subject, node.stage)}#${node.id})`;
let formulas = 0;
const allPrereqs = new Map();
for (const { subject, doc } of documents) {
  const expectedModules = subject.stages
    .flatMap((stage) => stage.modules.map((m) => `${stage.id}/${m.id}`))
    .sort();
  assert.deepEqual(
    doc.modules.map((m) => `${m.stage}/${m.id}`).sort(),
    expectedModules,
    subject.id + ": cover every module",
  );
  const edges = [...doc.modules.flatMap((m) => m.edges), ...doc.connections];
  const seenEdges = new Set();
  for (const edge of edges) {
    assert(["prereq", "related"].includes(edge.kind));
    assert(
      conceptIndex.has(`${subject.id}/${edge.source}`) &&
        conceptIndex.has(`${subject.id}/${edge.target}`),
      subject.id + ": dangling edge",
    );
    assert.notEqual(edge.source, edge.target);
    const key =
      edge.kind === "related"
        ? [edge.source, edge.target].sort().join("~")
        : `${edge.source}>${edge.target}`;
    assert(!seenEdges.has(key), `${subject.id}: repeated relation ${key}`);
    seenEdges.add(key);
    if (edge.kind === "prereq") {
      const key = `${subject.id}/${edge.target}`;
      allPrereqs.set(key, [
        ...(allPrereqs.get(key) ?? []),
        `${subject.id}/${edge.source}`,
      ]);
    }
  }
  for (const stage of subject.stages) {
    const modules = doc.modules.filter((m) => m.stage === stage.id);
    const nodes = modules.flatMap((m) =>
      m.nodes.map((n) => ({
        id: n.id,
        title: n.title,
        module: m.id,
        blurb: n.intuition,
        prompt: n.question,
      })),
    );
    const ids = new Set(nodes.map((n) => n.id));
    records.push({
      subject: subject.id,
      stage: stage.id,
      nodes,
      edges: edges.filter((e) => ids.has(e.source) && ids.has(e.target)),
    });
  }
  for (const module of doc.modules) {
    const spec = subject.stages
      .find((s) => s.id === module.stage)
      .modules.find((m) => m.id === module.id);
    assert.deepEqual(
      module.nodes.map((n) => n.title),
      spec.topics,
      `${subject.id}/${module.id}: cover each declared topic exactly once`,
    );
    for (const node of module.nodes) {
      for (const field of [
        "intuition",
        "formal",
        "example",
        "question",
        "answer",
        "pitfall",
      ]) {
        assert(
          ![...node[field]].some((c) => c.charCodeAt(0) < 32 && c !== "\n"),
          `${subject.id}/${node.id}: control character in ${field}`,
        );
        assert(
          node[field]?.trim(),
          `${subject.id}/${node.id}: missing ${field}`,
        );
        assert(!/TODO|待补充|暂无内容|此处省略/.test(node[field]), node.id);
      }
      assert.notEqual(
        node.intuition,
        node.formal,
        node.id + ": reading modes must differ",
      );
      const before = edges
        .filter((e) => e.kind === "prereq" && e.target === node.id)
        .map((e) => conceptIndex.get(`${subject.id}/${e.source}`));
      const after = edges
        .filter((e) => e.kind === "prereq" && e.source === node.id)
        .map((e) => conceptIndex.get(`${subject.id}/${e.target}`));
      const related = edges
        .filter(
          (e) =>
            e.kind === "related" &&
            (e.source === node.id || e.target === node.id),
        )
        .map((e) =>
          conceptIndex.get(
            `${subject.id}/${e.source === node.id ? e.target : e.source}`,
          ),
        );
      const links = [];
      if (before.length)
        links.push("**建议先学：** " + before.map(nodeLink).join(" · "));
      if (after.length)
        links.push("**接着探索：** " + after.map(nodeLink).join(" · "));
      if (related.length)
        links.push("**关联知识：** " + related.map(nodeLink).join(" · "));
      for (const bridge of doc.bridges.filter((b) => b.node === node.id)) {
        if (bridge.subject === "mathematics") {
          const math = mathTopics.find((t) => t.id === bridge.target);
          assert(math, `Unknown mathematics bridge ${bridge.target}`);
          links.push(
            `[${math.title}](/learning/k12/lesson/${math.id})：${bridge.why}`,
          );
        } else {
          const target = conceptIndex.get(`${bridge.subject}/${bridge.target}`);
          if (partial && !target) continue;
          assert(
            target,
            `Unknown cross-subject bridge ${bridge.subject}/${bridge.target}`,
          );
          assert.equal(target.stage, bridge.stage);
          links.push(`${nodeLink(target)}：${bridge.why}`);
        }
      }
      assert(
        links.length,
        `${subject.id}/${node.id}: concept must have a meaningful connection`,
      );
      const context = `\n\n## 知识联系\n\n${links.join("\n\n")}\n\n[回到「${spec.title}」的综合任务](/learning/k12/subjects/${subject.id}#${module.stage}-${module.id})`;
      const source =
        module.stage === "high"
          ? "https://www.moe.gov.cn/srcsite/A26/s8001/202006/t20200603_462199.html"
          : "https://www.moe.gov.cn/srcsite/A26/s8001/202204/t20220420_619921.html";
      const extraSource =
        subject.id === "pe"
          ? "\n\n[体育与健康课程标准：活动、健康与安全的学习范围](https://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582362336303.pdf)。"
          : "";
      const references = `\n\n## 继续学习\n\n[课程范围依据：教育部课程方案与标准](${source})。概念解释、例子与练习由本站独立整理；课程安排按在用教材核对。${extraSource}`;
      const beginner = `${node.intuition}\n\n## 把概念说清楚\n\n${node.formal}\n\n## 跟一个例子理解\n\n${node.example}\n\n## 容易混淆的地方\n\n${node.pitfall}${context}${references}\n\n## 自己试试\n\n${node.question}\n\n<!-- solutions -->\n\n### 参考解答与理由\n\n${node.answer}`;
      const formal = `${node.formal}\n\n## 适用边界与辨析\n\n${node.pitfall}\n\n## 例证与检验\n\n${node.example}${context}${references}\n\n**检验问题：** ${node.question}\n\n<!-- solutions -->\n\n${node.answer}`;
      const tree = parser.parse(beginner + "\n\n" + formal);
      function visit(n) {
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
            !/\\(?:frac|sqrt|sum|Delta|rho|boldsymbol|mathrm)|\b[a-zA-Z]_[a-zA-Z0-9]/.test(
              n.value,
            ),
            `${node.id}: raw formula ${n.value}`,
          );
        for (const child of n.children ?? []) visit(child);
      }
      visit(tree);
      const output = path.join(
        "public/assets/school-lessons",
        subject.id,
        "zh",
      );
      mkdirSync(output, { recursive: true });
      writeFileSync(
        path.join(output, node.id + ".json"),
        JSON.stringify({
          beginner,
          formal,
          intro: { beginner: node.intuition, formal: node.formal },
        }),
      );
    }
  }
}
const visiting = new Set(),
  visited = new Set();
function checkDag(key) {
  if (visited.has(key)) return;
  assert(!visiting.has(key), `Prerequisite cycle: ${key}`);
  visiting.add(key);
  for (const before of allPrereqs.get(key) ?? []) checkDag(before);
  visiting.delete(key);
  visited.add(key);
}
for (const key of conceptIndex.keys()) checkDag(key);
writeFileSync(
  "src/data/k12-subjects/atlas-manifest.json",
  JSON.stringify(records, null, 2) + "\n",
);
console.log(
  `School atlases: ${documents.length}/15 subjects, ${records.length}/37 maps, ${conceptIndex.size}/671 authored concept lessons, ${formulas} strict formula renderings${partial ? " (authoring preview)" : ""}.`,
);
