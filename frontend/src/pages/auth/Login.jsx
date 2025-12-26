import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const input =
    "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      login(res.data);
      nav(from, { replace: true });
    } catch (e2) {
      setMsg(e2?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(237,187,0,.18),0_16px_50px_rgba(0,0,0,.28)]">
        <h1 className="text-2xl font-extrabold">Login</h1>
        <p className="mt-1 text-white/70">Access your account.</p>

        {msg && (
          <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-3 text-sm text-rose-100">
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input
            className={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="rounded-2xl px-5 py-3 font-bold bg-gradient-to-r from-[#004D98] to-[#A50044] hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            className="text-white/70 underline hover:text-white"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="text-white/70 underline hover:text-white"
            to="/verify"
          >
            Verify
          </Link>
        </div>
      </div>
    </div>
  );
}
