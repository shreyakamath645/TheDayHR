// server/routes/calendarRoutes.js
import { Router } from "express";
import { getEvents, createEvent, deleteEvent } from "../controllers/calendarController.js";

const router = Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.delete("/events/:id", deleteEvent);

export default router;
