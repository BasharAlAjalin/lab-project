const { query } = require("../../config/db");
const { randomUUID } = require("crypto");

function toProduct(row) {
  if (!row) return null;

  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stockQuantity: row.stock_quantity,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function findAll({ search, categoryId } = {}) {
  const params = [];
  let sql = `
    SELECT
      id,
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image_url,
      created_at,
      updated_at
    FROM products
    WHERE 1=1
  `;

  if (categoryId) {
    sql += " AND category_id = ?";
    params.push(categoryId);
  }

  if (search && search.trim()) {
    sql += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
    const s = `%${search.trim().toLowerCase()}%`;
    params.push(s, s);
  }

  sql += " ORDER BY created_at DESC";

  const rows = await query(sql, params);
  return rows.map(toProduct);
}

async function findById(id) {
  const rows = await query(
    `
    SELECT
      id,
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image_url,
      created_at,
      updated_at
    FROM products
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] ? toProduct(rows[0]) : null;
}

async function create(p) {
  const id = randomUUID();

  await query(
    `INSERT INTO products
      (id, category_id, name, description, price, stock_quantity, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      p.categoryId,
      p.name,
      p.description || null,
      p.price,
      p.stockQuantity ?? 0,
      p.imageUrl || null,
    ]
  );

  return findById(id);
}

async function update(id, patch) {
  const existing = await query(
    `
    SELECT
      id,
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image_url
    FROM products
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );
  const old = existing[0];
  if (!old) return null;

  const next = {
    category_id: patch.categoryId ?? old.category_id,
    name: patch.name ?? old.name,
    description: patch.description ?? old.description,
    price: patch.price ?? old.price,
    stock_quantity: patch.stockQuantity ?? old.stock_quantity,
    image_url: patch.imageUrl ?? old.image_url,
  };

  await query(
    `UPDATE products
     SET category_id=?, name=?, description=?, price=?, stock_quantity=?, image_url=?
     WHERE id=?`,
    [
      next.category_id,
      next.name,
      next.description,
      next.price,
      next.stock_quantity,
      next.image_url,
      id,
    ]
  );

  return findById(id);
}

async function remove(id) {
  const res = await query("DELETE FROM products WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
