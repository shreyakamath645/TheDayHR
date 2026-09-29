// src/components/Teams/ChannelCard.jsx
// Interactive Channel card with member count, last active timestamp, and open channel action

import { useNavigate } from "react-router-dom";
import { Users, Clock, Hash, ArrowRight, MessageSquare } from "lucide-react";
import styles from "./ChannelCard.module.css";

function ChannelCard({ title, department = "Engineering Team", members, activity, status = "Active", description }) {
  const navigate = useNavigate();

  const handleOpenChannel = () => {
    navigate("/chat");
  };

  const isReview = status === "Review";
  const isInProgress = status === "In Progress";

  return (
    <div className={styles.card} onClick={handleOpenChannel}>
      <div className={styles.top}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <Hash size={16} />
          </div>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.department}>{department}</p>
          </div>
        </div>

        <span
          className={`${styles.badge} ${
            isReview ? styles.badgeReview : isInProgress ? styles.badgeProgress : styles.badgeActive
          }`}
        >
          <span className={styles.badgeDot} />
          {status}
        </span>
      </div>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <Users size={14} className={styles.infoIcon} />
          <span>{members}</span>
        </div>

        <div className={styles.infoItem}>
          <Clock size={14} className={styles.infoIcon} />
          <span>{activity}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            handleOpenChannel();
          }}
          aria-label={`Open channel ${title}`}
        >
          <span>Open Channel</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default ChannelCard;