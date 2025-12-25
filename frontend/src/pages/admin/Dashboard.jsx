import React from "react";
import AdminSidebar from "../../components/cdmin/AdminSidebar";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="admin-layout container">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Dashboard</h1>
        <p className="muted">Welcome back, {user?.name || "Admin"}.</p>

        <div className="grid-3">
          <div className="card">
            <h3>Total Orders</h3>
            <p className="big">—</p>
            <p className="muted">Connect your API to show real data</p>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <p className="big">—</p>
            <p className="muted">Connect your API to show real data</p>
          </div>

          <div className="card">
            <h3>Total Users</h3>
            <p className="big">—</p>
            <p className="muted">Connect your API to show real data</p>
          </div>
        </div>
      </main>
    </div>
  );
}
