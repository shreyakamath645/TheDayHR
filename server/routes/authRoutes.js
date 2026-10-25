// server/routes/authRoutes.js
import { Router } from "express";
import { getProfile, updateProfile, updateStatus } from "../controllers/authController.js";

const router = Router();

router.get("/me", getProfile);
router.put("/profile", updateProfile);
router.patch("/status", updateStatus);

export default router;
