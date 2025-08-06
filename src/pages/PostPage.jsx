// src/pages/PostPage.jsx
import { useParams } from "react-router-dom";
import { latestPosts } from "../components/data/blog";                       // <-- correct path
import Breadcrumbs     from "../components/blogComponents/Breadcrumbs";
import PostHero        from "../components/blogComponents/PostHero";
import TableOfContents from "../components/blogComponents/TableOfContents";
import PostContent     from "../components/blogComponents/PostContent";
import AuthorBio       from "../components/blogComponents/AutherBio";
import ShareButtons    from "../components/blogComponents/ShareButtons";
import RelatedPosts    from "../components/blogcomponents/RelatedPosts";
import NewsletterSignup from "../components/blogComponents/NewsletterSignup";
import CommentsSection  from "../components/blogComponents/CommentsSection";
import BackToBlog       from "../components/blogComponents/BackToBlog";

export default function PostPage() {
  const { slug } = useParams();
  const post = latestPosts.find((p) => p.slug === slug);
  if (!post) return <p className="p-10 text-center">Post not found.</p>;

  return (
    <>
      <Breadcrumbs path={[{ name: "Insights", to: "/blog" }, { name: post.title }]} />
      <PostHero post={post} />
      <div className="section-wrapper max-w-4xl mx-auto space-y-12">
        {/* ensure your content prop matches your data field */}
        <TableOfContents content={post.content} />
        <PostContent     content={post.content} />
        <AuthorBio       author={post.author} />
        <ShareButtons    url={window.location.href} title={post.title} />
        <RelatedPosts currentSlug={post.slug} />
        <NewsletterSignup />
        <CommentsSection postId={post.slug} />
        <BackToBlog />
      </div>
    </>
  );
}
