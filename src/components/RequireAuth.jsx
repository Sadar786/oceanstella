// src/components/RequireAuth.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const user = useSelector((s) => s.user.currentUser);
  const loc = useLocation();
  if (!user) {
    const next = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/auth/login?next=${next}`} replace />;
  }
  return children;
}
