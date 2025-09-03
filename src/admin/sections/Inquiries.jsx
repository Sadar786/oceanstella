import { useState } from "react";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "Charlie P.",
      email: "charlie@example.com",
      subject: "Pricing details?",
      message: "Hello, could you share more about the pricing plans for custom boat designs?",
      created: "2025-08-21 11:00",
    },
    {
      id: 2,
      name: "Diana K.",
      email: "diana@example.com",
      subject: "Partnership proposal",
      message: "We’d like to discuss a partnership opportunity with Ocean Stella.",
      created: "2025-08-25 16:30",
    },
  ]);

  const [viewing, setViewing] = useState(null);

  function removeInquiry(id) {
    const ok = window.confirm("Delete this inquiry?");
    if (!ok) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-95";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10";

  return (
    <section className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Inquiries</h1>
      <p className="text-slate-400">Messages from contact forms and customers.</p>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">From</th>
              <th className="px-4 py-3 text-left">Subject / Preview</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {inquiries.map((i) => (
              <tr key={i.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium">
                  {i.name} <span className="text-slate-400">&lt;{i.email}&gt;</span>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {i.subject || i.message.slice(0, 50) + "..."}
                </td>
                <td className="px-4 py-3">{i.created}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setViewing(i)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeInquiry(i.id)}
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

        {inquiries.length === 0 && (
          <div className="p-6 text-center text-slate-400">No inquiries yet.</div>
        )}
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Inquiry from {viewing.name}</h2>
            <p className="text-sm text-slate-400 mb-2">
              <span className="font-medium text-slate-200">{viewing.email}</span> · {viewing.created}
            </p>
            <h3 className="font-medium mb-2">{viewing.subject}</h3>
            <p className="whitespace-pre-line text-slate-200">{viewing.message}</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setViewing(null)} className={btnGhost}>
                Close
              </button>
              <button
                onClick={() => {
                  removeInquiry(viewing.id);
                  setViewing(null);
                }}
                className={btnPrimary + " bg-rose-600/70 from-rose-500 to-rose-500"}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
