// src/components/BlogSearchFilter.jsx
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import FadeInOnScroll from "../FadeInOnScroll";

const categories = ["All", "Maintenance", "Painting", "Manufacturing"];

export default function BlogSearchFilter({ onSearch = () => {}, onCategoryChange = () => {} }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleCategory = (e) => {
    const val = e.target.value;
    setCategory(val);
    onCategoryChange(val);
  };

  return (
    <FadeInOnScroll delay={0.1}>
      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-4 sm:grid-cols-2">
        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search posts..."
            className="w-full rounded-full border border-slate-300 bg-light pl-10 pr-4 py-2 text-sm text-dark dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:border-primary focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={category}
            onChange={handleCategory}
            className="w-full rounded-full border border-slate-300 bg-light px-4 py-2 text-sm text-dark dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:border-primary focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
