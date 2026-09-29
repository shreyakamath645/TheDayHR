// src/components/Dashboard/HRAnnouncements/HRAnnouncements.jsx
// Premium HR Announcements card using real dummyData with priority badges

import { useNavigate } from "react-router-dom";
import styles from "./HRAnnouncements.module.css";
import { hrAnnouncements } from "../../../data/dummyData";
import { Megaphone, ArrowRight, ChevronRight } from "lucide-react";

const PRIORITY_CONFIG = {
  Important: { class: "priorityImportant", dot: "#ef4444" },
  Event:     { class: "priorityEvent",     dot: "#8b5cf6" },
  Notice:    { class: "priorityNotice",    dot: "#3b82f6" },
  High:      { class: "priorityImportant", dot: "#ef4444" },
  New:       { class: "priorityNew",       dot: "#059669" },
};

function HRAnnouncements({ announcements: passedAnnouncements }) {
  const navigate = useNavigate();
  const data = passedAnnouncements?.length ? passedAnnouncements : hrAnnouncements;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconWrap}>
            <Megaphone size={18} />
          </div>
          <div>
            <h3>HR Announcements</h3>
            <span className={styles.headerSub}>{data.length} updates this week</span>
          </div>
        </div>
        <button className={styles.viewAll} onClick={() => navigate("/announcements")}>
          View all <ArrowRight size={13} />
        </button>
      </div>

      <div className={styles.list}>
        {data.map((item) => {
          const pCfg = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG["Notice"];
          return (
            <button key={item.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <span
                  className={styles.priorityDot}
                  style={{ background: pCfg.dot }}
                />
              </div>

              <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                  <span className={`${styles.categoryBadge} ${styles[pCfg.class]}`}>
                    {item.category || item.priority}
                  </span>
                  <span className={styles.itemDate}>{item.date}</span>
                </div>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                {item.description && (
                  <p className={styles.itemDesc}>{item.description}</p>
                )}
                {item.author && (
                  <span className={styles.itemAuthor}>— {item.author}</span>
                )}
              </div>

              <ChevronRight size={15} className={styles.itemArrow} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HRAnnouncements;