// src/components/caseStudy/CaseStudyCard.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

function fmtDate(d) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return String(d);
  }
}

export default function CaseStudyCard({ project }) {
  const {
    slug,
    title,
    summary,
    client,
    heroImage,
    tags = [],
    publishedAt,
    readingMinutes = 1,
  } = project;

  return (
    <FadeInOnScroll>
      <Link
        to={`/case-studies/${slug}`}
        className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:shadow-lg transition"
      >
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={heroImage}
            alt={title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-2 right-2 rounded-full bg-black/70 text-white text-xs px-2 py-1">
            {readingMinutes} min read
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-dark dark:text-light group-hover:underline underline-offset-4">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
            {summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {client && (
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-2.5 py-0.5 text-xs">
                Client: {client}
              </span>
            )}
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2.5 py-0.5 text-xs">
                #{t}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2.5 py-0.5 text-xs">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Published: {fmtDate(publishedAt)}</span>
            <span className="group-hover:translate-x-1 transition-transform">Read →</span>
          </div>
        </div>
      </Link>
    </FadeInOnScroll>
  );
}
