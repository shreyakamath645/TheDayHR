// server/routes/attendanceRoutes.js
import { Router } from "express";
import {
  getTodayStatus,
  checkIn,
  checkOut,
  getHistory,
} from "../controllers/attendanceController.js";

const router = Router();

router.get("/today", getTodayStatus);
router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.get("/history", getHistory);

export default router;
