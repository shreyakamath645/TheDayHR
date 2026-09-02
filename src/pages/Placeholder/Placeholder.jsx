// src/pages/Placeholder/Placeholder.jsx
// Generic placeholder page for routes not yet built (Day 2+)

import { useLocation } from "react-router-dom";
import styles from "./Placeholder.module.css";

const EMOJI_MAP = {
  "/chat":      { emoji: "💬", desc: "Real-time messaging with your team" },
  "/meetings":  { emoji: "📹", desc: "Schedule and join video meetings" },
  "/employees": { emoji: "👥", desc: "Browse and manage your team directory" },
  "/calendar":  { emoji: "📅", desc: "View and manage your schedule" },
  "/files":     { emoji: "📁", desc: "Access shared documents and resources" },
  "/analytics": { emoji: "📊", desc: "HR insights and workforce analytics" },
  "/settings":  { emoji: "⚙️",  desc: "Configure your workspace preferences" },
  "/help":      { emoji: "🆘",  desc: "Documentation and support resources" },
};

const Placeholder = ({ title }) => {
  const { pathname } = useLocation();
  const meta = EMOJI_MAP[pathname] || { emoji: "🚧", desc: "This page is coming soon" };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.emoji}>{meta.emoji}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{meta.desc}</p>
        <div className={styles.badge}>Coming in a future milestone</div>
      </div>
    </div>
  );
};

export default Placeholder;
