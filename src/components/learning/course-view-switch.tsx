import "./course-view-switch.css";

import { BookOpen, Network } from "lucide-react";
import Link from "next/link";

export function CourseViewSwitch({
  locale,
  courseHref,
  mapHref,
  active,
}: {
  locale: "zh" | "en";
  courseHref: string;
  mapHref: string;
  active: "notes" | "map";
}) {
  const en = locale === "en",
    prefix = en ? "/en" : "";
  return (
    <nav
      className="course-view-switch"
      aria-label={en ? "Course view" : "课程视图"}
    >
      <Link
        href={prefix + courseHref}
        aria-current={active === "notes" ? "page" : undefined}
      >
        <BookOpen size={15} />
        {en ? "Course notes" : "章节阅读"}
      </Link>
      <Link
        href={prefix + mapHref}
        aria-current={active === "map" ? "page" : undefined}
      >
        <Network size={15} />
        {en ? "Knowledge map" : "知识网"}
      </Link>
    </nav>
  );
}
