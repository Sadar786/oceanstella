// src/components/ProductsGallery.jsx
import { useSelector } from "react-redux";
import useQuery from "../hooks/useQuery";
import { api, qs } from "../lib/api";
import Skeleton from "../ui/Skeleton";

const FALLBACK = [
  { name: "Stella 32", images: [{ url: "/src/assets/newboat1.jpg" }] },
  { name: "Explorer 60", images: [{ url: "/src/assets/newBoat3.jpg" }] },
  { name: "Mariner 45", images: [{ url: "/src/assets/boatMaking3.jpg" }] },
];

export default function ProductsGallery() {
  const mode = useSelector((s) => s.theme.mode);

  const { data, pending, error } = useQuery(async () => {
    // Adjust the params/fields to your server contract
    const res = await api(
      `/api/v1/products${qs({
        status: "published",
        limit: 3,
        sort: "-createdAt",
        fields: "name,slug,images",
      })}`
    );
    const items = Array.isArray(res) ? res : res.items || res.data || [];
    return items.length ? items : FALLBACK;
  }, []);

  const items = data || FALLBACK;

  return (
    <section className="border border-slate-200 bg-white py-16 transition-colors duration-300 dark:border-slate-600 dark:bg-slate-800">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
          Featured Models
        </h2>

        {pending ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="aspect-video rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((p) => {
              const img = p.images?.[0]?.url || p.image?.url || p.img || "";
              return (
                <div
                  key={p._id || p.slug || p.name}
                  className="relative aspect-video overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md dark:bg-slate-800"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <Skeleton className="h-full w-full" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent py-1 text-center text-light backdrop-blur-sm">
                    {p.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-sm text-rose-600">
            Couldn’t load products — showing demo.
          </p>
        )}
      </div>
    </section>
  );
}
