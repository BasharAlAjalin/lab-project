const request = require("supertest");
const app = require("../src/app");

const categoryRepo = require("../src/modules/categories/category.repository");
const productRepo = require("../src/modules/products/product.repository");

// These imports depend on your Sprint 2 auth implementation.
// If you already have signToken in backend/src/config/jwt.js use it.
let signToken;
try {
  ({ signToken } = require("../src/config/jwt"));
} catch {
  // If your helper is named differently, update this import accordingly.
  signToken = null;
}

function makeToken(payload) {
  if (!signToken) {
    throw new Error(
      "signToken not found. Update test import to your JWT helper."
    );
  }
  return signToken(payload);
}

describe("Products API (integration)", () => {
  beforeEach(() => {
    productRepo._resetForTests();
    if (categoryRepo._resetForTests) categoryRepo._resetForTests();
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
    const adminToken = makeToken({ sub: "admin-id", role: "ADMIN" });

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
    // Create category directly in repo (in-memory)
    const cat = categoryRepo.create({ name: "Electronics", description: "" });

    const adminToken = makeToken({ sub: "admin-id", role: "ADMIN" });

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

    const customerToken = makeToken({ sub: "cust-id", role: "CUSTOMER" });

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        categoryId: cat.id,
        name: "Phone",
        price: 100,
      });

    expect([401, 403]).toContain(res.status);
  });
});
