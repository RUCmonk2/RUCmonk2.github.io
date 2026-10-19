"use client";

import { ArrowUpRight, BookImage, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ShanhaiNode } from "@/data/shanhai";
import { shanhaiArchives } from "@/data/shanhai-archives";
import { shanhaiArtwork } from "@/data/shanhai-art";

export function ShanhaiArtworkPane({
  node,
  onOpen,
}: {
  node: ShanhaiNode;
  onOpen: () => void;
}) {
  const artwork = shanhaiArtwork[node.id];
  const archives = shanhaiArchives[node.id] || [];
  const [mode, setMode] = useState<"original" | "archive">("original");
  const [archiveIndex, setArchiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const archive = archives[archiveIndex];
  const isArchive = mode === "archive";
  const image = isArchive ? archive : artwork;
  const imageTitle = isArchive ? archive?.title : `${node.name} · 原创意象`;
  const imageAlt = isArchive
    ? `${archive?.title}，保留完整古籍页面`
    : artwork?.alt;

  return (
    <section className="shanhai-artwork" aria-label={`${node.name}图像`}>
      <div className="shanhai-artwork-modes" aria-label="图像版本">
        <button
          type="button"
          aria-pressed={!isArchive}
          onClick={() => setMode("original")}
        >
          原创意象
        </button>
        <button
          type="button"
          aria-pressed={isArchive}
          onClick={() => setMode("archive")}
        >
          古图对照
          {archives.length > 0 && <span>{archives.length}</span>}
        </button>
      </div>
      {isArchive && archives.length > 1 && (
        <div className="shanhai-archive-choices" aria-label="选择馆藏图版">
          {archives.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={archiveIndex === index}
              onClick={() => setArchiveIndex(index)}
            >
              图版 {index + 1}
            </button>
          ))}
        </div>
      )}
      {image ? (
        <figure
          className={`shanhai-artwork-figure ${isArchive ? "is-archive" : ""}`}
        >
          <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
              if (nextOpen) onOpen();
              setOpen(nextOpen);
            }}
          >
            <DialogTrigger asChild>
              <button
                className="shanhai-artwork-expand"
                type="button"
                aria-label={`放大查看${imageTitle}`}
              >
                <Image
                  src={image.src}
                  alt={imageAlt || node.name}
                  width={1024}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  unoptimized
                />
                <span>
                  <Expand size={12} />
                  {isArchive ? "展开整页" : "展开画卷"}
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="shanhai-artwork-dialog">
              <header>
                <DialogTitle className="shanhai-artwork-dialog-title">
                  {imageTitle}
                </DialogTitle>
                <DialogDescription className="shanhai-artwork-dialog-description">
                  {isArchive ? archive.credit : "AI 原创 · 怪诞造型 × 水墨笔意"}
                </DialogDescription>
              </header>
              <div className="shanhai-artwork-dialog-image">
                <Image
                  src={image.src}
                  alt={imageAlt || node.name}
                  width={1024}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  unoptimized
                />
              </div>
              <div className="shanhai-artwork-dialog-note">
                {isArchive ? (
                  <>
                    <p>{archive.note}</p>
                    <a
                      href={archive.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      前往馆藏原页 <ArrowUpRight size={13} />
                    </a>
                  </>
                ) : (
                  <>
                    <p>
                      <b>文本依据</b>
                      {artwork.basis}
                    </p>
                    <p>
                      <b>艺术演绎</b>
                      {artwork.interpretation}
                    </p>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <figcaption>
            {isArchive ? (
              <>
                <strong>{archive.title}</strong>
                <span>{archive.credit}</span>
                <p>{archive.note}</p>
                <a href={archive.sourceUrl} target="_blank" rel="noreferrer">
                  前往馆藏原页 <ArrowUpRight size={12} />
                </a>
              </>
            ) : (
              <>
                <span>AI 原创 · 怪诞造型 × 水墨笔意</span>
                <details className="shanhai-artwork-basis">
                  <summary>读图依据与演绎</summary>
                  <p>
                    <b>文本依据</b>
                    {artwork.basis}
                  </p>
                  <p>
                    <b>艺术演绎</b>
                    {artwork.interpretation}
                  </p>
                </details>
              </>
            )}
          </figcaption>
        </figure>
      ) : (
        <div className="shanhai-archive-empty">
          <BookImage size={25} strokeWidth={1} aria-hidden="true" />
          <p>暂未收录「{node.name}」的对应古图</p>
          <span>
            原创意象依据文字创作；古图仅收录已核对图名与版本的对应图像。
          </span>
          <a href={node.sourceUrl} target="_blank" rel="noreferrer">
            先读原典 <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </section>
  );
}
