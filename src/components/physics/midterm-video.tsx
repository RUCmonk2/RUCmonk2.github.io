"use client";

import { useRef, useState } from "react";

import chapters from "@/data/physics-midterm/video-chapters.json";

import styles from "./midterm-video.module.css";

const assets = "/assets/physics/video";
function timeLabel(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function MidtermVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");

  function updateChapter() {
    const current = videoRef.current?.currentTime ?? 0;
    const index = chapters.findIndex(
      (chapter) => current >= chapter.start && current < chapter.end,
    );
    setActive(index < 0 ? chapters.length - 1 : index);
  }

  function applyPendingSeek() {
    const video = videoRef.current;
    if (video && pendingSeek.current !== null && video.readyState >= 1) {
      video.currentTime = pendingSeek.current;
      pendingSeek.current = null;
      updateChapter();
    }
  }

  function openChapter(index: number) {
    const video = videoRef.current;
    if (!video) return;
    setNotice("");
    pendingSeek.current = chapters[index].start + 0.1;
    applyPendingSeek();
    void video.play().catch(() => {
      setNotice("已选择章节；请点击播放器中的播放按钮继续。");
    });
  }

  return (
    <section
      className={styles.section}
      id="video"
      aria-labelledby="video-title"
    >
      <header className={styles.heading}>
        <span className="notes-overline">WATCH / ELECTROSTATICS</span>
        <h2 id="video-title">静电场：从受力到能量</h2>
        <p>11 分 10 秒 · 1080p · 纯音乐 Manim 动画 · 数心工作流改编</p>
        <p>
          从电荷与场强，串到功、电势、电容器和粒子运动。按章节暂停，先说出判断依据，再回到纸笔练习。
        </p>
      </header>
      <div className={styles.layout}>
        <div className={styles.main}>
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster={`${assets}/electrostatics-shuxin-v1.jpg`}
            aria-label="静电场复习动画，11分10秒"
            onLoadedMetadata={applyPendingSeek}
            onTimeUpdate={updateChapter}
            onSeeked={updateChapter}
            onError={() =>
              setNotice("视频暂时无法加载，可以下载后观看，或稍后重试。")
            }
          >
            <source
              src={`${assets}/electrostatics-shuxin-v1.mp4`}
              type="video/mp4"
            />
            <track
              kind="captions"
              src={`${assets}/captions.zh.vtt`}
              srcLang="zh"
              label="画面提示（中文）"
            />
            <track
              kind="chapters"
              src={`${assets}/chapters.zh.vtt`}
              srcLang="zh"
              label="视频章节"
            />
            您的浏览器不支持内嵌视频，请使用下方链接下载观看。
          </video>
          <div className={styles.actions}>
            <button type="button" onClick={() => videoRef.current?.pause()}>
              暂停，想一想
            </button>
            <button
              type="button"
              onClick={() => {
                const video = videoRef.current;
                if (video)
                  video.currentTime = Math.max(0, video.currentTime - 8);
              }}
            >
              后退 8 秒
            </button>
            <a href={`${assets}/electrostatics-shuxin-v1.mp4`} download>
              下载完整视频 · 27 MB ↓
            </a>
          </div>
          {notice && (
            <p role="status" className={styles.notice}>
              {notice}
            </p>
          )}
          <div className={styles.prompt}>
            <strong>{chapters[active].title} · 暂停提问</strong>
            <p>{chapters[active].prompt}</p>
          </div>
          <p className={styles.hint}>
            建议电脑或平板观看；手机可横屏全屏。片中保留关键推导、模型条件和易错对比，适合穿插在下方两小时课堂路线中。
          </p>
        </div>
        <nav className={styles.chapters} aria-label="动画章节">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              key={chapter.start}
              aria-current={active === index ? "true" : undefined}
              onClick={() => openChapter(index)}
            >
              <span>{timeLabel(chapter.start)}</span>
              <strong>{chapter.title}</strong>
              <small>{chapter.end - chapter.start} 秒</small>
            </button>
          ))}
        </nav>
      </div>
      <p className={styles.credit}>
        Music: “Reverie” by{" "}
        <a href="https://www.scottbuckley.com.au/library/reverie/">
          Scott Buckley
        </a>{" "}
        — released under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.{" "}
        www.scottbuckley.com.au。音轨作了循环交叉衔接、轻微保音高变速、响度与首尾渐变处理。
      </p>
    </section>
  );
}
