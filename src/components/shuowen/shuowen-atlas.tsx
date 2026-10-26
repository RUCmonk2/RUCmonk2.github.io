"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Grid2X2,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useState } from "react";

import {
  characterById,
  shuowenCharacters,
  shuowenRoutes,
  themes,
} from "@/data/shuowen";
import { relationTypes } from "@/data/shuowen/relations";
import type { CharacterRoute } from "@/data/shuowen/types";

import { CharacterMap, FormationMap } from "./character-map";
import { CharacterReader } from "./character-reader";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f\s]/g, "")
    .toLowerCase();
const tabs = [
  { id: "map", label: "字义图谱", icon: Compass },
  { id: "index", label: "七十二字", icon: Grid2X2 },
  { id: "routes", label: "循字读道", icon: BookOpen },
] as const;
type View = (typeof tabs)[number]["id"];

function RouteCards({
  onStart,
  compact = false,
}: {
  onStart: (route: CharacterRoute) => void;
  compact?: boolean;
}) {
  return (
    <div className={`sw-route-cards ${compact ? "is-compact" : ""}`}>
      {shuowenRoutes.map((route, index) => (
        <button
          key={route.id}
          onClick={() => onStart(route)}
          className="sw-route-card"
        >
          <div className="sw-route-art">
            <Image
              src={`/images/shuowen/art/${route.image}.webp`}
              alt=""
              width={600}
              height={450}
              unoptimized
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="sw-route-body">
            <span className="sw-kicker">{route.nodes.length} 字一程</span>
            <h3>
              {route.title}
              <ArrowUpRight size={17} />
            </h3>
            <p>{route.description}</p>
            <div className="sw-route-characters">
              {route.nodes.map((id) => (
                <span key={id}>{characterById.get(id)?.char}</span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function ShuowenAtlas({ en = false }: { en?: boolean }) {
  const [selected, setSelected] = useState("dao");
  const [view, setView] = useState<View>("map");
  const [layer, setLayer] = useState<"meaning" | "form">("meaning");
  const [theme, setTheme] = useState("all");
  const [query, setQuery] = useState("");
  const [relationType, setRelationType] = useState("all");
  const [routeId, setRouteId] = useState<string | null>(null);
  const entry = characterById.get(selected) || shuowenCharacters[0];
  const route = shuowenRoutes.find((item) => item.id === routeId);
  const results = useMemo(
    () =>
      shuowenCharacters.filter((item) => {
        const category = themes.find(
          (candidate) => candidate.id === item.theme,
        )!;
        return (
          (theme === "all" || item.theme === theme) &&
          normalize(
            `${item.char} ${item.traditional} ${item.pinyin} ${item.shuowen.headword} ${item.aliases.join(" ")} ${item.subtitle} ${category.label}`,
          ).includes(normalize(query))
        );
      }),
    [theme, query],
  );
  const visibleIds = useMemo(
    () => new Set(results.map((item) => item.id)),
    [results],
  );
  useEffect(() => {
    const readHash = () => {
      let hash = "";
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        hash = "";
      }
      const next = characterById.has(hash)
        ? hash
        : shuowenCharacters.find(
            (item) => item.char === hash || item.traditional === hash,
          )?.id || "dao";
      setSelected(next);
      setQuery("");
      setTheme("all");
      setRouteId((current) =>
        shuowenRoutes.find((item) => item.id === current)?.nodes.includes(next)
          ? current
          : null,
      );
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, []);
  function select(id: string, scroll = true) {
    if (!characterById.has(id)) return;
    setSelected(id);
    if (!visibleIds.has(id)) {
      setTheme("all");
      setQuery("");
    }
    if (route && !route.nodes.includes(id)) setRouteId(null);
    if (window.location.hash !== `#${id}`)
      window.history.pushState({}, "", `#${id}`);
    if (scroll && window.matchMedia("(max-width: 850px)").matches)
      document
        .getElementById("sw-reader")
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  function startRoute(next: CharacterRoute) {
    setRouteId(next.id);
    setView("map");
    setLayer("meaning");
    setTheme("all");
    setQuery("");
    setRelationType("all");
    setSelected(next.nodes[0]);
    window.history.pushState({}, "", `#${next.nodes[0]}`);
    document
      .getElementById("sw-explore")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  return (
    <main className="sw-page">
      <div className="sw-shell">
        <div className="sw-topline">
          <Link href={en ? "/en/learning/" : "/learning/"}>
            <ArrowLeft size={13} />
            {en ? "Back to learning" : "返回学习"}
          </Link>
          <span>
            一字一世界 <i /> A JOURNEY THROUGH CHINESE CHARACTERS
          </span>
        </div>
        <header className="sw-hero">
          <Image
            className="sw-hero-landscape"
            src="/images/shuowen/art/dao.webp"
            alt=""
            width={960}
            height={720}
            priority
            unoptimized
          />
          <div className="sw-hero-copy">
            <p className="sw-kicker">观其形 · 读其义 · 会其道</p>
            <div className="sw-title-line">
              <div className="sw-title-seal" aria-hidden="true">
                字里
                <br />
                观道
              </div>
              <h1>说文解字</h1>
            </div>
            <p className="sw-hero-tagline">从一个字，走进一重天地。</p>
            <p className="sw-hero-description">
              七十二字，循形入义。
              <br className="sw-mobile-break" />
              在《说文》与老庄之间，读字，也观心。
            </p>
            <div className="sw-hero-counts">
              <span>
                <b>72</b>精选汉字
              </span>
              <span>
                <b>09</b>阅读主题
              </span>
              <span>
                <b>06</b>循字路径
              </span>
            </div>
          </div>
          <div className="sw-name-entry">
            <span className="sw-kicker">三字并读 · 一段自己的路</span>
            <div>
              {["ye", "yao", "zhi"].map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setView("map");
                    select(id, false);
                    document
                      .getElementById("sw-explore")
                      ?.scrollIntoView({ block: "start", behavior: "smooth" });
                  }}
                  aria-label={`阅读${characterById.get(id)?.char}字`}
                >
                  <b>
                    {characterById.get(id)?.char ||
                      { ye: "叶", yao: "耀", zhi: "之" }[id]}
                  </b>
                  <small>{{ ye: "yè", yao: "yào", zhi: "zhī" }[id]}</small>
                </button>
              ))}
            </div>
            <button
              className="sw-name-route"
              onClick={() => startRoute(shuowenRoutes[5])}
            >
              生长 · 光明 · 前往
              <ArrowRight size={14} />
            </button>
          </div>
        </header>
        <div className="sw-viewbar" id="sw-explore">
          <nav aria-label="阅读视图">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                aria-pressed={view === tab.id}
                onClick={() => setView(tab.id)}
              >
                <tab.icon size={16} strokeWidth={1.5} />
                {tab.label}
                {tab.id === "index" && <small>72</small>}
              </button>
            ))}
          </nav>
          <span>字源有据，读字有趣。</span>
        </div>
        {en && (
          <p className="sw-language-note">
            A curated Chinese reading atlas. Character notes and classical
            passages are in Chinese.
          </p>
        )}
        <div className="sw-workspace">
          <section className="sw-explorer" aria-label="探索汉字">
            {view !== "routes" && (
              <>
                <div className="sw-filters">
                  <div className="sw-theme-filters" aria-label="阅读主题">
                    <button
                      aria-pressed={theme === "all"}
                      onClick={() => setTheme("all")}
                    >
                      全部
                    </button>
                    {themes.map((item) => (
                      <button
                        key={item.id}
                        aria-pressed={theme === item.id}
                        onClick={() => setTheme(item.id)}
                        style={{ "--theme-color": item.color } as CSSProperties}
                      >
                        <i />
                        {item.short}
                      </button>
                    ))}
                  </div>
                  <div className="sw-search">
                    <Search size={14} />
                    <input
                      aria-label="搜索汉字、拼音或主题"
                      placeholder="寻字、访义、搜拼音"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    {query && (
                      <button
                        aria-label="清除搜索"
                        onClick={() => setQuery("")}
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
                {(query || theme !== "all") && (
                  <div className="sw-search-results" aria-live="polite">
                    <span>找到 {results.length} 字</span>
                    {results.length ? (
                      <div>
                        {results.map((item) => (
                          <button
                            key={item.id}
                            aria-pressed={selected === item.id}
                            onClick={() => select(item.id)}
                          >
                            {item.char}
                            <small>{item.pinyin}</small>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p>尚未找到这个字。试试简繁字形、拼音，或清除筛选。</p>
                    )}
                    <button
                      className="sw-clear-filters"
                      onClick={() => {
                        setQuery("");
                        setTheme("all");
                      }}
                    >
                      清除筛选
                    </button>
                  </div>
                )}
              </>
            )}
            {view === "map" && (
              <>
                <div className="sw-layerbar">
                  <div className="sw-layer-switch" aria-label="图谱观察方式">
                    <button
                      aria-pressed={layer === "meaning"}
                      onClick={() => setLayer("meaning")}
                    >
                      义理关系
                    </button>
                    <button
                      aria-pressed={layer === "form"}
                      onClick={() => setLayer("form")}
                    >
                      字形关系
                    </button>
                  </div>
                  {layer === "meaning" ? (
                    <select
                      aria-label="关系类型"
                      value={relationType}
                      onChange={(event) => setRelationType(event.target.value)}
                    >
                      <option value="all">全部关系</option>
                      {relationTypes.map((type) => (
                        <option value={type.id} key={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="sw-layer-note">
                      正在辨析「{entry.char}」
                    </span>
                  )}
                </div>
                {layer === "meaning" ? (
                  <CharacterMap
                    selected={selected}
                    visibleIds={visibleIds}
                    relationType={relationType}
                    onSelect={select}
                  />
                ) : (
                  <FormationMap
                    key={entry.id}
                    entry={entry}
                    onSelect={select}
                  />
                )}
                <div className="sw-map-legend">
                  {layer === "meaning" ? (
                    relationTypes.map((type) => (
                      <span key={type.id}>
                        <i className={`sw-legend-${type.id}`} />
                        {type.label}
                      </span>
                    ))
                  ) : (
                    <>
                      <span>
                        <i className="sw-legend-text" />
                        形旁 / 构件
                      </span>
                      <span>
                        <i className="sw-legend-contrast" />
                        声旁
                      </span>
                    </>
                  )}
                  <small>关系示意 · 点线可读</small>
                </div>
              </>
            )}
            {view === "index" && (
              <div className="sw-character-index">
                {themes.map((group) => {
                  const entries = results.filter(
                    (item) => item.theme === group.id,
                  );
                  return entries.length ? (
                    <section key={group.id}>
                      <header>
                        <h3>
                          <i style={{ backgroundColor: group.color }} />
                          {group.label}
                        </h3>
                        <p>{group.description}</p>
                      </header>
                      <div className="sw-index-grid">
                        {entries.map((item) => (
                          <button
                            key={item.id}
                            aria-pressed={selected === item.id}
                            onClick={() => select(item.id)}
                          >
                            <span>{item.char}</span>
                            <small>{item.pinyin}</small>
                            <p>{item.subtitle}</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  ) : null;
                })}
              </div>
            )}
            {view === "routes" && (
              <div className="sw-routes-view">
                <p className="sw-kicker">从一条线索，进入字的世界</p>
                <h2>不必从第一页读起。</h2>
                <p>选择一个此刻关心的问题，沿着几个字，慢慢走进去。</p>
                <RouteCards onStart={startRoute} />
              </div>
            )}
          </section>
          <CharacterReader
            entry={entry}
            route={route}
            onSelect={select}
            onExitRoute={() => setRouteId(null)}
          />
        </div>
        {view !== "routes" && (
          <section className="sw-guides">
            <header>
              <div>
                <p className="sw-kicker">SIX WAYS INTO THE CHARACTERS</p>
                <h2>一字之外，另有天地。</h2>
              </div>
              <p>
                从水、虚静或一场蝴蝶梦开始，
                <br />
                让一条线索带你读下去。
              </p>
            </header>
            <RouteCards onStart={startRoute} compact />
          </section>
        )}
        <section className="sw-colophon">
          <div className="sw-colophon-intro">
            <span className="sw-small-seal">
              说文
              <br />
              读道
            </span>
            <div>
              <h2>字源有来处，理解有层次。</h2>
              <p>
                以《说文解字》为入口，以老庄为伴读。
                <br />
                这是一份七十二字的阅读选编，也是一场仍可继续的追问。
              </p>
            </div>
          </div>
          <details>
            <summary>关于这份字观 · 文献、图像与编选方法</summary>
            <div className="sw-method-grid">
              <div>
                <h3>先辨字，再读思想</h3>
                <p>
                  每字分别呈现字书释文、字形分析、老庄用例与当代随想。《说文》的解释史与现代古文字研究分开标明；关联字、新附字及异文在各条说明。
                </p>
              </div>
              <div>
                <h3>每一条线，都有理由</h3>
                <p>
                  原典关联、概念对读和主题导读采用不同线型。字形层区别形旁、声旁和构件；同部首、语义相近不自动等于同源。
                </p>
              </div>
              <div>
                <h3>图像各有身份</h3>
                <p>
                  字形卡注明现代摹写、字体排印或古籍影印，保留作者、许可和出处。十二幅水墨画为
                  AI 原创意象，不作为考据证据。
                </p>
                <a
                  href="/images/shuowen/glyphs/sources.json"
                  target="_blank"
                  rel="noreferrer"
                >
                  字形素材来源记录
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <div>
                <h3>七十二字的取舍</h3>
                <p>
                  以老庄的重要概念和代表性意象为主，另收叶、耀、之。这是主题选编，不是全书索引，也不是道家用字频率排名。简繁字形以各条语境为准。
                </p>
              </div>
            </div>
          </details>
        </section>
        <footer className="sw-bottom">
          <span>说文解字 · 字里观道</span>
          <span>读一个字，留一点空。</span>
          <Link href={en ? "/en/learning/shanhai/" : "/learning/shanhai/"}>
            再游山海 <ArrowUpRight size={12} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
