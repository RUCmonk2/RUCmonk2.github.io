import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getBlogPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const enPosts = await getBlogPosts("en");
  const zhPosts = await getBlogPosts("zh");

  const params: Array<{ locale: string; slug: string }> = [];

  // Ensure we have arrays before iterating
  const enArray = Array.isArray(enPosts) ? enPosts : [];
  const zhArray = Array.isArray(zhPosts) ? zhPosts : [];

  enArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "en", slug: post.slug });
    }
  });

  zhArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "zh", slug: post.slug });
    }
  });

  return params;
}

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    return null; // Layout will handle notFound()
  }

  const readingTime =
    typeof post.metadata.readingTime === "number" &&
    post.metadata.readingTime > 0
      ? post.metadata.readingTime
      : 1;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
      <p className="section-index mb-5">{t("blog.title")}</p>
      <h1 className="academic-heading mb-5 text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
        {post.metadata.title}
      </h1>
      <div className="mb-10 flex items-center justify-between border-b border-neutral-200 pb-6 text-sm dark:border-neutral-800">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p>{formatDate(post.metadata.date, locale)}</p>
          <span className="mx-1">·</span>
          <p>{t("blog.readingTime", { minutes: readingTime })}</p>
        </div>
      </div>
      <article
        className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-normal prose-a:text-[#a6192e] max-w-none leading-8"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </div>
  );
}
