const loginService = require("./login.service");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginService.login({ email, password });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = { login };
