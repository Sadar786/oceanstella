// src/components/FeaturedCaseStudies.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "./FadeInOnScroll";
import { services } from "../components/data/Services";

export default function FeaturedCaseStudies() {
  // pick one project per service
  const featured = [
    ...(services["boat-making"].projects.slice(0, 1)),
    ...(services["boat-painting"].projects.slice(0, 1)),
    ...(services["maintenance"].projects.slice(0, 1)),
  ];

  return (
    <FadeInOnScroll delay={0.3}>
      <section className="section-wrapper">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark dark:text-light">
          Featured Builds & Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={p.img}
                alt={p.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-dark dark:text-light">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
                  {p.description}
                </p>
                <ul className="mt-4 space-y-1 text-sm text-dark dark:text-light">
                  <li>
                    <strong>Service:</strong> {p.serviceType}
                  </li>
                  <li>
                    <strong>Date:</strong> {p.date}
                  </li>
                  <li>
                    <strong>Cost:</strong> {p.cost}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/case-studies" className="text-primary hover:underline">
            See All Case Studies →
          </Link>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
