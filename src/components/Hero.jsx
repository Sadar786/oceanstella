// src/components/Hero.jsx
import PrimaryButton from "./PrimaryButton";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
    
      className=" mt-1 relative flex h-[70vh] items-center justify-center overflow-hidden md:h-[70vh]"
    >
      {/* Background image */}
      <img
        src={heroImg}
        alt="Ocean Stella hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
<br/>
      {/* Overlay tint */}
     <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-transparent" />


      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-light">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">

          Crafting Boats.  
         
          <br className="hidden md:inline" />
          Crafting Memories.
        </h1>
        <p className="mb-6 text-lg opacity-90 md:text-xl">
          From custom builds to flawless paintwork—Ocean Stella turns your vision into reality.
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
