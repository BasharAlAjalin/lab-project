const router = require("express").Router();
const { register } = require("./auth.controller");
const { login } = require("./login.controller");
const { verify } = require("./verify.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;