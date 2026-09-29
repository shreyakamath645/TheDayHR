// src/components/Meetings/MeetingsPage.jsx
// Enterprise Meetings & Video Calls management page

import { useState, useMemo } from "react";
import {
  Video,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Users,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { todayMeetings } from "../../data/dummyData";
import MeetingCard from "./MeetingCard";
import ScheduleModal from "./ScheduleModal";
import styles from "./MeetingsPage.module.css";

const EXTRA_MEETINGS = [
  {
    id: 101,
    title: "Engineering Architecture & Code Review",
    organizer: "Arjun Mehta",
    time: "11:30 AM – 12:15 PM",
    duration: "45 mins",
    status: "Scheduled",
    participants: [
      { id: 2, name: "Arjun Mehta", initials: "AM", status: "online" },
      { id: 8, name: "Rohan Gupta", initials: "RG", status: "online" },
    ],
    totalParticipants: 5,
    type: "Tech Review",
  },
  {
    id: 102,
    title: "Design System & UI Component Sprint",
    organizer: "Sneha Patel",
    time: "03:00 PM – 03:45 PM",
    duration: "45 mins",
    status: "Live",
    participants: [
      { id: 3, name: "Sneha Patel", initials: "SP", status: "busy" },
      { id: 1, name: "Shreya Kamath", initials: "SK", status: "online" },
    ],
    totalParticipants: 4,
    type: "Design Sprint",
  },
];

const MeetingsPage = () => {
  const [meetingsList, setMeetingsList] = useState([...todayMeetings, ...EXTRA_MEETINGS]);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'live' | 'today' | 'upcoming'
  const [searchTerm, setSearchTerm] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleScheduleNew = (newMeeting) => {
    setMeetingsList((prev) => [newMeeting, ...prev]);
  };

  const filteredMeetings = useMemo(() => {
    return meetingsList.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.organizer.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "live") {
        return (
          m.status === "Starting Soon" ||
          m.status === "Live" ||
          m.status === "Ongoing"
        );
      }
      if (activeTab === "upcoming") {
        return m.status === "Upcoming" || m.status === "Scheduled";
      }
      return true;
    });
  }, [meetingsList, activeTab, searchTerm]);

  const stats = useMemo(() => {
    const total = meetingsList.length;
    const live = meetingsList.filter(
      (m) => m.status === "Starting Soon" || m.status === "Live"
    ).length;
    const today = meetingsList.length;
    return { total, live, today };
  }, [meetingsList]);

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Meetings & Conferences</h1>
            <span className={styles.countBadge}>{stats.total} Scheduled</span>
          </div>
          <p className={styles.subtitle}>
            Join live calls, review your daily schedule, and launch new conference rooms
          </p>
        </div>

        <button
          className={styles.scheduleBtn}
          onClick={() => setIsScheduleOpen(true)}
          aria-label="Schedule new meeting"
        >
          <Plus size={16} />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {/* ── Stats Ribbon ── */}
      <div className={styles.statsRow}>
        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconIndigo}`}>
            <Calendar size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Meetings</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <Radio size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.live}</span>
            <span className={styles.statLabel}>Live / Starting Soon</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconAmber}`}>
            <Clock size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>4.5 hrs</span>
            <span className={styles.statLabel}>Total Call Time</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconPurple}`}>
            <Users size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>18+</span>
            <span className={styles.statLabel}>Collaborators</span>
          </div>
        </div>
      </div>

      {/* ── Filter Bar & Search ── */}
      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Meetings ({meetingsList.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "live" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("live")}
          >
            <span className={styles.liveIndicatorDot} />
            Live Now ({stats.live})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "upcoming" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
        </div>

        <div className={styles.searchWrapper}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search meetings or hosts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Meetings Grid ── */}
      {filteredMeetings.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Video size={32} />
          </div>
          <h3>No meetings found</h3>
          <p>There are no meetings matching your current filter criteria.</p>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setActiveTab("all");
              setSearchTerm("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={styles.meetingsGrid}>
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {/* ── Schedule Modal ── */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleScheduleNew}
      />
    </div>
  );
};

export default MeetingsPage;
