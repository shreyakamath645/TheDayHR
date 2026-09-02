// src/components/Dashboard/QuickActions/QuickActions.jsx
// Interactive Quick Action cards with icons, badges, and hover animations

import { useNavigate } from "react-router-dom";
import { FiVideo, FiMessageSquare, FiCalendar } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { BsArrowRightShort } from "react-icons/bs";
import styles from "./QuickActions.module.css";

const ACTIONS = [
  {
    id: "join-meeting",
    title: "Join Meeting",
    subtitle: "Launch active team sync",
    icon: FiVideo,
    path: "/meetings",
    badge: "Active",
    color: "#4F46E5",
    bg: "#EEF2FF",
    borderAccent: "rgba(79, 70, 229, 0.2)",
  },
  {
    id: "start-chat",
    title: "Start Chat",
    subtitle: "Send direct & group message",
    icon: FiMessageSquare,
    path: "/chat",
    badge: "5 Unread",
    color: "#059669",
    bg: "#ECFDF5",
    borderAccent: "rgba(5, 150, 105, 0.2)",
  },
  {
    id: "view-calendar",
    title: "View Calendar",
    subtitle: "Review schedule & events",
    icon: FiCalendar,
    path: "/calendar",
    badge: "Today",
    color: "#D97706",
    bg: "#FFFBEB",
    borderAccent: "rgba(217, 119, 6, 0.2)",
  },
  {
    id: "hr-announcements",
    title: "HR Announcements",
    subtitle: "Policies & company news",
    icon: HiOutlineMegaphone,
    path: "#announcements",
    badge: "New",
    color: "#7C3AED",
    bg: "#F5F3FF",
    borderAccent: "rgba(124, 58, 237, 0.2)",
  },
];

const QuickActions = ({ onActionClick }) => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
    if (action.path.startsWith("#")) {
      const element = document.getElementById(action.path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(action.path);
    }
  };

  return (
    <section className={styles.section} aria-label="Quick Actions">
      <div className={styles.grid}>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`quick-action-${action.id}`}
              className={styles.card}
              onClick={() => handleAction(action)}
              aria-label={action.title}
              type="button"
            >
              <div className={styles.cardTop}>
                <div
                  className={styles.iconBox}
                  style={{ backgroundColor: action.bg, color: action.color }}
                >
                  <Icon className={styles.actionIcon} />
                </div>
                {action.badge && (
                  <span
                    className={styles.badge}
                    style={{
                      color: action.color,
                      backgroundColor: action.bg,
                    }}
                  >
                    {action.badge}
                  </span>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionSubtitle}>{action.subtitle}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.actionPrompt} style={{ color: action.color }}>
                  Open now
                  <BsArrowRightShort className={styles.arrowIcon} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
