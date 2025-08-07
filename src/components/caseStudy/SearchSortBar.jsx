// src/components/casecomponents/SearchSortBar.jsx
import { FiSearch } from "react-icons/fi";
import FadeInOnScroll from "../FadeInOnScroll";

const sortOptions = ["Newest", "Oldest", "By Service"];

export default function SearchSortBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}) {
  return (
    <FadeInOnScroll delay={0.2}>
      <section className="section-wrapper flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search case studies..."
            className="w-full rounded-full border border-slate-300 bg-light pl-10 pr-4 py-2 text-sm text-dark dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:border-primary focus:outline-none"
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-auto">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full md:w-auto rounded-full border border-slate-300 bg-light px-4 py-2 text-sm text-dark dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:border-primary focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
