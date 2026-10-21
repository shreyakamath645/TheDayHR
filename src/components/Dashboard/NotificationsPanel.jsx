// src/components/Dashboard/NotificationsPanel.jsx
// Notifications Panel — connected to AppContext for live notification data

import { useNavigate } from "react-router-dom";
import { Bell, AtSign, Video, MessageSquare, CheckSquare, AlertCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import styles from "./NotificationsPanel.module.css";

const ICON_MAP = {
  mention:  AtSign,
  meeting:  Video,
  message:  MessageSquare,
  task:     CheckSquare,
  system:   AlertCircle,
};

const TYPE_COLORS = {
  mention:  { bg: "#eef2ff", color: "#4f46e5" },
  meeting:  { bg: "#ecfdf5", color: "#059669" },
  message:  { bg: "#f0fdf4", color: "#16a34a" },
  task:     { bg: "#fffbeb", color: "#d97706" },
  system:   { bg: "#f1f5f9", color: "#64748b" },
};

function NotificationsPanel() {
  const navigate = useNavigate();
  const { notifs, markRead, markAllRead, unreadCount } = useApp();

  const handleClick = (n) => {
    markRead(n.id);
    if (n.type === "meeting") navigate("/meetings");
    else if (n.type === "message" || n.type === "mention") navigate("/chat");
    else navigate("/announcements");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.bellWrap}>
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className={styles.bellBadge}>{unreadCount}</span>
            )}
          </div>
          <h3>Notifications</h3>
        </div>
        {unreadCount > 0 && (
          <button className={styles.markAllBtn} onClick={markAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className={styles.list}>
        {notifs.map((n) => {
          const Icon = ICON_MAP[n.type] || AlertCircle;
          const colors = TYPE_COLORS[n.type] || TYPE_COLORS.system;
          return (
            <button
              key={n.id}
              className={`${styles.notification} ${!n.read ? styles.unread : ""}`}
              onClick={() => handleClick(n)}
              aria-label={n.message}
            >
              <span
                className={styles.iconWrap}
                style={{ background: colors.bg, color: colors.color }}
              >
                <Icon size={14} />
              </span>
              <div className={styles.content}>
                <p className={styles.message}>{n.message}</p>
                <span className={styles.time}>{n.time}</span>
              </div>
              {!n.read && <span className={styles.unreadDot} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationsPanel;