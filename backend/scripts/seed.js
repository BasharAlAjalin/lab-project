const bcrypt = require("bcrypt");
const { query, closePool, testConnection } = require("../src/config/db");
const { randomUUID } = require("crypto");

async function seed() {
  await testConnection();

  await query("SET FOREIGN_KEY_CHECKS=0");
  await query("TRUNCATE TABLE verification_codes");
  await query("TRUNCATE TABLE products");
  await query("TRUNCATE TABLE categories");
  await query("TRUNCATE TABLE users");
  await query("SET FOREIGN_KEY_CHECKS=1");

  const catKits = randomUUID();
  const catTraining = randomUUID();
  const catAccessories = randomUUID();

  await query(
    "INSERT INTO categories (id, name) VALUES (?, ?), (?, ?), (?, ?)",
    [catKits, "Kits", catTraining, "Training", catAccessories, "Accessories"]
  );

  const products = [
    {
      id: randomUUID(),
      category_id: catKits,
      name: "Barça Home Kit 24/25",
      description: "Official Blaugrana home jersey.",
      price: 99.99,
      stock_quantity: 25,
      image_url: "",
    },
    {
      id: randomUUID(),
      category_id: catKits,
      name: "Barça Away Kit 24/25",
      description: "Away jersey with modern design.",
      price: 99.99,
      stock_quantity: 18,
      image_url: "",
    },
    {
      id: randomUUID(),
      category_id: catAccessories,
      name: "FC Barcelona Scarf",
      description: "Blaugrana scarf for matchdays.",
      price: 19.99,
      stock_quantity: 60,
      image_url: "",
    },
    {
      id: randomUUID(),
      category_id: catTraining,
      name: "Barça Training Jacket",
      description: "Lightweight training jacket worn by the first team.",
      price: 59.99,
      stock_quantity: 40,
      image_url: "",
    },
    {
      id: randomUUID(),
      category_id: catTraining,
      name: "Barça Training Top",
      description: "Breathable top for daily sessions.",
      price: 49.99,
      stock_quantity: 35,
      image_url: "",
    },
    {
      id: randomUUID(),
      category_id: catAccessories,
      name: "Barça Cap",
      description: "Classic cap with embroidered crest.",
      price: 24.99,
      stock_quantity: 55,
      image_url: "",
    },
  ];

  for (const p of products) {
    await query(
      `INSERT INTO products (id, category_id, name, description, price, stock_quantity, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.category_id,
        p.name,
        p.description,
        p.price,
        p.stock_quantity,
        p.image_url,
      ]
    );
  }

  // Users (bcrypt hashes!)
  const adminId = randomUUID();
  const customerId = randomUUID();

  const adminHash = await bcrypt.hash("Admin@123", 10);
  const customerHash = await bcrypt.hash("Aziz@123", 10);

  await query(
    `INSERT INTO users (id, email, password_hash, first_name, last_name, phone_number, role, is_verified)
     VALUES
     (?, ?, ?, ?, ?, ?, 'ADMIN', TRUE),
     (?, ?, ?, ?, ?, ?, 'CUSTOMER', TRUE)`,
    [
      adminId,
      "bisho@admin.com",
      adminHash,
      "Bisho",
      "Admin",
      "0000000000",
      customerId,
      "aziz@customer.com",
      customerHash,
      "Aziz",
      "Customer",
      "0590000000",
    ]
  );

  console.log("✅ Seed done!");
  console.log("Admin: bisho@admin.com / Admin@123");
  console.log("Customer: aziz@customer.com / Aziz@123");

  await closePool();
}

seed().catch(async (e) => {
  console.error("❌ Seed failed:", e);
  await closePool();
  process.exit(1);
});
