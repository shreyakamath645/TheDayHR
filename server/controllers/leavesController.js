// server/controllers/leavesController.js
import { db } from "../data/db.js";

export const getBalances = (req, res) => {
  try {
    const balances = db.get("leaveBalances") || {};
    res.json({ success: true, data: balances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRequests = (req, res) => {
  try {
    let requests = db.get("leaveRequests") || [];
    const { status, employee } = req.query;

    if (status && status !== "All") {
      requests = requests.filter((r) => r.status.toLowerCase() === status.toLowerCase());
    }

    if (employee) {
      requests = requests.filter((r) => r.employee.toLowerCase().includes(employee.toLowerCase()));
    }

    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyLeave = (req, res) => {
  try {
    const { type, dates, reason, employee, department } = req.body;
    if (!dates || !reason) {
      return res.status(400).json({ success: false, message: "Dates and reason are required" });
    }

    const currentUser = db.get("user") || {};
    const newRequest = {
      id: `lv-${Date.now()}`,
      employee: employee || currentUser.name || "Shreya Kamath",
      department: department || currentUser.department || "Human Resources",
      type: type || "Casual Leave",
      dates,
      reason,
      status: "Pending",
      appliedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };

    const created = db.insert("leaveRequests", newRequest);

    // Update user's leave balance
    const categoryKey = (type || "").toLowerCase().includes("sick")
      ? "sick"
      : (type || "").toLowerCase().includes("casual")
      ? "casual"
      : "paid";

    const balances = db.get("leaveBalances") || {};
    if (balances[categoryKey]) {
      balances[categoryKey].used += 1;
      balances[categoryKey].remaining = Math.max(0, balances[categoryKey].remaining - 1);
      db.set("leaveBalances", balances);
    }

    // Add a notification for HR
    const newNotif = {
      id: Date.now(),
      type: "task",
      message: `Leave application submitted by ${newRequest.employee} (${newRequest.type})`,
      time: "Just now",
      read: false,
    };
    db.insert("notifications", newNotif);

    res.status(201).json({
      success: true,
      data: created,
      updatedBalances: balances,
      message: "Leave applied successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRequestStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Approved" | "Rejected" | "Pending"

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const request = db.findById("leaveRequests", id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Leave request not found" });
    }

    const prevStatus = request.status;
    const updated = db.update("leaveRequests", id, { status });

    // If changing from Pending/Approved to Rejected, restore balance
    if (status === "Rejected" && prevStatus !== "Rejected") {
      const categoryKey = (request.type || "").toLowerCase().includes("sick")
        ? "sick"
        : (request.type || "").toLowerCase().includes("casual")
        ? "casual"
        : "paid";

      const balances = db.get("leaveBalances") || {};
      if (balances[categoryKey] && balances[categoryKey].used > 0) {
        balances[categoryKey].used -= 1;
        balances[categoryKey].remaining += 1;
        db.set("leaveBalances", balances);
      }
    }

    res.json({
      success: true,
      data: updated,
      message: `Leave request has been ${status.toLowerCase()}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
