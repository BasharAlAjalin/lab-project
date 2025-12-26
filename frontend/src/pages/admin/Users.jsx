import { useEffect, useMemo, useState } from "react";
import Button from "../../components/UI/Button";
import Loader from "../../components/common/Loader";
import {
  adminDeleteUserApi,
  adminListUsersApi,
  adminUpdateUserApi,
} from "../../api/users.api";

export default function AdminUsers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await adminListUsersApi();
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((u) => {
      const full = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
      return (
        (u.email || "").toLowerCase().includes(s) ||
        full.includes(s) ||
        (u.role || "").toLowerCase().includes(s)
      );
    });
  }, [items, q]);

  const toggleVerified = async (u) => {
    setMsg("");
    try {
      await adminUpdateUserApi(u.id, { isVerified: !u.isVerified });
      await load();
      setMsg("Updated ✅");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Update failed");
    }
  };

  const toggleRole = async (u) => {
    setMsg("");
    try {
      const nextRole = u.role === "ADMIN" ? "CUSTOMER" : "ADMIN";
      await adminUpdateUserApi(u.id, { role: nextRole });
      await load();
      setMsg("Updated ✅");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Update failed");
    }
  };

  const onDelete = async (u) => {
    if (!confirm(`Delete user ${u.email}?`)) return;
    setMsg("");
    try {
      await adminDeleteUserApi(u.id);
      await load();
      setMsg("User deleted ✅");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold">Users</h1>
      <p className="mt-1 text-white/70">Manage users safely (no IDs shown).</p>

      {msg && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
          {msg}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          className={input}
          placeholder="Search by email / name / role..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button variant="ghost" onClick={load}>
          Refresh
        </Button>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        {loading ? (
          <Loader text="Loading users..." />
        ) : filtered.length === 0 ? (
          <p className="text-white/70">No users found.</p>
        ) : (
          <div className="grid gap-3">
            {filtered.map((u) => (
              <div
                key={u.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-bold">{u.email}</div>
                  <div className="text-sm text-white/60">
                    {(u.firstName || "—") + " " + (u.lastName || "")} •{" "}
                    {u.phone || "—"} • Role: {u.role}
                  </div>
                  <div className="mt-1 text-xs text-white/55">
                    Verified: {u.isVerified ? "Yes" : "No"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" onClick={() => toggleVerified(u)}>
                    {u.isVerified ? "Unverify" : "Verify"}
                  </Button>
                  <Button variant="ghost" onClick={() => toggleRole(u)}>
                    {u.role === "ADMIN" ? "Make Customer" : "Make Admin"}
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(u)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
