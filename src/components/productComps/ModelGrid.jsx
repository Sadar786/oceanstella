// src/components/productcomponents/ModelGrid.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import ModelCard from "./ModelCard";

export default function ModelGrid({ models }) {
  return (
    <FadeInOnScroll delay={0.3}>
      <div className="section-wrapper grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <ModelCard key={m.name} model={m} />
        ))}
      </div>
    </FadeInOnScroll>
  );
}
