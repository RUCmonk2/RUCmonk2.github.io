"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Link2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  artworkNames,
  characterById,
  imageForCharacter,
  themes,
} from "@/data/shuowen";
import { shuowenArchives, shuowenGlyphs } from "@/data/shuowen/glyphs";
import { shuowenEdges } from "@/data/shuowen/relations";
import type { CharacterEntry, CharacterRoute } from "@/data/shuowen/types";

import { ScholarlyText } from "./scholarly-text";

function EvidenceImage({
  src,
  alt,
  title,
  caption,
  credit,
  sourceUrl,
  glyph = false,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  credit?: string;
  sourceUrl?: string;
  glyph?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`sw-evidence-image ${glyph ? "is-glyph" : ""}`}
          aria-label={`放大查看${title}`}
        >
          <Image src={src} alt={alt} width={900} height={750} unoptimized />
          <span className="sw-image-expand">
            <Expand size={13} />
            放大
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sw-image-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {credit || "AI 原创水墨意象 · 当代艺术演绎"}
        </DialogDescription>
        <div className={`sw-dialog-image ${glyph ? "is-glyph" : ""}`}>
          <Image src={src} alt={alt} width={1400} height={1100} unoptimized />
        </div>
        <p>
          <ScholarlyText text={caption} />
        </p>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            查看原始来源 <ArrowUpRight size={13} />
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CharacterGallery({ entry }: { entry: CharacterEntry }) {
  const [mode, setMode] = useState<"glyph" | "archive" | "art">("glyph");
  const glyphs = shuowenGlyphs[entry.char] || [];
  const archives = shuowenArchives[entry.char] || [];
  const artwork = imageForCharacter(entry.id, entry.theme);
  return (
    <section className="sw-gallery" aria-label={`${entry.char}的字形与图像`}>
      <div className="sw-gallery-tabs" aria-label="图像类型">
        <button
          aria-pressed={mode === "glyph"}
          onClick={() => setMode("glyph")}
        >
          字形对照
        </button>
        <button
          aria-pressed={mode === "archive"}
          onClick={() => setMode("archive")}
        >
          古籍原页
        </button>
        <button aria-pressed={mode === "art"} onClick={() => setMode("art")}>
          水墨意象
        </button>
      </div>
      {mode === "glyph" && (
        <>
          <div className="sw-glyph-comparison">
            <div className="sw-modern-character">
              <span>{entry.char}</span>
              <small>今字 · {entry.pinyin}</small>
            </div>
            <ArrowRight className="sw-glyph-arrow" size={19} strokeWidth={1} />
            {glyphs[0] ? (
              <div className="sw-old-character">
                <EvidenceImage
                  glyph
                  src={glyphs[0].src}
                  alt={glyphs[0].caption}
                  title={`${entry.char} · ${glyphs[0].period}`}
                  caption={glyphs[0].caption}
                  credit={`${glyphs[0].credit} · ${glyphs[0].license}`}
                  sourceUrl={glyphs[0].sourceUrl}
                />
                <small>{glyphs[0].period}</small>
              </div>
            ) : (
              <div className="sw-no-glyph">
                <span>{entry.shuowen.headword}</span>
                <small>关联字头 · 现代排字</small>
              </div>
            )}
          </div>
          <p className="sw-image-caption">
            <ScholarlyText
              text={
                glyphs[0]?.caption ||
                "此处未展示经核验的历史字形，先对照条目字头与释文。"
              }
            />
          </p>
          {glyphs.length > 1 && (
            <details className="sw-more-glyphs">
              <summary>更多字形与辨字对照 · {glyphs.length - 1}</summary>
              {glyphs.slice(1).map((glyph, index) => (
                <figure key={`${glyph.src}-${index}`}>
                  <EvidenceImage
                    glyph
                    src={glyph.src}
                    alt={glyph.caption}
                    title={`${entry.char} · ${glyph.period}`}
                    caption={glyph.caption}
                    credit={`${glyph.credit} · ${glyph.license}`}
                    sourceUrl={glyph.sourceUrl}
                  />
                  <figcaption>
                    <ScholarlyText text={glyph.caption} />
                  </figcaption>
                </figure>
              ))}
            </details>
          )}
          <p className="sw-glyph-footnote">
            字形对照用于辨认，不表示所有字都经历同一演变序列。
          </p>
        </>
      )}
      {mode === "archive" &&
        (archives.length ? (
          archives.map((archive, index) => (
            <figure
              className="sw-archive-figure"
              key={`${archive.src}-${index}`}
            >
              <EvidenceImage
                src={archive.src}
                alt={archive.caption}
                title={archive.title}
                caption={archive.caption}
                credit={`${archive.credit} · ${archive.license}`}
                sourceUrl={archive.sourceUrl}
              />
              <figcaption>
                {archive.title}
                <small>{archive.caption}</small>
              </figcaption>
            </figure>
          ))
        ) : (
          <div className="sw-source-fallback">
            <span className="sw-small-seal">原典</span>
            <h4>沿出处，回到原书</h4>
            <p>此字暂无本地影印页。可在来源中核对字头、释文和相关图版。</p>
            <a href={entry.shuowen.sourceUrl} target="_blank" rel="noreferrer">
              查阅「{entry.shuowen.headword}」原始资料{" "}
              <ArrowUpRight size={13} />
            </a>
          </div>
        ))}
      {mode === "art" && (
        <figure className="sw-art-figure">
          <EvidenceImage
            src={`/images/shuowen/art/${artwork}.webp`}
            alt={`${artworkNames[artwork]}，配合${entry.char}字阅读的原创水墨意象`}
            title={artworkNames[artwork]}
            caption={`为「${entry.char}」的阅读主题所作的当代意象，山水与物象是艺术演绎，不作为字源或历史字形的证据。`}
          />
          <figcaption>
            {artworkNames[artwork]}
            <small>AI 原创水墨 · 当代阅读意象</small>
          </figcaption>
        </figure>
      )}
    </section>
  );
}

export function CharacterReader({
  entry,
  route,
  onSelect,
  onExitRoute,
}: {
  entry: CharacterEntry;
  route?: CharacterRoute;
  onSelect: (id: string) => void;
  onExitRoute: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const copyInput = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const theme = themes.find((item) => item.id === entry.theme)!;
  const related = shuowenEdges.filter(
    (edge) => edge.source === entry.id || edge.target === entry.id,
  );
  const routeIndex = route?.nodes.indexOf(entry.id) ?? -1;
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setShareUrl("");
    setCopied(false);
  }, [entry.id]);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);
  useEffect(() => {
    if (shareUrl) copyInput.current?.select();
  }, [shareUrl]);
  async function copyLink() {
    const url = new URL(window.location.href);
    url.hash = entry.id;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
    } catch {
      setShareUrl(url.toString());
    }
  }
  function jump(section: string) {
    const element = scrollRef.current?.querySelector<HTMLElement>(
      `[data-section="${section}"]`,
    );
    if (!element || !scrollRef.current) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    if (window.matchMedia("(max-width: 850px)").matches) {
      element.scrollIntoView({ block: "start", behavior });
    } else {
      scrollRef.current.scrollTo({ top: element.offsetTop - 16, behavior });
    }
  }
  return (
    <aside
      className="sw-reader"
      id="sw-reader"
      aria-label={`${entry.char}字阅读`}
    >
      <div className="sw-reader-heading">
        <span>
          <i style={{ backgroundColor: theme.color }} />
          {theme.label}
        </span>
        <button
          className="sw-icon-button"
          onClick={copyLink}
          aria-label={`复制${entry.char}字的链接`}
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
        </button>
      </div>
      {shareUrl && (
        <div className="sw-share-fallback">
          <label>
            复制此字的直达链接
            <input
              ref={copyInput}
              readOnly
              value={shareUrl}
              onFocus={(event) => event.currentTarget.select()}
            />
          </label>
        </div>
      )}
      <div className="sw-reader-scroll" ref={scrollRef}>
        <header className="sw-entry-title">
          <div>
            <h2>{entry.char}</h2>
            <span className="sw-entry-pinyin">{entry.pinyin}</span>
          </div>
          <p>{entry.subtitle}</p>
        </header>
        <div className="sw-entry-facts">
          <span>
            字形 <b>{entry.traditional}</b>
          </span>
          <span>
            《说文》部属 <b>{entry.radical}</b>
          </span>
          {entry.shuowen.status === "related" && (
            <span className="sw-related-headword">
              参见 {entry.shuowen.headword}
            </span>
          )}
        </div>
        <CharacterGallery key={entry.id} entry={entry} />
        <nav className="sw-reader-jumps" aria-label="字卡阅读位置">
          <button onClick={() => jump("shuowen")}>
            说文 <ArrowDown size={10} />
          </button>
          <button onClick={() => jump("classic")}>
            老庄 <ArrowDown size={10} />
          </button>
          <button onClick={() => jump("reflection")}>
            随想 <ArrowDown size={10} />
          </button>
        </nav>
        <section className="sw-reading-section" data-section="shuowen">
          <h3>
            <span>01</span>《说文》怎么说
            <a
              href={entry.shuowen.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="查阅说文出处"
            >
              <ArrowUpRight size={14} />
            </a>
          </h3>
          {entry.shuowen.status === "related" && (
            <p className="sw-headword-note">
              本条通过「{entry.shuowen.headword}
              」及相关字书辨析今字，收录情况见下文。
            </p>
          )}
          <blockquote className="sw-shuowen-quote">
            <ScholarlyText text={entry.shuowen.original} />
          </blockquote>
          <p>
            <ScholarlyText text={entry.shuowen.explanation} />
          </p>
          <details className="sw-reading-detail">
            <summary>再看字形与构件</summary>
            <p>
              <ScholarlyText text={entry.formation} />
            </p>
            {entry.components.length > 0 && (
              <ul>
                {entry.components.map((part, index) => (
                  <li key={`${part.char}-${index}`}>
                    <strong>{part.char}</strong>
                    <span
                      className={`sw-role ${part.role === "声旁" ? "is-sound" : ""}`}
                    >
                      {part.role}
                    </span>
                    {part.explanation}
                  </li>
                ))}
              </ul>
            )}
          </details>
        </section>
        <section className="sw-reading-section" data-section="classic">
          <h3>
            <span>02</span>放回老庄中读
          </h3>
          {entry.passages.map((passage, index) => (
            <div className="sw-passage" key={`${passage.chapter}-${index}`}>
              <a
                className="sw-passage-source"
                href={passage.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                {passage.work} · {passage.chapter}
                <ArrowUpRight size={12} />
              </a>
              <blockquote>
                <ScholarlyText text={passage.quote} />
              </blockquote>
              <p>
                <ScholarlyText text={passage.explanation} />
              </p>
            </div>
          ))}
        </section>
        <section
          className="sw-reading-section sw-reflection"
          data-section="reflection"
        >
          <h3>
            <span>03</span>读字随想<small>当代取义</small>
          </h3>
          <p>
            <ScholarlyText text={entry.reflection} />
          </p>
        </section>
        <details className="sw-caution">
          <summary>辨义与考据说明</summary>
          <p>
            <ScholarlyText text={entry.caution} />
          </p>
        </details>
        <section className="sw-reading-section sw-related">
          <h3>
            <span>04</span>循线再读<small>{related.length} 处联系</small>
          </h3>
          {related.map((edge) => {
            const other = characterById.get(
              edge.source === entry.id ? edge.target : edge.source,
            )!;
            return (
              <button key={edge.id} onClick={() => onSelect(other.id)}>
                <b>{other.char}</b>
                <span>
                  {edge.label}
                  <small>
                    {edge.type === "text"
                      ? "原典关联"
                      : edge.type === "contrast"
                        ? "概念对读"
                        : "主题导读"}
                  </small>
                </span>
                <ArrowRight size={14} />
              </button>
            );
          })}
        </section>
        <details className="sw-sources">
          <summary>原典、字形与参考资料</summary>
          <ol>
            {entry.sources.map((source, index) => (
              <li key={`${source.url}-${index}`}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                  <ArrowUpRight size={12} />
                </a>
              </li>
            ))}
          </ol>
          {(shuowenGlyphs[entry.char] || []).map((glyph, index) => (
            <p key={`${glyph.src}-${index}`}>
              <a href={glyph.sourceUrl} target="_blank" rel="noreferrer">
                {glyph.period} · {glyph.credit} <ArrowUpRight size={12} />
              </a>
              <small>{glyph.license}</small>
            </p>
          ))}
        </details>
        <p className="sw-reader-end">一字读罢，循线再行。</p>
      </div>
      {route && routeIndex >= 0 && (
        <div className="sw-route-progress">
          <div>
            <span>{route.title}</span>
            <button onClick={onExitRoute}>退出路线</button>
          </div>
          <nav aria-label="导读路线进度">
            <button
              disabled={routeIndex === 0}
              onClick={() => onSelect(route.nodes[routeIndex - 1])}
              aria-label="路线中的上一字"
            >
              <ChevronLeft size={17} />
            </button>
            <span>
              {route.nodes.map((id, index) => (
                <button
                  key={id}
                  aria-label={`路线第${index + 1}字：${characterById.get(id)?.char}`}
                  aria-current={id === entry.id ? "step" : undefined}
                  onClick={() => onSelect(id)}
                >
                  {characterById.get(id)?.char}
                </button>
              ))}
            </span>
            <button
              disabled={routeIndex === route.nodes.length - 1}
              onClick={() => onSelect(route.nodes[routeIndex + 1])}
              aria-label="路线中的下一字"
            >
              <ChevronRight size={17} />
            </button>
          </nav>
        </div>
      )}
    </aside>
  );
}
