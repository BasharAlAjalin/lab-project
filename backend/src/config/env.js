const dotenv = require("dotenv");

dotenv.config({ path: `${process.cwd()}/.env` });
console.log("ENV LOADED FROM:", `${process.cwd()}/.env`);
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log(
  "MYSQL_PASSWORD length:",
  (process.env.MYSQL_PASSWORD || "").length
);
console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
  MYSQL_PORT: Number(process.env.MYSQL_PORT || 3306),
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: required("MYSQL_PASSWORD"),
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "app_db",
  MYSQL_TEST_DATABASE: process.env.MYSQL_TEST_DATABASE || "app_db_test",

  CLIENT_ORIGIN:
    process.env.CLIENT_ORIGIN ||
    process.env.FRONTEND_URL ||
    "http://localhost:5173",
};

module.exports = env;
