import { useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    siteName: "Ocean Stella",
    tagline: "Boat services made simple",
    logoUrl: "https://picsum.photos/seed/oceanlogo/120/120",
    theme: "dark",
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000",
    emailFrom: "noreply@oceanstella.com",
  });
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error

  function saveSettings(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      // in real app -> call backend here
      localStorage.setItem("ocean_settings", JSON.stringify(form));
      setTimeout(() => setStatus("saved"), 600);
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  const input =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const label = "text-sm text-slate-300";
  const btnPrimary =
    "rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95";
  const btnGhost =
    "rounded-xl border border-white/20 px-3 py-2 text-slate-300 hover:bg-white/10";

  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl md:text-2xl font-semibold">Settings</h1>

      {status === "saved" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-emerald-200">
          Saved!
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-2 text-rose-200">
          Error saving.
        </div>
      )}

      <form onSubmit={saveSettings} className="space-y-8">
        {/* General */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="font-medium text-slate-200">General</h2>
          <div>
            <label className={label} htmlFor="siteName">Site Name</label>
            <input
              id="siteName"
              className={input}
              value={form.siteName}
              onChange={(e)=>setForm(v=>({...v, siteName: e.target.value}))}
            />
          </div>
          <div>
            <label className={label} htmlFor="tagline">Tagline</label>
            <input
              id="tagline"
              className={input}
              value={form.tagline}
              onChange={(e)=>setForm(v=>({...v, tagline: e.target.value}))}
            />
          </div>
          <div>
            <label className={label} htmlFor="logoUrl">Logo URL</label>
            <input
              id="logoUrl"
              className={input}
              value={form.logoUrl}
              onChange={(e)=>setForm(v=>({...v, logoUrl: e.target.value}))}
            />
            {form.logoUrl && (
              <img src={form.logoUrl} alt="logo" className="mt-3 h-16 w-16 rounded-lg object-cover" />
            )}
          </div>
        </div>

        {/* Appearance */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="font-medium text-slate-200">Appearance</h2>
          <div>
            <label className={label} htmlFor="theme">Theme</label>
            <select
              id="theme"
              className={input}
              value={form.theme}
              onChange={(e)=>setForm(v=>({...v, theme: e.target.value}))}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* System */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="font-medium text-slate-200">System</h2>
          <div>
            <label className={label} htmlFor="apiUrl">API Base URL</label>
            <input
              id="apiUrl"
              className={input}
              value={form.apiUrl}
              onChange={(e)=>setForm(v=>({...v, apiUrl: e.target.value}))}
            />
          </div>
          <div>
            <label className={label} htmlFor="emailFrom">Email From</label>
            <input
              id="emailFrom"
              className={input}
              value={form.emailFrom}
              onChange={(e)=>setForm(v=>({...v, emailFrom: e.target.value}))}
            />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={()=>setForm(JSON.parse(localStorage.getItem("ocean_settings") || "{}"))} className={btnGhost}>
            Reset
          </button>
          <button type="submit" className={btnPrimary} disabled={status==="saving"}>
            {status==="saving" ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
