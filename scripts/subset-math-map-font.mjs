// Manual asset generation; requires Python 3 + fonttools. No font build at runtime.
// node scripts/subset-math-map-font.mjs /path/to/LXGWWenKai-Regular.ttf
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import process from "node:process";

import { createJiti } from "jiti";

const source = process.argv[2];
if (!source) throw new Error("Pass the official LXGW WenKai Regular TTF path.");
const jiti = createJiti(import.meta.url);
const { mathMapNodes, mathMapLabel } = await jiti.import(
  "../src/data/math-map.ts",
);
const characters = [
  ...new Set(mathMapNodes.flatMap((n) => [...mathMapLabel(n, "zh")])),
]
  .sort()
  .join("");

execFileSync(
  "python3",
  [
    "-c",
    `
import sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

source, target, characters = sys.argv[1:]
font = TTFont(source)
missing = set(map(ord, characters)) - set(font.getBestCmap())
if missing:
    raise ValueError(f"Missing characters: {''.join(map(chr, sorted(missing)))}")
options = subset.Options()
options.name_IDs = ['*']
options.name_languages = ['*']
options.name_legacy = True
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
# Subsetting creates a derivative. Do not use the source's reserved family name.
names = {1: 'Atlas Kai', 2: 'Regular', 3: 'AtlasKai-1.522-Labels',
         4: 'Atlas Kai Regular', 6: 'AtlasKai-Regular',
         16: 'Atlas Kai', 17: 'Regular', 18: 'Atlas Kai Regular',
         21: 'Atlas Kai', 22: 'Regular'}
for record in font['name'].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = 'woff'
font.save(target)
print(f"{len(set(characters))} characters → {Path(target).stat().st_size:,} bytes")
`,
    resolve(source),
    resolve("public/fonts/math-map/kai-labels.woff"),
    characters,
  ],
  { stdio: "inherit" },
);
