import { useMemo, useState } from "react";

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Categories() {
  const [cats, setCats] = useState([
    { id: 1, name: "Accessories", slug: "accessories", count: 4 },
    { id: 2, name: "Merch", slug: "merch", count: 2 },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null=create
  const [form, setForm] = useState({ name: "" });

  function openCreate() {
    setEditingId(null);
    setForm({ name: "" });
    setOpen(true);
  }

  function openEdit(c) {
    setEditingId(c.id);
    setForm({ name: c.name });
    setOpen(true);
  }

  function saveCategory(e) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    if (editingId == null) {
      const cat = {
        id: Date.now(),
        name,
        slug: slugify(name),
        count: 0,
      };
      setCats((prev) => [...prev, cat]);
    } else {
      setCats((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, name, slug: slugify(name) } : c
        )
      );
    }
    setOpen(false);
  }

  function removeCategory(id) {
    const ok = window.confirm("Delete this category?");
    if (!ok) return;
    setCats((prev) => prev.filter((c) => c.id !== id));
  }

  const inputClass =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const labelClass = "text-sm text-slate-300";
  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

  const total = useMemo(() => cats.reduce((n, c) => n + (c.count || 0), 0), [cats]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Categories</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Total items: {total}</span>
          <button onClick={openCreate} className={btnPrimary}>+ Add Category</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Items</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {cats.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-slate-300">/{c.slug}</td>
                <td className="px-4 py-3">{c.count ?? 0}</td>
                <td className="px-4 py-3">
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cats.length === 0 && (
          <div className="p-6 text-center text-slate-400">No categories yet.</div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingId == null ? "New Category" : "Update Category"}
            </h2>
            <form onSubmit={saveCategory} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="name">Name</label>
                <input
                  id="name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e)=>setForm((v)=>({ ...v, name: e.target.value }))}
                  placeholder="e.g., Accessories"
                  required
                />
                {form.name && (
                  <p className="mt-1 text-xs text-slate-500">
                    Slug preview: /{slugify(form.name)}
                  </p>
                )}
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
