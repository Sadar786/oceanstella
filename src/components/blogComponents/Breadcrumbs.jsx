// src/components/Breadcrumbs.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

export default function Breadcrumbs({ path }) {
  // path: array of { name: string, to?: string }
  return (
    <FadeInOnScroll>
      <nav className="mx-auto max-w-4xl px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
        {path.map((crumb, idx) => {
          const isLast = idx === path.length - 1;
          return (
            <span key={crumb.name} className="inline-flex items-center">
              {crumb.to && !isLast ? (
                <Link to={crumb.to} className="hover:underline">
                  {crumb.name}
                </Link>
              ) : (
                <span className="font-medium">{crumb.name}</span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </span>
          );
        })}
      </nav>
    </FadeInOnScroll>
  );
}
