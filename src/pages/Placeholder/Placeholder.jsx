// src/pages/Placeholder/Placeholder.jsx
// Polished placeholder for future module integrations

import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  FolderLock,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import styles from "./Placeholder.module.css";

const META_MAP = {
  "/files": {
    icon: FileText,
    desc: "Central repository for HR policies, employee handbooks, contracts, and shared team assets.",
    tag: "Document Hub",
  },
  "/analytics": {
    icon: BarChart3,
    desc: "Real-time workforce metrics, turnover rates, engagement scores, and attendance trends.",
    tag: "Data Insights",
  },
  "/settings": {
    icon: Settings,
    desc: "Configure notification preferences, security keys, team roles, and profile settings.",
    tag: "Preferences",
  },
  "/help": {
    icon: HelpCircle,
    desc: "Access help articles, system walkthroughs, HR FAQs, and direct admin support channels.",
    tag: "Help Center",
  },
};

const Placeholder = ({ title }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const meta = META_MAP[pathname] || {
    icon: Sparkles,
    desc: "This module is actively being crafted for the upcoming TheDayHR release.",
    tag: "Coming Soon",
  };

  const IconComponent = meta.icon;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <IconComponent size={32} />
        </div>

        <span className={styles.tagBadge}>{meta.tag}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{meta.desc}</p>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/")}
            aria-label="Return to Dashboard"
          >
            <LayoutDashboard size={15} />
            <span>Return to Dashboard</span>
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/chat")}
            aria-label="Open Team Chat"
          >
            <span>Open Chat</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
