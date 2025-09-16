// src/lib/api.js

const BASE = import.meta.env.VITE_API_URL || "";

/**
 * Core API caller
 */
export async function api(path, { method = "GET", body, headers, ...rest } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include", // send httpOnly cookies
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
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

/**
 * Build query string
 */
export function qs(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

/**
 * Like api(), but swallows 404 and returns null
 * Useful for optional/public resources on Home page
 */
export async function apiMaybe(path, init) {
  try {
    return await api(path, init);
  } catch (e) {
    if (String(e?.message || "").includes("HTTP 404")) return null;
    throw e;
  }
}

/**
 * Shorthand for GET
 */
export const apiGet = (path, params) => api(`${path}${qs(params)}`);
