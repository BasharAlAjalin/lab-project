const authRepo = require("./auth.repository");
const verificationRepo = require("./verification.repository");

async function verify({ email, channel, code }) {
  const user = await authRepo.findByEmail(email);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const record = await verificationRepo.findValidCode({
    userId: user.id,
    channel,
    code,
  });

  if (!record) {
    const err = new Error("Invalid or expired verification code");
    err.status = 400;
    throw err;
  }

  await verificationRepo.markUsed(record.id);
  await authRepo.setVerified(user.id);

  return { message: "Account verified successfully" };
}

module.exports = { verify };
