import { Router } from "express";
import PlanetsController from "../../controllers/planets";

const router = Router();
router.get("/", PlanetsController.getAll);

export default router;
