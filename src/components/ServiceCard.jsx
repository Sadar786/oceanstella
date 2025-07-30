// src/components/ServiceCard.jsx
import { FiTool, FiLayers, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const icons = {
  build: FiTool,
  paint: FiLayers,
  custom: FiZap,
};

export default function ServiceCard({
  icon = "build",
  title,
  subtitle = "Premium quality & warranty",
  children,
  slug = "",               // NEW → e.g. "boat-making"
  cta = "Learn more",
}) {
  const Icon = icons[icon];
  const linkTo = slug ? `/service/${slug}` : "#";

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white
                 dark:bg-slate-800 dark:border-slate-600 p-6 shadow-sm transition duration-300
                 hover:-translate-y-1 hover:shadow-lg hover:border-primary/60"
    >
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full
                      bg-gradient-to-tr from-primary to-secondary text-light shadow-md">
        <Icon className="text-2xl" />
      </div>

      {/* Title + subtitle */}
      <h3 className="mb-1 text-xl font-semibold text-dark dark:text-white">{title}</h3>
      <p className="mb-4 text-sm font-medium text-secondary dark:text-secondary/90">{subtitle}</p>

      {/* Body */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </p>

      {/* CTA */}
      <Link
        to={linkTo}
        className="inline-flex items-center gap-1 self-start rounded-lg bg-accent px-4 py-2
                   text-sm font-semibold text-dark transition-colors
                   hover:bg-primary hover:text-light dark:bg-primary dark:text-light
                   dark:hover:bg-accent dark:hover:text-dark group"
      >
        {cta}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>

      {/* Hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                      ring-4 ring-primary/20 transition group-hover:opacity-100" />
    </div>
  );
}
