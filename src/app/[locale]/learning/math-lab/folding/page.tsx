import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { FoldingWorkshop } from "@/components/folding/folding-workshop";
import { K12Shell } from "@/components/k12/k12-shell";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Folding Workshop" : "折叠工坊",
    description:
      locale === "en"
        ? "A color-folding puzzle with square, rectangular and triangular boards, five difficulty levels, reproducible challenges and step-by-step solutions. Activities are in Chinese."
        : "沿折线镜像覆盖，拼出目标图案。方形、长方形与正三角形棋盘，五档难度、随机挑战、逐步提示与解答演示。",
    path: "/learning/math-lab/folding",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";

  return (
    <K12Shell locale={language} active="lab">
      <div className="folding-page">
        <header className="k12-hero k12-hero-compact folding-hero">
          <span className="notes-overline">04 / FOLDING WORKSHOP</span>
          <h1>折叠工坊</h1>
          <p>沿一条折线，让色彩找到新的位置。</p>
        </header>
        <FoldingWorkshop locale={language} />
      </div>
    </K12Shell>
  );
}
