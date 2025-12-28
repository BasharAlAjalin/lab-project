"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..", ".."); // backend/
const envFiles = [
  process.env.NODE_ENV === "test" ? ".env.test" : null,
  ".env",
].filter(Boolean);

let loadedFrom = "process.env (CI or no .env)";

for (const file of envFiles) {
  const fullPath = path.join(rootDir, file);

  // ✅ In CI: do NOT read local files (use GitHub Actions env)
  // ✅ Locally: always read if file exists
  if (!process.env.CI && fs.existsSync(fullPath)) {
    dotenv.config({ path: fullPath });
    loadedFrom = fullPath;
    break;
  }
}

console.log("ENV LOADED FROM:", loadedFrom);

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5001),

  MYSQL_HOST: process.env.MYSQL_HOST || "127.0.0.1",
  MYSQL_PORT: Number(process.env.MYSQL_PORT || 3306),
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "app_db",

  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
};

console.log("MYSQL_HOST:", env.MYSQL_HOST);
console.log("MYSQL_USER:", env.MYSQL_USER);
console.log("MYSQL_PASSWORD length:", String(env.MYSQL_PASSWORD || "").length);
console.log("MYSQL_DATABASE:", env.MYSQL_DATABASE);

module.exports = env;
