// src/pages/admin/Inquiries.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
const INQ = `${API}/api/v1/inquiries`;
const PRODUCTS = `${API}/api/v1/products/admin/list?limit=100&page=1`;

/* ---------------- styles ---------------- */
const inputClass =
  "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
  "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
const labelClass = "text-sm text-slate-300";
const btnPrimary =
  "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60";
const btnGhost =
  "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

/* ---------------- utils ---------------- */
function fmt(d) {
  if (!d) return "—";
  const x = new Date(d);
  if (isNaN(x)) return "—";
  return x.toISOString().replace("T", " ").slice(0, 16);
}
function previewText(s, n = 80) {
  const t = String(s || "");
  return t.length > n ? t.slice(0, n) + "…" : t;
}

/* ---------------- modal ---------------- */
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
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-md pointer-events-auto flex flex-col max-h-[88vh]">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4 bg-slate-900/95">
            <h2 className="text-lg font-semibold">{title}</h2>
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

/* ---------------- form shape ---------------- */
function emptyForm() {
  return {
    productId: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    quantity: "",
    status: "new", // new | quoted | won | lost
    source: "website",
  };
}

/* =======================================================================
   MAIN
======================================================================== */
export default function Inquiries() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {_id}? | null

  const [form, setForm] = useState(emptyForm());

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadInquiries();
    loadProducts();
  }, []);

  async function loadInquiries() {
    setLoading(true);
    setErr("");
    try {
      // populate=1 to get product name/slug
      const r = await fetch(`${INQ}/admin?limit=100&page=1&populate=1`, { credentials: "include" });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Failed to load inquiries");
      setRows(j.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      const r = await fetch(PRODUCTS, { credentials: "include" });
      const j = await r.json();
      if (j?.ok) setProducts(j.items || []);
    } catch {}
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  }

  function openEdit(i) {
    setEditing({ _id: i._id });
    setForm({
      productId: i.productId?._id || i.productId || "",
      name: i.name || "",
      email: i.email || "",
      phone: i.phone || "",
      subject: i.subject || "",
      message: i.message || "",
      quantity: i.quantity ?? "",
      status: i.status || "new",
      source: i.source || "website",
    });
    setOpen(true);
  }

  async function saveInquiry() {
    if (saving) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Name, Email and Message are required");
      return;
    }
    setSaving(true);
    setErr("");

    const payload = {
      productId: form.productId || null, // optional
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone?.trim() || "",
      subject: form.subject?.trim() || "",
      message: form.message.trim(),
      quantity: form.quantity === "" ? undefined : Number(form.quantity),
      status: form.status,
      source: form.source || "website",
    };

    try {
      if (!editing) {
        const r = await fetch(`${INQ}/admin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
      } else {
        const r = await fetch(`${INQ}/admin/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      }
      setOpen(false);
      await loadInquiries();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeInquiry(i) {
    const ok = window.confirm(`Delete inquiry from “${i.name}”?`);
    if (!ok) return;
    try {
      const r = await fetch(`${INQ}/admin/${i._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Delete failed");
      await loadInquiries();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  const tableRows = useMemo(
    () =>
      (rows || []).map((i) => ({
        ...i,
        _created: fmt(i.createdAt || i.updatedAt),
        _productName: i.productId?.name || i.product?.name || "", // in case BE returns product as 'productId' populated
      })),
    [rows]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Inquiries</h1>
        <button onClick={openCreate} className={btnPrimary}>+ New Inquiry</button>
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
              <th className="px-4 py-3 text-left">From</th>
              <th className="px-4 py-3 text-left">Subject / Preview</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>Loading…</td></tr>
            )}
            {!loading && tableRows.length === 0 && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>No inquiries yet.</td></tr>
            )}
            {!loading && tableRows.map((i) => (
              <tr key={i._id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">
                  {i.name} <span className="text-slate-400">&lt;{i.email}&gt;</span>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {i.subject || previewText(i.message, 50)}
                </td>
                <td className="px-4 py-3">{i._productName || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      i.status === "new"
                        ? "bg-slate-700/40 text-slate-300"
                        : i.status === "quoted"
                        ? "bg-blue-600/30 text-blue-300"
                        : i.status === "won"
                        ? "bg-emerald-600/30 text-emerald-300"
                        : "bg-rose-700/30 text-rose-200"
                    }`}
                  >
                    {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">{i._created}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(i)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      View / Edit
                    </button>
                    <button
                      onClick={() => removeInquiry(i)}
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
        title={editing ? "Update Inquiry" : "New Inquiry"}
        onClose={() => setOpen(false)}
        onSave={saveInquiry}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product (optional) */}
          <div className="md:col-span-2">
            <label className={labelClass}>Product (optional)</label>
            <select
              className={inputClass}
              value={form.productId || ""}
              onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
            >
              <option value="">—</option>
              {products.map((p) => (
                <option key={p._id || p.id} value={p._id}>
                  {p.name || p.title || p.slug}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+971 …"
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="new">New</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Subject (optional)</label>
            <input
              className={inputClass}
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              placeholder="e.g., Pricing details?"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Message</label>
            <textarea
              className={`${inputClass} min-h-[120px]`}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Write the inquiry or internal note…"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Quantity (optional)</label>
            <input
              type="number"
              min="1"
              className={inputClass}
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
              placeholder="1"
            />
          </div>

          <div>
            <label className={labelClass}>Source</label>
            <input
              className={inputClass}
              value={form.source}
              onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
              placeholder="website, landing-page, email…"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
