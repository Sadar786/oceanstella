// src/components/blogcomponents/PostContent.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function PostContent({ content }) {
  return (
    <FadeInOnScroll>
      {/* 
        Wrap your raw HTML in a Tailwind “prose” container for nice typography.
        Make sure you’ve installed and enabled @tailwindcss/typography in your tailwind.config.js.
      */}
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        {/* 
          `content` is expected to be a string of HTML, for example:
          "<h2>Introduction</h2><p>This is a paragraph…</p>"
        */}
        <div
          // React’s way to insert raw HTML into the DOM. Use carefully!
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </FadeInOnScroll>
  );
}
