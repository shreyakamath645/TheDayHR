// src/pages/Dashboard/Dashboard.jsx
// Main Home Dashboard for TheDayHR with Microsoft Teams-inspired UI

import { useApp } from "../../context/AppContext";
import {
  todayMeetings,
  recentChats,
  hrAnnouncements,
  employees,
} from "../../data/dummyData";

// Modular Dashboard Section Components
import WelcomeBanner from "../../components/Dashboard/WelcomeBanner/WelcomeBanner";
import QuickActions from "../../components/Dashboard/QuickActions/QuickActions";
import TodayMeetings from "../../components/Dashboard/TodayMeetings/TodayMeetings";
import RecentChats from "../../components/Dashboard/RecentChats/RecentChats";
import HRAnnouncements from "../../components/Dashboard/HRAnnouncements/HRAnnouncements";
import OnlineEmployees from "../../components/Dashboard/OnlineEmployees/OnlineEmployees";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useApp();

  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. Welcome Banner */}
      <WelcomeBanner
        greeting={`Good Morning, ${user?.name?.split(" ")[0] || "Shreya"} 👋`}
        subtitle="Welcome back to TheDayHR."
      />

      {/* 2. Quick Action Cards */}
      <QuickActions />

      {/* 3 & 4. Two-Column Grid: Today's Meetings + Recent Chats Preview */}
      <div className={styles.twoColumnGrid}>
        <div className={styles.columnItem}>
          <TodayMeetings meetings={todayMeetings} />
        </div>
        <div className={styles.columnItem}>
          <RecentChats chats={recentChats} />
        </div>
      </div>

      {/* 5. HR Announcements Preview */}
      <HRAnnouncements announcements={hrAnnouncements} />

      {/* 6. Online Employees */}
      <OnlineEmployees employees={employees} />
    </div>
  );
};

export default Dashboard;
