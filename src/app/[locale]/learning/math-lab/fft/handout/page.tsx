import "../../math-lab.css";
import "./handout.css";

import { ArrowLeft, ArrowUpRight, Download, FileCode } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { FftHandoutReader } from "@/components/fft/fft-handout-reader";
import { constructMetadata } from "@/lib/metadata";

const pdfHref = "/assets/fft-handout/fft-handout.pdf";
const sourceHref = "/assets/fft-handout/fft-handout-source.zip";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "FFT handout" : "FFT 讲义",
    description:
      locale === "en"
        ? "Read the Chinese FFT handout online. Includes the radix-2 derivation, folding-disk diagrams, and C99 code."
        : "在线阅读 FFT 讲义。完整推导基 2 FFT，含圆盘配对、4 点算例、矩阵分解和 C99 代码。",
    path: "/learning/math-lab/fft/handout",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const english = locale === "en";
  const prefix = english ? "/en" : "";
  return (
    <main className="math-lab fft-handout-page">
      <div className="lab-shell fft-handout-shell">
        <Link className="lab-back" href={prefix + "/learning/math-lab/fft/"}>
          <ArrowLeft size={16} aria-hidden="true" />
          {english ? "FFT experiment" : "FFT 折叠实验"}
        </Link>
        <header className="fft-handout-heading">
          <div>
            <h1>{english ? "FFT handout" : "FFT 讲义"}</h1>
            <p>
              {english
                ? "The folding disk, the full radix-2 derivation, and C99 code. The PDF is in Chinese."
                : "从圆盘折叠到 C 代码。含完整推导、4 点算例与矩阵分解。"}
            </p>
          </div>
          <div className="fft-handout-downloads">
            <a
              className="fft-handout-primary"
              href={pdfHref}
              target="_blank"
              rel="noreferrer"
            >
              {english ? "Open original PDF" : "打开原版 PDF"}{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={pdfHref} download>
              <Download size={15} aria-hidden="true" />
              {english ? "Download PDF" : "下载 PDF"}
            </a>
            <a href={sourceHref} download>
              <FileCode size={15} aria-hidden="true" />
              {english ? "LaTeX and C sources" : "LaTeX 与 C 源码"}
            </a>
          </div>
        </header>
        <FftHandoutReader english={english} />
      </div>
    </main>
  );
}
