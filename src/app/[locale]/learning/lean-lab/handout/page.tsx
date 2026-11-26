import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { HandoutReader } from "@/components/lean-lab/handout-reader";
import { handoutPath } from "@/data/lean-lab/handout";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title:
      locale === "en"
        ? "Lean self-study handout"
        : "从第一行 Lean 到算法正确性",
    description:
      locale === "en"
        ? "Read the Chinese Lean handout, try the exercises and follow each proof in the lab."
        : "从合取、重写与列表归纳，到插入排序、求和与线性查找。含手算例子、Lean 证明与练习解答。",
    path: handoutPath,
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HandoutReader locale={locale === "en" ? "en" : "zh"} />;
}
