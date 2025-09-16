// src/components/productcomponents/ModelHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import boatVideo from "../../assets/boat.mp4"; // same video used on About, or update as needed

export default function ModelHero() {
  return (
    <FadeInOnScroll>
      {/* HERO (matches About styling) */}
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

        {/* centered content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="px-4">
            <span className="inline-block rounded-full bg-white/15 text-light ring-1 ring-white/30 px-3 py-1 text-[11px] font-semibold">
              Since 2009 • Dubai
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-light drop-shadow">
              Boat <span className="text-accent">Models</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-light/95">
              Explore our range of high-performance and luxury boats — engineered for adventure and built to last.
            </p>
          </div>
        </div>

        {/* wave divider (same as About) */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute -bottom-px left-0 right-0 w-full h-[60px] fill-light dark:fill-[#0F1B2A]"
        >
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64V120H0Z" />
        </svg>
      </section>
    </FadeInOnScroll>
  );
}
