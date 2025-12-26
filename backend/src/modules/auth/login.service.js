const bcrypt = require("bcrypt");
const authRepo = require("./auth.repository");
const { signToken } = require("../../config/jwt");

async function login({ email, password }) {
  const user = await authRepo.findByEmail(email);
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const token = signToken({ sub: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: !!user.is_verified,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  };
}

module.exports = { login };
