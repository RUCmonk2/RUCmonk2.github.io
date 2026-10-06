/**
 * Site configuration
 * Unified configuration for the portfolio website
 */

export const BLUR_FADE_DELAY = 0.05;

export const siteConfig = {
  url: "https://yeyaozhi.eu.cc",
  lastUpdated: "2026.08",
  avatarUrl: "/images/yaozhi-avatar.jpg",
  blog: {
    // Article publication is controlled individually by each MDX status.
    visible: true,
    /* Number of posts per page on the blog list */
    postsPerPage: 6,
  },
} as const;
