import "../mathematicians/mathematicians.css";

import type { Metadata } from "next";

import { ScientistAtlasPage } from "@/components/mathematicians/scientist-atlas-page";
import { chemistAtlas } from "@/data/chemist-atlas";
import { constructMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: chemistAtlas.title[language],
    description: chemistAtlas.description[language],
    path: chemistAtlas.href,
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
      atlas={chemistAtlas}
    />
  );
}
