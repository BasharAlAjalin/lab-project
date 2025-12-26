import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/product.api";
import { getCategories } from "../../api/category.api";
import Loader from "../../components/common/Loader";

function normalizeProduct(p) {
  const image = p?.image_url || p?.imageUrl || "";
  const stock = p?.stock_quantity ?? p?.stockQuantity ?? 0;

  return {
    ...p,
    image,
    stock,
    price: Number(p?.price ?? 0),
    name: p?.name ?? "",
    description: p?.description ?? "",
  };
}

function StockBadge({ stock }) {
  // Stronger backgrounds so text doesn't disappear on photos
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white bg-rose-600/80 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
        Out of stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white bg-amber-500/85 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
        Low stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white bg-emerald-600/80 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
      In stock
    </span>
  );
}

function PriceBadge({ price }) {
  // Barça-gold style + dark backing so it stays visible
  return (
    <span className="rounded-full px-3 py-1 text-sm font-extrabold text-[#FFD54A] bg-black/65 ring-1 ring-[#EDBB00]/45 shadow-lg backdrop-blur-sm">
      ${Number(price ?? 0).toFixed(2)}
    </span>
  );
}

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

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

      setCategories(Array.isArray(catsRes.data) ? catsRes.data : []);
      const raw = Array.isArray(prodRes.data) ? prodRes.data : [];
      setItems(raw.map(normalizeProduct));
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [params.search, params.categoryId]);

  const input =
    "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Products</h1>
          <p className="mt-1 text-white/70">Search and filter by category.</p>
        </div>

        <button
          onClick={load}
          className="rounded-2xl border border-white/12 bg-white/5 px-5 py-2 font-semibold hover:bg-white/10"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className={input}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#EDBB00]/60"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option className="text-black" value="">
              All categories
            </option>
            {categories.map((c) => (
              <option className="text-black" key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex items-center text-sm text-white/60">
            Showing{" "}
            <span className="mx-2 font-extrabold text-white">
              {items.length}
            </span>{" "}
            items
          </div>
        </div>
      </div>

      {/* Error */}
      {msg && (
        <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-3 text-sm text-rose-100">
          {msg}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Loader text="Loading products..." />
      ) : items.length === 0 ? (
        <div className="mt-8 text-white/70">No products found.</div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group block">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:bg-white/10">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
                    {/* ONLY use your image_url. If empty, show nothing. */}
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                        No image
                      </div>
                    )}
                  </div>

                  {/* subtle overlay only for readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  {/* badges */}
                  <div className="absolute left-4 top-4">
                    <StockBadge stock={p.stock} />
                  </div>
                  <div className="absolute right-4 top-4">
                    <PriceBadge price={p.price} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="text-lg font-extrabold leading-snug">
                    {p.name}
                  </div>

                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {p.description || "—"}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-white/60">
                      Stock:{" "}
                      <span className="font-bold text-white">{p.stock}</span>
                    </p>

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition group-hover:bg-white/10">
                      View details <span className="translate-y-[1px]">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
