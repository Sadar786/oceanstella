// src/pages/CaseStudies.jsx
import React, { useEffect, useMemo, useState } from "react";
import CaseStudiesHero from "../components/caseStudy/CaseStudiesHero";
import TabsFilter from "../components/caseStudy/TabsFilter";
import SearchSortBar from "../components/caseStudy/SearchSortBar";
import CaseStudyGrid from "../components/caseStudy/CaseStudyGrid";
import ContactStrip from "../components/ContactStripe";

// If you already have api utils (apiMaybe/qs), feel free to swap this out.
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${API_BASE}/api/v1/case-studies`);
        const json = await res.json();
        if (!alive) return;
        if (!json?.ok) throw new Error(json?.error || "Failed to load case studies");
        // normalize a bit (fallbacks)
        const normalized = (json.items || []).map((it, idx) => ({
          ...it,
          _idx: idx,
          heroImage: it.heroImage || it.ogImage || it.gallery?.[0]?.url || "",
          tags: Array.isArray(it.tags) ? it.tags : [],
          publishedAt: it.publishedAt || it.updatedAt || it.createdAt || null,
          readingMinutes: it.readingMinutes || 1,
          summary: it.summary || it.subtitle || "",
        }));
        setItems(normalized);
      } catch (e) {
        setErr(e?.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Build dynamic tabs from tags
  const allTags = useMemo(() => {
    const set = new Set();
    items.forEach(cs => (cs.tags || []).forEach(t => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  // Filter by tab
  let view = useMemo(() => {
    let arr = items;
    if (activeTab !== "All") {
      arr = arr.filter(cs => (cs.tags || []).includes(activeTab));
    }
    // Search in title/summary/content/client/tags
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(cs => {
        const hay = [
          cs.title,
          cs.subtitle,
          cs.summary,
          cs.content,
          cs.client,
          ...(cs.tags || []),
        ].join(" ").toLowerCase();
        return hay.includes(q);
      });
    }
    // Sort
    if (sort === "Newest") {
      arr = [...arr].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0) || b._idx - a._idx);
    } else if (sort === "Oldest") {
      arr = [...arr].sort((a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0) || a._idx - b._idx);
    } else if (sort === "Title A–Z") {
      arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "Reading Time") {
      arr = [...arr].sort((a, b) => (a.readingMinutes || 0) - (b.readingMinutes || 0));
    }
    return arr;
  }, [items, activeTab, query, sort]);

  return (
    <>
      {/* HERO */}
      <CaseStudiesHero subtitle="Projects in Boat Making, Painting & Maintenance" />

      {/* Controls band */}
      <section className="top-[64px] z-30 bg-light/75 dark:bg-[#0F1B2A]/75 backdrop-blur-md border-y border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsFilter tabs={allTags} active={activeTab} onChange={setActiveTab} />
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-3 py-1 text-xs font-semibold">
              {loading ? "Loading…" : `Showing ${view.length} ${view.length === 1 ? "case" : "cases"}`}
            </span>
          </div>

          <div className="mt-3">
            <SearchSortBar
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
              // optional: pass options for sort
              sortOptions={["Newest", "Oldest", "Title A–Z", "Reading Time"]}
            />
            {err && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{err}</p>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <CaseStudyGrid loading={loading} projects={view} />

      {/* CTA */}
      <ContactStrip />
    </>
  );
}
