// src/pages/BlogPage.jsx
import BlogHero from "../components/blogComponents/BlogHero";
import BlogSearchFilter from "../components/blogComponents/BlogSearchFilter";
import FeaturedPostCard from "../components/blogComponents/FeaturedPostCard";
import BlogCard from "../components/blogComponents/BlogCard";
import BlogSidebar from "../components/blogComponents/BlogSidebar";
import Pagination from "../components/blogComponents/Pagination";
import NewsletterSignup from "../components/blogComponents/NewsletterSignup";
import { latestPosts } from "../components/data/blog";

export default function BlogPage() {
  const currentPage = Number(new URLSearchParams(window.location.search).get("page") || 1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(latestPosts.length / postsPerPage);
  const pagedPosts = latestPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      <BlogHero />
      <BlogSearchFilter />
      <section className="section-wrapper grid lg:grid-cols-[1fr,auto] gap-8">
        <div className="space-y-8">
          <FeaturedPostCard post={latestPosts[0]} />
          <div className="grid gap-6 md:grid-cols-2">
            {pagedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
          <NewsletterSignup />
        </div>
        <BlogSidebar />
      </section>
    </>
  );
}
