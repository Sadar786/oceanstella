// src/pages/admin/Leads.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ImageUploader from "../../components/ImageUploader";

const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
const LEADS = `${API}/api/v1/leads`;

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
  // Example: 2025-08-22 14:30
  return x.toISOString().replace("T", " ").slice(0, 16);
}
function initialsOf(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] || "").toUpperCase();
  const b = (parts[1]?.[0] || "").toUpperCase();
  return (a + b) || "•";
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
            <h2 className="text-lg font-semibold text-light">{title}</h2>
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
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "website",
    status: "new", // new | contacted | converted
    avatar: { url: "", publicId: "" },
  };
}

/* =======================================================================
   MAIN
======================================================================== */
export default function Leads() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {_id}? | null

  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`${LEADS}/admin?limit=100&page=1`, { credentials: "include" });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Failed to load leads");
      setRows(j.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  }

  function openEdit(l) {
    setEditing({ _id: l._id });
    setForm({
      name: l.name || "",
      email: l.email || "",
      phone: l.phone || "",
      message: l.message || "",
      source: l.source || "website",
      status: l.status || "new",
      avatar: l.avatar?.url
        ? { url: l.avatar.url, publicId: l.avatar.publicId || "" }
        : { url: "", publicId: "" },
    });
    setOpen(true);
  }

  // ---------- avatar upload handlers ----------
  function onAvatarUploaded(img) {
    setForm((f) => ({ ...f, avatar: { url: img.url, publicId: img.publicId || "" } }));
  }
  function clearAvatar() {
    setForm((f) => ({ ...f, avatar: { url: "", publicId: "" } }));
  }

  async function saveLead() {
    if (saving) return;
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and Email are required");
      return;
    }

    setSaving(true);
    setErr("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone?.trim() || "",
      message: form.message?.trim() || "",
      source: form.source || "website",
      status: form.status, // new|contacted|converted
      avatar: form.avatar?.url ? { url: form.avatar.url, publicId: form.avatar.publicId || "" } : null,
    };

    try {
      if (!editing) {
        const r = await fetch(`${LEADS}/admin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
      } else {
        const r = await fetch(`${LEADS}/admin/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      }
      setOpen(false);
      await loadLeads();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeLead(l) {
    const ok = window.confirm(`Delete lead “${l.name}”?`);
    if (!ok) return;
    try {
      const r = await fetch(`${LEADS}/admin/${l._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Delete failed");
      await loadLeads();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  const tableRows = useMemo(
    () =>
      (rows || []).map((l) => ({
        ...l,
        _created: fmt(l.createdAt || l.updatedAt),
      })),
    [rows]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Leads</h1>
        <button onClick={openCreate} className={btnPrimary}>+ Add Lead</button>
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
              <th className="px-4 py-3 text-left">Lead</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Stage</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>Loading…</td></tr>
            )}
            {!loading && tableRows.length === 0 && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>No leads yet.</td></tr>
            )}
            {!loading && tableRows.map((l) => (
              <tr key={l._id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {l.avatar?.url ? (
                      <img
                        src={l.avatar.url}
                        alt={l.name}
                        className="h-10 w-10 rounded-full object-cover bg-slate-800 ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-700 grid place-items-center text-slate-200 text-xs font-semibold">
                        {initialsOf(l.name)}
                      </div>
                    )}
                    <div className="font-medium">{l.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{l.email}</td>
                <td className="px-4 py-3">{l.phone || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      l.status === "new"
                        ? "bg-slate-700/40 text-slate-300"
                        : l.status === "contacted"
                        ? "bg-blue-600/30 text-blue-300"
                        : "bg-emerald-600/30 text-emerald-300"
                    }`}
                  >
                    {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">{l._created}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(l)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeLead(l)}
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
        title={editing ? "Update Lead" : "New Lead"}
        onClose={() => setOpen(false)}
        onSave={saveLead}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Avatar */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className={labelClass}>Avatar</label>
              <ImageUploader
                buttonText={form.avatar?.url ? "Change avatar" : "Upload avatar"}
                onUploaded={onAvatarUploaded}
              />
            </div>
            {form.avatar?.url ? (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={form.avatar.url}
                  alt="Avatar"
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                />
                <button
                  type="button"
                  onClick={clearAvatar}
                  className="text-xs text-light px-2 py-1 rounded-lg border border-white/15 hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No avatar yet.</p>
            )}
          </div>

          {/* Basic fields */}
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
            <label className={labelClass}>Stage</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Message / Notes</label>
            <textarea
              className={`${inputClass} min-h-[100px]`}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Lead message or internal notes…"
            />
          </div>

          <div>
            <label className={labelClass}>Source</label>
            <input
              className={inputClass}
              value={form.source}
              onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
              placeholder="website, landing-page, referral…"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
