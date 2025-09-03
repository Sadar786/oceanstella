import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploader"; // adjust if your path differs

export default function Profile() {
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "", joined: "", avatar: "" });
  const [pendingImg, setPendingImg] = useState(null); // { url, publicId, ... }
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [err, setErr] = useState("");

  useEffect(() => { fetchMe(); }, []);

  async function fetchMe() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, { credentials: "include" });
      const data = await res.json();
      if (data?.ok) {
        setMe(data.user);
        setForm({
          name: data.user.name || "",
          email: data.user.email || "",
          role: data.user.role || "",
          joined: data.user.createdAt ? new Date(data.user.createdAt).toISOString().slice(0, 10) : "",
          avatar: data.user.avatar || "",
        });
      }
    } catch {}
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("saving"); setErr("");

    try {
      // 1) Save avatar if a new one was uploaded
      if (pendingImg?.url && pendingImg?.publicId) {
        const r1 = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/avatar`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ url: pendingImg.url, publicId: pendingImg.publicId }),
        });
        const j1 = await r1.json();
        if (!r1.ok || !j1?.ok) throw new Error(j1?.error || "Failed to update avatar");
        setForm(v => ({ ...v, avatar: j1.avatar }));
        setPendingImg(null);
      }

      // 2) Save name/email if changed (requires /api/users/me route below)
      const changed = {};
      if (me && form.name !== me.name) changed.name = form.name;
      if (me && form.email !== me.email) changed.email = form.email;
      if (Object.keys(changed).length) {
        const r2 = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(changed),
        });
        const j2 = await r2.json();
        if (!r2.ok || !j2?.ok) throw new Error(j2?.error || "Failed to update profile");
      }

      await fetchMe();
      setStatus("saved"); setTimeout(() => setStatus("idle"), 1500);
    } catch (e2) {
      setErr(e2.message || "Couldn’t save."); setStatus("error");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40";
  const labelClass = "text-sm text-slate-300";

  return (
    <section className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Profile</h1>

      {status === "saved" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-emerald-200">Saved!</div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-2 text-rose-200">{err || "Couldn’t save. Try again."}</div>
      )}

      <div className="max-w-4xl rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        {/* Top: avatar + uploader */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-white/10 pb-6 mb-6">
          <img
            src={pendingImg?.url || form.avatar || "/default-avatar.png"}
            alt="avatar"
            className="h-20 w-20 rounded-full object-cover ring-2 ring-purple-400/40"
          />
          <div className="space-y-3">
            <div className="text-lg font-semibold">{form.name || "—"}</div>
            <div className="text-slate-400 text-sm">{form.email || "—"}</div>
            {form.joined && <div className="text-xs text-slate-500">Joined {form.joined}</div>}

            <ImageUploader
              buttonText={pendingImg ? "Pick a different picture" : "Upload new picture"}
              onUploaded={(img) => setPendingImg(img)}
            />

            {pendingImg && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPendingImg(null)}
                  className="px-3 py-1.5 rounded-xl border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white"
                >
                  Save picture
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass} htmlFor="name">Name</label>
            <input
              id="name"
              className={inputClass}
              value={form.name}
              onChange={(e)=>setForm(v=>({...v, name: e.target.value}))}
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
            />
          </div>

          <div>
            <label className={labelClass}>Role</label>
            <input className={`${inputClass} opacity-70 cursor-not-allowed`} value={form.role} readOnly />
          </div>
          <div>
            <label className={labelClass}>Joined</label>
            <input className={`${inputClass} opacity-70 cursor-not-allowed`} value={form.joined || "—"} readOnly />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={status === "saving"}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow hover:opacity-95 disabled:opacity-60"
            >
              {status === "saving" && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
              )}
              {status === "saving" ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
