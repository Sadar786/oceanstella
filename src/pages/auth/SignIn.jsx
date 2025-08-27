import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doSignIn } from "../../redux/user/userThunks";
import OAuthGoogle from "../../components/auth/OAuthGoogle"; // re-use the Tailwind button you made

export default function SignIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [sp] = useSearchParams();

  const loading = useSelector((s) => s.user.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await dispatch(doSignIn(email, password));
      const next = sp.get("next");
      nav(next ? next : "/", { replace: true });
    } catch (e) {
      setErr(String(e.message || e));
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-white/10 p-6 shadow-lg backdrop-blur">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-slate-400 text-sm">Sign in to Ocean Stella Admin</p>

        {err && (
          <div className="mt-3 rounded-lg border border-red-400/40 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-purple-500 active:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-400">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google OAuth button (Tailwind) */}
        <OAuthGoogle />

        <div className="mt-4 text-sm text-slate-400">
          No account?{" "}
          <Link to="/auth/signup" className="text-purple-300 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
