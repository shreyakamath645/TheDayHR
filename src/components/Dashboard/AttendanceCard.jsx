import styles from "./AttendanceCard.module.css";

function AttendanceCard() {
  return (
    <div className={styles.card}>
      <h3>Today's Attendance</h3>

      <div className={styles.timeBox}>
        <h1>09:08 AM</h1>
        <p>Checked In</p>
      </div>

      <div className={styles.details}>
        <div>
          <span>Working Hours</span>
          <h4>7h 20m</h4>
        </div>

        <div>
          <span>Status</span>
          <h4 className={styles.present}>Present</h4>
        </div>
      </div>

      <button>View Attendance</button>
    </div>
  );
}

export default AttendanceCard;