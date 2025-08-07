// src/pages/Products.jsx
import { useState } from "react";
import ModelHero from "../components/productComps/ModelHero";
import ModelIntro from "../components/productComps/ModelIntro";
import ModelFilter from "../components/productComps/ModelFilter";
import ModelGrid from "../components/productComps/ModelGrid";
import ContactStrip from "../components/ContactStripe";
import {models} from "../components/data/models"; // Ensure this path is correct

const categories = ["All", "Sport", "Cruise", "Fishing"];

export default function Products() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  // filter by category
  const byCategory =
    active === "All" ? models : models.filter((m) => m.cat === active);

  // then filter by search query
  const display = byCategory.filter((m) =>
    m.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      {/* 1. Hero banner */}
      <ModelHero />

      {/* 2. Intro & Catalog download */}
      <ModelIntro />

      {/* 3. Filter controls */}
      <ModelFilter
        categories={categories}
        active={active}
        setActive={setActive}
        query={query}
        setQuery={setQuery}
      />

      {/* 4. Grid of model cards */}
      <section id="model-grid">
        <ModelGrid models={display} />
      </section>

      {/* 5. Contact strip */}
      <ContactStrip />
    </>
  );
}
