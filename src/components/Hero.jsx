// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import PrimaryButton from "./PrimaryButton";

import heroImg from "../assets/hero.jpg";
import boatVideo from "../assets/newBoatVideo1.mp4";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden h-[62vh] sm:h-[70vh] md:h-[85vh]">
      {/* Background media (no overlays at all) */}
      <video
        className="absolute inset-0  h-full w-full object-cover"
        src={boatVideo}
        poster={heroImg}
        autoPlay
        muted
        loop
        playsInline
      />
     

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-4">
        {/* Mobile: simple, no glass card */}
        <div className="sm:hidden text-center text-white">
          <h1 className="text-2xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            <span className="text-accent">Crafting Boats.</span>{" "}
            <span>Crafting Memories.</span>
          </h1>
          <p className="mt-2 text-sm text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Custom builds, mirror-finish painting & dependable maintenance.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <PrimaryButton
              as="a"
              href="https://wa.me/+923322649000"
              className="bg-accent text-dark hover:bg-primary hover:text-light px-4 py-2 text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              Get a Quote
            </PrimaryButton>
            <Link
              to="/products"
              className="rounded-full border border-white/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              View Models
            </Link>
          </div>
        </div>

        {/* Tablet/Desktop: glass card for premium feel (not an overlay on full screen) */}
        <div className="hidden sm:block">
          <div
            className="mx-auto max-w-4xl rounded-3xl  bg-transparent
                 p-8 md:p-10 text-center"

                 // glass effect removed for better video visibility
                 // shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
              Ocean Stella • Since 1998
            </span>

            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <span className="bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent drop-shadow-none">
                Crafting Boats.
              </span>{" "}
              <span>Crafting Memories.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Custom manufacturing, mirror-finish painting & dependable
              maintenance—built for open water and built to last.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton
                as="a"
                href="https://wa.me/+923322649000"
                className="bg-accent text-dark hover:bg-primary hover:text-light"
              >
                Get a Quote
              </PrimaryButton>

              <Link
                to="/products"
                className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                View Models
              </Link>
            </div>

            {/* Trust strip (md+) */}
            <div className="mt-6 hidden md:grid grid-cols-3 gap-2 text-sm text-white/95">
              <div className="rounded-full bg-black/30 px-3 py-2">
                ISO-certified composites
              </div>
              <div className="rounded-full bg-black/30 px-3 py-2">
                5-year structural warranty
              </div>
              <div className="rounded-full bg-black/30 px-3 py-2">
                WhatsApp reply &lt; 10 min
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave (kept; remove if you want absolutely no decoration) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden sm:block">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[90px] fill-light/80 dark:fill-[#0F1B2A] opacity-90"
        >
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      {/* Scroll cue (tablet/desktop only) */}
      <a
        href="/#/services"
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 hover:text-white transition flex-col items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        <span className="text-[11px] tracking-wider">Scroll</span>
        <FiChevronDown className="animate-bounce mt-1" />
      </a>
    </section>
  );
}
