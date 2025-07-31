// src/pages/Home.jsx
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import ProductsGallery from "../components/ProductsGallery";
import ContactStrip from "../components/ContactStripe";
import FadeInOnScroll from "../components/FadeInOnScroll";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>

      {/* Services */}
      <FadeInOnScroll delay={0.1}>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
            Our Core Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard icon="build" title="Boat Making" slug="boat-making">
              Precision engineering and handcrafted detailing for vessels that
              last a lifetime.
            </ServiceCard>
            <ServiceCard
              icon="paint"
              title="Boat Painting"
              slug="boat-painting"
            >
              Premium marine‑grade finishes that protect and turn heads at sea.
            </ServiceCard>
            <ServiceCard
              icon="custom"
              title="Customization"
              slug="customization"
            >
              From interior layouts to tech upgrades—tailored to your lifestyle.
            </ServiceCard>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Product gallery */}
      <FadeInOnScroll delay={0.2}>
        <section className="section-wrapper dark:text-light">
          <ProductsGallery />
        </section>
      </FadeInOnScroll>

      {/* Contact */}
      <FadeInOnScroll delay={0.5}>
          <ContactStrip />
      </FadeInOnScroll>
    </>
  );
}
