const { query } = require("../../config/db");
const { randomUUID } = require("crypto");

async function findAll() {
  return query("SELECT * FROM categories ORDER BY created_at DESC");
}

async function findById(id) {
  const rows = await query("SELECT * FROM categories WHERE id = ? LIMIT 1", [
    id,
  ]);
  return rows[0] || null;
}

async function findByName(name) {
  const rows = await query(
    "SELECT * FROM categories WHERE LOWER(name) = LOWER(?) LIMIT 1",
    [name]
  );
  return rows[0] || null;
}

async function create({ name }) {
  const id = randomUUID();
  await query("INSERT INTO categories (id, name) VALUES (?, ?)", [id, name]);
  return findById(id);
}

async function update(id, patch) {
  const existing = await findById(id);
  if (!existing) return null;

  const nextName = patch.name ?? existing.name;

  await query("UPDATE categories SET name = ? WHERE id = ?", [nextName, id]);
  return findById(id);
}

async function remove(id) {
  const res = await query("DELETE FROM categories WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

async function _resetForTests() {
  await query("DELETE FROM categories");
}

module.exports = { findAll, findById, create, update, remove, _resetForTests };
