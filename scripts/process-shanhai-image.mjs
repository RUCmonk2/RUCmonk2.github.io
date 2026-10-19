import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import sharp from "sharp";

const [source, id] = process.argv.slice(2);
if (!source || !/^[a-z][a-z0-9-]*$/.test(id || ""))
  throw new Error(
    "Usage: node scripts/process-shanhai-image.mjs <source-image> <entry-id>",
  );
const root = process.cwd();
const images = path.join(root, "public/images/shanhai/atlas");
const originals = path.join(root, "output/shanhai/originals");
await mkdir(path.join(images, "thumbs"), { recursive: true });
await mkdir(originals, { recursive: true });
await copyFile(source, path.join(originals, `${id}.png`));
await sharp(source)
  .resize({
    width: 1254,
    height: 1254,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: 88 })
  .toFile(path.join(images, `${id}.webp`));
await sharp(source)
  .resize({ width: 320, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(path.join(images, "thumbs", `${id}.webp`));
console.log(`Saved ${id}: original, WebP, and thumbnail`);
