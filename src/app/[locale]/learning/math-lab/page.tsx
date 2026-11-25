import "./math-lab.css";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { FFT_SIZE } from "@/lib/math-lab/fft";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const experiments = [
  {
    path: "factorization",
    label: { zh: "因式工坊", en: "Factorization" },
    description: {
      zh: "把面积拼成长方形，读出多项式的因式。",
      en: "Build a rectangle and read off its factors.",
    },
  },
  {
    path: "rotations",
    label: { zh: "旋转工坊", en: "3D rotations" },
    description: {
      zh: "转动三维方块，看旋转次序和四元数。",
      en: "Turn a cube to see rotation order and quaternions.",
    },
  },
  {
    path: "galois",
    label: { zh: "群论工坊", en: "Galois theory" },
    description: {
      zh: "交换方程的根，找出五次方程的障碍。",
      en: "Permute roots and find what changes at degree five.",
    },
  },
  {
    path: "folding",
    label: { zh: "折叠工坊", en: "Paper folding" },
    description: {
      zh: "沿折线翻转色块，拼出目标图案。",
      en: "Fold colored pieces to match the target pattern.",
    },
  },
  {
    path: "klotski",
    label: { zh: "华容道", en: "Huarong Dao" },
    description: {
      zh: "滑动方块闯关，再用数学判断局面有无解。",
      en: "Slide the blocks, then work out which boards are solvable.",
    },
  },
] as const;

function LabIllustration({
  type,
}: {
  type: (typeof experiments)[number]["path"];
}) {
  if (type === "factorization") {
    return (
      <div className="lab-art lab-art-factor" aria-hidden="true">
        <span>x²</span>
        <span>x</span>
        <span>x</span>
        <span>1</span>
      </div>
    );
  }
  if (type === "rotations") {
    return (
      <div className="lab-art lab-art-rotation" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>α</span>
      </div>
    );
  }
  if (type === "galois") {
    return (
      <div className="lab-art lab-art-group" aria-hidden="true">
        <span>S₅</span>
        <i>↻</i>
        <span>A₅</span>
      </div>
    );
  }
  if (type === "folding") {
    return (
      <div className="lab-art lab-art-fold" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }
  return (
    <div className="lab-art lab-art-sliding" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

function DiskPoster() {
  return (
    <div className="lab-poster" aria-hidden="true">
      <div className="lab-poster-disc">
        {Array.from({ length: FFT_SIZE }, (_, k) => (
          <span
            key={k}
            className={
              k < FFT_SIZE / 2 ? "lab-poster-teal" : "lab-poster-coral"
            }
            style={{ rotate: `${(360 * k) / FFT_SIZE}deg` }}
          >
            <i data-peak={[0, 5, 7, 12, 20, 25, 27].includes(k)} />
          </span>
        ))}
        <b />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Mathematics Lab" : "数学实验室",
    description:
      locale === "en"
        ? "Interactive experiments in Fourier transforms, algebra, geometry, and sliding puzzles."
        : "用六个交互实验探索快速傅里叶变换、代数、几何与益智谜题。",
    path: "/learning/math-lab",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const english = language === "en";
  const prefix = english ? "/en" : "";
  const labHref = prefix + "/learning/math-lab";

  return (
    <main className="math-lab">
      <div className="lab-shell">
        <header className="lab-intro">
          <div>
            <h1>{english ? "Mathematics Lab" : "数学实验室"}</h1>
            <p>
              {english
                ? "Fold a signal, turn a cube, or solve a sliding puzzle."
                : "折一个圆盘，转一转方块，或者解一道华容道。"}
            </p>
          </div>
          <a href="#experiments" className="lab-jump">
            {english ? "All experiments" : "全部实验"}{" "}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </header>

        <Link className="lab-feature" href={labHref + "/fft/"}>
          <div className="lab-feature-copy">
            <p>{english ? "Fast Fourier Transform" : "快速傅里叶变换"}</p>
            <h2>{english ? "Fold the circle five times" : "把圆折五次"}</h2>
            <div className="lab-feature-description">
              {english
                ? "Follow 32 samples from the folding disk to the frequency spectrum."
                : "看 32 个采样怎样两两配对，从时域折出频谱。"}
            </div>
            <span className="lab-feature-cta">
              {english ? "Open the FFT experiment" : "进入 FFT 实验"}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
          <DiskPoster />
        </Link>

        <section
          className="lab-shelf"
          id="experiments"
          aria-labelledby="lab-experiments-title"
        >
          <div className="lab-shelf-heading">
            <h2 id="lab-experiments-title">
              {english ? "More experiments" : "更多实验"}
            </h2>
            {english && <p>The five workshops below are in Chinese.</p>}
          </div>
          <div className="lab-cards">
            {experiments.map((experiment) => (
              <Link
                key={experiment.path}
                className="lab-card"
                href={`${labHref}/${experiment.path}/`}
              >
                <div
                  className={`lab-card-picture lab-picture-${experiment.path}`}
                >
                  <LabIllustration type={experiment.path} />
                </div>
                <div className="lab-card-copy">
                  <div className="lab-card-title">
                    <h3>{experiment.label[language]}</h3>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </div>
                  <p>{experiment.description[language]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="lab-related">
          <Link href={prefix + "/learning/math-map/"}>
            {english ? "Mathematics Map" : "数学知识网"}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href={prefix + "/learning/k12/mathematics/"}>
            {english ? "School mathematics" : "中小学数学知识网"}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
