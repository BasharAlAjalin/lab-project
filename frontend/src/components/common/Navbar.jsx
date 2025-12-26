import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-white/10 text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#004D98] via-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">
            MyStore
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                {user?.email || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-2xl border border-white/12 bg-white/5 px-5 py-2 font-semibold hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-2xl border border-white/12 bg-white/5 px-5 py-2 font-semibold hover:bg-white/10"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
