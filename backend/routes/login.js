import { Router } from "express";
import storeUser from "../controllers/storeUser.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Send Post req to login/signup");
});
router.post("/", storeUser);

export default router;
