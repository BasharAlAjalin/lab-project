import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-14">
      <div className="mx-auto max-w-5xl rounded-[34px] border border-white/10 bg-white/5 p-10 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight">
            Shop like a <span className="text-[#FFC72C]">Culé</span>
          </h1>

          <p className="mt-3 text-2xl font-bold text-white/90">
            <span className="text-[#0057B8]">Blaugrana</span>{" "}
            <span className="text-white/70">deals</span>,{" "}
            <span className="text-[#A50044]">Camp Nou</span>{" "}
            <span className="text-white/70">feels</span>
          </p>

          <p className="mt-4 max-w-2xl text-white/70">
            Discover official-inspired merch, filter by category, and enjoy a
            smooth checkout-like experience. Admins can manage the catalog
            securely.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-2xl bg-gradient-to-r from-[#0057B8] to-[#A50044] px-6 py-3 font-semibold shadow-lg transition hover:scale-[1.02] active:scale-[0.99]"
            >
              Browse products
            </Link>

            {user?.role === "ADMIN" ? (
              <Link
                to="/admin"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                Admin panel
              </Link>
            ) : user ? (
              <Link
                to="/profile"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                My profile
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
