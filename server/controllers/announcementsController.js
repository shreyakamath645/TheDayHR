// server/controllers/announcementsController.js
import { db } from "../data/db.js";

export const getAnnouncements = (req, res) => {
  try {
    let announcements = db.get("announcements") || [];
    const { category, search } = req.query;

    if (category && category !== "All") {
      announcements = announcements.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.trim().toLowerCase();
      announcements = announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAnnouncement = (req, res) => {
  try {
    const { title, description, category, priority, author } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const currentUser = db.get("user") || {};
    const newAnnouncement = {
      id: Date.now(),
      title,
      description,
      category: category || "Benefits",
      priority: priority || "Important",
      author: author || currentUser.name || "HR Operations",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      read: false,
    };

    const created = db.insert("announcements", newAnnouncement);

    // Also push a notification
    db.insert("notifications", {
      id: Date.now() + 1,
      type: "system",
      message: `New announcement: ${newAnnouncement.title}`,
      time: "Just now",
      read: false,
    });

    res.status(201).json({ success: true, data: created, message: "Announcement published successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = (req, res) => {
  try {
    const updated = db.update("announcements", req.params.id, { read: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.json({ success: true, data: updated, message: "Announcement marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
