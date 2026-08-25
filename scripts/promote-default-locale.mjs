import { cp, mkdir, rm, stat, writeFile } from "node:fs/promises";
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

await rm(defaultLocaleDirectory, { recursive: true, force: true });

await mkdir(defaultLocaleDirectory, { recursive: true });
await writeFile(
  path.join(defaultLocaleDirectory, "index.html"),
  `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=/" />
    <link rel="canonical" href="http://yeyaozhi.eu.cc/" />
    <title>正在前往中文主页</title>
    <script>window.location.replace("/" + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p><a href="/">前往中文主页</a></p>
  </body>
</html>
`,
  "utf8",
);

console.log(
  "Promoted Chinese to out/ and created a /zh/ compatibility redirect.",
);
