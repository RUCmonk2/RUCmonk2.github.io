import type { MetadataRoute } from "next";

import zhMessages from "@/i18n/messages/zh/personal.json";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: zhMessages.name.full,
    short_name: zhMessages.name.full,
    description: zhMessages.headline.replace(/\n/g, "，"),
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    scope: "/",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
