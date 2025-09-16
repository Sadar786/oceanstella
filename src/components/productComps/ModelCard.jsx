// src/components/productcomponents/ModelCard.jsx
import { useMemo, useState } from "react";
import FadeInOnScroll from "../FadeInOnScroll";
import { Link } from "react-router-dom";

export default function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);

  const images = useMemo(() => {
    if (!model) return [];
    if (Array.isArray(model.images) && model.images.length) {
      return model.images.map((it) => (typeof it === "string" ? it : it?.url)).filter(Boolean);
    }
    if (model.img) return [model.img];
    if (model.image?.url) return [model.image.url];
    if (model.coverImage) return [model.coverImage];
    return [];
  }, [model]);

  const cover = images[0] || "/placeholder-boat.jpg";
  const name  = model?.name || "Unnamed Model";
  const slug  = model?.slug || name.toLowerCase().replace(/\s+/g, "-");
  const cat   = model?.cat || model?.category || "Other";

  const length = model?.length || "—";
  const beam   = model?.beam || "—";
  const speed  = model?.speed || "—";
  const seats  = model?.seats || "—";

  return (
    <FadeInOnScroll>
      <article
        className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={cover}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
            {cat}
          </span>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10" />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{name}</h3>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <SpecItem icon="📏" label="Length" value={String(length)} />
            <SpecItem icon="📐" label="Beam" value={String(beam)} />
            <SpecItem icon="⚡" label="Max Speed" value={String(speed)} />
            <SpecItem icon="👥" label="Seats" value={String(seats)} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://wa.me/923322649000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-dark transition hover:bg-primary hover:text-white"
            >
              Request Quote
            </a>
            <Link
              to={`/models/${slug}`}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
            >
              View Details
            </Link>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 ${
            hovered ? "opacity-100" : ""
          }`}
        />
      </article>
    </FadeInOnScroll>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-2 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-200 dark:ring-slate-700">
      <span className="shrink-0">{icon}</span>
      <div className="flex min-w-0 flex-col">
        <span className="text-[11px] uppercase tracking-wide opacity-70">{label}</span>
        <span className="truncate text-[13px] font-medium">{value}</span>
      </div>
    </div>
  );
}
