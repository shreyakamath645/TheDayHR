// src/components/Dashboard/OnlineEmployees/OnlineEmployees.jsx
// Online Employees widget — shows active team members with status and quick message action

import { useNavigate } from "react-router-dom";
import styles from "./OnlineEmployees.module.css";
import { employees as dummyEmployees } from "../../../data/dummyData";
import { Users, MessageCircle, ArrowRight } from "lucide-react";
import Avatar from "../../Avatar/Avatar";

const STATUS_LABEL = {
  online: "Available",
  busy:   "Busy",
  away:   "Away",
  offline: "Offline",
};

function OnlineEmployees({ employees: passedEmployees }) {
  const navigate = useNavigate();
  const allEmployees = passedEmployees?.length ? passedEmployees : dummyEmployees;
  // Show online + away employees first
  const sorted = [...allEmployees].sort((a, b) => {
    const priority = { online: 0, away: 1, busy: 2, offline: 3 };
    return (priority[a.status] ?? 4) - (priority[b.status] ?? 4);
  });
  const displayed = sorted.filter((e) => e.status !== "offline").slice(0, 6);
  const onlineCount = allEmployees.filter((e) => e.status === "online").length;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Users size={18} className={styles.headerIcon} />
          <h3>Online Now</h3>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.onlinePill}>
            <span className={styles.onlineDot} />
            {onlineCount} online
          </span>
          <button className={styles.viewAll} onClick={() => navigate("/employees")}>
            All <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {displayed.map((employee) => (
          <button
            key={employee.id}
            className={styles.employee}
            onClick={() => navigate("/chat")}
            aria-label={`Message ${employee.name}`}
          >
            <Avatar initials={employee.initials} status={employee.status} size="md" />

            <div className={styles.info}>
              <span className={styles.name}>{employee.name}</span>
              <span className={styles.role}>{employee.role}</span>
            </div>

            <div className={styles.actions}>
              <span className={`${styles.statusLabel} ${styles[`status_${employee.status}`]}`}>
                {STATUS_LABEL[employee.status] || employee.status}
              </span>
              <span className={styles.msgIcon}>
                <MessageCircle size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default OnlineEmployees;