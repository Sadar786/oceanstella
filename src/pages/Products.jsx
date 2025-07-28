// src/pages/Products.jsx
import { useState } from "react";
import ContactStrip from "../components/ContactStripe";

import sport2   from "../assets/boat3.jpg";
import cruise1  from "../assets/boat2.jpg";
import cruise2  from "../assets/boat1.jpg";
import sport1   from "../assets/boat4.jpg";
import fishing1 from "../assets/boat5.jpg";
import fishing2 from "../assets/boat6.jpg";

const models = [
  { img: sport1,   name: "Stella 32 Sport",   cat: "Sport",   length: "32 ft", beam: "9.8 ft" },
  { img: sport2,   name: "Stella 38 Sport",   cat: "Sport",   length: "38 ft", beam: "11.1 ft" },
  { img: cruise1,  name: "Mariner 45 Cruise", cat: "Cruise",  length: "45 ft", beam: "13.5 ft" },
  { img: cruise2,  name: "Mariner 52 Cruise", cat: "Cruise",  length: "52 ft", beam: "15.8 ft" },
  { img: fishing1, name: "Explorer 40 Fish",  cat: "Fishing", length: "40 ft", beam: "12.2 ft" },
  { img: fishing2, name: "Explorer 48 Fish",  cat: "Fishing", length: "48 ft", beam: "14.0 ft" },
];

const categories = ["All", "Sport", "Cruise", "Fishing"];

export default function Products() {
  const [active, setActive] = useState("All");
  const display = active === "All" ? models : models.filter((m) => m.cat === active);

  return (
    <>
      {/* Banner */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src={sport1}
          alt="Models hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-4xl font-extrabold text-light md:text-5xl">
            Boat Models
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section-wrapper max-w-3xl text-center">
        <p className="mx-auto max-w-xl text-slate-600">
          Explore a selection of our most‑requested designs. Full spec sheets
          coming in Phase 2.
        </p>
      </section>

      {/* Category tabs */}
      <section className="section-wrapper">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold
                          ${active === cat
                            ? "bg-primary text-light"
                            : "bg-light ring-1 ring-dark/10 hover:bg-primary/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Model grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {display.map((m) => (
            <div key={m.name} className="group relative overflow-hidden rounded-xl shadow-sm">
              <img
                src={m.img}
                alt={m.name}
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end
                              bg-gradient-to-t from-dark/70 via-dark/20 to-transparent opacity-0
                              transition-opacity group-hover:opacity-100">
                <div className="mb-4 text-center text-light">
                  <p className="text-lg font-semibold">{m.name}</p>
                  <p className="text-sm opacity-90">
                    {m.length} • beam {m.beam}
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-dark
                               hover:bg-primary hover:text-light"
                  >
                    Brochure PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
