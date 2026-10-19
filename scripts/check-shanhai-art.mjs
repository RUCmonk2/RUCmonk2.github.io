import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { createJiti } from "jiti";
import sharp from "sharp";

const jiti = createJiti(import.meta.url);
const { shanhaiNodes } = await jiti.import("../src/data/shanhai.ts");
const { shanhaiArtwork } = await jiti.import("../src/data/shanhai-art.ts");
const { shanhaiArchives } = await jiti.import(
  "../src/data/shanhai-archives.ts",
);
const nodeIds = new Set(shanhaiNodes.map((node) => node.id));
assert.deepEqual(
  new Set(Object.keys(shanhaiArtwork)),
  nodeIds,
  "Every node needs its own illustration metadata",
);
const prompts = JSON.parse(
  await readFile("public/images/shanhai/atlas/prompts.json", "utf8"),
);
assert.deepEqual(
  new Set(Object.keys(prompts.entries)),
  nodeIds,
  "Keep generation provenance for every illustration",
);
const hashes = new Set();
let totalBytes = 0;
for (const node of shanhaiNodes) {
  const artwork = shanhaiArtwork[node.id];
  for (const field of ["src", "alt", "basis", "interpretation"])
    assert(artwork[field]?.trim(), `${node.id}: missing ${field}`);
  assert(
    artwork.alt.includes(node.name),
    `${node.id}: accessible image description should identify its entry`,
  );
  const full = path.join("public", artwork.src);
  const thumb = `public/images/shanhai/atlas/thumbs/${node.id}.webp`;
  const [data, fullMeta, thumbMeta] = await Promise.all([
    readFile(full),
    sharp(full).metadata(),
    sharp(thumb).metadata(),
  ]);
  const hash = createHash("sha256").update(data).digest("hex");
  assert(!hashes.has(hash), `${node.id}: illustration duplicates another node`);
  hashes.add(hash);
  assert.equal(fullMeta.format, "webp");
  assert(
    fullMeta.width >= 800 && fullMeta.height >= 800,
    `${node.id}: full illustration too small`,
  );
  assert.equal(thumbMeta.format, "webp");
  assert(
    thumbMeta.width <= 320 && thumbMeta.height <= 320,
    `${node.id}: thumbnail unexpectedly large`,
  );
  totalBytes += data.length;
}
const archivePaths = new Set();
for (const [id, archives] of Object.entries(shanhaiArchives)) {
  assert(nodeIds.has(id), `Archive refers to missing node: ${id}`);
  for (const archive of archives) {
    for (const field of ["id", "title", "src", "sourceUrl", "credit", "note"])
      assert(archive[field]?.trim(), `${id}: incomplete archive ${field}`);
    assert.equal(new URL(archive.sourceUrl).hostname, "dl.ndl.go.jp");
    assert.equal(new URL(archive.sourceUrl).protocol, "https:");
    if (archivePaths.has(archive.src)) continue;
    archivePaths.add(archive.src);
    const meta = await sharp(path.join("public", archive.src)).metadata();
    assert(meta.width && meta.height, `Unreadable archive: ${archive.src}`);
  }
}
console.log(
  `Shanhaijing art: ${hashes.size} unique full images and thumbnails, ${Object.keys(shanhaiArchives).length} archive mappings using ${archivePaths.size} documented scans; ${(totalBytes / 1024 / 1024).toFixed(1)} MiB of main artwork.`,
);
