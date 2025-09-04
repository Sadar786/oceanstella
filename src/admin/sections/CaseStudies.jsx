// src/pages/admin/CaseStudies.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ImageUploader from "../../components/ImageUploader";

const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

function fmtDate(d) {
  if (!d) return "—";
  const dd = new Date(d);
  return isNaN(dd) ? "—" : dd.toISOString().split("T")[0];
}
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function splitTags(s) {
  return String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}
function joinTags(arr) {
  return (arr || []).join(", ");
}

const inputClass =
  "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
  "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
const labelClass = "text-sm text-slate-300";
const btnPrimary =
  "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60";
const btnGhost =
  "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

/* ---------------- Modal (Portal + scroll-safe) ---------------- */
function Modal({ open, title, onClose, onSave, saving, saveLabel = "Save", children }) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      {/* Scroll container */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain">
        {/* Card */}
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-md pointer-events-auto flex flex-col max-h-[88vh]">
          {/* Header (sticky) */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4 bg-slate-900/95">
            <h2 className="text-lg text-light font-semibold">{title}</h2>
            <div className="flex gap-2">
              <button onClick={onClose} className={btnGhost}>Close</button>
              <button onClick={onSave} disabled={saving} className={btnPrimary}>
                {saving ? "Saving…" : saveLabel}
              </button>
            </div>
          </div>
          {/* Body (scrolls) */}
          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------------- Helpers ---------------- */
function emptyForm() {
  return {
    title: "",
    client: "",
    status: "Draft", // Draft | Published
    summary: "",
    content: "",
    heroImage: "", // URL string (from uploader)
    gallery: [{ url: "", alt: "" }], // each { url, alt, publicId? }
    tags: [], // array in state; we keep a raw input too
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    ogImage: "",
  };
}

/* ---------------- Main ---------------- */
export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {_id, slug} | null

  const [form, setForm] = useState(emptyForm());
  const [tagsInput, setTagsInput] = useState("");

  // keep tagsInput in sync if form.tags changes
  useEffect(() => setTagsInput(joinTags(form.tags)), [form.tags]);

  async function fetchAll() {
    try {
      setErr("");
      setLoading(true);
      const res = await fetch(`${API}/api/v1/case-studies?all=1`, { credentials: "include" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load");
      setItems(data.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);

  /* ---------- open/create/edit ----------- */
  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  }

  function openEdit(cs) {
    setEditing({ _id: cs._id || cs.id, slug: cs.slug });
    setForm({
      title: cs.title || "",
      client: cs.client || "",
      status: cs.published ? "Published" : "Draft",
      summary: cs.summary || "",
      content: cs.content || "",
      heroImage: cs.heroImage || "",
      gallery:
        Array.isArray(cs.gallery) && cs.gallery.length
          ? cs.gallery.map((g) => ({ url: g.url || "", alt: g.alt || "", publicId: g.publicId }))
          : [{ url: "", alt: "" }],
      tags: Array.isArray(cs.tags) ? cs.tags : [],
      seoTitle: cs.seoTitle || "",
      seoDescription: cs.seoDescription || "",
      canonicalUrl: cs.canonicalUrl || "",
      ogImage: cs.ogImage || "",
    });
    setOpen(true);
  }

  /* ---------- delete row ----------- */
  async function removeCase(idOrSlug) {
    const ok = window.confirm("Delete this case study?");
    if (!ok) return;
    try {
      setErr("");
      const res = await fetch(`${API}/api/v1/case-studies/${idOrSlug}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Delete failed");
      setItems((prev) => prev.filter((c) => c._id !== idOrSlug && c.slug !== idOrSlug));
    } catch (e) {
      setErr(e.message);
    }
  }

  /* ---------- image upload handlers ----------- */
  function onHeroUploaded(img) {
    setForm((f) => ({
      ...f,
      heroImage: img.url,
      ogImage: f.ogImage || img.url, // default og -> hero
    }));
  }

  function addEmptyGalleryRow() {
    setForm((f) => ({ ...f, gallery: [...(f.gallery || []), { url: "", alt: "" }] }));
  }

  function onGalleryUploaded(img) {
    setForm((f) => ({
      ...f,
      gallery: [...(f.gallery || []), { url: img.url, alt: "", publicId: img.publicId }],
    }));
    // if no hero yet, set first upload as hero too (optional)
    setForm((f) => (f.heroImage ? f : { ...f, heroImage: img.url, ogImage: f.ogImage || img.url }));
  }

  function updateGalleryAt(idx, patch) {
    setForm((f) => {
      const next = [...(f.gallery || [])];
      next[idx] = { ...next[idx], ...patch };
      return { ...f, gallery: next };
    });
  }

  function removeGalleryAt(idx) {
    setForm((f) => {
      const next = (f.gallery || []).filter((_, i) => i !== idx);
      return { ...f, gallery: next.length ? next : [{ url: "", alt: "" }] };
    });
    // If you add a backend endpoint like /case-studies/:id/images/:publicId, you can delete the asset here.
  }

  /* ---------- save ----------- */
  async function save() {
    if (saving) return;
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    setSaving(true);
    setErr("");

    const payload = {
      title: form.title.trim(),
      client: form.client.trim(),
      slug: slugify(form.title),
      summary: form.summary,
      content: form.content,
      heroImage: form.heroImage,
      gallery: (form.gallery || [])
        .filter((g) => (g.url || "").trim())
        .map((g) => ({ url: g.url.trim(), alt: (g.alt || "").trim(), publicId: g.publicId })),
      tags: form.tags,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      canonicalUrl: form.canonicalUrl,
      ogImage: form.ogImage || form.heroImage || "",
      published: form.status === "Published",
    };

    try {
      let res;
      if (!editing) {
        res = await fetch(`${API}/api/v1/case-studies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/api/v1/case-studies/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Save failed");
      setOpen(false);
      await fetchAll();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  /* ---------- tags input (raw text -> array on blur) ----------- */
  function handleTagsChange(e) {
    setTagsInput(e.target.value);
  }
  function handleTagsBlur() {
    setForm((f) => ({ ...f, tags: splitTags(tagsInput) }));
  }

  /* ---------- rows ---------- */
  const rows = useMemo(
    () =>
      (items || []).map((i) => ({
        ...i,
        _status: i.published ? "Published" : "Draft",
        _date: fmtDate(i.publishedAt || i.updatedAt || i.createdAt),
      })),
    [items]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Case Studies</h1>
        <button onClick={openCreate} className={btnPrimary}>+ Add Case Study</button>
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
              <th className="px-4 py-3 text-left">Case Study</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Read</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-400">Loading…</td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-400">No case studies yet.</td>
              </tr>
            )}
            {!loading &&
              rows.map((c) => (
                <tr key={c._id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {c.heroImage ? (
                        <img
                          src={c.heroImage}
                          alt={c.title}
                          className="h-16 w-16 rounded-lg object-cover bg-slate-800"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-slate-800" />
                      )}
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-slate-400">{c.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.client || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        c._status === "Published"
                          ? "bg-emerald-600/30 text-emerald-300"
                          : "bg-slate-700/40 text-slate-300"
                      }`}
                    >
                      {c._status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{c.readingMinutes || 1} min</td>
                  <td className="px-4 py-3">{c._date}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeCase(c._id)}
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
      </div>

      {/* Modal (Portal) */}
      <Modal
        open={open}
        title={editing ? "Update Case Study" : "New Case Study"}
        onClose={() => setOpen(false)}
        onSave={save}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        {/* Basic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="title">Title</label>
            <input
              id="title"
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))}
              placeholder="Luxury Yacht Website"
              required
            />
            {form.title && (
              <p className="mt-1 text-xs text-slate-500">Slug: /{slugify(form.title)}</p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="client">Client</label>
            <input
              id="client"
              className={inputClass}
              value={form.client}
              onChange={(e) => setForm((v) => ({ ...v, client: e.target.value }))}
              placeholder="BlueWave Co."
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="status">Status</label>
            <select
              id="status"
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((v) => ({ ...v, status: e.target.value }))}
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Hero Image</label>
            <ImageUploader buttonText={form.heroImage ? "Change hero" : "Upload hero"} onUploaded={onHeroUploaded} />
          </div>
          {form.heroImage ? (
            <div className="mt-2">
              <img
                src={form.heroImage}
                alt="Hero"
                className="w-full max-h-56 object-cover rounded-xl ring-1 ring-white/10"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded-lg border border-white/15 hover:bg-white/10"
                  onClick={() => setForm((f) => ({ ...f, heroImage: "" }))}
                >
                  Remove
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">og:image will default to Hero if left empty.</p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No hero image yet.</p>
          )}
        </div>

        {/* Gallery */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Gallery</label>
            <div className="flex gap-2 ">
              <ImageUploader buttonText="Add image" onUploaded={onGalleryUploaded} />
              <button type="button" onClick={addEmptyGalleryRow} className={btnGhost}>
                + Add empty
              </button>
            </div>
          </div>

          <div className="space-y-3 mt-2">
            
            {form.gallery.map((g, idx) => (
              <div key={idx} className="grid md:grid-cols-6 gap-2">
                <div className="md:col-span-2">
                  {g.url ? (
                    <img
                      src={g.url}
                      alt={g.alt || `Gallery ${idx + 1}`}
                      className="w-full aspect-video object-cover rounded-xl ring-1 ring-white/10 bg-slate-800"
                    />
                  ) : (
                    <div className="w-full aspect-video rounded-xl bg-slate-800 ring-1 ring-white/10 grid place-items-center text-slate-500 text-xs">
                      No image
                    </div>
                  )}
                </div>
                {/* URL (read-only display for info) */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Image URL</label>
                  <input
                    className={inputClass}
                    value={g.url}
                    onChange={(e) => updateGalleryAt(idx, { url: e.target.value })}
                    placeholder="Uploaded URL appears here"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Alt text</label>
                  <input
                    className={inputClass}
                    value={g.alt}
                    onChange={(e) => updateGalleryAt(idx, { alt: e.target.value })}
                    placeholder="Describe this image"
                  />
                </div>
                <div className="md:col-span-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeGalleryAt(idx)}
                    className="text-xs px-2 py-1 rounded-lg text-rose-200 bg-rose-700/30 hover:bg-rose-700/50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags + OG */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
            <input
              id="tags"
              type="text"
              className={inputClass}
              value={tagsInput}
              onChange={handleTagsChange}
              onBlur={handleTagsBlur}
              placeholder="yacht, booking, ui"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="og">OpenGraph Image URL</label>
            <input
              id="og"
              className={inputClass}
              value={form.ogImage}
              onChange={(e) => setForm((v) => ({ ...v, ogImage: e.target.value }))}
              placeholder="(defaults to hero)"
            />
          </div>
        </div>

        {/* Summary + Content */}
        <div className="mt-6">
          <label className={labelClass} htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            rows={3}
            className={inputClass}
            value={form.summary}
            onChange={(e) => setForm((v) => ({ ...v, summary: e.target.value }))}
            placeholder="Short overview…"
          />
        </div>
        <div className="mt-4">
          <label className={labelClass} htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={8}
            className={inputClass}
            value={form.content}
            onChange={(e) => setForm((v) => ({ ...v, content: e.target.value }))}
            placeholder="Full case study (Markdown/HTML allowed)…"
          />
          <p className="mt-1 text-xs text-slate-500">Reading time is auto-calculated on save.</p>
        </div>

        {/* SEO */}
        <div className="mt-6 border border-white/10 rounded-2xl p-4">
          <p className="text-sm font-medium text-slate-200 mb-3">SEO</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="seoTitle">SEO Title</label>
              <input
                id="seoTitle"
                className={inputClass}
                value={form.seoTitle}
                onChange={(e) => setForm((v) => ({ ...v, seoTitle: e.target.value }))}
                placeholder="Luxury Yacht Website | Ocean Stella"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="canonical">Canonical URL</label>
              <input
                id="canonical"
                className={inputClass}
                value={form.canonicalUrl}
                onChange={(e) => setForm((v) => ({ ...v, canonicalUrl: e.target.value }))}
                placeholder="https://oceanstella.com/case/luxury-yacht"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="seoDesc">SEO Description</label>
            <textarea
              id="seoDesc"
              rows={3}
              className={inputClass}
              value={form.seoDescription}
              onChange={(e) => setForm((v) => ({ ...v, seoDescription: e.target.value }))}
              placeholder="A concise, compelling summary for search and social…"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
