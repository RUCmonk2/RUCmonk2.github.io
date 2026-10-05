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
            把几块面积拼成一个长方形，再把多项式写成因式的积。基础五类、进阶八类练习，覆盖高次式、多个字母与无理数，支持按因式填空、分层提示和题号分享。
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
      <section className="note-article k12-start">
        <div>
          <span className="notes-overline">02 / ROTATION WORKSHOP</span>
          <h2>旋转工坊</h2>
          <p>
            一根轴、一个角，怎样变成一次三维旋转？转动方块、交换旋转次序，观察万向锁与姿态插值，让四元数的四个分量对应眼前的运动。
          </p>
          <Link
            className="k12-button"
            href={prefix + "/learning/math-lab/rotations"}
          >
            开始探索
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="k12-start-equation" aria-hidden="true">
          <svg width="240" height="190" viewBox="0 0 240 190" fill="none">
            <path
              d="M120 100 53 139m67-39 77 36m-77-36V23"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.4"
            />
            <path
              d="m56 131-3 8 9 1m126-11 9 7-9 2m-73-107 5-8 5 8"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.4"
            />
            <path
              d="m88 80 37-19 35 22-37 19z"
              fill="currentColor"
              fillOpacity="0.07"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="m88 80 35 22v40l-35-22z"
              fill="currentColor"
              fillOpacity="0.14"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="m123 102 37-19v40l-37 19z"
              fill="currentColor"
              fillOpacity="0.04"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M181 95c11 9 11 19-1 27m-113-6c-13-8-14-18-1-26"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="m180 113 0 9 9-2M66 99v-9l-9 1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <text x="37" y="150" fill="currentColor" fontSize="11">
              x
            </text>
            <text x="203" y="147" fill="currentColor" fontSize="11">
              y
            </text>
            <text x="130" y="25" fill="currentColor" fontSize="11">
              z
            </text>
          </svg>
        </div>
      </section>
      <section className="note-article k12-guidance">
        <div className="note-prose">
          <h2>让实验与知识连起来</h2>
          <p>
            每个实验都连接相关讲义。遇到不理解的步骤，回到概念、例题和误区解释；完成后换一个数值，检查自己能否独立迁移。
          </p>
          <Link href={prefix + "/learning/k12/mathematics"}>
            进入中小学数学知识网 →
          </Link>
        </div>
      </section>
    </K12Shell>
  );
}
