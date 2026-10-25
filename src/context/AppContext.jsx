// src/context/AppContext.jsx
// Global state management using React Context API for TheDayhr integrated with Express API

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import {
  currentUser as defaultUser,
  notifications as defaultNotifications,
  employees,
  todayMeetings,
  hrAnnouncements,
  recentChats,
} from "../data/dummyData";
import { api } from "../services/api";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [notifs, setNotifs] = useState(defaultNotifications);
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

  // Initial Fetch from live Express Backend
  useEffect(() => {
    let isMounted = true;

    async function fetchInitialData() {
      try {
        const [userRes, notifRes, balancesRes, requestsRes] = await Promise.allSettled([
          api.auth.getProfile(),
          api.notifications.getAll(),
          api.leaves.getBalances(),
          api.leaves.getRequests(),
        ]);

        if (!isMounted) return;

        if (userRes.status === "fulfilled" && userRes.value?.data) {
          setUser(userRes.value.data);
        }
        if (notifRes.status === "fulfilled" && notifRes.value?.data) {
          setNotifs(notifRes.value.data);
        }
        if (balancesRes.status === "fulfilled" && balancesRes.value?.data) {
          setLeaveBalances(balancesRes.value.data);
        }
        if (requestsRes.status === "fulfilled" && requestsRes.value?.data) {
          setLeaveRequests(requestsRes.value.data);
        }
      } catch (err) {
        console.warn("[AppContext] Backend initial sync skipped, using local cache:", err.message);
      }
    }

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const applyLeave = async (newRequest) => {
    const createdLocal = {
      id: `lv-${Date.now()}`,
      employee: user.name,
      department: user.department,
      status: "Pending",
      appliedOn: "Today",
      ...newRequest,
    };
    setLeaveRequests((prev) => [createdLocal, ...prev]);

    // Optimistic balance update
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

    try {
      const res = await api.leaves.apply(newRequest);
      if (res?.updatedBalances) {
        setLeaveBalances(res.updatedBalances);
      }
    } catch (err) {
      console.warn("[AppContext] Failed to sync leave apply with backend:", err.message);
    }
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = async () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await api.notifications.markAllRead();
    } catch (err) {
      console.warn("[AppContext] Failed to sync markAllRead:", err.message);
    }
  };

  const markRead = async (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await api.notifications.markRead(id);
    } catch (err) {
      console.warn("[AppContext] Failed to sync markRead:", err.message);
    }
  };

  const updateUser = async (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
    try {
      await api.auth.updateProfile(updatedFields);
    } catch (err) {
      console.warn("[AppContext] Failed to sync profile update:", err.message);
    }
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
