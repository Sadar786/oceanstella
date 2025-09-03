import { useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      stage: "New",
      created: "2025-08-20 14:32",
    },
    {
      id: 2,
      name: "Bob Lee",
      email: "bob@example.com",
      stage: "Contacted",
      created: "2025-08-22 09:10",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", stage: "New" });

  function openCreate() {
    setEditingId(null);
    setForm({ name: "", email: "", stage: "New" });
    setOpen(true);
  }

  function openEdit(lead) {
    setEditingId(lead.id);
    setForm({ name: lead.name, email: lead.email, stage: lead.stage });
    setOpen(true);
  }

  function saveLead(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId == null) {
      const l = {
        id: Date.now(),
        ...form,
        created: new Date().toLocaleString(),
      };
      setLeads((prev) => [...prev, l]);
    } else {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingId ? { ...l, ...form } : l
        )
      );
    }
    setOpen(false);
  }

  function removeLead(id) {
    const ok = window.confirm("Delete this lead?");
    if (!ok) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
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
        <h1 className="text-xl md:text-2xl font-semibold">Leads</h1>
        <button onClick={openCreate} className={btnPrimary}>+ Add Lead</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Stage</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3">{l.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      l.stage === "New"
                        ? "bg-slate-700/40 text-slate-300"
                        : l.stage === "Contacted"
                        ? "bg-blue-600/30 text-blue-300"
                        : "bg-emerald-600/30 text-emerald-300"
                    }`}
                  >
                    {l.stage}
                  </span>
                </td>
                <td className="px-4 py-3">{l.created}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(l)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeLead(l.id)}
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

        {leads.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No leads yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingId == null ? "New Lead" : "Update Lead"}
            </h2>
            <form onSubmit={saveLead} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="name">Name</label>
                <input
                  id="name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e)=>setForm(v=>({...v, name: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e)=>setForm(v=>({...v, email: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="stage">Stage</label>
                <select
                  id="stage"
                  className={inputClass}
                  value={form.stage}
                  onChange={(e)=>setForm(v=>({...v, stage: e.target.value}))}
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Converted</option>
                </select>
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
