// server/routes/announcementsRoutes.js
import { Router } from "express";
import {
  getAnnouncements,
  createAnnouncement,
  markAsRead,
} from "../controllers/announcementsController.js";

const router = Router();

router.get("/", getAnnouncements);
router.post("/", createAnnouncement);
router.patch("/:id/read", markAsRead);

export default router;
