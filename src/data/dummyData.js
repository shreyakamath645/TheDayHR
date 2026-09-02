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
    status: "online",
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
  {
    id: 8,
    name: "Rohan Gupta",
    role: "DevOps Engineer",
    department: "Engineering",
    initials: "RG",
    status: "online",
    email: "rohan.gupta@thedayhr.com",
  },
  {
    id: 9,
    name: "Ananya Roy",
    role: "Talent Acquisition",
    department: "Human Resources",
    initials: "AR",
    status: "away",
    email: "ananya.roy@thedayhr.com",
  },
];

export const quickActionsData = [
  {
    id: "join-meeting",
    title: "Join Meeting",
    description: "Connect to scheduled team calls",
    iconName: "FiVideo",
    path: "/meetings",
    badge: "3 Today",
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  {
    id: "start-chat",
    title: "Start Chat",
    description: "Direct message colleagues & teams",
    iconName: "FiMessageSquare",
    path: "/chat",
    badge: "5 Active",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    id: "view-calendar",
    title: "View Calendar",
    description: "Check schedule and company events",
    iconName: "FiCalendar",
    path: "/calendar",
    badge: "Sync",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    id: "hr-announcements",
    title: "HR Announcements",
    description: "Read latest workplace updates",
    iconName: "FiMegaphone",
    path: "#announcements",
    badge: "New",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

export const todayMeetings = [
  {
    id: 1,
    title: "Q3 Performance Review Kickoff",
    organizer: "Shreya Kamath",
    time: "10:30 AM – 11:30 AM",
    duration: "60 mins",
    status: "Starting Soon",
    participants: [
      { id: 2, name: "Arjun Mehta", initials: "AM", status: "online" },
      { id: 3, name: "Sneha Patel", initials: "SP", status: "busy" },
      { id: 7, name: "Deepa Krishnan", initials: "DK", status: "online" },
    ],
    totalParticipants: 6,
    type: "Teams Video",
  },
  {
    id: 2,
    title: "New Joiner Onboarding – September Batch",
    organizer: "Deepa Krishnan",
    time: "02:00 PM – 02:45 PM",
    duration: "45 mins",
    status: "Upcoming",
    participants: [
      { id: 7, name: "Deepa Krishnan", initials: "DK", status: "online" },
      { id: 8, name: "Rohan Gupta", initials: "RG", status: "online" },
    ],
    totalParticipants: 4,
    type: "HR Induction",
  },
  {
    id: 3,
    title: "HR & Leadership Sync",
    organizer: "Vikram Singh",
    time: "04:30 PM – 05:15 PM",
    duration: "45 mins",
    status: "Scheduled",
    participants: [
      { id: 6, name: "Vikram Singh", initials: "VS", status: "online" },
      { id: 4, name: "Rahul Verma", initials: "RV", status: "online" },
      { id: 3, name: "Sneha Patel", initials: "SP", status: "busy" },
    ],
    totalParticipants: 5,
    type: "Leadership Sync",
  },
];

export const meetings = todayMeetings;

export const recentChats = [
  {
    id: 1,
    name: "Arjun Mehta",
    lastMessage: "Can you please review the updated leave policy document?",
    time: "10:42 AM",
    unread: 2,
    isGroup: false,
    avatarInitials: "AM",
    status: "online",
    role: "Software Engineer",
  },
  {
    id: 2,
    name: "Design & Marketing Sync",
    lastMessage: "Sneha: Final approved banner assets uploaded to Drive ✅",
    time: "09:15 AM",
    unread: 0,
    isGroup: true,
    avatarInitials: "DM",
    status: null,
    role: "Team Channel",
  },
  {
    id: 3,
    name: "Deepa Krishnan",
    lastMessage: "Monday onboarding schedules are set. Ready for your review.",
    time: "Yesterday",
    unread: 1,
    isGroup: false,
    avatarInitials: "DK",
    status: "online",
    role: "HR Executive",
  },
  {
    id: 4,
    name: "Vikram Singh",
    lastMessage: "September shift attendance report has been compiled.",
    time: "Yesterday",
    unread: 0,
    isGroup: false,
    avatarInitials: "VS",
    status: "online",
    role: "Operations Manager",
  },
  {
    id: 5,
    name: "All Hands - HR Updates",
    lastMessage: "Shreya: Friendly reminder - submit health insurance nominations!",
    time: "2 days ago",
    unread: 0,
    isGroup: true,
    avatarInitials: "AH",
    status: null,
    role: "Company Channel",
  },
];

export const chats = recentChats;

export const hrAnnouncements = [
  {
    id: 1,
    title: "Annual Health & Wellness Benefit Enrollment for 2026-27",
    description: "The annual window for medical insurance upgrades and flexible wellness allowances is open until September 20th.",
    date: "Sep 02, 2026",
    category: "Benefits",
    priority: "Important",
    author: "HR Benefits Desk",
  },
  {
    id: 2,
    title: "Upcoming Town Hall: Q3 Milestones & Future Roadmap",
    description: "Join leadership this Friday at 4 PM IST as we celebrate key achievements and outline goals for the upcoming quarter.",
    date: "Sep 01, 2026",
    category: "Company Event",
    priority: "Event",
    author: "Executive Operations",
  },
  {
    id: 3,
    title: "Updated Remote Work & Hybrid Workplace Guidelines",
    description: "Please review the revised policy regarding flexible core hours and office collaboration day scheduling.",
    date: "Aug 29, 2026",
    category: "Policy",
    priority: "Notice",
    author: "People & Culture",
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
