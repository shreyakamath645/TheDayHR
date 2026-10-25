// server/data/db.js
// Lightweight JSON file-backed database engine with atomic writes and auto-seeding

import fs from "fs";
import path from "path";
import { config } from "../config/config.js";
import { initialData } from "./initialData.js";

class Database {
  constructor() {
    this.filePath = config.dbPath;
    this.data = {};
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        this.data = JSON.parse(raw);
      } else {
        // Deep clone initial data
        this.data = JSON.parse(JSON.stringify(initialData));
        this.save();
      }
    } catch (err) {
      console.error("[Database] Error loading db.json, falling back to initialData:", err.message);
      this.data = JSON.parse(JSON.stringify(initialData));
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("[Database] Error persisting data:", err.message);
    }
  }

  get(collection) {
    return this.data[collection];
  }

  set(collection, value) {
    this.data[collection] = value;
    this.save();
    return this.data[collection];
  }

  findById(collection, id) {
    const list = this.data[collection];
    if (!Array.isArray(list)) return null;
    return list.find((item) => String(item.id) === String(id)) || null;
  }

  insert(collection, item) {
    if (!Array.isArray(this.data[collection])) {
      this.data[collection] = [];
    }
    const newItem = {
      id: item.id || Date.now(),
      ...item,
    };
    this.data[collection].unshift(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    const list = this.data[collection];
    if (!Array.isArray(list)) return null;

    const index = list.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    this.save();
    return list[index];
  }

  delete(collection, id) {
    const list = this.data[collection];
    if (!Array.isArray(list)) return false;

    const index = list.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return false;

    list.splice(index, 1);
    this.save();
    return true;
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.save();
    return this.data;
  }
}

export const db = new Database();
