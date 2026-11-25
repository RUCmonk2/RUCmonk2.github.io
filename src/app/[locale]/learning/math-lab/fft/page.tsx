import "katex/dist/katex.min.css";
import "../math-lab.css";
import "./fft.css";

import { ArrowDown, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { FftDerivation } from "@/components/fft/fft-derivation";
import { FftWorkshop } from "@/components/fft/fft-workshop";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "FFT · The folding disk" : "FFT 折叠实验",
    description:
      locale === "en"
        ? "Work out a four-point FFT, trace each butterfly and matrix, or explore the original 32-point disk."
        : "从四个采样开始，逐折看算式、矩阵和输出向量，附完整的 FFT 推导与 32 点圆盘演示。",
    path: "/learning/math-lab/fft",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const english = locale === "en";
  const prefix = english ? "/en" : "";

  return (
    <main className="math-lab fft-page">
      <div className="lab-shell">
        <Link className="lab-back" href={prefix + "/learning/math-lab/"}>
          <ArrowLeft size={16} aria-hidden="true" />
          {english ? "Mathematics Lab" : "数学实验室"}
        </Link>
        <header className="fft-intro">
          <div>
            <h1>{english ? "FFT · The folding disk" : "FFT 折叠实验"}</h1>
            <p>
              {english
                ? "Start with four numbers. Follow two folds from x to the complex output X."
                : "用四个数走一遍 FFT。顺着两次折叠，看采样值怎样变成四个复数频点。"}
            </p>
          </div>
          <a className="fft-proof-link" href="#derivation">
            {english ? "Derivation and matrices" : "完整推导与矩阵"}{" "}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </header>
        <FftWorkshop english={english} />
        <FftDerivation english={english} />
      </div>
    </main>
  );
}
