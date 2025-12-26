const router = require("express").Router();
const controller = require("./users.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

router.get("/me", authMiddleware, controller.getMe);
router.patch("/me", authMiddleware, controller.updateMe);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.adminListUsers
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.adminUpdateUser
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.adminDeleteUser
);

module.exports = router;
