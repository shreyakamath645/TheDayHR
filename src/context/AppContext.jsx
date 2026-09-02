// src/context/AppContext.jsx
// Global state management using React Context API

import { createContext, useContext, useState } from "react";
import { currentUser, notifications } from "../data/dummyData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user] = useState(currentUser);
  const [notifs, setNotifs] = useState(notifications);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notifs,
        unreadCount,
        markAllRead,
        markRead,
        activeNav,
        setActiveNav,
        sidebarCollapsed,
        setSidebarCollapsed,
        searchQuery,
        setSearchQuery,
        notifPanelOpen,
        setNotifPanelOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
