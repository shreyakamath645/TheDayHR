// src/components/Dashboard/WelcomeBanner/WelcomeBanner.jsx
// Premium Welcome Banner with dynamic greeting, date, and contextual stats

import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import styles from "./WelcomeBanner.module.css";
import { CalendarDays, Video, ArrowRight, Sparkles } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function WelcomeBanner({ greeting, subtitle }) {
  const navigate = useNavigate();
  const { user, setAiAssistantOpen } = useApp();
  const firstName = user?.name?.split(" ")[0] || "Shreya";
  const greetingText = greeting || `${getGreeting()}, ${firstName} 👋`;
  const dateText = getFormattedDate();

  return (
    <div className={styles.banner}>
      {/* Decorative orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.greeting}>{greetingText}</p>
          <h1 className={styles.heading}>
            {subtitle || "Here's what's happening across TheDayhr today."}
          </h1>
          <p className={styles.subtext}>
            Stay connected, manage your team, and track everything that matters — all in one place.
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/meetings")}
              aria-label="Join Today's Meeting"
            >
              <Video size={16} />
              <span>Join Today's Meeting</span>
            </button>
            <button
              className={styles.ghostBtn}
              onClick={() => navigate("/calendar")}
              aria-label="View Schedule"
            >
              <span>View Schedule</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.dateCard}>
            <div className={styles.dateIcon}>
              <CalendarDays size={22} />
            </div>
            <div>
              <p className={styles.dateLabel}>Today</p>
              <p className={styles.dateValue}>{dateText}</p>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Meetings</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Pending Tasks</span>
            </div>
            <button
              className={`${styles.statPill} ${styles.statPillClickable}`}
              onClick={() => setAiAssistantOpen(true)}
              title="Open AI Assistant"
            >
              <Sparkles size={12} color="#a5b4fc" />
              <span className={styles.statLabel}>Ask AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;