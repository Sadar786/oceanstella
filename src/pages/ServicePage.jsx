// src/pages/ServicePage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
// ⚠️ Make sure this path matches your actual file name/casing:
 import ContactStrip from "../components/ContactStripe";
import { motion } from "framer-motion";
import FadeInOnScroll from "../components/FadeInOnScroll";
import {services} from "../components/data/Services";

/* ======================= Config & Helpers ======================= */
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";
const PLACEHOLDER = "/images/placeholder-16x9.jpg";

const fade = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function absUrl(u) {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return `${API_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
}

function formatMaybeDate(d) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString();
  } catch {
    return String(d);
  }
}

/* ============================ Page ============================== */
export default function ServicePage() {
  const { slug } = useParams();

  // Works for both an array of services or an object map
  const s = useMemo(() => {
    if (!services) return undefined;
    if (Array.isArray(services)) {
      return services.find((it) => it.slug === slug);
    }
    return services[slug];
  }, [slug]);

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => window.scrollTo(0, 0), []);

  // Fetch case studies (no-op param removed since backend ignores `service`)
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!s) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setErr("");
        const url = `${API_BASE}/api/v1/case-studies`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        const items = json?.items || json?.data || [];
        if (items.length) setCases(items);
        else setCases(s.projects || []);
      } catch (e) {
        if (!alive) return;
        setErr("Showing local projects (API unavailable).");
        setCases(s?.projects || []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug, s]);

  if (!s) return <p className="p-10 text-center">Service not found.</p>;

  const heroMedia = useMemo(() => {
    if (s.heroVideo) return { type: "video", src: s.heroVideo };
    return { type: "image", src: s.heroImg };
  }, [s]);

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative h-[60vh] sm:h-[68vh] md:h-[76vh] overflow-hidden">
        {heroMedia.type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={heroMedia.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={heroMedia.src}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/60" />

        <div className="relative z-10 flex h-full items-end">
          <div className="section-wrapper w-full pb-10">
            <nav className="mb-4 text-sm text-white/85">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-1">/</span>
              <Link to="/services" className="hover:underline">Services</Link>
              <span className="mx-1">/</span>
              <span className="text-accent">{s.title}</span>
            </nav>

            <div className="max-w-3xl rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-6 shadow-2xl">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow">
                {s.title}
              </h1>
              {s.tagline && <p className="mt-3 text-lg text-white/90">{s.tagline}</p>}

              {Array.isArray(s.stats) && s.stats.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {s.stats.map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-white/10 px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-white">{value}</div>
                      <div className="text-xs uppercase tracking-wide text-white/80">{label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full bg-accent px-6 py-2 font-semibold text-dark hover:bg-primary hover:text-light transition"
                >
                  Request a Quote
                </Link>
                <button
                  onClick={() => {
                    const el = document.getElementById("process");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-white/15 px-6 py-2 font-medium text-white hover:bg-white/25 transition"
                >
                  See Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ INTRO =========================== */}
      <motion.section
        className="section-wrapper max-w-3xl text-center dark:text-white"
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {s.tagline && (
          <p className="text-primary dark:text-accent/95 md:text-3xl font-medium mb-3">
            {s.tagline}
          </p>
        )}
        <p className="text-slate-600 text-xl dark:text-white">{s.intro}</p>
        {Array.isArray(s.bullets) && s.bullets.length > 0 && (
          <ul className="mt-6 space-y-2">
            {s.bullets.map((b) => (
              <li key={b} className="text-sm flex items-start gap-2 justify-center">
                <span className="h-2 w-2 mt-2 rounded-full bg-accent" />
                <span className="text-dark dark:text-white/90">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* ====================== PROCESS TIMELINE ====================== */}
      <FadeInOnScroll delay={0.1}>
        <section id="process" className="section-wrapper max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
            How We Work
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {s.process.map(([emoji, step, desc]) => (
              <div
                key={step}
                className="rounded-xl bg-white dark:bg-slate-800 p-6 text-center shadow-md hover:translate-y-1 transition duration-300 hover:border-primary/60 hover:border hover:shadow-lg"
              >
                <p className="text-3xl mb-2">{emoji}</p>
                <h3 className="font-semibold text-dark dark:text-white">{step}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInOnScroll>

      {/* ============= TECHNICAL SPECIFICATIONS & OPTIONS ============= */}
      {s.specs && (
        <FadeInOnScroll delay={0.15}>
          <section className="section-wrapper max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
              Technical Specifications & Options
            </h2>

            {s.specs.map((group) => (
              <div key={group.title} className="mb-12">
                <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-light">
                  {group.title}
                </h3>

                {group.rows && (
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                      <thead>
                        <tr className="bg-accent/40 text-dark dark:bg-primary dark:text-light">
                          <th className="px-6 py-3 text-left uppercase text-sm font-medium">Option</th>
                          <th className="px-6 py-3 text-left uppercase text-sm font-medium">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                        {group.rows.map(([opt, det], idx) => (
                          <tr
                            key={opt}
                            className={`transition-colors hover:bg-accent/10 dark:hover:bg-primary/20 ${
                              idx % 2 === 0 ? "bg-gray-50 dark:bg-slate-900" : ""
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{opt}</td>
                            <td className="px-6 py-4">{det}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {group.cards && (
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {group.cards.map((c) => (
                      <div
                        key={c.name}
                        className="rounded-lg bg-white dark:bg-slate-800 shadow-md p-6 text-center transition hover:shadow-lg"
                      >
                        <h4 className="mb-2 text-lg font-semibold text-dark dark:text-light">{c.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        </FadeInOnScroll>
      )}

      {/* ======================= CASE STUDIES ========================= */}
      <FadeInOnScroll delay={0.2}>
        <section className="section-wrapper">
          <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
            Case Studies
          </h2>

          {err && <p className="mb-4 text-amber-600 text-sm text-center">{err}</p>}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="p-4 bg-white dark:bg-slate-800">
                    <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="mt-3 h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : cases.length === 0 ? (
            <p className="text-center text-slate-500">No case studies yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {cases.map((p) => {
                const raw =
                  p.heroImage ||
                  p.gallery?.[0]?.url ||
                  p.coverImage ||
                  p.image ||
                  p.img;
                const src = absUrl(raw) || PLACEHOLDER;

                return (
                  <Link
                    key={p.slug || p._id || p.title}
                    to={p.slug ? `/case-studies/${p.slug}` : "#"}
                    className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={src}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {p.serviceType && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-sm">
                          {p.serviceType}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>

                      {p.summary && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                          {p.summary}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        {p.date && <span>{formatMaybeDate(p.date)}</span>}
                        {p.cost && (
                          <>
                            <span>•</span>
                            <span>Cost: {p.cost}</span>
                          </>
                        )}
                      </div>

                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 text-primary dark:text-accent text-sm font-medium">
                          View details
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M5 12h14M13 5l7 7-7 7"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </FadeInOnScroll>

      {/* =========================== CTA ============================= */}
      <FadeInOnScroll delay={0.3}>
        <section className="section-wrapper max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            Ready to start your {s.title.toLowerCase()} project?
          </h2>
          <Link
            to="/contact"
            className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light transition"
          >
            Request a Quote
          </Link>
        </section>
      </FadeInOnScroll>

      {/* ====================== CONTACT STRIP ======================== */}
      <FadeInOnScroll delay={0.35}>
        <ContactStrip />
      </FadeInOnScroll>
    </>
  );
}
