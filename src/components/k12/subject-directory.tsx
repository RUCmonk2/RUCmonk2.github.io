"use client";

import Link from "next/link";
import { useState } from "react";

import {
  moduleHref,
  schoolDirectory,
  schoolStages,
  subjectConceptHref,
  subjectGroups,
  subjectHref,
  subjectStageHref,
} from "@/data/k12-subjects";

export function SubjectDirectory({ locale }: { locale: "zh" | "en" }) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("all");
  const [group, setGroup] = useState("all");
  const prefix = locale === "en" ? "/en" : "";
  const term = query.trim().toLocaleLowerCase();
  const entries = schoolDirectory.flatMap((subject) => {
    if (group !== "all" && subject.group !== group) return [];
    const stages = subject.stages.filter(
      (item) => stage === "all" || item.id === stage,
    );
    if (!stages.length) return [];
    const subjectMatch = [subject.title, subject.en, subject.intro]
      .join(" ")
      .toLocaleLowerCase()
      .includes(term);
    const matches = stages.flatMap((item) =>
      item.modules.flatMap((module) => {
        if (subject.id !== "mathematics") {
          const topics = module.topics.flatMap((title, index) =>
            title.toLocaleLowerCase().includes(term)
              ? [
                  {
                    id: `${module.id}-${index}`,
                    title,
                    stage: item.id,
                    href: subjectConceptHref(
                      subject.id,
                      item.id,
                      module.id,
                      index,
                    ),
                  },
                ]
              : [],
          );
          if (topics.length) return topics;
        }
        return [module.title, ...module.topics, module.task]
          .join(" ")
          .toLocaleLowerCase()
          .includes(term)
          ? [
              {
                id: module.id,
                title: module.title,
                stage: item.id,
                href: moduleHref(subject.id, item.id, module.id),
              },
            ]
          : [];
      }),
    );
    if (term && !subjectMatch && !matches.length) return [];
    return [{ subject, stages, matches }];
  });
  return (
    <section
      className="k12-catalog subject-directory"
      id="subjects"
      aria-labelledby="subjects-title"
    >
      <div className="note-section-heading">
        <h2 id="subjects-title">选择学科，找到下一步</h2>
        <span>按学段与问题查找</span>
      </div>
      <div className="k12-filters">
        <label>
          想学什么
          <input
            type="search"
            placeholder="学科或知识点，如：物理、论证、生态"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          学段
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value)}
          >
            <option value="all">全部学段</option>
            {schoolStages.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          学科领域
          <select
            value={group}
            onChange={(event) => setGroup(event.target.value)}
          >
            <option value="all">全部领域</option>
            {subjectGroups.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="subject-result" role="status">
        找到 {entries.length} 个学科入口{term ? ` · “${query.trim()}”` : ""}
      </p>
      {!entries.length && (
        <div className="subject-empty">
          <p>
            这个筛选组合没有匹配内容。可以换一个较短的关键词，或扩大到全部学段。
          </p>
          <button
            className="k12-button"
            onClick={() => {
              setQuery("");
              setStage("all");
              setGroup("all");
            }}
          >
            重置筛选
          </button>
        </div>
      )}
      <div className="subject-grid">
        {entries.map(({ subject, stages, matches }) => (
          <article className="subject-card" key={subject.id}>
            <div className="subject-card-kicker">
              <span>
                {subjectGroups.find((item) => item.id === subject.group)!.title}
              </span>
              <span>
                {subject.id === "mathematics"
                  ? "详细讲义"
                  : "知识网 · 双模式讲解"}
              </span>
            </div>
            <h3>
              <Link href={prefix + subjectHref(subject.id)}>
                {subject.title}
                <span aria-hidden="true">↗</span>
              </Link>
            </h3>
            <p>{subject.intro}</p>
            <nav aria-label={subject.title + "分学段入口"}>
              {stages.map((item) => (
                <Link
                  key={item.id}
                  href={prefix + subjectStageHref(subject.id, item.id)}
                >
                  {schoolStages.find((s) => s.id === item.id)!.title}
                  <span>
                    {subject.id === "mathematics"
                      ? item.modules.length
                      : item.modules.reduce(
                          (n, m) => n + m.topics.length,
                          0,
                        )}{" "}
                    个知识点
                  </span>
                </Link>
              ))}
            </nav>
            {term && matches.length > 0 && (
              <ul className="subject-matches">
                {matches.slice(0, 3).map((item) => (
                  <li key={item.stage + item.id}>
                    <Link href={prefix + item.href}>
                      {schoolStages.find((s) => s.id === item.stage)!.title} ·{" "}
                      {item.title}
                    </Link>
                  </li>
                ))}
                {matches.length > 3 && (
                  <li>另有 {matches.length - 3} 项，可进入学科目录查看</li>
                )}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
