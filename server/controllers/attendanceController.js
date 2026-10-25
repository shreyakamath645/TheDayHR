// server/controllers/attendanceController.js
import { db } from "../data/db.js";

export const getTodayStatus = (req, res) => {
  try {
    const attendance = db.get("attendance") || { today: {}, history: [] };
    res.json({ success: true, data: attendance.today });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkIn = (req, res) => {
  try {
    const attendance = db.get("attendance") || { today: {}, history: [] };
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updatedToday = {
      isCheckedIn: true,
      checkInTime: timeStr,
      checkOutTime: null,
      status: "On Time",
      workMode: req.body.workMode || "Office - HQ Bengaluru",
      date: now.toISOString().split("T")[0],
    };

    attendance.today = updatedToday;
    db.set("attendance", attendance);

    res.json({
      success: true,
      data: updatedToday,
      message: `Checked in successfully at ${timeStr}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkOut = (req, res) => {
  try {
    const attendance = db.get("attendance") || { today: {}, history: [] };
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const today = attendance.today || {};
    today.isCheckedIn = false;
    today.checkOutTime = timeStr;

    // Add to history if checkInTime exists
    const dateStr = today.date || now.toISOString().split("T")[0];
    const historyEntry = {
      date: dateStr,
      checkIn: today.checkInTime || "09:00 AM",
      checkOut: timeStr,
      hours: "8h 30m",
      status: "Present",
    };

    const existingIdx = attendance.history.findIndex((h) => h.date === dateStr);
    if (existingIdx !== -1) {
      attendance.history[existingIdx] = historyEntry;
    } else {
      attendance.history.unshift(historyEntry);
    }

    attendance.today = today;
    db.set("attendance", attendance);

    res.json({
      success: true,
      data: today,
      message: `Checked out successfully at ${timeStr}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = (req, res) => {
  try {
    const attendance = db.get("attendance") || { today: {}, history: [] };
    res.json({ success: true, data: attendance.history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
