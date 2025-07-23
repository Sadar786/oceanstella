// src/pages/Contact.jsx
import heroImg  from "../assets/hero.jpg";      // 1920×800 placeholder
import { FiPhone, FiMail, FiClock } from "react-icons/fi";


export default function Contact() {
  // simple toast‑style alert for Phase‑1 demo
  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent! In Phase 2 we’ll store this in the database.");
    e.target.reset();
  }

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src={heroImg}
          alt="Contact hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-4xl font-extrabold text-light md:text-5xl">
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Quick‑info cards */}
     <section className="section-wrapper grid gap-6 md:grid-cols-3">
  {[
    [FiPhone, "Phone", "+971 55 123 4567"],
    [FiMail,  "Email", "info@oceanstella.ae"],
    [FiClock, "Hours", "Sun‑Thu  09:00‑18:00"],
  ].map(([Icon, label, value]) => (
    <div key={label} className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-primary" />
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-semibold text-dark">{value}</p>
      </div>
    </div>
  ))}
</section>

      {/* Form + Map */}
      <section className="section-wrapper grid gap-12 md:grid-cols-2">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="mb-4 text-3xl font-bold text-dark">Send us a message</h2>

          {["Name", "Email", "Subject"].map((label) => (
            <div key={label} className="relative">
              <input
                type={label === "Email" ? "email" : "text"}
                placeholder=" "
                required
                className="peer h-12 w-full rounded-lg border px-4 outline-primary
                           focus:ring-2 focus:ring-primary/60"
              />
              <label
                className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                           peer-placement-shown:text-slate-400 peer-focus:-top-2
                           peer-focus:text-xs peer-focus:text-primary"
              >
                {label}
              </label>
            </div>
          ))}

          {/* Message box */}
          <div className="relative">
            <textarea
              rows="5"
              placeholder=" "
              required
              className="peer w-full resize-none rounded-lg border px-4 py-3 outline-primary
                         focus:ring-2 focus:ring-primary/60"
            />
            <label
              className="pointer-events-none absolute left-4 top-3 text-sm text-slate-500 transition-all
                         peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                         peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary"
            >
              Message
            </label>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-light transition
                       hover:bg-secondary"
          >
            Send Message
          </button>

          <p className="text-xs opacity-70">
            *Demo only; submissions will be stored & emailed in Phase 2.
          </p>
        </form>

        {/* Map */}
        <div className="overflow-hidden rounded-xl shadow-sm">
          <iframe
            title="Ocean Stella map"
            loading="lazy"
            className="h-96 w-full rounded-xl"
            allowFullScreen
            src="https://www.openstreetmap.org/export/embed.html?
                 bbox=55.2692%2C25.1875%2C55.2892%2C25.2075&layer=mapnik&marker=25.1975%2C55.2792"
          />
        </div>
      </section>

      {/* Social strip */}
      <section className="bg-light py-8">
        <div className="mx-auto flex max-w-3xl justify-center gap-8">
          <a href="https://facebook.com"  className="text-dark hover:text-primary">
            <i className="ri-facebook-fill text-2xl" />
          </a>
          <a href="https://instagram.com" className="text-dark hover:text-primary">
            <i className="ri-instagram-fill text-2xl" />
          </a>
          <a href="https://wa.me/971XXXXXXXXX" className="text-dark hover:text-primary">
            <i className="ri-whatsapp-fill text-2xl" />
          </a>
        </div>
      </section>
    </>
  );
}
