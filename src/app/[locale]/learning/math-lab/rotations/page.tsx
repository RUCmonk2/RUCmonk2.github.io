import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { RotationWorkshop } from "@/components/math-lab/rotation-workshop";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Rotation Workshop" : "旋转工坊",
    description:
      locale === "en"
        ? "Explore quaternions and 3D rotations through four interactive experiments: axis-angle, rotation order, gimbal lock and smooth interpolation. Activities are in Chinese."
        : "从可见的三维姿态出发，通过轴角、旋转次序、万向锁与平滑插值四组交互实验，理解四元数与三维旋转。",
    path: "/learning/math-lab/rotations",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";

  return (
    <K12Shell locale={language} active="lab">
      <header className="k12-hero k12-hero-compact rotation-hero">
        <span className="notes-overline">02 / ROTATION WORKSHOP</span>
        <h1>旋转工坊</h1>
        <p className="rotation-hero-subtitle">四元数与三维旋转</p>
        <p>
          一根轴、一个角，怎样变成一次三维旋转？从可见的姿态出发，探索四元数、旋转次序与平滑插值。
        </p>
        <div className="k12-hero-meta">
          <span>3D 可交互</span>
          <span>四组实验</span>
          <span>可选推导</span>
        </div>
      </header>
      <RotationWorkshop locale={language} />
    </K12Shell>
  );
}
