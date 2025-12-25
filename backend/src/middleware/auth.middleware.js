const { verifyToken } = require("../config/jwt");
const authRepo = require("../modules/auth/auth.repository");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  const token = header.substring("Bearer ".length);
  try {
    const payload = verifyToken(token);
    const user = authRepo.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware };
