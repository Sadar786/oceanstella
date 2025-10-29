// src/pages/admin/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

/* -------------------- helpers -------------------- */
async function fetchJSON(url, signal) {
  const res = await fetch(url, { credentials: "include", signal });
  let payload = null;
  try { payload = await res.json(); } catch {}
  if (!res.ok) {
    const msg = (payload && (payload.error || payload.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return payload;
}

function normalizeList(payload) {
  if (!payload) return { items: [], total: 0 };
  if (Array.isArray(payload)) return { items: payload, total: payload.length };
  if (payload.items && Array.isArray(payload.items)) {
    return { items: payload.items, total: payload.total ?? payload.items.length };
  }
  if (payload.data) {
    if (Array.isArray(payload.data)) return { items: payload.data, total: payload.data.length };
    if (payload.data.items && Array.isArray(payload.data.items)) {
      return { items: payload.data.items, total: payload.data.total ?? payload.data.items.length };
    }
  }
  if (payload.products && Array.isArray(payload.products)) {
    return { items: payload.products, total: payload.count ?? payload.products.length };
  }
  return { items: [], total: 0 };
}

function getProductImage(p) {
  return (
    p?.images?.[0]?.url ||
    p?.images?.[0]?.secure_url ||
    p?.thumbnail ||
    p?.cover ||
    ""
  );
}

/* -------------------- page -------------------- */
export default function DashboardHome() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [products, setProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [postsTotal, setPostsTotal] = useState(0);
  const [caseStudiesTotal, setCaseStudiesTotal] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setErr("");
        setLoading(true);

        // ✅ Use ADMIN list for dashboard (includes draft/published/archived)
        const productsUrl = `${API}/api/v1/products/admin/list?limit=5&page=1&status=all`;
        const pRaw = await fetchJSON(productsUrl, ctrl.signal);
        const pNorm = normalizeList(pRaw);
        setProducts(pNorm.items || []);
        setProductsTotal(pNorm.total || 0);

        // Blog posts (adjust if you also have an admin route)
        const bRaw = await fetchJSON(`${API}/api/v1/blog/posts?limit=1&page=1`, ctrl.signal);
        const bNorm = normalizeList(bRaw);
        setPostsTotal(bNorm.total || 0);

        // Case studies
        const cRaw = await fetchJSON(`${API}/api/v1/case-studies`, ctrl.signal);
        const cNorm = normalizeList(cRaw);
        setCaseStudiesTotal((cNorm.items || []).length);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErr(`Dashboard data error: ${e.message}`);
          setProducts([]); setProductsTotal(0); setPostsTotal(0); setCaseStudiesTotal(0);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [API]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">O Stella Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPI title="Total Products" value={loading ? "…" : productsTotal} sub="All statuses" />
        <KPI title="Blog Posts" value={loading ? "…" : postsTotal} sub="Published" />
        <KPI title="Case Studies" value={loading ? "…" : caseStudiesTotal} sub="Published" />
        <KPI title="Employees" value={1} sub="Seed user" />
      </div>

      {err && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </div>
      )}

      {/* Recent section grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Orders card */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Recent Orders</h2>
            <Button onClick={() => nav("/admin?tab=orders")}>See all</Button>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Orders module coming after Auth &amp; Admin APIs.
          </p>
        </Card>

        {/* Products table */}
        <Card className="overflow-x-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Recent products</h2>
            <Button onClick={() => nav("/admin?tab=products")}>See all</Button>
          </div>

          {loading ? (
            <Skeleton rows={4} />
          ) : products.length === 0 ? (
            <p className="text-sm text-slate-400 mt-3">No products yet.</p>
          ) : (
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr>
                  <Th>Product</Th>
                  <Th>Tags</Th>
                  <Th>Published</Th>
                </tr>
              </thead>
              <tbody className="[&>tr:not(:first-child)]:border-t [&>tr:not(:first-child)]:border-white/10">
                {products.map((p) => {
                  const img = getProductImage(p);
                  const when =
                    p.publishedAt ||
                    p.updatedAt ||
                    p.createdAt ||
                    null;
                  return (
                    <tr key={p.slug || p._id || p.id} className="bg-slate-900/60">
                      <Td>
                        <div className="flex items-center gap-3 some thing esle">
                          {img ? (
                            <img
                              src={img}
                              alt={p.name ?? "product image"}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-800 shrink-0" aria-hidden />
                          )}
                          <div className="min-w-0">
                            <div className="font-medium truncate max-w-[18rem]">
                              {p.name ?? "Untitled"}
                            </div>
                            <div className="text-xs text-slate-500 break-all">
                              /{p.slug ?? p._id ?? p.id}
                            </div>
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-wrap gap-1">
                          {(p.tags ?? []).slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400/30"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Td>
                      <Td>
                        {when ? new Date(when).toLocaleDateString() : "—"}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}

/* -------------------- tiny UI primitives -------------------- */
function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-slate-900/60 border border-white/10 p-4 ${className}`}>
      {children}
    </div>
  );
}
function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-primary/60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
function Th({ children }) {
  return (
    <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wide py-2 pr-3 border-b border-white/10">
      {children}
    </th>
  );
}
function Td({ children }) {
  return <td className="py-2 pr-3 align-middle">{children}</td>;
}
function KPI({ title, value, sub }) {
  return (
    <Card>
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{sub}</div>
    </Card>
  );
}
function Skeleton({ rows = 3 }) {
  return (
    <div className="mt-3 animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-slate-800/60" />
      ))}
    </div>
  );
}
