// src/components/productcomponents/ModelIntro.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function ModelIntro() {
  return (
    <FadeInOnScroll delay={0.1}>
      <section className="section-wrapper max-w-3xl text-center mx-auto">
        <p className="mb-4 text-slate-600 dark:text-white">
          Discover our curated selection of boat models, each crafted with precision engineering and premium materials. Whether you're seeking high-speed performance, luxury cruising comfort, or rugged fishing capability, we have the perfect vessel for your next adventure.
        </p>
        <p className="mb-6 text-slate-600 dark:text-white">
          Download our comprehensive catalog to explore full specifications, price guides, and available options for every model.
        </p>
        <a
          href="/catalog/OceanStella_Catalog.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-light hover:bg-secondary transition"
        >
          Download Full Catalog (PDF)
        </a>
      </section>
    </FadeInOnScroll>
  );
}
