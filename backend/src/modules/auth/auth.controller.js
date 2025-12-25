const authService = require("./auth.service");

async function register(req, res, next) {
  try {
    const { firstName, lastName, phone, email, password, channel } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const { user, verification } = await authService.register({
      firstName, lastName, phone, email, password, channel
    });

    res.status(201).json({
      message: "Registered successfully. Please verify your account.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      
      verification: { channel: verification.channel, code: verification.code, expiresAt: verification.expiresAt }
    });
  } catch (e) {
    next(e);
  }
}

module.exports = { register };