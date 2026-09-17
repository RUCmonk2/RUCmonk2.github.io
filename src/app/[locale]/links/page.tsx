import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
        <h1>{isEnglish ? "Friends" : "友链"}</h1>
        <p className="links-intro">
          {isEnglish
            ? "Small corners of the web, familiar faces along the way."
            : "在互联网的小小角落，遇见一些有趣的人。"}
        </p>
        <span className="links-count">
          {DATA.friends.length} {isEnglish ? "friends" : "位朋友"}
        </span>
      </section>

      <div className="links-layout">
        <div className="links-content">
          <section id="friend-sites" className="links-section scroll-mt-24">
            <header>
              <h2>{isEnglish ? "Around the neighborhood" : "朋友们的小站"}</h2>
              <a href="#exchange">
                {isEnglish ? "Exchange links" : "交换友链"}{" "}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </header>
            <ol className="links-directory-list">
              {DATA.friends.map((friend) => (
                <li key={friend.url}>
                  <a
                    className={`links-directory-card links-tone-${friend.tone}`}
                    title={`${friend.name[localeKey]} — ${friend.description[localeKey]}`}
                    href={friend.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="links-monogram" aria-hidden="true">
                      {friend.initials}
                    </div>
                    <div className="links-friend-copy">
                      <div className="links-friend-heading">
                        <h3>{friend.name[localeKey]}</h3>
                      </div>
                      <p>{friend.description[localeKey]}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section id="exchange" className="links-section scroll-mt-24">
            <header>
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
