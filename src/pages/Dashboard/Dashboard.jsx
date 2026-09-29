// src/pages/Dashboard/Dashboard.jsx
// Main Home Dashboard for TheDayHR — premium layout

import { useApp } from "../../context/AppContext";
import {
  todayMeetings,
  recentChats,
  hrAnnouncements,
  employees,
} from "../../data/dummyData";

import WelcomeBanner   from "../../components/Dashboard/WelcomeBanner/WelcomeBanner";
import StatsCards      from "../../components/Dashboard/StatsCards";
import QuickActions    from "../../components/Dashboard/QuickActions/QuickActions";
import TodayMeetings   from "../../components/Dashboard/TodayMeetings/TodayMeetings";
import RecentChats     from "../../components/Dashboard/RecentChats/RecentChats";
import HRAnnouncements from "../../components/Dashboard/HRAnnouncements/HRAnnouncements";
import OnlineEmployees from "../../components/Dashboard/OnlineEmployees/OnlineEmployees";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useApp();

  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Stats Cards */}
      <StatsCards />

      {/* 3. Quick Actions */}
      <QuickActions />

      {/* 4. Two-Column: Meetings + Chats */}
      <div className={styles.twoColumnGrid}>
        <div className={styles.columnItem}>
          <TodayMeetings meetings={todayMeetings} />
        </div>
        <div className={styles.columnItem}>
          <RecentChats chats={recentChats} />
        </div>
      </div>

      {/* 5. Three-Column: Announcements + Online + Spacer */}
      <div className={styles.bottomGrid}>
        <div className={styles.announcementsCol}>
          <HRAnnouncements announcements={hrAnnouncements} />
        </div>
        <div className={styles.onlineCol}>
          <OnlineEmployees employees={employees} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
