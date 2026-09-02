// src/pages/Dashboard/Dashboard.jsx
// Main HRMS dashboard — stats, meetings, chat preview, activity feed

import { useNavigate } from "react-router-dom";
import {
  Users, UserCheck, Umbrella, Briefcase,
  TrendingUp, TrendingDown, Video, MessageSquare,
  Calendar, FileText, UserPlus, Send, Clock,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { meetings, chats, employees, dashboardStats } from "../../data/dummyData";
import Avatar from "../../components/Avatar/Avatar";
import styles from "./Dashboard.module.css";

const STAT_ICONS = [
  { icon: Users,     bg: "#eef2ff", color: "#4F46E5" },
  { icon: UserCheck, bg: "#f0fdf4", color: "#16a34a" },
  { icon: Umbrella,  bg: "#fff7ed", color: "#ea580c" },
  { icon: Briefcase, bg: "#fdf2f8", color: "#db2777" },
];

const QUICK_ACTIONS = [
  { label: "New Meeting",  icon: Video,     bg: "#eef2ff", color: "#4F46E5" },
  { label: "Send Message", icon: Send,      bg: "#f0fdf4", color: "#16a34a" },
  { label: "Add Employee", icon: UserPlus,  bg: "#fff7ed", color: "#ea580c" },
  { label: "Schedule",     icon: Calendar,  bg: "#fdf2f8", color: "#db2777" },
];

const ACTIVITY = [
  { text: <><strong>Arjun Mehta</strong> submitted a leave request for Sep 5–7</>, time: "2 min ago",  dot: "" },
  { text: <><strong>Deepa Krishnan</strong> completed onboarding for Raj Kumar</>,  time: "18 min ago", dot: "green" },
  { text: <><strong>Payroll</strong> for August has been approved and processed</>,   time: "1 hr ago",  dot: "green" },
  { text: <><strong>Sneha Patel</strong> updated the Q3 design assets</>,            time: "3 hrs ago", dot: "orange" },
  { text: <><strong>3 new applications</strong> received for Frontend Engineer role</>, time: "5 hrs ago", dot: "" },
  { text: <><strong>Rahul Verma</strong> marked attendance as remote – WFH</>,       time: "Yesterday", dot: "orange" },
];

const Dashboard = () => {
  const { user } = useApp();
  const navigate  = useNavigate();

  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const todayMtgs = meetings.filter((m) => m.date === "Today");

  return (
    <div>
      {/* ── Greeting ── */}
      <section className={styles.greeting} aria-label="Greeting">
        <h1 className={styles.greetTitle}>
          {greeting}, {user.name.split(" ")[0]}! 👋
        </h1>
        <p className={styles.greetSub}>
          It's a great day to manage your team. You have{" "}
          <strong>{todayMtgs.length} meetings</strong> scheduled today.
        </p>
      </section>

      {/* ── Quick Actions ── */}
      <div className={styles.quickActions} role="toolbar" aria-label="Quick actions">
        {QUICK_ACTIONS.map(({ label, icon: Icon, bg, color }) => (
          <button
            key={label}
            id={`qa-${label.toLowerCase().replace(/\s/g, "-")}`}
            className={styles.qaBtn}
            aria-label={label}
          >
            <span className={styles.qaIcon} style={{ background: bg, color }}>
              <Icon size={20} />
            </span>
            <span className={styles.qaLabel}>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Stats Cards ── */}
      <section aria-label="HR Statistics">
        <div className={styles.statsGrid}>
          {dashboardStats.map((stat, i) => {
            const { icon: Icon, bg, color } = STAT_ICONS[i];
            const isUp = stat.trend === "up";
            return (
              <div
                key={stat.label}
                id={`stat-card-${i}`}
                className={styles.statCard}
                role="region"
                aria-label={stat.label}
              >
                <div className={styles.statHeader}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statIconWrap} style={{ background: bg, color }}>
                    <Icon size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div
                  className={`${styles.statChange} ${
                    isUp ? styles.changeUp : styles.changeDown
                  }`}
                >
                  {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Two Column ── */}
      <div className={styles.twoCol}>
        {/* Today's Meetings */}
        <section className={styles.card} aria-label="Today's meetings">
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <span className={styles.cardTitleIcon}><Video size={16} /></span>
              Today's Meetings
            </span>
            <button className={styles.viewAllBtn} onClick={() => navigate("/meetings")}>
              View all
            </button>
          </div>
          <ul className={styles.meetingList}>
            {meetings.map((m) => {
              const [startTime] = m.time.split("–");
              return (
                <li key={m.id} className={styles.meetingItem}>
                  <div className={styles.meetingTime}>
                    <span className={styles.meetingDate}>{m.date}</span>
                    <span className={styles.meetingHour}>{startTime.trim()}</span>
                  </div>
                  <div className={styles.meetingInfo}>
                    <div className={styles.meetingTitle}>{m.title}</div>
                    <div className={styles.meetingOrg}>
                      <Clock size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />
                      {m.time} · Organized by {m.organizer}
                    </div>
                  </div>
                  {m.date === "Today" && (
                    <button className={styles.meetingJoin} aria-label={`Join ${m.title}`}>
                      Join
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Recent Chats */}
        <section className={styles.card} aria-label="Recent chats">
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <span className={styles.cardTitleIcon}><MessageSquare size={16} /></span>
              Recent Chats
            </span>
            <button className={styles.viewAllBtn} onClick={() => navigate("/chat")}>
              View all
            </button>
          </div>
          <ul className={styles.chatList}>
            {chats.map((c) => {
              const emp = employees.find((e) => e.id === c.participants[0]);
              return (
                <li key={c.id} className={styles.chatItem}>
                  <Avatar
                    initials={c.isGroup ? c.name.slice(0, 2).toUpperCase() : (emp?.initials ?? "??")}
                    status={c.isGroup ? null : emp?.status}
                    size="md"
                  />
                  <div className={styles.chatMeta}>
                    <div className={styles.chatName}>{c.name}</div>
                    <div className={styles.chatMsg}>{c.lastMessage}</div>
                  </div>
                  <div className={styles.chatRight}>
                    <span className={styles.chatTime}>{c.timestamp}</span>
                    {c.unread > 0 && (
                      <span className={styles.chatUnread}>{c.unread}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* ── Activity Feed ── */}
      <section className={styles.card} aria-label="Recent activity">
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>
            <span className={styles.cardTitleIcon}><FileText size={16} /></span>
            Recent Activity
          </span>
        </div>
        <ul className={styles.activityList}>
          {ACTIVITY.map((a, i) => (
            <li key={i} className={styles.activityItem}>
              <div className={styles.activityLine}>
                <span className={`${styles.activityDot} ${styles[a.dot]}`} />
                {i < ACTIVITY.length - 1 && (
                  <span className={styles.activityConnector} />
                )}
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>{a.text}</p>
                <span className={styles.activityTime}>{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
