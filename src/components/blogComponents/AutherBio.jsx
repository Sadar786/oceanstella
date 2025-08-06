// src/components/blogcomponents/AuthorBio.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function AuthorBio({ author }) {
  if (!author) return null;

  return (
    <FadeInOnScroll>
      <div className="flex items-center bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        {/* Author photo */}
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="h-16 w-16 rounded-full object-cover mr-4"
          />
        )}

        {/* Name and bio */}
        <div>
          <h4 className="text-lg font-semibold text-dark dark:text-light">
            {author.name}
          </h4>
          {author.title && (
            <p className="text-sm text-primary dark:text-accent">
              {author.title}
            </p>
          )}
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {author.bio}
          </p>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
