const env = require("./config/env");
const app = require("./app");
const { testConnection } = require("./config/db");

async function start() {
  await testConnection();

  app.listen(env.PORT, () => {
    console.log(`✅ API running on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error("❌ Server failed to start:", err.message);
  process.exit(1);
});
