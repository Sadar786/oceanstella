import { useMemo, useState } from "react";

const ROLES = ["Administrator", "Editor", "Viewer"];

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Administrator",
      active: true,
      avatar: "https://i.pravatar.cc/100?img=5",
      joined: "2025-06-12",
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara@example.com",
      role: "Editor",
      active: true,
      avatar: "https://i.pravatar.cc/100?img=15",
      joined: "2025-07-03",
    },
    {
      id: 3,
      name: "Liam Patel",
      email: "liam@example.com",
      role: "Viewer",
      active: false,
      avatar: "https://i.pravatar.cc/100?img=3",
      joined: "2025-08-01",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null=create
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
    active: true,
    avatar: "",
  });
  const [query, setQuery] = useState("");

  // derived filtered list
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, query]);

  function openCreate() {
    setEditingId(null);
    setForm({ name: "", email: "", role: "Viewer", active: true, avatar: "" });
    setOpen(true);
  }

  function openEdit(u) {
    setEditingId(u.id);
    setForm({
      name: u.name,
      email: u.email,
      role: u.role,
      active: u.active,
      avatar: u.avatar || "",
    });
    setOpen(true);
  }

  function saveUser(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) return;

    if (editingId == null) {
      const u = {
        id: Date.now(),
        ...form,
        joined: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, u]);
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...form } : u))
      );
    }
    setOpen(false);
  }

  function removeUser(id) {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function toggleActive(u) {
    setUsers((prev) =>
      prev.map((x) => (x.id === u.id ? { ...x, active: !x.active } : x))
    );
  }

  const input =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const label = "text-sm text-slate-300";
  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";
  const chip = (ok) =>
    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium " +
    (ok ? "bg-emerald-600/30 text-emerald-300" : "bg-slate-700/40 text-slate-300");

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
            {list.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40">
                {/* user */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="h-10 w-10 rounded-full object-cover bg-slate-800"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-800" />
                    )}
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-slate-500">ID: {u.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">{u.joined}</td>

                {/* status pill + toggle */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={chip(u.active)}>{u.active ? "Active" : "Disabled"}</span>
                    <button
                      onClick={() => toggleActive(u)}
                      className={
                        "relative h-6 w-11 rounded-full transition " +
                        (u.active ? "bg-emerald-500/70" : "bg-slate-700")
                      }
                      title="Toggle active"
                    >
                      <span
                        className={
                          "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition " +
                          (u.active ? "left-6" : "left-1")
                        }
                      />
                    </button>
                  </div>
                </td>

                {/* actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeUser(u.id)}
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

        {list.length === 0 && (
          <div className="p-6 text-center text-slate-400">No users match your search.</div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingId == null ? "Add User" : "Update User"}
            </h2>
            <form onSubmit={saveUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={label} htmlFor="name">Full name</label>
                <input
                  id="name"
                  className={input}
                  value={form.name}
                  onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className={label} htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={input}
                  value={form.email}
                  onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className={label} htmlFor="role">Role</label>
                <select
                  id="role"
                  className={input}
                  value={form.role}
                  onChange={(e) => setForm((v) => ({ ...v, role: e.target.value }))}
                >
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label} htmlFor="avatar">Avatar URL</label>
                <input
                  id="avatar"
                  className={input}
                  placeholder="https://…"
                  value={form.avatar}
                  onChange={(e) => setForm((v) => ({ ...v, avatar: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2">
                <label className={label} htmlFor="active">Active</label>
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

              {form.avatar && (
                <div className="md:col-span-2 rounded-xl border border-white/10 bg-slate-800/40 p-3">
                  <div className="text-xs mb-2 text-slate-400">Avatar preview</div>
                  <img
                    src={form.avatar}
                    alt="avatar preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
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
    </section>
  );
}
