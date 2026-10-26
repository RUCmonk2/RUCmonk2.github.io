import "@/components/morning-brief/morning-brief.css";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { MorningBrief } from "@/components/morning-brief/morning-brief";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Morning brief (Beta)" : "每日晨报（测试版）",
    description:
      locale === "en"
        ? "A concise research brief, published in Chinese. Only substantive developments directly related to my research interests."
        : "只收录与研究方向直接相关的重要进展。宁缺毋滥，每日最多三条。",
    path: "/morning-brief",
    locale: locale as Locale,
  });
}

export default async function MorningBriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const english = locale === "en";
  return (
    <main className="morning-brief-page">
      <header className="brief-masthead">
        <Link href={english ? "/en/" : "/"} className="brief-home-link">
          <ArrowLeft size={14} aria-hidden="true" />
          {english ? "Back to the study" : "返回书斋"}
        </Link>
        <p className="brief-eyebrow">RESEARCH / MORNING NOTES</p>
        <h1>
          {english ? "Morning brief" : "每日晨报"}
          <span>{english ? " (Beta)" : "（测试版）"}</span>
        </h1>
        <p className="brief-introduction">
          {english
            ? "Only research that merits your attention. Three items at most; no filler."
            : "只留与研究方向直接相关的重要进展。宁缺毋滥，每日最多三条。"}
        </p>
        {english && (
          <p className="brief-language-note">
            Reports are published in Chinese; this page does not translate them.
          </p>
        )}
      </header>
      <MorningBrief />
    </main>
  );
}
