"use client";
import { useEffect, useState } from "react";

import {
  type Lesson,
  LessonBody,
  type ReadingMode,
  ReadingModes,
} from "@/components/math-map/lesson-reader";

export function K12LessonReader({
  lesson,
  id,
}: {
  lesson: Lesson;
  id: string;
}) {
  const [mode, setMode] = useState<ReadingMode>("beginner");
  const [status, setStatus] = useState("");
  const [reviewed, setReviewed] = useState(false);
  useEffect(() => {
    try {
      const values = JSON.parse(localStorage.getItem("k12-reviewed") ?? "[]");
      setReviewed(Array.isArray(values) && values.includes(id));
    } catch {
      /* A storage restriction does not prevent reading. */
    }
  }, [id]);
  function mark() {
    try {
      const raw = JSON.parse(localStorage.getItem("k12-reviewed") ?? "[]");
      const values = Array.isArray(raw)
        ? raw.filter((item) => typeof item === "string")
        : [];
      localStorage.setItem(
        "k12-reviewed",
        JSON.stringify(
          reviewed
            ? values.filter((value) => value !== id)
            : [...new Set([...values, id])],
        ),
      );
      setReviewed(!reviewed);
      setStatus(
        reviewed
          ? "已移除这节的阅读标记。"
          : "已在这台设备标记为读过。完成练习后，再判断自己是否掌握。",
      );
    } catch {
      setStatus("当前浏览器无法保存标记，阅读和练习仍可正常使用。");
    }
  }
  return (
    <section className="k12-reading">
      <div className="k12-reading-toolbar">
        <ReadingModes
          mode={mode}
          onChange={setMode}
          en={false}
          label="讲义阅读深度"
        />
        <button
          onClick={() => window.print()}
          type="button"
          className="k12-button"
        >
          打印当前讲义
        </button>
      </div>
      <LessonBody
        key={id + mode}
        lesson={lesson}
        mode={mode}
        en={false}
        error={false}
        retry={() => {}}
      />
      <div className="k12-review">
        <button className="k12-button" type="button" onClick={mark}>
          {reviewed ? "已读过 · 点击取消" : "标记为读过"}
        </button>
        <p aria-live="polite">
          {status ||
            "阅读标记仅保存在本机浏览器，不等同于掌握程度；清理浏览器数据后可能丢失。"}
        </p>
      </div>
    </section>
  );
}
