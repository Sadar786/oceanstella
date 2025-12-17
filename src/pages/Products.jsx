// src/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import ModelHero from "../components/productComps/ModelHero";
import ModelIntro from "../components/productComps/ModelIntro";
import ModelFilter from "../components/productComps/ModelFilter";
import ModelGrid from "../components/productComps/ModelGrid";
import ContactStrip from "../components/ContactStripe";
import { models as LOCAL_MODELS } from "../components/data/models";
import useQuery from "../hooks/useQuery";
import { apiMaybe, qs } from "../lib/api";
import Skeleton from "../ui/Skeleton";

/** Build a category label from various possible fields (including populated categoryId) */
function getCat(p) {
  const catObj = p.category || p.categoryId; // backend may send populated {name,slug}
  return (
    catObj?.name ||
    catObj?.title ||
    catObj?.slug ||
    p.category ||
    p.type ||
    "Other"
  );
}

/** Case-insensitive, with synonyms */
function firstKey(obj, keys = []) {
  const map = Object.create(null);
  for (const k of keys) map[String(k).toLowerCase()] = true;
  for (const s of obj) {
    const k = String(s?.key || "").toLowerCase();
    if (map[k]) return s?.value || "";
  }
  return "";
}

/** Read a spec value by key (case-insensitive) from specs[] with synonyms */
function specVal(p, keyOrList) {
  const arr = Array.isArray(p?.specs) ? p.specs : [];
  const keys = Array.isArray(keyOrList) ? keyOrList : [keyOrList];
  // simple direct match
  const hit = arr.find(
    (s) => String(s?.key || "").toLowerCase() === String(keys[0]).toLowerCase()
  );
  if (hit) return hit.value || "";

  // fallback: synonyms
  return firstKey(arr, keys.map(String));
}

/** Normalize one product into what ModelCard/Grid expect */
function toCard(p) {
  // images → string[]
  const firstUrl = p.images?.[0]?.url || p.image?.url || p.coverImage || p.img || "";
  const images =
    Array.isArray(p.images) && p.images.length
      ? p.images.map((it) => (typeof it === "string" ? it : it?.url)).filter(Boolean)
      : firstUrl
      ? [firstUrl]
      : [];

  const length =
    p.length ??
    specVal(p, ["length", "loa", "l.o.a", "overall length", "length overall"]);
  const beam =
    p.beam ??
    specVal(p, ["beam", "beam (m)", "beam width", "width"]);
  const speed =
    p.speed ??
    specVal(p, ["max speed", "top speed", "topspeed", "max_speed", "speed"]);
  const seats =
    p.seats ??
    specVal(p, ["seats", "capacity", "passengers"]);

  return {
    name: p.name,
    slug: p.slug || p.name?.toLowerCase()?.replace(/\s+/g, "-") || "",
    images, // array of strings
    cat: getCat(p),
    length: length || "",
    beam: beam || "",
    speed: speed || "",
    seats: seats || "",
    _raw: p,
  };
}

export default function Products() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  // Fetch published products; request fields incl. specs
  const { data, pending, error } = useQuery(async () => {
    const res = await apiMaybe(
      `/api/v1/products${qs({
        status: "published",
        limit: 60,
        sort: "latest",
        fields:
          "name,slug,images,categoryId,category,tags,specs,createdAt,publishedAt", // ✅ specs
      })}`
    );
    const items = Array.isArray(res) ? res : res?.items || res?.data || res?.items || [];
    if (!items.length) return LOCAL_MODELS.map(toCard);
    return items.map(toCard);
  }, []);

  const categories = useMemo(() => {
    const list = (data || []).map((p) => p.cat).filter(Boolean);
    const uniq = Array.from(new Set(list));
    return ["All", ...uniq];
  }, [data]);

  const filtered = useMemo(() => {
    const src = data && data.length ? data : LOCAL_MODELS.map(toCard);
    const byCat =
      active === "All" ? src : src.filter((p) => String(p.cat).toLowerCase() === active.toLowerCase());
    const q = query.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((p) => p.name?.toLowerCase().includes(q));
  }, [data, active, query]);

  return (
    <>
      <ModelHero />
      <ModelIntro />
      <ModelFilter
        categories={categories}
        active={active}
        setActive={setActive}
        query={query}
        setQuery={setQuery}
      />

      <section id="model-grid" className="section-wrapper2 mb-8">
        {pending ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
                <Skeleton className="mb-3 aspect-video w-full rounded-lg" />
                <Skeleton className="mb-2 h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <ModelGrid models={filtered} />
        )}

        {error && !/404/.test(String(error?.message || "")) && (
          <p className="mt-4 text-center text-sm text-rose-600">
            Couldn’t load models from server — showing local catalog.
          </p>
        )}
      </section>

      <ContactStrip />
    </>
  );
}
