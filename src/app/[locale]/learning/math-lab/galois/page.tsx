import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { GaloisWorkshop } from "@/components/math-lab/galois-workshop";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Group Theory Workshop" : "群论工坊",
    description:
      locale === "en"
        ? "Explore root permutations and Galois theory to understand why equations through degree four have general radical formulas, while general equations of degree five and higher do not. Activities are in Chinese."
        : "从根的置换走进伽罗瓦理论：理解四次以内有根式通解、一般五次及更高次没有根式通解，并亲手探索五次的障碍如何推向任意高次。",
    path: "/learning/math-lab/galois",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";

  return (
    <K12Shell locale={language} active="lab">
      <header className="k12-hero k12-hero-compact galois-hero">
        <span className="notes-overline">03 / GROUP THEORY WORKSHOP</span>
        <h1>群论工坊</h1>
        <p className="galois-hero-subtitle">方程的根，为什么在五次遇到边界？</p>
        <p>
          没学过群论，也可以从三张卡片开始。用六站实验，逐步看懂开根号、根的对称性，以及为什么四次能解、一般五次及更高次没有根式通解。
        </p>
        <div className="k12-hero-meta">
          <span>从零开始 · 六站实验</span>
          <span>五次的障碍</span>
          <span>推向任意高次</span>
          <a href={prefix + "/learning/math-map/#group"}>
            阅读「群与对称性」节点 →
          </a>
        </div>
      </header>
      <GaloisWorkshop locale={language} />
    </K12Shell>
  );
}
