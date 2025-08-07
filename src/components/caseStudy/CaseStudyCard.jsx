// src/components/casecomponents/CaseStudyCard.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

export default function CaseStudyCard({ project }) {
  const {
    img,
    title,
    description,
    serviceType,
    date,
    cost,
    serviceSlug,
  } = project;

  return (
    <FadeInOnScroll>
      <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow">
        {/* Thumbnail */}
        <img
          src={img}
          alt={title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-dark dark:text-light">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
            {description}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-dark dark:text-light">
            <li>
              <strong>Service:</strong> {serviceType}
            </li>
            <li>
              <strong>Date:</strong> {date}
            </li>
            <li>
              <strong>Cost:</strong> {cost}
            </li>
          </ul>
          <Link
            to={`/service/${serviceSlug}`}
            className="mt-4 inline-block text-primary hover:underline"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
