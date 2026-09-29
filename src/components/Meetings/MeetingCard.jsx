// src/components/Meetings/MeetingCard.jsx
// Detailed meeting card with participant stack, live status, and join meeting flow

import { useState } from "react";
import { Video, Clock, Users, Link2, Check, ExternalLink, Calendar as CalIcon } from "lucide-react";
import Avatar from "../Avatar/Avatar";
import styles from "./MeetingCard.module.css";

const MeetingCard = ({ meeting }) => {
  const [copied, setCopied] = useState(false);
  const [joining, setJoining] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://meet.thedayhr.com/room/${meeting.id || "sync"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      window.alert(`Launching TheDayHR Video Room for: "${meeting.title}"`);
    }, 600);
  };

  const isLive =
    meeting.status === "Starting Soon" ||
    meeting.status === "Live" ||
    meeting.status === "Ongoing";

  return (
    <div className={`${styles.card} ${isLive ? styles.cardLive : ""}`}>
      <div className={styles.header}>
        <div className={styles.typeBadge}>
          <Video size={13} />
          <span>{meeting.type || "Teams Video"}</span>
        </div>

        <span
          className={`${styles.statusBadge} ${
            isLive ? styles.statusLive : styles.statusScheduled
          }`}
        >
          {isLive && <span className={styles.pulseDot} />}
          {meeting.status}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{meeting.title}</h3>
        <p className={styles.organizer}>
          Organized by <strong>{meeting.organizer}</strong>
        </p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Clock size={14} className={styles.metaIcon} />
            <span>{meeting.time}</span>
          </div>
          <div className={styles.durationPill}>{meeting.duration}</div>
        </div>

        {/* Participants Avatar Stack */}
        <div className={styles.participantsSection}>
          <div className={styles.avatarStack}>
            {meeting.participants &&
              meeting.participants.slice(0, 3).map((p, i) => (
                <div
                  key={p.id || i}
                  className={styles.stackedAvatar}
                  style={{ zIndex: 10 - i }}
                  title={p.name}
                >
                  <Avatar
                    name={p.name}
                    initials={p.initials}
                    size="sm"
                    status={p.status}
                    showStatus={false}
                  />
                </div>
              ))}
            {meeting.totalParticipants > 3 && (
              <div className={styles.avatarOverflow}>
                +{meeting.totalParticipants - 3}
              </div>
            )}
          </div>
          <span className={styles.attendeesCount}>
            {meeting.totalParticipants || (meeting.participants?.length ?? 1)} attendees
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.joinBtn} ${isLive ? styles.joinBtnLive : ""}`}
          onClick={handleJoin}
          disabled={joining}
          aria-label={`Join meeting ${meeting.title}`}
        >
          <Video size={15} />
          <span>{joining ? "Connecting..." : isLive ? "Join Now" : "Join Room"}</span>
        </button>

        <button
          className={styles.copyBtn}
          onClick={handleCopyLink}
          title="Copy Meeting Link"
          aria-label="Copy meeting link"
        >
          {copied ? <Check size={14} color="#10b981" /> : <Link2 size={14} />}
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
