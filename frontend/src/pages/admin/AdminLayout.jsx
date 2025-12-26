import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
