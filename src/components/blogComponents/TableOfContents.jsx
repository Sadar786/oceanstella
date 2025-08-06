// src/components/blogcomponents/TableOfContents.jsx
import { useEffect, useState } from "react";
import FadeInOnScroll from "../FadeInOnScroll";

/**
 * Expects `content` to be an HTML string containing <h2> and <h3> tags.
 * Generates a list of links to each heading (requires those headings
 * to have id attributes in the rendered markup).
 */
export default function TableOfContents({ content }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!content) return;

    // Parse the HTML string to find headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3")).map((h) => {
      // Ensure each heading has an id attribute
      let id = h.getAttribute("id");
      if (!id) {
        id = h.textContent
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
        h.setAttribute("id", id);
      }
      return {
        text: h.textContent,
        id,
        level: h.tagName === "H2" ? 2 : 3,
      };
    });

    setItems(headings);
  }, [content]);

  if (items.length === 0) return null;

  return (
    <FadeInOnScroll>
      <nav className="section-wrapper max-w-4xl mx-auto mb-8">
        <h2 className="text-xl font-semibold text-dark dark:text-light mb-4">
          Table of Contents
        </h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? "pl-4 text-sm" : "text-base"}
            >
              <a href={`#${item.id}`} className="text-primary hover:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </FadeInOnScroll>
  );
}
