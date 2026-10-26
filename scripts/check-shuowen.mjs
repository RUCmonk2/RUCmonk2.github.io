import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { createJiti } from "jiti";
import sharp from "sharp";
import ts from "typescript";

import {
  collectShuowenFontCharacters,
  shuowenFontExceptions,
  shuowenFontLicenseSha256,
  shuowenFontSourceSha256,
  shuowenRoot,
} from "./lib/shuowen-font.mjs";

const jiti = createJiti(import.meta.url);
const {
  shuowenCharacters: entries,
  shuowenRoutes: routes,
  themes,
  artworkNames,
  artworkByTheme,
  imageForCharacter,
} = await jiti.import("../src/data/shuowen/index.ts");
const { shuowenEdges: edges } = await jiti.import(
  "../src/data/shuowen/relations.ts",
);
const { shuowenGlyphs: glyphs, shuowenArchives: archives } = await jiti.import(
  "../src/data/shuowen/glyphs.ts",
);
const { createCharacterLayout, MAP_WIDTH, MAP_HEIGHT } = await jiti.import(
  "../src/components/shuowen/layout.ts",
);
const selectedCharacters =
  "道德玄妙常无有一名天地人水谷气阴阳中虚静清素朴柔弱和宁反复归根本生死化始心知明观言忘真神精为用守止足损益盈冲善慈俭敢欲争自然游逍遥齐物梦蝶叶耀之";
const ids = new Set(entries.map((entry) => entry.id));
const byChar = new Map(entries.map((entry) => [entry.char, entry]));
const failures = [];
const completed = [];
async function verify(label, run) {
  try {
    await run();
    completed.push(label);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}
function nonempty(value, label) {
  assert.equal(typeof value, "string", `${label} must be text`);
  assert(value.trim().length > 0, `${label} must not be empty`);
}
function https(value, label) {
  const url = new URL(value);
  assert.equal(url.protocol, "https:", `${label} must use HTTPS`);
  assert(url.hostname.includes("."), `${label} needs a public source hostname`);
  assert(
    !url.username && !url.password,
    `${label} must not contain credentials`,
  );
}
function assetPath(src) {
  assert(src.startsWith("/images/shuowen/"), `Unexpected image path: ${src}`);
  assert(!src.includes(".."), `Image path traversal: ${src}`);
  return path.join(shuowenRoot, "public", src);
}
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

await verify("72 selected characters and complete reading records", () => {
  assert.equal(entries.length, 72);
  assert.equal(ids.size, 72, "Shared-link IDs must be unique");
  assert.equal(
    byChar.size,
    72,
    "Do not count an alternate glyph as a second entry",
  );
  assert.deepEqual(new Set(byChar.keys()), new Set([...selectedCharacters]));
  assert.deepEqual(
    ["叶", "耀", "之"].map((c) => byChar.get(c)?.id),
    ["ye", "yao", "zhi"],
  );
  const themeIds = new Set(themes.map((theme) => theme.id));
  assert.equal(themeIds.size, 9);
  for (const entry of entries) {
    assert.match(entry.id, /^[a-z][a-z0-9-]*$/);
    assert(themeIds.has(entry.theme), `${entry.id}: unknown theme`);
    for (const field of [
      "char",
      "traditional",
      "pinyin",
      "subtitle",
      "radical",
      "formation",
      "reflection",
      "caution",
    ])
      nonempty(entry[field], `${entry.id}.${field}`);
    assert.equal([...entry.char].length, 1);
    assert(Array.isArray(entry.aliases));
    assert.equal(
      new Set(entry.aliases).size,
      entry.aliases.length,
      `${entry.id}: repeated alias`,
    );
    assert(["recorded", "related"].includes(entry.shuowen.status));
    for (const field of ["headword", "original", "explanation"])
      nonempty(entry.shuowen[field], `${entry.id}.shuowen.${field}`);
    https(entry.shuowen.sourceUrl, `${entry.id} dictionary source`);
    assert(entry.passages.length > 0, `${entry.id} needs an original passage`);
    for (const passage of entry.passages) {
      for (const field of ["work", "chapter", "quote", "explanation"])
        nonempty(passage[field], `${entry.id}.passage.${field}`);
      https(passage.sourceUrl, `${entry.id} passage source`);
    }
    for (const part of entry.components) {
      nonempty(part.char, `${entry.id} component`);
      nonempty(part.explanation, `${entry.id} component explanation`);
      assert(["形旁", "声旁", "构件"].includes(part.role));
    }
    assert(entry.sources.length > 0);
    for (const source of entry.sources) {
      nonempty(source.label, `${entry.id} reference label`);
      https(source.url, `${entry.id} reference`);
    }
  }
});

await verify(
  "historical headwords are not confused with modern entry characters",
  () => {
    const cases = {
      妙: ["玅", "related"],
      耀: ["燿", "related"],
      宁: ["寍", "related"],
      蝶: ["蜨", "related"],
      无: ["𣠮", "recorded"],
      明: ["朙", "recorded"],
      气: ["气", "recorded"],
      叶: ["葉", "recorded"],
      朴: ["樸", "recorded"],
      游: ["游", "recorded"],
    };
    for (const [char, expected] of Object.entries(cases)) {
      const entry = byChar.get(char);
      assert.deepEqual(
        [entry.shuowen.headword, entry.shuowen.status],
        expected,
        `${char}: incorrect headword/status`,
      );
    }
    for (const char of ["逍", "遥"])
      assert(
        JSON.stringify(byChar.get(char)).includes("新附"),
        `${char}: distinguish the later supplement`,
      );
    assert(byChar.get("气").shuowen.original.includes("雲气"));
    assert(byChar.get("朴").traditional.includes("樸"));
  },
);

await verify(
  "all authored relations survive resolution with valid endpoints",
  async () => {
    const filename = path.join(shuowenRoot, "src/data/shuowen/relations.ts");
    const syntax = ts.createSourceFile(
      filename,
      await readFile(filename, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const rawRelations = [];
    function visit(node) {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        ["textual", "contrasts", "readings"].includes(node.name.text)
      ) {
        assert(
          node.initializer && ts.isArrayLiteralExpression(node.initializer),
        );
        for (const row of node.initializer.elements) {
          assert(
            ts.isArrayLiteralExpression(row),
            "Relations must remain inspectable tuples",
          );
          const [from, to] = row.elements;
          assert(ts.isStringLiteralLike(from) && ts.isStringLiteralLike(to));
          rawRelations.push([from.text, to.text]);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(syntax);
    assert(
      rawRelations.length > 0,
      "No authored relation corpus was inspected",
    );
    for (const [from, to] of rawRelations)
      assert(
        byChar.has(from) && byChar.has(to),
        `Unresolved authored relation: ${from} → ${to}; do not silently filter it`,
      );
    assert.equal(
      edges.length,
      rawRelations.length,
      "The resolver dropped an authored relation",
    );
    const uniqueIds = new Set(),
      uniqueEdges = new Set();
    for (const edge of edges) {
      assert(
        ids.has(edge.source) && ids.has(edge.target),
        `Dangling edge: ${edge.id}`,
      );
      assert.notEqual(edge.source, edge.target, `${edge.id}: self edge`);
      assert(!uniqueIds.has(edge.id), `Duplicate edge ID: ${edge.id}`);
      uniqueIds.add(edge.id);
      const key = `${edge.source}:${edge.target}:${edge.type}:${edge.label}`;
      assert(!uniqueEdges.has(key), `Duplicate relation: ${key}`);
      uniqueEdges.add(key);
      assert(["text", "contrast", "reading"].includes(edge.type));
      nonempty(edge.label, `${edge.id} label`);
      nonempty(edge.explanation, `${edge.id} evidence`);
      if (edge.type === "text")
        assert(
          edge.sourceUrl,
          `${edge.id}: textual relationship needs a source`,
        );
      if (edge.sourceUrl) https(edge.sourceUrl, `${edge.id} source`);
    }
    for (const entry of entries)
      assert(
        edges.some(
          (edge) => edge.source === entry.id || edge.target === entry.id,
        ),
        `${entry.char}: isolated entry`,
      );
  },
);

await verify("six usable guided reading routes", () => {
  assert.equal(routes.length, 6);
  assert.equal(new Set(routes.map((route) => route.id)).size, 6);
  for (const route of routes) {
    nonempty(route.title, `${route.id} title`);
    nonempty(route.description, `${route.id} description`);
    assert(route.nodes.length >= 3);
    assert.equal(new Set(route.nodes).size, route.nodes.length);
    for (const id of route.nodes)
      assert(ids.has(id), `${route.id}: missing entry ${id}`);
    assert(
      artworkNames[route.image],
      `${route.id}: unknown route illustration`,
    );
  }
  assert.deepEqual(routes.find((route) => route.id === "name")?.nodes, [
    "ye",
    "yao",
    "zhi",
  ]);
});

await verify("75 documented glyph images and original book pages", async () => {
  assert.deepEqual(
    new Set(Object.keys(glyphs)),
    new Set([...selectedCharacters]),
  );
  assert.equal(Object.values(glyphs).flat().length, 75);
  const provenance = JSON.parse(
    await readFile(
      path.join(shuowenRoot, "public/images/shuowen/glyphs/sources.json"),
      "utf8",
    ),
  );
  assert.deepEqual(provenance.missing, []);
  const imageSources = new Set();
  for (const [char, items] of Object.entries(glyphs)) {
    assert(items.length > 0, `${char}: no verified glyph`);
    for (const item of items) {
      for (const field of ["char", "period", "caption", "license", "credit"])
        nonempty(item[field], `${char}.${field}`);
      https(item.sourceUrl, `${char} glyph source`);
      const filename = assetPath(item.src),
        bytes = await readFile(filename);
      const record = provenance.sources[path.basename(filename)];
      assert(record, `${item.src}: missing provenance`);
      assert.equal(
        sha256(bytes),
        record.localSha256,
        `${item.src}: provenance hash mismatch`,
      );
      assert.equal(
        record.glyphChar,
        item.char,
        `${char}: glyph identity mismatch`,
      );
      assert(
        !imageSources.has(item.src),
        `Unintentionally reused glyph image: ${item.src}`,
      );
      imageSources.add(item.src);
      const dimensions = await sharp(bytes).metadata();
      assert(
        dimensions.width >= 100 && dimensions.height >= 100,
        `${char}: unreadable glyph dimensions`,
      );
      if (filename.endsWith(".svg")) {
        const svg = bytes.toString("utf8");
        assert(
          !/<(?:script|foreignObject)\b/i.test(svg),
          `${char}: active SVG content`,
        );
        assert(
          !/\s(?:xlink:)?href\s*=\s*["'](?:https?:|data:|javascript:)/i.test(
            svg,
          ),
          `${char}: external SVG dependency`,
        );
      }
    }
  }
  assert(glyphs["叶"].some((item) => item.char === "葉"));
  assert(
    glyphs["耀"].some(
      (item) => item.char === "燿" && item.caption.includes("关联"),
    ),
  );
  assert(glyphs["之"].some((item) => item.char === "之"));
  for (const [char, items] of Object.entries(archives)) {
    assert(byChar.has(char));
    for (const item of items) {
      for (const field of ["title", "caption", "credit", "license"])
        nonempty(item[field], `${char} archive ${field}`);
      https(item.sourceUrl, `${char} archive source`);
      const filename = assetPath(item.src),
        bytes = await readFile(filename);
      const record = provenance.sources[`archives/${path.basename(filename)}`];
      assert(
        record && record.pdfPage > 0,
        `${char}: archive lacks a page locator`,
      );
      assert.equal(sha256(bytes), record.localSha256);
      const dimensions = await sharp(bytes).metadata();
      assert(dimensions.width >= 1000 && dimensions.height >= 1000);
    }
  }
});

await verify("deterministic, immutable and readable graph layout", () => {
  const before = JSON.stringify(entries);
  const one = createCharacterLayout(entries),
    two = createCharacterLayout(entries);
  try {
    assert.deepEqual(
      one.initial,
      two.initial,
      "Shared links must open with the same layout",
    );
    assert.equal(
      JSON.stringify(entries),
      before,
      "The layout mutated source text",
    );
    assert.deepEqual(new Set(Object.keys(one.initial)), ids);
    for (const [index, entry] of entries.entries()) {
      const position = one.initial[entry.id];
      assert(Number.isFinite(position.x) && Number.isFinite(position.y));
      // Includes the node's 29-unit halo and the selected reading caption.
      assert(position.x >= 29 && position.x + 29 <= MAP_WIDTH);
      assert(
        position.y >= 29 && position.y + 52 <= MAP_HEIGHT,
        `${entry.char}: selected caption extends below the ${MAP_HEIGHT}-unit canvas (node y=${position.y})`,
      );
      for (const other of entries.slice(index + 1)) {
        const point = one.initial[other.id];
        assert(
          Math.hypot(position.x - point.x, position.y - point.y) >= 64,
          `${entry.char}/${other.char}: glyph nodes overlap or are too close to distinguish`,
        );
      }
    }
    const dragged = one.byId.get(entries[0].id);
    Object.assign(dragged, { x: 500, y: 500, fx: 500, fy: 500 });
    assert.deepEqual(
      one.reset(),
      one.initial,
      "Reset should recover the original readable layout",
    );
    assert.equal(dragged.fx, null);
    assert.equal(dragged.fy, null);
  } finally {
    one.simulation.stop();
    two.simulation.stop();
  }
});

await verify(
  "local renamed font and explicit rare-character coverage",
  async () => {
    const folder = path.join(shuowenRoot, "public/fonts/shuowen");
    const metadata = JSON.parse(
      await readFile(path.join(folder, "metadata.json"), "utf8"),
    );
    const fontPath = path.join(folder, "characters.woff2");
    assert.equal(metadata.family, "Shuowen Kai");
    assert.equal(metadata.upstreamSha256, shuowenFontSourceSha256);
    assert.equal(sha256(await readFile(fontPath)), metadata.sha256);
    assert.equal(
      sha256(await readFile(path.join(folder, "OFL.txt"))),
      shuowenFontLicenseSha256,
    );
    assert.deepEqual(metadata.exceptions, shuowenFontExceptions);
    const { characters } = collectShuowenFontCharacters();
    const check = JSON.parse(
      execFileSync(
        "python3",
        [
          "-c",
          `
import json, sys
from fontTools.ttLib import TTFont
font = TTFont(sys.argv[1])
required = set(map(ord, sys.argv[2]))
cmap = font.getBestCmap()
missing = required - set(cmap)
bad = [cp for cp in required & set(cmap) if cmap[cp] == '.notdef']
names = {1:'Shuowen Kai', 4:'Shuowen Kai Regular', 6:'ShuowenKai-Regular', 16:'Shuowen Kai'}
for record in font['name'].names:
    if record.nameID in names and record.toUnicode() != names[record.nameID]:
        raise ValueError('Unexpected family identity in generated font')
print(json.dumps({'missing':list(map(chr,sorted(missing))), 'bad':bad, 'covered':len(required-missing)},ensure_ascii=False))
`,
          fontPath,
          characters,
        ],
        { encoding: "utf8" },
      ),
    );
    assert.deepEqual(check.bad, []);
    const expectedMissing = [...characters].filter(
      (char) => char in shuowenFontExceptions,
    );
    assert.deepEqual(
      check.missing,
      expectedMissing,
      "New uncovered glyphs: regenerate the font, do not silently rely on system fonts",
    );
    assert.equal(
      check.covered,
      metadata.coveredCharacters,
      "The text corpus changed; regenerate the documented subset",
    );
    assert(
      ![...selectedCharacters].some((char) => check.missing.includes(char)),
      "Every graph label must render locally",
    );
  },
);

await verify(
  "12 distinct original illustrations and all image references",
  async () => {
    const expected = [
      "dao",
      "water",
      "valley",
      "stillness",
      "return",
      "mirror",
      "vessel",
      "bamboo",
      "butterfly",
      "leaf",
      "light",
      "journey",
    ];
    assert.deepEqual(new Set(Object.keys(artworkNames)), new Set(expected));
    for (const id of Object.values(artworkByTheme))
      assert(expected.includes(id));
    for (const entry of entries)
      assert(expected.includes(imageForCharacter(entry.id, entry.theme)));
    const directory = path.join(shuowenRoot, "public/images/shuowen/art");
    const actual = (await readdir(directory))
      .filter((name) => name.endsWith(".webp"))
      .map((name) => name.slice(0, -5));
    assert.deepEqual(new Set(actual), new Set(expected));
    const hashes = new Set();
    for (const id of expected) {
      const bytes = await readFile(path.join(directory, `${id}.webp`));
      const hash = sha256(bytes);
      assert(!hashes.has(hash), `${id}: illustration duplicates another scene`);
      hashes.add(hash);
      const image = await sharp(bytes).metadata();
      assert.equal(image.format, "webp");
      assert(
        image.width >= 640 && image.height >= 400,
        `${id}: illustration is too small`,
      );
    }
  },
);

if (failures.length)
  throw new Error(
    `Shuowen validation failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`,
  );
console.log(
  `Shuowen: 72 complete entries, ${edges.length} evidenced relations, 6 routes, 75 glyph images, 12 original illustrations; ${completed.length} validation groups passed. Font excludes only the two documented rare characters, which require the explicit UI fallback.`,
);
