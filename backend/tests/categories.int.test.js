const request = require("supertest");
const app = require("../src/app");
const { query } = require("../src/config/db");
const { signToken } = require("../src/config/jwt");
const bcrypt = require("bcrypt");
const authRepo = require("../src/modules/auth/auth.repository");

async function resetDb() {
  await query("DELETE FROM products");
  await query("DELETE FROM verification_codes");
  await query("DELETE FROM categories");
  await query("DELETE FROM users");
}

async function createAdminAndToken() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  const admin = await authRepo.create({
    firstName: "Admin",
    lastName: "User",
    phone: "000",
    email: "admin@test.com",
    passwordHash,
    role: "ADMIN",
    isVerified: true,
  });

  return signToken({ sub: admin.id, role: admin.role });
}

describe("Categories API (MySQL integration)", () => {
  beforeEach(async () => {
    await resetDb();
  });

  test("GET /api/categories should be public", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/categories should require token", async () => {
    const res = await request(app)
      .post("/api/categories")
      .send({ name: "Shoes" });
    expect(res.status).toBe(401);
  });

  test("POST /api/categories should allow ADMIN", async () => {
    const token = await createAdminAndToken();

    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Shoes" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Shoes");
  });

  test("POST /api/categories should reject duplicate name", async () => {
    const token = await createAdminAndToken();

    await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Shoes" });

    const res2 = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Shoes" });

    expect(res2.status).toBe(409);
  });
});
