"use client";

import { Github, Mail, Rss } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

import { DATA } from "@/data";

export default function Footer() {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pure-footer">
      <div className="pure-footer-inner">
        <p>
          © {currentYear} {isEnglish ? DATA.name : DATA.chinese.name}
        </p>
        <nav aria-label={isEnglish ? "Footer links" : "页脚链接"}>
          <Link
            className="footer-brief-link"
            href={isEnglish ? "/en/morning-brief/" : "/morning-brief/"}
          >
            {isEnglish ? "Research brief archive" : "研究晨报归档"}
          </Link>
          <a
            href="https://github.com/RUCmonk2"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github aria-hidden="true" />
          </a>
          <a
            href="mailto:36231219360@qq.com"
            aria-label={isEnglish ? "Email" : "邮件"}
            title={isEnglish ? "Email" : "邮件"}
          >
            <Mail aria-hidden="true" />
          </a>
          <a href="/api/feed/atom.xml" aria-label="RSS" title="RSS">
            <Rss aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
