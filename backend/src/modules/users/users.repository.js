const { query } = require("../../config/db");

async function findById(id) {
  const rows = await query("SELECT * FROM users WHERE id=? LIMIT 1", [id]);
  return rows[0] || null;
}

async function findAll({ search, role, verified } = {}) {
  const params = [];
  let sql = "SELECT * FROM users WHERE 1=1";

  if (role) {
    sql += " AND role = ?";
    params.push(role);
  }

  if (verified !== undefined && verified !== "") {
    const v = String(verified).toLowerCase() === "true" ? 1 : 0;
    sql += " AND is_verified = ?";
    params.push(v);
  }

  if (search && search.trim()) {
    const s = `%${search.trim().toLowerCase()}%`;
    sql +=
      " AND (LOWER(email) LIKE ? OR LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ?)";
    params.push(s, s, s);
  }

  sql += " ORDER BY created_at DESC";
  return query(sql, params);
}

async function updateUser(id, { firstName, lastName, phone }) {
  const existing = await findById(id);
  if (!existing) return null;

  const next = {
    first_name: firstName !== undefined ? firstName : existing.first_name,
    last_name: lastName !== undefined ? lastName : existing.last_name,
    phone_number: phone !== undefined ? phone : existing.phone_number,
  };

  await query(
    "UPDATE users SET first_name=?, last_name=?, phone_number=? WHERE id=?",
    [next.first_name, next.last_name, next.phone_number, id]
  );

  return findById(id);
}

async function updateUserAdmin(
  id,
  { firstName, lastName, phone, role, isVerified }
) {
  const existing = await findById(id);
  if (!existing) return null;

  const next = {
    first_name: firstName !== undefined ? firstName : existing.first_name,
    last_name: lastName !== undefined ? lastName : existing.last_name,
    phone_number: phone !== undefined ? phone : existing.phone_number,
    role: role !== undefined ? role : existing.role,
    is_verified:
      isVerified !== undefined ? (isVerified ? 1 : 0) : existing.is_verified,
  };

  await query(
    "UPDATE users SET first_name=?, last_name=?, phone_number=?, role=?, is_verified=? WHERE id=?",
    [
      next.first_name,
      next.last_name,
      next.phone_number,
      next.role,
      next.is_verified,
      id,
    ]
  );

  return findById(id);
}

async function remove(id) {
  const res = await query("DELETE FROM users WHERE id=?", [id]);
  return res.affectedRows > 0;
}

module.exports = {
  findById,
  findAll,
  updateUser,
  updateUserAdmin,
  remove,
};
