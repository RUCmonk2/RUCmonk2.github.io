import "../math-lab.css";
import "./fft.css";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { FftWorkshop } from "@/components/fft/fft-workshop";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "FFT · The folding disk" : "FFT 折叠实验",
    description:
      locale === "en"
        ? "Fold a 32-point disk, inspect each butterfly, and read the frequency spectrum."
        : "五次折叠，完成 32 点 FFT。亲手操作圆盘，查看蝶形运算和时域、频域变化。",
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
          <h1>{english ? "FFT · The folding disk" : "FFT 折叠实验"}</h1>
          <p>
            {english
              ? "Arrange 32 samples in a circle. Fold five times to turn the samples into a spectrum."
              : "把 32 个采样排成一圈，每折一次就做一轮蝶形运算。折五次，再把频谱展开。"}
          </p>
        </header>
        <FftWorkshop english={english} />
        <section className="fft-explanation">
          <h2>
            {english
              ? "Where the savings come from"
              : "为什么折一下就能少算很多？"}
          </h2>
          <p>
            {english
              ? "A 2m-point transform splits into an m-point transform of the even samples and another of the odd samples. The same two numbers produce X[q] and X[q + m]. The second result changes just the sign of the rotated odd term."
              : "一段长度为 2m 的序列，可以拆成偶数下标和奇数下标两组，各做一次 m 点变换。每对结果同时给出 X[q] 和 X[q + m]，所差的只是奇数组旋转后取加号还是减号。"}
          </p>
          <p>
            {english
              ? "Each fold does 16 butterflies. Five folds use 80 butterflies for the full 32-point transform."
              : "圆盘每折一次做 16 组蝶形运算，5 折共 80 组。直接算 DFT 时，32 个频点各自都要把 32 项加起来。"}
          </p>
          <p className="fft-source">
            {english
              ? "Disk choreography and the mixed signal are adapted from Claude’s Mathematics Spectacle 06."
              : "圆盘折叠和默认混合波沿用 Claude《数学奇观 06 · FFT 折叠》的定稿。"}
          </p>
        </section>
      </div>
    </main>
  );
}
