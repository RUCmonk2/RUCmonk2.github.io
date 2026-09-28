import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { FactorWorkshop } from "@/components/k12/factor-workshop";
import { K12Shell } from "@/components/k12/k12-shell";
import { constructMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Factorization Workshop" : "因式工坊",
    description:
      "用面积拼图理解因式分解，从二次式进阶到立方、高次换元、多字母和根式分解，按因式填空并查看逐步提示。",
    path: "/learning/math-lab/factorization",
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return (
    <K12Shell locale={language} active="lab">
      <header className="k12-hero k12-hero-compact">
        <span className="notes-overline">01 / FACTORIZATION WORKSHOP</span>
        <h1>因式工坊</h1>
        <p>
          同一个量，可以写成几项的和，也可以写成几个因式的积。先操作面积图，再独立完成一道题；每一层提示都由你决定何时展开。
        </p>
        <div className="k12-hero-meta">
          <span>面积探索</span>
          <span>基础 5 类 · 进阶 8 类 · 三档难度</span>
          <a href="#practice">直接开始练习 ↓</a>
        </div>
      </header>
      <FactorWorkshop locale={language} />
    </K12Shell>
  );
}
