"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  disabled?: boolean;
  translatedBlogSlugs: string[];
}

export function LanguageToggle({
  disabled = false,
  translatedBlogSlugs,
}: LanguageToggleProps) {
  const pathname = usePathname();
  const locale = useLocale();

  // Check if current locale is Chinese
  const isChinese = locale === "zh";
  const pathWithoutLocale = pathname.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";
  const articleSlug = pathWithoutLocale.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const missingTranslation = Boolean(
    articleSlug &&
    !translatedBlogSlugs.includes(decodeURIComponent(articleSlug)),
  );
  const isDisabled = disabled || missingTranslation;

  const handleLanguageToggle = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    // Save current scroll position before switching language
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const scrollKey = `scroll-${pathname}`;
      sessionStorage.setItem(scrollKey, scrollPosition.toString());
    }

    // Use the public canonical paths directly. This avoids the internal `/zh`
    // locale path leaking into the static GitHub Pages build.
    const targetLocale = isChinese ? "en" : "zh";
    const normalizedPath =
      pathWithoutLocale === "/"
        ? "/"
        : `/${pathWithoutLocale.replace(/^\/+|\/+$/g, "")}/`;
    const targetPath =
      targetLocale === "en"
        ? normalizedPath === "/"
          ? "/en/"
          : `/en${normalizedPath}`
        : normalizedPath;

    if (typeof window !== "undefined") {
      window.location.assign(
        `${targetPath}${window.location.search}${window.location.hash}`,
      );
    }
  };

  // Determine display text based on current locale
  const displayText = isChinese ? "EN" : "中";
  const label = missingTranslation
    ? isChinese
      ? "英文版本尚未发布"
      : "Chinese version is not published yet"
    : isChinese
      ? "Switch to English"
      : "切换到中文";

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className={cn(
        "size-9 rounded-none px-2 text-xs font-semibold",
        isDisabled && "cursor-not-allowed opacity-50",
      )}
      onClick={handleLanguageToggle}
      aria-label={label}
      title={label}
      disabled={isDisabled}
    >
      <span className="text-sm font-medium">{displayText}</span>
    </Button>
  );
}
