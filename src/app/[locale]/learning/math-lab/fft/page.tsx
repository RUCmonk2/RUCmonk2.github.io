import "katex/dist/katex.min.css";
import "../math-lab.css";
import "./fft.css";
import "./fft-guided.css";

import { ArrowDown, ArrowLeft, FileText } from "lucide-react";
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
        <div className="fft-top-links">
          <Link className="lab-back" href={prefix + "/learning/math-lab/"}>
            <ArrowLeft size={16} aria-hidden="true" />
            {english ? "Mathematics Lab" : "数学实验室"}
          </Link>
          <div className="fft-resource-links">
            <Link
              className="fft-proof-link"
              href={prefix + "/learning/math-lab/fft/handout/"}
            >
              <FileText size={15} aria-hidden="true" />
              {english ? "PDF handout" : "PDF 讲义"}
            </Link>
            <a className="fft-proof-link" href="#derivation">
              {english ? "Full derivation" : "完整推导"}{" "}
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <header className="fft-intro">
          <div>
            <h1>{english ? "FFT · The folding disk" : "FFT 折叠实验"}</h1>
            <p>
              {english
                ? "Four samples in, four frequency coefficients out."
                : "把四个采样算成四个频点。"}
            </p>
          </div>
        </header>
        <FftWorkshop english={english} />
        <FftDerivation english={english} />
      </div>
    </main>
  );
}
