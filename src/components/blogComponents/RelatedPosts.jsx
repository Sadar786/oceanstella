// src/components/blogcomponents/RelatedPosts.jsx
import { latestPosts } from "../data/blog";
import BlogCard from "../../components/blogComponents/BlogCard";
import FadeInOnScroll from "../FadeInOnScroll";

export default function RelatedPosts({ currentSlug }) {
  // Show up to 3 posts that aren't the current one
  const related = latestPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <FadeInOnScroll>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-light">
          Related Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </FadeInOnScroll>
  );
}
