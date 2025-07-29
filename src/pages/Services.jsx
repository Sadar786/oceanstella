// src/pages/Services.jsx
import ContactStrip from "../components/ContactStripe";
import buildImg from "../assets/boat1.jpg";
import paintImg from "../assets/boat2.jpg";
import customImg from "../assets/boat3.jpg";

function ServiceDetail({ reverse, img, title, tagline, copy, bullets }) {
  return (
    <section
      className={`section-wrapper  dark:text-white grid items-center gap-10 md:grid-cols-2 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <img
        src={img}
        alt={title}
        className="rounded-xl shadow-md object-cover h-64 w-full md:h-72"
      />

      {/* Text */}
      <div>
        <h2 className="mb-2 text-2xl font-bold dark:text-white  text-dark">{title}</h2>
        <p className="mb-4 text-primary dark:text-white/85 font-medium">{tagline}</p>
        <p className="mb-4 text-slate-600 dark:text-white/85">{copy}</p>

        <ul className="space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="text-sm dark:text-white/85 text-dark/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      {/* Banner */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src={buildImg}
          alt="Workshop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-4xl font-extrabold text-light md:text-5xl">
            Our Services
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section-wrapper max-w-3xl text-center   dark:text-white">
        <p className="mx-auto max-w-xl text-slate-600  dark:text-white">
          From bare‑hull builds to precision paintwork and high‑tech
          customisations, Ocean Stella delivers craftsmanship you can rely on.
        </p>
      </section>

      {/* Service blocks */}
      <ServiceDetail
        img={buildImg}
        title="Boat Making"
        tagline="Hand‑built hulls—engineered for adventure"
        copy="Our build team merges traditional techniques with
              advanced composites to create vessels that slice through
              waves and stand the test of time."
        bullets={[
          "Full in‑house naval architecture",
          "ISO‑certified fiberglass & carbon layups",
          "5‑year structural warranty",
        ]}
      />

      <ServiceDetail
        reverse
        img={paintImg}
        title="Boat Painting"
        tagline="Mirror‑finish coatings that protect & shine"
        copy="Inside our climate‑controlled spray booth, we apply
              multi‑layer marine coatings that resist salt, UV and
              abrasion—keeping your investment looking new."
        bullets={[
          "Awlgrip® & Alexseal® systems",
          "Computer‑matched colour library",
          "Ceramic clear‑coat upgrade",
        ]}
      />

      <ServiceDetail
        img={customImg}
        title="Customization"
        tagline="Tailor your vessel to your lifestyle"
        copy="From smart dashboards to luxury interiors, our
              specialists integrate cutting‑edge tech and bespoke
              craftsmanship."
        bullets={[
          "Garmin & Raymarine electronics suites",
          "Teak decking & upholstery options",
          "Hybrid propulsion retrofits",
        ]}
      />

      {/* Process strip */}
      <section className="section-wrapper max-w-6xl dark:text-white">
        <h2 className="mb-8 text-center dark:text-white text-3xl font-bold text-dark">
          How We Work
        </h2>
        <div className="grid gap-8 md:grid-cols-3 ">
          {[
            ["🤝", "Consult", "Discuss requirements, timeline, and budget."],
            ["🛠️", "Build / Paint", "Craftsmanship under ISO‑certified QA."],
            ["⛵", "Launch", "Sea‑trial hand‑over and customer orientation."],
          ].map(([emoji, step, desc]) => (
            <div
              key={step}
              className="rounded-xl bg-white p-6 text-center shadow-sm dark:text-white dark:bg-slate-800"
            >
              <p className="mb-2 text-3xl">{emoji}</p>
              <h3 className="mb-1 font-semibold text-dark dark:text-white">{step}</h3>
              <p className="text-sm text-slate-600 dark:text-white">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ContactStrip />
    </>
  );
}
