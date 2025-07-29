// src/pages/About.jsx
import heroImg from "../assets/hero.jpg"; // any high‑res boatyard photo
import Kalim from "../assets/Kalim.jpg"; // team member photo
import ContactStrip from "../components/ContactStripe";


export default function About() {

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[45vh] md:h-[55vh]">
        <img
          src={heroImg}
          alt="Shipyard"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-4xl font-extrabold text-light md:text-5xl">
            About&nbsp;Ocean Stella
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-wrapper max-w-3xl space-y-8">
        <h2 className="text-3xl font-bold text-dark">Our Story</h2>

        <p>
          Founded in <strong>2009</strong> on the shores of Dubai Creek, Ocean Stella
          began as a two‑person workshop repairing wooden dhows. Today, we are a
          multidisciplinary team of marine engineers, naval architects, and
          master craftsmen building ocean‑ready vessels for clients across the
          GCC and beyond.
        </p>

        <div className="border-l-4 border-accent/70 pl-6">
          <p className="font-semibold">Our mission</p>
          <p>
            To craft exceptional boats that create lifelong memories, combining
            heritage craftsmanship with cutting‑edge engineering while upholding
            the highest standards of safety and sustainability.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-wrapper justify-center items-center max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark">
          Milestones
        </h2>
        <ul className="relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-1 before:-translate-x-1/2 before:bg-accent/40">
          {[
            { year: "2009", text: "Workshop founded, first wooden dhow restored." },
            { year: "2014", text: "Launched our first 32‑ft fiberglass cruiser." },
            { year: "2018", text: "Opened climate‑controlled paint facility." },
            { year: "2023", text: "Delivered 100th custom vessel." },
          ].map((item, idx) => (
            <li
              key={item.year}
              className="mb-10 flex w-full items-center justify-between md:mb-12"
            >
              <div className={` w-5/12 ${idx % 2 ? "order-1" : ""} justify-center items-center `}>
                <p className="mb-2 text-lg font-semibold text-primary">{item.year}</p>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
              <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-light" />
              <div className="w-5/12 md:block hidden" />
            </li>
          ))}
        </ul>
      </section>

      {/* Values grid */}
      <section className="section-wrapper content-center justify-center items-center">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark">
          What Sets Us Apart
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["🌊", "100 % Marine‑grade materials"],
            ["🔧", "25‑year combined team experience"],
            ["🇦🇪", "Built in the UAE"],
            ["♻️", "Eco‑friendly coatings"],
            ["🛰️", "State‑of‑the‑art electronics"],
            ["🛡️", "5‑year structural warranty"],
          ].map(([emoji, text]) => (
            <li key={text} className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-lg">{emoji}</p>
              <p className="font-medium text-dark">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Mini‑team (optional) */}
      <section className="section-wrapper max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark">
          Leadership
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["kalim Ullah", "CEO & Naval Architect"  ,Kalim],
            ["Fatima Rahman", "Head of Design","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAH1a05KHNyGOHMHtilHsQbd5-gHdfe7p1KA&s" ],
            ["Hasan Khan", "Production Manager", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_B8dBacOt9MbLrJdc884Y_ji6FXU0EeLBA&s"],
          ].map(([name, role, pic]) => (
            <div key={name} className="rounded-xl bg-white p-5 shadow-sm text-center">
              <div className="mx-auto mb-3 h-24 w-32 rounded-full">
              <img className="rounded-full" src={pic} alt="" /> </div>
              <p className="font-semibold text-dark">{name}</p>
              <p className="text-sm text-slate-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <ContactStrip />
    </>
  );
}
