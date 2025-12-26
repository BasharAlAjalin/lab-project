const request = require("supertest");
const app = require("../src/app");

const categoryRepo = require("../src/modules/categories/category.repository");
const productRepo = require("../src/modules/products/product.repository");
const authRepo = require("../src/modules/auth/auth.repository");
const { signToken } = require("../src/config/jwt");
const bcrypt = require("bcrypt");

async function createAdminAndToken() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  const admin = await authRepo.create({
    firstName: "Admin",
    lastName: "User",
    phone: "000",
    email: "admin2@test.com",
    passwordHash,
    role: "ADMIN",
  });

  return signToken({ sub: admin.id, role: admin.role });
}

describe("Products API (integration-ish)", () => {
  beforeEach(() => {
    productRepo._resetForTests();
    categoryRepo._resetForTests();
    authRepo._resetForTests();
  });

  test("GET /api/products should be public", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/products requires token", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Phone" });
    expect(res.status).toBe(401);
  });

  test("POST /api/products rejects invalid categoryId", async () => {
    const adminToken = await createAdminAndToken();

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        categoryId: "not-exists",
        name: "Phone",
        price: 100,
        stockQuantity: 5,
      });

    expect([404, 400]).toContain(res.status);
  });

  test("POST /api/products allows ADMIN when category exists", async () => {
    const cat = categoryRepo.create({ name: "Electronics", description: "" });
    const adminToken = await createAdminAndToken();

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        categoryId: cat.id,
        name: "Phone",
        description: "Nice phone",
        price: 100,
        stockQuantity: 5,
        isActive: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Phone");
    expect(res.body.categoryId).toBe(cat.id);
  });

  test("POST /api/products forbids CUSTOMER", async () => {
    const cat = categoryRepo.create({ name: "Electronics", description: "" });

    const passwordHash = await bcrypt.hash("Cust123!", 10);
    const customer = await authRepo.create({
      email: "cust@test.com",
      passwordHash,
      role: "CUSTOMER",
    });

    const customerToken = signToken({ sub: customer.id, role: customer.role });

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ categoryId: cat.id, name: "Phone", price: 100 });

    expect([401, 403]).toContain(res.status);
  });
});
