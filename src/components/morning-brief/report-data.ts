export const BRIEF_DATA_URL =
  "https://raw.githubusercontent.com/RUCmonk2/RUCmonk2.github.io/morning-brief-data/latest.json";

export type BriefItem = {
  id: string;
  title: string;
  summary: string;
  researchRelevance: string;
  track: string;
  sourceName: string;
  url: string;
  publishedAt: string;
  dateLabel: string;
  evidenceKind: string;
  evidenceQuote: string;
  discoveryUrl?: string;
  contentType?: "perspective";
  datePrecision?: "day";
};

export type BriefReport = {
  date: string;
  generatedAt: string;
  status: "ready" | "empty" | "incomplete";
  message: string;
  items: BriefItem[];
};

export type BriefFeed = {
  schemaVersion: 1;
  updatedAt: string;
  reports: BriefReport[];
};

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid report data");
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, maxLength = 1600, allowEmpty = false): string {
  if (
    typeof value !== "string" ||
    value.length > maxLength ||
    (!allowEmpty && !value.trim())
  ) {
    throw new Error("Invalid report text");
  }
  return value.trim();
}

function timestamp(value: unknown): string {
  const result = text(value, 40);
  if (
    !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      result,
    ) ||
    !Number.isFinite(Date.parse(result))
  ) {
    throw new Error("Invalid report timestamp");
  }
  reportDate(result.slice(0, 10));
  return result;
}

function reportDate(value: unknown): string {
  const result = text(value, 10);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(result) ||
    !Number.isFinite(Date.parse(`${result}T00:00:00Z`)) ||
    new Date(`${result}T00:00:00Z`).toISOString().slice(0, 10) !== result
  ) {
    throw new Error("Invalid report date");
  }
  return result;
}

function publicUrl(value: unknown): string {
  const result = text(value, 2048);
  const url = new URL(result);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error("Invalid source URL");
  }
  return url.href;
}

function parseItem(value: unknown): BriefItem {
  const item = record(value);
  if (
    (item.contentType !== undefined && item.contentType !== "perspective") ||
    (item.datePrecision !== undefined && item.datePrecision !== "day")
  ) {
    throw new Error("Invalid report content type or date precision");
  }
  return {
    id: text(item.id, 128),
    title: text(item.title, 240),
    summary: text(item.summary),
    researchRelevance: text(item.researchRelevance, 800),
    track: text(item.track, 120),
    sourceName: text(item.sourceName, 160),
    url: publicUrl(item.url),
    publishedAt: timestamp(item.publishedAt),
    dateLabel: text(item.dateLabel, 40),
    evidenceKind: text(item.evidenceKind, 80),
    evidenceQuote: text(item.evidenceQuote, 1200, true),
    ...(item.contentType === "perspective"
      ? { contentType: "perspective" as const }
      : {}),
    ...(item.datePrecision === "day" ? { datePrecision: "day" as const } : {}),
    ...(item.discoveryUrl
      ? { discoveryUrl: publicUrl(item.discoveryUrl) }
      : {}),
  };
}

/** Reject broken data as a whole; never infer an empty day from missing items. */
export function parseBriefFeed(value: unknown): BriefFeed {
  const feed = record(value);
  if (
    feed.schemaVersion !== 1 ||
    !Array.isArray(feed.reports) ||
    feed.reports.length > 14
  ) {
    throw new Error("Unsupported report data");
  }
  const dates = new Set<string>();
  const reports = feed.reports.map((value): BriefReport => {
    const report = record(value);
    const date = reportDate(report.date);
    if (
      dates.has(date) ||
      !["ready", "empty", "incomplete"].includes(String(report.status)) ||
      !Array.isArray(report.items) ||
      report.items.length > 3 ||
      (report.status === "ready" && report.items.length === 0) ||
      (report.status !== "ready" && report.items.length !== 0)
    ) {
      throw new Error("Inconsistent report state");
    }
    dates.add(date);
    const items = report.items.map(parseItem);
    if (
      items.filter(
        (item) =>
          item.contentType === "perspective" ||
          item.track === "research_perspectives",
      ).length > 1
    ) {
      throw new Error("Too many perspective articles");
    }
    if (new Set(items.map((item) => item.id)).size !== items.length) {
      throw new Error("Duplicate report items");
    }
    return {
      date,
      generatedAt: timestamp(report.generatedAt),
      status: report.status as BriefReport["status"],
      message: text(report.message, 1600, true),
      items,
    };
  });
  return {
    schemaVersion: 1,
    updatedAt: timestamp(feed.updatedAt),
    reports: reports.sort((a, b) => b.date.localeCompare(a.date)),
  };
}

export function currentBriefDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((value) => value.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function readableDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${year} 年 ${month} 月 ${day} 日`;
}

export function briefTime(timestamp: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Taipei",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}
