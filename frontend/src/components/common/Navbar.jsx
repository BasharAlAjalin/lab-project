import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  return (
    <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {isAuthed ? (
          <>
            {isAdmin && <Link to="/admin/dashboard">Admin</Link>}
            <span style={{ marginLeft: "auto" }}>
              {user?.email || "User"}
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/verify">Verify</Link>
          </div>
        )}
      </div>
    </div>
  );
}
