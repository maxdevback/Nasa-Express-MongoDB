import { Router } from "express";
import planetsRouter from "./planets";
import launchesRouter from "./launches";
import invalidRouter from "./invalid";

const router = Router();
router.use("/planets", planetsRouter);
router.use("/launches", launchesRouter);
router.use(invalidRouter);

export default router;
