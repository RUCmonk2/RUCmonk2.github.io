import "./mathematicians.css";

import type { Metadata } from "next";

import { ScientistAtlasPage } from "@/components/mathematicians/scientist-atlas-page";
import { mathScientistAtlas } from "@/data/scientist-atlas";
import { constructMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: mathScientistAtlas.title[language],
    description: mathScientistAtlas.description[language],
    path: mathScientistAtlas.href,
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
      atlas={mathScientistAtlas}
    />
  );
}
