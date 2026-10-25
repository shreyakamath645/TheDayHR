// server/controllers/filesController.js
import { db } from "../data/db.js";

export const getFiles = (req, res) => {
  try {
    let files = db.get("files") || [];
    const { folder, search } = req.query;

    if (folder && folder !== "all") {
      files = files.filter((f) => f.folder.toLowerCase() === folder.toLowerCase());
    }

    if (search) {
      const q = search.trim().toLowerCase();
      files = files.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.uploader.toLowerCase().includes(q) ||
          f.type.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: files.length, data: files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadFile = (req, res) => {
  try {
    const { name, folder, size, type } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "File name is required" });
    }

    const currentUser = db.get("user") || {};
    const newFile = {
      id: Date.now(),
      name,
      folder: folder || "policies",
      size: size || "1.2 MB",
      updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      uploader: currentUser.name || "Shreya Kamath",
      type: type || name.split(".").pop().toLowerCase() || "doc",
    };

    const created = db.insert("files", newFile);
    res.status(201).json({ success: true, data: created, message: "File registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFile = (req, res) => {
  try {
    const success = db.delete("files", req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
