// src/pages/About.jsx
import ContactStrip from "../components/ContactStripe";
import Kalim from "../assets/Kalim.jpg";
import boatVideo from "../assets/boat.mp4";

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[48vh] sm:h-[56vh] md:h-[62vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={boatVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* soft overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/25 to-dark/20" />
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="px-4">
            <span className="inline-block rounded-full bg-white/15 text-light ring-1 ring-white/30 px-3 py-1 text-[11px] font-semibold">
              Since 2009 • Dubai
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-light drop-shadow">
              About <span className="text-accent">Ocean Stella</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-light/95">
              Hand-built vessels, mirror-finish coatings, and dependable maintenance —
              engineered for adventure and built to last.
            </p>
          </div>
        </div>
        {/* wave divider */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute -bottom-px left-0 right-0 w-full h-[60px] fill-light dark:fill-[#0F1B2A]"
        >
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64V120H0Z" />
        </svg>
      </section>

      {/* STORY + MISSION */}
      <section className="section-wrapper max-w-6xl">
        <div className="grid gap-10 md:grid-cols-5">
          {/* story */}
          <div className="md:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-light">
              Our Story
            </h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Founded in <strong>2009</strong> on the shores of Dubai Creek, Ocean Stella
              began as a two-person workshop restoring wooden dhows. Today, we’re a
              multidisciplinary team of marine engineers, naval architects, and master
              craftsmen building ocean-ready vessels for clients across the GCC and beyond.
            </p>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              We combine heritage boatbuilding with advanced composites, modern propulsion,
              and rigorous QA to deliver performance, comfort, and safety in every hull.
            </p>

            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-5">
              <p className="text-sm uppercase tracking-wide text-primary dark:text-accent font-semibold">
                Our Mission
              </p>
              <p className="mt-2 text-dark dark:text-light">
                To craft exceptional boats that create lifelong memories — blending
                craftsmanship with cutting-edge engineering while upholding the highest
                standards of safety and sustainability.
              </p>
            </div>
          </div>

          {/* photo / pullquote */}
          <div className="md:col-span-2">
            <figure className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
              <img
                src={Kalim}
                alt="Ocean Stella workshop"
                className="h-64 w-full object-cover sm:h-80"
              />
            </figure>
            <blockquote className="mt-4 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10">
              <p className="text-dark dark:text-light italic">
                “Every launch is personal. We build as if our families will ride these waves.”
              </p>
              <footer className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                — Kalim Ullah, CEO & Naval Architect
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="section-wrapper pt-0">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["16+", "Years Building"],
            ["100+", "Vessels Delivered"],
            ["ISO 12215", "Composite Standards"],
            ["< 10 min", "WhatsApp Response"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl bg-white dark:bg-slate-800 p-6 text-center shadow-md ring-1 ring-black/5 dark:ring-white/10"
            >
              <div className="text-3xl font-extrabold text-primary dark:text-accent">{value}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-wrapper max-w-5xl">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">
          Milestones
        </h2>
        <ol className="relative mx-auto max-w-3xl">
          {/* center line */}
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-accent/40 sm:left-1/2" />
          {[
            { year: "2009", text: "Workshop founded; first wooden dhow restored." },
            { year: "2014", text: "Launched our first 32-ft fiberglass cruiser." },
            { year: "2018", text: "Opened a climate-controlled paint facility." },
            { year: "2023", text: "Delivered our 100th custom vessel." },
          ].map((item, idx) => (
            <li
              key={item.year}
              className="relative mb-10 grid gap-4 sm:grid-cols-2 sm:items-center"
            >
              {/* dot */}
              <span
                className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10 h-3 w-3 rounded-full bg-accent ring-4 ring-light dark:ring-[#0F1B2A]"
                aria-hidden
              />
              {/* left card (even on left, odd on right) */}
              <div className={`sm:${idx % 2 ? "order-2" : "order-1"}`}>
                <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10">
                  <p className="text-primary dark:text-accent font-semibold">{item.year}</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                </div>
              </div>
              {/* spacer on the other side for large screens */}
              <div className={`hidden sm:block sm:${idx % 2 ? "order-1" : "order-2"}`} />
            </li>
          ))}
        </ol>
      </section>

      {/* VALUES */}
      <section className="section-wrapper">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">
          What Sets Us Apart
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["🌊", "100% Marine-grade materials"],
            ["🔧", "25-year combined team experience"],
            ["🇦🇪", "Built in the UAE"],
            ["♻️", "Eco-friendly coatings & processes"],
            ["🛰️", "State-of-the-art electronics"],
            ["🛡️", "5-year structural warranty"],
          ].map(([emoji, text]) => (
            <li
              key={text}
              className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow ring-1 ring-black/5 dark:ring-white/10"
            >
              <div className="text-xl">{emoji}</div>
              <p className="mt-2 font-medium text-dark dark:text-light">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* LEADERSHIP */}
      <section className="section-wrapper max-w-6xl">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-dark dark:text-light">
          Leadership
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["Kalim Ullah", "CEO & Naval Architect", Kalim],
            ["Fatima Rahman", "Head of Design", "https://www.shutterstock.com/image-photo/happy-cheerful-45-year-old-260nw-2353012797.jpg"],
            ["Hasan Khan", "Production Manager", "https://media.istockphoto.com/id/1949501832/photo/handsome-hispanic-senior-business-man-with-crossed-arms-smiling-at-camera-indian-or-latin.jpg?s=612x612&w=0&k=20&c=LtlsYrQxUyX7oRmYS37PnZeaV2JmoPX9hWYPOfojCgw="],
          ].map(([name, role, pic]) => (
            <div
              key={name}
              className="rounded-2xl bg-white dark:bg-slate-800 p-6 text-center shadow ring-1 ring-black/5 dark:ring-white/10"
            >
              <img
                src={pic}
                alt={name}
                className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-primary/30 dark:ring-accent/30"
              />
              <p className="mt-4 font-semibold text-dark dark:text-light">{name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ContactStrip />
    </>
  );
}
