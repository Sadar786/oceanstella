// src/components/productcomponents/ModelFilter.jsx
import { FiSearch } from "react-icons/fi";
 

export default function ModelFilter({
  categories,
  active,
  setActive,
  query,
  setQuery,
}) {
  return (
       <section className="section-wrapper2 mb-12">
        {/* Search input */}
        <div className="mb-6 max-w-md mx-auto relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search models..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-light pl-10 pr-4 py-2 text-sm text-dark dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:border-primary focus:outline-none"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === cat
                  ? "bg-primary text-light"
                  : "bg-light text-dark dark:bg-dark dark:text-light hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
   );
}
