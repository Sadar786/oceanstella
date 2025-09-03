import { useState } from "react";

export default function CaseStudies() {
  const [cases, setCases] = useState([
    {
      id: 1,
      title: "Luxury Yacht Website",
      client: "BlueWave Co.",
      status: "Published",
      date: "2025-07-20",
    },
    {
      id: 2,
      title: "Fishing Boat Booking App",
      client: "HarborX",
      status: "Draft",
      date: "2025-08-01",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", client: "", status: "Draft" });

  function openCreate() {
    setEditingId(null);
    setForm({ title: "", client: "", status: "Draft" });
    setOpen(true);
  }

  function openEdit(cs) {
    setEditingId(cs.id);
    setForm({ title: cs.title, client: cs.client, status: cs.status });
    setOpen(true);
  }

  function saveCase(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId == null) {
      const cs = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split("T")[0],
      };
      setCases((prev) => [...prev, cs]);
    } else {
      setCases((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, ...form } : c
        )
      );
    }
    setOpen(false);
  }

  function removeCase(id) {
    const ok = window.confirm("Delete this case study?");
    if (!ok) return;
    setCases((prev) => prev.filter((c) => c.id !== id));
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
        <h1 className="text-xl md:text-2xl font-semibold">Case Studies</h1>
        <button onClick={openCreate} className={btnPrimary}>+ Add Case Study</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3">{c.client}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.status === "Published"
                        ? "bg-emerald-600/30 text-emerald-300"
                        : "bg-slate-700/40 text-slate-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">{c.date}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeCase(c.id)}
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

        {cases.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No case studies yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingId == null ? "New Case Study" : "Update Case Study"}
            </h2>
            <form onSubmit={saveCase} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input
                  id="title"
                  className={inputClass}
                  value={form.title}
                  onChange={(e)=>setForm(v=>({...v, title: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="client">Client</label>
                <input
                  id="client"
                  className={inputClass}
                  value={form.client}
                  onChange={(e)=>setForm(v=>({...v, client: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="status">Status</label>
                <select
                  id="status"
                  className={inputClass}
                  value={form.status}
                  onChange={(e)=>setForm(v=>({...v, status: e.target.value}))}
                >
                  <option>Draft</option>
                  <option>Published</option>
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
