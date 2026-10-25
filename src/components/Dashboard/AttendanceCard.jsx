// src/components/Dashboard/AttendanceCard.jsx
// Premium Attendance Card with live clock and attendance tracking

import { useState, useEffect } from "react";
import { Clock, CheckCircle, LogIn, LogOut, Activity } from "lucide-react";
import styles from "./AttendanceCard.module.css";

import { api } from "../../services/api";

function AttendanceCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState("09:08 AM");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.attendance.getToday()
      .then((res) => {
        if (res?.data) {
          setIsCheckedIn(!!res.data.isCheckedIn);
          if (res.data.checkInTime) setCheckInTime(res.data.checkInTime);
        }
      })
      .catch((err) => console.warn("[AttendanceCard] Using local default:", err.message));
  }, []);

  const handleToggleAttendance = async () => {
    const nextState = !isCheckedIn;
    setIsCheckedIn(nextState);

    try {
      if (nextState) {
        const res = await api.attendance.checkIn("Office - HQ Bengaluru");
        if (res?.data?.checkInTime) setCheckInTime(res.data.checkInTime);
      } else {
        await api.attendance.checkOut();
      }
    } catch (err) {
      console.warn("[AttendanceCard] Failed to sync toggle with backend:", err.message);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const workedMs = currentTime - new Date().setHours(9, 8, 0, 0);
  const workedHrs = Math.floor(workedMs / 3600000);
  const workedMins = Math.floor((workedMs % 3600000) / 60000);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrap}>
            <Clock size={16} />
          </div>
          <h3>Attendance</h3>
        </div>
        <span className={styles.statusBadge}>
          <span className={styles.statusDot} />
          {isCheckedIn ? "Checked In" : "Checked Out"}
        </span>
      </div>

      <div className={styles.clockDisplay}>
        <div className={styles.liveTime}>{formattedTime}</div>
        <div className={styles.liveLabel}>
          <Activity size={10} className={styles.activityIcon} />
          Live Time
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statIcon}><LogIn size={13} /></span>
          <div className={styles.statDetail}>
            <span className={styles.statLabel}>Check-In</span>
            <span className={styles.statValue}>{checkInTime}</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statIcon}><CheckCircle size={13} /></span>
          <div className={styles.statDetail}>
            <span className={styles.statLabel}>Hours</span>
            <span className={styles.statValue}>{workedHrs}h {workedMins}m</span>
          </div>
        </div>
      </div>

      <button
        className={`${styles.actionBtn} ${!isCheckedIn ? styles.actionBtnIn : styles.actionBtnOut}`}
        onClick={handleToggleAttendance}
        aria-label={isCheckedIn ? "Check out" : "Check in"}
      >
        {isCheckedIn ? (
          <><LogOut size={14} /> Check Out</>
        ) : (
          <><LogIn size={14} /> Check In</>
        )}
      </button>
    </div>
  );
}

export default AttendanceCard;