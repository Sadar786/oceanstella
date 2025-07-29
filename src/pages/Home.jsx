// src/pages/Home.jsx
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import ProductsGallery from "../components/ProductsGallery";
import ContactStrip from "../components/ContactStripe";


export default function Home() {
  return (
    <>
      <Hero />
      {/* Services */}   
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark">
          Our Core Services
        </h2>
                        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard icon="build" title="Boat Making">
            Precision engineering and handcrafted detailing for vessels that
            last a lifetime.
          </ServiceCard>

          <ServiceCard icon="paint" title="Boat Painting">
            Premium marine‑grade finishes that protect and turn heads at sea.
          </ServiceCard>

          <ServiceCard icon="custom" title="Customization">
            From interior layouts to tech upgrades—tailored to your lifestyle.
          </ServiceCard>
        </div>
      </section>
      {/* Product gallery */}
      <section className="section-wrapper  dark:text-light">
        <ProductsGallery />
      </section>
      <section className="setion-wrapper mb-6 sm:mb-10">
        <ContactStrip />
      </section>
    </>
  );
}
