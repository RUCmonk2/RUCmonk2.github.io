import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export interface BlogPostMetadata {
  title: string;
  date: string;
  updatedAt?: string;
  summary: string;
  [key: string]: unknown;
}

function requireDate(value: unknown, field: string, file: string): string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`${file}: ${field} must be a quoted YYYY-MM-DD date`);
  }
  return value;
}

export function postUpdatedDate(metadata: BlogPostMetadata): string {
  return metadata.updatedAt ?? metadata.date;
}

// This is the publication boundary for lists, direct URLs, translations and feeds.
// Missing status remains public for existing articles; unknown values fail closed.
export function createBlogSource(
  root = path.join(process.cwd(), "content", "blog"),
) {
  function read(slug: string, locale: string) {
    if (
      !["zh", "en"].includes(locale) ||
      !slug ||
      /[/\\]/.test(slug) ||
      [".", ".."].includes(slug)
    ) {
      return null;
    }
    const file = path.join(root, locale, `${slug}.mdx`);
    if (!fs.existsSync(file)) return null;
    const { content, data } = matter(fs.readFileSync(file, "utf8"));
    if (
      data.status !== undefined &&
      !["draft", "published"].includes(data.status)
    ) {
      throw new Error(`${file}: status must be draft or published`);
    }
    if (data.draft !== undefined && typeof data.draft !== "boolean") {
      throw new Error(`${file}: draft must be a boolean`);
    }
    // Incomplete drafts are allowed; never render or expose their metadata.
    if (data.status === "draft" || data.draft === true) return null;
    if (typeof data.title !== "string" || !data.title.trim()) {
      throw new Error(`${file}: published articles need a title`);
    }
    const date = requireDate(data.date, "date", file);
    const updatedAt =
      data.updatedAt === undefined
        ? undefined
        : requireDate(data.updatedAt, "updatedAt", file);
    if (updatedAt && updatedAt < date) {
      throw new Error(`${file}: updatedAt cannot precede date`);
    }
    if (data.summary !== undefined && typeof data.summary !== "string") {
      throw new Error(`${file}: summary must be text`);
    }
    const metadata: BlogPostMetadata = {
      ...data,
      title: data.title,
      date,
      updatedAt,
      summary: data.summary ?? "",
    };
    return { slug, locale, metadata, source: content };
  }

  function list(locale: string) {
    if (!["zh", "en"].includes(locale)) return [];
    const directory = path.join(root, locale);
    if (!fs.existsSync(directory)) return [];
    return fs
      .readdirSync(directory)
      .filter((file) => path.extname(file) === ".mdx")
      .map((file) => read(path.basename(file, ".mdx"), locale))
      .filter((post) => post !== null);
  }

  function availableLocales(slug: string, locales: readonly string[]) {
    return locales.filter((locale) => read(slug, locale) !== null);
  }

  return { read, list, availableLocales };
}

export const blogSource = createBlogSource();
