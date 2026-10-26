import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const shuowenRoot = fileURLToPath(new URL("../../", import.meta.url));
export const shuowenFontSourceSha256 =
  "39ad71264b588165b469e35e6afb162a378dacd1f95348160240ba9038ac3009";
export const shuowenFontLicenseSha256 =
  "c38b1994a5e48ac30ac7d1da7d0409fd8fd8127dfe28a13d6e787d5b1ef34a5e";

// The upstream font genuinely lacks these two glyphs. Keep these explicit;
// never map an unrelated outline to a rare character merely to pass coverage.
export const shuowenFontExceptions = {
  "𠂹": "U+200B9, the old form in 素's quotation; display a sourced glyph or a clearly labelled textual explanation.",
  "𣠮": "U+2382E, the headword for 無; a verified local glyph image is available in shuowenGlyphs.",
};

function sourceFiles(relative) {
  const directory = path.join(shuowenRoot, relative);
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) return sourceFiles(name);
    return /\.(?:ts|tsx)$/.test(name) ? [name] : [];
  });
}

export function collectShuowenFontCharacters() {
  const files = [
    ...sourceFiles("src/data/shuowen"),
    ...sourceFiles("src/components/shuowen"),
    ...sourceFiles("src/app/[locale]/learning/shuowen"),
  ].sort();
  const corpus = files
    .map((file) => readFileSync(path.join(shuowenRoot, file), "utf8"))
    .join("\n");
  // Collect the whole source corpus, including explanatory text and references,
  // so moving a string between JSX and a data record cannot remove coverage.
  const characters = [
    ...new Set([...corpus].filter((char) => !/\p{C}/u.test(char))),
  ]
    .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
    .join("");
  return { files, characters };
}
