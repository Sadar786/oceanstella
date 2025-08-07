// src/components/casecomponents/TabsFilter.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function TabsFilter({ tabs, active, onChange }) {
  return (
    <FadeInOnScroll delay={0.1}>
      <section className="section-wrapper flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              active === tab
                ? "bg-primary text-light"
                : "bg-light text-dark dark:bg-dark dark:text-light hover:bg-primary/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>
    </FadeInOnScroll>
  );
}
