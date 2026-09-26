import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Icons } from "@/components/icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: string = "en-US") {
  // Static exports must not freeze relative labels such as "Today" at build time.
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function jsonldScript(jsonLd: string) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

export function getIconComponent(iconName: string) {
  const iconMap: Record<
    string,
    (props: React.HTMLAttributes<SVGElement>) => React.ReactElement
  > = {
    globe: Icons.globe,
    github: Icons.github,
    paper: Icons.paper,
    bookopen: Icons.bookopen,
    newspaper: Icons.newspaper,
  };

  const IconComponent = iconMap[iconName] || Icons.globe;
  return <IconComponent className="size-3" />;
}
