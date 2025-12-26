const { query } = require("../../config/db");

async function createCode({ userId, channel, code, expiresAt }) {
  const idRows = await query(`SELECT UUID() AS id`);
  const id = idRows[0].id;

  await query(
    `INSERT INTO verification_codes (id, user_id, channel, code, expires_at, is_used)
     VALUES (?, ?, ?, ?, ?, FALSE)`,
    [id, userId, channel, code, expiresAt]
  );

  const rows = await query(
    `SELECT * FROM verification_codes WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0];
}

async function findValidCode({ userId, channel, code }) {
  const rows = await query(
    `SELECT *
     FROM verification_codes
     WHERE user_id = ?
       AND channel = ?
       AND code = ?
       AND is_used = FALSE
       AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId, channel, code]
  );
  return rows[0] || null;
}

async function markUsed(id) {
  await query(`UPDATE verification_codes SET is_used = TRUE WHERE id = ?`, [
    id,
  ]);
  const rows = await query(
    `SELECT * FROM verification_codes WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { createCode, findValidCode, markUsed };
