// src/context/AppContext.jsx
// Global state management using React Context API for TheDayhr

import { createContext, useContext, useState, useMemo } from "react";
import {
  currentUser,
  notifications,
  employees,
  todayMeetings,
  hrAnnouncements,
  recentChats,
} from "../data/dummyData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);
  const [notifs, setNotifs] = useState(notifications);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [activeMeetingRoom, setActiveMeetingRoom] = useState(null);

  // Leave Management State for HR Section
  const [leaveBalances, setLeaveBalances] = useState({
    paid: { total: 18, used: 4, remaining: 14 },
    sick: { total: 10, used: 2, remaining: 8 },
    casual: { total: 12, used: 5, remaining: 7 },
  });

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "lv-1",
      employee: "Rahul Verma",
      department: "Marketing",
      type: "Casual Leave",
      dates: "Oct 02 - Oct 04, 2026 (3 days)",
      status: "Pending",
      reason: "Family festive celebration",
      appliedOn: "Sep 28, 2026",
    },
    {
      id: "lv-2",
      employee: "Sneha Patel",
      department: "Design",
      type: "Sick Leave",
      dates: "Sep 25, 2026 (1 day)",
      status: "Approved",
      reason: "Medical checkup & rest",
      appliedOn: "Sep 24, 2026",
    },
    {
      id: "lv-3",
      employee: "Arjun Mehta",
      department: "Engineering",
      type: "Paid Leave (PTO)",
      dates: "Sep 15 - Sep 18, 2026 (4 days)",
      status: "Approved",
      reason: "Personal travel",
      appliedOn: "Sep 10, 2026",
    },
  ]);

  const applyLeave = (newRequest) => {
    const created = {
      id: `lv-${Date.now()}`,
      employee: user.name,
      department: user.department,
      status: "Pending",
      appliedOn: "Today",
      ...newRequest,
    };
    setLeaveRequests((prev) => [created, ...prev]);

    // Update user's leave balance
    const categoryKey = newRequest.type?.toLowerCase().includes("sick")
      ? "sick"
      : newRequest.type?.toLowerCase().includes("casual")
      ? "casual"
      : "paid";

    setLeaveBalances((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        used: prev[categoryKey].used + 1,
        remaining: Math.max(0, prev[categoryKey].remaining - 1),
      },
    }));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  // Global Search across entire dataset
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    const matchedEmployees = employees
      .filter((e) => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q))
      .map((e) => ({ ...e, resultType: "Employee", link: "/employees" }));

    const matchedMeetings = todayMeetings
      .filter((m) => m.title.toLowerCase().includes(q) || m.organizer.toLowerCase().includes(q))
      .map((m) => ({ ...m, resultType: "Meeting", link: "/meetings" }));

    const matchedAnnouncements = hrAnnouncements
      .filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
      .map((a) => ({ ...a, resultType: "Announcement", link: "/announcements" }));

    const matchedChats = recentChats
      .filter((c) => c.name.toLowerCase().includes(q))
      .map((c) => ({ ...c, resultType: "Chat", link: "/chat" }));

    return [
      ...matchedEmployees,
      ...matchedMeetings,
      ...matchedAnnouncements,
      ...matchedChats,
    ];
  }, [searchQuery]);

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        notifs,
        unreadCount,
        markAllRead,
        markRead,
        activeNav,
        setActiveNav,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileNavOpen,
        setMobileNavOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        notifPanelOpen,
        setNotifPanelOpen,
        profileDropdownOpen,
        setProfileDropdownOpen,
        aiAssistantOpen,
        setAiAssistantOpen,
        activeMeetingRoom,
        setActiveMeetingRoom,
        leaveBalances,
        leaveRequests,
        applyLeave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
