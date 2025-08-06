// src/components/blogComponents/NewsletterSignup.jsx
import FadeInOnScroll from "../FadeInOnScroll";

export default function NewsletterSignup() {
  return (
    <FadeInOnScroll delay={0.4}>
      <section className="mx-auto max-w-4xl px-4 py-12 bg-primary/10 rounded-lg text-center">
        <h3 className="text-2xl font-semibold text-dark dark:text-light mb-4">
          Subscribe for Exclusive Tips
        </h3>
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Get the latest boating, painting, and maintenance insights
          delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-dark dark:text-light bg-light dark:bg-slate-800 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-2 font-medium text-dark hover:bg-primary hover:text-light"
          >
            Subscribe
          </button>
        </form>
      </section>
    </FadeInOnScroll>
  );
}
