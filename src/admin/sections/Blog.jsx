// src/pages/admin/BlogAdmin.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ImageUploader from "../../components/ImageUploader";

const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
const BLOG = `${API}/api/v1/blog`;

/* utils */
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function fmtDate(d) {
  if (!d) return "—";
  const dd = new Date(d);
  return isNaN(dd) ? "—" : dd.toISOString().slice(0, 10);
}
function joinTags(arr) {
  return (arr || []).join(", ");
}
function splitTags(s) {
  return String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/* styles */
const inputClass =
  "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
  "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
const labelClass = "text-sm text-slate-300";
const btnPrimary =
  "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60";
const btnGhost =
  "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

/* modal */
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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain">
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-md pointer-events-auto flex flex-col max-h-[88vh]">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4 bg-slate-900/95">
            <h2 className="text-lg text-light font-semibold">{title}</h2>
            <div className="flex gap-2">
              <button onClick={onClose} className={btnGhost}>Close</button>
              <button onClick={onSave} disabled={saving} className={btnPrimary}>
                {saving ? "Saving…" : saveLabel}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* form shapes */
function emptyPost() {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: [],
    status: "draft", // draft | published | archived
    publishedAt: "",
    seo: { title: "", description: "", ogImage: "" },
  };
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {_id, slug}? | null

  const [form, setForm] = useState(emptyPost());
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => setTagsInput(joinTags(form.tags)), [form.tags]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    setErr("");
    try {
      // NEW: admin list endpoint (see backend)
      const res = await fetch(`${BLOG}/admin/posts?limit=100&page=1`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to load posts");
      setPosts(data.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyPost());
    setOpen(true);
  }
  function openEdit(p) {
    setEditing({ _id: p._id, slug: p.slug });
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      excerpt: p.excerpt || "",
      content: p.content || "",
      coverImage: p.coverImage || "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      status: p.status || "draft",
      publishedAt: p.publishedAt ? String(p.publishedAt).slice(0, 10) : "",
      seo: {
        title: p.seo?.title || "",
        description: p.seo?.description || "",
        ogImage: p.seo?.ogImage || "",
      },
    });
    setOpen(true);
  }

  function onCoverUploaded(img) {
    setForm((f) => ({
      ...f,
      coverImage: img.url,
      seo: { ...f.seo, ogImage: f.seo.ogImage || img.url },
    }));
  }

  async function savePost() {
    if (saving) return;
    if (!form.title.trim()) return alert("Title is required");
    if (!form.content || form.content.trim().length < 20)
      return alert("Content must be at least 20 characters.");

    setSaving(true);
    setErr("");

    const payload = {
      title: form.title.trim(),
      slug: (form.slug || slugify(form.title)).trim(),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      tags: form.tags,
      status: form.status,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
      seo: {
        title: form.seo?.title || "",
        description: form.seo?.description || "",
        ogImage: form.seo?.ogImage || form.coverImage || "",
      },
    };

    try {
      if (!editing) {
        const r = await fetch(`${BLOG}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
      } else {
        const r = await fetch(`${BLOG}/posts/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      }

      setOpen(false);
      await loadPosts();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removePost(p) {
    const ok = window.confirm(`Delete “${p.title}”?`);
    if (!ok) return;
    try {
      const r = await fetch(`${BLOG}/posts/${p._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Delete failed");
      await loadPosts();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  function handleTagsChange(e) {
    setTagsInput(e.target.value);
  }
  function handleTagsBlur() {
    setForm((f) => ({ ...f, tags: splitTags(tagsInput) }));
  }

  const rows = useMemo(
    () =>
      (posts || []).map((p) => ({
        ...p,
        _status: String(p.status || "").toLowerCase(),
        _date: fmtDate(p.publishedAt || p.updatedAt || p.createdAt),
      })),
    [posts]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Blog Posts</h1>
        <button onClick={openCreate} className={btnPrimary}>+ New Post</button>
      </div>

      {err && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Post</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Read</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={5}>Loading…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={5}>No posts yet.</td></tr>
            )}
            {!loading && rows.map((p) => (
              <tr key={p._id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-16 w-16 rounded-lg object-cover bg-slate-800"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-slate-800" />
                    )}
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-slate-400">{p.slug}</div>
                      {p.excerpt && (
                        <div className="text-xs text-slate-400 line-clamp-1">{p.excerpt}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      p._status === "published"
                        ? "bg-emerald-600/30 text-emerald-300"
                        : p._status === "archived"
                        ? "bg-amber-600/30 text-amber-300"
                        : "bg-slate-700/40 text-slate-300"
                    }`}
                  >
                    {p._status.charAt(0).toUpperCase() + p._status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">{p.readingTime || 1} min</td>
                <td className="px-4 py-3">{p._date}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removePost(p)}
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

      {/* Modal */}
      <Modal
        open={open}
        title={editing ? "Update Post" : "New Post"}
        onClose={() => setOpen(false)}
        onSave={savePost}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        {/* Basic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({
                  ...f,
                  title,
                  slug: editing ? f.slug : slugify(title),
                }));
              }}
              required
            />
            {form.title && (
              <p className="mt-1 text-xs text-slate-500">Slug: /blog/{slugify(form.title)}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Excerpt</label>
            <textarea
              className={`${inputClass} min-h-[70px]`}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="Short summary for cards/social…"
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Published At</label>
            <input
              type="date"
              className={inputClass}
              value={form.publishedAt || ""}
              onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
            />
            <p className="mt-1 text-xs text-slate-500">If empty, backend sets when publishing.</p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Cover Image</label>
            <ImageUploader
              buttonText={form.coverImage ? "Change cover" : "Upload cover"}
              onUploaded={onCoverUploaded}
            />
          </div>
          {form.coverImage ? (
            <div className="mt-2">
              <img
                src={form.coverImage}
                alt="Cover"
                className="w-full max-h-56 object-cover rounded-xl ring-1 ring-white/10"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded-lg border border-white/15 hover:bg-white/10"
                  onClick={() => setForm((f) => ({ ...f, coverImage: "" }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No cover image yet.</p>
          )}
        </div>

        {/* Tags */}
        <div className="mt-6">
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            className={inputClass}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onBlur={() => setForm((f) => ({ ...f, tags: splitTags(tagsInput) }))}
            placeholder="seo, boats, maintenance"
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          <label className={labelClass}>Content</label>
          <textarea
            className={`${inputClass} min-h-[200px]`}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="Write your post (Markdown/HTML allowed)…"
          />
          <p className="mt-1 text-xs text-slate-500">Reading time auto-calculated on backend.</p>
        </div>

        {/* SEO */}
        <div className="mt-6 border border-white/10 rounded-2xl p-4">
          <p className="text-sm font-medium text-slate-200 mb-3">SEO</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>SEO Title</label>
              <input
                className={inputClass}
                value={form.seo.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, seo: { ...f.seo, title: e.target.value } }))
                }
                placeholder="Ocean Stella Blog — Post Title"
              />
            </div>
            <div>
              <label className={labelClass}>OG Image</label>
              <input
                className={inputClass}
                value={form.seo.ogImage}
                onChange={(e) =>
                  setForm((f) => ({ ...f, seo: { ...f.seo, ogImage: e.target.value } }))
                }
                placeholder="(defaults to cover)"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>SEO Description</label>
            <textarea
              className={inputClass}
              rows={3}
              value={form.seo.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, seo: { ...f.seo, description: e.target.value } }))
              }
              placeholder="Short compelling summary for search/social…"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
