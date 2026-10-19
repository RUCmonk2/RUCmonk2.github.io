import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { learningCatalog } from "@/data/learning/catalog";
import type { ScientistAtlas } from "@/data/scientist-atlas";

import { MathematiciansAtlas } from "./mathematicians-atlas";

export function ScientistAtlasPage({
  locale,
  atlas,
}: {
  locale: "zh" | "en";
  atlas: ScientistAtlas;
}) {
  const en = locale === "en",
    prefix = en ? "/en" : "";
  const directory = learningCatalog.filter((item) =>
    [
      "mathematicians",
      "physicists",
      "chemists",
      "computer-scientists",
    ].includes(item.id),
  );
  return (
    <main className="lives-page" data-atlas={atlas.id}>
      <div className="lives-shell">
        <nav
          className="lives-breadcrumb"
          aria-label={en ? "Related pages" : "相关页面"}
        >
          <Link href={`${prefix}/learning/`}>
            <ArrowLeft size={13} />
            {en ? "Learning" : "学习目录"}
          </Link>
          <Link
            href={`${prefix}${atlas.id === "mathematicians" ? "/learning/math-map/" : "/learning/#people"}`}
          >
            {atlas.id === "mathematicians"
              ? en
                ? "Mathematics map"
                : "数学知识图谱"
              : en
                ? "Biography atlases"
                : "科学人物志"}
            <ArrowUpRight size={13} />
          </Link>
        </nav>
        <header className="lives-hero">
          <div>
            <p className="lives-eyebrow">
              THE SCIENTISTS ATLAS / {atlas.eyebrow}
            </p>
            <h1>{atlas.title[locale]}</h1>
            <p className="lives-deck">
              {en
                ? "Behind every discovery, a person. Between them, a history of ideas."
                : "发现背后是人，人与人之间，是思想的来路。"}
            </p>
          </div>
          <div className="lives-edition">
            <span>{en ? "Lives & discoveries" : "人物与发现"}</span>
            <p>
              {en
                ? `${atlas.people.length} lives. A growing history of ideas.`
                : `${atlas.people.length} 位人物，一张生长中的思想地图。`}
            </p>
            <small>
              {en
                ? "FOLLOW THE QUESTIONS, MEET THE PEOPLE"
                : "沿着问题，遇见一个人"}
            </small>
          </div>
        </header>
        {directory.length > 1 && (
          <nav
            className="lives-atlas-directory"
            aria-label={en ? "Choose a field" : "切换学科人物志"}
          >
            {directory.map((item) => (
              <Link
                key={item.id}
                href={prefix + item.href}
                aria-current={item.id === atlas.id ? "page" : undefined}
              >
                {item.title[locale]}
              </Link>
            ))}
          </nav>
        )}
        <MathematiciansAtlas key={atlas.id} locale={locale} atlas={atlas} />
        <footer className="lives-colophon">
          <div>
            <span className="lives-eyebrow">READING THE MAP</span>
            <p>
              {en
                ? "Explore documented academic connections or read by period. Thematic subgraphs are reading selections; shared membership alone does not establish a relationship. Portrait sizes are editorial landmarks, not rankings."
                : "沿有出处的学术关系探索，也可按年代阅读。主题子图是阅读入口，不因共同归类而虚构联系。头像大小帮助定位，不作学术价值排名。"}
            </p>
          </div>
          <div>
            <span className="lives-eyebrow">THE PORTRAITS</span>
            <p>
              {en
                ? "Image sources and licenses accompany each profile. Later depictions are identified; original name marks stand in where no verified open portrait is used."
                : "每幅肖像随人物附列来源与许可；后世形象明确注明。缺少可靠开放肖像时，采用原创姓名字标。"}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
