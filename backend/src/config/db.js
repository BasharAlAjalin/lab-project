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
  try {
    await conn.ping();
    console.log(
      `✅ MySQL connected: ${env.MYSQL_HOST}:${env.MYSQL_PORT}/${env.MYSQL_DATABASE} (user=${env.MYSQL_USER})`
    );
  } finally {
    conn.release();
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("✅ MySQL pool closed");
  }
}

async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

module.exports = { getPool, query, testConnection, closePool };
