// Manual asset generation; requires Python 3 + fonttools. No font build at runtime.
// node scripts/subset-ai-map-font.mjs /path/to/LXGWWenKai-Regular.ttf
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { createJiti } from "jiti";

const source = process.argv[2];
if (!source)
  throw new Error("Pass the official LXGW WenKai v1.522 Regular TTF path.");
const sourcePath = resolve(source);
const expectedSha256 =
  "39ad71264b588165b469e35e6afb162a378dacd1f95348160240ba9038ac3009";
const actualSha256 = createHash("sha256")
  .update(readFileSync(sourcePath))
  .digest("hex");
if (actualSha256 !== expectedSha256) {
  throw new Error(`Unexpected source font SHA-256: ${actualSha256}`);
}

const jiti = createJiti(import.meta.url);
const { aiKnowledgeAtlas } = await jiti.import(
  "../src/data/ai-atlas/knowledge-atlas.ts",
);
const labels = aiKnowledgeAtlas.nodes.map((node) => {
  const label = node.shortLabel?.zh;
  if (!label) throw new Error(`Missing Chinese short label: ${node.id}`);
  return label;
});
if (!labels.length) throw new Error("The AI atlas contains no labels.");
const characters = [...new Set(labels.flatMap((label) => [...label]))]
  .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
  .join("");
const target = fileURLToPath(
  new URL("../public/fonts/ai-map/kai-labels.woff", import.meta.url),
);
mkdirSync(dirname(target), { recursive: true });

execFileSync(
  "python3",
  [
    "-c",
    `
import json
import sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

source, target, characters = sys.argv[1:]
font = TTFont(source, recalcTimestamp=False)
required = set(map(ord, characters))
missing = required - set(font.getBestCmap())
if missing:
    raise ValueError(f"Missing source characters: {''.join(map(chr, sorted(missing)))}")
options = subset.Options()
options.name_IDs = ['*']
options.name_languages = ['*']
options.name_legacy = True
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
# Subsetting creates a derivative: give it a distinct family and PostScript name.
# Keep copyright, authorship, version and license records from the original.
names = {1: 'AI Atlas Kai', 2: 'Regular', 3: 'AIAtlasKai-1.522-Labels',
         4: 'AI Atlas Kai Regular', 6: 'AIAtlasKai-Regular',
         16: 'AI Atlas Kai', 17: 'Regular', 18: 'AI Atlas Kai Regular',
         21: 'AI Atlas Kai', 22: 'Regular'}
for record in font['name'].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = 'woff'
font.save(target)

result = TTFont(target, recalcTimestamp=False)
cmap = result.getBestCmap()
missing = required - set(cmap)
if missing or any(cmap.get(code) == '.notdef' for code in required):
    raise ValueError('Generated font does not cover every label character.')
for record in result['name'].names:
    if record.nameID in names and record.toUnicode() != names[record.nameID]:
        raise ValueError('Generated font retained an unexpected family name.')
print(json.dumps({
    'uniqueCharacters': len(required),
    'mappedCodepoints': len(cmap),
    'bytes': Path(target).stat().st_size,
    'family': result['name'].getDebugName(1),
    'missingCharacters': 0,
}, ensure_ascii=False))
`,
    sourcePath,
    target,
    characters,
  ],
  { stdio: "inherit" },
);
console.log(
  `${labels.length} Chinese labels; ${[...characters].filter((character) => /\p{Script=Han}/u.test(character)).length} distinct Han characters; verified source SHA-256 ${actualSha256}`,
);
