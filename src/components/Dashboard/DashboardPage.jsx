// src/components/Dashboard/DashboardPage.jsx
// Legacy Dashboard layout — kept for reference. Active dashboard is at pages/Dashboard/Dashboard.jsx

import WelcomeBanner from "./WelcomeBanner/WelcomeBanner";
import StatsCards from "./StatsCards";
import AttendanceCard from "./AttendanceCard";
import CalendarWidget from "./CalendarWidget";
import AIAssistantCard from "./AIAssistantCard";
import TodayMeetings from "./TodayMeetings/TodayMeetings";
import OnlineEmployees from "./OnlineEmployees/OnlineEmployees";
import RecentChats from "./RecentChats/RecentChats";
import QuickActions from "./QuickActions/QuickActions";
import NotificationsPanel from "./NotificationsPanel";
import HRAnnouncements from "./HRAnnouncements/HRAnnouncements";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <WelcomeBanner />

      <StatsCards />

      <div className={styles.widgets}>
        <AttendanceCard />
        <CalendarWidget />
        <AIAssistantCard />
      </div>

      <div className={styles.widgets}>
        <TodayMeetings />
        <OnlineEmployees />
      </div>

      <div className={styles.bottomWidgets}>
        <RecentChats />
      </div>

      <div className={styles.bottomGrid}>
        <QuickActions />
      </div>

      <div className={styles.notificationGrid}>
        <NotificationsPanel />
        <HRAnnouncements />
      </div>
    </div>
  );
}

export default DashboardPage;