"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const blogHref = isEnglish ? "/en/blog" : "/blog";
  const tutorialHref = isEnglish ? "/en/tutorials" : "/tutorials";
  const linksHref = isEnglish ? "/en/links" : "/links";
  const copy = isEnglish
    ? {
        about: "About",
        projects: "Work",
        writing: "Writing",
        friends: "Friends",
        blog: "Notes",
        tutorial: "Guide",
      }
    : {
        about: "关于",
        projects: "项目",
        writing: "写作",
        friends: "友链",
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
          <span>{isEnglish ? "A personal study" : "山水 · 笔墨"}</span>
        </Link>

        <nav
          className="pure-nav-links"
          aria-label={isEnglish ? "Primary navigation" : "主导航"}
        >
          <Link href={`${homeHref}#about`} className="">
            {copy.about}
          </Link>
          <Link href={`${homeHref}#study-content`} className="">
            {isEnglish ? "Explore" : "拾录"}
          </Link>
          <Link
            href={blogHref}
            aria-current={pathname.includes("/blog") ? "page" : undefined}
            className=""
          >
            {copy.writing}
          </Link>
          <Link
            href={tutorialHref}
            aria-current={pathname.includes("/tutorials") ? "page" : undefined}
            className=""
          >
            {copy.tutorial}
          </Link>
          <Link
            href={linksHref}
            aria-current={pathname.includes("/links") ? "page" : undefined}
            className=""
          >
            {copy.friends}
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
