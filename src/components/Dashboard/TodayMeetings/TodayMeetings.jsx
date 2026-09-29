// src/components/Dashboard/TodayMeetings/TodayMeetings.jsx
// Premium Today's Meetings card — supports both passed props and local fallback data

import { useNavigate } from "react-router-dom";
import styles from "./TodayMeetings.module.css";
import { Video, Clock, Users, ArrowRight, Radio } from "lucide-react";
import Avatar from "../../Avatar/Avatar";

const LOCAL_MEETINGS = [
  {
    id: 1,
    title: "HR Daily Standup",
    time: "10:00 AM",
    duration: "30 mins",
    team: "HR Team",
    status: "Live",
    participants: [
      { initials: "AM", status: "online" },
      { initials: "DK", status: "online" },
    ],
    totalParticipants: 8,
  },
  {
    id: 2,
    title: "Recruitment Sync",
    time: "11:30 AM",
    duration: "45 mins",
    team: "Hiring Team",
    status: "Starting Soon",
    participants: [
      { initials: "SP", status: "busy" },
      { initials: "RV", status: "online" },
    ],
    totalParticipants: 5,
  },
  {
    id: 3,
    title: "Design Review",
    time: "3:00 PM",
    duration: "60 mins",
    team: "Design Team",
    status: "Upcoming",
    participants: [
      { initials: "VS", status: "online" },
    ],
    totalParticipants: 6,
  },
];

const STATUS_CONFIG = {
  "Live":          { class: "statusLive",   label: "Live" },
  "Starting Soon": { class: "statusSoon",   label: "Soon" },
  "Upcoming":      { class: "statusUpcoming", label: "Upcoming" },
  "Scheduled":     { class: "statusUpcoming", label: "Scheduled" },
  "Completed":     { class: "statusDone",   label: "Done" },
};

function TodayMeetings({ meetings }) {
  const navigate = useNavigate();
  const data = meetings?.length ? meetings : LOCAL_MEETINGS;
  const displayData = data.slice(0, 4);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Video size={18} className={styles.headerIcon} />
          <h3>Today's Meetings</h3>
        </div>
        <button className={styles.viewAll} onClick={() => navigate("/meetings")}>
          View all <ArrowRight size={13} />
        </button>
      </div>

      <div className={styles.list}>
        {displayData.map((meeting) => {
          const statusKey = meeting.status || "Upcoming";
          const statusCfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG["Upcoming"];
          const isLive = statusKey === "Live";

          return (
            <div key={meeting.id} className={`${styles.meeting} ${isLive ? styles.meetingLive : ""}`}>
              <div className={styles.meetingLeft}>
                <div className={styles.timeBlock}>
                  <Clock size={11} className={styles.clockIcon} />
                  <span>{meeting.time}</span>
                </div>
                <div className={styles.durationBlock}>{meeting.duration || "30 mins"}</div>
              </div>

              <div className={styles.meetingBody}>
                <div className={styles.meetingTop}>
                  <h4 className={styles.meetingTitle}>{meeting.title}</h4>
                  <span className={`${styles.statusBadge} ${styles[statusCfg.class]}`}>
                    {isLive && <span className={styles.liveDot} aria-hidden="true" />}
                    {statusCfg.label}
                  </span>
                </div>

                <div className={styles.meetingMeta}>
                  <span className={styles.teamName}>
                    <Users size={11} />
                    {meeting.team || meeting.type}
                  </span>
                  {meeting.participants?.length > 0 && (
                    <div className={styles.avatarStack}>
                      {meeting.participants.slice(0, 3).map((p, i) => (
                        <Avatar
                          key={i}
                          initials={p.initials}
                          status={null}
                          size="sm"
                          className={styles.stackAvatar}
                        />
                      ))}
                      {meeting.totalParticipants > 3 && (
                        <span className={styles.moreCount}>
                          +{meeting.totalParticipants - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                className={`${styles.joinBtn} ${isLive ? styles.joinBtnLive : ""}`}
                aria-label={`Join ${meeting.title}`}
              >
                <Video size={14} />
                {isLive ? "Join" : "Open"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodayMeetings;