import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || ""; // "" works if you proxy in dev

export default function VerifyEmail() {
  const nav = useNavigate();
  const loc = useLocation();

  // ✅ Safe query reading + decoding
  const presetEmail = useMemo(() => {
    const params = new URLSearchParams(loc.search);
    const raw = params.get("email") || "";
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }, [loc.search]);

  const [email, setEmail] = useState(presetEmail);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ If user opens another link with different ?email=..., update the field
  useEffect(() => {
    if (presetEmail && presetEmail !== email) setEmail(presetEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetEmail]);

  async function verify(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      const r = await fetch(`${API_BASE}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || data.message || "Verification failed");

      setMsg("Email verified ✅");
      
      setTimeout(() => {
        nav("/profile", { replace: true });
      }, 1500);

    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      const r = await fetch(`${API_BASE}/api/v1/auth/resend-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || data.message || "Resend failed");

      setMsg("New code sent.");
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-white/10 p-6 shadow-lg backdrop-blur">
      
        <h1 className="text-xl font-semibold">Verify your email</h1>

        <p className="text-slate-400 text-sm">Enter the 6-digit code we sent.</p>

        {err && (
          <div className="mt-3 rounded-lg border border-red-400/40 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
            {err}
          </div>
        )}
        {msg && (
          <div className="mt-3 rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 px-3 py-2 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={verify} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              inputMode="numeric"
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2"
              placeholder="123456"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Verify"}
          </button>

          <button
            type="button"
            onClick={resend}
            disabled={loading}
            className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-4 py-2 text-slate-100 disabled:opacity-60"
          >
            Resend code
          </button>
        </form>
      </div>
    </div>
  );
}
