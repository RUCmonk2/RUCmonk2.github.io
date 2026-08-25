import { ArrowLeft, ArrowUpRight, Link2, Network } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Locale } from "next-intl";

import { CopySiteInfo } from "@/components/friends/copy-site-info";
import { DATA } from "@/data";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return constructMetadata({
    title: isEnglish ? "Friends and links" : "友链与漫游",
    description: isEnglish
      ? "A small directory of friends, personal sites, and paths worth following across the open web."
      : "朋友、个人主页与值得沿着链接继续探索的开放网络入口。",
    path: "/links",
    locale: locale as Locale,
  });
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const localeKey = isEnglish ? "en" : "zh";

  return (
    <main className="links-page">
      <section className="links-hero">
        <Link href={homeHref} className="links-back">
          <ArrowLeft aria-hidden="true" />
          {isEnglish ? "Back home" : "返回主页"}
        </Link>
        <p>FRIEND LINKS · OPEN WEB</p>
        <h1>{isEnglish ? "Friends and paths outward" : "友链与互联网漫游"}</h1>
        <span>
          {isEnglish
            ? "A personal site should not be an island. These links lead to friends, distinct interests, and other ways of observing the world."
            : "个人主页不该是一座孤岛。沿着这些链接，可以遇见朋友、不同的兴趣，以及观察世界的另一种方式。"}
        </span>
        <div className="links-hero-stats">
          <div>
            <Link2 aria-hidden="true" />
            <b>{String(DATA.friends.length).padStart(2, "0")}</b>
            <small>{isEnglish ? "Friend sites" : "友链站点"}</small>
          </div>
          <div>
            <Network aria-hidden="true" />
            <b>∞</b>
            <small>{isEnglish ? "Possible paths" : "可能的路径"}</small>
          </div>
        </div>
      </section>

      <div className="links-layout">
        <aside className="links-toc" aria-label={isEnglish ? "Page contents" : "页面目录"}>
          <span>{isEnglish ? "Contents" : "页面目录"}</span>
          <a href="#friend-sites">01 · {isEnglish ? "Friends" : "朋友们"}</a>
          <a href="#exchange">02 · {isEnglish ? "Exchange" : "交换友链"}</a>
        </aside>

        <div className="links-content">
          <section id="friend-sites" className="links-section scroll-mt-24">
            <header>
              <span>01</span>
              <div>
                <h2>{isEnglish ? "Friend sites" : "朋友们的站点"}</h2>
                <p>
                  {isEnglish
                    ? "No ranking—only a small collection that can keep growing."
                    : "这里没有排名，只是一份可以慢慢生长的链接收藏。"}
                </p>
              </div>
            </header>
            <div className="links-card-grid">
              {DATA.friends.map((friend) => (
                <a
                  className={`links-directory-card links-tone-${friend.tone}`}
                  href={friend.url}
                  key={friend.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="links-monogram" aria-hidden="true">
                    {friend.initials}
                  </div>
                  <div>
                    <span>{friend.handle}</span>
                    <h3>{friend.name[localeKey]}</h3>
                    <p>{friend.description[localeKey]}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section id="exchange" className="links-section scroll-mt-24">
            <header>
              <span>02</span>
              <div>
                <h2>{isEnglish ? "Exchange links" : "交换友链"}</h2>
                <p>
                  {isEnglish
                    ? "If you would like to exchange links, add this site first and send the same four fields for yours."
                    : "如果你也想交换友链，可以先添加本站，再把你的名称、简介、链接和头像地址发给我。"}
                </p>
              </div>
            </header>
            <CopySiteInfo isEnglish={isEnglish} />
          </section>
        </div>
      </div>
    </main>
  );
}
