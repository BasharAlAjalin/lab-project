import { useState } from "react";
import { Link } from "react-router-dom";
import { verifyApi } from "../../api/auth.api";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("EMAIL");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const input =
    "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await verifyApi({ email, channel, code });
      setMsg(res.data?.message || "Verified ✅");
    } catch (e2) {
      setMsg(e2?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(237,187,0,.18),0_16px_50px_rgba(0,0,0,.28)]">
        <h1 className="text-2xl font-extrabold">Verify</h1>

        {msg && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
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
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#EDBB00]/60"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option className="text-black" value="EMAIL">
              Email
            </option>
            <option className="text-black" value="WHATSAPP">
              WhatsApp
            </option>
          </select>
          <input
            className={input}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            disabled={loading}
            className="rounded-2xl px-5 py-3 font-bold bg-gradient-to-r from-[#004D98] to-[#A50044] hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
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
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
