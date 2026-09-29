// src/components/Dashboard/WelcomeBanner/WelcomeBanner.jsx
// Premium Welcome Banner with dynamic greeting, date, and contextual stats

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
  const { user } = useApp();
  const firstName = user?.name?.split(" ")[0] || "Shreya";
  const greetingText = greeting || `${getGreeting()}, ${firstName}! 👋`;
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
            {subtitle || "Your workspace is ready"}
          </h1>
          <p className={styles.subtext}>
            Stay connected, manage your team, and track everything that matters — all in one place.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              <Video size={16} />
              Join Today's Meeting
            </button>
            <button className={styles.ghostBtn}>
              View Schedule
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
              <span className={styles.statNum}>5</span>
              <span className={styles.statLabel}>Tasks</span>
            </div>
            <div className={styles.statPill}>
              <Sparkles size={12} />
              <span className={styles.statLabel}>AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;