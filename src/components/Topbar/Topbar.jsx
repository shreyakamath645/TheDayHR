// src/components/Topbar/Topbar.jsx
// Premium Topbar with global search dropdown, notifications, calendar, help, and user profile menu

import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  Calendar,
  HelpCircle,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Check,
  AlertCircle,
  AtSign,
  Video,
  MessageSquare,
  CheckSquare,
  FileText,
  Users,
  Megaphone,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Topbar.module.css";

const PAGE_TITLES = {
  "/":              "Dashboard",
  "/chat":          "Chat",
  "/teams":         "Teams",
  "/meetings":      "Meetings",
  "/employees":     "Employees",
  "/calendar":      "Calendar",
  "/announcements": "Announcements",
  "/hr":            "HR Hub",
  "/files":         "Documents",
  "/analytics":     "Analytics",
  "/settings":      "Settings",
  "/help":          "Help & Support",
  "/profile":       "My Profile",
};

const NOTIF_ICONS = {
  mention: AtSign,
  meeting: Video,
  message: MessageSquare,
  task:    CheckSquare,
  system:  AlertCircle,
};

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    updateUser,
    notifs,
    unreadCount,
    markAllRead,
    markRead,
    searchQuery,
    setSearchQuery,
    searchResults,
    notifPanelOpen,
    setNotifPanelOpen,
    mobileNavOpen,
    setMobileNavOpen,
  } = useApp();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const title = PAGE_TITLES[location.pathname] || "TheDayhr";

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setProfileMenuOpen(false);
        setNotifPanelOpen(false);
        setSearchFocused(false);
        setShowLogoutModal(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("topbar-search")?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNotifPanelOpen]);

  const handleSearchResultClick = (link) => {
    navigate(link);
    setSearchQuery("");
    setSearchFocused(false);
  };

  const handleStatusChange = (status) => {
    updateUser({ status });
  };

  return (
    <header className={styles.topbar} role="banner">
      {/* Left: Mobile Hamburger + Page Title */}
      <div className={styles.leftSection}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>
        <span className={styles.pageTitle}>{title}</span>
      </div>

      {/* Center: Global Search */}
      <div className={styles.searchWrapper} ref={searchRef}>
        <span className={styles.searchIcon}>
          <Search size={14} />
        </span>
        <input
          id="topbar-search"
          type="text"
          className={styles.searchInput}
          placeholder="Search people, meetings, chats, announcements…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          aria-label="Global search"
          autoComplete="off"
        />
        <span className={styles.searchShortcut}>⌘K</span>

        {/* Search Results Dropdown */}
        {searchFocused && searchQuery.trim().length >= 2 && (
          <div className={styles.searchDropdown} role="listbox">
            {searchResults && searchResults.length > 0 ? (
              <div className={styles.searchList}>
                <div className={styles.searchHeader}>Matching Results ({searchResults.length})</div>
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.searchItem}
                    onClick={() => handleSearchResultClick(item.link)}
                  >
                    <span className={styles.searchTypeTag}>{item.resultType}</span>
                    <span className={styles.searchItemText}>
                      {item.name || item.title}
                    </span>
                    <span className={styles.searchItemSub}>
                      {item.role || item.organizer || item.category || ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <AlertCircle size={18} />
                <span>No results found for "{searchQuery}"</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        {/* Calendar Shortcut */}
        <button
          className={styles.iconBtn}
          onClick={() => navigate("/calendar")}
          aria-label="Calendar"
          title="Company Calendar"
        >
          <Calendar size={18} />
        </button>

        {/* Notifications Bell */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            id="notif-btn"
            className={`${styles.iconBtn} ${notifPanelOpen ? styles.active : ""}`}
            onClick={() => setNotifPanelOpen(!notifPanelOpen)}
            aria-label={`Notifications – ${unreadCount} unread`}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className={styles.notifBadge} aria-hidden="true">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notifPanelOpen && (
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
                      onClick={() => {
                        markRead(n.id);
                        if (n.type === "meeting") navigate("/meetings");
                        else if (n.type === "message" || n.type === "mention") navigate("/chat");
                        else navigate("/announcements");
                        setNotifPanelOpen(false);
                      }}
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
          )}
        </div>

        {/* Help */}
        <button
          id="help-btn"
          className={styles.iconBtn}
          onClick={() => navigate("/help")}
          aria-label="Help"
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </button>

        <span className={styles.divider} aria-hidden="true" />

        {/* Profile Menu Trigger */}
        <div className={styles.profileWrapper} ref={profileRef}>
          <button
            id="profile-chip"
            className={`${styles.profileChip} ${profileMenuOpen ? styles.profileChipActive : ""}`}
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-label="Open profile menu"
            aria-expanded={profileMenuOpen}
          >
            <Avatar initials={user.initials} status={user.status} size="sm" />
            <span className={styles.profileName}>{user.name.split(" ")[0]}</span>
            <ChevronDown size={13} className={`${styles.arrowIcon} ${profileMenuOpen ? styles.arrowRotated : ""}`} />
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div className={styles.profileDropdown} role="menu">
              <div className={styles.profileHeader}>
                <Avatar initials={user.initials} status={user.status} size="md" />
                <div className={styles.profileHeaderInfo}>
                  <h4>{user.name}</h4>
                  <p>{user.role}</p>
                  <span className={styles.profileEmail}>{user.email}</span>
                </div>
              </div>

              {/* Status Switcher */}
              <div className={styles.statusSection}>
                <span className={styles.statusSectionLabel}>Set Status</span>
                <div className={styles.statusPills}>
                  {[
                    { id: "online", label: "Available", dotColor: "#22c55e" },
                    { id: "busy", label: "Busy", dotColor: "#ef4444" },
                    { id: "away", label: "Away", dotColor: "#f59e0b" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      className={`${styles.statusPill} ${user.status === s.id ? styles.statusPillActive : ""}`}
                      onClick={() => handleStatusChange(s.id)}
                    >
                      <span className={styles.statusDot} style={{ background: s.dotColor }} />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.menuDivider} />

              <button
                className={styles.menuItem}
                onClick={() => {
                  navigate("/profile");
                  setProfileMenuOpen(false);
                }}
                role="menuitem"
              >
                <User size={15} />
                <span>My Profile</span>
              </button>

              <button
                className={styles.menuItem}
                onClick={() => {
                  navigate("/settings");
                  setProfileMenuOpen(false);
                }}
                role="menuitem"
              >
                <Settings size={15} />
                <span>Settings</span>
              </button>

              <button
                className={styles.menuItem}
                onClick={() => {
                  setNotifPanelOpen(true);
                  setProfileMenuOpen(false);
                }}
                role="menuitem"
              >
                <Bell size={15} />
                <span>Notifications ({unreadCount})</span>
              </button>

              <div className={styles.menuDivider} />

              <button
                className={`${styles.menuItem} ${styles.logoutItem}`}
                onClick={() => {
                  setProfileMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                role="menuitem"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowLogoutModal(false)}>
          <div className={styles.logoutModal} onClick={(e) => e.stopPropagation()}>
            <h3>Sign Out of TheDayhr</h3>
            <p>Are you sure you want to end your active workspace session?</p>
            <div className={styles.modalBtns}>
              <button
                className={styles.cancelModalBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                Stay Logged In
              </button>
              <button
                className={styles.confirmLogoutBtn}
                onClick={() => {
                  setShowLogoutModal(false);
                  window.alert("You have logged out safely. Reloading workspace...");
                  window.location.reload();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
