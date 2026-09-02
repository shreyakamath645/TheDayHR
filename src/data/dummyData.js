// src/data/dummyData.js
// Central dummy data store for TheDayHR application

export const currentUser = {
  id: 1,
  name: "Shreya Kamath",
  role: "HR Manager",
  department: "Human Resources",
  avatar: null, // Will use initials fallback
  initials: "SK",
  email: "shreya.kamath@thedayhr.com",
  status: "online", // online | away | busy | offline
  notifications: 4,
};

export const employees = [
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Software Engineer",
    department: "Engineering",
    initials: "AM",
    status: "online",
    email: "arjun.mehta@thedayhr.com",
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Product Designer",
    department: "Design",
    initials: "SP",
    status: "busy",
    email: "sneha.patel@thedayhr.com",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Marketing Lead",
    department: "Marketing",
    initials: "RV",
    status: "away",
    email: "rahul.verma@thedayhr.com",
  },
  {
    id: 5,
    name: "Kavya Nair",
    role: "Finance Analyst",
    department: "Finance",
    initials: "KN",
    status: "offline",
    email: "kavya.nair@thedayhr.com",
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Operations Manager",
    department: "Operations",
    initials: "VS",
    status: "online",
    email: "vikram.singh@thedayhr.com",
  },
  {
    id: 7,
    name: "Deepa Krishnan",
    role: "HR Executive",
    department: "Human Resources",
    initials: "DK",
    status: "online",
    email: "deepa.krishnan@thedayhr.com",
  },
];

export const chats = [
  {
    id: 1,
    participants: [2],
    name: "Arjun Mehta",
    lastMessage: "Can you review the leave policy document?",
    timestamp: "10:42 AM",
    unread: 2,
    isGroup: false,
  },
  {
    id: 2,
    participants: [3, 4, 5],
    name: "Design & Marketing Sync",
    lastMessage: "Sneha: Updated the brand deck ✅",
    timestamp: "9:15 AM",
    unread: 0,
    isGroup: true,
  },
  {
    id: 3,
    participants: [6],
    name: "Vikram Singh",
    lastMessage: "Attendance report is ready for September.",
    timestamp: "Yesterday",
    unread: 0,
    isGroup: false,
  },
  {
    id: 4,
    participants: [7],
    name: "Deepa Krishnan",
    lastMessage: "New joiner onboarding is scheduled for Monday.",
    timestamp: "Yesterday",
    unread: 1,
    isGroup: false,
  },
  {
    id: 5,
    participants: [2, 3, 4, 5, 6, 7],
    name: "All Hands - HR Updates",
    lastMessage: "Shreya: Q3 performance reviews start next week!",
    timestamp: "Mon",
    unread: 0,
    isGroup: true,
  },
];

export const meetings = [
  {
    id: 1,
    title: "Q3 Performance Review Kickoff",
    organizer: "Shreya Kamath",
    participants: [2, 3, 4, 5, 6, 7],
    date: "Today",
    time: "2:00 PM – 3:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: 2,
    title: "New Joiner Onboarding – September Batch",
    organizer: "Deepa Krishnan",
    participants: [2, 3],
    date: "Today",
    time: "4:30 PM – 5:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: 3,
    title: "HR Policy Update Discussion",
    organizer: "Priya Sharma",
    participants: [6, 7],
    date: "Tomorrow",
    time: "10:00 AM – 11:00 AM",
    type: "audio",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Monthly All-Hands Meeting",
    organizer: "Vikram Singh",
    participants: [2, 3, 4, 5, 6, 7],
    date: "Sep 5, 2026",
    time: "11:00 AM – 12:00 PM",
    type: "video",
    status: "scheduled",
  },
];

export const notifications = [
  {
    id: 1,
    type: "mention",
    message: "Arjun Mehta mentioned you in Design & Marketing Sync",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "meeting",
    message: "Q3 Performance Review starts in 30 minutes",
    time: "25 min ago",
    read: false,
  },
  {
    id: 3,
    type: "message",
    message: "Deepa Krishnan sent you a message",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 4,
    type: "task",
    message: "Leave approval request from Rahul Verma is pending",
    time: "2 hrs ago",
    read: false,
  },
  {
    id: 5,
    type: "system",
    message: "September payroll processing has been completed",
    time: "Yesterday",
    read: true,
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", path: "/" },
  { id: "chat", label: "Chat", path: "/chat" },
  { id: "meetings", label: "Meetings", path: "/meetings" },
  { id: "employees", label: "Employees", path: "/employees" },
  { id: "calendar", label: "Calendar", path: "/calendar" },
  { id: "files", label: "Files", path: "/files" },
  { id: "analytics", label: "Analytics", path: "/analytics" },
];

export const dashboardStats = [
  { label: "Total Employees", value: "248", change: "+12 this month", trend: "up" },
  { label: "Present Today", value: "210", change: "84.7% attendance", trend: "up" },
  { label: "On Leave", value: "18", change: "-3 from yesterday", trend: "down" },
  { label: "Open Positions", value: "14", change: "+2 new posts", trend: "up" },
];
