// src/pages/ServicePage.jsx
import { useParams, Link } from "react-router-dom";
import {services} from "../components/data/Services";
import ContactStrip from "../components/ContactStripe";
import { motion } from "framer-motion";
import FadeInOnScroll from "../components/FadeInOnScroll"
import { useEffect } from "react";   // ⬅️  add near other imports


export default function ServicePage() {
  const { slug } = useParams();
  const s = services[slug];

  if (!s) return <p className="p-10 text-center">Service not found.</p>;

  /* simple fade variant */
  const fade = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

    useEffect(() => window.scrollTo(0, 0), []);   // ⬅️  jump to top once

  return (
    <>
      {/* HERO */}
      <section className="relative h-[80vh]">
        <img src={s.heroImg} alt={s.title} className="absolute  inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-light">{s.title}</h1>
        </div>
      </section>

      {/* INTRO */}
      <motion.section
        className="section-wrapper max-w-3xl text-center dark:text-white"
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="text-primary dark:text-accent/95 md:text-3xl font-medium mb-3">{s.tagline}</p>
        <p className="text-slate-600 md:text-1xl dark:text-white">{s.intro}</p>
        <ul className="mt-6  space-y-2">
          {s.bullets.map((b) => (
            <li key={b} className="text-sm flex items-start gap-2 justify-center">
              <span className="h-2 w-2 mt-2 rounded-full bg-accent" />
              <span className="text-dark dark:text-white/90">{b}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* PROCESS TIMELINE */}
      <FadeInOnScroll delay={0.1}>
        <section className="section-wrapper max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
            How We Work
          </h2>
          <div className="grid gap-6 md:grid-cols-4 ">
            {s.process.map(([emoji, step, desc]) => (
              <div
                key={step}
                className="rounded-xl bg-white dark:bg-slate-800 p-6 text-center shadow-md
                hover:translate-y-1 transition duration-300 hover:border-primary/60 hover:border hover:shadow-lg"
              >
                <p className="text-3xl mb-2">{emoji}</p>
                <h3 className="font-semibold text-dark dark:text-white">{step}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInOnScroll>
{/* TECHNICAL SPECIFICATIONS & OPTIONS */}
{ s.specs && (
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
                  <h4 className="mb-2 text-lg font-semibold text-dark dark:text-light">
                    {c.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  </FadeInOnScroll>
)}

    {/* CASE STUDIES / RECENT PROJECTS */}
<FadeInOnScroll delay={0.2}>
  <section className="section-wrapper">
    <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
      Case Studies
    </h2>
    <div className="grid gap-6 md:grid-cols-3">
      {s.projects.map((p) => (
        <div
          key={p.title}
          className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-md overflow-hidden hover:shadow-lg transition-shadow
          hover:translate-y-1 hover:transition duration-300 hover:border-primary/60"
        >
          <img
            src={p.img}
            alt={p.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-dark dark:text-light">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
              {p.description}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-dark dark:text-light">
              <li>
                <strong>Service:</strong> {p.serviceType}
              </li>
              <li>
                <strong>Date:</strong> {p.date}
              </li>
              <li>
                <strong>Cost:</strong> {p.cost}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
</FadeInOnScroll>

      {/* ORDER / CTA */}
      <FadeInOnScroll delay={0.3}>
        <section className="section-wrapper max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">Ready to start your {s.title.toLowerCase()} project?</h2>
          <Link
            to="/#/contact"
            className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light"
          >
            Request a Quote
          </Link>
        </section>
      </FadeInOnScroll>

      {/* CONTACT STRIP */}
      <FadeInOnScroll delay={0.35}>
        <ContactStrip />
      </FadeInOnScroll>
    </>
  );
}
