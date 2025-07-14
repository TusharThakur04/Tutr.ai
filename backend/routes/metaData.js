import { Router } from "express";
import storeMetadata from "../controllers/storeMetadata.js";
import getDocMetadata from "../controllers/getDocMetadata.js";
import deleteDoc from "../controllers/deleteDoc.js";
const router = Router();

router.get("/", getDocMetadata);
router.post("/", storeMetadata);
router.delete("/", deleteDoc);

export default router;
