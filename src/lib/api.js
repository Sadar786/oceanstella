// src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || "";

export async function api(path, { method = "GET", body, headers, ...rest } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include",               // ← send httpOnly cookies
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  }
  return data;
}
