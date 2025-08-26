// src/components/AuthInit.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMe } from "../redux/user/userThunks";

export default function AuthInit({ children }) {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.user.loading);
  const tried = useSelector((s) => s.user.error !== null || s.user.currentUser !== null);

  useEffect(() => { dispatch(initMe()); }, [dispatch]);

  // optional: show a tiny splash only on first load
  if (loading && !tried) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-200">
        <div className="animate-pulse">Loading…</div>
      </div>
    );
  }
  return children;
}
