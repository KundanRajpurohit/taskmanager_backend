import { Router } from "express";
import * as controller from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/toggle", controller.toggle);

export default router;
