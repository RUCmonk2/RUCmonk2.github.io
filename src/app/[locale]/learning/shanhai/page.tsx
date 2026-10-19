import "./shanhai.css";

import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { ShanhaiAtlas } from "@/components/shanhai/shanhai-atlas";
import { getLearningItem } from "@/data/learning/catalog";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const item = getLearningItem("shanhai");
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: locale as Locale,
  });
}

export default async function ShanhaiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ShanhaiAtlas en={locale === "en"} />;
}
