import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/product.api";
import { getCategories } from "../../api/category.api";

export default function AdminProducts() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    imageUrl: "",
    isActive: true,
  });

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const [catsRes, prodRes] = await Promise.all([getCategories(), getProducts()]);
      setCategories(catsRes.data);
      setItems(prodRes.data);

      // default categoryId for create form
      if (!form.categoryId && catsRes.data.length) {
        setForm((f) => ({ ...f, categoryId: catsRes.data[0].id }));
      }
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load admin products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      isActive: true,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
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
    } catch (e) {
      setMsg(e?.response?.data?.message || "Operation failed");
    }
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      categoryId: p.categoryId,
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? 0,
      stockQuantity: p.stockQuantity ?? 0,
      imageUrl: p.imageUrl || "",
      isActive: p.isActive ?? true,
    });
    setMsg("");
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
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Admin Products</h2>

      <form onSubmit={onSubmit} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit Product" : "Create Product"}</h3>

        <div style={{ display: "grid", gap: 10 }}>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
          />

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            type="number"
            min="0"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          />

          <input
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {msg && <p style={{ marginBottom: 0 }}>{msg}</p>}
      </form>

      <div style={{ marginTop: 20 }}>
        <h3>Products List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th align="left">Name</th>
                <th align="left">Price</th>
                <th align="left">Stock</th>
                <th align="left">Active</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{p.name}</td>
                  <td>${Number(p.price).toFixed(2)}</td>
                  <td>{p.stockQuantity}</td>
                  <td>{p.isActive ? "Yes" : "No"}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onEdit(p)}>Edit</button>
                    <button onClick={() => onDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}