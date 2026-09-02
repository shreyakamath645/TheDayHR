// src/components/Dashboard/HRAnnouncements/HRAnnouncements.jsx
// HR Announcements Preview component with category badges, author tags, and formatted dates

import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import styles from "./HRAnnouncements.module.css";

const HRAnnouncements = ({ announcements = [] }) => {
  return (
    <section id="announcements" className={styles.container} aria-label="HR Announcements Preview">
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.headerIconBox}>
            <HiOutlineMegaphone className={styles.headerIcon} />
          </span>
          <div>
            <h2 className={styles.title}>HR Announcements</h2>
            <span className={styles.subtitle}>Official policies, updates & organization notices</span>
          </div>
        </div>
        <span className={styles.countBadge}>{announcements.length} Updates</span>
      </div>

      <div className={styles.grid}>
        {announcements.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span
                className={`${styles.categoryTag} ${
                  item.category === "Benefits"
                    ? styles.tagBenefits
                    : item.category === "Policy"
                    ? styles.tagPolicy
                    : styles.tagEvent
                }`}
              >
                {item.category}
              </span>
              <div className={styles.dateWrap}>
                <FiCalendar className={styles.dateIcon} />
                <span>{item.date}</span>
              </div>
            </div>

            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>

            <div className={styles.cardFooter}>
              <span className={styles.author}>Posted by {item.author}</span>
              <button
                className={styles.readMoreBtn}
                aria-label={`Read more about ${item.title}`}
                onClick={() => alert(`Opening announcement: "${item.title}"`)}
              >
                <span>Read details</span>
                <FiArrowRight className={styles.arrowIcon} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HRAnnouncements;
