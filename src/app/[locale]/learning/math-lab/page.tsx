import "./math-lab.css";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

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

const algorithmLabs = [
  {
    href: "/learning/math-lab/mst/",
    title: { zh: "最小生成树", en: "Minimum spanning trees" },
    summary: {
      zh: "同图比较 Kruskal、Prim、Borůvka，再看 KKT 的采样和删边。",
      en: "Compare Kruskal, Prim, and Borůvka, then trace KKT sampling and pruning.",
    },
  },
  {
    href: "/learning/math-lab/matrices/",
    title: { zh: "矩阵运算与分解", en: "Matrix operations" },
    summary: {
      zh: "逐格算乘法，分步做带主元 LU，再看 SVD 的秩与重构。",
      en: "Compute product entries, follow pivoted LU, and reconstruct with SVD.",
    },
  },
  {
    href: "/learning/math-lab/directed-graphs/",
    title: { zh: "有向图算法", en: "Directed graphs" },
    summary: {
      zh: "DAG 排序和最短路、Tarjan SCC、有向生成树 DST。",
      en: "DAG ordering and shortest paths, Tarjan SCCs, and rooted arborescences.",
    },
  },
  {
    href: "/learning/lean-lab/",
    title: { zh: "Lean 实验室", en: "Lean Lab" },
    summary: {
      zh: "逐步对照 Lean 代码、证明状态与纸笔推理，从逻辑入门到插入排序。",
      en: "Read the code, proof state, and reasoning together, from basic logic to insertion sort.",
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
        <div className="lab-disc-lobe lab-disc-lobe-paper" />
        <div className="lab-disc-lobe lab-disc-lobe-ink" />
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
        ? "Interactive experiments in Fourier transforms, graph algorithms, matrix factorization, geometry, and sliding puzzles."
        : "交互探索 FFT、图算法、矩阵分解、代数、几何和益智谜题。",
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
            <h2>{english ? "Four numbers, two folds" : "四个数，折两次"}</h2>
            <div className="lab-feature-description">
              {english
                ? "Work out every sum and difference, then unfold the result as a vector."
                : "从 [1, 2, 3, 4] 出发，逐项看圆盘怎么折、矩阵怎么算。"}
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
          aria-labelledby="lab-algorithms-title"
        >
          <div className="lab-shelf-heading">
            <h2 id="lab-algorithms-title">
              {english ? "Algorithms and matrices" : "算法与矩阵"}
            </h2>
          </div>
          <div className="lab-algorithm-grid">
            {algorithmLabs.map((lab) => (
              <Link
                className="lab-card lab-algorithm-card"
                key={lab.href}
                href={prefix + lab.href}
              >
                <div className="lab-card-copy">
                  <div className="lab-card-title">
                    <h3>{lab.title[language]}</h3>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                  <p>{lab.summary[language]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="lab-shelf" aria-labelledby="lab-experiments-title">
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
          <Link
            className="lab-derivation-link"
            href={labHref + "/fft/#derivation"}
          >
            {english ? "FFT derivation and matrices" : "FFT 完整推导与矩阵"}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
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
