// server/routes/notificationsRoutes.js
import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllRead,
} from "../controllers/notificationsController.js";

const router = Router();

router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);
router.post("/mark-all-read", markAllRead);

export default router;
