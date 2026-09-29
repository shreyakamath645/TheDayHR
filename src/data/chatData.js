// src/data/chatData.js
// Dummy data for the Chat Page — TheDayHR Day 3

// ── Chat Users / Contacts ──────────────────────────────────────────────────
const chatData = [
  {
    id: 1,
    name: "Rahul Sharma",
    message: "Can you send the report today?",
    time: "09:45 AM",
    unread: 2,
    online: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "HR Team",
    message: "Meeting starts at 11 AM.",
    time: "08:30 AM",
    unread: 0,
    online: false,
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 3,
    name: "Ananya",
    message: "Thank you 😊",
    time: "Yesterday",
    unread: 1,
    online: true,
    avatar: "https://i.pravatar.cc/150?img=30",
  },
  {
    id: 4,
    name: "Development Team",
    message: "Frontend pushed to GitHub.",
    time: "Yesterday",
    unread: 4,
    online: false,
    avatar: "https://i.pravatar.cc/150?img=40",
  },
  {
    id: 5,
    name: "Akshay",
    message: "Let's connect after lunch.",
    time: "Monday",
    unread: 0,
    online: true,
    avatar: "https://i.pravatar.cc/150?img=50",
  },
];

export default chatData;