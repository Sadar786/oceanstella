// src/components/caseStudy/CaseStudyGrid.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudyGrid({ projects, loading }) {
  if (loading) {
    return (
      <div className="section-wrapper grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl bg-white/60 dark:bg-slate-800/60 h-80" />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <FadeInOnScroll delay={0.2}>
        <p className="section-wrapper text-center text-slate-600 dark:text-slate-400">
          No case studies found.
        </p>
      </FadeInOnScroll>
    );
  }

  return (
    <div className="section-wrapper grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <CaseStudyCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
