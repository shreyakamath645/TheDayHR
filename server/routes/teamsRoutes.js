// server/routes/teamsRoutes.js
import { Router } from "express";
import {
  getCategories,
  getChannels,
  createChannel,
  getMembers,
} from "../controllers/teamsController.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/channels", getChannels);
router.post("/channels", createChannel);
router.get("/members", getMembers);

export default router;
