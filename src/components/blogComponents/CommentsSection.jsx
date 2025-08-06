// src/components/blogcomponents/CommentsSection.jsx
import { useState } from "react";
import FadeInOnScroll from "../FadeInOnScroll";

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);    // would come from API
  const [form, setForm] = useState({ name: "", comment: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call
    const newComment = {
      id: Date.now(),
      name: form.name,
      text: form.comment,
      date: new Date().toLocaleDateString(),
    };
    setComments([newComment, ...comments]);
    setForm({ name: "", comment: "" });
  };

  return (
    <FadeInOnScroll>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-light">
          Comments
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border px-4 py-2 text-sm bg-light dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:outline-none focus:border-primary"
          />
          <textarea
            name="comment"
            placeholder="Your comment"
            value={form.comment}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded border px-4 py-2 text-sm bg-light dark:bg-slate-800 dark:border-slate-600 dark:text-light focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-dark hover:bg-primary hover:text-light transition"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="border-t pt-4 border-gray-200 dark:border-slate-700"
              >
                <p className="text-sm font-medium text-dark dark:text-light">
                  {c.name} <span className="text-xs text-slate-500 dark:text-slate-400">on {c.date}</span>
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {c.text}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </FadeInOnScroll>
  );
}
