// src/components/FeaturedCaseStudies.jsx
import FadeInOnScroll from "./FadeInOnScroll";
import { Link } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { apiMaybe } from "../lib/api";
import Skeleton from "../ui/Skeleton";

export default function FeaturedCaseStudies() {
  const { data, pending, error } = useQuery(async () => {
    const res = await apiMaybe(`/api/v1/case-studies`);
    const items = Array.isArray(res) ? res : (res?.items || res?.data || []);
    // take first 3 (they’re already sorted by your backend)
    return (items || []).slice(0, 3).map((cs) => ({
      title: cs.title,
      description: cs.summary || cs.subtitle || "",
      img: cs.heroImage || cs.gallery?.[0]?.url || "",
      serviceType: cs.client || "",        // you can rename this label if needed
      date: cs.publishedAt?.slice(0, 10),
      cost: "",                            // not in schema; omit or keep blank
      slug: cs.slug,
    }));
  }, []);

  const cards = data || [];

  return (
    <FadeInOnScroll delay={0.3}>
      <section className="section-wrapper">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark dark:text-light">
          Featured Builds & Projects
        </h2>

        {pending && (
          <div className="grid gap-6 md:grid-cols-3">
            {[0,1,2].map(i => (
              <div key={i} className="rounded-xl bg-white p-4 shadow-md dark:bg-slate-800">
                <Skeleton className="mb-3 h-48 w-full rounded-lg" />
                <Skeleton className="mb-2 h-6 w-2/3" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!pending && !!cards.length && (
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((p) => (
              <div
                key={p.slug || p.title}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-slate-800"
              >
                {p.img ? (
                  <img src={p.img} alt={p.title} className="h-48 w-full object-cover" loading="lazy" />
                ) : (
                  <Skeleton className="h-48 w-full" />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-xl font-semibold text-dark dark:text-light">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                  <ul className="mt-4 space-y-1 text-sm text-dark dark:text-light">
                    {p.serviceType && <li><strong>Client:</strong> {p.serviceType}</li>}
                    {p.date && <li><strong>Date:</strong> {p.date}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {!pending && !cards.length && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">No case studies yet.</p>
        )}

        {error && !/404/.test(error.message) && (
          <p className="mt-4 text-center text-sm text-rose-600">Couldn’t load case studies.</p>
        )}

        <div className="mt-8 text-center">
          <Link to="/case-studies" className="text-primary hover:underline">
            See All Case Studies →
          </Link>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
