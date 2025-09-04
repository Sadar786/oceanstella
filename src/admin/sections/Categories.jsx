import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL; // e.g., https://api.example.com

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null); // Mongo _id (or null = create)
  const [form, setForm] = useState({ name: "", order: 0, description: "" });

  async function fetchCats() {
    try {
      setErr("");
      setLoading(true);
      const res = await fetch(`${API}/api/v1/categories?withCounts=1`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load categories");
      setCats(data.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({ name: "", order: 0, description: "" });
    setOpen(true);
  }

  function openEdit(c) {
    setEditingId(c._id);
    setForm({
      name: c.name || "",
      order: c.order ?? 0,
      description: c.description || "",
    });
    setOpen(true);
  }

  async function saveCategory(e) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    try {
      setSaving(true);
      setErr("");
      const payload = {
        name,
        slug: slugify(name),
        order: Number(form.order) || 0,
        description: form.description || "",
      };

      let res;
      if (editingId == null) {
        // CREATE
        res = await fetch(`${API}/api/v1/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } else {
        // UPDATE
        res = await fetch(`${API}/api/v1/categories/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Save failed");

      // Refresh list to get canonical values (slug uniqueness, etc.)
      await fetchCats();
      setOpen(false);
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeCategory(idOrSlug) {
    const ok = window.confirm("Delete this category?");
    if (!ok) return;
    try {
      setErr("");
      const res = await fetch(`${API}/api/v1/categories/${idOrSlug}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Delete failed");
      setCats((prev) => prev.filter((c) => c._id !== idOrSlug && c.slug !== idOrSlug));
    } catch (e) {
      setErr(e.message);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const labelClass = "text-sm text-slate-300";
  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

  const total = useMemo(
    () => cats.reduce((n, c) => n + (c.count || 0), 0),
    [cats]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Categories</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Total items: {loading ? "…" : total}
          </span>
          <button onClick={openCreate} className={btnPrimary}>+ Add Category</button>
        </div>
      </div>

      {err && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={5}>Loading…</td></tr>
            ) : cats.length === 0 ? (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={5}>No categories yet.</td></tr>
            ) : (
              cats.map((c) => (
                <tr key={c._id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-slate-300">/{c.slug}</td>
                  <td className="px-4 py-3">{c.count ?? 0}</td>
                  <td className="px-4 py-3">{c.order ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className={btnGhost}>Edit</button>
                      <button
                        onClick={() => removeCategory(c._id)}
                        className="rounded-xl border border-red-400/30 px-3 py-2 text-red-300 hover:bg-red-400/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

              <div>
                <label className={labelClass} htmlFor="order">Order</label>
                <input
                  id="order"
                  type="number"
                  className={inputClass}
                  value={form.order}
                  onChange={(e)=>setForm((v)=>({ ...v, order: e.target.value }))}
                  placeholder="0"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="desc">Description (optional)</label>
                <textarea
                  id="desc"
                  className={inputClass}
                  rows={3}
                  value={form.description}
                  onChange={(e)=>setForm((v)=>({ ...v, description: e.target.value }))}
                  placeholder="Short summary…"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={()=>setOpen(false)} className={btnGhost}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className={btnPrimary}>
                  {saving ? "Saving…" : editingId == null ? "Save" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
