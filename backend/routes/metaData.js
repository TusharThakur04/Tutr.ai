import { Router } from "express";
import storeMetadata from "../controllers/storeMetadata.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("hi");
});
router.post("/", storeMetadata);

export default router;
