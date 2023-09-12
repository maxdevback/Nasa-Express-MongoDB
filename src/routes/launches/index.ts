import { Router } from "express";
import LaunchesController from "../../controllers/launches/index";

const router = Router();
router.get("/", LaunchesController.getAll);
router.post("/", LaunchesController.addNew);
router.delete("/:id", LaunchesController.abort);

export default router;
