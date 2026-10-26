// Manual generation only: node scripts/subset-shuowen-font.mjs official.ttf
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  collectShuowenFontCharacters,
  shuowenFontExceptions,
  shuowenFontLicenseSha256,
  shuowenFontSourceSha256,
  shuowenRoot,
} from "./lib/shuowen-font.mjs";

const source = process.argv[2];
if (!source)
  throw new Error("Pass the official LXGW WenKai v1.522 Regular TTF.");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
if (hash(readFileSync(source)) !== shuowenFontSourceSha256)
  throw new Error(
    "The supplied font does not match the verified upstream release.",
  );
const originalLicense = path.join(shuowenRoot, "public/fonts/ai-map/OFL.txt");
if (hash(readFileSync(originalLicense)) !== shuowenFontLicenseSha256)
  throw new Error(
    "The complete original OFL notice has changed; verify upstream.",
  );

const { files, characters } = collectShuowenFontCharacters();
const folder = path.join(shuowenRoot, "public/fonts/shuowen");
const output = path.join(folder, "characters.woff2");
mkdirSync(folder, { recursive: true });
const result = JSON.parse(
  execFileSync(
    "python3",
    [
      "-c",
      `
import json, sys
from pathlib import Path
from fontTools import subset, __version__
from fontTools.ttLib import TTFont

source, target, text, exceptions = sys.argv[1:]
font = TTFont(source, recalcTimestamp=False)
required = set(map(ord, text))
available = set(font.getBestCmap())
missing = required - available
expected_missing = set(map(ord, json.loads(exceptions))) & required
if missing != expected_missing:
    raise ValueError('Unexpected upstream coverage: ' + ''.join(map(chr, sorted(missing))))
options = subset.Options()
options.name_IDs = ['*']
options.name_languages = ['*']
options.name_legacy = True
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=required - missing)
subsetter.subset(font)
names = {1: 'Shuowen Kai', 2: 'Regular', 3: 'ShuowenKai-1.522-Subset',
         4: 'Shuowen Kai Regular', 6: 'ShuowenKai-Regular',
         16: 'Shuowen Kai', 17: 'Regular', 18: 'Shuowen Kai Regular',
         21: 'Shuowen Kai', 22: 'Regular'}
for record in font['name'].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = 'woff2'
font.save(target)
result = TTFont(target, recalcTimestamp=False)
cmap = result.getBestCmap()
if required - missing - set(cmap):
    raise ValueError('The generated subset lost required characters.')
if any(cmap.get(cp) == '.notdef' for cp in required - missing):
    raise ValueError('A required code point maps to .notdef.')
for record in result['name'].names:
    if record.nameID in names and record.toUnicode() != names[record.nameID]:
        raise ValueError('A derivative family record was not renamed.')
print(json.dumps({'requiredCharacters': len(required), 'coveredCharacters': len(required-missing),
 'mappedCodepoints': len(cmap), 'missingCharacters': list(map(chr, sorted(missing))),
 'bytes': Path(target).stat().st_size, 'fontToolsVersion': __version__}, ensure_ascii=False))
`,
      path.resolve(source),
      output,
      characters,
      JSON.stringify(Object.keys(shuowenFontExceptions)),
    ],
    { encoding: "utf8" },
  ),
);
copyFileSync(originalLicense, path.join(folder, "OFL.txt"));
const manifest = {
  family: "Shuowen Kai",
  postscriptName: "ShuowenKai-Regular",
  upstream: "LXGW WenKai Regular 1.522",
  upstreamUrl:
    "https://github.com/lxgw/LxgwWenKai/releases/download/v1.522/LXGWWenKai-Regular.ttf",
  upstreamSha256: shuowenFontSourceSha256,
  license: "SIL Open Font License 1.1",
  licenseUrl:
    "https://raw.githubusercontent.com/lxgw/LxgwWenKai/v1.522/OFL.txt",
  licenseSha256: shuowenFontLicenseSha256,
  sha256: hash(readFileSync(output)),
  changes:
    "Subset and rename only; retained glyph outlines are unchanged. No invented glyphs.",
  ...result,
  exceptions: shuowenFontExceptions,
  sourceFiles: files,
};
writeFileSync(
  path.join(folder, "metadata.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(JSON.stringify(manifest, null, 2));
