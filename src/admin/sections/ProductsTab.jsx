// src/pages/admin/ProductTab.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ImageUploader from "../../components/ImageUploader"; // adjust if needed

const API = import.meta.env.VITE_API_URL;

/* ---------------- Utils & UI classes ---------------- */
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
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
    document.body.style.overflow = "hidden"; // lock background
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
      <div className="absolute inset-0 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
        {/* Modal card */}
        <div className="pointer-events-auto relative mx-auto flex max-h-[88vh] w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-md">
          {/* Header (sticky) */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-900/95 px-6 py-4">
            <h2 className="text-lg font-semibold text-light">{title}</h2>
            <div className="flex gap-2">
              <button onClick={onClose} className={btnGhost}>
                Close
              </button>
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

/* ---------------- Main Tab ---------------- */
export default function ProductTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null); // { _id, slug } | null
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm());

  // tags input raw text (kept separate from array)
  const [tagsInput, setTagsInput] = useState((form.tags || []).join(","));

  // keep tagsInput in sync if form.tags changes
  useEffect(() => {
    setTagsInput((form.tags || []).join(","));
  }, [form.tags]);

  function parseTagsInput(str) {
    return String(str || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // only update text while typing
  function handleTagsChange(e) {
    setTagsInput(e.target.value);
  }
  // parse & write to form on blur/submit
  function handleTagsBlur() {
    setField("tags", parseTagsInput(tagsInput));
  }

  function emptyForm() {
    return {
      name: "",
      slug: "",
      sku: "",
      status: "draft",
      categoryId: "",
      images: [], // [{url, publicId}]
      summary: "",
      description: "",
      specs: [], // [{key,value}]
      price: "",
      currency: "AED",
      tags: [],
      featured: false,
      sortOrder: 0,
      seo: { title: "", description: "", ogImage: "" },
      publishedAt: "",
    };
  }

  const primaryImage = useMemo(() => form.images?.[0]?.url || "", [form.images]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/v1/products/admin/list?limit=100&page=1`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.ok) setItems(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch(`${API}/api/v1/categories`, { credentials: "include" });
      const data = await res.json();
      setCategories(data?.items || data?.categories || []);
    } catch (e) {
      console.error(e);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  }

  async function openEditBySlug(slug) {
    try {
      const res = await fetch(`${API}/api/v1/products/admin/by-slug/${encodeURIComponent(slug)}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data?.ok || !data?.item) throw new Error(data?.error || "Not found");
      const p = data.item;
      setEditing({ _id: p._id, slug: p.slug });
      setForm({
        name: p.name || "",
        slug: p.slug || "",
        sku: p.sku || "",
        status: p.status || "draft",
        categoryId: p.categoryId || "",
        images: Array.isArray(p.images) ? p.images : [],
        summary: p.summary || "",
        description: p.description || "",
        specs: Array.isArray(p.specs) ? p.specs : [],
        price: p.price ?? "",
        currency: p.currency || "AED",
        tags: Array.isArray(p.tags) ? p.tags : [],
        featured: !!p.featured,
        sortOrder: p.sortOrder || 0,
        seo: {
          title: p.seo?.title || "",
          description: p.seo?.description || "",
          ogImage: p.seo?.ogImage || "",
        },
        publishedAt: p.publishedAt ? String(p.publishedAt).slice(0, 10) : "",
      });
      setOpen(true);
    } catch (e) {
      console.error(e);
      alert(e.message || "Could not load product");
    }
  }

  function setField(key, val) {
    setForm((v) => ({ ...v, [key]: val }));
  }
  function setSeoField(k, v) {
    setForm((f) => ({ ...f, seo: { ...f.seo, [k]: v } }));
  }

  /* ---------------- Specs helpers (Quick Specs) ---------------- */
  function getSpecValue(key) {
    return (form.specs || []).find((s) => s.key?.toLowerCase() === key.toLowerCase())?.value || "";
  }
  function setSpecValue(key, value) {
    setForm((f) => {
      const specs = [...(f.specs || [])];
      const idx = specs.findIndex((s) => s.key?.toLowerCase() === key.toLowerCase());
      if (value === "") {
        if (idx !== -1) specs.splice(idx, 1);
      } else if (idx === -1) {
        specs.push({ key, value });
      } else {
        specs[idx] = { ...specs[idx], value };
      }
      return { ...f, specs };
    });
  }

  // Specs repeater controls
  function addSpec() {
    setForm((f) => ({ ...f, specs: [...(f.specs || []), { key: "", value: "" }] }));
  }
  function updateSpec(i, patch) {
    setForm((f) => {
      const next = [...(f.specs || [])];
      next[i] = { ...next[i], ...patch };
      return { ...f, specs: next };
    });
  }
  function removeSpec(i) {
    setForm((f) => ({ ...f, specs: (f.specs || []).filter((_, idx) => idx !== i) }));
  }

  // Images
  function onUploaded(img) {
    setForm((f) => ({
      ...f,
      images: [...(f.images || []), { url: img.url, publicId: img.publicId }],
    }));
    if (!form.seo.ogImage) setSeoField("ogImage", img.url);
  }
  async function removeImageAt(index) {
    const img = form.images[index];
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
    if (editing?._id && img?.publicId) {
      try {
        await fetch(
          `${API}/api/v1/products/${editing._id}/images/${encodeURIComponent(img.publicId)}`,
          { method: "DELETE", credentials: "include" }
        );
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function save() {
    if (saving) return;
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).trim(),
      sku: form.sku.trim(),
      status: form.status,
      categoryId: form.categoryId || null,
      summary: form.summary,
      description: form.description,
      specs: (form.specs || []).filter((s) => s.key?.trim() || s.value?.trim()),
      price: form.price === "" ? null : Number(form.price),
      currency: form.currency,
      tags: form.tags,
      featured: !!form.featured,
      sortOrder: Number(form.sortOrder) || 0,
      seo: {
        title: form.seo.title,
        description: form.seo.description,
        ogImage: form.seo.ogImage,
      },
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
    };

    try {
      let productId = editing?._id;

      if (!productId) {
        // CREATE
        const r = await fetch(`${API}/api/v1/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
        productId = j.item._id;
      } else {
        // UPDATE (non-image fields)
        const r = await fetch(`${API}/api/v1/products/${productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      }

      // IMAGES: sync current array
      if (productId) {
        const r2 = await fetch(`${API}/api/v1/products/${productId}/images`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ images: form.images }),
        });
        const j2 = await r2.json();
        if (!r2.ok || !j2?.ok) throw new Error(j2?.error || "Images update failed");
      }

      setOpen(false);
      await loadProducts();
    } catch (e1) {
      console.error(e1);
      alert(e1.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(p) {
    const ok = window.confirm(`Delete “${p.name}”?`);
    if (!ok) return;
    try {
      await fetch(`${API}/api/v1/products/${p._id || p.slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      await loadProducts();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Products</h1>
        <button onClick={openCreate} className={btnPrimary}>
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {!loading &&
              items.map((p) => (
                <tr key={p.slug} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="h-16 w-16 rounded-lg object-cover bg-slate-800"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-slate-800" />
                      )}
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {p.price != null ? `${p.currency || "AED"} ${Number(p.price).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3">{p.publishedAt ? p.publishedAt.slice(0, 10) : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditBySlug(p.slug)}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p)}
                        className="rounded-lg bg-rose-700/30 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-700/50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal via Portal */}
      <Modal
        open={open}
        title={editing ? "Update Product" : "New Product"}
        onClose={() => setOpen(false)}
        onSave={save}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        {/* Basic */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setField("name", name);
                if (!editing) setField("slug", slugify(name));
              }}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => setField("slug", slugify(e.target.value))}
              required
            />
          </div>
          <div>
            <label className={labelClass}>SKU</label>
            <input className={inputClass} value={form.sku} onChange={(e) => setField("sku", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select className={inputClass} value={form.status} onChange={(e) => setField("status", e.target.value)}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              value={form.categoryId || ""}
              onChange={(e) => setField("categoryId", e.target.value)}
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c._id || c.id || c.slug} value={c._id || ""}>
                  {c.name || c.title || c.slug}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Published At</label>
            <input
              type="date"
              className={inputClass}
              value={form.publishedAt || ""}
              onChange={(e) => setField("publishedAt", e.target.value)}
            />
          </div>
        </div>

        {/* Images */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-slate-50">
            <label className={labelClass}>Images</label>
            <ImageUploader buttonText="Add image" onUploaded={onUploaded} />
          </div>
          {form.images?.length ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {form.images.map((img, i) => (
                <div key={img.publicId || img.url + i} className="group relative">
                  <img
                    src={img.url}
                    alt=""
                    className="aspect-square w-full rounded-xl object-cover ring-1 ring-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageAt(i)}
                    className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-400">No images yet.</div>
          )}
        </div>

        {/* Summary + Description */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Summary</label>
            <textarea
              className={`${inputClass} min-h-[80px]`}
              value={form.summary}
              onChange={(e) => setField("summary", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              className={`${inputClass} min-h-[80px]`}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>
        </div>

        {/* Price, currency, featured, sortOrder */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Price</label>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <select
              className={inputClass}
              value={form.currency}
              onChange={(e) => setField("currency", e.target.value)}
            >
              <option>AED</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input
              id="featured"
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setField("featured", e.target.checked)}
            />
            <label htmlFor="featured" className={labelClass}>
              Featured
            </label>
          </div>
          <div>
            <label className={labelClass}>Sort Order</label>
            <input
              type="number"
              className={inputClass}
              value={form.sortOrder}
              onChange={(e) => setField("sortOrder", e.target.value)}
            />
          </div>
        </div>

        {/* Quick Specs (writes into form.specs) */}
        <div className="mt-6">
          <h3 className="mb-2 font-medium text-slate-200">Quick Specs</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className={labelClass}>Length</label>
              <input
                className={inputClass}
                placeholder="e.g. 32 ft"
                value={getSpecValue("length")}
                onChange={(e) => setSpecValue("length", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Beam</label>
              <input
                className={inputClass}
                placeholder="e.g. 10.5 ft"
                value={getSpecValue("beam")}
                onChange={(e) => setSpecValue("beam", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Max Speed</label>
              <input
                className={inputClass}
                placeholder="e.g. 40 kn"
                value={getSpecValue("speed")}
                onChange={(e) => setSpecValue("speed", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Seats</label>
              <input
                className={inputClass}
                placeholder="e.g. 8"
                value={getSpecValue("seats")}
                onChange={(e) => setSpecValue("seats", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Specs (dynamic list) */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Specs</label>
            <button type="button" onClick={addSpec} className={btnGhost}>
              + Add Spec
            </button>
          </div>
          {(form.specs || []).length === 0 ? (
            <div className="mt-2 text-sm text-slate-400">No specs yet.</div>
          ) : (
            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
              {form.specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder="Key"
                    className={inputClass}
                    value={s.key}
                    onChange={(e) => updateSpec(i, { key: e.target.value })}
                  />
                  <input
                    placeholder="Value"
                    className={inputClass}
                    value={s.value}
                    onChange={(e) => updateSpec(i, { value: e.target.value })}
                  />
                  <button type="button" onClick={() => removeSpec(i)} className={btnGhost}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
            onChange={handleTagsChange}
            onBlur={handleTagsBlur}
          />
        </div>
      </Modal>
    </section>
  );
}
