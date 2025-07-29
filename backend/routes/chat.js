import Router from "express";
import chatController from "../controllers/chatController.js";
const chat = Router();
chat.post("/", chatController);
export default chat;
