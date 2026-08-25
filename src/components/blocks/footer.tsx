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
        line: "Follow my work via:",
        home: "Home",
        work: "Projects",
        writing: "Writing",
        email: "Email",
        source: "Source",
      }
    : {
        line: "继续关注：",
        home: "首页",
        work: "项目",
        writing: "写作",
        email: "邮件",
        source: "源码",
      };

  return (
    <footer className="pure-footer">
      <div className="pure-footer-inner">
        <p>
          © {currentYear} {isEnglish ? DATA.name : DATA.chinese.name}
        </p>
        <nav aria-label={isEnglish ? "Footer navigation" : "页脚导航"}>
          <Link href={homeHref}>{copy.home}</Link>
          <Link href={`${homeHref}#projects`}>{copy.work}</Link>
          <Link href={blogHref}>{copy.writing}</Link>
          <a href="mailto:36231219360@qq.com">{copy.email}</a>
          <a
            href="https://github.com/RUCmonk2/RUCmonk2.github.io"
            target="_blank"
            rel="noreferrer"
          >
            {copy.source}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
        <span>{copy.line}</span>
      </div>
    </footer>
  );
}
