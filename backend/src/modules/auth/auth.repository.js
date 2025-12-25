const { randomUUID } = require("crypto");

const users = []; // in-memory

function findByEmail(email) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())  null;
}

function findById(id) {
  return users.find(u => u.id === id)  null;
}

function create(user) {
  const now = new Date().toISOString();
  const newUser = {
    id: randomUUID(),
    firstName: user.firstName  "",
    lastName: user.lastName  "",
    phone: user.phone  "",
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role  "CUSTOMER",
    isVerified: false,
    createdAt: now,
    updatedAt: now
  };
  users.push(newUser);
  return newUser;
}

function setVerified(userId) {
  const u = findById(userId);
  if (!u) return null;
  u.isVerified = true;
  u.updatedAt = new Date().toISOString();
  return u;
}

module.exports = { findByEmail, findById, create, setVerified };