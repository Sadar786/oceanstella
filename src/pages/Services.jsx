// src/pages/Services.jsx
import { Link } from "react-router-dom";
import ContactStrip     from "../components/ContactStripe";
import FadeInOnScroll   from "../components/FadeInOnScroll";

import buildImg  from "../assets/boat1.jpg";
import paintImg  from "../assets/boat2.jpg";
import customImg from "../assets/boat3.jpg";
import boatVideo from "../assets/boat.mp4";

/* ───────────────────────────────────────── ServiceDetail ── */
function ServiceDetail({
  reverse = false,
  img,
  title,
  slug,          // ← "boat-making", "boat-painting", "customization"
  tagline,
  copy,
  bullets = [],
}) {
  return (
    <FadeInOnScroll delay={0.15}>
      <section
        className={`section-wrapper grid items-center gap-10 md:grid-cols-2 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* image */}
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img
            src={img}
            alt={title}
            className="h-64 w-full object-cover md:h-72 transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-dark/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition" />
        </div>

        {/* text */}
        <div className="dark:text-white">
          <h2 className="mb-2 text-2xl font-bold">{title}</h2>
          <p className="mb-4 font-medium text-primary dark:text-accent/90">{tagline}</p>
          <p className="mb-4 text-slate-600 dark:text-slate-300">{copy}</p>

          <ul className="space-y-2 mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-dark/90 dark:text-slate-200">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>

          {/* learn‑more pill */}
          <Link
            to={`/service/${slug}`}
            className="inline-flex items-center gap-2 rounded-full
                       bg-gradient-to-tr from-accent to-primary to-red-200 px-4 py-1
                       font-semibold text-dark/80 shadow transition
                       hover:brightness-110 focus:outline-none "
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </FadeInOnScroll>
  );
}

/* ─────────────────────────────────────────── Page ───────── */
export default function Services() {
  return (
    <>
      {/* banner video */}
      <section className="relative h-[70vh] md:h-[70vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={boatVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-4xl font-extrabold text-light md:text-5xl">
            Our Services
          </h1>
        </div>
      </section>

      {/* intro */}
      <FadeInOnScroll delay={0.1}>
        <section className="section-wrapper max-w-3xl text-center dark:text-white">
          <p className="mx-auto max-w-xl text-slate-600 dark:text-white">
            From bare‑hull builds to precision paintwork and high‑tech
            customisations, Ocean Stella delivers craftsmanship you can rely on.
          </p>
        </section>
      </FadeInOnScroll>

      {/* service blocks */}
      <ServiceDetail
        img={buildImg}
        slug="boat-making"
        title="Boat Making"
        tagline="Hand‑built hulls—engineered for adventure"
        copy="Our build team merges traditional techniques with advanced composites
              to create vessels that slice through waves and stand the test of time."
        bullets={[
          "Full in‑house naval architecture",
          "ISO‑certified fiberglass & carbon layups",
          "5‑year structural warranty",
        ]}
      />

      <ServiceDetail
        reverse
        img={paintImg}
        slug="boat-painting"
        title="Boat Painting"
        tagline="Mirror‑finish coatings that protect & shine"
        copy="Inside our climate‑controlled spray booth, we apply multi‑layer
              marine coatings that resist salt, UV and abrasion—keeping your
              investment looking new."
        bullets={[
          "Awlgrip® & Alexseal® systems",
          "Computer‑matched colour library",
          "Ceramic clear‑coat upgrade",
        ]}
      />

      <ServiceDetail
        img={customImg}
        slug="customization"
        title="Customization"
        tagline="Tailor your vessel to your lifestyle"
        copy="From smart dashboards to luxury interiors, our specialists integrate
              cutting‑edge tech and bespoke craftsmanship."
        bullets={[
          "Garmin & Raymarine electronics suites",
          "Teak decking & upholstery options",
          "Hybrid propulsion retrofits",
        ]}
      />

      {/* how we work */}
      <FadeInOnScroll delay={0.2}>
        <section className="section-wrapper max-w-6xl dark:text-white">
          <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-white">
            How We Work
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["🤝", "Consult", "Discuss requirements, timeline, and budget."],
              ["🛠️", "Build / Paint", "Craftsmanship under ISO‑certified QA."],
              ["⛵", "Launch", "Sea‑trial hand‑over and customer orientation."],
            ].map(([emoji, step, desc]) => (
              <div
                key={step}
                className="rounded-xl bg-white p-6 text-center shadow-sm
                           dark:bg-slate-800 dark:text-white"
              >
                <p className="mb-2 text-3xl">{emoji}</p>
                <h3 className="mb-1 font-semibold">{step}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInOnScroll>

      {/* contact strip */}
      <FadeInOnScroll delay={0.3}>
        <ContactStrip />
      </FadeInOnScroll>
    </>
  );
}
