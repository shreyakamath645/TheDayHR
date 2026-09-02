// src/components/Dashboard/WelcomeBanner/WelcomeBanner.jsx
// Premium Microsoft Teams-inspired Welcome Banner with gradient background and live date

import { useMemo } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import styles from "./WelcomeBanner.module.css";

const WelcomeBanner = ({
  greeting = "Good Morning, Shreya 👋",
  subtitle = "Welcome back to TheDayHR.",
}) => {
  // Format current date
  const formattedDate = useMemo(() => {
    const now = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return now.toLocaleDateString("en-US", dateOptions);
  }, []);

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        {/* Left Welcome Info */}
        <div className={styles.leftCol}>
          <div className={styles.pillBadge}>
            <HiOutlineSparkles className={styles.sparkleIcon} />
            <span>HR Workspace • Overview</span>
          </div>

          <h1 className={styles.greetingTitle}>{greeting}</h1>

          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.metaRow}>
            <div className={styles.dateBadge}>
              <FiCalendar className={styles.metaIcon} />
              <span>{formattedDate}</span>
            </div>
            <div className={styles.statusPill}>
              <span className={styles.onlineDot} />
              <span>All HR systems operational</span>
            </div>
          </div>
        </div>

        {/* Right Decorative Graphic / Quick Stat Badge */}
        <div className={styles.rightCol}>
          <div className={styles.glassCard}>
            <div className={styles.glassCardHeader}>
              <span className={styles.glassIconWrap}>
                <FiClock />
              </span>
              <div>
                <span className={styles.glassLabel}>Today's Schedule</span>
                <span className={styles.glassValue}>3 Meetings Planned</span>
              </div>
            </div>
            <div className={styles.glassBar}>
              <div className={styles.glassBarFill} style={{ width: "65%" }} />
            </div>
            <span className={styles.glassFooter}>Next up: 10:30 AM Q3 Kickoff</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
