// src/pages/CaseStudyDetail.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ContactStrip from "../components/ContactStripe";
// If you use react-helmet-async, uncomment next 2 lines & wrap app with HelmetProvider once.
// import { Helmet } from "react-helmet-async";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

function fmtDate(d) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(d);
  }
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // reading progress
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);

  // mini ToC (from h2 in content)
  const [toc, setToc] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${API_BASE}/api/v1/case-studies/${slug}`);
        const json = await res.json();
        if (!alive) return;
        if (!json?.ok) throw new Error(json?.error || "Not found");
        setItem(json.item);
      } catch (e) {
        setErr(e?.message || String(e));
      } finally {
        if (alive) setLoading(false);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  // Build ToC & reading progress
  useEffect(() => {
    if (!item || !contentRef.current) return;

    // Build ToC
    const headings = Array.from(
      contentRef.current.querySelectorAll("h2[id], h2")
    ).map((h, i) => {
      // ensure id for anchor
      if (!h.id) {
        h.id = h.textContent
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return { id: h.id, text: h.textContent || `Section ${i + 1}` };
    });
    setToc(headings);

    // Reading progress
    const onScroll = () => {
      const el = contentRef.current;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const total = el.scrollHeight - winH;
      const y = Math.min(Math.max(window.scrollY - (el.offsetTop - 16), 0), total);
      setProgress(total > 0 ? Math.round((y / total) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [item]);

  const pageUrl = useMemo(() => {
    // prefer canonicalUrl if present
    if (item?.canonicalUrl) return item.canonicalUrl;
    // fallback to current app location
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://example.com";
    return `${base}${location.pathname}`;
  }, [item, location.pathname]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  if (loading) {
    return (
      <div className="section-wrapper">
        <div className="h-10 w-48 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="mt-4 h-64 w-full rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="section-wrapper text-center">
        <p className="text-red-600 dark:text-red-400">{err}</p>
        <Link className="mt-4 inline-block text-primary hover:underline" to="/case-studies">
          ← Back to Case Studies
        </Link>
      </div>
    );
  }

  if (!item) return null;

  const {
    title,
    subtitle,
    client,
    heroImage,
    summary,
    content,
    gallery = [],
    tags = [],
    publishedAt,
    readingMinutes = 1,
    seoTitle,
    seoDescription,
    ogImage,
  } = item;

  return (
    <>
      {/* Optional SEO (uncomment Helmet above to enable) */}
      {/* <Helmet>
        <title>{seoTitle || title}</title>
        {seoDescription && <meta name="description" content={seoDescription} />}
        <link rel="canonical" href={pageUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:title" content={seoTitle || title} />
        <meta property="og:description" content={seoDescription || summary || subtitle || ""} />
        <meta property="og:url" content={pageUrl} />
      </Helmet> */}

      {/* Reading progress */}
      <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-transparent">
        <div
          className="h-1 bg-gradient-to-r from-primary to-accent transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative h-[42vh] sm:h-[50vh] md:h-[58vh] overflow-hidden">
        {heroImage ? (
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />

        {/* Foreground content */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-8">
            {/* Breadcrumbs */}
            <nav className="text-white/80 text-xs">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-2 opacity-70">/</span>
              <Link to="/case-studies" className="hover:underline">Case Studies</Link>
              <span className="mx-2 opacity-70">/</span>
              <span className="opacity-90">{title}</span>
            </nav>

            {/* Glass card */}
            <div className="mt-3 max-w-3xl rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-4 sm:p-6">
              <span className="inline-flex items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 px-3 py-1 text-[11px] font-semibold">
                {readingMinutes} min read • {fmtDate(publishedAt)}
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-white/90">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Summary */}
            {summary && (
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-white/10 p-5">
                <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                  Executive Summary
                </h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">
                  {summary}
                </p>
              </div>
            )}

            {/* Content (HTML/Markdown already rendered to HTML) */}
            {content && (
              <article
                ref={contentRef}
                className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-img:rounded-xl prose-a:text-primary hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {/* Gallery */}
            {Array.isArray(gallery) && gallery.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((g, i) => (
                    <figure
                      key={`${g.url}-${i}`}
                      className="group overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-white/10"
                    >
                      <img
                        src={g.url}
                        alt={g.alt || `Project image ${i + 1}`}
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {g.alt && (
                        <figcaption className="px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
                          {g.alt}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <Link className="text-primary hover:underline" to="/case-studies">
                ← Back to Case Studies
              </Link>
            </div>
          </div>

          {/* Side panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 h-fit space-y-5">
            <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-white/10 p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Project Details
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {client && (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-slate-500 dark:text-slate-400">Client</dt>
                    <dd className="text-slate-900 dark:text-slate-100">{client}</dd>
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Published</dt>
                  <dd className="text-slate-900 dark:text-slate-100">{fmtDate(publishedAt)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Reading Time</dt>
                  <dd className="text-slate-900 dark:text-slate-100">{readingMinutes} min</dd>
                </div>
                {tags.length > 0 && (
                  <div>
                    <dt className="text-slate-500 dark:text-slate-400 mb-1">Tags</dt>
                    <dd className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2.5 py-0.5 text-xs"
                        >
                          #{t}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 mt-2">
                  <button
                    onClick={handleCopy}
                    className="w-full rounded-lg bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-3 py-2 text-sm font-medium hover:bg-primary/15 dark:hover:bg-accent/15 transition"
                    title="Copy link"
                  >
                    {copied ? "Link copied!" : "Share / Copy Link"}
                  </button>
                  {item.canonicalUrl && (
                    <a
                      href={item.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-xs text-slate-500 hover:underline"
                    >
                      Canonical: {new URL(item.canonicalUrl).hostname}
                    </a>
                  )}
                </div>
              </dl>
            </div>

            {/* Mini ToC */}
            {toc.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-white/10 p-5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  On this page
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-accent"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
