async function connectDb() {
  // In this project version we use in-memory repositories (arrays).
  // Keep this function for future DB connection (Mongo/Postgres/etc).
  return true;
}

async function disconnectDb() {
  return true;
}

module.exports = { connectDb, disconnectDb };
