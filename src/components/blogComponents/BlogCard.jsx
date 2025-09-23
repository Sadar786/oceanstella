// src/components/blogComponents/BlogCard.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

export default function BlogCard({ post }) {
  const img = post.img || post.coverImage || "/images/placeholder-16x9.jpg";
  const date = post.date || (post.publishedAt && new Date(post.publishedAt).toLocaleDateString());
  const category = post.category || (post.tags && post.tags[0]) || "General";

  return (
    <FadeInOnScroll>
      <div className="flex flex-col rounded-lg bg-white dark:bg-slate-800 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img src={img} alt={post.title} className="h-40 w-full object-cover" />
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">{date || "—"}</div>
          <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">{post.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <Link to={`/blog/${post.slug}`} className="text-primary hover:underline text-sm font-medium">
              Read →
            </Link>
            <span className="text-xs text-slate-500 dark:text-slate-400">{category}</span>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
