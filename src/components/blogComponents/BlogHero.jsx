// src/components/BlogHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import { Link } from "react-router-dom";

export default function BlogHero() {
  return (
    <FadeInOnScroll>
      <section
        className="relative h-64 bg-[url('/images/blog-hero.jpg')] bg-cover bg-center"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-light px-4">
          {/* Breadcrumb */}
          <nav className="mb-2 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-accent">Insights & News</span>
          </nav>

          {/* Title & subtitle */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Insights & News
          </h1>
          <p className="mt-2 text-base sm:text-lg opacity-90">
            Latest tips on boat care, painting, and maintenance
          </p>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
