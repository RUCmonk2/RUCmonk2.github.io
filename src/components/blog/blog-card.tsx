"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link, LOCALE_TO_HREFLANG } from "@/i18n/routing";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  locale?: string;
}

export function BlogCard({
  slug,
  title,
  date,
  summary,
  locale,
}: BlogCardProps) {
  const currentLocale = useLocale();
  const t = useTranslations();
  const displayLocale = locale || currentLocale;
  const formattedDate = new Date(date).toLocaleDateString(
    LOCALE_TO_HREFLANG[displayLocale as keyof typeof LOCALE_TO_HREFLANG] ||
      "en-US",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    },
  );

  return (
    <Link
      href={`/blog/${slug}`}
      className="engineering-blog-row group grid gap-5 py-8 focus-visible:ring-2 focus-visible:ring-[#9f1d2f] focus-visible:outline-none sm:grid-cols-[0.32fr_1.4fr_auto] sm:items-start sm:gap-8"
    >
      <time
        className="font-mono text-xs text-neutral-500 dark:text-neutral-400"
        dateTime={date}
      >
        {formattedDate}
      </time>
      <div>
        <h2 className="text-xl leading-tight font-semibold transition-colors sm:text-2xl">
          {title}
        </h2>
        {summary ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            {summary}
          </p>
        ) : null}
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold">
          {t("blog.readMore")}
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
      <ArrowRight
        className="hidden size-5 transition-transform group-hover:translate-x-1 sm:block"
        aria-hidden="true"
      />
    </Link>
  );
}
