import { Router } from "express";
import process from "../controllers/process.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("helo");
});
router.post("/", process);

export default router;
