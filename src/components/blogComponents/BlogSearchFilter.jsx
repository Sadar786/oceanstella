// src/components/blogComponents/BlogSearchFilter.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

export default function BlogSearchFilter({ initialQ = "", initialTag = "" }) {
  const [q, setQ] = useState(initialQ);
  const [tag, setTag] = useState(initialTag);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => setQ(initialQ), [initialQ]);
  useEffect(() => setTag(initialTag), [initialTag]);

  function submit(e) {
    e?.preventDefault?.();
    const params = new URLSearchParams(search);
    if (q) params.set("q", q); else params.delete("q");
    if (tag) params.set("tag", tag); else params.delete("tag");
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
  }

  return (
    <FadeInOnScroll>
      <form onSubmit={submit} className="section-wrapper -mt-8 mb-8 grid gap-3 md:grid-cols-[1fr,240px,auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          className="rounded-full border border-slate-300 px-4 py-2 bg-light dark:bg-slate-800 text-sm"
        />
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Filter by tag (e.g. paint, repair)"
          className="rounded-full border border-slate-300 px-4 py-2 bg-light dark:bg-slate-800 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-2 font-medium text-dark hover:bg-primary hover:text-light"
        >
          Apply
        </button>
      </form>
    </FadeInOnScroll>
  );
}
