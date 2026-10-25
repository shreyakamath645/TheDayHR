// server/controllers/teamsController.js
import { db } from "../data/db.js";

export const getCategories = (req, res) => {
  try {
    const teams = db.get("teams") || { categories: [], channels: [] };
    res.json({ success: true, data: teams.categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChannels = (req, res) => {
  try {
    const teams = db.get("teams") || { categories: [], channels: [] };
    let { category, search } = req.query;
    let channels = teams.channels || [];

    if (category && category !== "all") {
      channels = channels.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.trim().toLowerCase();
      channels = channels.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: channels.length, data: channels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createChannel = (req, res) => {
  try {
    const { title, category, department, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Channel title is required" });
    }

    const cleanTitle = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newChannel = {
      id: `ch-${Date.now()}`,
      category: category || "general",
      title: cleanTitle,
      department: department || "General",
      members: "1 Member",
      activity: "Just now",
      status: "Active",
      description: description || "Channel created in TheDayHR workspace.",
    };

    const teams = db.get("teams") || { categories: [], channels: [] };
    teams.channels.unshift(newChannel);

    // Update category count
    const cat = teams.categories.find((c) => c.id === newChannel.category);
    if (cat) cat.count = (cat.count || 0) + 1;

    db.set("teams", teams);

    res.status(201).json({ success: true, data: newChannel, message: "Channel created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMembers = (req, res) => {
  try {
    const employees = db.get("employees") || [];
    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
