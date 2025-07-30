// src/components/CosmicCTA.jsx
import DriftingBoatsBG from "./DriftingBoatsBG";   // animated background
import FlyBoat from "../assets/Flyingboat.svg";   // static boat image
export default function CosmicCTA() {
  return (
 <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-black text-light">
      <DriftingBoatsBG />   {/* ← animated layer */}      {/* tiny star‑field particles */}
      <div className="pointer-events-none absolute inset-0  bg-cover opacity-40" 
       style={{ backgroundImage: `url(${FlyBoat})` }}/>

      {/* top “Get Started” pill */}
      <span
        className="absolute top-24 rounded-md border border-cyan-400/50 bg-black/30 px-6 py-2 text-sm
                   backdrop-blur-sm hover:bg-cyan-400/10 transition"
      >
        With Ocean Stella 
      </span>
<div className="flex flex-col items-center justify-center text-center">
      {/* headline + subhead */}
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="mb-4 max-w-3xl text-4xl font-extrabold md:text-5xl">
          Think better with Ocean Stella
        </h1>
        <p className="mb-10 max-w-xl text-slate-200">
          Never miss a note, idea or connection.
        </p>
      </div>

      {/* glowing ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* outer blur */}
        <div className="h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        {/* ring */}
        <div className="absolute h-48 w-96 rounded-full border-[6px] border-slate-800
                        bg-gradient-to-tr from-cyan-500/20 to-transparent shadow-[0_0_60px_10px_rgba(59,255,255,0.25)]
                        backdrop-blur-sm" />
      </div>

      {/* main CTA button (inside ring) */}
      <a
        href="#contact"
        className="z-10 mt-2 inline-flex items-center gap-2 rounded-lg border border-cyan-300/60
                   bg-black/40 px-8 py-4 font-semibold text-cyan-100 backdrop-blur
                   hover:bg-cyan-300/20 hover:text-white transition"
      >
        Get started free
      </a>
</div>
    </section>
  );
}
