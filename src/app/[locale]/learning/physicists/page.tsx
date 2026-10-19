import "../mathematicians/mathematicians.css";

import type { Metadata } from "next";

import { ScientistAtlasPage } from "@/components/mathematicians/scientist-atlas-page";
import { physicistAtlas } from "@/data/physicist-atlas";
import { constructMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: physicistAtlas.title[language],
    description: physicistAtlas.description[language],
    path: physicistAtlas.href,
    locale: language,
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ScientistAtlasPage
      locale={locale === "en" ? "en" : "zh"}
      atlas={physicistAtlas}
    />
  );
}
