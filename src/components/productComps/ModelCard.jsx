// src/components/productcomponents/ModelCard.jsx
import { useState } from "react";
import FadeInOnScroll from "../FadeInOnScroll";
import { Link } from "react-router-dom";

export default function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeInOnScroll>
      <div
        className="group relative overflow-hidden rounded-xl shadow-sm"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <img
          src={model.images[0]}
          alt={model.name}
          className="h-64 w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />

        {/* Basic info */}
        <div className="p-4 bg-white dark:bg-slate-800">
          <h3 className="text-lg font-semibold text-dark dark:text-light">
            {model.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {model.length} • Beam {model.beam}
          </p>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-dark/70 text-light p-4 transition-opacity ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="mb-2 text-center text-sm">{model.cat}</p>
          <p className="mb-4 text-center text-sm">
            Max Speed: {model.speed || "35 kn"}
            <br />
            Seats: {model.seats || "8"}
          </p>
          <a
            href="wa.me/+923322649000"
            className="mb-2 block rounded-full bg-accent px-4 py-2 text-sm font-semibold text-dark hover:bg-primary hover:text-light transition"
          >
            Request Quote
          </a>
          <Link to={`/models/${model.slug}`} className="...">
            View Details
          </Link>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
