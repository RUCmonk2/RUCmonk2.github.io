import assert from "node:assert/strict";
import path from "node:path";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { createBlogSource, blogSource, postUpdatedDate } = await jiti.import(
  "../src/lib/blog-source.ts",
);
const source = createBlogSource(path.resolve("tests/fixtures/blog"));
assert.deepEqual(
  source
    .list("zh")
    .map((post) => post.slug)
    .sort(),
  ["legacy", "published"],
);
assert.deepEqual(source.list("en"), []);
assert.equal(source.read("draft", "zh"), null);
assert.equal(source.read("draft-flag", "zh"), null);
assert.equal(source.read("published", "en"), null);
assert.equal(source.read("missing", "zh"), null);
assert.equal(source.read("../published", "zh"), null);
assert.equal(source.read("published", "unknown"), null);
assert.deepEqual(source.availableLocales("published", ["zh", "en"]), ["zh"]);
assert.deepEqual(source.availableLocales("draft", ["zh", "en"]), []);
assert.equal(
  postUpdatedDate(source.read("published", "zh").metadata),
  "2026-02-02",
);
assert.equal(
  postUpdatedDate(source.read("legacy", "zh").metadata),
  "2026-01-02",
);

const invalid = createBlogSource(path.resolve("tests/fixtures/invalid-blog"));
assert.throws(() => invalid.read("status", "zh"), /status must be/);
assert.throws(() => invalid.read("date", "zh"), /YYYY-MM-DD/);
assert.throws(() => invalid.read("updated", "zh"), /cannot precede/);
assert.throws(() => invalid.list("zh"));

// Validate the real content too, before a build can produce an artifact.
for (const locale of ["zh", "en"]) blogSource.list(locale);
console.log(
  "Publication rules verified: lists, direct reads, translations, legacy posts, drafts, invalid metadata and update dates.",
);
