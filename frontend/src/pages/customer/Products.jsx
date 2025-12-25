import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../api/product.api";
import { getCategories } from "../../api/category.api";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [msg, setMsg] = useState("");

  const params = useMemo(() => {
    const p = {};
    if (search.trim()) p.search = search.trim();
    if (categoryId) p.categoryId = categoryId;
    return p;
  }, [search, categoryId]);

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const [catsRes, prodRes] = await Promise.all([
        getCategories(),
        getProducts(params),
      ]);
      setCategories(catsRes.data);
      setItems(prodRes.data);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.search, params.categoryId]);

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Products</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 240px" }}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ flex: "0 0 260px" }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={load}>Refresh</button>
      </div>

      {msg && <p>{msg}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                {p.description || "—"}
              </div>
              <div style={{ marginTop: 10 }}>
                <b>${Number(p.price).toFixed(2)}</b>
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
                Stock: {p.stockQuantity}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}