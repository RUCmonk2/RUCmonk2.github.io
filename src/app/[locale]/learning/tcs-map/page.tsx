import "../math-map/math-map.css";
import "./tcs-map.css";

import { ArrowLeft, ArrowUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { TcsInkMap } from "@/components/learning/tcs-ink-map";
import { getLearningItem } from "@/data/learning/catalog";
import { tcsEdges, type TcsNode, tcsNodes } from "@/data/tcs-map";
import { constructMetadata } from "@/lib/metadata";

const item = getLearningItem("tcs-map");

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "zh";
  return constructMetadata({
    title: item.title[language],
    description: item.description[language],
    path: item.href,
    locale: language,
  });
}

export default async function TcsMapPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === "en";
  const language = en ? "en" : "zh";

  function renderTopic(node: TcsNode) {
    const related = tcsNodes.filter((other) =>
      tcsEdges.some(
        ([a, b]) =>
          (a === node.id && b === other.id) ||
          (b === node.id && a === other.id),
      ),
    );
    return (
      <article key={node.id} id={node.id} className="tcs-topic" tabIndex={-1}>
        <h3>{node.title[language]}</h3>
        <p className="tcs-question">{node.question[language]}</p>
        <p>{node.description[language]}</p>
        <ul
          className="tcs-topic-links"
          aria-label={en ? "Connected topics" : "相连的主题"}
        >
          {related.map((other) => (
            <li key={other.id}>
              <a href={`#${other.id}`}>{other.title[language]}</a>
            </li>
          ))}
        </ul>
        <a className="tcs-return" href="#tcs-map">
          <ArrowUp size={14} aria-hidden="true" />
          {en ? "Back to the map" : "回到地图"}
        </a>
      </article>
    );
  }

  return (
    <main className="notes-page mathmap-page tcs-page">
      <div className="mathmap-shell tcs-shell">
        <Link className="notes-back" href={en ? "/en/learning" : "/learning"}>
          <ArrowLeft size={14} aria-hidden="true" />
          {en ? "Back to learning" : "返回学习目录"}
        </Link>
        <header className="tcs-hero">
          <h1>{item.title[language]}</h1>
          <p>
            {en
              ? "What can we compute? How do we compute it, what does it cost, and how do we know the result is right? Follow those questions through graph streams and sorting networks."
              : "什么能算？怎样算、要花多少资源、怎么确认算对了？沿着图流和排序网络两个熟悉的问题，看这些分支如何连起来。"}
          </p>
        </header>
        <TcsInkMap locale={language} />
        <section className="tcs-reading" aria-labelledby="tcs-examples-title">
          <h2 id="tcs-examples-title">
            {en ? "Two ways through the map" : "沿两个例子走一遍"}
          </h2>
          <div className="tcs-topics tcs-examples">
            {tcsNodes.filter((node) => node.kind === "case").map(renderTopic)}
          </div>
        </section>
        <section className="tcs-reading" aria-labelledby="tcs-branches-title">
          <h2 id="tcs-branches-title">
            {en ? "What each field studies" : "各分支在研究什么"}
          </h2>
          <div className="tcs-topics">
            {tcsNodes.filter((node) => node.kind !== "case").map(renderTopic)}
          </div>
        </section>
      </div>
    </main>
  );
}
