import React, { useEffect, useState } from "react";
import {
  Card as FBCard,
  Table as FBTable,
  Button as FBButton,
  Badge as FBBadge,
} from "flowbite-react";

const API = import.meta.env.VITE_API_URL;

/* ---- Flowbite compatibility shims ---- */
const Card =
  FBCard ||
  function CardFallback({ className = "", children }) {
    return (
      <div className={`rounded-2xl bg-slate-900/60 border border-white/10 p-4 ${className}`}>
        {children}
      </div>
    );
  };

const Button =
  FBButton ||
  function BtnFallback({ className = "", children, ...props }) {
    return (
      <button
        className={`px-3 py-1.5 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

const Badge =
  FBBadge ||
  function BadgeFallback({ className = "", children }) {
    return (
      <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400/30 ${className}`}>
        {children}
      </span>
    );
  };

// Table and its parts: fall back to native tags if missing
const Table = FBTable || (({ className = "", children }) => (
  <table className={`min-w-full text-sm ${className}`}>{children}</table>
));
const THead = FBTable?.Head || (({ children }) => <thead>{children}</thead>);
const THeadCell =
  FBTable?.HeadCell ||
  (({ children }) => <th className="text-left text-slate-400 py-2 pr-3 border-b border-white/10">{children}</th>);
const TBody = FBTable?.Body || (({ className = "", children }) => <tbody className={className}>{children}</tbody>);
const TRow = FBTable?.Row || (({ className = "", children }) => <tr className={className}>{children}</tr>);
const TCell = FBTable?.Cell || (({ children }) => <td className="py-2 pr-3">{children}</td>);

/* ---- Page ---- */
export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [postsTotal, setPostsTotal] = useState(0);
  const [caseStudiesTotal, setCaseStudiesTotal] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const pRes = await fetch(`${API}/api/v1/products?limit=5&page=1`, { credentials: "include" });
        const p = await pRes.json();
        if (alive) {
          setProducts(p.items || []);
          setProductsTotal(p.total || (p.items || []).length || 0);
        }

        const bRes = await fetch(`${API}/api/v1/blog/posts?limit=1&page=1`, { credentials: "include" });
        const b = await bRes.json();
        if (alive) setPostsTotal(b.total || 0);

        const cRes = await fetch(`${API}/api/v1/case-studies`, { credentials: "include" });
        const c = await cRes.json();
        if (alive) setCaseStudiesTotal((c.items || []).length);
      } catch (_) {
        if (alive) {
          setProducts([]); setProductsTotal(0); setPostsTotal(0); setCaseStudiesTotal(0);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Shop Dashboard</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPI title="Total Products" value={loading ? "…" : productsTotal} sub="Published" />
        <KPI title="Blog Posts" value={loading ? "…" : postsTotal} sub="Published" />
        <KPI title="Case Studies" value={loading ? "…" : caseStudiesTotal} sub="Published" />
        <KPI title="Employees" value={1} sub="Seed user" />
      </div>

      {/* Recent section grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-slate-900/60 border border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Recent Orders</h2>
            <Button size="sm">See all</Button>
          </div>
          <p className="text-sm text-slate-400 mt-2">Orders module coming after Auth & Admin APIs.</p>
        </Card>

        <Card className="bg-slate-900/60 border border-white/10 overflow-x-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Recent products</h2>
            <Button size="sm">See all</Button>
          </div>

          {loading ? (
            <Skeleton rows={4} />
          ) : products.length === 0 ? (
            <p className="text-sm text-slate-400 mt-3">No products yet.</p>
          ) : (
            <Table className="mt-3">
              <THead>
                <TRow>
                  <THeadCell>Product</THeadCell>
                  <THeadCell>Tags</THeadCell>
                  <THeadCell>Published</THeadCell>
                </TRow>
              </THead>
              <TBody className="divide-y">
                {products.map((p) => (
                  <TRow key={p.slug} className="bg-slate-900">
                    <TCell>
                      <div className="flex items-center gap-3">
                        {p.images?.[0]?.url ? (
                          <img
                            src={p.images[0].url}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800" />
                        )}
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-slate-500">/{p.slug}</div>
                        </div>
                      </div>
                    </TCell>
                    <TCell>
                      <div className="flex flex-wrap gap-1">
                        {(p.tags || []).slice(0, 3).map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    </TCell>
                    <TCell>
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—"}
                    </TCell>
                  </TRow>
                ))}
              </TBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}

function KPI({ title, value, sub }) {
  return (
    <Card className="bg-slate-900/60 border border-white/10">
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
