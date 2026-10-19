import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";

import { createJiti } from "jiti";
import katex from "katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const {
  formulaConnections,
  formulaKinds,
  formulaRelationLabels,
  legacyFormulaTopics,
  physicsFormulaAtlas: atlas,
  physicsFormulaEdges: edges,
  physicsFormulaHref,
  physicsFormulas: formulas,
  physicsLessonMarkdown,
} = await jiti.import("../src/data/physics-formulas.ts");
const { getSubjectAtlas } = await jiti.import(
  "../src/data/k12-subjects/atlas.ts",
);
const { atlasRelationsFor } = await jiti.import(
  "../src/components/math-map/relations.ts",
);
const { fitCamera, labelBox, layoutGraph, visibleLabels } = await jiti.import(
  "../src/components/math-map/layout.ts",
);

const expectedIds = [
  "motion",
  "newton",
  "work",
  "kinetic-energy",
  "work-energy",
  "gravitational-energy",
  "mechanical-energy",
  "coulomb",
  "electric-field",
  "point-charge-field",
  "electric-potential",
  "electric-work",
  "uniform-field",
  "combined-energy",
  "acceleration",
  "deflection",
];
const ids = new Set(formulas.map((node) => node.id));
assert.deepEqual(
  formulas.map((node) => node.id),
  expectedIds,
);
assert.equal(ids.size, 16, "The formula course must contain 16 unique topics");
assert.deepEqual(
  atlas.nodes.map((node) => node.id),
  expectedIds,
);
assert.equal(atlas.href, physicsFormulaHref);
assert.equal(atlas.defaultNode, "work-energy");
assert.equal(edges.length, 24);
assert.equal(atlas.edges.length, edges.length);
const byId = new Map(formulas.map((node) => [node.id, node]));

function nonempty(value, context) {
  assert.equal(typeof value, "string", `${context}: expected text`);
  assert(value.trim(), `${context}: text must not be empty`);
}
function nonemptyList(value, context) {
  assert(Array.isArray(value) && value.length > 0, `${context}: empty list`);
}

// These are inputs to one derivation, not merely a visually plausible path.
const requiredWorkPremises = ["kinetic-energy", "motion", "newton", "work"];
const workConnections = formulaConnections("work-energy");
assert.deepEqual(
  workConnections.before.map((edge) => edge.source).sort(),
  requiredWorkPremises,
  "Work–energy needs motion, Newton's law, work and kinetic energy together",
);
assert(
  !workConnections.before.some((edge) => edge.source === "mechanical-energy"),
  "Mechanical-energy conservation is not a premise of work–energy",
);
assert(
  workConnections.after.some((edge) => edge.target === "mechanical-energy"),
);
const previewWork = atlasRelationsFor("work-energy", atlas.nodes, atlas.edges);
assert.deepEqual(
  previewWork.before.map((node) => node.id).sort(),
  requiredWorkPremises,
  "The preview must expose all premises used by the full derivation",
);
assert(previewWork.after.some((node) => node.id === "mechanical-energy"));

const relationTypes = new Set();
const edgeKeys = new Set();
for (const edge of edges) {
  assert(ids.has(edge.source) && ids.has(edge.target), "Dangling formula edge");
  assert.notEqual(
    edge.source,
    edge.target,
    "A formula cannot depend on itself",
  );
  assert(
    ["definition", "deduction", "condition", "analogy"].includes(edge.relation),
    `Unknown relation type ${edge.relation}`,
  );
  nonempty(edge.reason, `${edge.source} -> ${edge.target}: relation reason`);
  relationTypes.add(edge.relation);
  const endpoints =
    edge.relation === "analogy"
      ? [edge.source, edge.target].sort()
      : [edge.source, edge.target];
  const key = `${edge.relation}:${endpoints.join("->")}`;
  assert(!edgeKeys.has(key), `Duplicate formula relation ${key}`);
  edgeKeys.add(key);

  const rendered = atlas.edges.find(
    (item) =>
      item.source === edge.source &&
      item.target === edge.target &&
      item.relation === edge.relation,
  );
  assert(rendered, `Missing typed atlas edge ${key}`);
  assert.equal(rendered.label.zh, formulaRelationLabels[edge.relation]);
  assert.equal(rendered.explanation.zh, edge.reason);
  assert.equal(
    rendered.kind,
    edge.relation === "analogy" ? "related" : "prereq",
  );

  if (edge.relation === "analogy") {
    for (const id of [edge.source, edge.target]) {
      const connections = formulaConnections(id);
      assert(
        connections.related.includes(edge),
        `${key}: analogy is symmetric`,
      );
      assert(
        !connections.before.includes(edge),
        `${key}: analogy is not a premise`,
      );
      assert(
        !connections.after.includes(edge),
        `${key}: analogy is not deduction`,
      );
      const preview = atlasRelationsFor(id, atlas.nodes, atlas.edges);
      const other = edge.source === id ? edge.target : edge.source;
      assert(preview.related.some((node) => node.id === other));
      assert(!preview.before.some((node) => node.id === other));
      assert(!preview.after.some((node) => node.id === other));
    }
  }
}
assert.deepEqual([...relationTypes].sort(), [
  "analogy",
  "condition",
  "deduction",
  "definition",
]);
// Pin the pedagogical analogy independently of the edge-to-UI conversion.
assert(
  !formulaConnections("electric-potential").before.some(
    (edge) => edge.source === "gravitational-energy",
  ),
  "A gravitational analogy cannot prove electric potential",
);
assert(
  formulaConnections("electric-potential").related.some(
    (edge) => edge.source === "gravitational-energy",
  ),
);

const visiting = new Set();
const visited = new Set();
function visitDependencies(id) {
  assert(!visiting.has(id), `Cyclic formula dependency at ${id}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const edge of edges)
    if (edge.source === id && edge.relation !== "analogy")
      visitDependencies(edge.target);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) visitDependencies(id);

const pathTopics = new Set();
for (const path of atlas.paths) {
  assert.equal(new Set(path.nodes).size, path.nodes.length);
  for (const id of path.nodes) {
    assert(ids.has(id), `${path.id}: unknown path topic ${id}`);
    pathTopics.add(id);
  }
}
assert.deepEqual([...pathTopics].sort(), [...ids].sort());

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
let renderedFormulas = 0;
function checkTex(value, displayMode, context) {
  assert.doesNotThrow(
    () =>
      katex.renderToString(value, {
        displayMode,
        strict: "error",
        throwOnError: true,
        trust: false,
      }),
    `${context}: invalid KaTeX ${value}`,
  );
  renderedFormulas++;
}
function checkMarkdown(markdown, context) {
  const tree = parser.parse(markdown);
  function visit(node) {
    if (node.type === "math" || node.type === "inlineMath")
      checkTex(node.value, node.type === "math", context);
    if (node.type === "text")
      assert(
        !/\\(?:frac|sqrt|sum|Delta|vec|mathrm|text|cdot|times)\b/.test(
          node.value,
        ),
        `${context}: unparsed TeX outside a math span: ${node.value}`,
      );
    if (node.type === "link" && node.url.startsWith(physicsFormulaHref)) {
      const url = new URL(node.url, "https://local.invalid");
      assert.equal(url.pathname, physicsFormulaHref);
      assert(
        ids.has(decodeURIComponent(url.hash.slice(1))),
        `${context}: broken ${node.url}`,
      );
    }
    for (const child of node.children ?? []) visit(child);
  }
  visit(tree);
  return tree;
}
function checkSteps(steps, context) {
  nonemptyList(steps, context);
  for (const [index, step] of steps.entries()) {
    const label = `${context}/${index + 1}`;
    assert.equal(typeof step.equation, "string", `${label}: equation field`);
    if (step.equation) checkTex(step.equation, true, label);
    if (step.title !== undefined) nonempty(step.title, `${label}: title`);
    nonempty(step.explanation, `${label}: explanation`);
  }
}
function checkLesson(markdown, node, context) {
  nonempty(markdown, context);
  const parts = markdown.split("<!-- solutions -->");
  assert.equal(parts.length, 2, `${context}: exactly one solutions boundary`);
  const [body, answers] = parts;
  nonempty(body, `${context}: lesson body`);
  nonempty(answers, `${context}: answer section`);
  assert(body.includes(node.check.question), `${context}: missing self-check`);
  assert(
    !body.includes(node.check.answer),
    `${context}: self-check answer leaked`,
  );
  assert(
    answers.includes(node.check.answer),
    `${context}: answer missing after boundary`,
  );
  for (const heading of [
    "符号与单位",
    "适用条件",
    "完整例题",
    "知识联系",
    "自己试试",
  ])
    assert(body.includes(`## ${heading}`), `${context}: missing ${heading}`);
  for (const text of [
    node.formula,
    node.summary,
    node.formalNote,
    ...node.conditions,
    ...node.pitfalls,
    node.example.problem,
    node.example.result,
    ...[...node.steps, ...node.example.steps].flatMap((step) => [
      step.title ?? "",
      step.equation,
      step.explanation,
    ]),
  ].filter(Boolean))
    assert(body.includes(text), `${context}: content dropped: ${text}`);

  const tree = checkMarkdown(markdown, context);
  const table = tree.children.find((child) => child.type === "table");
  assert(table, `${context}: missing symbols table`);
  assert.equal(table.children.length, node.symbols.length + 1);
  for (const [index, symbol] of node.symbols.entries()) {
    const row = table.children[index + 1];
    assert.equal(
      row.children.length,
      3,
      `${context}: symbols row ${index + 1} must retain symbol, meaning and unit; escape Markdown pipes`,
    );
    for (const value of [symbol.symbol, symbol.meaning, symbol.unit])
      assert(
        body.includes(value),
        `${context}: symbol information missing: ${value}`,
      );
    assert(
      row.children[0].children.some((child) => child.type === "inlineMath"),
    );
    assert(
      row.children[2].children.some((child) => child.type === "inlineMath"),
    );
  }
}

const authoredLessons = new Map();
for (const node of formulas) {
  assert(
    !/电容|capacit/i.test(`${node.id} ${node.title}`),
    "Capacitance is outside this course",
  );
  for (const field of [
    "id",
    "title",
    "summary",
    "intuition",
    "formula",
    "formalNote",
  ])
    nonempty(node[field], `${node.id}/${field}`);
  assert(
    Object.hasOwn(formulaKinds, node.kind),
    `${node.id}: unknown formula kind`,
  );
  assert(atlas.domains.some((domain) => domain.id === node.domain));
  assert(atlas.centers[node.domain]);
  nonemptyList(node.symbols, `${node.id}: symbols`);
  for (const symbol of node.symbols) {
    for (const field of ["symbol", "meaning", "unit"])
      nonempty(symbol[field], `${node.id}: ${field}`);
    checkTex(symbol.symbol, false, `${node.id}: symbol`);
    checkTex(symbol.unit, false, `${node.id}: unit`);
  }
  nonemptyList(node.conditions, `${node.id}: conditions`);
  node.conditions.forEach((value) => nonempty(value, `${node.id}: condition`));
  assert(
    node.steps.length >= 4 && node.steps.length <= 6,
    `${node.id}: expected 4–6 teaching steps`,
  );
  checkSteps(node.steps, `${node.id}: derivation`);
  nonempty(node.example.problem, `${node.id}: example problem`);
  nonempty(node.example.result, `${node.id}: example result`);
  checkSteps(node.example.steps, `${node.id}: example`);
  nonemptyList(node.pitfalls, `${node.id}: pitfalls`);
  node.pitfalls.forEach((value) => nonempty(value, `${node.id}: pitfall`));
  nonempty(node.check.question, `${node.id}: self-check question`);
  nonempty(node.check.answer, `${node.id}: self-check answer`);
  checkTex(node.formula, true, `${node.id}: featured formula`);

  const rendered = atlas.nodes.find((item) => item.id === node.id);
  assert.equal(rendered.formula, node.formula);
  assert.equal(rendered.nature.zh, formulaKinds[node.kind]);
  assert.deepEqual(rendered.lesson, {
    namespace: "physics-formulas",
    id: node.id,
    locale: "zh",
  });
  const modes = {};
  for (const mode of ["beginner", "formal"]) {
    modes[mode] = physicsLessonMarkdown(node, mode);
    checkLesson(modes[mode], node, `source/${node.id}/${mode}`);
  }
  assert.notEqual(
    modes.beginner,
    modes.formal,
    `${node.id}: distinct reading modes`,
  );
  authoredLessons.set(node.id, modes);
}

const assetDirectory = new URL(
  "../public/assets/physics-formulas/zh/",
  import.meta.url,
);
assert(
  existsSync(assetDirectory),
  "Formula lesson assets are missing; run node scripts/build-school-lessons.mjs before this check",
);
assert.deepEqual(
  readdirSync(assetDirectory)
    .filter((name) => name.endsWith(".json"))
    .sort(),
  expectedIds.map((id) => `${id}.json`).sort(),
  "Generated formula assets must contain exactly the 16 current topics",
);
for (const node of formulas) {
  const payload = JSON.parse(
    readFileSync(new URL(`${node.id}.json`, assetDirectory), "utf8"),
  );
  for (const mode of ["beginner", "formal"]) {
    assert.equal(
      payload[mode],
      authoredLessons.get(node.id)[mode],
      `${node.id}/${mode}: stale generated lesson`,
    );
    nonempty(payload.intro?.[mode], `${node.id}/${mode}: introduction`);
    assert(
      !payload.intro[mode].includes(node.check.answer),
      `${node.id}: answer leaked into introduction`,
    );
    checkMarkdown(payload.intro[mode], `intro/${node.id}/${mode}`);
    checkLesson(payload[mode], node, `asset/${node.id}/${mode}`);
  }
}

// The new detail map supplements the existing 21-topic high-school overview.
const legacy = getSubjectAtlas("physics", "high");
const expectedLegacyIds = [
  ...Array.from({ length: 5 }, (_, i) => `high-mechanics-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `high-conservation-${i + 1}`),
  ...Array.from({ length: 6 }, (_, i) => `high-fields-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `high-modern-${i + 1}`),
];
assert.deepEqual(
  legacy.nodes.map((node) => node.id),
  expectedLegacyIds,
);
const legacyIds = new Set(expectedLegacyIds);
const linkedDetails = new Set();
for (const node of atlas.nodes) assert.equal(node.href, legacy.href);
for (const [legacyId, detailIds] of Object.entries(legacyFormulaTopics)) {
  assert(legacyIds.has(legacyId), `Unknown legacy topic ${legacyId}`);
  assert.equal(new Set(detailIds).size, detailIds.length);
  for (const id of detailIds) {
    assert(ids.has(id), `${legacyId}: unknown formula detail ${id}`);
    linkedDetails.add(id);
  }
}
assert.deepEqual([...linkedDetails].sort(), [...ids].sort());
for (const node of legacy.nodes) {
  assert.deepEqual(node.lesson, {
    namespace: "school-lessons/physics",
    id: node.id,
    locale: "zh",
  });
  const file = new URL(
    `../public/assets/school-lessons/physics/zh/${node.id}.json`,
    import.meta.url,
  );
  assert(existsSync(file), `Missing original high-school lesson ${node.id}`);
  const payload = JSON.parse(readFileSync(file, "utf8"));
  for (const mode of ["beginner", "formal"]) {
    const parts = payload[mode].split("<!-- solutions -->");
    assert.equal(
      parts.length,
      2,
      `${node.id}/${mode}: original answer boundary lost`,
    );
    const body = parts[0];
    for (const id of legacyFormulaTopics[node.id] ?? [])
      assert(
        body.includes(`(${physicsFormulaHref}#${id})`),
        `${node.id}/${mode}: missing detail link ${id}`,
      );
    const firstDetail = legacyFormulaTopics[node.id]?.[0];
    if (firstDetail) {
      const detail = byId.get(firstDetail);
      for (const text of [
        ...detail.conditions,
        ...detail.steps.map((step) => step.explanation),
      ])
        assert(
          body.includes(text),
          `${node.id}/${mode}: inline derivation content lost`,
        );
    }
  }
}

for (const locale of ["zh", "en"]) {
  const points = layoutGraph(atlas.nodes, atlas.edges, locale, atlas.centers);
  assert.deepEqual(
    points,
    layoutGraph(atlas.nodes, atlas.edges, locale, atlas.centers),
  );
  points.forEach((point) =>
    assert(Number.isFinite(point.x) && Number.isFinite(point.y)),
  );
  const camera = fitCamera(points);
  assert(Object.values(camera).every(Number.isFinite));
  assert(camera.zoom > 0);
  const shown = visibleLabels(points, ids, null);
  const boxes = points.filter((point) => shown.has(point.id)).map(labelBox);
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i],
        b = boxes[j];
      assert(
        a.right <= b.left ||
          b.right <= a.left ||
          a.bottom <= b.top ||
          b.bottom <= a.top,
        `${locale}: overlapping formula overview labels`,
      );
    }
  for (const node of points)
    assert(visibleLabels(points, ids, node.id).has(node.id));
}

console.log(
  `Physics formula course verified: 16 dual-mode lessons, 24 typed relations, ${renderedFormulas} strict formula renderings, hidden self-check answers, and compatibility with all 21 original high-school topics.`,
);
