import { useState } from "react";

export default function Media() {
  const [media, setMedia] = useState([
    { id: 1, url: "https://picsum.photos/seed/boat1/600/400", name: "Boat 1" },
    { id: 2, url: "https://picsum.photos/seed/boat2/600/400", name: "Boat 2" },
    { id: 3, url: "https://picsum.photos/seed/boat3/600/400", name: "Boat 3" },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null=create
  const [form, setForm] = useState({ url: "", name: "" });
  const [preview, setPreview] = useState(null); // media item for preview

  function openCreate() {
    setEditingId(null);
    setForm({ url: "", name: "" });
    setOpen(true);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm({ url: item.url, name: item.name || "" });
    setOpen(true);
  }

  function saveMedia(e) {
    e.preventDefault();
    const url = form.url.trim();
    const name = form.name.trim() || "Untitled";
    if (!url) return;

    if (editingId == null) {
      setMedia((prev) => [...prev, { id: Date.now(), url, name }]);
    } else {
      setMedia((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, url, name } : m))
      );
    }
    setOpen(false);
  }

  function removeMedia(id) {
    const ok = window.confirm("Delete this image?");
    if (!ok) return;
    setMedia((prev) => prev.filter((m) => m.id !== id));
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
        <h1 className="text-xl md:text-2xl font-semibold">Media</h1>
        <button onClick={openCreate} className={btnPrimary}>+ Add Media</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {media.map((m) => (
          <div
            key={m.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
          >
            <button
              onClick={() => setPreview(m)}
              className="block w-full aspect-[4/3] overflow-hidden"
              title="Open preview"
            >
              <img
                src={m.url}
                alt={m.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
              />
            </button>

            <div className="p-3">
              <div className="truncate text-sm font-medium">{m.name}</div>
              <div className="truncate text-xs text-slate-500">{m.url}</div>
            </div>

            {/* Actions */}
            <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => openEdit(m)}
                className="rounded-lg bg-slate-800/80 px-2 py-1 text-xs text-white hover:bg-slate-700"
                title="Replace / edit info"
              >
                Edit
              </button>
              <button
                onClick={() => removeMedia(m.id)}
                className="rounded-lg bg-rose-700/50 px-2 py-1 text-xs text-rose-100 hover:bg-rose-700/70"
                title="Delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center text-slate-400">
          No media yet. Click “Add Media” to paste an image URL.
        </div>
      )}

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              {editingId == null ? "Add Media" : "Update Media"}
            </h2>
            <form onSubmit={saveMedia} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="name">Name</label>
                <input
                  id="name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                  placeholder="e.g., Yacht hero"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="url">Image URL</label>
                <input
                  id="url"
                  className={inputClass}
                  value={form.url}
                  onChange={(e) => setForm((v) => ({ ...v, url: e.target.value }))}
                  placeholder="https://your-cdn.com/image.jpg"
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  Paste any image URL for now. We’ll switch to file upload later.
                </p>
              </div>

              {form.url && (
                <div className="rounded-xl border border-white/10 bg-slate-800/40 p-3">
                  <div className="text-xs mb-2 text-slate-400">Preview</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.url}
                    alt="preview"
                    className="max-h-40 w-full rounded-lg object-contain"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className={btnGhost}>
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

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3">
              <div className="truncate pr-4">
                <div className="text-sm font-medium">{preview.name}</div>
                <div className="text-xs text-slate-500">{preview.url}</div>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="rounded-xl border border-white/20 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.url}
              alt={preview.name}
              className="max-h-[70vh] w-full rounded-xl object-contain bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
