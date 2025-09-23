// src/pages/BlogDetail.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import FadeInOnScroll from "../components/FadeInOnScroll";
import {
  FiClock, FiEye, FiShare2, FiFacebook, FiTwitter, FiLinkedin, FiLink, FiChevronLeft, FiChevronRight, FiTag
} from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

/* ----------------------------- Helpers ----------------------------- */
function useAbsoluteUrl() {
  const { pathname, search, hash } = useLocation();
  return useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${pathname}${search}${hash}`;
  }, [pathname, search, hash]);
}

function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d ? String(d) : "";
  }
}

/* ----------------------- Reading Progress Bar ---------------------- */
function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = targetRef?.current;
      if (!el) return setProgress(0);
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (el.offsetTop || 0);
      const pct = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      setProgress(pct * 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div className="sticky top-0 z-40 h-1 bg-transparent">
      <div
        className="h-1 bg-accent transition-[width] duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ------------------------------- Page ------------------------------ */
export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const [related, setRelated] = useState([]);
  const [prevNext, setPrevNext] = useState({ prev: null, next: null });

  const articleRef = useRef(null);
  const absUrl = useAbsoluteUrl();

  // Fetch the post
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${API_BASE}/api/v1/blog/posts/${slug}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        setPost(json.item);
      } catch (e) {
        if (!alive) return;
        setErr("Post not found.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug]);

  // Fetch related (by first tag) and prev/next (simple strategy)
  useEffect(() => {
    if (!post) return;
    (async () => {
      try {
        // Related
        const tag = Array.isArray(post.tags) && post.tags[0] ? `&tag=${encodeURIComponent(post.tags[0])}` : "";
        const relRes = await fetch(`${API_BASE}/api/v1/blog/posts?page=1&limit=4${tag}`);
        const relJson = await relRes.json();
        const rel = (relJson.items || []).filter(p => p.slug !== post.slug).slice(0, 3);
        setRelated(rel);

        // Prev/Next: fetch a small page and compute neighbors
        const listRes = await fetch(`${API_BASE}/api/v1/blog/posts?page=1&limit=100`);
        const listJson = await listRes.json();
        const arr = listJson.items || [];
        const idx = arr.findIndex(i => i.slug === post.slug);
        setPrevNext({
          prev: idx > 0 ? arr[idx - 1] : null,
          next: idx >= 0 && idx < arr.length - 1 ? arr[idx + 1] : null,
        });
      } catch {}
    })();
  }, [post]);

  // Build an in-page TOC by injecting IDs into h2/h3 after content is mounted
  const [toc, setToc] = useState([]);
  useEffect(() => {
    if (!post) return;
    const el = articleRef.current;
    if (!el) return;

    const heads = Array.from(el.querySelectorAll("h2, h3"));
    const items = heads.map(h => {
      const text = (h.textContent || "").trim();
      const id = slugify(text);
      if (!h.id) h.id = id;
      return { id, text, level: h.tagName.toLowerCase() };
    });
    setToc(items);
  }, [post]);

  // Share helpers
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(absUrl);
    } catch {}
  }

  if (loading) return <div className="section-wrapper py-10 text-slate-500">Loading…</div>;
  if (err) return <div className="section-wrapper py-10 text-rose-600">{err}</div>;
  if (!post) return null;

  const hero = post.coverImage;
  const date = post.publishedAt ? fmtDate(post.publishedAt) : "";
  const read = post.readingTime || 1;
  const views = post.views ?? undefined;
  const firstTag = Array.isArray(post.tags) && post.tags[0];

  return (
    <>
      {/* Top reading progress */}
      <ReadingProgress targetRef={articleRef} />

      {/* HERO */}
      <section className="relative h-[38vh] sm:h-[44vh] md:h-[52vh] overflow-hidden">
        {hero && (
          <img
            src={hero}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/25" />
        <div className="relative z-10 flex h-full items-end">
          <div className="section-wrapper w-full pb-8">
            <nav className="mb-3 text-sm text-light/90">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-1">/</span>
              <Link to="/blog" className="hover:underline">Insights & News</Link>
              <span className="mx-1">/</span>
              <span className="text-accent">{post.title}</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-light drop-shadow">
              {post.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-light/90 text-sm">
              {date && (
                <span className="inline-flex items-center gap-2">
                  <FiClock /> {date} · {read} min read
                </span>
              )}
              {typeof views === "number" && (
                <span className="inline-flex items-center gap-2">
                  <FiEye /> {views.toLocaleString()} views
                </span>
              )}
              {firstTag && (
                <span className="inline-flex items-center gap-2">
                  <FiTag /> {firstTag}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Floating share */}
        <div className="pointer-events-none absolute inset-0">
          <div className="section-wrapper h-full">
            <div className="pointer-events-auto absolute right-4 top-4 sm:right-8">
              <div className="rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg backdrop-blur px-3 py-2 flex items-center gap-3">
                <FiShare2 className="opacity-70" />
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absUrl)}`}
                  target="_blank" rel="noreferrer" aria-label="Share on Facebook"
                  className="text-slate-700 dark:text-slate-200 hover:opacity-80"
                ><FiFacebook /></a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(absUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noreferrer" aria-label="Share on Twitter/X"
                  className="text-slate-700 dark:text-slate-200 hover:opacity-80"
                ><FiTwitter /></a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(absUrl)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"
                  className="text-slate-700 dark:text-slate-200 hover:opacity-80"
                ><FiLinkedin /></a>
                <button onClick={copyLink} className="hover:opacity-80">
                  <FiLink />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT + SIDECAR */}
      <section className="section-wrapper grid lg:grid-cols-[minmax(0,1fr),280px] gap-10 py-10">
        {/* Article */}
        <FadeInOnScroll className="min-w-0">
          <article
            ref={articleRef}
            className="prose prose-slate dark:prose-invert max-w-3xl"
          >
            {/* lead */}
            {post.excerpt && (
              <p className="lead text-slate-700 dark:text-slate-300">
                {post.excerpt}
              </p>
            )}

            {/* content */}
            <div
              className="prose-headings:scroll-mt-24 prose-img:rounded-xl prose-pre:rounded-xl prose-pre:shadow-inner"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* tags */}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    to={`/blog?tag=${encodeURIComponent(t)}`}
                    className="rounded-full bg-slate-200/70 dark:bg-slate-700/70 px-3 py-1 text-xs hover:bg-accent/80 hover:text-dark transition"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Prev / Next */}
          {(prevNext.prev || prevNext.next) && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {prevNext.prev ? (
                <Link
                  to={`/blog/${prevNext.prev.slug}`}
                  className="group rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-2">
                    <FiChevronLeft /> Previous
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:underline">
                    {prevNext.prev.title}
                  </div>
                </Link>
              ) : <div />}
              {prevNext.next && (
                <Link
                  to={`/blog/${prevNext.next.slug}`}
                  className="group rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-right"
                >
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-2 justify-end">
                    Next <FiChevronRight />
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:underline">
                    {prevNext.next.title}
                  </div>
                </Link>
              )}
            </div>
          )}

          {/* Author card / CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src="/images/team/founder.jpg"
                alt="Author"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Ocean Stella Team</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  We restore, paint, and maintain boats with craftsmanship since 2009 (Dubai).
                </p>
              </div>
              <div className="flex-1" />
              <Link
                to="/contact"
                className="rounded-full bg-accent px-5 py-2 font-medium text-dark hover:bg-primary hover:text-light"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Sidecar (TOC + Sticky card) */}
        <aside className="hidden lg:block">
          {/* TOC */}
          {toc.length > 0 && (
            <div className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 shadow-sm">
              <div className="text-sm font-semibold mb-3">On this page</div>
              <nav className="space-y-2 text-sm">
                {toc.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className={`block hover:underline ${it.level === "h3" ? "pl-4 text-slate-500" : ""}`}
                  >
                    {it.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-wrapper pb-16">
          <h3 className="text-2xl font-bold mb-6">You might also like</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md transition"
              >
                <img
                  src={r.coverImage || r.img || "/images/placeholder-16x9.jpg"}
                  alt={r.title}
                  className="h-40 w-full object-cover group-hover:scale-[1.02] transition-transform"
                />
                <div className="p-4">
                  <div className="text-xs text-slate-500 mb-1">{r.publishedAt ? fmtDate(r.publishedAt) : ""}</div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{r.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
