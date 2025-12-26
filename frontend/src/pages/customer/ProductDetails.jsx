import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/product.api";

export default function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setMsg("");
      try {
        const res = await getProductById(id);
        setItem(res.data);
      } catch (e) {
        setMsg(e?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (msg) return <p style={{ padding: 20 }}>{msg}</p>;
  if (!item) return <p style={{ padding: 20 }}>Not found.</p>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>{item.name}</h2>
      <p style={{ opacity: 0.85 }}>{item.description || "—"}</p>
      <p><b>${Number(item.price).toFixed(2)}</b></p>
      <p>Stock: {item.stockQuantity}</p>
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.name} style={{ maxWidth: 320, borderRadius: 12 }} />
      ) : null}
    </div>
  );
}
