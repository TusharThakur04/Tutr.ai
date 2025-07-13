import { Router } from "express";
import getDocUrl from "../controllers/getDocUrl.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("helo");
});
router.post("/", getDocUrl);

export default router;
