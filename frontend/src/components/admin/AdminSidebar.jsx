import { NavLink } from "react-router-dom";

const nav = ({ isActive }) =>
  `rounded-2xl px-4 py-3 font-semibold transition ${
    isActive
      ? "bg-white/10 text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;

export default function AdminSidebar() {
  return (
    <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(237,187,0,.18),0_12px_40px_rgba(0,0,0,.2)] lg:sticky lg:top-24">
      <div className="mb-4">
        <h3 className="text-lg font-extrabold">Admin Panel</h3>
        <p className="text-sm text-white/60">Catalog & users</p>
      </div>

      <nav className="grid gap-2">
        <NavLink to="/admin" end className={nav}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" className={nav}>
          Categories
        </NavLink>

        <NavLink to="/admin/products" className={nav}>
          Products
        </NavLink>

        <NavLink to="/admin/users" className={nav}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
}
