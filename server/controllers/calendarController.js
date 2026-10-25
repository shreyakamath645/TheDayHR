// server/controllers/calendarController.js
import { db } from "../data/db.js";

export const getEvents = (req, res) => {
  try {
    const events = db.get("calendarEvents") || [];
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = (req, res) => {
  try {
    const { title, day, time, type, color } = req.body;
    if (!title || !day) {
      return res.status(400).json({ success: false, message: "Title and day are required" });
    }

    const newEvent = {
      id: Date.now(),
      title,
      day: Number(day),
      time: time || "10:00 AM",
      type: type || "meeting",
      color: color || "#4f46e5",
    };

    const created = db.insert("calendarEvents", newEvent);
    res.status(201).json({ success: true, data: created, message: "Event scheduled on calendar" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = (req, res) => {
  try {
    const success = db.delete("calendarEvents", req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Calendar event removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
