// src/components/InsightsTeaser.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "./FadeInOnScroll";

import Mpic from "../../src/assets/boatMaking.webp";
import Ppic from "../../src/assets/boatPainting.webp";  
import Cpic from "../../src/assets/boatMaintenance.jpg";

// Demo data for posts
const latestPosts = [
  {
    title: "Boat Maintenance 101",
    slug: "boat-maintenance-101",
    excerpt: "Learn how to keep your hull in top shape and avoid costly repairs with our step-by-step guide.",
    date: "July 15, 2025",
    img: Cpic,
  },
  {
    title: "Choosing the Right Marine Paint",
    slug: "choosing-right-marine-paint",
    excerpt: "Discover the best paint systems for UV resistance and long-lasting color on your vessel.",
    date: "June 20, 2025",
    img: Ppic,
  },
  {
    title: "Engine Tuning Tips for Peak Performance",
    slug: "engine-tuning-tips",
    excerpt: "Optimize your boat’s engine with these expert-approved tuning techniques.",
    date: "May 10, 2025",
    img: Mpic,
  },
];

export default function InsightsTeaser() {
  return (
    <FadeInOnScroll delay={0.4}>
      <section className="section-wrapper">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark dark:text-light">
          Latest Insights
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col rounded-lg bg-white dark:bg-slate-800 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.img}
                alt={post.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-dark dark:text-light">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
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
      </section>
    </FadeInOnScroll>
  );
}
