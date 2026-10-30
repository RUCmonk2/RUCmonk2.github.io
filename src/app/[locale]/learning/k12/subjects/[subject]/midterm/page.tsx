import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { MathProse } from "@/components/math-map/lesson-reader";
import styles from "@/components/physics/midterm.module.css";
import {
  CapacitorExperiment,
  DeflectionExperiment,
} from "@/components/physics/midterm-experiments";
import { MidtermQuestionDiagram } from "@/components/physics/midterm-question-diagram";
import { MidtermVideo } from "@/components/physics/midterm-video";
import { MockExamEntry } from "@/components/physics/mock-exam-entry";
import { physicsFormulaHref } from "@/data/physics-formulas";
import {
  midtermHref,
  midtermSchedule,
  midtermUpdated,
} from "@/data/physics-midterm";
import questions from "@/data/physics-midterm/questions.json";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; subject: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ subject: "physics" }];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, subject } = await params;
  if (subject !== "physics") notFound();
  return constructMetadata({
    title: "必修三第九、十章 · 期中复习",
    description:
      "11 分 10 秒动画与 120 分钟课堂路线，串起静电场中的力、功与能。含分章视频、例题与变式、互动实验、模拟卷及教师和学生 PDF。",
    path: midtermHref,
    locale: locale as Locale,
  });
}
function Question({ id }: { id: string }) {
  const question = questions.items.find((item) => item.id === id);
  if (!question) return null;
  return (
    <article className={styles.question} id={`question-${question.id}`}>
      <header>
        <span>{question.id}</span>
        <h3>{question.title}</h3>
        <a
          href={`#question-${question.id}`}
          aria-label={`链接到 ${question.id}`}
        >
          #
        </a>
      </header>
      <MathProse>{question.prompt.replace(/\n+/g, "\n\n")}</MathProse>
      <MidtermQuestionDiagram id={id} />
      <details className={styles.answer}>
        <summary>做完再展开 · 答案与步骤</summary>
        <div className={styles.result}>
          <MathProse>{question.answer}</MathProse>
        </div>
        <ol>
          {question.steps.map((step, index) => (
            <li key={index}>
              <MathProse>{step}</MathProse>
            </li>
          ))}
        </ol>
        {question.pitfalls.length > 0 && (
          <div className={styles.pitfalls}>
            <strong>检查容易丢的分</strong>
            <ul>
              {question.pitfalls.map((item, index) => (
                <li key={index}>
                  <MathProse>{item}</MathProse>
                </li>
              ))}
            </ul>
          </div>
        )}
      </details>
    </article>
  );
}
export default async function Page({ params }: Props) {
  const { locale, subject } = await params;
  if (subject !== "physics") notFound();
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} section="subjects" active="physics">
      <div className={styles.page} lang="zh-CN">
        <header className="k12-hero k12-hero-compact">
          <span className="notes-overline">PHYSICS / MIDTERM REVIEW</span>
          <h1>从场与力，走到功与能</h1>
          <p>
            人教版高中物理必修第三册 ·
            第九章「静电场及其应用」与第十章「静电场中的能量」。用两小时把判断顺序练熟：看场
            → 画力 → 判能量 → 选方程。
          </p>
          <div className="k12-hero-meta">
            <span>120 分钟</span>
            <span>5 道诊断 · 4 组例题与变式 · 3 道检测</span>
            <span>更新于 {midtermUpdated}</span>
          </div>
          <div className={styles.downloads}>
            <a
              className="k12-button"
              href="/assets/physics/midterm-ch9-10-student.pdf"
              download
            >
              下载学生讲义 · A4 PDF ↓
            </a>
            <a
              className="k12-button"
              href="/assets/physics/midterm-ch9-10-teacher.pdf"
              download
            >
              下载教师讲义 · 横屏 PDF ↓
            </a>
          </div>
          <p className={styles.small}>
            网页与两份讲义沿用相同题号；解析默认折叠。先在纸上画图、列式，再展开核对。
          </p>
        </header>
        <MockExamEntry locale={language} />
        <nav className={styles.jumpNav} aria-label="本页复习目录">
          <a href="#video">动画串讲</a>
          <a href="#schedule">课堂路线</a>
          <a href="#diagnosis">开场诊断</a>
          <a href="#core">例题与变式</a>
          <a href="#experiments">互动实验</a>
          <a href="#exit">独立检测</a>
          <a href="#review">考前速查</a>
        </nav>
        <MidtermVideo />
        <section className={styles.section} id="schedule">
          <div className={styles.sectionHeading}>
            <span>01</span>
            <div>
              <h2>120 分钟，按这个顺序走</h2>
              <p>
                每组都先讲一道，再改一个条件让学生独立做。概念不稳时，减少复杂计算，把时间留给方向、正负号和最后检测。
              </p>
            </div>
          </div>
          <ol className={styles.schedule}>
            {midtermSchedule.map((item) => (
              <li key={item.time}>
                <span>
                  {item.time}
                  <small>分钟</small>
                </span>
                <div>
                  <a href={item.href}>{item.title} ↗</a>
                  <p>{item.goal}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.section} id="diagnosis">
          <div className={styles.sectionHeading}>
            <span>02</span>
            <div>
              <h2>开场诊断 · 先做，再决定哪里多讲</h2>
              <p>
                用 5–7
                分钟独立作答，剩余时间说理由。做错的题号直接对应后面的复习重点。
              </p>
            </div>
          </div>
          <div className={styles.questionStack}>
            {["D1", "D2", "D3", "D4", "D5"].map((id) => (
              <Question key={id} id={id} />
            ))}
          </div>
        </section>
        <section className={styles.section} id="core">
          <div className={styles.sectionHeading}>
            <span>03</span>
            <div>
              <h2>四组例题 · 每次只改变一个关键条件</h2>
              <p>
                L 是带讲例题，V
                是独立变式。学生先说“对象、过程、方向、已知量”，再代数值。
              </p>
            </div>
          </div>
          <div className={styles.conceptGrid}>
            <div>
              <h3>场与力</h3>
              <MathProse>{String.raw`$\vec F=q\vec E$。电场方向按正试探电荷受力定义；负电荷的力反向。叠加的是电场矢量。`}</MathProse>
            </div>
            <div>
              <h3>功与能</h3>
              <MathProse>{String.raw`$U_{AB}=\varphi_A-\varphi_B$，$W_{AB}=qU_{AB}=-\Delta E_p$。先保留电荷量的正负号。`}</MathProse>
            </div>
            <div>
              <h3>电容器</h3>
              <MathProse>{String.raw`先判断固定 $U$ 还是固定 $Q$，再用 $C=\varepsilon_0\varepsilon_r S/d$、$Q=CU$、$E=U/d$。`}</MathProse>
            </div>
            <div>
              <h3>带电粒子</h3>
              <MathProse>{String.raw`加速过程用功与动能变化；垂直入场的偏转先分解运动，并检查是否碰板。`}</MathProse>
            </div>
          </div>
          {[1, 2, 3, 4].map((number) => (
            <div className={styles.questionPair} key={number}>
              <Question id={`L${number}`} />
              <Question id={`V${number}`} />
            </div>
          ))}
        </section>
        <section className={styles.section} id="experiments">
          <div className={styles.sectionHeading}>
            <span>04</span>
            <div>
              <h2>先预测，再用实验检查</h2>
              <p>
                每次只调一个量，说清“哪个量不变、哪条关系决定变化”。偏转实验默认参数与
                L4 一致，可直接检查讲义答案。
              </p>
            </div>
          </div>
          <CapacitorExperiment />
          <DeflectionExperiment />
        </section>
        <section className={styles.section} id="exit">
          <div className={styles.sectionHeading}>
            <span>05</span>
            <div>
              <h2>最后 12 分钟 · 独立检测</h2>
              <p>
                先关掉上面的解析。会画图、会判断正负号、能列出第一条正确的式子，比口头说“懂了”更可靠。
              </p>
            </div>
          </div>
          <div className={styles.questionStack}>
            {["E1", "E2", "E3"].map((id) => (
              <Question key={id} id={id} />
            ))}
          </div>
        </section>
        <section className={styles.section} id="review">
          <div className={styles.sectionHeading}>
            <span>06</span>
            <div>
              <h2>考前速查 · 六个判断动作</h2>
              <p>
                考前从错过的题目里选三道，遮住解析重做。能讲清错误原因，再算真正订正。
              </p>
            </div>
          </div>
          <ol className={styles.checklist}>
            <li>
              <strong>电场方向、受力方向、运动方向分开画。</strong>
              运动方向不直接决定受力方向。
            </li>
            <li>
              <strong>库仑定律先检查点电荷模型。</strong>
              比较场强时，不把试探电荷的变化误认为电场本身变化。
            </li>
            <li>
              <strong>场强大，不等于电势高。</strong>
              沿电场方向电势降低；电势能还取决于电荷的符号。
            </li>
            <li>
              <strong>写清起点、终点。</strong>
              <MathProse>{String.raw`$U_{AB}=\varphi_A-\varphi_B$，$\Delta E_p=E_{pB}-E_{pA}$。`}</MathProse>
            </li>
            <li>
              <strong>电容器先圈出不变量。</strong>理想电源保持
              U；断开且不漏电保持 Q。静电平衡导体内部 E = 0，导体为等势体。
            </li>
            <li>
              <strong>粒子运动分段处理。</strong>
              加速段、偏转段分别建模；是否计重力、能否到达、会不会撞板，都要回到题目条件。
            </li>
          </ol>
          <div className={styles.nextLinks}>
            <Link href={prefix + physicsFormulaHref}>继续读公式推导图 ↗</Link>
            <Link href={prefix + "/learning/k12/subjects/physics"}>
              返回物理学习目录 →
            </Link>
          </div>
          <p className={styles.small}>
            依据人教版普通高中教科书《物理》必修第三册第九、十章范围整理；本页题目和互动为独立编写。课堂范围以学校本次考试要求为准。
          </p>
        </section>
      </div>
    </K12Shell>
  );
}
