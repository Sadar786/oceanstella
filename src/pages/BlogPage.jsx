// src/pages/BlogPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogHero from "../components/blogComponents/BlogHero";
import BlogSearchFilter from "../components/blogComponents/BlogSearchFilter";
import FeaturedPostCard from "../components/blogComponents/FeaturedPostCard";
import BlogCard from "../components/blogComponents/BlogCard";
import BlogSidebar from "../components/blogComponents/BlogSidebar";
import Pagination from "../components/blogComponents/Pagination";
import NewsletterSignup from "../components/blogComponents/NewsletterSignup";
import { latestPosts as FALLBACK } from "../components/data/blog";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function BlogPage() {
  const qs = useQuery();
  const currentPage = Number(qs.get("page") || 1);
  const q = qs.get("q") || "";
  const tag = qs.get("tag") || "";
  const limit = 9;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const url = `${API_BASE}/api/v1/blog/posts?page=${currentPage}&limit=${limit}${q ? `&q=${encodeURIComponent(q)}` : ""}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        const normalized = (json.items || []).map(n => ({
          ...n,
          img: n.coverImage || n.img,
          date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : n.date,
          category: (n.tags && n.tags[0]) || n.category || "General",
        }));
        setItems(normalized);
        setPages(json.pages || 1);
      } catch (e) {
        // fallback to local data if API fails
        if (!alive) return;
        setErr("Showing sample posts (API unavailable).");
        const normalized = FALLBACK.map(n => ({
          ...n,
          img: n.img || n.coverImage,
          date: n.date,
          category: n.category || (n.tags && n.tags[0]) || "General",
        }));
        setItems(normalized);
        setPages(Math.ceil(normalized.length / limit));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [currentPage, q, tag]);

  const first = items[0];
  const rest = items.slice(1);

  return (
    <>
      <BlogHero />
      <BlogSearchFilter initialQ={q} initialTag={tag} />
      <section className="section-wrapper grid lg:grid-cols-[1fr,auto] gap-8">
        <div className="space-y-8">
          {err && <div className="text-amber-600 text-sm">{err}</div>}
          {loading && <div className="text-slate-500">Loading posts…</div>}

          {!loading && first && <FeaturedPostCard post={first} />}

          {!loading && (
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={pages} />
          <NewsletterSignup />
        </div>

        <BlogSidebar />
      </section>
    </>
  );
}
