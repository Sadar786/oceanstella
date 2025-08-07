// src/pages/CaseStudies.jsx
import React, { useState, useMemo } from "react";
import CaseStudiesHero from "../components/caseStudy/CaseStudiesHero";
import TabsFilter      from "../components/caseStudy/TabsFilter";
import SearchSortBar   from "../components/caseStudy/SearchSortBar";
import CaseStudyGrid   from "../components/caseStudy/CaseStudyGrid";
import ContactStrip    from "../components/ContactStripe";
import { services }    from "../components/data/Services";

const tabs = ["All", "Boat Making", "Boat Painting", "Maintenance"];
const sortOptions = ["Newest", "Oldest", "By Service"];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery]         = useState("");
  const [sort, setSort]           = useState("Newest");

  // 1) Flatten all projects inside the component
  const allProjects = useMemo(
    () =>
      Object.values(services).flatMap((s) =>
        s.projects.map((p) => ({
          ...p,
          serviceType: s.title,
          serviceSlug: s.title.toLowerCase().replace(/\s+/g, "-"),
        }))
      ),
    []
  );

  // 2) Filter by active tab (service type)
  let items = activeTab === "All"
    ? allProjects
    : allProjects.filter((p) => p.serviceType === activeTab);

  // 3) Filter by search query
  items = items.filter((p) =>
    p.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  // 4) Sort according to selected option
  if (sort === "Oldest") {
    items = [...items].reverse();
  } else if (sort === "By Service") {
    items = [...items].sort((a, b) =>
      a.serviceType.localeCompare(b.serviceType)
    );
  }
  // "Newest" leaves original order

  return (
    <>
      {/* 1. Hero */}
      <CaseStudiesHero subtitle="Projects in Boat Making, Painting & Maintenance" />

      {/* 2. Tabs filter */}
      <TabsFilter tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* 3. Search & sort controls */}
      <SearchSortBar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />

      {/* 4. Card grid */}
      <CaseStudyGrid projects={items} />

      {/* 5. Contact call-to-action */}
      <ContactStrip />
    </>
  );
}

















