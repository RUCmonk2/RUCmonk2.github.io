import "./shuowen.css";

import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { ShuowenAtlas } from "@/components/shuowen/shuowen-atlas";
import { getLearningItem } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const item = getLearningItem("shuowen");
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function ShuowenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ShuowenAtlas en={locale === "en"} />;
}
