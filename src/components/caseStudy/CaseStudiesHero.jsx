// src/components/casecomponents/CaseStudiesHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function CaseStudiesHero({ subtitle }) {
  return (
    <FadeInOnScroll>
      <section className="relative h-[40vh] md:h-[50vh]">
        {/* Dark overlay on a background image */}
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-light px-4 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">Case Studies</h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl">
              {subtitle}
            </p>
            
          )}
          <div className="flex w-auto align-middle justify-center"> <p className="text-red-500 text-3xl">Note : </p> <p  className="text-2xl text-ellipsis"> this Page is incomplete</p> </div>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
