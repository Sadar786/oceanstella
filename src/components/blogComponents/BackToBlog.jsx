// src/components/blogcomponents/BackToBlog.jsx
import { Link } from "react-router-dom";
import FadeInOnScroll from "../FadeInOnScroll";
import { FiArrowLeft } from "react-icons/fi";

export default function BackToBlog() {
  return (
    <FadeInOnScroll delay={0.2}>
      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Back to Insights
        </Link>
      </div>
    </FadeInOnScroll>
  );
}
