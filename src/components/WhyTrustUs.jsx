// src/components/WhyTrustUs.jsx
import FadeInOnScroll from "./FadeInOnScroll";

const stats = [
  { label: "Vessels Delivered", value: "100+" },
  { label: "Years Experience",   value: "10+"  },
  { label: "ISO-9001 Certified", value: ""    },
  { label: "Structural Warranty",value: "5-yr" },
];

export default function WhyTrustUs() {
  return (
    <FadeInOnScroll>
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-4xl font-bold text-primary dark:text-accent">
              {stat.value || "✔"}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {stat.label}
            </p>
          </div>
        ))}
      </section>
    </FadeInOnScroll>
  );
}
