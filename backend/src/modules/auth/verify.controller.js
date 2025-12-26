const verifyService = require("./verify.service");

async function verify(req, res, next) {
  try {
    const { email, channel, code } = req.body;
    const result = await verifyService.verify({ email, channel, code });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = { verify };
