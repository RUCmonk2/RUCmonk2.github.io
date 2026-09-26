import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { learningCatalog, getFeaturedLearning, learningItemHref } =
  await jiti.import("../src/data/learning/catalog.ts");
const { learningCourses } = await jiti.import("../src/data/learning.ts");
const output = path.resolve("out");
const ids = new Set();
const hrefs = new Set();
const featured = getFeaturedLearning();

assert.equal(
  featured.length,
  3,
  "The homepage should have three learning picks",
);
assert.equal(
  learningCatalog.filter((item) => item.featuredOrder !== undefined).length,
  featured.length,
  "Do not silently hide additional featured entries",
);
assert.equal(new Set(featured.map((item) => item.featuredOrder)).size, 3);

for (const item of learningCatalog) {
  assert(!ids.has(item.id), `Duplicate id: ${item.id}`);
  assert(!hrefs.has(item.href), `Duplicate canonical path: ${item.href}`);
  ids.add(item.id);
  hrefs.add(item.href);
  assert(["course", "guide"].includes(item.category), item.id);
  assert.match(item.updated, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(item.updated).toISOString().slice(0, 10), item.updated);
  for (const locale of ["zh", "en"]) {
    for (const field of ["title", "description", "topic", "scope"]) {
      assert(
        item[field][locale]?.trim(),
        `${item.id}: missing ${field}.${locale}`,
      );
    }
    const href = learningItemHref(item, locale);
    if (!item.localized) assert.equal(href, item.href);
    const file = path.join(
      output,
      href,
      href.endsWith(".html") ? "" : "index.html",
    );
    assert((await stat(file)).isFile(), `Missing exported page: ${href}`);
    const page = await readFile(file, "utf8");
    const title = item.title[item.localized ? locale : "zh"];
    const escapedTitle = title.replaceAll("&", "&amp;");
    assert(
      page.match(/<title>(.*?)<\/title>/)?.[1].includes(escapedTitle),
      `Catalog/page title mismatch: ${href}`,
    );
    const isChapterReader = learningCourses.some(
      (course) => course.slug === item.id,
    );
    if (!item.localized || (item.category === "course" && !isChapterReader)) {
      assert.equal(
        page
          .match(/<h1\b[^>]*>([^]*?)<\/h1>/)?.[1]
          .replace(/<[^>]+>/g, "")
          .trim(),
        escapedTitle,
        `Catalog/heading mismatch: ${href}`,
      );
    } else if (isChapterReader) {
      const courseSwitch = page.match(
        /<div\b[^>]*class="reader-course-switch"[^>]*>([^]*?)<\/div>/,
      )?.[1];
      assert(courseSwitch, `Course switch missing: ${href}`);
      for (const course of learningCatalog.filter(
        (entry) => entry.category === "course",
      )) {
        assert(
          courseSwitch.includes(`href="${learningItemHref(course, locale)}/"`),
          `Course switch omits ${course.id}: ${href}`,
        );
      }
    }
  }
}

for (const locale of ["zh", "en"]) {
  const prefix = locale === "en" ? "/en" : "";
  const home = await readFile(path.join(output, prefix, "index.html"), "utf8");
  const rows = [...home.matchAll(/<a\b[^>]*class="pure-resource-row"[^>]*>/g)];
  assert.equal(rows.length, 3, `${locale}: homepage pick count`);
  for (const item of featured) {
    const href = learningItemHref(item, locale);
    assert(
      rows.some(([row]) =>
        row.includes(`href="${href}${href.endsWith(".html") ? "" : "/"}"`),
      ),
      item.id,
    );
  }
  const directory = await readFile(
    path.join(output, prefix, "learning/index.html"),
    "utf8",
  );
  const alias = await readFile(
    path.join(output, prefix, "tutorials/index.html"),
    "utf8",
  );
  for (const [label, html] of [
    ["directory", directory],
    ["legacy alias", alias],
  ]) {
    assert.match(
      html,
      new RegExp(`<link rel="canonical" href="[^"]*${prefix}/learning/?"`),
      label,
    );
    for (const item of learningCatalog) {
      const href = learningItemHref(item, locale);
      assert(
        html.includes(`href="${href}${href.endsWith(".html") ? "" : "/"}"`),
        `${label}: ${href}`,
      );
    }
  }
}

const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.equal(urls.length, new Set(urls).size, "Duplicate sitemap entry");
assert(
  !urls.some((url) => /\/tutorials\/?$/.test(url)),
  "Only index the canonical learning directory",
);
assert(
  !urls.some((url) => url.includes("/en/assets/")),
  "Standalone guides are not duplicated by locale",
);
console.log(
  `Learning catalog verified: ${ids.size} unique entries, 3 homepage picks, both locales and legacy directory available.`,
);
