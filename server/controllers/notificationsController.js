// server/controllers/notificationsController.js
import { db } from "../data/db.js";

export const getNotifications = (req, res) => {
  try {
    const notifications = db.get("notifications") || [];
    const unreadCount = notifications.filter((n) => !n.read).length;
    res.json({ success: true, count: notifications.length, unreadCount, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = (req, res) => {
  try {
    const updated = db.update("notifications", req.params.id, { read: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    const notifications = db.get("notifications") || [];
    const unreadCount = notifications.filter((n) => !n.read).length;
    res.json({ success: true, data: updated, unreadCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllRead = (req, res) => {
  try {
    let notifications = db.get("notifications") || [];
    notifications = notifications.map((n) => ({ ...n, read: true }));
    db.set("notifications", notifications);
    res.json({ success: true, message: "All notifications marked as read", unreadCount: 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
