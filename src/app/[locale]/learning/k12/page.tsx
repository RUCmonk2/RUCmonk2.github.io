import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "next-intl";

import { K12Shell } from "@/components/k12/k12-shell";
import { SubjectDirectory } from "@/components/k12/subject-directory";
import { k12Topics } from "@/data/k12";
import {
  curriculumSources,
  schoolDirectory,
  schoolProjects,
  subjectHref,
  subjectModuleCount,
} from "@/data/k12-subjects";
import { constructMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: locale === "en" ? "School Learning Atlas" : "中小学全科学习导航",
    description:
      "小学、初中、高中各学科的知识主线、学习任务、检查要点与跨学科项目，服务自学和家教备课。",
    path: "/learning/k12",
    locale: locale as Locale,
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  const prefix = language === "en" ? "/en" : "";
  return (
    <K12Shell locale={language} section="subjects">
      <header className="k12-hero">
        <span className="notes-overline">
          SCHOOL LEARNING / UNDERSTAND · PRACTISE · CONNECT
        </span>
        <h1>从一门课，认识更大的世界。</h1>
        <p>
          给中小学生一张能找到起点的学习地图，也给家教课堂一份可反复使用的备课目录。看看要学什么、怎样练习，再把相邻学科连起来。
        </p>
        <div className="k12-hero-meta">
          <span>{schoolDirectory.length} 个学科入口</span>
          <span>小学 · 初中 · 高中</span>
          <span>{subjectModuleCount} 个学习框架模块</span>
          <span>数学另有 {k12Topics.length} 节详细讲义</span>
        </div>
      </header>
      <div className="subject-start-grid">
        <section>
          <span className="notes-overline">FOR LEARNERS</span>
          <h2>自己学</h2>
          <p>
            先选学段和学科，读起步要求，再做一个具体任务。完成后展开检查要点；卡住时回到知识主线补基础。
          </p>
          <a href="#subjects">选一个学科 ↓</a>
        </section>
        <section>
          <span className="notes-overline">FOR TUTORING</span>
          <h2>一起上课</h2>
          <p>
            先让学生解释已有理解，再用任务观察困难在哪里。把“概念不清、步骤不熟、表达欠缺”分开记录，下一次课再检查。
          </p>
          <a href="#teaching">查看备课方法 ↓</a>
        </section>
        <section>
          <span className="notes-overline">READY TO EXPLORE</span>
          <h2>数学已经可以深入学</h2>
          <p>
            三张知识网、双模式讲义、逐步例题与练习解答；因式工坊支持面积探索、随机题和分层提示。
          </p>
          <Link href={prefix + "/learning/k12/mathematics"}>
            进入数学知识网 →
          </Link>
        </section>
      </div>
      <SubjectDirectory locale={language} />
      <section
        className="subject-projects"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="note-section-heading">
          <h2 id="projects-title">把几门课用在同一个问题里</h2>
          <span>六个可开展的小项目</span>
        </div>
        <div className="k12-path-grid">
          {schoolProjects.map((project) => (
            <article id={project.id} key={project.id}>
              <span className="notes-overline">{project.stage}</span>
              <h3>{project.title}</h3>
              <p>{project.question}</p>
              <div className="subject-project-links">
                {project.subjects.map((id) => (
                  <Link href={prefix + subjectHref(id)} key={id}>
                    {schoolDirectory.find((s) => s.id === id)!.title}
                  </Link>
                ))}
              </div>
              <details>
                <summary>展开步骤与交付成果</summary>
                <ol className="subject-project-steps">
                  {project.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p>
                  <strong>最后留下：</strong>
                  {project.result}
                </p>
              </details>
            </article>
          ))}
        </div>
      </section>
      <section className="k12-guidance note-article" id="teaching">
        <div className="note-prose">
          <h2>把框架变成一节家教课</h2>
          <ol>
            <li>
              <strong>从一道任务开始诊断。</strong>
              先听学生如何解释；不要先演示完整解法，再把模仿成功当作已经掌握。
            </li>
            <li>
              <strong>一次解决一个主要困难。</strong>
              概念不清就用具体事物或反例，步骤不熟就分步练习，表达不清就追问依据。
            </li>
            <li>
              <strong>换一道情境相近的任务。</strong>
              减少提示，观察能否迁移。数学检查数值和条件，文科检查材料和论证，实践课程检查过程与成果。
            </li>
            <li>
              <strong>留下下次能复查的记录。</strong>
              记“学生能独立做什么、仍需什么提示、下次怎样检查”，而不是只写完成了几页。
            </li>
          </ol>
          <p>
            同一模块可以跨多次课学习；页面顺序是导航，不要求按顺序一次学完。
          </p>
        </div>
      </section>
      <section className="subject-sources" id="scope">
        <h2>覆盖范围与课程依据</h2>
        <p>
          以中国大陆普通小学、初中和高中为范围。外语任务当前以英语为主；艺术合并呈现音乐、美术及其他艺术形式；初中综合科学与分科安排并列说明。地方课程、校本课程和其他外语独立讲义尚未展开。
        </p>
        <p>
          目前数学提供完整双模式讲义，其余学科提供分学段知识框架、原创任务、检查要点与误区。这些模块用于导航和起步，不能等同逐知识点教材，也不是各地统一的年级进度表。
        </p>
        <p>
          课程范围参照以下文件，本站的分组、例子与学习路线独立编写。实际开课和高中选学内容请结合在用教材。
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
    </K12Shell>
  );
}
