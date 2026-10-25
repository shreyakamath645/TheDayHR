// server/index.js
// Main entry point for TheDayHR Express API Server

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/config.js";

// Import Route Handlers
import authRoutes from "./routes/authRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leavesRoutes from "./routes/leavesRoutes.js";
import meetingsRoutes from "./routes/meetingsRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import teamsRoutes from "./routes/teamsRoutes.js";
import announcementsRoutes from "./routes/announcementsRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import filesRoutes from "./routes/filesRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "TheDayHR API Backend",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/meetings", meetingsRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/files", filesRoutes);
app.use("/api/ai", aiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[TheDayHR Server Error]:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred",
  });
});

// Start Server
const server = app.listen(config.port, () => {
  console.log(`🚀 TheDayHR API Server running on port ${config.port}`);
  console.log(`🔗 Health check available at http://localhost:${config.port}/api/health`);
});

export default app;
