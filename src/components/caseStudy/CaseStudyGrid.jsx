// src/components/casecomponents/CaseStudyGrid.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudyGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <FadeInOnScroll delay={0.3}>
        <p className="section-wrapper text-center text-slate-600 dark:text-slate-400">
          No case studies found.
        </p>
      </FadeInOnScroll>
    );
  }

  return (
    <FadeInOnScroll delay={0.3}>
      <div className="section-wrapper grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <CaseStudyCard key={p.slug || p.title} project={p} />
        ))}
      </div>
    </FadeInOnScroll>
  );
}
