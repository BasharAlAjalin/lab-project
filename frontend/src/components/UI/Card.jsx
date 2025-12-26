export default function Card({ product }) {
  if (!product) return null;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">{product.name}</h3>

        <span className="shrink-0 rounded-full bg-[#FFC72C]/15 px-3 py-1 text-sm font-bold text-[#FFC72C]">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      <p className="mt-3 min-h-[44px] text-white/70">
        {product.description || "—"}
      </p>

      <div className="mt-auto pt-6 text-sm text-white/60">
        Stock:{" "}
        <span className="font-semibold text-white/80">
          {product.stock_quantity}
        </span>
      </div>
    </div>
  );
}
