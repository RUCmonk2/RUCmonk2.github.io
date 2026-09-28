import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import {
  curriculumSources,
  schoolDirectory,
  schoolStages,
  schoolSubjects,
  subjectAtlasHref,
  subjectConceptHref,
  subjectHref,
} from "@/data/k12-subjects";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; subject: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return schoolSubjects.map((subject) => ({ subject: subject.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, subject: id } = await params;
  const subject = schoolSubjects.find((s) => s.id === id);
  if (!subject) notFound();
  return constructMetadata({
    title:
      locale === "en"
        ? subject.en + " · School Learning"
        : subject.title + " · 中小学知识图谱",
    description: subject.intro,
    path: subjectHref(id),
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale, subject: id } = await params;
  const subject = schoolSubjects.find((s) => s.id === id);
  if (!subject) notFound();
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} section="subjects" active={id}>
      <header className="k12-hero k12-hero-compact">
        <span className="notes-overline">
          SCHOOL LEARNING / {subject.en.toUpperCase()}
        </span>
        <h1>{subject.title}</h1>
        <p>{subject.intro}</p>
        <div className="k12-hero-meta">
          <span>{subject.stages.length} 张学段知识图谱</span>
          <span>
            {subject.stages.reduce((n, stage) => n + stage.modules.length, 0)}{" "}
            个模块 · 知识讲解与综合任务
          </span>
          <a href="#method">怎样学这门课 ↓</a>
        </div>
      </header>
      <section className="subject-method note-article" id="method">
        <h2>怎样学这门课</h2>
        <p>{subject.method}</p>
        <p className="subject-scope">{subject.note}</p>
        <p className="subject-scope">
          进入学段知识网，可切换「从零理解 /
          严谨表述」，阅读每个知识点的解释、例子、辨析与自测。下面保留模块任务，适合串联练习和备课。
        </p>
      </section>
      <div className="k12-reader-layout subject-layout">
        <aside className="k12-reader-sidebar">
          <h2>学习路线</h2>
          <p>按需要选一个起点，逐步补齐基础。</p>
          <nav aria-label="分学段目录">
            {subject.stages.map((stage) => (
              <Link key={stage.id} href={"#" + stage.id}>
                {schoolStages.find((s) => s.id === stage.id)!.title} ·{" "}
                {stage.modules.length} 个模块
              </Link>
            ))}
          </nav>
          <h2>相邻学科</h2>
          <nav aria-label="相关学科">
            {subject.connections.map((related) => (
              <Link href={prefix + subjectHref(related)} key={related}>
                {schoolDirectory.find((s) => s.id === related)!.title} ↗
              </Link>
            ))}
          </nav>
          <Link
            href={prefix + "/learning/k12/#subjects"}
            className="notes-back"
          >
            ← 返回全科目录
          </Link>
        </aside>
        <div className="subject-curriculum">
          <nav className="subject-stage-tabs" aria-label="跳到学段">
            {subject.stages.map((stage) => (
              <a href={"#" + stage.id} key={stage.id}>
                {schoolStages.find((s) => s.id === stage.id)!.title}
              </a>
            ))}
          </nav>
          {subject.stages.map((stage) => (
            <section className="subject-stage" id={stage.id} key={stage.id}>
              <header>
                <span className="notes-overline">{stage.id.toUpperCase()}</span>
                <h2>
                  {schoolStages.find((s) => s.id === stage.id)!.title} ·{" "}
                  {subject.title}
                </h2>
                <p>{stage.goal}</p>
                <Link
                  className="k12-button subject-map-entry"
                  href={prefix + subjectAtlasHref(id, stage.id)}
                >
                  进入{schoolStages.find((s) => s.id === stage.id)!.title}知识网
                  · {stage.modules.reduce((n, m) => n + m.topics.length, 0)}{" "}
                  个知识点 ↗
                </Link>
                <div className="subject-entry">
                  <strong>从这里起步</strong>
                  <p>{stage.entry}</p>
                </div>
              </header>
              <ol className="subject-route">
                {stage.modules.map((module) => (
                  <li key={module.id}>
                    <a href={`#${stage.id}-${module.id}`}>{module.title}</a>
                  </li>
                ))}
              </ol>
              {stage.modules.map((module, index) => (
                <article
                  className="subject-module"
                  id={`${stage.id}-${module.id}`}
                  key={module.id}
                >
                  <div className="subject-module-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{module.title}</h3>
                    <a
                      href={`#${stage.id}-${module.id}`}
                      aria-label={"链接到" + module.title}
                    >
                      #
                    </a>
                  </div>
                  <h4>知识主线</h4>
                  <ul className="subject-topics">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topic}>
                        <Link
                          className="subject-topic-link"
                          href={
                            prefix +
                            subjectConceptHref(
                              id,
                              stage.id,
                              module.id,
                              topicIndex,
                            )
                          }
                        >
                          {topic} ↗
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="subject-task">
                    <h4>动手做一件事</h4>
                    <p>{module.task}</p>
                    <details>
                      <summary>做完后，展开检查要点</summary>
                      <p>{module.check}</p>
                    </details>
                  </div>
                  <p className="subject-mistake">
                    <strong>容易卡住的地方</strong>
                    {module.mistake}
                  </p>
                </article>
              ))}
            </section>
          ))}
          {id === "foreign-languages" && (
            <section className="note-article subject-language">
              <h2>如果你学的是其他外语</h2>
              <p>
                日语、俄语以及高中可开设的德语、法语、西班牙语等，需要采用对应语种的课标和教材。上面的听读、交际、写作与来源核查方法可以迁移，具体语言知识需另建学习线。
              </p>
              <ul>
                <li>
                  日语：假名与发音 → 基本句型和助词 → 动词活用 → 语篇与交际。
                </li>
                <li>
                  俄语：字母与重音 → 名词性数格 → 动词变化与体 → 阅读与表达。
                </li>
                <li>
                  德语、法语、西班牙语：分别学习语音、名词和动词变化、句法与交际语境，不能共用一套语法表。
                </li>
              </ul>
              <p>这些语种目前提供衔接提示，尚未整理独立课程模块。</p>
            </section>
          )}
          <section className="subject-related">
            <h2>与其他学科连接</h2>
            <div>
              {subject.connections.map((related) => (
                <Link
                  className="k12-button"
                  href={prefix + subjectHref(related)}
                  key={related}
                >
                  {schoolDirectory.find((s) => s.id === related)!.title} ↗
                </Link>
              ))}
            </div>
            <Link href={prefix + "/learning/k12/#projects"}>
              挑一个跨学科项目 →
            </Link>
          </section>
          <section className="subject-sources">
            <h2>整理依据与使用范围</h2>
            <p>
              参照国家课程范围，模块划分、学习顺序与任务为本站独立整理。顺序不是统一年级课表；高中模块同时包含必修主干与选学方向，具体范围请对照在用教材。
            </p>
            <ul>
              {curriculumSources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </K12Shell>
  );
}
