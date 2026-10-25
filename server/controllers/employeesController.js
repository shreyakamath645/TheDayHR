// server/controllers/employeesController.js
import { db } from "../data/db.js";

export const getEmployees = (req, res) => {
  try {
    let list = db.get("employees") || [];
    const { search, department, status } = req.query;

    if (search) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          (e.email && e.email.toLowerCase().includes(q))
      );
    }

    if (department && department !== "All") {
      list = list.filter((e) => e.department.toLowerCase() === department.toLowerCase());
    }

    if (status && status !== "All") {
      list = list.filter((e) => e.status.toLowerCase() === status.toLowerCase());
    }

    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEmployeeById = (req, res) => {
  try {
    const employee = db.findById("employees", req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmployee = (req, res) => {
  try {
    const { name, role, department, email, phone, location, status } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: "Name and role are required" });
    }

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const newEmployee = {
      id: Date.now(),
      name,
      role,
      department: department || "Engineering",
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@thedayhr.com`,
      phone: phone || "+91 98000 00000",
      location: location || "Bengaluru",
      status: status || "online",
      initials,
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };

    const created = db.insert("employees", newEmployee);
    res.status(201).json({ success: true, data: created, message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEmployee = (req, res) => {
  try {
    const updated = db.update("employees", req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: updated, message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEmployee = (req, res) => {
  try {
    const success = db.delete("employees", req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, message: "Employee removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
