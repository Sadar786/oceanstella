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


  <div className="min-h-[60vh] px-4 m-20 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-pink-200/60 bg-white/70 p-6 text-center shadow-lg backdrop-blur sm:p-10 dark:border-white/10 dark:bg-white/5">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300">
          <span className="text-2xl">🛠️</span>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-xl font-bold tracking-tight text-pink-700 sm:text-3xl dark:text-pink-300">
          Site is temporarily down by developer
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300/80">
          Contact the developer if you want to restore or use this site.
        </p>

        {/* Contact card */}
        <div className="rounded-xl bg-pink-50 p-5 text-left dark:bg-white/5">
          <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Developer Contact
          </p>

          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between gap-3">
              <span className="opacity-80">Name</span>
              <span className="font-medium">Sadar Ullah Khan</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="opacity-80">Email</span>
              <a
                href="mailto:khanwebmaster4@gmail.com"
                className="font-medium text-pink-700 hover:underline dark:text-pink-300"
              >
                khanwebmaster4@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="opacity-80">Phone / WhatsApp</span>
              <a
                href="tel:+923322649000"
                className="font-medium text-pink-700 hover:underline dark:text-pink-300"
              >
                +92 332 2649000
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>




    // <>
    //   {/* Hero Section */}
    //   <FadeInOnScroll>
    //     <Hero />
    //   </FadeInOnScroll>

    //   {/* Services */}
    //   <FadeInOnScroll delay={0.1}>
    //     <section className="mx-auto max-w-6xl px-4 pt-16">
    //       <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
    //         Our Core Services
    //       </h2>
    //       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    //         <ServiceCard icon="build" title="Boat Building" slug="boat-making">
    //           Precision engineering and handcrafted detailing for vessels that
    //           last a lifetime.
    //         </ServiceCard>
    //         <ServiceCard
    //           icon="paint"
    //           title="Boat Painting"
    //           slug="boat-painting"
    //         >
    //           Premium marine‑grade finishes that protect and turn heads at sea.
    //         </ServiceCard>
    //         <ServiceCard icon="custom" title="Maintenance" slug="maintenance">
    //           From interior layouts to tech upgrades—tailored to your lifestyle.
    //         </ServiceCard>
    //       </div>
    //     </section>
    //   </FadeInOnScroll>

    //   {/* Why Trust Us Section */}
    //   <FadeInOnScroll delay={0.1}>
    //     <WhyTrustUs />
    //   </FadeInOnScroll>
    //   {/* Featured Case Studies */}
    //   <FadeInOnScroll delay={0.1}>
    //     <FeaturedCaseStudies />
    //   </FadeInOnScroll>
    //   {/* Insights Teaser */}
    //   <FadeInOnScroll delay={0.1}>
    //     <InsightsTeaser />
    //   </FadeInOnScroll>

    //   {/* Product gallery */}
    //   <FadeInOnScroll delay={0.1}>
    //     <section className="section-wrapper dark:text-light">
    //       <ProductsGallery />
    //     </section>
    //   </FadeInOnScroll>

    //   {/* Contact */}
    //   <FadeInOnScroll delay={0.1}>
    //     <ContactStrip />
    //   </FadeInOnScroll>
    // </>
  );
}
