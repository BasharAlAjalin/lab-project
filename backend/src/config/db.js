const mysql = require("mysql2/promise");
const env = require("./env");

let pool;

function shouldUseSSL() {
  // Enable SSL if explicitly asked OR if it's a TiDB Cloud host.
  const flag = String(process.env.MYSQL_SSL || "").toLowerCase();
  if (flag === "true") return true;

  const host = String(env.MYSQL_HOST || "");
  return host.includes("tidbcloud.com");
}

function getPool(overrides = {}) {
  if (!pool) {
    const base = {
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    // ✅ TiDB Cloud requires TLS
    if (shouldUseSSL()) {
      base.ssl = {
        // Render has a system CA bundle, so this works.
        rejectUnauthorized: true,
      };
    }

    pool = mysql.createPool({
      ...base,
      ...overrides, // let overrides replace anything if needed
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
