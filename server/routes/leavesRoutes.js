// server/routes/leavesRoutes.js
import { Router } from "express";
import {
  getBalances,
  getRequests,
  applyLeave,
  updateRequestStatus,
} from "../controllers/leavesController.js";

const router = Router();

router.get("/balances", getBalances);
router.get("/requests", getRequests);
router.post("/apply", applyLeave);
router.patch("/requests/:id/status", updateRequestStatus);

export default router;
