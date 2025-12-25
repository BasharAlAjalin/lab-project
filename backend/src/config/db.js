const mysql = require("mysql2/promise");
const env = require("./env");

let pool;

function getPool(overrides = {}) {
  if (!pool) {
    pool = mysql.createPool({
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...overrides,
    });
  }
  return pool;
}

async function testConnection() {
  const p = getPool();
  const conn = await p.getConnection();
  await conn.ping();
  conn.release();
  console.log("✅ MySQL connected");
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("✅ MySQL pool closed");
  }
}

/** Simple query helper */
async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

module.exports = { getPool, query, testConnection, closePool };
