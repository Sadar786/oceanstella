import { useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Ocean Stella Launch 🚀",
      excerpt: "We are live with our new platform!",
      status: "Published",
      updated: "2025-08-01",
    },
    {
      id: 2,
      title: "Summer Deals",
      excerpt: "Check out discounts on boating accessories.",
      status: "Draft",
      updated: "2025-08-15",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", excerpt: "", status: "Draft" });

  function openCreate() {
    setEditingId(null);
    setForm({ title: "", excerpt: "", status: "Draft" });
    setOpen(true);
  }

  function openEdit(post) {
    setEditingId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, status: post.status });
    setOpen(true);
  }

  function savePost(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId == null) {
      const p = {
        id: Date.now(),
        ...form,
        updated: new Date().toISOString().split("T")[0],
      };
      setPosts((prev) => [...prev, p]);
    } else {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...form, updated: new Date().toISOString().split("T")[0] } : p
        )
      );
    }
    setOpen(false);
  }

  function removePost(id) {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  const inputClass =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const labelClass = "text-sm text-slate-300";
  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Blog Posts</h1>
        <button onClick={openCreate} className={btnPrimary}>+ New Post</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Excerpt</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-slate-300">{p.excerpt}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "Published"
                        ? "bg-emerald-600/30 text-emerald-300"
                        : "bg-slate-700/40 text-slate-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">{p.updated}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removePost(p.id)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-700/30 hover:bg-rose-700/50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="p-6 text-center text-slate-400">No posts yet.</div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingId == null ? "New Post" : "Update Post"}
            </h2>
            <form onSubmit={savePost} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input
                  id="title"
                  className={inputClass}
                  value={form.title}
                  onChange={(e)=>setForm(v=>({...v, title: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  rows="3"
                  className={inputClass}
                  value={form.excerpt}
                  onChange={(e)=>setForm(v=>({...v, excerpt: e.target.value}))}
                  placeholder="Short summary..."
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="status">Status</label>
                <select
                  id="status"
                  className={inputClass}
                  value={form.status}
                  onChange={(e)=>setForm(v=>({...v, status: e.target.value}))}
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={()=>setOpen(false)} className={btnGhost}>
                  Cancel
                </button>
                <button type="submit" className={btnPrimary}>
                  {editingId == null ? "Save" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
