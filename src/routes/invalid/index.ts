import { Router } from "express";

const router = Router();

router.all("*", (req, res) => {
  res.status(404);
  res.send("Invalid path");
});

export default router;
