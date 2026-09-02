// src/components/Dashboard/TodayMeetings/TodayMeetings.jsx
// Today's Meetings component with Teams video icon, participant avatars, and Join action

import { useNavigate } from "react-router-dom";
import { FiVideo, FiExternalLink } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import Avatar from "../../Avatar/Avatar";
import styles from "./TodayMeetings.module.css";

const TodayMeetings = ({ meetings = [] }) => {
  const navigate = useNavigate();

  // Take 3 meetings
  const displayMeetings = meetings.slice(0, 3);

  const handleJoin = (meeting, e) => {
    e.stopPropagation();
    alert(`Launching Microsoft Teams meeting: "${meeting.title}"`);
  };

  return (
    <section className={styles.container} aria-label="Today's Meetings">
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.headerIconBox}>
            <HiOutlineVideoCamera className={styles.headerIcon} />
          </span>
          <div>
            <h2 className={styles.title}>Today's Meetings</h2>
            <span className={styles.subtitle}>Scheduled team video calls & reviews</span>
          </div>
        </div>
        <button
          className={styles.viewAllBtn}
          onClick={() => navigate("/meetings")}
          aria-label="View all meetings"
        >
          <span>View calendar</span>
          <FiExternalLink className={styles.linkIcon} />
        </button>
      </div>

      <div className={styles.meetingsList}>
        {displayMeetings.map((meeting) => (
          <div key={meeting.id} className={styles.meetingCard}>
            {/* Left Time Box */}
            <div className={styles.timeBox}>
              <span className={styles.timeLabel}>TODAY</span>
              <span className={styles.startTime}>{meeting.time.split("–")[0].trim()}</span>
              <span className={styles.duration}>{meeting.duration}</span>
            </div>

            {/* Middle Info */}
            <div className={styles.meetingDetails}>
              <div className={styles.titleRow}>
                <h3 className={styles.meetingTitle}>{meeting.title}</h3>
                <span
                  className={`${styles.statusBadge} ${
                    meeting.status === "Starting Soon"
                      ? styles.statusSoon
                      : meeting.status === "Upcoming"
                      ? styles.statusUpcoming
                      : styles.statusScheduled
                  }`}
                >
                  {meeting.status}
                </span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.organizer}>
                  Organized by <strong>{meeting.organizer}</strong>
                </span>
                <span className={styles.bulletDot}>•</span>
                <span className={styles.meetingType}>{meeting.type}</span>
              </div>

              {/* Participant stack */}
              <div className={styles.participantsSection}>
                <div className={styles.avatarStack}>
                  {meeting.participants.slice(0, 3).map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className={styles.stackItem}
                      style={{ zIndex: 10 - idx }}
                      title={p.name}
                    >
                      <Avatar initials={p.initials} size="sm" status={p.status} />
                    </div>
                  ))}
                  {meeting.totalParticipants > 3 && (
                    <span className={styles.extraCount}>
                      +{meeting.totalParticipants - 3}
                    </span>
                  )}
                </div>
                <span className={styles.participantText}>
                  {meeting.totalParticipants} attendees
                </span>
              </div>
            </div>

            {/* Right Join Button */}
            <div className={styles.actionCol}>
              <button
                id={`join-btn-${meeting.id}`}
                className={styles.joinBtn}
                onClick={(e) => handleJoin(meeting, e)}
                aria-label={`Join meeting ${meeting.title}`}
              >
                <FiVideo className={styles.joinIcon} />
                <span>Join</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayMeetings;
