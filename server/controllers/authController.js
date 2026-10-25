// server/controllers/authController.js
import { db } from "../data/db.js";

export const getProfile = (req, res) => {
  try {
    const user = db.get("user");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = (req, res) => {
  try {
    const currentUser = db.get("user");
    const allowedFields = ["name", "email", "phone", "location", "department", "role", "avatar"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (updates.name) {
      updates.initials = updates.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }

    const updatedUser = { ...currentUser, ...updates };
    db.set("user", updatedUser);

    // Also update current user in employees list if present
    db.update("employees", currentUser.id, updates);

    res.json({ success: true, data: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = (req, res) => {
  try {
    const { status } = req.body;
    if (!["online", "away", "busy", "offline"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const currentUser = db.get("user");
    const updatedUser = { ...currentUser, status };
    db.set("user", updatedUser);
    db.update("employees", currentUser.id, { status });

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
