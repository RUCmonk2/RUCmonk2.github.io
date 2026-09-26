"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";

export default function Navbar({
  translatedBlogSlugs,
}: {
  translatedBlogSlugs: string[];
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const blogHref = isEnglish ? "/en/blog" : "/blog";
  const learningHref = isEnglish ? "/en/learning" : "/learning";
  const isLearningPage = /\/(learning|tutorials|teaching)(\/|$)/.test(pathname);
  const linksHref = isEnglish ? "/en/links" : "/links";
  const t = useTranslations();

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
            {t("navigation.about")}
          </Link>
          <Link
            href={learningHref}
            aria-current={isLearningPage ? "page" : undefined}
            className=""
          >
            {t("navigation.learning")}
          </Link>
          <Link
            href={blogHref}
            aria-current={pathname.includes("/blog") ? "page" : undefined}
            className=""
          >
            {t("blog.title")}
          </Link>
          <Link
            href={linksHref}
            aria-current={pathname.includes("/links") ? "page" : undefined}
            className=""
          >
            {t("navigation.friends")}
          </Link>
        </nav>

        <div className="pure-nav-tools">
          <Link
            href={learningHref}
            className="pure-mobile-blog"
            aria-current={isLearningPage ? "page" : undefined}
          >
            {t("navigation.learning")}
          </Link>
          <Link href={blogHref} className="pure-mobile-blog">
            {t("blog.title")}
          </Link>
          <ModeToggle />
          <LanguageToggle translatedBlogSlugs={translatedBlogSlugs} />
        </div>
      </div>
    </header>
  );
}
