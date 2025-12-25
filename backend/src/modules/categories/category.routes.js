const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

const router = require("express").Router();

const controller = require("./category.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

router.get("/", controller.list);
router.get("/:id", controller.getOne);

router.post("/", authMiddleware, roleMiddleware("ADMIN"), controller.create);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), controller.update);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.remove
);

module.exports = router;
