import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileText,
  Github,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Icons } from "@/components/icons";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { getBlogPosts, sortPostsByDate } from "@/lib/blog";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { jsonldScript } from "@/lib/utils";

type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: string[];
  authors?: string;
  links?: Array<{ type: string; href: string; icon: string }>;
};

type NewsItem = {
  date: string;
  title: string;
  content: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const t = await getTranslations({ locale });
  const personJsonLd = await generatePersonJsonLd(locale);
  const projects = (t.raw("projects.items") as Project[]) ?? [];
  const news = (t.raw("news.items") as NewsItem[]) ?? [];
  const skills = (t.raw("skills") as string[]) ?? [];
  const latestPost = sortPostsByDate(await getBlogPosts(locale))[0];
  const blogHref = isEnglish ? "/en/blog" : "/blog";
  const articleHref = latestPost ? `${blogHref}/${latestPost.slug}` : blogHref;
  const latestReadingTime =
    latestPost &&
    typeof latestPost.metadata.readingTime === "number" &&
    latestPost.metadata.readingTime > 0
      ? latestPost.metadata.readingTime
      : 5;

  const copy = isEnglish
    ? {
        eyebrow: "YAOZHI YE",
        role: "Undergraduate in Artificial Intelligence",
        institution: "Renmin University of China",
        headline:
          "My current interests center on model architecture and residual connections, with an ongoing curiosity about embodied intelligence.",
        intro:
          "I am learning how to read research carefully, formulate useful questions, and build technical workflows that remain clear over time.",
        email: "Email",
        location: "Beijing, China",
        researchLabel: "Research interests",
        researchTitle: "Current directions",
        researchIntro:
          "I am still at the stage of building foundations. These are the questions and methods I am following most closely.",
        modelTitle: "Model architecture",
        modelText:
          "Learning how architectural choices shape optimization, representation, and behavior.",
        residualTitle: "Residual connections",
        residualText:
          "Using residual pathways as an entry point into deeper questions about modern neural networks.",
        embodiedTitle: "Embodied intelligence",
        embodiedText:
          "Exploring how perception, action, and learning meet in agents that interact with the world.",
        aboutLabel: "Profile",
        aboutTitle: "About",
        education: "Education",
        degree: "Undergraduate in Artificial Intelligence",
        current: "Current",
        newsLabel: "Updates",
        newsTitle: "Recent activity",
        projectsLabel: "Selected work",
        projectsTitle: "Projects and practice",
        projectsIntro:
          "Selected projects through which I have explored product design, rapid prototyping, and reproducible ways of working.",
        details: "Details",
        resourcesLabel: "Open materials",
        resourcesTitle: "Notes and resources",
        codexGuide: "Codex project handoff guide",
        codexDesc:
          "A reusable structure for context, decisions, file maps, and temporary materials.",
        siteGuide: "Personal site guide",
        siteDesc:
          "A practical record of maintaining a personal site with GitHub Pages.",
        archive: "Technical notes archive",
        archiveDesc:
          "Writing on command-line tools, typography, learning, and attention.",
        writingLabel: "Writing",
        writingTitle: "Latest note",
        allWriting: "All writing",
        readArticle: "Read note",
        minutes: "min read",
        contactLabel: "Contact",
        contactTitle: "Get in touch",
        contactText:
          "I am happy to exchange ideas about undergraduate research, AI tools, learning systems, and early-stage projects.",
        writeEmail: "Write an email",
      }
    : {
        eyebrow: "YAOZHI YE",
        role: "人工智能本科生",
        institution: "中国人民大学",
        headline:
          "目前主要关注模型结构与残差连接，并持续保持对具身智能的兴趣。",
        intro:
          "我正在学习如何严谨地阅读论文、形成有价值的问题，并建立能够长期保持清晰的技术工作流。",
        email: "邮件",
        location: "北京",
        researchLabel: "研究兴趣",
        researchTitle: "当前关注方向",
        researchIntro:
          "我仍处在建立基础的阶段。下面是现阶段最希望继续理解的问题与方法。",
        modelTitle: "模型结构",
        modelText: "理解不同结构选择如何影响优化过程、表征能力与模型行为。",
        residualTitle: "残差连接",
        residualText: "以残差路径为入口，逐步理解现代神经网络中的更深层问题。",
        embodiedTitle: "具身智能",
        embodiedText:
          "关注感知、行动与学习如何在真实环境中的智能体上发生联系。",
        aboutLabel: "个人简介",
        aboutTitle: "关于我",
        education: "教育背景",
        degree: "人工智能本科生",
        current: "在读",
        newsLabel: "动态",
        newsTitle: "近期进展",
        projectsLabel: "项目",
        projectsTitle: "项目与实践",
        projectsIntro:
          "通过这些项目，我持续接触产品设计、快速原型和可复用的工作方法。",
        details: "查看详情",
        resourcesLabel: "公开资料",
        resourcesTitle: "笔记与资源",
        codexGuide: "Codex 项目交接指南",
        codexDesc: "关于上下文、决策、文件地图和临时资料的可复用结构。",
        siteGuide: "个人主页搭建指南",
        siteDesc: "使用 GitHub Pages 维护个人主页的实践记录。",
        archive: "技术笔记归档",
        archiveDesc: "关于命令行、排版、学习方法与注意力的整理。",
        writingLabel: "写作",
        writingTitle: "最近文章",
        allWriting: "全部文章",
        readArticle: "阅读文章",
        minutes: "分钟",
        contactLabel: "联系",
        contactTitle: "保持联系",
        contactText:
          "欢迎交流本科科研、AI 工具、学习系统，或仍处在早期阶段的项目想法。",
        writeEmail: "发送邮件",
      };

  const researchAreas = [
    {
      number: "01",
      title: copy.modelTitle,
      description: copy.modelText,
    },
    {
      number: "02",
      title: copy.residualTitle,
      description: copy.residualText,
    },
    {
      number: "03",
      title: copy.embodiedTitle,
      description: copy.embodiedText,
    },
  ];

  const resources = [
    {
      title: copy.codexGuide,
      description: copy.codexDesc,
      href: "/assets/codex-guide.html",
    },
    {
      title: copy.siteGuide,
      description: copy.siteDesc,
      href: "/assets/personal-site-guide.html",
    },
    {
      title: copy.archive,
      description: copy.archiveDesc,
      href: "/assets/latex-style-notes.html",
    },
  ];

  return (
    <main className="academic-home">
      {jsonldScript(personJsonLd)}

      <section className="px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-[1fr_7.5rem] gap-x-6 gap-y-7 sm:grid-cols-[1fr_12rem] sm:gap-x-10 lg:grid-cols-[1fr_15rem] lg:gap-x-16">
          <div className="self-center">
            <p className="academic-kicker">{copy.eyebrow}</p>
            <h1 className="academic-name mt-3 text-5xl leading-none font-semibold sm:text-6xl lg:text-7xl">
              {t("name.full")}
            </h1>
            <div className="mt-5 text-sm leading-6 sm:text-base">
              <p className="font-semibold">{copy.role}</p>
              <p className="text-neutral-500 dark:text-neutral-400">
                {copy.institution}
              </p>
            </div>
          </div>

          <figure className="row-span-1">
            <div className="relative aspect-[3/4] overflow-hidden border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800">
              <Image
                src="/assets/profile.jpg"
                alt={t("name.full")}
                fill
                priority
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 192px, 240px"
                className="object-cover object-[center_38%] grayscale"
              />
            </div>
            <figcaption className="mt-2 hidden items-center justify-between font-mono text-[10px] text-neutral-500 sm:flex dark:text-neutral-400">
              <span>RUC / AI</span>
              <span>{copy.location}</span>
            </figcaption>
          </figure>

          <div className="col-span-2 max-w-3xl lg:col-span-1">
            <p className="academic-headline text-xl leading-8 font-medium sm:text-2xl sm:leading-9">
              {copy.headline}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base dark:text-neutral-300">
              {copy.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <a href="mailto:36231219360@qq.com" className="academic-link">
                <Mail className="size-4" aria-hidden="true" />
                {copy.email}
              </a>
              <a
                href="https://github.com/RUCmonk2"
                target="_blank"
                rel="noreferrer"
                className="academic-link"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://www.zhihu.com/people/monk-90-11"
                target="_blank"
                rel="noreferrer"
                className="academic-link"
              >
                <Icons.zhihu className="size-4" aria-hidden="true" />
                {isEnglish ? "Zhihu" : "知乎"}
              </a>
              <span className="inline-flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                <MapPin className="size-4" aria-hidden="true" />
                {copy.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="research"
        className="scroll-mt-24 border-y border-neutral-200 bg-[#f7f8f8] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <p className="academic-kicker">{copy.researchLabel}</p>
            <div>
              <h2 className="academic-heading text-2xl font-semibold sm:text-3xl">
                {copy.researchTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {copy.researchIntro}
              </p>
            </div>
          </div>
          <div className="mt-9 grid divide-y divide-neutral-200 border-y border-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-neutral-700 dark:border-neutral-700">
            {researchAreas.map((area) => (
              <article
                key={area.number}
                className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="font-mono text-[10px] text-[#9f1d2f]">
                  {area.number}
                </p>
                <h3 className="mt-3 text-base font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="academic-section scroll-mt-24">
        <div className="academic-section-inner">
          <header className="academic-section-header">
            <p className="academic-kicker">{copy.aboutLabel}</p>
            <h2 className="academic-heading">{copy.aboutTitle}</h2>
          </header>
          <div>
            <div className="academic-prose prose prose-neutral dark:prose-invert max-w-none">
              <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
            </div>
            <div className="mt-9 grid gap-5 border-t border-neutral-200 pt-6 sm:grid-cols-[1fr_auto] dark:border-neutral-800">
              <div>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {copy.education}
                </p>
                <p className="mt-2 text-base font-semibold">
                  {copy.institution}
                </p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {copy.degree} · {copy.current}
                </p>
              </div>
              <div className="flex max-w-md flex-wrap content-start gap-x-3 gap-y-2 text-xs text-neutral-500 sm:justify-end dark:text-neutral-400">
                {skills.map((skill, index) => (
                  <span key={skill}>
                    {skill}
                    {index < skills.length - 1 ? " /" : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="academic-section">
        <div className="academic-section-inner">
          <header className="academic-section-header">
            <p className="academic-kicker">{copy.newsLabel}</p>
            <h2 className="academic-heading">{copy.newsTitle}</h2>
          </header>
          <div className="border-t border-neutral-300 dark:border-neutral-700">
            {news.map((item) => (
              <article
                key={item.title}
                className="grid gap-2 border-b border-neutral-200 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6 dark:border-neutral-800"
              >
                <time className="font-mono text-xs text-[#9f1d2f]">
                  {item.date}
                </time>
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                    {item.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="academic-section scroll-mt-24">
        <div className="academic-section-inner">
          <header className="academic-section-header">
            <p className="academic-kicker">{copy.projectsLabel}</p>
            <h2 className="academic-heading">{copy.projectsTitle}</h2>
          </header>
          <div>
            <p className="mb-8 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              {copy.projectsIntro}
            </p>
            <div className="border-t border-neutral-300 dark:border-neutral-700">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  className="grid gap-3 border-b border-neutral-200 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5 dark:border-neutral-800"
                >
                  <p className="font-mono text-xs text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <span className="shrink-0 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        {project.dates}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {project.technologies.join(" · ")}
                      </span>
                      {project.href && (
                        <a
                          href={project.href}
                          target={
                            project.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            project.href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="academic-link ml-auto"
                        >
                          {copy.details}
                          {project.href.startsWith("http") ? (
                            <ArrowUpRight
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowRight
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="academic-section">
        <div className="academic-section-inner">
          <header className="academic-section-header">
            <p className="academic-kicker">{copy.resourcesLabel}</p>
            <h2 className="academic-heading">{copy.resourcesTitle}</h2>
          </header>
          <div className="grid border-t border-neutral-300 sm:grid-cols-3 sm:divide-x sm:divide-neutral-200 dark:divide-neutral-800 dark:border-neutral-700">
            {resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                className="group border-b border-neutral-200 py-6 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0 dark:border-neutral-800"
              >
                <FileText
                  className="size-4 text-[#9f1d2f]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-sm font-semibold group-hover:text-[#9f1d2f]">
                  {resource.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                  {resource.description}
                </p>
                <ArrowRight
                  className="mt-4 size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {latestPost && (
        <section className="academic-section">
          <div className="academic-section-inner">
            <header className="academic-section-header">
              <p className="academic-kicker">{copy.writingLabel}</p>
              <h2 className="academic-heading">{copy.writingTitle}</h2>
            </header>
            <div>
              <Link
                href={articleHref}
                className="group block border-y border-neutral-300 py-6 dark:border-neutral-700"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  <time>{latestPost.metadata.date}</time>
                  <span>
                    {latestReadingTime} {copy.minutes}
                  </span>
                </div>
                <h3 className="academic-heading mt-4 max-w-3xl text-xl group-hover:text-[#9f1d2f] sm:text-2xl">
                  {latestPost.metadata.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                  {latestPost.metadata.summary}
                </p>
                <span className="academic-link mt-5">
                  {copy.readArticle}
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <Link href={blogHref} className="academic-link mt-5">
                <BookOpen className="size-4" aria-hidden="true" />
                {copy.allWriting}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section
        id="contact"
        className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-5xl gap-5 border-t-2 border-neutral-950 pt-8 sm:grid-cols-[10rem_1fr] sm:gap-8 dark:border-white">
          <p className="academic-kicker">{copy.contactLabel}</p>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <h2 className="academic-heading text-2xl font-semibold">
                {copy.contactTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {copy.contactText}
              </p>
            </div>
            <a
              href="mailto:36231219360@qq.com"
              className="academic-link shrink-0"
            >
              {copy.writeEmail}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
