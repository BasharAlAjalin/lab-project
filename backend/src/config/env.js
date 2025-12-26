require("dotenv").config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret_change_me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};

module.exports = { env };
