import { ArrowRight, BookOpen, Network, Shapes } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { K12Catalog } from "@/components/k12/k12-catalog";
import { K12Shell } from "@/components/k12/k12-shell";
import {
  k12LessonHref,
  k12Routes,
  k12Sources,
  k12Stages,
  k12Topics,
} from "@/data/k12";
import { constructMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "School Mathematics Atlas" : "中小学数学知识网",
    description:
      "小学、初中、高中完整数学主干：知识网、双模式详细讲义、逐步例题、练习解答与家教实验室。",
    path: "/learning/k12",
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language}>
      <header className="k12-hero">
        <span className="notes-overline">
          MATHEMATICS / UNDERSTAND · PRACTISE · CONNECT
        </span>
        <h1>从一个问题，走进数学。</h1>
        <p>
          给中小学生的自学讲义，也给家教课堂一张能反复使用的地图。知道从哪里开始，弄懂每一步为什么，再用一道新题检查自己。
        </p>
        <div className="k12-hero-meta">
          <span>{k12Topics.length} 节完整讲义</span>
          <span>从零理解 / 严谨表述</span>
          <span>例题 · 提示 · 参考解答</span>
        </div>
      </header>
      <section className="k12-stage-grid" aria-label="按学段开始">
        {k12Stages.map((stage, index) => (
          <article className="k12-stage-card" key={stage.id}>
            <span className="notes-overline">
              0{index + 1} / {stage.en.toUpperCase()}
            </span>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
            <span className="k12-card-meta">
              {k12Topics.filter((topic) => topic.stage === stage.id).length} 节
              ·{" "}
              {stage.id === "high"
                ? "必修、选择性必修与拓展分开标记"
                : "按概念学习，按先修关系补基础"}
            </span>
            <div>
              <Link href={prefix + "/learning/k12/" + stage.id}>
                <Network size={15} />
                探索知识网
              </Link>
              <Link
                href={
                  prefix +
                  k12LessonHref(
                    k12Topics.find((topic) => topic.stage === stage.id)!.id,
                  )
                }
              >
                <BookOpen size={15} />
                从第一节开始
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="k12-start note-article">
        <div>
          <span className="notes-overline">A SMALL EXPERIMENT</span>
          <h2>把一个式子，拼成一个长方形。</h2>
          <p>
            因式工坊把面积、整式乘法和因式分解连在一起。先动手看懂，再换一道同类题，提示可以一层一层展开。
          </p>
          <Link
            className="k12-button"
            href={prefix + "/learning/math-lab/factorization"}
          >
            <Shapes size={16} />
            打开因式工坊
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="k12-start-equation" aria-hidden="true">
          <span>一个整体</span>
          <strong>↔</strong>
          <span>几块相加</span>
        </div>
      </section>
      <section className="k12-paths" aria-labelledby="paths-title">
        <div className="note-section-heading">
          <h2 id="paths-title">不知道从哪里开始？选一条路线</h2>
          <span>每一站都能回看先修</span>
        </div>
        <div className="k12-path-grid">
          {k12Routes.map((route) => (
            <article key={route.id}>
              <h3>{route.title}</h3>
              <p>{route.description}</p>
              <ol>
                {route.nodes.map((id) => (
                  <li key={id}>
                    <Link href={prefix + k12LessonHref(id)}>
                      {k12Topics.find((topic) => topic.id === id)!.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
      <K12Catalog locale={language} />
      <section className="k12-guidance note-article">
        <div className="note-prose">
          <h2>怎样用这套内容</h2>
          <h3>自己学</h3>
          <p>
            先看本节目标与先修，用“从零理解”完成例题，再独立尝试三道练习。卡住时回到具体步骤；答案只在你主动展开后出现。严谨表述帮助你核对条件与边界。
          </p>
          <h3>一起上课</h3>
          <p>
            老师可从某个薄弱点进入，先让学生解释，再用例题和变式检查。因式工坊支持固定题号和分层提示；讲义可打印，展开的答案是否打印由你决定。
          </p>
          <h3>范围与依据</h3>
          <p>
            按中国大陆小学、初中和高中数学主干组织；高中选择性必修与拓展单独标记。各地教材安排有差异，目录顺序是学习建议。讲解与题目独立编写，课标用于核对范围。
          </p>
          <ul>
            {k12Sources.map((source) => (
              <li key={source.id}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </K12Shell>
  );
}
