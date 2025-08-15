// src/pages/CaseStudies.jsx
import React, { useState, useMemo, useEffect } from "react";
import CaseStudiesHero from "../components/caseStudy/CaseStudiesHero";
import TabsFilter      from "../components/caseStudy/TabsFilter";
import SearchSortBar   from "../components/caseStudy/SearchSortBar";
import CaseStudyGrid   from "../components/caseStudy/CaseStudyGrid";
import ContactStrip    from "../components/ContactStripe";
import { services }    from "../components/data/Services";

const tabs = ["All", "Boat Making", "Boat Painting", "Maintenance"];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery]         = useState("");
  const [sort, setSort]           = useState("Newest");

  // scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Flatten all projects once
  const allProjects = useMemo(() => {
    const arr = Object.values(services || {}).flatMap((s) =>
      (s.projects || []).map((p, i) => ({
        ...p,
        // in case any project is missing a slug, derive a stable one
        slug: p.slug || `${s.title}-${p.title}`.toLowerCase().replace(/\s+/g, "-"),
        serviceType: s.title,
        serviceSlug: s.title.toLowerCase().replace(/\s+/g, "-"),
        // keep an index for "Newest" default ordering
        _idx: i,
      }))
    );
    return arr;
  }, []);

  // Filter by tab
  let items =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((p) => p.serviceType === activeTab);

  // Search
  const q = query.trim().toLowerCase();
  if (q) {
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.serviceType || "").toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === "Oldest") {
    items = [...items].reverse();
  } else if (sort === "By Service") {
    items = [...items].sort((a, b) =>
      a.serviceType.localeCompare(b.serviceType)
    );
  }
  // "Newest" preserves original order we constructed

  return (
    <>
      {/* 1) HERO */}
      <CaseStudiesHero subtitle="Projects in Boat Making, Painting & Maintenance" />

      {/* 2) Sticky filter band */}
      <section className="  top-[64px] z-30 bg-light/75 dark:bg-[#0F1B2A]/75 backdrop-blur-md border-y border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Tabs row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsFilter tabs={tabs} active={activeTab} onChange={setActiveTab} />

            {/* Results summary chip */}
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-3 py-1 text-xs font-semibold">
              Showing {items.length} {items.length === 1 ? "case" : "cases"}
            </span>
          </div>

          {/* Search & Sort row */}
          <div className="mt-3">
            <SearchSortBar
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
            />
          </div>
        </div>
      </section>

      {/* 3) Grid */}
      <CaseStudyGrid projects={items} />

      {/* 4) CTA */}
      <ContactStrip />
    </>
  );
}
