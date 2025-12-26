import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div style={{ minWidth: 220, borderRight: "1px solid #eee", padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>Admin</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/products">Products</Link>
      </div>
    </div>
  );
}
