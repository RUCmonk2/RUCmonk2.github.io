import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { MathProse } from "@/components/math-map/lesson-reader";
import base from "@/components/physics/midterm.module.css";
import styles from "@/components/physics/mock-exam.module.css";
import { MockExamDiagram } from "@/components/physics/mock-exam-diagram";
import { midtermHref } from "@/data/physics-midterm";
import {
  mockExamHref,
  mockExamUpdated,
  type MockQuestion,
  mockQuestions,
  mockSections,
} from "@/data/physics-midterm/mock-exam";
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
    title: "静电场 · 90分钟期中模拟卷",
    description:
      "人教版物理必修三第九、十章原创北京风格模拟：20题、100分、90分钟，含学生PDF、完整解析、分步评分与关键示意图。",
    path: mockExamHref,
    locale: locale as Locale,
  });
}
function Prose({ children }: { children: string }) {
  return (
    <MathProse>{children.replace(/(?<!\n)\n(?!\n|\|)/g, "\n\n")}</MathProse>
  );
}
function Question({ question }: { question: MockQuestion }) {
  return (
    <article
      className={`${base.question} ${styles.question}`}
      id={`q-${question.id}`}
    >
      <header>
        <span>{String(question.id).padStart(2, "0")}</span>
        <h3>第 {question.id} 题</h3>
        <span className={styles.points}>{question.points} 分</span>
        <a href={`#q-${question.id}`} aria-label={`链接到第${question.id}题`}>
          #
        </a>
      </header>
      <Prose>{question.prompt}</Prose>
      <MockExamDiagram
        name={question.diagram}
        description={question.diagram_spec}
      />
      {question.table && (
        <div className="mathmap-notation-scroll" tabIndex={0}>
          <table>
            <thead>
              <tr>
                {question.table.headers.map((header, index) => (
                  <th key={index} scope="col">
                    <Prose>{header}</Prose>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {question.table.rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, column) =>
                    column === 0 ? (
                      <th key={column} scope="row">
                        <Prose>{cell}</Prose>
                      </th>
                    ) : (
                      <td key={column}>
                        <Prose>{cell}</Prose>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {question.options && (
        <ol className={styles.options}>
          {Object.entries(question.options).map(([letter, text]) => (
            <li key={letter}>
              <strong>{letter}.</strong>
              <Prose>{text}</Prose>
            </li>
          ))}
        </ol>
      )}
      {question.parts && (
        <div className={styles.parts}>
          {question.parts.map((part) => (
            <div key={part.label}>
              <span>
                （{part.label}）<small>{part.points} 分</small>
              </span>
              <Prose>{part.question}</Prose>
            </div>
          ))}
        </div>
      )}
      <details className={base.answer}>
        <summary>交卷后展开 · 答案、解析与评分</summary>
        {question.answer && (
          <div className={base.result}>
            <strong>参考答案：{question.answer}</strong>
            <p className={base.small}>
              {question.type === "single"
                ? "选对得 3 分，错选或未选得 0 分。"
                : "全部选对得 4 分，漏选且无错选得 2 分，含错选或未选得 0 分。"}
            </p>
          </div>
        )}
        {question.parts?.map((part) => (
          <section className={styles.solutionPart} key={part.label}>
            <h4>
              第（{part.label}）问 · {part.points} 分
            </h4>
            <div className={base.result}>
              <Prose>{part.answer}</Prose>
            </div>
            <ol>
              {part.steps.map((step, index) => (
                <li key={index}>
                  <Prose>{step}</Prose>
                </li>
              ))}
            </ol>
            <h5>评分标准</h5>
            <ul className={styles.rubric}>
              {part.rubric.map((item, index) => (
                <li key={index}>
                  <strong>{item.points} 分</strong>
                  <Prose>{item.criterion}</Prose>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {question.analysis.length > 0 && (
          <div className={styles.analysis}>
            <h4>{question.options ? "逐项判断" : "解题说明"}</h4>
            {question.analysis.map((item, index) => (
              <Prose key={index}>{item}</Prose>
            ))}
          </div>
        )}
        <div className={base.pitfalls}>
          <strong>订正时检查</strong>
          <Prose>{question.pitfall}</Prose>
          <p className={styles.topic}>
            考查：{question.topic} · 难度：{question.difficulty}
          </p>
        </div>
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
      <div className={`${base.page} ${styles.page}`} lang="zh-CN">
        <header className="k12-hero k12-hero-compact">
          <span className="notes-overline">PHYSICS / ORIGINAL MOCK EXAM</span>
          <h1>静电场 · 90 分钟模拟卷</h1>
          <p>
            人教版高中物理必修第三册第九、十章。按北京地区高中阶段常见考查方式独立编写，覆盖概念辨析、实验、计算与论证；题目均为原创，题量与时间按本次复习需要设计。
          </p>
          <div className="k12-hero-meta">
            <span>20 题 · 满分 100 分</span>
            <span>建议用时 90 分钟</span>
            <span>更新于 {mockExamUpdated}</span>
          </div>
          <div className={base.downloads}>
            <a
              className="k12-button"
              href="/assets/physics/mock-ch9-10-student.pdf"
              download
            >
              下载学生模拟卷 · PDF ↓
            </a>
            <a
              className="k12-button"
              href="/assets/physics/mock-ch9-10-solutions.pdf"
              download
            >
              下载教师解析与评分 · PDF ↓
            </a>
          </div>
          <p className={base.small}>
            独立测验时，建议下载学生卷、另用计时工具，在纸上作答。完成后再展开本页解析，按评分标准订正；主观题由教师结合过程判分。
          </p>
          <Link className="notes-back" href={prefix + midtermHref}>
            ← 返回两小时串讲与互动实验
          </Link>
        </header>
        <div className={styles.examLayout}>
          <aside className={styles.directory} id="exam-directory">
            <details open>
              <summary>试卷目录 · 按题型跳转</summary>
              <nav aria-label="模拟卷题型目录">
                {mockSections.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>
                    <span>{section.title}</span>
                    <small>{section.points} 分</small>
                  </a>
                ))}
              </nav>
              <div className={styles.numberLinks} aria-label="按题号跳转">
                {mockQuestions.map((question) => (
                  <a
                    key={question.id}
                    href={`#q-${question.id}`}
                    aria-label={`跳到第${question.id}题`}
                  >
                    {String(question.id).padStart(2, "0")}
                  </a>
                ))}
              </div>
              <p>
                单选 36 + 多选 16
                <br />
                实验 12 + 解答 36
              </p>
            </details>
          </aside>
          <div className={styles.examBody}>
            {mockSections.map((section, index) => (
              <section
                className={styles.examSection}
                id={section.id}
                key={section.id}
              >
                <div className={base.sectionHeading}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>
                      {section.title} <small>{section.points} 分</small>
                    </h2>
                    <p>{section.instruction}</p>
                  </div>
                </div>
                <div className={base.questionStack}>
                  {mockQuestions
                    .filter((question) => question.type === section.type)
                    .map((question) => (
                      <Question key={question.id} question={question} />
                    ))}
                </div>
                <a className={styles.backToDirectory} href="#exam-directory">
                  返回试卷目录 ↑
                </a>
              </section>
            ))}
          </div>
        </div>
        <section className={styles.finish}>
          <h2>做完以后，按错误原因订正</h2>
          <p>
            先核对概念与方向，再看方程、符号和单位。主观题以物理依据和推导过程为准；正确的其他解法可参照对应步骤给分，同一错误不重复扣分。
          </p>
          <p>
            把丢分题对应到串讲中的“场与力、功与能、电容器、加速与偏转”，重做一题同类变式，再检查是否能独立完成。
          </p>
          <Link className="k12-button" href={prefix + midtermHref}>
            回到串讲专题，按薄弱点复习 →
          </Link>
        </section>
      </div>
    </K12Shell>
  );
}
