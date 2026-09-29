// src/components/Sidebar/Sidebar.jsx
// Premium TheDayHR sidebar navigation with active states, tooltips, and routing

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  CalendarDays,
  Video,
  UserCheck,
  Megaphone,
  FolderOpen,
  HelpCircle,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Sidebar.module.css";

const PRIMARY_NAV = [
  { id: "dashboard", label: "Dashboard",  path: "/",          icon: LayoutDashboard },
  { id: "chat",      label: "Chat",        path: "/chat",       icon: MessageCircle,   badge: 8 },
  { id: "teams",     label: "Teams",       path: "/teams",      icon: Users },
  { id: "calendar",  label: "Calendar",    path: "/calendar",   icon: CalendarDays,    badge: 3 },
  { id: "meetings",  label: "Meetings",    path: "/meetings",   icon: Video },
  { id: "employees", label: "Employees",   path: "/employees",  icon: UserCheck },
];

const SECONDARY_NAV = [
  { id: "announcements", label: "Announcements", path: "/announcements", icon: Megaphone },
  { id: "files",         label: "Documents",      path: "/files",         icon: FolderOpen },
  { id: "help",          label: "Help & Support", path: "/help",          icon: HelpCircle },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const isActive = item.path === "/"
    ? location.pathname === "/"
    : location.pathname.startsWith(item.path);
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
      title={collapsed ? item.label : undefined}
      aria-label={item.label}
      end={item.path === "/"}
    >
      <span className={styles.navIconWrap}>
        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
        {item.badge && (
          <span className={styles.navBadge}>{item.badge}</span>
        )}
      </span>
      {!collapsed && (
        <span className={styles.navLabel}>{item.label}</span>
      )}
      {!collapsed && isActive && (
        <ChevronRight size={14} className={styles.navArrow} />
      )}
    </NavLink>
  );
}

function Sidebar() {
  const { user } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      aria-label="Main navigation"
    >
      {/* Brand / Logo */}
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <Sparkles size={18} strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className={styles.brandName}>TheDayHR</span>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight
          size={16}
          className={`${styles.collapseIcon} ${collapsed ? styles.collapseIconRotated : ""}`}
        />
      </button>

      {/* Primary Navigation */}
      <nav className={styles.navSection} aria-label="Primary navigation">
        {!collapsed && (
          <span className={styles.navSectionLabel}>WORKSPACE</span>
        )}
        {PRIMARY_NAV.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Secondary Navigation */}
      <nav className={styles.navSection} aria-label="HR section navigation">
        {!collapsed && (
          <span className={styles.navSectionLabel}>HR & TOOLS</span>
        )}
        {SECONDARY_NAV.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom */}
      <div className={styles.bottomSection}>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
          }
          title={collapsed ? "Settings" : undefined}
          aria-label="Settings"
        >
          <span className={styles.navIconWrap}>
            <Settings size={20} strokeWidth={1.8} />
          </span>
          {!collapsed && <span className={styles.navLabel}>Settings</span>}
        </NavLink>

        <div className={styles.profileRow} title={user?.name}>
          <Avatar initials={user?.initials || "SK"} status={user?.status || "online"} size="sm" />
          {!collapsed && (
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{user?.name || "Shreya Kamath"}</span>
              <span className={styles.profileRole}>{user?.role || "HR Manager"}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;