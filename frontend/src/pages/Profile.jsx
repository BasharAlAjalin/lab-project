import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/UI/Button";
import { updateMeApi } from "../api/users.api";
import { setUser, getToken } from "../Utils/token";

export default function Profile() {
  const { user, login } = useAuth();

  const safeUser = useMemo(() => {
    if (!user) return null;
    return {
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
    };
  }, [user]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!safeUser) return;
    setForm({
      firstName: safeUser.firstName,
      lastName: safeUser.lastName,
      phone: safeUser.phone,
    });
  }, [safeUser]);

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#EDBB00]/60";

  const onSave = async (e) => {
    e.preventDefault();
    setMsg("");
    setSaving(true);

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
    };

    try {
      const res = await updateMeApi(payload);

      const updatedUser = res?.data?.user
        ? res.data.user
        : { ...user, ...payload };

      setUser(updatedUser);
      const token = getToken();
      if (token) login({ token, user: updatedUser });

      setMsg("Saved ✅");
    } catch (err) {
      const apiMsg = err?.response?.data?.message || "Save failed";
      setMsg(apiMsg);
    } finally {
      setSaving(false);
    }
  };

  if (!safeUser) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#004D98]/60 blur-3xl" />
          <div className="absolute -right-24 -top-12 h-72 w-72 rounded-full bg-[#A50044]/60 blur-3xl" />
          <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-[#EDBB00]/35 blur-3xl" />
        </div>

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Your <span className="text-[#EDBB00]">Blaugrana</span> Profile
            </h1>
            <p className="mt-2 text-white/70">Only safe fields are editable.</p>
          </div>

          <div className="relative">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
              {safeUser.email}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
              <span className="inline-block h-2 w-2 rounded-full bg-[#EDBB00]" />
              {user?.role === "ADMIN" ? "Admin" : "Member"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          {/* Editable card */}
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold">Edit details</h2>
              <span className="rounded-full bg-[#EDBB00]/15 px-3 py-1 text-xs font-bold text-[#EDBB00]">
                Barça Mode ✨
              </span>
            </div>

            {msg && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
                {msg}
              </div>
            )}

            <form onSubmit={onSave} className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    className={input}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    placeholder="First name"
                    maxLength={40}
                  />
                </Field>

                <Field label="Last name">
                  <input
                    className={input}
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    placeholder="Last name"
                    maxLength={40}
                  />
                </Field>
              </div>

              <Field label="Phone (optional)">
                <input
                  className={input}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="e.g. +970..."
                  maxLength={25}
                />
              </Field>

              <Field label="Email (read-only)">
                <input
                  className={`${input} opacity-70 cursor-not-allowed`}
                  value={safeUser.email}
                  disabled
                />
              </Field>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
                  onClick={() => {
                    setForm({
                      firstName: safeUser.firstName,
                      lastName: safeUser.lastName,
                      phone: safeUser.phone,
                    });
                    setMsg("Reset ✅");
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Non-sensitive mini cards */}
          <div className="grid gap-4">
            <MiniCard
              title="Role"
              value={user?.role === "ADMIN" ? "Admin" : "Customer"}
              hint="This is read-only."
              accent="from-[#004D98] to-[#A50044]"
            />
            <MiniCard
              title="Verified"
              value={user?.isVerified ? "Yes" : "No"}
              hint="Verify from /verify if needed."
              accent="from-[#A50044] to-[#EDBB00]"
            />
            <MiniCard
              title="Privacy"
              value="Safe"
              hint="We don’t show user ID or internal flags."
              accent="from-[#004D98] to-[#EDBB00]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function MiniCard({ title, value, hint, accent }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
            {title}
          </div>
          <div className="mt-1 text-2xl font-extrabold">{value}</div>
        </div>
        <div
          className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${accent} opacity-90 shadow-[0_10px_30px_rgba(0,0,0,.35)]`}
        />
      </div>
      <div className="mt-2 text-sm text-white/60">{hint}</div>
    </div>
  );
}
