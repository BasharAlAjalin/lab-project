const { randomUUID } = require("crypto");

const verificationCodes = [];

function createCode({ userId, channel, code, expiresAt }) {
  const record = {
    id: randomUUID(),
    userId,
    channel, // EMAIL | WHATSAPP
    code,
    expiresAt,
    isUsed: false,
    createdAt: new Date().toISOString()
  };
  verificationCodes.push(record);
  return record;
}

function findValidCode({ userId, channel, code }) {
  const now = Date.now();
  return (
    verificationCodes.find(v =>
      v.userId === userId &&
      v.channel === channel &&
      v.code === code &&
      v.isUsed === false &&
      new Date(v.expiresAt).getTime() > now
    ) || null
  );
}

function markUsed(id) {
  const v = verificationCodes.find(x => x.id === id);
  if (!v) return null;
  v.isUsed = true;
  return v;
}

module.exports = { createCode, findValidCode, markUsed };