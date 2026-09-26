import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { siteConfig } from "@/data/site";
import { type BlogPostMetadata, blogSource } from "@/lib/blog-source";

const MATH_UNICODE_REPLACEMENTS: Array<[RegExp, string]> = [[/𝜇/gu, "\\mu"]];
const BLOG_HTML_SANITIZE_SCHEMA = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "frameborder",
      "referrerpolicy",
      "loading",
    ],
  },
  protocols: {
    ...(defaultSchema.protocols ?? {}),
    src: ["https"],
  },
};

// Define the blog post type
export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  source: string;
  locale: string;
}

export async function markdownToHTML(markdown: string) {
  const normalizedMarkdown = MATH_UNICODE_REPLACEMENTS.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    markdown,
  );

  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, BLOG_HTML_SANITIZE_SCHEMA)
    .use(rehypeSlug)
    .use(rehypeKatex, { strict: "ignore" })
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(normalizedMarkdown);

  return p.toString();
}

export async function getPost(
  slug: string,
  locale: string = "en",
): Promise<BlogPost | null> {
  const post = blogSource.read(slug, locale);
  if (!post) return null;
  return { ...post, source: await markdownToHTML(post.source) };
}

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  return Promise.all(
    blogSource.list(locale).map(async (post) => ({
      ...post,
      source: await markdownToHTML(post.source),
    })),
  );
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

/* Sort posts in descending order by date (newest first) */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

/*
 * Get a paginated slice of blog posts for the given locale and page.
 * `currentPage` is 1-indexed; pages out of range yield an empty `posts` array.
 */
export async function getPaginatedBlogPosts(
  locale: string,
  currentPage: number,
): Promise<PaginatedBlogPosts> {
  const postsPerPage = siteConfig.blog.postsPerPage;
  const allPosts = sortPostsByDate(await getBlogPosts(locale));
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const start = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(start, start + postsPerPage);

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
  };
}

export async function hasChineseVersion(slug: string): Promise<boolean> {
  return blogSource.read(slug, "zh") !== null;
}

export async function hasEnglishVersion(slug: string): Promise<boolean> {
  return blogSource.read(slug, "en") !== null;
}

export async function getAvailableLocales(
  slug: string,
  locales: string[],
): Promise<string[]> {
  return blogSource.availableLocales(slug, locales);
}
