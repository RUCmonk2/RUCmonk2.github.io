"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

import { DATA } from "@/data";

export default function Footer() {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const currentYear = new Date().getFullYear();
  const homeHref = isEnglish ? "/en" : "/";
  const blogHref = isEnglish ? "/en/blog" : "/blog";
  const copy = isEnglish
    ? {
        line: "Artificial intelligence, research notes, and working systems.",
        home: "Home",
        work: "Projects",
        writing: "Writing",
        email: "Email",
        source: "Source",
        updated: "Updated",
      }
    : {
        line: "人工智能、科研笔记与长期工作方法。",
        home: "首页",
        work: "项目",
        writing: "写作",
        email: "邮件",
        source: "源码",
        updated: "更新于",
      };

  return (
    <footer className="border-t border-neutral-200 px-5 py-9 sm:px-8 lg:px-10 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="academic-heading text-lg font-semibold">
              {isEnglish ? "Yaozhi Ye" : "叶耀之"}
            </p>
            <p className="mt-2 max-w-md text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              {copy.line}
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-3 text-xs"
            aria-label={isEnglish ? "Footer navigation" : "页脚导航"}
          >
            <Link href={homeHref} className="hover:text-[#9f1d2f]">
              {copy.home}
            </Link>
            <Link
              href={`${homeHref}#projects`}
              className="hover:text-[#9f1d2f]"
            >
              {copy.work}
            </Link>
            <Link href={blogHref} className="hover:text-[#9f1d2f]">
              {copy.writing}
            </Link>
            <a
              href="mailto:36231219360@qq.com"
              className="hover:text-[#9f1d2f]"
            >
              {copy.email}
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-5 text-[10px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <p>
            © {currentYear} {isEnglish ? DATA.name : DATA.chinese.name}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>
              {copy.updated} {DATA.lastUpdated}
            </span>
            <a
              href="https://github.com/RUCmonk2/RUCmonk2.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#9f1d2f]"
            >
              {copy.source}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
