import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../api/product.api";
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

function StockChip({ stock }) {
  if (stock <= 0) {
    return (
      <span className="rounded-full px-4 py-2 text-sm font-extrabold text-white bg-rose-600/85 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
        Out of stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="rounded-full px-4 py-2 text-sm font-extrabold text-white bg-amber-500/85 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
        Low stock
      </span>
    );
  }
  return (
    <span className="rounded-full px-4 py-2 text-sm font-extrabold text-white bg-emerald-600/85 ring-1 ring-white/25 shadow-lg backdrop-blur-sm">
        In stock
      </span>
    );
  }


function PriceChip({ price }) {
  return (
    <span className="rounded-full px-4 py-2 text-base font-extrabold text-[#FFD54A] bg-black/65 ring-1 ring-[#EDBB00]/45 shadow-lg backdrop-blur-sm">
      ${Number(price ?? 0).toFixed(2)}
    </span>
  );
}

export default function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState(null);

  const p = useMemo(() => (product ? normalizeProduct(product) : null), [product]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setMsg("");
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (e) {
        setMsg(e?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <Loader text="Loading product..." />;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link className="text-white/70 underline hover:text-white" to="/products">
        ← Back
      </Link>

      {msg ? (
        <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-rose-100">
          {msg}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
          {/* Image header */}
          <div className="relative">
            <div className="h-[260px] w-full sm:h-[380px] bg-black/20">
              {p?.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                  No image
                </div>
              )}
            </div>

            {/* overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

            {/* badges */}
            <div className="absolute left-5 top-5">
              <StockChip stock={p?.stock ?? 0} />
            </div>
            <div className="absolute right-5 top-5">
              <PriceChip price={p?.price ?? 0} />
            </div>

            {/* title */}
            <div className="absolute bottom-5 left-5 right-5">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {p?.name}
              </h1>
              <p className="mt-2 max-w-2xl text-white/75">
                {p?.description || "No description."}
              </p>
            </div>
          </div>

          {/* info */}
          <div className="grid gap-3 p-6 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/60">Stock</div>
              <div className="mt-1 text-lg font-extrabold text-white">
                {p?.stock ?? 0}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/60">Price</div>
              <div className="mt-1 text-lg font-extrabold text-white">
                ${Number(p?.price ?? 0).toFixed(2)}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/60">Status</div>
              <div className="mt-1 text-lg font-extrabold text-white">
                Active
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
