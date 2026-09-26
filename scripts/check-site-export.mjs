import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { blogSource, postUpdatedDate } = await jiti.import(
  "../src/lib/blog-source.ts",
);
const { siteConfig } = await jiti.import("../src/data/site.ts");
const root = path.resolve("out");
assert(
  existsSync(path.join(root, "index.html")),
  "Build the site before checking its export",
);
const base = new URL(siteConfig.url);
const failures = [];
const htmlCache = new Map();

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function decode(value) {
  return value
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, number) =>
      String.fromCodePoint(
        number[0].toLowerCase() === "x"
          ? parseInt(number.slice(1), 16)
          : Number(number),
      ),
    )
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function attr(tag, name) {
  const match = tag.match(
    new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return match ? decode(match[1] ?? match[2] ?? match[3]) : null;
}

function html(file) {
  if (!htmlCache.has(file)) {
    // Ignore payload strings, examples in scripts, CSS and comments, but keep opening tags.
    const text = readFileSync(file, "utf8")
      .replace(/<!--[^]*?-->/g, "")
      .replace(/(<(?:script|style)\b[^>]*>)[^]*?<\/(?:script|style)>/gi, "$1");
    const tags = text.match(/<[a-z][^>]*>/gi) ?? [];
    const ids = new Set(
      tags
        .flatMap((tag) => [
          attr(tag, "id"),
          /^<a\b/i.test(tag) ? attr(tag, "name") : null,
        ])
        .filter(Boolean),
    );
    htmlCache.set(file, { tags, ids });
  }
  return htmlCache.get(file);
}

function resolveFile(pathname) {
  let file = path.resolve(root, "." + decodeURIComponent(pathname));
  assert(
    file.startsWith(root + path.sep) || file === root,
    `Path escapes export: ${pathname}`,
  );
  if (existsSync(file) && statSync(file).isDirectory())
    file = path.join(file, "index.html");
  return file;
}

const pages = filesIn(root).filter((file) => file.endsWith(".html"));
let linkCount = 0;
for (const file of pages) {
  const route = "/" + path.relative(root, file).split(path.sep).join("/");
  const pageUrl = new URL(route.replace(/index\.html$/, ""), base);
  for (const tag of html(file).tags) {
    const name = tag.match(/^<([a-z]+)/i)?.[1].toLowerCase();
    const value = ["a", "link"].includes(name)
      ? attr(tag, "href")
      : ["img", "iframe", "script", "source"].includes(name)
        ? attr(tag, "src")
        : null;
    if (!value) continue;
    const url = new URL(value, pageUrl);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.hostname !== base.hostname
    )
      continue;
    linkCount += 1;
    const target = resolveFile(url.pathname);
    if (!existsSync(target)) {
      failures.push(`${route} → ${value}: missing file`);
    } else if (url.hash && target.endsWith(".html")) {
      const fragment = decodeURIComponent(url.hash.slice(1)).split(
        ":~:text=",
      )[0];
      if (fragment && !html(target).ids.has(fragment))
        failures.push(`${route} → ${value}: missing anchor`);
    }
  }
}

const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");
const feed = readFileSync(path.join(root, "api/feed/atom.xml"), "utf8");
const feedEntries = [...feed.matchAll(/<entry>([^]*?)<\/entry>/g)].map(
  (entry) => entry[1],
);
for (const locale of ["zh", "en"]) {
  const directory = path.resolve("content/blog", locale);
  if (!existsSync(directory)) continue;
  const prefix = locale === "en" ? "/en" : "";
  const publicPosts = blogSource.list(locale);
  const publicSlugs = new Set(publicPosts.map((post) => post.slug));
  for (const filename of readdirSync(directory).filter((name) =>
    name.endsWith(".mdx"),
  )) {
    const slug = path.basename(filename, ".mdx");
    const route = `${prefix}/blog/${slug}`;
    const target = path.join(root, route, "index.html");
    if (!publicSlugs.has(slug)) {
      assert(!existsSync(target), `Draft exported: ${route}`);
      assert(
        !sitemap.includes(`${route}</loc>`) &&
          !sitemap.includes(`${route}/</loc>`),
        `Draft in sitemap: ${route}`,
      );
      if (locale === "zh")
        assert(
          !feedEntries.some((entry) =>
            entry.includes(`<id>${base.origin}${route}</id>`),
          ),
          `Draft in feed: ${route}`,
        );
      // Check public HTML and Next's static payloads for links to the hidden route.
      for (const file of filesIn(root).filter((file) =>
        /\.(html|txt)$/.test(file),
      )) {
        const text = readFileSync(file, "utf8").replaceAll('\\"', '"');
        assert(
          !text.includes(`href="${route}"`) &&
            !text.includes(`href="${route}/"`),
          `Draft link in ${file}`,
        );
      }
    }
  }
  for (const post of publicPosts) {
    const route = `${prefix}/blog/${post.slug}`;
    assert(
      existsSync(path.join(root, route, "index.html")),
      `Published article missing: ${route}`,
    );
    const update = postUpdatedDate(post.metadata);
    const mapEntry = [...sitemap.matchAll(/<url>([^]*?)<\/url>/g)].find(
      (entry) =>
        entry[1].includes(`${route}</loc>`) ||
        entry[1].includes(`${route}/</loc>`),
    );
    assert(
      mapEntry?.[1].includes(
        `<lastmod>${new Date(update).toISOString()}</lastmod>`,
      ),
      `Wrong sitemap date: ${route}`,
    );
    const article = readFileSync(path.join(root, route, "index.html"), "utf8");
    const missingTranslation = !blogSource.read(
      post.slug,
      locale === "en" ? "zh" : "en",
    );
    const languageLabel = missingTranslation
      ? locale === "en"
        ? "Chinese version is not published yet"
        : "英文版本尚未发布"
      : locale === "en"
        ? "切换到中文"
        : "Switch to English";
    const languageButton = (article.match(/<button\b[^>]*>/g) ?? []).find(
      (tag) => attr(tag, "aria-label") === languageLabel,
    );
    assert(languageButton, `Missing language control: ${route}`);
    assert.equal(
      /\sdisabled(?:[\s=>]|$)/.test(languageButton),
      missingTranslation,
      `Translation control disagrees with publication state: ${route}`,
    );
    assert(
      article.includes(`"dateModified":"${update}"`),
      `Wrong article modification date: ${route}`,
    );
    if (locale === "zh") {
      const entry = feedEntries.find((entry) =>
        entry.includes(`<id>${base.origin}${route}</id>`),
      );
      assert(
        entry?.includes(`<updated>${new Date(update).toISOString()}</updated>`),
        `Wrong feed date: ${route}`,
      );
    }
  }
}
const expectedFeedDate = new Date(
  Math.max(
    0,
    ...blogSource
      .list("zh")
      .map((post) => Date.parse(postUpdatedDate(post.metadata))),
  ),
).toISOString();
assert.equal(
  feed.match(/<updated>(.*?)<\/updated>/)?.[1],
  expectedFeedDate,
  "Feed freshness must follow content, not build time",
);
assert.equal(
  feedEntries.length,
  blogSource.list("zh").length,
  "Feed publication count",
);
assert.equal(
  failures.length,
  0,
  `Broken local references:\n${failures.join("\n")}`,
);
console.log(
  `Site export verified: ${pages.length} HTML pages, ${linkCount} local references, publication visibility and update dates.`,
);
