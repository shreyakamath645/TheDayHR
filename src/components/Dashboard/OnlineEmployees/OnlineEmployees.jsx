// src/components/Dashboard/OnlineEmployees/OnlineEmployees.jsx
// Online Employees widget showing active team members with status indicators and quick contact

import { useNavigate } from "react-router-dom";
import { FiMessageSquare, FiExternalLink } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Avatar from "../../Avatar/Avatar";
import styles from "./OnlineEmployees.module.css";

const OnlineEmployees = ({ employees = [] }) => {
  const navigate = useNavigate();

  // Filter or show active/online team members
  const onlineList = employees.filter((emp) => emp.status === "online");
  const displayList = onlineList.length > 0 ? onlineList : employees.slice(0, 5);

  const handleMessage = (emp, e) => {
    e.stopPropagation();
    navigate(`/chat?empId=${emp.id}`);
  };

  return (
    <section className={styles.container} aria-label="Online Employees">
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.headerIconBox}>
            <HiOutlineUserGroup className={styles.headerIcon} />
          </span>
          <div>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>Online Employees</h2>
              <span className={styles.liveIndicator}>
                <span className={styles.pulsingDot} />
                LIVE
              </span>
            </div>
            <span className={styles.subtitle}>{displayList.length} colleagues available now</span>
          </div>
        </div>
        <button
          className={styles.viewAllBtn}
          onClick={() => navigate("/employees")}
          aria-label="View all employees"
        >
          <span>Directory</span>
          <FiExternalLink className={styles.linkIcon} />
        </button>
      </div>

      <div className={styles.employeeGrid}>
        {displayList.map((emp) => (
          <div key={emp.id} className={styles.employeeCard} title={`${emp.name} (${emp.role})`}>
            <div className={styles.avatarContainer}>
              <Avatar initials={emp.initials} status="online" size="lg" />
            </div>
            <div className={styles.employeeInfo}>
              <span className={styles.empName}>{emp.name}</span>
              <span className={styles.empRole}>{emp.role}</span>
              <span className={styles.empDept}>{emp.department}</span>
            </div>
            <div className={styles.cardActions}>
              <button
                className={styles.actionBtn}
                onClick={(e) => handleMessage(emp, e)}
                title={`Chat with ${emp.name}`}
                aria-label={`Chat with ${emp.name}`}
              >
                <FiMessageSquare />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnlineEmployees;
