import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { KlotskiWorkshop } from "@/components/klotski/klotski-workshop";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "Huarong Dao" : "华容道",
    description:
      locale === "en"
        ? "Play Cao Cao’s escape and the 15 puzzle, then explore parity and reachability."
        : "玩曹操华容道和 4×4 数字华容道，再动手学习染色、置换奇偶性与状态搜索。",
    path: "/learning/math-lab/klotski",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";

  return (
    <K12Shell locale={language} active="lab">
      <div className="kl-page">
        <header className="k12-hero kl-hero">
          <span className="notes-overline">05 / HUARONG DAO</span>
          <h1>华容道</h1>
          <p>给曹操腾一条路，或把数字排回原位。再看看这些盘面为什么走得通。</p>
        </header>
        <KlotskiWorkshop />
      </div>
    </K12Shell>
  );
}
