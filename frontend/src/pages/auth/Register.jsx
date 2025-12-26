import { useState } from "react";
import { Link } from "react-router-dom";
import { registerApi } from "../../api/auth.api";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    channel: "EMAIL",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const input =
    "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await registerApi(form);
      const code = res.data?.verification?.code;
      setMsg(
        code
          ? `Registered ✅ Demo code: ${code}`
          : "Registered ✅ Please verify."
      );
    } catch (e2) {
      setMsg(e2?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(237,187,0,.18),0_16px_50px_rgba(0,0,0,.28)]">
        <h1 className="text-2xl font-extrabold">Register</h1>

        {msg && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={input}
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              className={input}
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          <input
            className={input}
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className={input}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className={input}
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#EDBB00]/60"
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
          >
            <option className="text-black" value="EMAIL">
              Email
            </option>
            <option className="text-black" value="WHATSAPP">
              WhatsApp
            </option>
          </select>

          <button
            disabled={loading}
            className="rounded-2xl px-5 py-3 font-bold bg-gradient-to-r from-[#004D98] to-[#A50044] hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            className="text-white/70 underline hover:text-white"
            to="/login"
          >
            Login
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
