// server/routes/chatsRoutes.js
import { Router } from "express";
import {
  getChats,
  getMessagesByChatId,
  sendMessage,
  markAsRead,
} from "../controllers/chatsController.js";

const router = Router();

router.get("/", getChats);
router.get("/:id/messages", getMessagesByChatId);
router.post("/:id/messages", sendMessage);
router.patch("/:id/read", markAsRead);

export default router;
