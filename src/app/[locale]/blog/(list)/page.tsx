import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BlogCard } from "@/components/blog/blog-card";
import { routing } from "@/i18n/routing";
import { getBlogPosts, sortPostsByDate } from "@/lib/blog";
import { generateBlogJsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { jsonldScript } from "@/lib/utils";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const metadata = await constructMetadata({
    title: t("blog.title"),
    description: t("blogTagline"),
    path: "/blog",
    locale,
  });

  return metadata;
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const posts = sortPostsByDate(await getBlogPosts(locale));
  const blogJsonLd = generateBlogJsonLd(posts);
  const t = await getTranslations({ locale });
  const isEnglish = locale === "en";

  return (
    <main className="engineering-list-page flex-1 pt-16">
      {jsonldScript(blogJsonLd)}
      <section className="px-5 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:px-10">
        <div className="engineering-list-head mx-auto grid max-w-6xl gap-6 pb-12 sm:grid-cols-[12rem_1fr] sm:gap-8">
          <div>
            <p className="section-index">
              {isEnglish ? "Writing / Notes" : "写作 / 笔记"}
            </p>
          </div>
          <div>
            <h1 className="academic-heading text-4xl leading-none font-semibold sm:text-5xl">
              {t("blog.title")}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              {t("blogTagline")}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              {isEnglish ? "Latest entries" : "最近更新"}
            </h2>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              {String(posts.length).padStart(2, "0")}{" "}
              {isEnglish ? "ENTRIES" : "篇"}
            </span>
          </div>
          <div className="border-t border-neutral-300 dark:border-neutral-700">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                locale={locale}
                slug={post.slug}
                title={post.metadata.title}
                date={post.metadata.date}
                summary={post.metadata.summary}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
