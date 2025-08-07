// src/components/productcomponents/ModelHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import heroImg from "../../assets/boat4.jpg"; // adjust path/image as needed

export default function ModelHero() {
  return (
    <FadeInOnScroll>
      <section className="relative h-[40vh] md:h-[50vh]">
        {/* Background image */}
        <img
          src={heroImg}
          alt="Boat Models"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark/60" />
        {/* Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-light px-4">
          <h1 className="text-4xl font-extrabold md:text-5xl">Boat Models</h1>
          <p className="mt-2 max-w-xl">
            Explore our range of high-performance and luxury boats tailored to every adventure.
          </p>
          <a
            href="#model-grid"
            className="mt-4 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light transition"
          >
            View All Specs
          </a>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
