// src/components/Sidebar/Sidebar.jsx
// Microsoft Teams-inspired collapsible sidebar navigation

import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Users,
  Calendar,
  FolderOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  path: "/",          icon: LayoutDashboard, badge: null },
  { id: "chat",       label: "Chat",        path: "/chat",      icon: MessageSquare,   badge: 3    },
  { id: "meetings",   label: "Meetings",    path: "/meetings",  icon: Video,           badge: null },
  { id: "employees",  label: "Employees",   path: "/employees", icon: Users,           badge: null },
  { id: "calendar",   label: "Calendar",    path: "/calendar",  icon: Calendar,        badge: null },
  { id: "files",      label: "Files",       path: "/files",     icon: FolderOpen,      badge: null },
  { id: "analytics",  label: "Analytics",   path: "/analytics", icon: BarChart2,       badge: null },
];

const BOTTOM_ITEMS = [
  { id: "settings", label: "Settings",  path: "/settings", icon: Settings },
  { id: "help",     label: "Help",      path: "/help",     icon: HelpCircle },
];

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, user } = useApp();
  const location = useLocation();

  const toggle = () => setSidebarCollapsed((c) => !c);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""}`}>
      {/* ── Brand ── */}
      <div className={styles.brand}>
        <div className={styles.logoMark}>TD</div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>TheDayHR</span>
          <span className={styles.logoSub}>Workspace</span>
        </div>
        <button
          className={styles.toggleBtn}
          onClick={toggle}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand" : "Collapse"}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={13} />
          ) : (
            <ChevronLeft size={13} />
          )}
        </button>
      </div>

      {/* ── Main Navigation ── */}
      <nav className={styles.navSection} aria-label="Main navigation">
        <span className={styles.sectionLabel}>Main</span>

        {NAV_ITEMS.map(({ id, label, path, icon: Icon, badge }) => (
          <NavLink
            key={id}
            to={path}
            end={path === "/"}
            className={`${styles.navItem} ${isActive(path) ? styles.active : ""}`}
            data-tooltip={sidebarCollapsed ? label : undefined}
            aria-label={label}
            title={sidebarCollapsed ? label : ""}
          >
            <span className={styles.navIcon}>
              <Icon size={18} strokeWidth={isActive(path) ? 2.2 : 1.8} />
            </span>
            <span className={styles.navLabel}>{label}</span>
            {badge && <span className={styles.badge}>{badge}</span>}
          </NavLink>
        ))}

        <span className={styles.sectionLabel} style={{ marginTop: 12 }}>
          Tools
        </span>

        {BOTTOM_ITEMS.map(({ id, label, path, icon: Icon }) => (
          <NavLink
            key={id}
            to={path}
            className={`${styles.navItem} ${isActive(path) ? styles.active : ""}`}
            data-tooltip={sidebarCollapsed ? label : undefined}
            aria-label={label}
            title={sidebarCollapsed ? label : ""}
          >
            <span className={styles.navIcon}>
              <Icon size={18} strokeWidth={1.8} />
            </span>
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── User Profile ── */}
      <div className={styles.userSection}>
        <Avatar initials={user.initials} status={user.status} size="md" />
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole}>{user.role}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
