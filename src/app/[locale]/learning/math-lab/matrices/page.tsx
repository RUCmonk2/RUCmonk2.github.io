import "../math-lab.css";
import "../algorithm-notebook.css";

import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { MatrixWorkshop } from "@/components/algorithm-lab/matrix-workshop";
import { NotebookPage } from "@/components/algorithm-lab/notebook-page";
import { words } from "@/lib/math-lab/graph-algorithms";
import { constructMetadata } from "@/lib/metadata";

const title = words("矩阵运算与分解", "Matrix operations and factorization");
const description = words(
  "选一个输出格算矩阵乘法，追踪 LU 的换行和消元，再把 SVD 的输出按秩重构。",
  "Compute one product entry, follow the row swaps in pivoted LU, and reconstruct a matrix at two SVD ranks.",
);
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: title[lang],
    description: description[lang],
    path: "/learning/math-lab/matrices",
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <NotebookPage locale={locale} title={title} description={description}>
      <MatrixWorkshop english={locale === "en"} />
    </NotebookPage>
  );
}
