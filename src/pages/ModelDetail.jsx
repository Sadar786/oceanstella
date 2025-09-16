// src/pages/ModelDetail.jsx
import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { apiMaybe } from "../lib/api";
import Skeleton from "../ui/Skeleton";
import GalleryLightbox from "../components/productComps/GalleryLightbox";

/* ------------------------- helpers ------------------------- */
function normalizeImages(p) {
  if (!p) return [];
  if (Array.isArray(p.images) && p.images.length) {
    return p.images.map((it) => (typeof it === "string" ? it : it?.url)).filter(Boolean);
  }
  return [p?.image?.url, p?.coverImage, p?.img].filter(Boolean);
}

function getCat(p) {
  if (!p) return "Other";
  const catObj = p.category || p.categoryId;
  return (
    catObj?.name ||
    catObj?.title ||
    catObj?.slug ||
    p.category ||
    p.type ||
    "Other"
  );
}

function specVal(p, keys) {
  const arr = Array.isArray(p?.specs) ? p.specs : [];
  const list = Array.isArray(keys) ? keys : [keys];
  const exact = arr.find(
    (s) => String(s?.key || "").toLowerCase() === String(list[0]).toLowerCase()
  );
  if (exact) return exact.value || "";
  const set = new Set(list.map((k) => String(k).toLowerCase()));
  for (const s of arr) {
    const k = String(s?.key || "").toLowerCase();
    if (set.has(k)) return s?.value || "";
  }
  return "";
}

function readCoreSpecs(p) {
  const length =
    p?.length ?? specVal(p, ["length", "loa", "l.o.a", "overall length", "length overall"]);
  const beam = p?.beam ?? specVal(p, ["beam", "beam width", "width"]);
  const speed = p?.speed ?? specVal(p, ["max speed", "top speed", "topspeed", "max_speed", "speed"]);
  const seats = p?.seats ?? specVal(p, ["seats", "capacity", "passengers"]);
  return { length: length || "", beam: beam || "", speed: speed || "", seats: seats || "" };
}

/* -------------------------- page --------------------------- */
export default function ModelDetail() {
  const { slug } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Fetch (hook is ALWAYS called)
  const { data, pending, error } = useQuery(async () => {
    const res = await apiMaybe(`/api/v1/products/${slug}`);
    return res?.item || res || null;
  }, [slug]);

  // Derivations (hooks ALWAYS called)
  const images = useMemo(() => normalizeImages(data), [data]);

  // Keep active index valid (hook ALWAYS called; guard inside)
  useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [images, activeIndex]);

  // Plain derived values (not hooks) — safe if data is null
  const name = data?.name || "Model";
  const cat = getCat(data);
  const { length, beam, speed, seats } = readCoreSpecs(data || undefined);
  const cover = images[activeIndex] || "/placeholder-boat.jpg";
  const summary = data?.summary || "";
  const price = data?.price;
  const currency = data?.currency || "";

  /* -------------------------- render --------------------------- */

  if (pending) {
    return (
      <main className="min-h-screen">
        <nav className="section-wrapper py-3 text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-slate-700 dark:hover:text-slate-200">Home</Link></li>
            <li>›</li>
            <li><Link to="/products" className="hover:text-slate-700 dark:hover:text-slate-200">Models</Link></li>
            <li>›</li>
            <li className="text-slate-700 dark:text-slate-200">Loading…</li>
          </ol>
        </nav>

        <section className="section-wrapper py-6 md:py-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
            </div>
            <div className="md:col-span-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="grid grid-cols-4 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen">
        <nav className="section-wrapper py-3 text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-slate-700 dark:hover:text-slate-200">Home</Link></li>
            <li>›</li>
            <li><Link to="/products" className="hover:text-slate-700 dark:hover:text-slate-200">Models</Link></li>
            <li>›</li>
            <li className="text-slate-700 dark:text-slate-200">Not found</li>
          </ol>
        </nav>
        <p className="section-wrapper py-8 text-center text-rose-600">Failed to load model.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="section-wrapper py-3 text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-slate-700 dark:hover:text-slate-200">Home</Link></li>
          <li>›</li>
          <li><Link to="/products" className="hover:text-slate-700 dark:hover:text-slate-200">Models</Link></li>
          <li>›</li>
          <li className="text-slate-700 dark:text-slate-200">{name}</li>
        </ol>
      </nav>

      {/* Hero / Media */}
      <section className="section-wrapper py-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left: big image */}
          <div className="md:col-span-8">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={cover} alt={name} className="h-full w-full aspect-[16/10] object-cover" />
              {/* Badges */}
              <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                <span className="pointer-events-auto rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur ring-1 ring-white/20">
                  {cat}
                </span>
                {data?.featured ? (
                  <span className="pointer-events-auto rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white">
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {images.length > 0 && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 shadow hover:bg-white"
                >
                  View ({activeIndex + 1}/{images.length})
                </button>
              )}
            </div>
          </div>

          {/* Right: title, actions, thumbnails */}
          <div className="md:col-span-4">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {cat}
            </div>
            <h1 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50">{name}</h1>

            {/* Actions */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/923322649000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
              >
                Request Quote
              </a>
              <a
                href={`https://wa.me/923322649000?text=I'd%20like%20to%20book%20a%20visit%20for%20model%20%3A%20${encodeURIComponent(
                  name
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
              >
                Book a Visit
              </a>
              {data?.brochureUrl ? (
                <a
                  href={data.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
                >
                  Download Brochure
                </a>
              ) : null}
            </div>

            {/* Thumbnails */}
            {images.length > 0 ? (
              <div className="grid grid-cols-4 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative overflow-hidden rounded-xl ring-2 transition ${
                      i === activeIndex
                        ? "ring-primary/70"
                        : "ring-transparent hover:ring-slate-300 dark:hover:ring-slate-600"
                    }`}
                    title={`Image ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${name} ${i + 1}`}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`pointer-events-none absolute inset-0 ${
                        i === activeIndex ? "bg-primary/10" : "bg-transparent"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No gallery images.</p>
            )}
          </div>
        </div>
      </section>

      {/* Key specs */}
      <section className="section-wrapper pb-6 md:pb-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SpecCard label="Length" value={length || "—"} icon="📏" />
          <SpecCard label="Beam" value={beam || "—"} icon="📐" />
          <SpecCard label="Max Speed" value={speed || "—"} icon="⚡" />
          <SpecCard label="Seats" value={seats || "—"} icon="👥" />
        </div>
      </section>

      {/* Overview */}
      {(data?.summary || data?.description) && (
        <section className="section-wrapper pb-14">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Overview
              </h2>
              {data.summary ? (
                <p className="text-slate-700 dark:text-slate-300">{data.summary}</p>
              ) : null}
              {data.description ? (
                <div
                  className="prose prose-slate mt-4 dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              ) : null}
            </div>
            <aside className="md:col-span-4">
              {Array.isArray(data.tags) && data.tags.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <GalleryLightbox
        open={lightboxOpen}
        setOpen={setLightboxOpen}
        images={images}
        index={activeIndex}
        setIndex={setActiveIndex}
        title={name}
      />

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-700 dark:bg-slate-900/70 md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
              {name}
            </div>
            {typeof price === "number" ? (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                From {currency} {price.toLocaleString()}
              </div>
            ) : (
              <div className="text-xs text-slate-600 dark:text-slate-300">Contact for price</div>
            )}
          </div>
          <a
            href="https://wa.me/923322649000"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            Request Quote
          </a>
        </div>
      </div>
    </main>
  );
}

/* ----------------------- subcomponents ----------------------- */
function SpecCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-slate-800 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-200 dark:ring-slate-700">
      <span className="text-lg">{icon}</span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide opacity-70">{label}</div>
        <div className="truncate text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
