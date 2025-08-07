// src/components/productcomponents/ModelDetails.jsx
import { useParams } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";
import ModelCard from "./ModelCard";

// Demo data lookup (you’d replace this with real data or API)
import { models } from "../data/models.js";

import p1 from "../../../src/assets/boat3.jpg";
import p2 from "../../../src/assets/boat4.jpg";
import p3 from "../../../src/assets/boat2.jpg";
import p4 from "../../../src/assets/boat1.jpg";
import p5 from "../../../src/assets/boat6.jpg";
import p6 from "../../../src/assets/boat5.jpg";

const demoPics = [p1, p2, p3, p4, p5, p6];

export default function ModelDetails() {
  const { slug } = useParams(); // e.g. “stella-32-sport”
  const model = models.find((m) => m.slug === slug);

  if (!model) {
    return <p className="p-10 text-center">Model not found.</p>;
  }

  return (
    <div className="space-y-12">
      {/* Hero carousel */}
      <FadeInOnScroll>
        <div className="relative h-80 overflow-hidden rounded-lg">
          {model.images.map((src, i) => (
            <img
              key={i}
              src={ src || demoPics[i % demoPics.length] }
              alt={`${model.name} view ${i + 1}`}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === 0 ? 1 : 0 }}
              // For a real slider, swap this out with a carousel component
            />
          
          ))}

        </div>
      </FadeInOnScroll>

      {/* Title & Quick Stats */}
      <FadeInOnScroll delay={0.1}>
        <section className="section-wrapper text-center">
          <h1 className="text-4xl font-extrabold text-dark dark:text-light mb-2">
            {model.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Category: {model.cat} • Length: {model.length} • Beam: {model.beam}
          </p>
          <p className="text-lg font-semibold text-primary dark:text-accent">
            Starting at {model.price}
          </p>
        </section>
      </FadeInOnScroll>

      {/* Full Spec Sheet */}
      <FadeInOnScroll delay={0.2}>
        <section className="section-wrapper max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-dark dark:text-light mb-4">
            Full Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm bg-white dark:bg-slate-800 rounded-lg shadow">
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {Object.entries(model.specs).map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-6 py-4 font-medium text-dark dark:text-light">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Actions */}
      <FadeInOnScroll delay={0.3}>
        <section className="section-wrapper text-center space-x-4">
          <a
            href="#"
            className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light transition"
          >
            Request a Quote
          </a>
          <a
            href={model.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-light transition"
          >
            Download Brochure
          </a>
        </section>
      </FadeInOnScroll>

      {/* Related Models */}
      <FadeInOnScroll delay={0.4}>
        <section className="section-wrapper max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-dark dark:text-light mb-6">
            You Might Also Like
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {models
              .filter((m) => m.cat === model.cat && m.slug !== model.slug)
              .slice(0, 3)
              .map((m) => (
                <ModelCard key={m.slug} model={m} />
              ))}
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}
