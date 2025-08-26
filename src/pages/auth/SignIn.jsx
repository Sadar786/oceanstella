import React, { useState } from "react";
import { Card, Label, TextInput, Button, Alert } from "flowbite-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doSignIn } from "../../redux/user/userThunks";

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
      nav(next ? next : "/admin?tab=dashboard", { replace: true });
    } catch (e) {
      setErr(String(e.message || e));
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-4">
      <Card className="w-full max-w-md bg-slate-900/60 border border-white/10">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-slate-400 text-sm">Sign in to Ocean Stella Admin</p>

        {err && <Alert color="failure">{err}</Alert>}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" color="purple" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="text-sm text-slate-400">
          No account?{" "}
          <Link to="/auth/signup" className="text-purple-300 hover:underline">
            Create one
          </Link>
        </div>
      </Card>
    </div>
  );
}
