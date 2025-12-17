// src/components/InsightsTeaser.jsx
import { Link } from "react-router-dom";
 import useQuery from "../hooks/useQuery";
import { apiMaybe, qs } from "../lib/api";
import Skeleton from "../ui/Skeleton"; // ← fixed path

const DEMO = [
  {
    title: "Boat Maintenance 101",
    slug: "boat-maintenance-101",
    excerpt:
      "Learn how to keep your hull in top shape and avoid costly repairs with our step-by-step guide.",
    date: "2025-07-15",
    img: "/src/assets/boatMaintenance.jpg",
  },
  {
    title: "Choosing the Right Marine Paint",
    slug: "choosing-right-marine-paint",
    excerpt:
      "Discover the best paint systems for UV resistance and long-lasting color on your vessel.",
    date: "2025-06-20",
    img: "/src/assets/boatPainting.webp",
  },
  {
    title: "Engine Tuning Tips for Peak Performance",
    slug: "engine-tuning-tips",
    excerpt:
      "Optimize your boat’s engine with these expert-approved tuning techniques.",
    date: "2025-05-10",
    img: "/src/assets/boatMaking.webp",
  },
];

export default function InsightsTeaser() {
  const { data, pending, error } = useQuery(async () => {
    // If the endpoint doesn't exist yet, apiMaybe returns null.
    const res = await apiMaybe(`/api/v1/blog/posts?limit=3`);
    const posts = Array.isArray(res) ? res : (res?.items || res?.data || []);
    const list = (posts && posts.length ? posts : DEMO).map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      date:
        (p.publishedAt && String(p.publishedAt).slice(0, 10)) ||
        p.date ||
        "",
      img: p.coverImage || p.seo?.ogImage || "",
    }));
    return list;
  }, []);

  const posts = data || DEMO;

  return (
       <section className="section-wrapper2">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark dark:text-light">
          Latest Insights
        </h2>

        {pending ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800"
              >
                <Skeleton className="mb-3 h-40 w-full rounded-md" />
                <Skeleton className="mb-2 h-5 w-3/4" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-slate-800"
              >
                {post.img ? (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Skeleton className="h-40 w-full" />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-dark dark:text-light">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{post.date}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !/404/.test(error.message) && (
          <p className="mt-4 text-center text-sm text-rose-600">
            Couldn’t load posts — showing demo.
          </p>
        )}
      </section>
   );
}
