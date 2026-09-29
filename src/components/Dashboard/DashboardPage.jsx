import WelcomeBanner from "./WelcomeBanner/WelcomeBanner";
import styles from "./DashboardPage.module.css";
import StatsCards from "./StatsCards";
import AttendanceCard from "./AttendanceCard";
import CalendarWidget from "./CalendarWidget";
import AIAssistantCard from "./AIAssistantCard";
import TodayMeetings from "./TodayMeetings/TodayMeetings";
import OnlineEmployees from "./OnlineEmployees/OnlineEmployees";
import RecentChats from "./RecentChats/RecentChats";
import QuickActions from "./QuickActions/QuickActions";
import NotificationsPanel from "./NotificationsPanel/NotificationsPanel";
import HRAnnouncements from "./HRAnnouncements/HRAnnouncements";

function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <WelcomeBanner />

      <StatsCards />

      <div className={styles.widgets}>
        <AttendanceCard />
        <CalendarWidget />
        <AIAssistantCard />
        <TodayMeetings />
        <OnlineEmployees />
      <div/>

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
    </div>
  );
}

export default DashboardPage;