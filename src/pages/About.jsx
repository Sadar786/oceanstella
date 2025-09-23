// src/pages/About.jsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import ContactStrip from "../components/ContactStripe";
import Kalim from "../assets/Kalim.jpg";
import boatVideo from "../assets/boat.mp4";
import { RiShieldCheckLine, RiToolsLine, RiLeafLine, RiSpeedLine, RiMapPin2Line, RiStarSmileLine } from "react-icons/ri";

/* =====================================================================
   Motion helpers
===================================================================== */
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* =====================================================================
   Data (easy to tweak / translate later)
===================================================================== */
const STATS = [
  { value: "16+", label: "Years Building" },
  { value: "100+", label: "Vessels Delivered" },
  { value: "ISO 12215", label: "Composite Standard" },
  { value: "< 10 min", label: "WhatsApp Response" },
];

const VALUES = [
  { Icon: RiShieldCheckLine, title: "5‑Year Structural Warranty", body: "Confidence backed by process and documentation." },
  { Icon: RiToolsLine,        title: "Marine‑Grade Hardware",      body: "Stainless fasteners, closed‑cell cores, epoxy systems." },
  { Icon: RiLeafLine,         title: "Low‑VOC Coatings",           body: "Cleaner yards, happier crews, better finishes." },
  { Icon: RiSpeedLine,        title: "Efficiency & Range",         body: "Optimised laminates and propulsion for your use‑case." },
  { Icon: RiMapPin2Line,      title: "Built in the UAE",           body: "Dubai facility with climate‑controlled paint rooms." },
  { Icon: RiStarSmileLine,    title: "Client‑First",               body: "Clear comms, daily photo logs, milestone sign‑offs." },
];

const MILESTONES = [
  { year: "2009", text: "Workshop founded; first wooden dhow restored." },
  { year: "2014", text: "Launched our first 32‑ft fiberglass cruiser." },
  { year: "2018", text: "Opened a climate‑controlled paint facility." },
  { year: "2023", text: "Delivered our 100th custom vessel." },
];

const LEADERS = [
  { name: "Kalim Ullah", role: "CEO & Naval Architect", pic: Kalim },
  { name: "Fatima Rahman", role: "Head of Design", pic: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=640&auto=format&fit=crop" },
  { name: "Hasan Khan", role: "Production Manager", pic: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640&auto=format&fit=crop" },
];

export default function About() {
  const half = useMemo(() => Math.ceil(MILESTONES.length / 2), []);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[48vh] sm:h-[56vh] md:h-[62vh] overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src={boatVideo} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/30 to-dark/25" />
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="px-4"
          >
            <span className="inline-block rounded-full bg-white/15 text-light ring-1 ring-white/30 px-3 py-1 text-[11px] font-semibold">
              Since 2009 • Dubai
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-light drop-shadow">
              About <span className="text-accent">Ocean Stella</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-light/95">
              Hand‑built vessels, mirror‑finish coatings, and dependable maintenance — engineered for adventure and built to last.
            </p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 120" className="absolute -bottom-px left-0 right-0 w-full h-[60px] fill-light dark:fill-[#0F1B2A]">
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64V120H0Z" />
        </svg>
      </section>

      {/* STORY + MISSION */}
      <section className="section-wrapper max-w-6xl">
        <div className="grid gap-10 md:grid-cols-5">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-3">
            <motion.h2 variants={fade} className="text-2xl sm:text-3xl font-bold text-dark dark:text-light">Our Story</motion.h2>
            <motion.p variants={fade} className="mt-4 text-slate-700 dark:text-slate-300">
              Founded in <strong>2009</strong> on the shores of Dubai Creek, Ocean Stella began as a two‑person workshop restoring wooden dhows. Today, we’re a multidisciplinary team of marine engineers, naval architects, and master craftsmen building ocean‑ready vessels for clients across the GCC and beyond.
            </motion.p>
            <motion.p variants={fade} className="mt-4 text-slate-700 dark:text-slate-300">
              We combine heritage boatbuilding with advanced composites, modern propulsion, and rigorous QA to deliver performance, comfort, and safety in every hull.
            </motion.p>

            <motion.div variants={fade} className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-5">
              <p className="text-sm uppercase tracking-wide text-primary dark:text-accent font-semibold">Our Mission</p>
              <p className="mt-2 text-dark dark:text-light">
                Craft exceptional boats that create lifelong memories — blending craftsmanship with cutting‑edge engineering while upholding the highest standards of safety and sustainability.
              </p>
            </motion.div>
          </motion.div>

          {/* photo + quote */}
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-2">
            <figure className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
              <img src={Kalim} alt="Ocean Stella workshop" className="h-64 w-full object-cover sm:h-80" />
            </figure>
            <blockquote className="mt-4 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10">
              <p className="text-dark dark:text-light italic">“Every launch is personal. We build as if our families will ride these waves.”</p>
              <footer className="mt-3 text-sm text-slate-600 dark:text-slate-400">— Kalim Ullah, CEO & Naval Architect</footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP (animated in) */}
      <section className="section-wrapper pt-0">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <motion.div key={label} variants={fade} className="rounded-2xl bg-white dark:bg-slate-800 p-6 text-center shadow-md ring-1 ring-black/5 dark:ring-white/10">
              <div className="text-3xl font-extrabold text-primary dark:text-accent">{value}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* VALUES / DIFFERENTIATORS */}
      <section className="section-wrapper">
        <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">
          What Sets Us Apart
        </motion.h2>
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ Icon, title, body }) => (
            <motion.li key={title} variants={fade} className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-dark dark:text-light">{title}</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{body}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* TIMELINE (centered) */}
      <section className="section-wrapper max-w-5xl">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">Milestones</h2>
        <ol className="relative mx-auto max-w-3xl">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-accent/40 sm:left-1/2" />
          {MILESTONES.map((item, idx) => (
            <motion.li key={item.year} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mb-10 grid gap-4 sm:grid-cols-2 sm:items-center">
              <span className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10 h-3 w-3 rounded-full bg-accent ring-4 ring-light dark:ring-[#0F1B2A]" aria-hidden />
              <div className={`sm:${idx % 2 ? "order-2" : "order-1"}`}>
                <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10">
                  <p className="text-primary dark:text-accent font-semibold">{item.year}</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                </div>
              </div>
              <div className={`hidden sm:block sm:${idx % 2 ? "order-1" : "order-2"}`} />
            </motion.li>
          ))}
        </ol>
      </section>

      {/* LEADERSHIP */}
      <section className="section-wrapper max-w-6xl">
        <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">
          Leadership
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {LEADERS.map(({ name, role, pic }) => (
            <motion.div key={name} variants={fade} className="group rounded-2xl bg-white dark:bg-slate-800 p-6 text-center shadow ring-1 ring-black/5 dark:ring-white/10">
              <div className="relative mx-auto h-28 w-28">
                <img src={pic} alt={name} className="h-28 w-28 rounded-full object-cover ring-2 ring-primary/30 dark:ring-accent/30 transition-transform group-hover:scale-[1.03]" />
              </div>
              <p className="mt-4 font-semibold text-dark dark:text-light">{name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <ContactStrip />
    </>
  );
}
