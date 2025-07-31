// src/components/Hero.jsx
import PrimaryButton from "./PrimaryButton";
import heroImg from "../assets/hero.jpg";
import boatVideo from "../assets/boat.mp4";
import DriftingBoatsBG from "./DriftingBoatsBG";

export default function Hero() {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden md:h-[70vh]">
      {/* Background video on md+ */}
      <video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src={boatVideo}
        poster={heroImg}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Fallback image on small screens */}
      <img
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
        src={heroImg}
        alt="Ocean Stella hero"
      />

      {/* Drifting boats SVG animation */}
      <div className="absolute inset-0 pointer-events-none">
        <DriftingBoatsBG />
      </div>

      {/* Overlay tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-light animate-floatX">
        <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Crafting Boats.
          <br className="hidden md:inline" />
          Crafting Memories.
        </h1>
        <p className="mb-6 text-lg opacity-90 md:text-xl">
          From custom builds to flawless paintwork—Ocean Stella turns your
          vision into reality.
        </p>
        <PrimaryButton
          as="a"
          href="https://wa.me/+923322649000"
          className="bg-accent hover:bg-primary"
        >
          Get a Quote
        </PrimaryButton>
      </div>
    </section>
  );
}
