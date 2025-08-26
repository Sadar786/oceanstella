import React, { useEffect, useMemo, useState } from "react";
import { Card, Table, TextInput, Select, Button, Badge } from "flowbite-react";

const API = import.meta.env.VITE_API_URL;

export default function ProductsTab() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [categories, setCategories] = useState([]);

  // fetch categories once
  useEffect(() => {
    fetch(`${API}/api/v1/categories`)
      .then(r => r.json())
      .then(d => setCategories(d.items || []))
      .catch(() => setCategories([]));
  }, []);

  // fetch products on filters/page change
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const url = new URL(`${API}/api/v1/products`);
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("page", String(page));
        if (q.trim()) url.searchParams.set("q", q.trim());
        if (category) url.searchParams.set("category", category);

        const res = await fetch(url);
        const data = await res.json();
        if (!alive) return;
        setItems(data.items || []);
        setTotal(data.total || 0);
      } catch {
        if (!alive) return;
        setItems([]);
        setTotal(0);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, [q, category, page, limit]);

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Products</h1>

      <Card className="bg-slate-900/60 border border-white/10">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TextInput
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Search products…"
          />
          <Select
            value={category}
            onChange={(e) => { setPage(1); setCategory(e.target.value); }}
          >
            <option value="">All categories</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </Select>
          <div className="flex gap-2">
            <Button color="purple" onClick={() => setPage(1)}>Apply</Button>
            <Button color="gray" onClick={() => { setQ(""); setCategory(""); setPage(1); }}>
              Reset
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <Skeleton rows={6} />
          ) : items.length === 0 ? (
            <p className="text-sm text-slate-400">No products found.</p>
          ) : (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Product</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Tags</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Published</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {items.map(p => (
                  <Table.Row key={p.slug} className="bg-slate-900">
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {p.images?.[0]?.url ? (
                          <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800" />
                        )}
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-slate-500">/{p.slug}</div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {/* Only have categoryId on this list; keep blank for now or map client-side if needed */}
                      {/* Optional improvement: expand products endpoint to populate category name */}
                      <span className="text-xs text-slate-400">—</span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-1">
                        {(p.tags || []).slice(0,3).map(t =>
                          <Badge key={t} color="purple" size="sm">{t}</Badge>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={p.status === "published" ? "success" : p.status === "draft" ? "gray" : "warning"}>
                        {p.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400">Total: {total}</div>
          <div className="flex gap-2">
            <Button size="sm" color="gray" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              Prev
            </Button>
            <span className="text-sm px-3 py-1 rounded bg-slate-800/60 border border-white/10">
              {page} / {pages}
            </span>
            <Button size="sm" color="gray" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Skeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-slate-800/60" />
      ))}
    </div>
  );
}
