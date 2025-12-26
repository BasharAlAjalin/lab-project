import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/Home";

import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";

import Profile from "./pages/Profile";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import AdminProducts from "./pages/admin/Products";
import AdminUsers from "./pages/admin/Users";

import { useAuth } from "./context/AuthContext";

function RequireAuth() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function RequireAdmin() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "ADMIN" ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_20%_20%,rgba(0,87,184,0.25),transparent),radial-gradient(1200px_700px_at_80%_30%,rgba(165,0,68,0.28),transparent),radial-gradient(900px_500px_at_60%_90%,rgba(255,199,44,0.14),transparent)] bg-[#050814] text-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* CUSTOMER */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />

        {/* PROFILE */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ADMIN */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<div className="container mx-auto px-6 py-16">404</div>}
        />
      </Routes>
    </div>
  );
}
