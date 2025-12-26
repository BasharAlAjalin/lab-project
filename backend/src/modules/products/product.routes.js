const router = require("express").Router();
const controller = require("./product.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

// Public
router.get("/", controller.list);
router.get("/:id", controller.getOne);

// Admin only
router.post("/", authMiddleware, roleMiddleware("ADMIN"), controller.create);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), controller.update);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.remove
);

module.exports = router;
