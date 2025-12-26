import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../api/category.api";
import { getProducts } from "../../api/product.api";
import { adminListUsersApi } from "../../api/users.api";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    categories: "—",
    products: "—",
    verifiedUsers: "—",
  });

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const [catsRes, prodsRes, usersRes] = await Promise.all([
          getCategories(),
          getProducts(),
          adminListUsersApi(),
        ]);

        const cats = Array.isArray(catsRes.data) ? catsRes.data.length : 0;
        const prods = Array.isArray(prodsRes.data) ? prodsRes.data.length : 0;

        const users = Array.isArray(usersRes.data) ? usersRes.data : [];
        const verified = users.filter((u) => !!u.isVerified).length;

        if (alive) {
          setStats({
            categories: cats,
            products: prods,
            verifiedUsers: verified,
          });
        }
      } catch {
        //
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const cards = [
    { title: "Total Categories", value: stats.categories },
    { title: "Total Products", value: stats.products },
    { title: "Verified Users", value: stats.verifiedUsers },
  ];

  return (
    <>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="mt-1 text-white/70">Welcome, {user?.email || "Admin"}.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-white/70">{s.title}</p>
            <p className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-[#004D98] to-[#EDBB00] bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-white/60">Live system data</p>
          </div>
        ))}
      </div>
    </>
  );
}
