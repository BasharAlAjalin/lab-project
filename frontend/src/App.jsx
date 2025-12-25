import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Common/Navbar";
import Footer from "./Common/Footer";

import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoute";

import ProductDetails from "./pages/customer/ProductDetails";
import Dashboard from "./pages/admin/Dashboard";

function Home() {
  return (
    <div className="container page">
      <h1>Home</h1>
      <p className="muted">
        Frontend is wired with Auth + Protected/Admin routes.
      </p>
    </div>
  );
}

function LoginMock() {
  // This is just a mock login page to test route guards quickly
  // Replace with your real login (API call) page later
  const { login } = require("./context/AuthContext"); // avoid circular import? we'll do normal import instead
  return <div />;
}

import { useAuth } from "./context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const loginAsUser = () => {
    login({
      token: "demo-token",
      user: { id: 1, name: "Customer", role: "customer" },
    });
    navigate(from, { replace: true });
  };

  const loginAsAdmin = () => {
    login({
      token: "demo-token",
      user: { id: 2, name: "Admin", role: "admin" },
    });
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="container page">
      <h1>Login</h1>
      <p className="muted">Mock login buttons (replace with real API later).</p>

      <div className="row">
        <button className="btn" onClick={loginAsUser}>
          Login as Customer
        </button>
        <button className="btn" onClick={loginAsAdmin}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  return (
    <div className="container page">
      <h1>Profile</h1>
      <div className="card">
        <pre style={{ margin: 0 }}>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Protected (any logged-in user) */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin only */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* Add more admin pages later */}
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container page">
              <h1>404</h1>
              <p className="muted">Page not found.</p>
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}
