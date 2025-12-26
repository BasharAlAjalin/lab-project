import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import Button from "../../components/UI/Button";
import { getCategories } from "../../api/category.api";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api/product.api";

export default function AdminProducts() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    imageUrl: "",
  });

  const input =
    "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const [catsRes, prodRes] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      setCategories(catsRes.data || []);
      setItems(prodRes.data || []);

      if (!form.categoryId && (catsRes.data || []).length) {
        setForm((f) => ({ ...f, categoryId: catsRes.data[0].id }));
      }
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      categoryId: categories[0]?.id || "",
      name: "",
      description: "",
      price: 0,
      stockQuantity: 0,
      imageUrl: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const payload = {
        categoryId: form.categoryId,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        imageUrl: form.imageUrl,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setMsg("Product updated ✅");
      } else {
        await createProduct(payload);
        setMsg("Product created ✅");
      }

      resetForm();
      await load();
    } catch (e2) {
      setMsg(e2?.response?.data?.message || "Operation failed");
    }
  };

  const onEdit = (p) => {
    setEditingId(p.id);

    // ✅ prefer camelCase (new API), fallback to snake_case (old API)
    setForm({
      categoryId: p.categoryId ?? p.category_id ?? "",
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? 0,
      stockQuantity: p.stockQuantity ?? p.stock_quantity ?? 0,
      imageUrl: p.imageUrl ?? p.image_url ?? "",
    });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    setMsg("");
    try {
      await deleteProduct(id);
      setMsg("Product deleted ✅");
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold">Products</h1>
      <p className="mt-1 text-white/70">Create and manage products.</p>

      {msg && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
          {msg}
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-extrabold">
            {editingId ? "Edit Product" : "Create Product"}
          </h3>

          <form onSubmit={onSubmit} className="mt-4 grid gap-3">
            <select
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#EDBB00]/60"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              {categories.map((c) => (
                <option className="text-black" key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              className={input}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <textarea
              className={input}
              rows={3}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={input}
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                className={input}
                type="number"
                min="0"
                placeholder="Stock"
                value={form.stockQuantity}
                onChange={(e) =>
                  setForm({ ...form, stockQuantity: e.target.value })
                }
              />
            </div>

            <input
              className={input}
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <div className="flex gap-2">
              <Button>{editingId ? "Update" : "Create"}</Button>
              {editingId && (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-extrabold">List</h3>

          {loading ? (
            <Loader text="Loading products..." />
          ) : items.length === 0 ? (
            <p className="mt-3 text-white/70">No products yet.</p>
          ) : (
            <div className="mt-4 grid gap-2">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <div className="font-bold">{p.name}</div>
                    <div className="text-sm text-white/60">
                      ${Number(p.price).toFixed(2)} • Stock:{" "}
                      {p.stockQuantity ?? p.stock_quantity ?? 0}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => onEdit(p)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(p.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
