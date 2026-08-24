"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";

export default function Navbar() {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const blogHref = isEnglish ? "/en/blog" : "/blog";
  const tutorialHref = isEnglish
    ? "/en/tutorials/vscode-cpp"
    : "/tutorials/vscode-cpp";
  const copy = isEnglish
    ? {
        about: "About",
        projects: "Work",
        writing: "Writing",
        contact: "Contact",
        blog: "Notes",
        tutorial: "Guide",
      }
    : {
        about: "关于",
        projects: "项目",
        writing: "写作",
        contact: "联系",
        blog: "笔记",
        tutorial: "教程",
      };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/90 bg-white/90 backdrop-blur-xl dark:border-neutral-800 dark:bg-[#0f1110]/90">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href={homeHref}
          className="group border-l-2 border-[#9f1d2f] pl-3 leading-tight"
          aria-label={isEnglish ? "Yaozhi Ye home" : "叶耀之首页"}
        >
          <span className="block text-sm font-semibold">
            {isEnglish ? "Yaozhi Ye" : "叶耀之"}
          </span>
          <span className="hidden text-[9px] text-neutral-500 sm:block dark:text-neutral-400">
            {isEnglish ? "叶耀之 · RUC" : "YAOZHI YE · RUC"}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 text-xs md:flex"
          aria-label={isEnglish ? "Primary navigation" : "主导航"}
        >
          <Link
            href={`${homeHref}#about`}
            className="transition-colors hover:text-[#9f1d2f]"
          >
            {copy.about}
          </Link>
          <Link
            href={`${homeHref}#projects`}
            className="transition-colors hover:text-[#9f1d2f]"
          >
            {copy.projects}
          </Link>
          <Link
            href={blogHref}
            className="transition-colors hover:text-[#9f1d2f]"
          >
            {copy.writing}
          </Link>
          <Link
            href={tutorialHref}
            className="transition-colors hover:text-[#9f1d2f]"
          >
            {copy.tutorial}
          </Link>
          <Link
            href={`${homeHref}#contact`}
            className="transition-colors hover:text-[#9f1d2f]"
          >
            {copy.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={blogHref}
            className="mr-1 px-2 py-2 text-xs font-semibold md:hidden"
          >
            {copy.blog}
          </Link>
          <ModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
