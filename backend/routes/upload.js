import { Router } from "express";
import uploadDocument from "../controllers/uploadDocuments.js";

const router = Router();

router.post("/", uploadDocument);

export default router;
