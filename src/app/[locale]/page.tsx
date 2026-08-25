import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Github,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { CustomReactMarkdown } from "@/components/react-markdown";
import { DATA } from "@/data";
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
  const linksHref = isEnglish ? "/en/links" : "/links";
  const articleHref = latestPost ? `${blogHref}/${latestPost.slug}` : blogHref;
  const latestReadingTime =
    latestPost &&
    typeof latestPost.metadata.readingTime === "number" &&
    latestPost.metadata.readingTime > 0
      ? latestPost.metadata.readingTime
      : 5;

  // Reversible display switch. The original section copy and source data stay
  // loaded below and in the locale message files so they can be restored later.
  const hideHomepageShowcaseSections = true;
  const hideHomepageContactSection = true;
  const hiddenLabel = isEnglish ? "Temporarily hidden" : "暂时隐藏";

  const copy = isEnglish
    ? {
        eyebrow: "YAOZHI YE",
        role: "Undergraduate in Artificial Intelligence",
        institution: "Renmin University of China",
        headline:
          "My current interests center on AI4Math and AI4TCS. I remain curious about embodied intelligence and explore ideas such as AI for Chinese calligraphy.",
        intro:
          "I am learning how to read research carefully, formulate useful questions, and build technical workflows that remain clear over time.",
        email: "Email",
        location: "Beijing, China",
        researchLabel: "01 / Research",
        researchTitle: "Current directions",
        researchIntro:
          "I am still at the stage of building foundations. These are the questions and methods I am following most closely.",
        ai4MathTitle: "AI4Math",
        ai4MathText:
          "Exploring how formal mathematics, theorem proving, and AI can support verifiable mathematical reasoning.",
        ai4TcsTitle: "AI4TCS",
        ai4TcsText:
          "Studying how AI can contribute to theoretical computer science, algorithmic reasoning, and formal verification.",
        creativeAiTitle: "Embodied and creative AI",
        creativeAiText:
          "Staying curious about embodied intelligence while exploring interdisciplinary ideas such as AI for Chinese calligraphy.",
        aboutLabel: "02 / Profile",
        aboutTitle: "About",
        education: "Education",
        degree: "Undergraduate in Artificial Intelligence",
        current: "Current",
        newsLabel: "03 / Research log",
        newsTitle: "Recent activity",
        projectsLabel: "04 / Selected work",
        projectsTitle: "Projects and practice",
        projectsIntro:
          "Selected projects through which I have explored product design, rapid prototyping, and reproducible ways of working.",
        details: "Details",
        resourcesLabel: "05 / Open files",
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
        writingLabel: "06 / Writing",
        writingTitle: "Latest note",
        allWriting: "All writing",
        readArticle: "Read note",
        minutes: "min read",
        contactLabel: "07 / Contact",
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
          "目前主要关注AI4math和AI4TCS，并持续保持对具身智能的兴趣，也会有AI4中国书法等有意思的想法",
        intro:
          "我正在学习如何严谨地阅读论文、形成有价值的问题，并建立能够长期保持清晰的技术工作流。",
        email: "邮件",
        location: "北京",
        researchLabel: "01 / 研究方向",
        researchTitle: "当前关注方向",
        researchIntro:
          "我仍处在建立基础的阶段。下面是现阶段最希望继续理解的问题与方法。",
        ai4MathTitle: "AI4Math",
        ai4MathText:
          "关注形式化数学、定理证明与人工智能如何共同支持可验证的数学推理。",
        ai4TcsTitle: "AI4TCS",
        ai4TcsText:
          "探索人工智能在理论计算机科学、算法推理与形式验证中的作用。",
        creativeAiTitle: "具身智能与创意 AI",
        creativeAiText:
          "保持对具身智能的兴趣，也尝试 AI4中国书法等跨领域、有意思的想法。",
        aboutLabel: "02 / 个人档案",
        aboutTitle: "关于我",
        education: "教育背景",
        degree: "人工智能本科生",
        current: "在读",
        newsLabel: "03 / 研究日志",
        newsTitle: "近期进展",
        projectsLabel: "04 / 项目记录",
        projectsTitle: "项目与实践",
        projectsIntro:
          "通过这些项目，我持续接触产品设计、快速原型和可复用的工作方法。",
        details: "查看详情",
        resourcesLabel: "05 / 公开文件",
        resourcesTitle: "笔记与资源",
        codexGuide: "Codex 项目交接指南",
        codexDesc: "关于上下文、决策、文件地图和临时资料的可复用结构。",
        siteGuide: "个人主页搭建指南",
        siteDesc: "使用 GitHub Pages 维护个人主页的实践记录。",
        archive: "技术笔记归档",
        archiveDesc: "关于命令行、排版、学习方法与注意力的整理。",
        writingLabel: "06 / 技术写作",
        writingTitle: "最近文章",
        allWriting: "全部文章",
        readArticle: "阅读文章",
        minutes: "分钟",
        contactLabel: "07 / 联系",
        contactTitle: "保持联系",
        contactText:
          "欢迎交流本科科研、AI 工具、学习系统，或仍处在早期阶段的项目想法。",
        writeEmail: "发送邮件",
      };

  const researchAreas = [
    {
      number: "01",
      title: copy.ai4MathTitle,
      description: copy.ai4MathText,
    },
    {
      number: "02",
      title: copy.ai4TcsTitle,
      description: copy.ai4TcsText,
    },
    {
      number: "03",
      title: copy.creativeAiTitle,
      description: copy.creativeAiText,
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
    <main className="pure-home">
      {jsonldScript(personJsonLd)}
      <section id="about" className="pure-profile-hero scroll-mt-24">
        <Image
          className="pure-avatar"
          src="/images/luxun-avatar.webp"
          width={512}
          height={512}
          priority
          unoptimized
          alt={isEnglish ? "Cartoon portrait of Lu Xun" : "Q 版鲁迅头像"}
        />

        <div className="pure-identity">
          <p>{copy.eyebrow}</p>
          <h1>{isEnglish ? "Yaozhi Ye" : "叶耀之"}</h1>
          <span>{isEnglish ? "Pure Lab" : "Yaozhi Ye"}</span>
        </div>

        <div className="pure-meta">
          <span>
            <MapPin aria-hidden="true" />
            {copy.location}
          </span>
          <a
            href="https://github.com/RUCmonk2"
            target="_blank"
            rel="noreferrer"
          >
            <Github aria-hidden="true" />
            RUCmonk2
          </a>
        </div>

        <a
          className="pure-status"
          href="https://www.ruc.edu.cn/"
          target="_blank"
          rel="noreferrer"
        >
          <i aria-hidden="true" />
          {copy.role} · {copy.institution}
        </a>
      </section>

      <div className="pure-content">
        <section className="pure-section">
          <header className="pure-section-label">
            <span>01</span>
            <h2>{copy.aboutTitle}</h2>
          </header>
          <div className="pure-section-body pure-about">
            <div className="pure-prose">
              <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
            </div>
            <p className="pure-lead-note">{copy.headline}</p>
            <a className="pure-small-action" href="mailto:36231219360@qq.com">
              {copy.email}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="research" className="pure-section scroll-mt-24">
          <header className="pure-section-label">
            <span>02</span>
            <h2>{isEnglish ? "Research" : "研究兴趣"}</h2>
          </header>
          <div className="pure-section-body">
            {hideHomepageShowcaseSections ? (
              <p className="pure-temporary-placeholder">{hiddenLabel}</p>
            ) : (
              <>
                <p className="pure-section-intro">{copy.researchIntro}</p>
                <div className="pure-research-list">
                  {researchAreas.map((area) => (
                    <article key={area.number}>
                      <span>{area.number}</span>
                      <div>
                        <h3>{area.title}</h3>
                        <p>{area.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="pure-tag-row" aria-label="Keywords">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="pure-section">
          <header className="pure-section-label">
            <span>03</span>
            <h2>{isEnglish ? "Updates" : "近期动态"}</h2>
          </header>
          <div className="pure-section-body pure-row-list">
            {hideHomepageShowcaseSections ? (
              <p className="pure-temporary-placeholder">{hiddenLabel}</p>
            ) : (
              news.map((item) => (
                <article className="pure-update-row" key={item.title}>
                  <time>{item.date}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="projects" className="pure-section scroll-mt-24">
          <header className="pure-section-label">
            <span>04</span>
            <h2>{isEnglish ? "Projects" : "项目实践"}</h2>
          </header>
          <div className="pure-section-body">
            {hideHomepageShowcaseSections ? (
              <p className="pure-temporary-placeholder">{hiddenLabel}</p>
            ) : (
              <>
                <p className="pure-section-intro">{copy.projectsIntro}</p>
                <div className="pure-project-grid">
                  {projects.map((project) => (
                    <article className="pure-project-card" key={project.title}>
                      <div className="pure-card-topline">
                        <span>{project.dates}</span>
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
                            aria-label={`${copy.details}: ${project.title}`}
                          >
                            <ArrowUpRight aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="pure-card-tags">
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="pure-section">
          <header className="pure-section-label">
            <span>05</span>
            <h2>{isEnglish ? "Resources" : "公开资料"}</h2>
          </header>
          <div className="pure-section-body pure-row-list">
            {resources.map((resource) => (
              <a
                className="pure-resource-row"
                href={resource.href}
                key={resource.href}
              >
                <span>
                  <b>{resource.title}</b>
                  <small>{resource.description}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        {latestPost && (
          <section className="pure-section">
            <header className="pure-section-label">
              <span>06</span>
              <h2>{isEnglish ? "Writing" : "写作"}</h2>
              <Link href={blogHref}>{copy.allWriting}</Link>
            </header>
            <div className="pure-section-body">
              <Link href={articleHref} className="pure-writing-card">
                <BookOpen aria-hidden="true" />
                <span>
                  <b>{latestPost.metadata.title}</b>
                  <small>{latestPost.metadata.summary}</small>
                  <em>
                    {latestPost.metadata.date} · {latestReadingTime}{" "}
                    {copy.minutes}
                  </em>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        <section id="friends" className="pure-section scroll-mt-24">
          <header className="pure-section-label">
            <span>07</span>
            <h2>{isEnglish ? "Friends" : "友链"}</h2>
            <Link href={linksHref}>
              {isEnglish ? "All links" : "友链页面"}
            </Link>
          </header>
          <div className="pure-section-body pure-friend-grid">
            {DATA.friends.map((friend) => (
              <a
                className="pure-friend-card"
                href={friend.url}
                key={friend.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <small>{friend.handle}</small>
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <h3>{friend.name[isEnglish ? "en" : "zh"]}</h3>
                <p>{friend.description[isEnglish ? "en" : "zh"]}</p>
              </a>
            ))}
          </div>
        </section>

        {!hideHomepageContactSection && (
          <section id="contact" className="pure-section scroll-mt-24">
            <header className="pure-section-label">
              <span>08</span>
              <h2>{isEnglish ? "Contact" : "联系"}</h2>
            </header>
            <div className="pure-section-body pure-contact-card">
              <div>
                <h3>{copy.contactTitle}</h3>
                <p>{copy.contactText}</p>
              </div>
              <a href="mailto:36231219360@qq.com">
                {copy.writeEmail}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
