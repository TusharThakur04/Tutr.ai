import { Router } from "express";
import storeMetadata from "../controllers/storeMetadata.js";
import getDocMetadata from "../controllers/getDocMetadata.js";

const router = Router();

router.get("/", getDocMetadata);
router.post("/", storeMetadata);

export default router;
