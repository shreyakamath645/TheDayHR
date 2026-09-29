// src/components/Dashboard/QuickActions/QuickActions.jsx
// Premium Quick Actions card with icons, descriptions, and route navigation

import { useNavigate } from "react-router-dom";
import styles from "./QuickActions.module.css";
import {
  CalendarDays,
  Wallet,
  UserPlus,
  Megaphone,
  MessageCircle,
  FileText,
  Video,
  Users,
} from "lucide-react";

const actions = [
  {
    icon: Video,
    title: "Join Meeting",
    desc: "Connect to your calls",
    path: "/meetings",
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    icon: MessageCircle,
    title: "Start Chat",
    desc: "Message colleagues",
    path: "/chat",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    icon: CalendarDays,
    title: "Apply Leave",
    desc: "Submit leave request",
    path: "/calendar",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    icon: Wallet,
    title: "Payslip",
    desc: "Download payslip",
    path: "/files",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    icon: UserPlus,
    title: "Add Employee",
    desc: "Onboard new hire",
    path: "/employees",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    desc: "Latest HR updates",
    path: "/announcements",
    color: "#db2777",
    bg: "#fdf2f8",
  },
  {
    icon: Users,
    title: "View Teams",
    desc: "Manage channels",
    path: "/teams",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: FileText,
    title: "Documents",
    desc: "Access policies",
    path: "/files",
    color: "#ea580c",
    bg: "#fff7ed",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Quick Actions</h3>
        <span className={styles.headerSub}>Frequently used</span>
      </div>

      <div className={styles.grid}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={styles.actionButton}
              onClick={() => navigate(action.path)}
              aria-label={action.title}
              style={{ "--action-color": action.color, "--action-bg": action.bg }}
            >
              <div
                className={styles.iconWrap}
                style={{ background: action.bg, color: action.color }}
              >
                <Icon size={20} strokeWidth={2} />
              </div>
              <div className={styles.actionText}>
                <span className={styles.actionTitle}>{action.title}</span>
                <span className={styles.actionDesc}>{action.desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;