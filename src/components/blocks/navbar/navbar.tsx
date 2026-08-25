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
  const tutorialHref = isEnglish ? "/en/tutorials" : "/tutorials";
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
    <header className="pure-nav">
      <div className="pure-nav-inner">
        <Link
          href={homeHref}
          className="pure-brand"
          aria-label={isEnglish ? "Yaozhi Ye home" : "叶耀之首页"}
        >
          <b>{isEnglish ? "Yaozhi Ye" : "叶耀之"}</b>
          <span>Pure Lab</span>
        </Link>

        <nav
          className="pure-nav-links"
          aria-label={isEnglish ? "Primary navigation" : "主导航"}
        >
          <Link href={`${homeHref}#about`} className="">
            {copy.about}
          </Link>
          <Link href={`${homeHref}#projects`} className="">
            {copy.projects}
          </Link>
          <Link href={blogHref} className="">
            {copy.writing}
          </Link>
          <Link href={tutorialHref} className="">
            {copy.tutorial}
          </Link>
          <Link href={`${homeHref}#contact`} className="">
            {copy.contact}
          </Link>
        </nav>

        <div className="pure-nav-tools">
          <Link href={blogHref} className="pure-mobile-blog">
            {copy.blog}
          </Link>
          <ModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
