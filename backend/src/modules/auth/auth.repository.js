const { query } = require("../../config/db");
const { randomUUID } = require("crypto");

async function findByEmail(email) {
  const rows = await query(
    "SELECT * FROM users WHERE LOWER(email)=LOWER(?) LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const rows = await query("SELECT * FROM users WHERE id=? LIMIT 1", [id]);
  return rows[0] || null;
}

async function create(user) {
  const id = randomUUID();
  await query(
    `INSERT INTO users
      (id, email, password_hash, first_name, last_name, phone_number, role, is_verified)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      user.email,
      user.passwordHash,
      user.firstName || null,
      user.lastName || null,
      user.phone || null,
      user.role || "CUSTOMER",
      user.isVerified ? 1 : 0,
    ]
  );
  return findById(id);
}

async function setVerified(userId) {
  await query("UPDATE users SET is_verified = 1 WHERE id = ?", [userId]);
  return findById(userId);
}

module.exports = { findByEmail, findById, create, setVerified };
