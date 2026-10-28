"use client";

import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  BRIEF_DATA_URL,
  type BriefFeed,
  type BriefItem,
  briefTime,
  currentBriefDate,
  parseBriefFeed,
  readableDate,
} from "./report-data";

type LoadState = "loading" | "ready" | "pending" | "error";

const trackNames: Record<string, string> = {
  scientific_discovery: "AI 科学发现与过程评测",
  residual_architecture: "残差连接与深度信息混合",
  math_tcs_sketch: "AI4Math · AI4TCS · 图流 Sketch",
  calligraphy: "书法生成、评价与最小修改",
  foundational_science: "AI 与基础科学重大进展",
  research_perspectives: "研究思想与智能系统架构",
};

function ResearchItem({ item, index }: { item: BriefItem; index: number }) {
  return (
    <li className="brief-item">
      <span className="brief-item-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <article>
        <p className="brief-item-track">
          {trackNames[item.track] ?? "研究进展"}
          {(item.contentType === "perspective" ||
            item.track === "research_perspectives") &&
            " · 观点长文"}
        </p>
        <h3>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
            <ArrowUpRight aria-label="在新标签页阅读原文" size={18} />
          </a>
        </h3>
        <p className="brief-item-summary">{item.summary}</p>
        <p className="brief-item-relevance">
          <span>研究关联</span>
          {item.researchRelevance}
        </p>
        <div className="brief-item-source">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            原文 · {item.sourceName}
          </a>
          <span>
            {item.dateLabel}：
            <time dateTime={item.publishedAt}>
              {item.datePrecision === "day"
                ? readableDate(item.publishedAt.slice(0, 10))
                : briefTime(item.publishedAt)}
            </time>
          </span>
        </div>
        {item.evidenceQuote && (
          <details className="brief-evidence">
            <summary>
              原文依据
              {item.evidenceKind === "abstract" && " · 论文摘要，未审阅全文"}
            </summary>
            <blockquote>{item.evidenceQuote}</blockquote>
          </details>
        )}
      </article>
    </li>
  );
}

export function MorningBrief() {
  const [feed, setFeed] = useState<BriefFeed | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [error, setError] = useState("");
  const [today, setToday] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const requestRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    requestRef.current?.abort();
    const request = new AbortController();
    requestRef.current = request;
    const timeout = window.setTimeout(() => request.abort(), 12000);
    setLoadState("loading");
    setError("");
    setToday(currentBriefDate());
    try {
      const response = await fetch(BRIEF_DATA_URL, {
        signal: request.signal,
        credentials: "omit",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (requestRef.current !== request) return;
      if (response.status === 404) {
        setLoadState("pending");
        return;
      }
      if (!response.ok) throw new Error("fetch");
      let nextFeed: BriefFeed;
      try {
        nextFeed = parseBriefFeed(await response.json());
      } catch {
        throw new Error("data");
      }
      if (requestRef.current !== request) return;
      setFeed(nextFeed);
      setSelectedDate((previous) =>
        nextFeed.reports.some((report) => report.date === previous)
          ? previous
          : (nextFeed.reports[0]?.date ?? ""),
      );
      setLoadState("ready");
    } catch (reason) {
      if (requestRef.current !== request) return;
      setError(
        reason instanceof Error && reason.message === "data"
          ? "晨报数据暂不可用，请稍后刷新。"
          : "暂时无法取得晨报，请稍后刷新。",
      );
      setLoadState("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const clock = window.setInterval(() => setToday(currentBriefDate()), 60000);
    return () => {
      requestRef.current?.abort();
      requestRef.current = null;
      window.clearInterval(clock);
    };
  }, [refresh]);

  const latest = feed?.reports[0];
  const report = feed?.reports.find((item) => item.date === selectedDate);
  const isToday = Boolean(today && report?.date === today);
  const futureDate = Boolean(today && report && report.date > today);
  const missingToday = Boolean(today && latest && latest.date < today);
  const noReports = !report;
  const showTodayEmpty = isToday && loadState === "ready";
  const displayDate = report?.date ?? today;

  return (
    <section className="brief-reader" lang="zh-CN" aria-label="中文科研晨报">
      <div className="brief-toolbar">
        <div className="brief-issue-date">
          {displayDate ? (
            <time dateTime={displayDate}>{readableDate(displayDate)}</time>
          ) : (
            <span>正在核对日期</span>
          )}
          <span className="brief-issue-label">
            {report ? (isToday ? "本日刊" : "往期日报") : "待生成"}
          </span>
        </div>
        <div className="brief-controls">
          {feed && feed.reports.length > 1 && (
            <div className="brief-archive">
              <label htmlFor="brief-date">往期</label>
              <select
                id="brief-date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                aria-label="选择日报日期"
              >
                {feed.reports.map((item) => (
                  <option key={item.date} value={item.date}>
                    {item.date}
                    {item.date === today ? " · 今日" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="button"
            className="brief-refresh"
            disabled={loadState === "loading"}
            onClick={() => void refresh()}
            aria-label="刷新晨报"
          >
            <RefreshCw size={14} aria-hidden="true" />
            {loadState === "loading" ? "读取中" : "刷新"}
          </button>
        </div>
      </div>

      <div className="brief-announcement" role="status" aria-live="polite">
        {loadState === "error" && (
          <p className="brief-notice">
            {error}
            {report && "下方保留上次取得的日报，尚未确认最新状态。"}
          </p>
        )}
        {report && loadState === "pending" && (
          <p className="brief-notice">
            最新日报暂未取得，下方为上次取得的日报。
          </p>
        )}
        {report && missingToday && loadState === "ready" && (
          <p className="brief-notice">
            今日晨报尚未更新。最近一期为 {latest?.date}
            ，以下是按日期归档的内容。
          </p>
        )}
      </div>

      <div className="brief-content" aria-busy={loadState === "loading"}>
        {noReports ? (
          <div className="brief-quiet-state">
            <span className="brief-state-mark" aria-hidden="true">
              待
            </span>
            <h2>
              {loadState === "loading"
                ? "正在读取晨报"
                : loadState === "error"
                  ? "晨报暂未取得"
                  : "首份晨报尚未生成"}
            </h2>
            <p>
              {loadState === "loading"
                ? "正在核对最新一期与归档日期。"
                : loadState === "error"
                  ? "本次读取未完成，不能据此判断今天是否有重要进展。"
                  : "等待采集与筛选完成后，这里才会出现正式日报。"}
            </p>
          </div>
        ) : futureDate || report.status === "incomplete" ? (
          <div className="brief-quiet-state brief-incomplete">
            <span className="brief-state-mark" aria-hidden="true">
              待
            </span>
            <h2>
              {futureDate
                ? "日报日期待核对"
                : isToday
                  ? "今日晨报未完成"
                  : "本期晨报未完成"}
            </h2>
            <p>
              {futureDate
                ? "这期日报的日期晚于当前日期，请稍后刷新。"
                : report.message || "采集或筛选尚未完成，请稍后再来。"}
            </p>
          </div>
        ) : report.status === "empty" ? (
          <div className="brief-quiet-state">
            <span className="brief-state-mark" aria-hidden="true">
              静
            </span>
            <h2>{showTodayEmpty ? "今日没有大事发生" : "本期没有大事发生"}</h2>
            {!showTodayEmpty && (
              <p>
                {isToday
                  ? "这是本日已保存的筛选结果；最新状态尚未确认。"
                  : `${readableDate(report.date)}的筛选结果；不代表今天的情况。`}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="brief-edition-line">
              <h2>{isToday ? "今日精选" : "本期精选"}</h2>
              <span>{report.items.length} 条进展</span>
            </div>
            <ol className="brief-items">
              {report.items.map((item, index) => (
                <ResearchItem key={item.id} item={item} index={index} />
              ))}
            </ol>
          </>
        )}
      </div>

      <footer className="brief-colophon">
        <span>仅覆盖已配置来源 · 时间均为 UTC+8</span>
        {report && (
          <span>
            本期生成于{" "}
            <time dateTime={report.generatedAt}>
              {briefTime(report.generatedAt)}
            </time>
          </span>
        )}
      </footer>
    </section>
  );
}
