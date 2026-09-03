// src/data/chatData.js
// Dummy data for the Chat Page — TheDayHR Day 3

// ── Chat Users / Contacts ──────────────────────────────────────────────────
export const chatUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "HR Manager",
    online: true,
    lastMessage: "Please review the leave request.",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Software Engineer",
    online: true,
    lastMessage: "Meeting starts in 15 minutes.",
    time: "09:45 AM",
    unread: 1,
  },
  {
    id: 3,
    name: "Neha Patil",
    role: "UI/UX Designer",
    online: false,
    lastMessage: "I've shared the design files.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Amit Kumar",
    role: "Finance Executive",
    online: true,
    lastMessage: "Salary slips are uploaded.",
    time: "Yesterday",
    unread: 3,
  },
];

export const messages = [
  {
    id: 1,
    sender: "Priya Sharma",
    type: "received",
    text: "Hi Shreya! Welcome to TheDayHR 👋",
    time: "10:25 AM",
  },
  {
    id: 2,
    sender: "You",
    type: "sent",
    text: "Thank you! Happy to join the team.",
    time: "10:26 AM",
  },
  {
    id: 3,
    sender: "Priya Sharma",
    type: "received",
    text: "Please complete today's onboarding tasks.",
    time: "10:28 AM",
  },
  {
    id: 4,
    sender: "You",
    type: "sent",
    text: "Sure, I'll finish them today.",
    time: "10:29 AM",
  },
];