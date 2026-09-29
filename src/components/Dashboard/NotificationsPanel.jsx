import styles from "./NotificationsPanel.module.css";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Design Review starts in 20 minutes",
    time: "10 min ago",
    type: "meeting",
  },
  {
    title: "Leave request approved",
    time: "30 min ago",
    type: "success",
  },
  {
    title: "Payroll for September is available",
    time: "1 hour ago",
    type: "info",
  },
  {
    title: "New company holiday announced",
    time: "Yesterday",
    type: "holiday",
  },
];

function NotificationsPanel() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Bell size={20} />
        <h3>Notifications</h3>
      </div>

      {notifications.map((item, index) => (
        <div key={index} className={`${styles.notification} ${styles[item.type]}`}>
          <h4>{item.title}</h4>
          <span>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

export default NotificationsPanel;