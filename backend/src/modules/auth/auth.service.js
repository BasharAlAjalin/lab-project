const bcrypt = require("bcrypt");
const authRepo = require("./auth.repository");
const verificationRepo = require("./verification.repository");

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); 
}

async function register({ firstName, lastName, phone, email, password, channel }) {
  const existing = authRepo.findByEmail(email);
  if (existing) {
    const err = new Error("Email already exists");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = authRepo.create({
    firstName,
    lastName,
    phone,
    email,
    passwordHash,
    role: "CUSTOMER"
  });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

  const verification = verificationRepo.createCode({
    userId: user.id,
    channel: channel || "EMAIL",
    code,
    expiresAt
  });

  
  return { user, verification };
}

module.exports = { register };