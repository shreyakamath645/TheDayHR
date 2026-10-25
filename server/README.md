# TheDayHR Backend API Server

A modular, production-ready REST API built with Node.js and Express to power **TheDayHR** Enterprise Workplace & Human Resource Management Platform.

## 🚀 Features

- **Authentication & User Profile**: Retrieve current user, update profile information, and toggle online/away/busy status.
- **Employee Directory**: Full CRUD operations with department, status, and full-text keyword search filters.
- **Attendance Management**: Real-time clock-in / clock-out tracking, worked hours computation, and attendance log history.
- **Leave Management (HR Hub)**: Leave balance monitoring (Paid, Sick, Casual), leave requests workflow (apply, approve, reject).
- **Meetings & Calls**: Schedule meetings, filter by status (Starting Soon, Live, Scheduled), participant management.
- **Chat & Channels**: Channels, direct chats, message persistence, unread counters, and instant messaging.
- **Teams & Collaboration**: Categories (Engineering, Design, HR, Marketing, Finance), channel discussions, team member lists.
- **HR & Company Announcements**: Categorized announcements (Benefits, Policy, Events, Culture), priority flags, read receipts.
- **Notification System**: User notifications across system events, mentions, leave updates, and meeting reminders.
- **Dashboard Overview & Stats**: Consolidated metrics endpoints for fast initial page load and high responsiveness.
- **Calendar Events**: Month grid events, agenda sync, and custom scheduling.
- **Documents & Files Registry**: Company handbooks, policy guides, benefits kits, categorized by folder.
- **Smart HR AI Assistant**: Instant conversational answers for leave balances, insurance claims, remote work hours, and employee lookups.
- **JSON File-Backed Persistence**: Zero-setup, persistent JSON database engine (`server/data/db.json`) with auto-seeding.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend API Server
```bash
npm run server
```
Or with auto-restart on changes:
```bash
npm run server:dev
```
The server will start on `http://localhost:5000`.

### 3. Start Frontend with Proxy
```bash
npm run dev
```
Vite automatically proxies all `/api/*` requests from `http://localhost:5173` to `http://localhost:5000`.

---

## 📡 API Reference

### Health Check
- `GET /api/health` — Verify API server status

### Auth & Profile
- `GET /api/auth/me` — Current user profile
- `PUT /api/auth/profile` — Update user profile fields (`name`, `email`, `phone`, `location`, `department`, `role`)
- `PATCH /api/auth/status` — Update user status (`online`, `away`, `busy`, `offline`)

### Employees
- `GET /api/employees` — List employees (query params: `?search=`, `?department=`, `?status=`)
- `GET /api/employees/:id` — Get employee by ID
- `POST /api/employees` — Add employee
- `PUT /api/employees/:id` — Update employee details
- `DELETE /api/employees/:id` — Delete employee

### Attendance
- `GET /api/attendance/today` — Today's check-in / check-out status
- `POST /api/attendance/check-in` — Check in (`workMode`)
- `POST /api/attendance/check-out` — Check out & log hours
- `GET /api/attendance/history` — Weekly/monthly attendance history

### Leave Management
- `GET /api/leaves/balances` — Leave balance stats (Paid, Sick, Casual)
- `GET /api/leaves/requests` — List leave requests (query: `?status=`, `?employee=`)
- `POST /api/leaves/apply` — Apply for leave (`type`, `dates`, `reason`)
- `PATCH /api/leaves/requests/:id/status` — Approve or reject leave (`status: "Approved" | "Rejected"`)

### Meetings
- `GET /api/meetings` — List meetings (query: `?status=`, `?search=`, `?type=`)
- `GET /api/meetings/:id` — Get meeting by ID
- `POST /api/meetings` — Schedule new meeting
- `PUT /api/meetings/:id` — Update meeting
- `DELETE /api/meetings/:id` — Cancel meeting

### Chats & Messaging
- `GET /api/chats` — List all conversations
- `GET /api/chats/:id/messages` — Fetch message history for chat ID
- `POST /api/chats/:id/messages` — Send message (`text`, `sender`)
- `PATCH /api/chats/:id/read` — Mark conversation as read

### Teams & Channels
- `GET /api/teams/categories` — Department categories
- `GET /api/teams/channels` — List channels (query: `?category=`, `?search=`)
- `POST /api/teams/channels` — Create new channel (`title`, `category`, `department`, `description`)
- `GET /api/teams/members` — Team members directory

### Announcements
- `GET /api/announcements` — List announcements (query: `?category=`, `?search=`)
- `POST /api/announcements` — Publish new announcement
- `PATCH /api/announcements/:id/read` — Mark announcement as read

### Notifications
- `GET /api/notifications` — List notifications & unread count
- `PATCH /api/notifications/:id/read` — Mark notification read
- `POST /api/notifications/mark-all-read` — Mark all notifications read

### Dashboard & Analytics
- `GET /api/dashboard/stats` — Metrics cards (Employees, Online, Meetings, Pending Tasks)
- `GET /api/dashboard/overview` — Consolidated bundle for instant page load

### Calendar
- `GET /api/calendar/events` — Calendar events
- `POST /api/calendar/events` — Create calendar event (`title`, `day`, `time`, `type`)
- `DELETE /api/calendar/events/:id` — Remove event

### Documents & Files
- `GET /api/files` — Documents list (query: `?folder=`, `?search=`)
- `POST /api/files` — Upload/register document
- `DELETE /api/files/:id` — Delete document

### AI Assistant
- `POST /api/ai/chat` — HR smart query (`message`)
