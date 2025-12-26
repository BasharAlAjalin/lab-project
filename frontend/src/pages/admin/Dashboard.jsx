import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ padding: 16 }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome! Use the sidebar to manage categories and products.</p>
      </div>
    </div>
  );
}
