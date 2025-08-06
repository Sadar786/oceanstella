// src/components/blogcomponents/PostHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function PostHero({ post }) {
  return (
    <FadeInOnScroll>
      <section className="relative">
        {/* Featured image */}
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />

        {/* Text overlay */}
        <div className="section-wrapper absolute inset-0 flex flex-col justify-end pb-12">
          <div className="bg-dark/60 inline-block px-4 py-2 rounded text-sm text-light mb-2">
            {post.date} &bull; {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-light">
            {post.title}
          </h1>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
