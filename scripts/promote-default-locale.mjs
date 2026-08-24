import { cp, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const defaultLocaleDirectory = path.join(outputDirectory, "zh");

try {
  await stat(defaultLocaleDirectory);
} catch {
  throw new Error(
    "Static export is missing out/zh; cannot promote the default locale.",
  );
}

await cp(defaultLocaleDirectory, outputDirectory, {
  recursive: true,
  force: true,
});

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? collectHtmlFiles(entryPath)
        : entry.name.endsWith(".html")
          ? [entryPath]
          : [];
    }),
  );

  return files.flat();
}

const legacyHtmlFiles = await collectHtmlFiles(defaultLocaleDirectory);

for (const filePath of legacyHtmlFiles) {
  const relativePath = path.relative(defaultLocaleDirectory, filePath);
  if (relativePath === "404.html") continue;

  const canonicalPath = `/${relativePath
    .split(path.sep)
    .join("/")
    .replace(/index\.html$/, "")}`;
  const escapedPath = JSON.stringify(canonicalPath);
  const redirectHtml = `<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${canonicalPath}" />
    <link rel="canonical" href="${canonicalPath}" />
    <title>正在前往规范中文页面</title>
  </head>
  <body>
    <p>正在前往<a href="${canonicalPath}">规范中文页面</a>。</p>
    <script>window.location.replace(${escapedPath} + window.location.search + window.location.hash);</script>
  </body>
</html>
`;

  await writeFile(filePath, redirectHtml, "utf8");
}

console.log(
  `Promoted the Chinese static export from out/zh to out/ and canonicalized ${legacyHtmlFiles.length} legacy /zh pages.`,
);
