const request = require("supertest");
const app = require("../src/app");

const categoryRepo = require("../src/modules/categories/category.repository");

const authRepo = require("../src/modules/auth/auth.repository");
const { signToken } = require("../src/config/jwt");
const bcrypt = require("bcrypt");

async function createAdminAndToken() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  const admin = authRepo.create({
    firstName: "Admin",
    lastName: "User",
    phone: "000",
    email: "admin@test.com",
    passwordHash,
    role: "ADMIN",
  });

  const token = signToken({ sub: admin.id, role: admin.role });
  return token;
}

describe("Categories API (integration)", () => {
  beforeEach(() => {
    categoryRepo._resetForTests();
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
      .send({ name: "Shoes", description: "All shoes" });

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
