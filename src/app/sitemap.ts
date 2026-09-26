import { MetadataRoute } from "next";

import { chapterPath, learningCourses } from "@/data/learning";
import {
  getLearningItem,
  learningCatalog,
  learningItemHref,
} from "@/data/learning/catalog";
import { siteConfig } from "@/data/site";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { postUpdatedDate } from "@/lib/blog-source";

export const dynamic = "force-static";

const siteUrl = siteConfig.url;
function localePathPrefix(locale: string): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = ["", "/blog", "/links", "/learning"];

  const chapterPages = LOCALES.flatMap((locale) =>
    learningCourses.flatMap((course) =>
      course.chapters.slice(1).map((chapter) => ({
        url:
          siteUrl +
          localePathPrefix(locale) +
          chapterPath(course.slug, chapter.id),
        lastModified: new Date(getLearningItem(course.slug).updated),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ),
  );

  const catalogPages = learningCatalog.flatMap((item) =>
    (item.localized ? LOCALES : [DEFAULT_LOCALE]).map((locale) => ({
      url: siteUrl + learningItemHref(item, locale === "en" ? "en" : "zh"),
      lastModified: new Date(item.updated),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${page}`,
      changeFrequency: (["", "/blog"].includes(page)
        ? "weekly"
        : "monthly") as ChangeFrequency,
      priority: page === "" ? 1.0 : page === "/blog" ? 0.8 : 0.5,
    }));
  });

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const posts = await getBlogPosts(locale);
    posts.forEach((post) => {
      const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
      if (slugPart) {
        allBlogSitemapEntries.push({
          url: `${siteUrl}${localePathPrefix(locale)}/blog/${slugPart}`,
          lastModified: new Date(postUpdatedDate(post.metadata)),
          changeFrequency: "monthly" as ChangeFrequency,
          priority: 0.7,
        });
      }
    });
  }

  const uniqueBlogPostEntries = Array.from(
    new Map(allBlogSitemapEntries.map((entry) => [entry.url, entry])).values(),
  );

  return [...pages, ...catalogPages, ...chapterPages, ...uniqueBlogPostEntries];
}
