// server/controllers/meetingsController.js
import { db } from "../data/db.js";

export const getMeetings = (req, res) => {
  try {
    let meetings = db.get("meetings") || [];
    const { status, search, type } = req.query;

    if (search) {
      const q = search.trim().toLowerCase();
      meetings = meetings.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.organizer.toLowerCase().includes(q) ||
          m.type.toLowerCase().includes(q)
      );
    }

    if (status && status !== "all") {
      meetings = meetings.filter((m) => m.status.toLowerCase().includes(status.toLowerCase()));
    }

    if (type && type !== "all") {
      meetings = meetings.filter((m) => m.type.toLowerCase() === type.toLowerCase());
    }

    res.json({ success: true, count: meetings.length, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMeetingById = (req, res) => {
  try {
    const meeting = db.findById("meetings", req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }
    res.json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMeeting = (req, res) => {
  try {
    const { title, organizer, time, duration, participants, type, link } = req.body;
    if (!title || !time) {
      return res.status(400).json({ success: false, message: "Title and time are required" });
    }

    const currentUser = db.get("user") || {};
    const newMeeting = {
      id: Date.now(),
      title,
      organizer: organizer || currentUser.name || "Shreya Kamath",
      time,
      duration: duration || "45 mins",
      status: "Scheduled",
      participants: participants || [
        { id: currentUser.id || 1, name: currentUser.name || "Shreya Kamath", initials: currentUser.initials || "SK", status: "online" },
      ],
      totalParticipants: (participants ? participants.length : 1) + 2,
      type: type || "Video Call",
      link: link || `https://meet.thedayhr.com/${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    };

    const created = db.insert("meetings", newMeeting);

    // Also add to calendar events
    const day = new Date().getDate();
    db.insert("calendarEvents", {
      id: Date.now() + 1,
      day,
      title,
      time: time.split("–")[0].trim() || time,
      type: "meeting",
      color: "#4f46e5",
    });

    res.status(201).json({ success: true, data: created, message: "Meeting scheduled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMeeting = (req, res) => {
  try {
    const updated = db.update("meetings", req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }
    res.json({ success: true, data: updated, message: "Meeting updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMeeting = (req, res) => {
  try {
    const success = db.delete("meetings", req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }
    res.json({ success: true, message: "Meeting cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
