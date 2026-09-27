"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  k12Domains,
  k12LessonHref,
  k12LevelLabel,
  type K12Stage,
  k12Stages,
  k12Topics,
} from "@/data/k12";

export function K12Catalog({
  locale,
  stage,
}: {
  locale: "zh" | "en";
  stage?: K12Stage;
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [selectedStage, setSelectedStage] = useState(stage ?? "all");
  const prefix = locale === "en" ? "/en" : "";
  const available = k12Topics.filter(
    (topic) => !stage || topic.stage === stage,
  );
  const domains = [...new Set(available.map((topic) => topic.domain))];
  const matches = useMemo(
    () =>
      available.filter(
        (topic) =>
          (selectedStage === "all" || topic.stage === selectedStage) &&
          (domain === "all" || topic.domain === domain) &&
          (!query.trim() ||
            (topic.title + " " + topic.goal).includes(query.trim())),
      ),
    [available, domain, query, selectedStage],
  );
  return (
    <section
      className="k12-catalog"
      id="catalog"
      aria-labelledby="catalog-title"
    >
      <div className="note-section-heading">
        <h2 id="catalog-title">逐节学习目录</h2>
        <span aria-live="polite">{matches.length} 节讲义 · 每节双模式</span>
      </div>
      <div className="k12-filters">
        <label>
          找知识点
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：分数、因式、导数"
          />
        </label>
        {!stage && (
          <label>
            学段
            <select
              value={selectedStage}
              onChange={(event) => setSelectedStage(event.target.value)}
            >
              <option value="all">全部学段</option>
              {k12Stages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          主题
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
          >
            <option value="all">全部主题</option>
            {domains.map((id) => (
              <option key={id} value={id}>
                {k12Domains[id].title}
              </option>
            ))}
          </select>
        </label>
      </div>
      {matches.length === 0 ? (
        <p role="status">
          没有找到匹配的讲义。试试更短的关键词，或切换为全部主题。
        </p>
      ) : (
        k12Stages
          .filter((item) => !stage || item.id === stage)
          .map((item) => {
            const rows = matches.filter((topic) => topic.stage === item.id);
            if (!rows.length) return null;
            return (
              <div className="k12-catalog-stage" key={item.id}>
                {!stage && (
                  <h3>
                    {item.title}
                    <span>{rows.length} 节</span>
                  </h3>
                )}
                {[...new Set(rows.map((topic) => topic.domain))].map((id) => (
                  <details
                    className="k12-topic-group"
                    key={id}
                    open={
                      Boolean(query.trim()) ||
                      domain !== "all" ||
                      Boolean(stage)
                    }
                  >
                    <summary>
                      {k12Domains[id].title}
                      <span>
                        {rows.filter((topic) => topic.domain === id).length} 节
                      </span>
                    </summary>
                    <ol>
                      {rows
                        .filter((topic) => topic.domain === id)
                        .map((topic) => (
                          <li key={topic.id}>
                            <Link href={prefix + k12LessonHref(topic.id)}>
                              <span className="k12-order">
                                {String(topic.order + 1).padStart(2, "0")}
                              </span>
                              <span>
                                <strong>{topic.title}</strong>
                                <small>{topic.goal}</small>
                              </span>
                              <span className="k12-level">
                                {k12LevelLabel[topic.level]}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ol>
                  </details>
                ))}
              </div>
            );
          })
      )}
    </section>
  );
}
