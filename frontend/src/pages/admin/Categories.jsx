import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import Button from "../../components/UI/Button";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../api/category.api";

export default function Categories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await getCategories();
      setItems(res.data);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setEditingId(null);
    setName("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = { name: name.trim() };
      if (!payload.name) throw new Error("Name is required");

      if (editingId) {
        await updateCategory(editingId, payload);
        setMsg("Category updated ✅");
      } else {
        await createCategory(payload);
        setMsg("Category created ✅");
      }
      reset();
      await load();
    } catch (e2) {
      setMsg(e2?.response?.data?.message || e2.message || "Operation failed");
    }
  };

  const onEdit = (c) => {
    setEditingId(c.id);
    setName(c.name || "");
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    setMsg("");
    try {
      await deleteCategory(id);
      setMsg("Category deleted ✅");
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold">Categories</h1>
      <p className="mt-1 text-white/70">
        Create and manage product categories.
      </p>

      {msg && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
          {msg}
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-extrabold">
            {editingId ? "Edit Category" : "Create Category"}
          </h3>

          <form onSubmit={onSubmit} className="mt-4 grid gap-3">
            <input
              className={input}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="flex gap-2">
              <Button>{editingId ? "Update" : "Create"}</Button>
              {editingId && (
                <Button type="button" variant="ghost" onClick={reset}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-extrabold">List</h3>

          {loading ? (
            <Loader text="Loading categories..." />
          ) : items.length === 0 ? (
            <p className="mt-3 text-white/70">No categories yet.</p>
          ) : (
            <div className="mt-4 grid gap-2">
              {items.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="font-bold">{c.name}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => onEdit(c)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(c.id)}>
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
