// src/components/Sidebar/Sidebar.jsx
// Premium TheDayhr sidebar navigation with active states, tooltips, and mobile drawer support

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  Briefcase,
  X,
  User,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Sidebar.module.css";

const PRIMARY_NAV = [
  { id: "dashboard",     label: "Home",          path: "/",             icon: LayoutDashboard },
  { id: "chat",          label: "Chat",          path: "/chat",         icon: MessageCircle,   badge: 8 },
  { id: "teams",         label: "Teams",         path: "/teams",        icon: Users },
  { id: "calendar",      label: "Calendar",      path: "/calendar",     icon: CalendarDays,    badge: 3 },
  { id: "meetings",      label: "Meetings",      path: "/meetings",     icon: Video },
  { id: "employees",     label: "Employees",     path: "/employees",    icon: UserCheck },
  { id: "announcements", label: "Announcements", path: "/announcements",icon: Megaphone },
];

const SECONDARY_NAV = [
  { id: "hr",    label: "HR Hub",        path: "/hr",    icon: Briefcase },
  { id: "files", label: "Documents",     path: "/files", icon: FolderOpen },
  { id: "help",  label: "Help & Support",path: "/help",  icon: HelpCircle },
];

function NavItem({ item, collapsed, onItemClick }) {
  const location = useLocation();
  const isActive =
    item.path === "/"
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
      onClick={onItemClick}
    >
      <span className={styles.navIconWrap}>
        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
        {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
      </span>
      {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
      {!collapsed && isActive && (
        <ChevronRight size={14} className={styles.navArrow} />
      )}
    </NavLink>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const { user, sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useApp();

  const closeMobileNav = () => setMobileNavOpen(false);

  const handleProfileClick = () => {
    navigate("/profile");
    closeMobileNav();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileNavOpen && (
        <div className={styles.mobileBackdrop} onClick={closeMobileNav} aria-hidden="true" />
      )}

      <aside
        className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""} ${
          mobileNavOpen ? styles.mobileOpen : ""
        }`}
        aria-label="Main navigation"
      >
        {/* Brand / Logo */}
        <div className={styles.brand}>
          <div className={styles.logoMark} onClick={() => { navigate("/"); closeMobileNav(); }}>
            <Sparkles size={18} strokeWidth={2.5} />
          </div>
          {!sidebarCollapsed && (
            <span
              className={styles.brandName}
              onClick={() => { navigate("/"); closeMobileNav(); }}
            >
              TheDayhr
            </span>
          )}

          {/* Close button on mobile */}
          <button
            className={styles.mobileCloseBtn}
            onClick={closeMobileNav}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Collapse Toggle for Desktop */}
        <button
          className={styles.collapseBtn}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            size={16}
            className={`${styles.collapseIcon} ${sidebarCollapsed ? styles.collapseIconRotated : ""}`}
          />
        </button>

        {/* Primary Navigation */}
        <nav className={styles.navSection} aria-label="Primary navigation">
          {!sidebarCollapsed && <span className={styles.navSectionLabel}>WORKSPACE</span>}
          {PRIMARY_NAV.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={sidebarCollapsed}
              onItemClick={closeMobileNav}
            />
          ))}
        </nav>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Secondary Navigation */}
        <nav className={styles.navSection} aria-label="HR section navigation">
          {!sidebarCollapsed && <span className={styles.navSectionLabel}>HR & TOOLS</span>}
          {SECONDARY_NAV.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              collapsed={sidebarCollapsed}
              onItemClick={closeMobileNav}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
            title={sidebarCollapsed ? "Settings" : undefined}
            aria-label="Settings"
            onClick={closeMobileNav}
          >
            <span className={styles.navIconWrap}>
              <Settings size={20} strokeWidth={1.8} />
            </span>
            {!sidebarCollapsed && <span className={styles.navLabel}>Settings</span>}
          </NavLink>

          <div
            className={styles.profileRow}
            title="View Profile"
            onClick={handleProfileClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
          >
            <Avatar initials={user?.initials || "SK"} status={user?.status || "online"} size="sm" />
            {!sidebarCollapsed && (
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>{user?.name || "Shreya Kamath"}</span>
                <span className={styles.profileRole}>{user?.role || "HR Manager"}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;