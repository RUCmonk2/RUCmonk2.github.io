"use client";

import katex from "katex";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  aiDomains,
  aiLevels,
  aiNodeById,
  aiNodes,
  aiRoutes,
  prerequisitesOf,
} from "@/data/ai-atlas";
import type { AILevel } from "@/data/ai-atlas/types";

import { KnowledgeMap } from "./knowledge-map";

const STORAGE = "ai-atlas-progress-v1";
export function AIAtlas({ locale }: { locale: "zh" | "en" }) {
  const en = locale === "en";
  const [domain, setDomain] = useState("all"),
    [route, setRoute] = useState("");
  const [selected, setSelected] = useState<string | null>(null),
    [query, setQuery] = useState("");
  const [level, setLevel] = useState<"all" | AILevel>("all"),
    [shared, setShared] = useState(false);
  const [view, setView] = useState<"map" | "list">("map"),
    [allLinks, setAllLinks] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]),
    [storageStatus, setStorageStatus] = useState("");
  const [neighborhood, setNeighborhood] = useState<string | null>(null);
  const dossier = useRef<HTMLElement>(null);
  const workspace = useRef<HTMLDivElement>(null);
  const focusMap = () =>
    requestAnimationFrame(() =>
      workspace.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  const current = selected ? aiNodeById.get(selected) : undefined;
  const activeDomain = aiDomains.find((d) => d.id === domain);
  const activeRoute = aiRoutes.find((r) => r.id === route);
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 700px)");
    const adaptView = () => {
      if (narrow.matches) setView("list");
    };
    adaptView();
    narrow.addEventListener("change", adaptView);
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
      if (Array.isArray(saved))
        setMastered(
          saved.filter(
            (id): id is string => typeof id === "string" && aiNodeById.has(id),
          ),
        );
    } catch {
      /* Local progress is optional. */
    }
    const restore = () => {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        id = "overview";
      }
      const node = aiNodeById.get(id);
      const savedDomain = id.startsWith("domain:")
        ? aiDomains.find((d) => d.id === id.slice(7))
        : undefined;
      const savedRoute = id.startsWith("route:")
        ? aiRoutes.find((r) => r.id === id.slice(6))
        : undefined;
      if (savedDomain || savedRoute) {
        setDomain(savedDomain?.id ?? "all");
        setRoute(savedRoute?.id ?? "");
        setSelected(null);
        setQuery("");
        setLevel("all");
        setShared(false);
        setNeighborhood(null);
      } else if (node) {
        setSelected(id);
        setDomain(node.domain);
        setRoute("");
        setQuery("");
        setLevel("all");
        setShared(false);
        setNeighborhood(null);
      } else if (id === "overview" || !id) {
        setSelected(null);
        setDomain("all");
        setRoute("");
        setQuery("");
        setLevel("all");
        setShared(false);
        setNeighborhood(null);
      }
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => {
      window.removeEventListener("hashchange", restore);
      narrow.removeEventListener("change", adaptView);
    };
  }, []);
  const neighborhoodIds = useMemo(() => {
    const anchor = neighborhood ? aiNodeById.get(neighborhood) : undefined;
    return new Set(
      anchor
        ? [
            anchor.id,
            ...prerequisitesOf(anchor.id),
            ...aiNodes
              .filter((n) => n.prerequisites.includes(anchor.id))
              .map((n) => n.id),
          ]
        : [],
    );
  }, [neighborhood]);
  const filtered = useMemo(
    () =>
      aiNodes.filter((n) => {
        const text =
          `${n.title.zh} ${n.title.en} ${n.summary} ${n.why}`.toLowerCase();
        if (query.trim()) return text.includes(query.trim().toLowerCase());
        return (
          (!neighborhood || neighborhoodIds.has(n.id)) &&
          (neighborhood ||
            ((!activeRoute || activeRoute.nodes.includes(n.id)) &&
              (domain === "all" || n.domain === domain))) &&
          (level === "all" || n.level === level) &&
          (!shared || n.scope === "shared")
        );
      }),
    [query, neighborhood, neighborhoodIds, activeRoute, domain, level, shared],
  );
  const overview =
    domain === "all" &&
    !route &&
    !neighborhood &&
    !query &&
    level === "all" &&
    !shared;
  const mapAvailable = overview || filtered.length <= 24;
  const displayList = view === "list" || !!query || !mapAvailable;
  function chooseDomain(id: string) {
    setDomain(id);
    setRoute("");
    setQuery("");
    setLevel("all");
    setShared(false);
    setNeighborhood(null);
    setSelected(null);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + "#domain:" + id,
    );
  }
  function chooseNode(id: string) {
    const node = aiNodeById.get(id);
    if (!node) return;
    setSelected(id);
    setStorageStatus("");
    if (query) {
      setQuery("");
      setDomain(node.domain);
      setRoute("");
      setLevel("all");
      setShared(false);
      setNeighborhood(null);
    }
    window.history.replaceState(null, "", `#${id}`);
  }
  function reset() {
    setDomain("all");
    setSelected(null);
    setRoute("");
    setQuery("");
    setLevel("all");
    setShared(false);
    setNeighborhood(null);
    window.history.replaceState(null, "", "#overview");
  }
  function chooseRoute(id: string) {
    focusMap();
    setRoute(id);
    setDomain("all");
    setSelected(null);
    setQuery("");
    setLevel("all");
    setShared(false);
    setNeighborhood(null);
    window.history.replaceState(null, "", `#route:${id}`);
  }
  function toggleProgress(id: string) {
    const next = mastered.includes(id)
      ? mastered.filter((x) => x !== id)
      : [...mastered, id];
    setMastered(next);
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setStorageStatus(en ? "Saved in this browser" : "已保存在此浏览器");
    } catch {
      setStorageStatus(
        en
          ? "Progress could not be saved; it remains for this visit only."
          : "浏览器无法保存，当前记录仅本次访问有效。",
      );
    }
  }
  const scopeTitle = query
    ? en
      ? "Search results"
      : "全图搜索结果"
    : neighborhood
      ? en
        ? "Prerequisite neighborhood"
        : "先修与后续知识"
      : (activeRoute?.title[locale] ??
        activeDomain?.title[locale] ??
        (en ? "The complete atlas" : "全景地图"));
  return (
    <>
      <nav
        className="ai-domains"
        aria-label={en ? "Choose a subject" : "选择领域子图"}
      >
        <button aria-pressed={overview} onClick={reset}>
          {en ? "Overview" : "总览"}
        </button>
        {aiDomains.map((d) => (
          <button
            key={d.id}
            onClick={() => chooseDomain(d.id)}
            aria-pressed={domain === d.id && !route}
          >
            {d.title[locale]}
          </button>
        ))}
      </nav>
      <div className="ai-toolbar">
        <div
          className="ai-view-switch"
          role="group"
          aria-label={en ? "Reading view" : "阅读方式"}
        >
          <button
            aria-pressed={!displayList}
            onClick={() => setView("map")}
            disabled={!mapAvailable || !!query}
          >
            {en ? "Network" : "知识网络"}
          </button>
          <button aria-pressed={displayList} onClick={() => setView("list")}>
            {en ? "Index" : "知识目录"}
          </button>
        </div>
        <label className="ai-search">
          <Search size={15} />
          <input
            type="search"
            aria-label={en ? "Search all concepts" : "搜索全部知识"}
            placeholder={
              en ? "Concept, method, problem…" : "搜索概念、方法或问题…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span className="ai-progress">
          <Check size={13} />
          {en
            ? `${mastered.length} marked learned`
            : `已掌握 ${mastered.length} / ${aiNodes.length}`}
        </span>
      </div>
      <div className="ai-filters">
        <label>
          {en ? "Level" : "学习层次"}
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as typeof level);
              setSelected(null);
            }}
          >
            <option value="all">{en ? "All levels" : "全部层次"}</option>
            {Object.entries(aiLevels).map(([id, label]) => (
              <option key={id} value={id}>
                {label[locale]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={shared}
            onChange={(e) => {
              setShared(e.target.checked);
              setSelected(null);
            }}
          />
          {en ? "Shared foundations only" : "只看共通主干"}
        </label>
        {!overview && !displayList && selected && (
          <label>
            <input
              type="checkbox"
              checked={allLinks}
              onChange={(e) => setAllLinks(e.target.checked)}
            />
            {en ? "All connections in this map" : "显示本图全部连线"}
          </label>
        )}
        <span>
          {en
            ? `${filtered.length} / ${aiNodes.length} concepts`
            : `范围 ${filtered.length} / ${aiNodes.length} 个知识点`}
        </span>
      </div>
      {query && (
        <p className="ai-scope-note" role="status">
          {en
            ? "Searching the complete atlas; subject and level filters are temporarily ignored."
            : "正在搜索全图；领域、学习层次和主干筛选暂不限制搜索结果。"}
        </p>
      )}
      <div
        ref={workspace}
        className={`ai-workspace ${current ? "has-dossier" : ""}`}
      >
        <section className="ai-map-column" aria-label={scopeTitle}>
          {!overview && (
            <header className="ai-scope-heading">
              <button onClick={reset}>
                <ArrowLeft size={14} />
                {en ? "Overview" : "返回总览"}
              </button>
              <h2>{scopeTitle}</h2>
              {activeDomain && !neighborhood && !query && (
                <p>{activeDomain.description}</p>
              )}
              {activeRoute && <p>{activeRoute.description}</p>}
              {neighborhood && (
                <p>
                  {en
                    ? "Includes earlier prerequisites and direct next steps. Large neighborhoods use the index."
                    : "包含递归先修和直接后续节点；范围较大时切换为目录，避免拥挤。"}
                </p>
              )}
            </header>
          )}
          {!filtered.length ? (
            <div className="ai-empty">
              <p>
                {en
                  ? "No concepts match these filters."
                  : "没有符合当前条件的知识点。"}
              </p>
              <button onClick={reset}>
                {en ? "Clear filters" : "清除筛选"}
              </button>
            </div>
          ) : displayList ? (
            <div className={overview ? "ai-subject-cards" : "ai-concept-list"}>
              {overview
                ? aiDomains.map((d, i) => (
                    <button
                      className="ai-subject-card"
                      key={d.id}
                      onClick={() => chooseDomain(d.id)}
                    >
                      <span>
                        {String(i + 1).padStart(2, "0")} / {d.symbol}
                      </span>
                      <h3>{d.title[locale]}</h3>
                      <p>{d.description}</p>
                      <small>
                        {aiNodes.filter((n) => n.domain === d.id).length}{" "}
                        {en ? "concepts" : "个知识点"}
                        <ArrowRight size={14} />
                      </small>
                    </button>
                  ))
                : filtered.map((n) => (
                    <button
                      key={n.id}
                      className={`ai-concept-row ${selected === n.id ? "is-active" : ""}`}
                      onClick={() => chooseNode(n.id)}
                      aria-pressed={selected === n.id}
                    >
                      <span className="ai-row-top">
                        <b>{n.title[locale]}</b>
                        {mastered.includes(n.id) && <Check size={14} />}
                      </span>
                      <span>{en ? n.title.zh : n.title.en}</span>
                      <small>
                        {aiLevels[n.level][locale]} ·{" "}
                        {n.scope === "shared"
                          ? en
                            ? "Shared core"
                            : "共通主干"
                          : en
                            ? "Specialist"
                            : "方向专题"}
                      </small>
                    </button>
                  ))}
            </div>
          ) : (
            <KnowledgeMap
              nodes={filtered}
              overview={overview}
              selected={selected}
              locale={locale}
              allLinks={allLinks || !selected}
              onDomain={chooseDomain}
              onSelect={chooseNode}
            />
          )}
          {!overview && filtered.length > 0 && (
            <details className="ai-compact-index">
              <summary>
                {en ? "All concepts in this view" : "本图知识索引"} ·{" "}
                {filtered.length}
              </summary>
              <div>
                {filtered.map((n) => (
                  <button
                    key={n.id}
                    aria-pressed={selected === n.id}
                    onClick={() => chooseNode(n.id)}
                  >
                    {n.title[locale]}
                  </button>
                ))}
              </div>
            </details>
          )}
          {!current && !overview && (
            <p className="ai-scope-note">
              {en
                ? "Choose a concept to read its explanation, examples and prerequisites."
                : "点击一个知识点，展开概念、例子、掌握标准与先修关系。"}
            </p>
          )}
        </section>
        {current && (
          <aside
            id="ai-current-card"
            className="ai-dossier"
            ref={dossier}
            aria-label={en ? "Selected concept" : "当前知识卡"}
          >
            <div className="ai-eyebrow">
              CONCEPT / {String(aiNodes.indexOf(current) + 1).padStart(3, "0")}
            </div>
            <div className="ai-dossier-tags">
              <span>{aiLevels[current.level][locale]}</span>
              <span>
                {current.scope === "shared"
                  ? en
                    ? "Shared core"
                    : "共通主干"
                  : en
                    ? "Specialist"
                    : "方向专题"}
              </span>
            </div>
            <h2>{current.title[locale]}</h2>
            <p className="ai-secondary-title">
              {en ? current.title.zh : current.title.en}
            </p>
            <button
              className={`ai-mastered ${mastered.includes(current.id) ? "is-done" : ""}`}
              onClick={() => toggleProgress(current.id)}
              aria-pressed={mastered.includes(current.id)}
            >
              <Check size={14} />
              {mastered.includes(current.id)
                ? en
                  ? "Marked learned"
                  : "已标记掌握"
                : en
                  ? "Mark as learned"
                  : "标记已掌握"}
            </button>
            <span className="ai-save-status" role="status">
              {storageStatus}
            </span>
            <p className="ai-summary">{current.summary}</p>
            <p className="ai-why">{current.why}</p>
            {current.formula && (
              <div
                className="ai-formula"
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(current.formula, {
                    throwOnError: false,
                    strict: "error",
                    output: "htmlAndMathml",
                    displayMode: true,
                  }),
                }}
              />
            )}
            <section>
              <h3>{en ? "What you should be able to do" : "学到什么程度"}</h3>
              <ol>
                {current.mastery.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </section>
            <section>
              <h3>{en ? "Try an example" : "一个具体例子"}</h3>
              <p>{current.example}</p>
            </section>
            <section className="ai-pitfall">
              <h3>{en ? "Conditions & common traps" : "条件与常见误区"}</h3>
              <p>{current.pitfall}</p>
            </section>
            <section>
              <h3>{en ? "Prepare first" : "先学这些"}</h3>
              {current.prerequisites.length ? (
                <div className="ai-node-links">
                  {current.prerequisites.map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        chooseDomain(aiNodeById.get(id)!.domain);
                        chooseNode(id);
                      }}
                    >
                      {aiNodeById.get(id)!.title[locale]}
                      <ArrowUpRight size={12} />
                    </button>
                  ))}
                </div>
              ) : (
                <p>
                  {en
                    ? "An entry point; no earlier concept is required in this atlas."
                    : "可作为本图的起点，没有指定更早的先修节点。"}
                </p>
              )}
              <button
                className="ai-text-button"
                onClick={() => {
                  setNeighborhood(current.id);
                  focusMap();
                  setLevel("all");
                  setShared(false);
                  setQuery("");
                  setRoute("");
                }}
              >
                {en ? "See prerequisites & next steps" : "展开先修与后续子图"}
                <ArrowRight size={13} />
              </button>
            </section>
            <section>
              <h3>{en ? "Continue from here" : "接下来可以学"}</h3>
              <div className="ai-node-links">
                {aiNodes
                  .filter((n) => n.prerequisites.includes(current.id))
                  .map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        chooseDomain(n.domain);
                        chooseNode(n.id);
                      }}
                    >
                      {n.title[locale]}
                      <ArrowUpRight size={12} />
                    </button>
                  ))}
              </div>
              {!aiNodes.some((n) => n.prerequisites.includes(current.id)) && (
                <p>
                  {en
                    ? "Continue through its references or the research route."
                    : "可沿参考资料继续深入，或进入研究实践路线。"}
                </p>
              )}
            </section>
            {!!current.related?.length && (
              <section>
                <h3>{en ? "Related ideas" : "横向联系"}</h3>
                <div className="ai-node-links">
                  {current.related.map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        chooseDomain(aiNodeById.get(id)!.domain);
                        chooseNode(id);
                      }}
                    >
                      {aiNodeById.get(id)!.title[locale]}
                    </button>
                  ))}
                </div>
              </section>
            )}
            <section className="ai-sources">
              <h3>{en ? "Read further" : "继续阅读"}</h3>
              {current.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </section>
            <p className="ai-local-note">
              {en
                ? "Self-assessed progress is stored only in this browser. Explanatory notes are in Chinese."
                : "掌握记录为自评，仅保存在当前浏览器。"}
            </p>
          </aside>
        )}
      </div>
      {current && (
        <a
          className="ai-mobile-dossier"
          href="#ai-current-card"
          onClick={(e) => {
            e.preventDefault();
            dossier.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {en ? "Read selected concept" : "阅读当前知识卡"}
          <ArrowRight size={14} />
        </a>
      )}
      <section className="ai-reading-routes" aria-labelledby="ai-routes-title">
        <div className="ai-section-heading">
          <span className="ai-eyebrow">FOLLOW A QUESTION</span>
          <h2 id="ai-routes-title">
            {en ? "Six paths into the atlas" : "从一个目标出发"}
          </h2>
          <p>
            {en
              ? "Reading selections, not complete degree plans. Use prerequisites to fill gaps."
              : "路线是问题导向的阅读选线；遇到缺口，沿先修关系补齐基础。"}
          </p>
        </div>
        <div className="ai-route-grid">
          {aiRoutes.map((r, i) => (
            <button
              key={r.id}
              className="ai-route"
              aria-pressed={r.id === route}
              onClick={() => chooseRoute(r.id)}
            >
              <span>
                0{i + 1} / {r.nodes.length} {en ? "stops" : "站"}
              </span>
              <h3>{r.title[locale]}</h3>
              <p>{r.description}</p>
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
      </section>
      <section className="ai-existing">
        <span className="ai-eyebrow">CONTINUE IN THE LIBRARY</span>
        <div>
          <Link href={`${en ? "/en" : ""}/learning/math-map/`}>
            {en ? "Mathematics map" : "数学知识网"}
            <ArrowUpRight size={14} />
          </Link>
          <Link href={`${en ? "/en" : ""}/learning/deep-learning/`}>
            {en ? "Deep learning notes" : "深度学习课程笔记"}
            <ArrowUpRight size={14} />
          </Link>
          <Link href={`${en ? "/en" : ""}/learning/computer-scientists/`}>
            {en ? "Lives in computing" : "信息学家人物志"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
