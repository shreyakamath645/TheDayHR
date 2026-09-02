// src/components/Topbar/Topbar.jsx
// Top navigation bar with search, notifications, settings, and profile

import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  AtSign,
  Video,
  MessageSquare,
  CheckSquare,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Topbar.module.css";

const PAGE_TITLES = {
  "/":           "Dashboard",
  "/chat":       "Chat",
  "/meetings":   "Meetings",
  "/employees":  "Employees",
  "/calendar":   "Calendar",
  "/files":      "Files",
  "/analytics":  "Analytics",
  "/settings":   "Settings",
  "/help":       "Help & Support",
};

const NOTIF_ICONS = {
  mention: AtSign,
  meeting: Video,
  message: MessageSquare,
  task:    CheckSquare,
  system:  AlertCircle,
};

const Topbar = () => {
  const {
    user,
    notifs,
    unreadCount,
    markAllRead,
    markRead,
    searchQuery,
    setSearchQuery,
    notifPanelOpen,
    setNotifPanelOpen,
  } = useApp();

  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "TheDayHR";

  const toggleNotif = () => setNotifPanelOpen((o) => !o);
  const closeNotif  = () => setNotifPanelOpen(false);

  return (
    <header className={styles.topbar} role="banner">
      {/* Page Title */}
      <span className={styles.pageTitle}>{title}</span>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <Search size={15} />
        </span>
        <input
          id="topbar-search"
          type="text"
          className={styles.searchInput}
          placeholder="Search employees, chats, meetings…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Global search"
          autoComplete="off"
        />
      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        {/* Notification Bell */}
        <button
          id="notif-btn"
          className={`${styles.iconBtn} ${notifPanelOpen ? styles.active : ""}`}
          onClick={toggleNotif}
          aria-label={`Notifications – ${unreadCount} unread`}
          title="Notifications"
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span className={styles.notifBadge} aria-hidden="true">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          id="settings-btn"
          className={styles.iconBtn}
          aria-label="Settings"
          title="Settings"
        >
          <Settings size={19} />
        </button>

        <span className={styles.divider} aria-hidden="true" />

        {/* Profile */}
        <button
          id="profile-chip"
          className={styles.profileChip}
          aria-label="Open profile menu"
        >
          <Avatar initials={user.initials} status={user.status} size="md" />
          <span className={styles.profileName}>{user.name.split(" ")[0]}</span>
          <ChevronDown size={13} color="#94a3b8" />
        </button>
      </div>

      {/* Notification Panel */}
      {notifPanelOpen && (
        <>
          <div className={styles.notifOverlay} onClick={closeNotif} />
          <div className={styles.notifPanel} role="dialog" aria-label="Notifications">
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </span>
              <button className={styles.markAllBtn} onClick={markAllRead}>
                Mark all as read
              </button>
            </div>

            <ul className={styles.notifList} role="list">
              {notifs.map((n) => {
                const Icon = NOTIF_ICONS[n.type] || AlertCircle;
                return (
                  <li
                    key={n.id}
                    className={`${styles.notifItem} ${!n.read ? styles.unread : ""}`}
                    onClick={() => markRead(n.id)}
                    role="listitem"
                  >
                    <span className={`${styles.notifIconWrap} ${styles[n.type]}`}>
                      <Icon size={16} />
                    </span>
                    <div className={styles.notifContent}>
                      <p className={styles.notifMsg}>{n.message}</p>
                      <span className={styles.notifTime}>{n.time}</span>
                    </div>
                    {!n.read && <span className={styles.unreadDot} />}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Topbar;
