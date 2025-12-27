"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.join(__dirname, "..", "..", ".env");

if (!process.env.CI && fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("ENV LOADED FROM:", envPath);
} else {
  console.log("ENV LOADED FROM: process.env (CI or no .env)");
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT || 5001),

  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
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
