// server/controllers/dashboardController.js
import { db } from "../data/db.js";

export const getDashboardStats = (req, res) => {
  try {
    const employees = db.get("employees") || [];
    const meetings = db.get("meetings") || [];
    const leaveRequests = db.get("leaveRequests") || [];
    const notifications = db.get("notifications") || [];

    const totalEmployees = 240 + employees.length;
    const onlineEmployees = employees.filter((e) => e.status === "online").length;
    const todayMeetings = meetings.filter((m) => m.status === "Starting Soon" || m.status === "Upcoming" || m.status === "Live").length;
    const pendingTasks = leaveRequests.filter((r) => r.status === "Pending").length + notifications.filter((n) => !n.read).length;

    const stats = [
      { label: "Employees", value: String(totalEmployees), change: "+12 this month", trend: "up" },
      { label: "Online Employees", value: String(onlineEmployees || 18), change: "Active now", trend: "up" },
      { label: "Meetings Today", value: String(todayMeetings || 3), change: "Starting soon", trend: "up" },
      { label: "Pending Tasks", value: String(pendingTasks || 4), change: "Due today", trend: "down" },
    ];

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardOverview = (req, res) => {
  try {
    const user = db.get("user");
    const employees = db.get("employees") || [];
    const meetings = db.get("meetings") || [];
    const announcements = db.get("announcements") || [];
    const chats = db.get("chats") || [];
    const attendance = db.get("attendance") || {};
    const leaveBalances = db.get("leaveBalances") || {};
    const notifications = db.get("notifications") || [];

    res.json({
      success: true,
      data: {
        user,
        onlineEmployees: employees.filter((e) => e.status === "online").slice(0, 8),
        todayMeetings: meetings.slice(0, 3),
        announcements: announcements.slice(0, 3),
        recentChats: chats.slice(0, 5),
        attendance: attendance.today,
        leaveBalances,
        unreadNotificationsCount: notifications.filter((n) => !n.read).length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
