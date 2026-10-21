// src/pages/Dashboard/Dashboard.jsx
// Main Home Dashboard for TheDayhr — premium layout

import {
  todayMeetings,
  recentChats,
  hrAnnouncements,
  employees,
} from "../../data/dummyData";

import WelcomeBanner    from "../../components/Dashboard/WelcomeBanner/WelcomeBanner";
import StatsCards       from "../../components/Dashboard/StatsCards";
import QuickActions     from "../../components/Dashboard/QuickActions/QuickActions";
import TodayMeetings    from "../../components/Dashboard/TodayMeetings/TodayMeetings";
import RecentChats      from "../../components/Dashboard/RecentChats/RecentChats";
import HRAnnouncements  from "../../components/Dashboard/HRAnnouncements/HRAnnouncements";
import OnlineEmployees  from "../../components/Dashboard/OnlineEmployees/OnlineEmployees";
import AIAssistantCard  from "../../components/Dashboard/AIAssistantCard";
import AIAssistantModal from "../../components/Dashboard/AIAssistantModal";
import AttendanceCard   from "../../components/Dashboard/AttendanceCard";
import CalendarWidget   from "../../components/Dashboard/CalendarWidget";
import NotificationsPanel from "../../components/Dashboard/NotificationsPanel";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Stats Row */}
      <StatsCards />

      {/* 3. AI Assistant Feature Card */}
      <AIAssistantCard />

      {/* 4. Quick Actions */}
      <QuickActions />

      {/* 5. Three-Widget Row: Attendance + Calendar + Notifications */}
      <div className={styles.tripleGrid}>
        <AttendanceCard />
        <CalendarWidget />
        <NotificationsPanel />
      </div>

      {/* 6. Two-Column Grid: Meetings + Chats */}
      <div className={styles.twoColumnGrid}>
        <div className={styles.columnItem}>
          <TodayMeetings meetings={todayMeetings} />
        </div>
        <div className={styles.columnItem}>
          <RecentChats chats={recentChats} />
        </div>
      </div>

      {/* 7. Two-Column Grid: Announcements + Online Employees */}
      <div className={styles.bottomGrid}>
        <div className={styles.announcementsCol}>
          <HRAnnouncements announcements={hrAnnouncements} />
        </div>
        <div className={styles.onlineCol}>
          <OnlineEmployees employees={employees} />
        </div>
      </div>

      {/* AI Assistant Modal (global overlay) */}
      <AIAssistantModal />
    </div>
  );
};

export default Dashboard;
