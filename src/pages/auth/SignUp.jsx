import React, { useState } from "react";
import { Card, Label, TextInput, Button, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doSignUp } from "../../redux/user/userThunks";

export default function SignUp() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const loading = useSelector((s) => s.user.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await dispatch(doSignUp(name, email, password));
      nav("/admin?tab=dashboard", { replace: true });
    } catch (e) {
      setErr(String(e.message || e));
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-4">
      <Card className="w-full max-w-md bg-slate-900/60 border border-white/10">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="text-slate-400 text-sm">Join the Ocean Stella Admin</p>

        {err && <Alert color="failure">{err}</Alert>}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="name" value="Full name" />
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password (min 8 chars)" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <Button type="submit" color="purple" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>

        <div className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-purple-300 hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
