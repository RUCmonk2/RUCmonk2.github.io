"use client";

import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { MathMapGraph } from "@/components/math-map/math-map-graph";
import { aiLevels, aiNodeById, aiNodes } from "@/data/ai-atlas";
import { aiKnowledgeAtlas } from "@/data/ai-atlas/knowledge-atlas";
import type { AILevel } from "@/data/ai-atlas/types";
import type { AtlasNode } from "@/data/knowledge-atlas";

const STORAGE = "ai-atlas-progress-v1";
export function AIAtlas({ locale }: { locale: "zh" | "en" }) {
  const en = locale === "en";
  const [level, setLevel] = useState<"all" | AILevel>("all");
  const [shared, setShared] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState("");
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
      if (Array.isArray(saved))
        setMastered([
          ...new Set(
            saved.filter(
              (id): id is string =>
                typeof id === "string" && aiNodeById.has(id),
            ),
          ),
        ]);
    } catch {
      /* Progress is optional; reading works without browser storage. */
    }
  }, []);
  const nodeFilter = useCallback(
    (node: AtlasNode) => {
      const concept = aiNodeById.get(node.id)!;
      return (
        (level === "all" || concept.level === level) &&
        (!shared || concept.scope === "shared")
      );
    },
    [level, shared],
  );
  const resetFilters = useCallback(() => {
    setLevel("all");
    setShared(false);
  }, []);
  function toggleProgress(id: string) {
    const next = mastered.includes(id)
      ? mastered.filter((x) => x !== id)
      : [...mastered, id];
    setMastered(next);
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setSaveStatus(en ? "Saved in this browser" : "已保存在当前浏览器");
    } catch {
      setSaveStatus(
        en ? "Available for this visit only" : "当前记录仅本次访问有效",
      );
    }
  }
  return (
    <>
      <details className="ai-study-tools">
        <summary>
          {en ? "Study level & progress" : "学习层次与进度"}
          <span>
            {en
              ? `${mastered.length} / ${aiNodes.length} learned`
              : `已掌握 ${mastered.length} / ${aiNodes.length}`}
          </span>
        </summary>
        <div>
          <label>
            {en ? "Study level" : "学习层次"}
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as typeof level)}
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
              onChange={(event) => setShared(event.target.checked)}
            />
            {en ? "Shared core only" : "只看共通主干"}
          </label>
          <small>
            {en
              ? "Self-assessed progress stays in this browser."
              : "掌握记录为自评，仅保存在当前浏览器。"}
          </small>
        </div>
      </details>
      <MathMapGraph
        locale={locale}
        atlas={aiKnowledgeAtlas}
        nodeFilter={nodeFilter}
        onReset={resetFilters}
        renderNodeMeta={(node) => {
          const concept = aiNodeById.get(node.id)!;
          return (
            <div className="ai-concept-meta">
              <span>{aiLevels[concept.level][locale]}</span>
              <span>
                {concept.scope === "shared"
                  ? en
                    ? "Shared core"
                    : "共通主干"
                  : en
                    ? "Specialist"
                    : "方向专题"}
              </span>
              <button
                type="button"
                className="ai-mastery-toggle"
                aria-pressed={mastered.includes(node.id)}
                onClick={() => toggleProgress(node.id)}
              >
                <Check size={12} />
                {mastered.includes(node.id)
                  ? en
                    ? "Learned"
                    : "已掌握"
                  : en
                    ? "Mark learned"
                    : "标记掌握"}
              </button>
              <small role="status">{saveStatus}</small>
            </div>
          );
        }}
      />
    </>
  );
}
