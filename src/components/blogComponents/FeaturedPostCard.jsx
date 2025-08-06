// src/components/FeaturedPostCard.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";

export default function FeaturedPostCard({ post }) {
  return (
    <FadeInOnScroll>
      <section className="mx-auto max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {/* Post Image */}
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-64 object-cover"
        />

        {/* Post Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            {post.date}{" "}
            <span className="px-1">•</span> {post.category}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
