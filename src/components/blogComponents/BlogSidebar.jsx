// src/components/blogComponents/BlogSidebar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { latestPosts as FALLBACK } from "../data/blog";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

export default function BlogSidebar() {
  const [recent, setRecent] = useState(FALLBACK.slice(0, 3));

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/blog/posts?page=1&limit=3`);
        if (!res.ok) return;
        const json = await res.json();
        const norm = (json.items || []).map(n => ({
          ...n,
          img: n.coverImage || n.img,
          date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : n.date,
        }));
        if (norm.length) setRecent(norm);
      } catch {}
    })();
  }, []);

  return (
    <aside className="block w-full lg:w-80 space-y-8">
      <FadeInOnScroll>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold text-dark dark:text-light mb-2">About Our Blog</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Expert insights on boating, painting, and maintenance to keep your vessel in top condition.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold text-dark dark:text-light mb-4">Recent Posts</h4>
          <ul className="space-y-3">
            {recent.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="text-sm text-primary hover:underline">
                  {post.title}
                </Link>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {post.date || "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold text-dark dark:text-light mb-4">Newsletter</h4>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full border px-4 py-2 text-sm text-dark dark:text-light bg-light dark:bg-slate-700 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-dark hover:bg-primary hover:text-light"
            >
              Subscribe
            </button>
          </form>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold text-dark dark:text-light mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl text-primary dark:text-accent">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>
      </FadeInOnScroll>
    </aside>
  );
}
