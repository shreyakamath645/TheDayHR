// server/routes/dashboardRoutes.js
import { Router } from "express";
import {
  getDashboardStats,
  getDashboardOverview,
} from "../controllers/dashboardController.js";

const router = Router();

router.get("/stats", getDashboardStats);
router.get("/overview", getDashboardOverview);

export default router;
