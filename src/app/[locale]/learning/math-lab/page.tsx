import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { constructMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Mathematics Lab" : "数学实验室",
    description: "用可操作的数学小实验建立直觉，以分层提示和变式练习检查理解。",
    path: "/learning/math-lab",
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh",
    prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} active="lab">
      <header className="k12-hero">
        <span className="notes-overline">THE MATHEMATICS LAB</span>
        <h1>动一下，想明白。</h1>
        <p>
          先用一个小实验看见关系，再亲手算出结果。适合一起上课，也适合自己慢慢探索。
        </p>
      </header>
      <section className="note-article k12-start">
        <div>
          <span className="notes-overline">01 / FACTORIZATION</span>
          <h2>因式工坊</h2>
          <p>
            把几块面积拼成一个长方形，再把多项式写成因式的积。五类可重复出题的练习，支持正负号、分层提示、等价答案检查和题号分享。
          </p>
          <Link
            className="k12-button"
            href={prefix + "/learning/math-lab/factorization"}
          >
            开始探索
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="k12-start-equation" aria-hidden="true">
          <span>分开看</span>
          <strong>↔</strong>
          <span>合起来</span>
        </div>
      </section>
      <section className="note-article k12-guidance">
        <div className="note-prose">
          <h2>让实验与知识连起来</h2>
          <p>
            每个实验都连接相关讲义。遇到不理解的步骤，回到概念、例题和误区解释；完成后换一个数值，检查自己能否独立迁移。
          </p>
          <Link href={prefix + "/learning/k12"}>进入中小学数学知识网 →</Link>
        </div>
      </section>
    </K12Shell>
  );
}
