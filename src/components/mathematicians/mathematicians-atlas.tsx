"use client";

import katex from "katex";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { Mathematician } from "@/data/mathematicians";
import type { ScientistAtlas } from "@/data/scientist-atlas";

import { eraOf, eras, lifeLabel } from "./layout";
import { ScholarMap } from "./scholar-map";

type Mode = "connections" | "time";
type Tab = "work" | "life" | "connections";
const names = {
  mentorship: { zh: "师承", en: "Mentorship" },
  influence: { zh: "思想承接", en: "Ideas" },
  parallel: { zh: "同题研究", en: "Shared problem" },
  support: { zh: "学术支持", en: "Academic support" },
};
function matchesPerson(person: Mathematician, query: string) {
  return [
    person.name.zh,
    person.name.en,
    person.fullName,
    person.field.zh,
    person.field.en,
    person.hook.zh,
    person.hook.en,
    ...person.achievements.flatMap((item) => [item.title.zh, item.title.en]),
  ]
    .join(" ")
    .toLocaleLowerCase()
    .includes(query.trim().toLocaleLowerCase());
}

function Formula({ value }: { value: string }) {
  return (
    <div
      className="lives-formula"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value, {
          throwOnError: false,
          trust: false,
          displayMode: true,
        }),
      }}
    />
  );
}

export function MathematiciansAtlas({
  locale,
  atlas,
}: {
  locale: "zh" | "en";
  atlas: ScientistAtlas;
}) {
  const {
    people: mathematicians,
    relations: scholarRelations,
    subgraphs,
    routes,
  } = atlas;
  const en = locale === "en";
  const uid = useId().replaceAll(":", "");
  const [selected, setSelected] = useState(atlas.defaultPerson);
  const [selectionRequest, setSelectionRequest] = useState(0);
  const [mode, setMode] = useState<Mode>("connections");
  const [tab, setTab] = useState<Tab>("work");
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [route, setRoute] = useState("");
  const [showAllLines, setShowAllLines] = useState(false);
  const [era, setEra] = useState("all");
  const [subgraph, setSubgraph] = useState("all");
  const activeSubgraph = subgraphs.find((item) => item.id === subgraph);
  const [onlyNeighbors, setOnlyNeighbors] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const detailRef = useRef<HTMLElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = mathematicians.find((person) => person.id === selected)!;
  const related = scholarRelations.filter(
    (edge) => edge.source === selected || edge.target === selected,
  );
  const activeRoute = routes.find((item) => item.id === route);
  const neighborhood = new Set([
    selected,
    ...related.flatMap((edge) => [edge.source, edge.target]),
  ]);
  const visible = mathematicians.filter(
    (person) =>
      (!activeSubgraph || activeSubgraph.people.includes(person.id)) &&
      (!activeRoute || activeRoute.ids.includes(person.id)) &&
      (era === "all" || eraOf(person) === era) &&
      (!onlyNeighbors || neighborhood.has(person.id)) &&
      matchesPerson(person, query),
  );
  function resetScope() {
    setQuery("");
    setRoute("");
    setEra("all");
    setSubgraph("all");
    setOnlyNeighbors(false);
  }
  function changeSubgraph(id: string) {
    resetScope();
    setSubgraph(id);
    setKind("all");
    setShowAllLines(id !== "all");
    const group = subgraphs.find((item) => item.id === id);
    if (group && !group.people.includes(selected)) choose(group.people[0]);
  }
  function changeEra(value: string) {
    resetScope();
    setEra(value);
    if (value !== "all" && eraOf(current) !== value) {
      const first = mathematicians.find((person) => eraOf(person) === value);
      if (first) choose(first.id);
    }
  }

  useEffect(() => {
    function readHash() {
      const id = window.location.hash.slice(1);
      if (mathematicians.some((person) => person.id === id)) {
        setSelected(id);
      } else if (!id) setSelected(atlas.defaultPerson);
      setQuery("");
      setRoute("");
      setEra("all");
      setSubgraph("all");
      setOnlyNeighbors(false);
    }
    readHash();
    if (window.matchMedia("(max-width: 600px)").matches) setMode("time");
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (detailRef.current) detailRef.current.scrollTop = 0;
  }, [selected]);

  function search(value: string) {
    resetScope();
    setQuery(value);
    const matches = mathematicians.filter((person) =>
      matchesPerson(person, value),
    );
    if (matches.length && !matches.some((person) => person.id === selected)) {
      setSelected(matches[0].id);
      setCopyStatus("idle");
      window.history.replaceState(null, "", `#${matches[0].id}`);
    }
  }

  function choose(id: string, reveal = false) {
    setSelected(id);
    setSelectionRequest((value) => value + 1);
    setCopyStatus("idle");
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, "", `#${id}`);
    if (reveal) resetScope();
  }
  function scrollToDetail() {
    detailRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    detailRef.current?.focus({ preventScroll: true });
  }
  async function copyLink() {
    try {
      const url = new URL(window.location.href);
      url.hash = selected;
      await navigator.clipboard.writeText(url.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 3000);
  }

  return (
    <>
      <div className="lives-workspace">
        <div className="lives-map-column" data-mode={mode} ref={graphRef}>
          <nav
            className="lives-subgraphs"
            aria-label={en ? "Thematic subgraphs" : "主题子图"}
          >
            <span>{en ? "SUBGRAPHS" : "子图"}</span>
            <button
              aria-pressed={subgraph === "all"}
              onClick={() => changeSubgraph("all")}
            >
              {en ? "All lives" : "全部人物"}
            </button>
            {subgraphs.map((item) => (
              <button
                key={item.id}
                aria-pressed={subgraph === item.id}
                onClick={() => changeSubgraph(item.id)}
              >
                {item.label[locale]}
                <small>{item.people.length}</small>
              </button>
            ))}
          </nav>
          {activeSubgraph && (
            <p className="lives-subgraph-description">
              {activeSubgraph.description[locale]}
            </p>
          )}
          <div className="lives-toolbar">
            <div
              className="lives-view-switch"
              role="group"
              aria-label={en ? "Map arrangement" : "图谱排列方式"}
            >
              <button
                aria-pressed={mode === "connections"}
                onClick={() => {
                  setMode("connections");
                }}
              >
                {en ? "Connections" : "学术星图"}
              </button>
              <button
                aria-pressed={mode === "time"}
                onClick={() => {
                  setMode("time");
                }}
              >
                {en ? "By birth year" : "生年时间轴"}
              </button>
            </div>
            <label className="lives-search">
              <Search size={14} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => search(event.target.value)}
                placeholder={en ? "Find a person or idea" : "寻找人物或成果"}
                aria-label={en ? "Find a person or idea" : "寻找人物或成果"}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label={en ? "Clear search" : "清除搜索"}
                >
                  <X size={13} />
                </button>
              )}
            </label>
          </div>
          <details className="lives-scope-disclosure">
            <summary>
              {en ? "Period & neighborhood" : "年代与相关人物筛选"}
            </summary>
            <div
              className="lives-scope"
              role="group"
              aria-label={en ? "Filter by period of birth" : "按出生年代筛选"}
            >
              <button
                aria-pressed={era === "all"}
                onClick={() => changeEra("all")}
              >
                {en ? "All periods" : "全部年代"}
              </button>
              {eras.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={era === item.id}
                  disabled={
                    !mathematicians.some((person) => eraOf(person) === item.id)
                  }
                  onClick={() => changeEra(item.id)}
                >
                  {item[locale]}
                </button>
              ))}
              <button
                className="lives-neighbor-filter"
                aria-pressed={onlyNeighbors}
                onClick={() => {
                  resetScope();
                  setOnlyNeighbors(!onlyNeighbors);
                }}
              >
                {en ? "Related people" : "只看相关人物"}
              </button>
            </div>
          </details>
          <div className="lives-map-heading">
            <span>
              {mode === "connections"
                ? en
                  ? "FOLLOW THE IDEAS"
                  : "循着思想，遇见一个人"
                : en
                  ? "LIVES IN CHRONOLOGICAL ORDER"
                  : "按出生年份，分期阅读"}
            </span>
            <div className="lives-map-options">
              <button
                aria-pressed={showAllLines}
                title={
                  showAllLines
                    ? en
                      ? "Show only the selected person’s connections"
                      : "只显示当前人物的关联"
                    : en
                      ? "Show connections between the portraits currently shown"
                      : "显示当前已展开人物之间的关联"
                }
                onClick={() => setShowAllLines(!showAllLines)}
              >
                {showAllLines
                  ? en
                    ? "Connections at this level"
                    : "本层全部连线"
                  : en
                    ? "Selected person’s connections"
                    : "当前人物的连线"}
              </button>
              <span>
                {en ? "Collection " : "范围 "}
                {String(visible.length).padStart(2, "0")} /{" "}
                {String(mathematicians.length).padStart(2, "0")}
              </span>
            </div>
          </div>
          <ScholarMap
            people={visible}
            allPeople={mathematicians}
            relations={scholarRelations}
            visual={atlas.visual}
            selected={selected}
            mode={mode}
            kind={kind}
            allLines={showAllLines}
            explicitScope={Boolean(
              query.trim() ||
              route ||
              era !== "all" ||
              subgraph !== "all" ||
              onlyNeighbors,
            )}
            selectionRequest={selectionRequest}
            locale={locale}
            onSelect={choose}
            onReset={resetScope}
          />
          <div
            className="lives-legend"
            role="group"
            aria-label={en ? "Filter relationship lines" : "筛选关系连线"}
          >
            <button
              aria-pressed={kind === "all"}
              onClick={() => setKind("all")}
            >
              {en ? "All lines" : "全部关系"}
            </button>
            {Object.entries(names).map(([id, label]) => (
              <button
                key={id}
                aria-pressed={kind === id}
                onClick={() => setKind(kind === id ? "all" : id)}
              >
                <i data-kind={id} />
                {label[locale]}
              </button>
            ))}
          </div>
          <button
            className="lives-mobile-read"
            onClick={scrollToDetail}
            disabled={!visible.length}
          >
            {en
              ? `Read about ${current.name.en}`
              : `阅读${current.name.zh}的人物志`}
            <ArrowDown size={14} />
          </button>
          <details className="lives-person-index">
            <summary>
              {en ? "Index of people" : "人物索引"}
              <span>{visible.length}</span>
            </summary>
            <div
              className="lives-mobile-index"
              aria-label={en ? "People in this view" : "当前视图中的人物"}
            >
              {visible.map((person) => (
                <button
                  key={person.id}
                  aria-pressed={selected === person.id}
                  onClick={() => choose(person.id)}
                >
                  <b>{person.name[locale]}</b>
                  <span>{lifeLabel(person, locale)}</span>
                </button>
              ))}
            </div>
          </details>
          <details className="lives-route-disclosure">
            <summary>
              {en ? "Follow a question" : "沿着问题阅读"}
              <span>{routes.length}</span>
            </summary>
            <section
              className="lives-reading-routes"
              aria-label={en ? "Reading paths" : "人物阅读路线"}
            >
              <div className="lives-route-heading">
                <span className="lives-eyebrow">
                  {en ? "A QUESTION TO FOLLOW" : "沿着一个问题读下去"}
                </span>
                {route && (
                  <button onClick={() => setRoute("")}>
                    {en ? "All lives" : "全部人物"}
                    <X size={12} />
                  </button>
                )}
              </div>
              {routes.map((item, index) => (
                <button
                  key={item.id}
                  className="lives-route"
                  aria-pressed={route === item.id}
                  onClick={() => {
                    setRoute(route === item.id ? "" : item.id);
                    setQuery("");
                    setKind("all");
                    setEra("all");
                    setSubgraph("all");
                    setOnlyNeighbors(false);
                    if (route !== item.id) choose(item.ids[0]);
                  }}
                >
                  <span>0{index + 1}</span>
                  <div>
                    <b>{item[locale]}</b>
                    <small>
                      {item.ids
                        .map(
                          (id) =>
                            mathematicians.find((person) => person.id === id)!
                              .name[locale],
                        )
                        .join(" → ")}
                    </small>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ))}
              <p className="lives-route-note">
                {en
                  ? "Reading paths are editorial sequences, not additional historical relationships."
                  : "路线是建议阅读顺序；人物之间的史实关系以连线说明为准。"}
              </p>
            </section>
          </details>
        </div>
        {visible.length === 0 ? (
          <aside className="lives-dossier lives-dossier-empty">
            <Search size={24} />
            <h2>{en ? "No matching biographies" : "没有匹配的人物"}</h2>
            <p>
              {en
                ? "Try a name, a field, or a contribution."
                : "试试人物姓名、研究领域或成果名称。"}
            </p>
            <button
              onClick={() => {
                resetScope();
              }}
            >
              {en ? "Show all lives" : "查看全部人物"}
            </button>
          </aside>
        ) : (
          <aside
            className="lives-dossier"
            ref={detailRef}
            tabIndex={-1}
            aria-label={en ? "Selected biography" : "当前人物志"}
          >
            <div className="lives-dossier-top">
              <span className="lives-eyebrow">
                {en ? atlas.dossierLabel : "人物档案"} /{" "}
                {String(mathematicians.indexOf(current) + 1).padStart(2, "0")}
              </span>
              <button
                onClick={copyLink}
                aria-label={en ? "Copy link to this person" : "复制此人物链接"}
              >
                {copyStatus === "copied" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
            <span className="lives-copy-status" role="status">
              {copyStatus === "copied"
                ? en
                  ? "Link copied"
                  : "人物链接已复制"
                : copyStatus === "failed"
                  ? en
                    ? "Copy the address from your browser."
                    : "未能复制，可复制浏览器地址。"
                  : ""}
            </span>
            <div className="lives-person-heading">
              <div>
                <p>{lifeLabel(current, locale)}</p>
                <h2 aria-live="polite">{current.name[locale]}</h2>
                <span>{current.fullName}</span>
              </div>
              <span className="lives-portrait-frame">
                <img
                  src={current.portrait.src}
                  alt={current.portrait.alt[locale]}
                  data-person={current.id}
                  width={82}
                  height={100}
                />
              </span>
            </div>
            <p className="lives-person-field">
              {current.place[locale]}
              <span> / </span>
              {current.field[locale]}
            </p>
            <p className="lives-person-hook">{current.hook[locale]}</p>
            <p className="lives-person-summary">{current.summary[locale]}</p>
            <div
              className="lives-detail-tabs"
              role="tablist"
              aria-label={en ? "Biography sections" : "人物志章节"}
            >
              {(
                [
                  ["work", en ? "Contributions" : "代表成果"],
                  ["life", en ? "Life" : "生平片段"],
                  ["connections", en ? "Connections & sources" : "关系与出处"],
                ] as const
              ).map(([id, label], index) => (
                <button
                  id={`${uid}-tab-${id}`}
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  aria-controls={`${uid}-panel`}
                  tabIndex={tab === id ? 0 : -1}
                  onClick={() => setTab(id)}
                  onKeyDown={(event) => {
                    const ids: Tab[] = ["work", "life", "connections"];
                    const next =
                      event.key === "ArrowRight"
                        ? (index + 1) % 3
                        : event.key === "ArrowLeft"
                          ? (index + 2) % 3
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? 2
                              : -1;
                    if (next >= 0) {
                      event.preventDefault();
                      setTab(ids[next]);
                      document
                        .getElementById(`${uid}-tab-${ids[next]}`)
                        ?.focus();
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${tab}`}
              tabIndex={0}
              className="lives-detail-content"
            >
              {tab === "work" && (
                <div className="lives-achievements">
                  {current.achievements.map((item, index) => (
                    <article key={item.title.en}>
                      <div className="lives-achievement-meta">
                        <span>0{index + 1}</span>
                        <time>{item.year}</time>
                      </div>
                      <h3>{item.title[locale]}</h3>
                      <p>{item.description[locale]}</p>
                      {item.formula && <Formula value={item.formula} />}
                      {item.link && (
                        <Link
                          className="lives-inline-link"
                          href={`${en ? "/en" : ""}${item.link.href}`}
                        >
                          {item.link.label[locale]}
                          <ArrowUpRight size={12} />
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              )}
              {tab === "life" && (
                <ol className="lives-timeline">
                  {current.timeline.map((item, index) => (
                    <li key={`${item.year}-${index}`}>
                      <time>{item.year}</time>
                      <p>{item.text[locale]}</p>
                    </li>
                  ))}
                </ol>
              )}
              {tab === "connections" && (
                <div className="lives-relations">
                  {related.map((edge) => {
                    const other = mathematicians.find(
                      (person) =>
                        person.id ===
                        (edge.source === selected ? edge.target : edge.source),
                    )!;
                    return (
                      <article key={edge.id}>
                        <span
                          className="lives-relation-kind"
                          data-kind={edge.kind}
                        >
                          {names[edge.kind][locale]}
                        </span>
                        <button
                          className="lives-relative"
                          onClick={() => choose(other.id, true)}
                        >
                          {other.name[locale]}
                          <ArrowRight size={14} />
                        </button>
                        <p>{edge.description[locale]}</p>
                        <a
                          className="lives-source-link"
                          href={edge.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {en ? "Historical source" : "关系出处"}
                          <ArrowUpRight size={11} />
                        </a>
                      </article>
                    );
                  })}
                  <div className="lives-sources">
                    <h3>{en ? "Read the sources" : "继续查阅"}</h3>
                    {current.sources.map((source) => (
                      <a
                        key={source.href}
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.title}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a
              className="lives-portrait-credit"
              href={current.portrait.href}
              target="_blank"
              rel="noreferrer"
            >
              {current.portrait.credit[locale]}
              <ArrowUpRight size={12} />
            </a>
            {current.portrait.kind && current.portrait.kind !== "portrait" && (
              <p className="lives-portrait-note">
                {current.portrait.kind === "monogram"
                  ? en
                    ? "Name mark; no verified open portrait is used."
                    : "姓名字标：未采用缺乏依据或授权的肖像。"
                  : en
                    ? "A later depiction, not a verified likeness from life."
                    : "后世形象，不作为可靠的生前容貌记录。"}
              </p>
            )}
            {current.portrait.license && (
              <a
                className="lives-license"
                href={current.portrait.license.href}
                target="_blank"
                rel="noreferrer"
              >
                {current.portrait.license.label}
                <ArrowUpRight size={11} />
              </a>
            )}
            <button
              className="lives-return-map"
              onClick={() => {
                graphRef.current?.scrollIntoView({ block: "start" });
                graphRef.current
                  ?.querySelector<SVGGElement>(
                    '.lives-node[aria-pressed="true"]',
                  )
                  ?.focus();
              }}
            >
              {en ? "Back to the map" : "返回人物图谱"}
              <ArrowRight size={13} />
            </button>
          </aside>
        )}
      </div>
    </>
  );
}
