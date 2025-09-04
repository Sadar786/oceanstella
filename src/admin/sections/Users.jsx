// src/pages/admin/Users.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ImageUploader from "../../components/ImageUploader";

const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
const USERS = `${API}/api/users`; // matches app.use("/api/users", ...)

const ROLE_UI = ["Administrator", "Editor", "Viewer"];
const roleUiToDb = (r) =>
  ({ Administrator: "admin", Editor: "editor", Viewer: "viewer" }[r] || "viewer");
const roleDbToUi = (r) =>
  ({ superadmin: "Administrator", admin: "Administrator", editor: "Editor", viewer: "Viewer" }[r] ||
    "Viewer");

const input =
  "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
  "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
const label = "text-sm text-slate-300";
const btnPrimary =
  "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60";
const btnGhost =
  "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

const chip = (ok) =>
  "inline-flex rounded-full px-2 py-0.5 text-xs font-medium " +
  (ok ? "bg-emerald-600/30 text-emerald-300" : "bg-slate-700/40 text-slate-300");

function fmtDate(d) {
  if (!d) return "—";
  const x = new Date(d);
  if (isNaN(x)) return "—";
  return x.toISOString().slice(0, 10);
}
function initialsOf(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] || "").toUpperCase();
  const b = (parts[1]?.[0] || "").toUpperCase();
  return (a + b) || "•";
}

/* ---------- Modal (portal + scroll-safe) ---------- */
function Modal({ open, title, onClose, onSave, saving, saveLabel = "Save", children }) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
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

function emptyForm() {
  return {
    name: "",
    email: "",
    role: "Viewer",        // UI label
    active: true,          // maps to status
    avatar: { url: "", publicId: "" }, // device-uploaded image
  };
}

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {_id}? | null

  const [form, setForm] = useState(emptyForm());
  const [query, setQuery] = useState("");

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`${USERS}/admin?limit=100&page=1`, { credentials: "include" });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Failed to load users");
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

  function openEdit(u) {
    setEditing({ _id: u._id });
    setForm({
      name: u.name || "",
      email: u.email || "",
      role: roleDbToUi(u.role),
      active: (u.status || "active") === "active",
      avatar: u.avatar ? { url: u.avatar, publicId: u.avatarPublicId || "" } : { url: "", publicId: "" },
    });
    setOpen(true);
  }

  function onAvatarUploaded(img) {
    setForm((f) => ({ ...f, avatar: { url: img.url, publicId: img.publicId || "" } }));
  }
  function clearAvatar() {
    setForm((f) => ({ ...f, avatar: { url: "", publicId: "" } }));
  }

  async function saveUser() {
    if (saving) return;
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    if (!name || !email) return alert("Name and Email are required");

    setSaving(true);
    setErr("");

    const payload = {
      name,
      email,
      role: roleUiToDb(form.role),
      status: form.active ? "active" : "disabled",
      avatar: form.avatar?.url ? { url: form.avatar.url, publicId: form.avatar.publicId || "" } : null,
    };

    try {
      if (!editing) {
        const r = await fetch(`${USERS}/admin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
      } else {
        const r = await fetch(`${USERS}/admin/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      }
      setOpen(false);
      await loadUsers();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeUser(u) {
    const ok = window.confirm(`Delete user “${u.name}”?`);
    if (!ok) return;
    try {
      const r = await fetch(`${USERS}/admin/${u._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Delete failed");
      await loadUsers();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  async function toggleActive(u) {
    try {
      const toActive = (u.status || "active") !== "active";
      const r = await fetch(`${USERS}/admin/${u._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: toActive ? "active" : "disabled" }),
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Toggle failed");
      await loadUsers();
    } catch (e) {
      alert(e.message || "Toggle failed");
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return (rows || []).filter(
      (u) =>
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        roleDbToUi(u.role).toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Users</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              className={"pl-9 " + input}
              placeholder="Search name, email, role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔎</span>
          </div>
          <button onClick={openCreate} className={btnPrimary}>+ Add User</button>
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
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td className="px-4 py-6 text-slate-400" colSpan={6}>No users found.</td></tr>
            )}
            {!loading && filtered.map((u) => (
              <tr key={u._id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="h-10 w-10 rounded-full object-cover bg-slate-800"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-700 grid place-items-center text-slate-200 text-xs font-semibold">
                        {initialsOf(u.name)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-slate-500">{u._id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{roleDbToUi(u.role)}</td>
                <td className="px-4 py-3">{fmtDate(u.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={chip((u.status || "active") === "active")}>
                      {(u.status || "active") === "active" ? "Active" : "Disabled"}
                    </span>
                    <button
                      onClick={() => toggleActive(u)}
                      className={
                        "relative h-6 w-11 rounded-full transition " +
                        ((u.status || "active") === "active" ? "bg-emerald-500/70" : "bg-slate-700")
                      }
                      title="Toggle active"
                    >
                      <span
                        className={
                          "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition " +
                          ((u.status || "active") === "active" ? "left-6" : "left-1")
                        }
                      />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeUser(u)}
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
        title={editing ? "Update User" : "Add User"}
        onClose={() => setOpen(false)}
        onSave={saveUser}
        saving={saving}
        saveLabel={editing ? "Update" : "Save"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Avatar */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className={label}>Avatar</label>
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
                  className="text-xs px-2 py-1 rounded-lg border border-white/15 hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No avatar yet.</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={label}>Full name</label>
            <input
              className={input}
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={label}>Email</label>
            <input
              type="email"
              className={input}
              value={form.email}
              onChange={(e) => setForm((v) => ({ ...v, email: e.target.value.toLowerCase() }))}
              required
            />
          </div>

          <div>
            <label className={label}>Role</label>
            <select
              className={input}
              value={form.role}
              onChange={(e) => setForm((v) => ({ ...v, role: e.target.value }))}
            >
              {ROLE_UI.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className={label}>Active</label>
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setForm((v) => ({ ...v, active: !v.active }))}
                className={
                  "relative h-6 w-11 rounded-full transition " +
                  (form.active ? "bg-emerald-500/70" : "bg-slate-700")
                }
                title="Toggle active"
              >
                <span
                  className={
                    "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition " +
                    (form.active ? "left-6" : "left-1")
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
