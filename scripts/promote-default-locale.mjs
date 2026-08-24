import { cp, stat } from "node:fs/promises";
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

console.log("Promoted the Chinese static export from out/zh to out/.");
