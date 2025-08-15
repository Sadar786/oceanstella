// src/pages/Home.jsx
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import ProductsGallery from "../components/ProductsGallery";
import ContactStrip from "../components/ContactStripe";
import FadeInOnScroll from "../components/FadeInOnScroll";
import WhyTrustUs from "../components/WhyTrustUs";
import FeaturedCaseStudies from "../components/FeaturedCaseStudies";
import InsightsTeaser from "../components/InsightsTeaser";

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
            <ServiceCard icon="build" title="Boat Building" slug="boat-making">
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
            <ServiceCard icon="custom" title="Maintenance" slug="maintenance">
              From interior layouts to tech upgrades—tailored to your lifestyle.
            </ServiceCard>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Why Trust Us Section */}
      <FadeInOnScroll delay={0.1}>
        <WhyTrustUs />
      </FadeInOnScroll>
      {/* Featured Case Studies */}
      <FadeInOnScroll delay={0.1}>
        <FeaturedCaseStudies />
      </FadeInOnScroll>
      {/* Insights Teaser */}
      <FadeInOnScroll delay={0.1}>
        <InsightsTeaser />
      </FadeInOnScroll>

      {/* Product gallery */}
      <FadeInOnScroll delay={0.2}>
        <section className="section-wrapper dark:text-light">
          <ProductsGallery />
        </section>
      </FadeInOnScroll>

      {/* Contact */}
      <FadeInOnScroll delay={0.1}>
        <ContactStrip />
      </FadeInOnScroll>
    </>
  );
}
