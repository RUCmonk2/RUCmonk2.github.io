import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { createJiti } from "jiti";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

const jiti = createJiti(import.meta.url);
const { k12Topics, k12Routes, k12Atlases, k12Domains } = await jiti.import(
  "../src/data/k12/index.ts",
);
const { layoutGraph, fitCamera, visibleLabels, labelBox } = await jiti.import(
  "../src/components/math-map/layout.ts",
);
const ids = new Map(k12Topics.map((t) => [t.id, t]));
assert.equal(ids.size, k12Topics.length, "Unique topic IDs");
assert.equal(
  k12Topics.length,
  199,
  "The release covers all 199 planned topics",
);
const active = new Set(),
  visited = new Set();
function dependencies(id) {
  assert(ids.has(id), "Unknown prerequisite: " + id);
  assert(!active.has(id), "Prerequisite cycle: " + [...active, id].join(" → "));
  if (visited.has(id)) return;
  active.add(id);
  const t = ids.get(id);
  assert(k12Domains[t.domain], "Unknown domain: " + t.domain);
  assert.equal(
    new Set(t.prerequisites).size,
    t.prerequisites.length,
    id + ": duplicate prerequisites",
  );
  for (const before of t.prerequisites) dependencies(before);
  active.delete(id);
  visited.add(id);
}
k12Topics.forEach((t) => dependencies(t.id));
for (const route of k12Routes) {
  assert.equal(new Set(route.nodes).size, route.nodes.length, route.id);
  route.nodes.forEach((id) =>
    assert(ids.has(id), route.id + ": invalid stop " + id),
  );
}
for (const atlas of k12Atlases) {
  const local = new Set(atlas.nodes.map((n) => n.id));
  assert(local.has(atlas.defaultNode), "Default selection exists");
  atlas.nodes.forEach((n) => {
    assert.equal(n.lesson.id, n.id);
    assert(
      atlas.centers[n.domain],
      "A layout center is required for " + n.domain,
    );
  });
  const points = layoutGraph(atlas.nodes, atlas.edges, "zh", atlas.centers);
  assert.deepEqual(
    points,
    layoutGraph(atlas.nodes, atlas.edges, "zh", atlas.centers),
    "Deterministic stage layout",
  );
  assert(fitCamera(points).zoom > 0);
  points.forEach((p) => assert(Number.isFinite(p.x) && Number.isFinite(p.y)));
  const shown = visibleLabels(points, local, null);
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
        atlas.id + ": overlapping visible labels",
      );
    }
  atlas.edges.forEach((e) =>
    assert(
      local.has(e.source) && local.has(e.target),
      "Graph edges stay inside their stage",
    ),
  );
}

// A deliberately small, non-evaluating arithmetic parser checks numeric equalities
// in the ACTUAL Markdown. Unsupported symbolic LaTeX is skipped, never guessed.
function numeric(source) {
  if (/\d\\(?:d?frac)/.test(source)) return null; // Mixed numerals have addition semantics, unlike implicit multiplication.
  let s = source
    .replace(/\\(?:left|right)/g, "")
    .replace(/\\[,!; ]/g, "")
    .trim();
  for (let i = 0; i < 10; i++) {
    const next = s
      .replace(/\\(?:d?frac)\{([^{}]+)\}\{([^{}]+)\}/g, "(($1)/($2))")
      .replace(/\\frac(\d)(\d)/g, "($1/$2)")
      .replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)")
      .replace(/\\sqrt(\d)/g, "sqrt($1)")
      .replace(/\^\{([^{}]+)\}/g, "^($1)");
    if (next === s) break;
    s = next;
  }
  s = s
    .replace(/\\(?:times|cdot)/g, "*")
    .replace(/\\div/g, "/")
    .replace(/\\pi/g, "pi")
    .replace(/\s/g, "");
  if (!s || /[^0-9.+\-*/^()pisqrt]/.test(s)) return null;
  const tokens = s.match(/\d+(?:\.\d+)?|sqrt|pi|[()+\-*/^]/g) ?? [];
  if (tokens.join("") !== s) return null;
  let i = 0;
  const peek = () => tokens[i];
  const atom = () => {
    const t = tokens[i++];
    if (t === "(") {
      const v = expression();
      if (tokens[i++] !== ")") throw Error();
      return v;
    }
    if (t === "sqrt") return Math.sqrt(atom());
    if (t === "pi") return Math.PI;
    if (!/^\d/.test(t ?? "")) throw Error();
    return Number(t);
  };
  const power = () => {
    const v = atom();
    return peek() === "^" ? (i++, v ** unary()) : v;
  };
  const unary = () =>
    peek() === "+"
      ? (i++, unary())
      : peek() === "-"
        ? (i++, -unary())
        : power();
  const product = () => {
    let v = unary();
    while (
      peek() === "*" ||
      peek() === "/" ||
      /^(\d|\(|sqrt|pi)/.test(peek() ?? "")
    ) {
      const op = peek();
      if (op === "*" || op === "/") i++;
      const next = unary();
      v = op === "/" ? v / next : v * next;
    }
    return v;
  };
  const expression = () => {
    let v = product();
    while (peek() === "+" || peek() === "-") {
      const op = tokens[i++];
      const b = product();
      v = op === "+" ? v + b : v - b;
    }
    return v;
  };
  try {
    const v = expression();
    return i === tokens.length && Number.isFinite(v) && Math.abs(v) < 1e12
      ? v
      : null;
  } catch {
    return null;
  }
}
assert.equal(numeric("-2^2"), -4);
assert.equal(numeric("2\\sqrt{9}"), 6);
assert.equal(numeric("\\frac{1+2}{3}"), 1);
assert.equal(numeric("x^2"), null);
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
let equalities = 0,
  figures = 0,
  links = 0;
const arithmeticFailures = [];
for (const topic of k12Topics) {
  const source = readFileSync(
    path.join("content/k12", topic.stage, topic.id + ".md"),
    "utf8",
  );
  const tree = parser.parse(source);
  const fail = (reason) => topic.id + ": " + reason;
  function visit(node) {
    if (node.type === "table") {
      const width = node.children[0].children.length;
      for (const row of node.children)
        assert.equal(row.children.length, width, fail("Broken Markdown table"));
    }
    if (node.type === "text") {
      assert(
        !node.value.includes("$"),
        fail("Unparsed math delimiter: " + node.value),
      );
      assert(
        !/？(?:正确|此处应|应为)|为了例子明确/.test(node.value),
        fail("Draft correction left in prose"),
      );
    }
    if (node.type === "image") {
      assert(node.alt.length > 10, fail("A diagram needs an explanation"));
      assert(
        node.url.startsWith("/images/k12/"),
        fail("Diagrams are locally served"),
      );
      assert(
        existsSync(path.join("public", node.url)),
        fail("Missing diagram " + node.url),
      );
      figures++;
    }
    if (node.type === "link" && node.url.startsWith("/learning/k12/lesson/")) {
      assert(
        ids.has(node.url.split("/").pop()),
        fail("Unknown lesson link " + node.url),
      );
      links++;
    }
    if (["math", "inlineMath"].includes(node.type)) {
      // Split independent clauses; compare adjacent numeric expressions in equality chains.
      for (const clause of node.value.split(/\\(?:qquad|quad)|[,;]/)) {
        const parts = clause.split("=");
        for (let i = 1; i < parts.length; i++) {
          const a = numeric(parts[i - 1]),
            b = numeric(parts[i]);
          if (a === null || b === null) continue;
          const counterexamples = {
            addition: ["20-6=14+4=18", "不能写成"],
            "operation-laws": ["6(10+3)=60+3", "指出错误"],
            estimation: ["198=200", "不能写成"],
            "equivalent-fractions": [
              String.raw`\frac{2+4}{3+4}=\frac23`,
              "不属于基本性质",
            ],
            "linear-equations": ["1=2", "没有解"],
            "conic-lines": ["0=1", "无交点"],
          };
          const counterexample = counterexamples[topic.id];
          if (
            counterexample?.[0] === clause &&
            source.includes(counterexample[1])
          )
            continue;
          if (
            topic.id === "linear-equations" &&
            clause === "3=5" &&
            source.includes("都无法成立")
          )
            continue;
          if (Math.abs(a - b) > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)))
            arithmeticFailures.push(
              fail("Numeric equality: " + clause + " → " + a + " != " + b),
            );
          equalities++;
        }
      }
    }
    node.children?.forEach(visit);
  }
  visit(tree);
  const payload = JSON.parse(
    readFileSync("public/assets/k12-lessons/zh/" + topic.id + ".json", "utf8"),
  );
  for (const mode of ["beginner", "formal"]) {
    for (const id of topic.prerequisites)
      assert(
        payload[mode].includes("/learning/k12/lesson/" + id),
        fail("Missing prerequisite in " + mode),
      );
  }
}
assert.deepEqual(
  arithmeticFailures,
  [],
  "Numeric equalities in worked examples",
);
assert(equalities > 150, "Numeric examples must actually be checked");
assert(figures >= 30, "Geometry and function explanations include figures");
console.log(
  `K12 verified: ${ids.size} complete lessons, acyclic prerequisites, 8 valid routes, ${equalities} numeric equalities, ${figures} illustrated lessons and ${links} authored lesson links.`,
);
