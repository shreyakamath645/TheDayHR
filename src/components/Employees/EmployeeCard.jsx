// src/components/Employees/EmployeeCard.jsx
// Premium employee card with status indicator, department badge, and quick communication actions

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Mail, Calendar, PhoneCall, Check, MoreVertical } from "lucide-react";
import Avatar from "../Avatar/Avatar";
import styles from "./EmployeeCard.module.css";

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    if (employee.email) {
      navigator.clipboard.writeText(employee.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartChat = (e) => {
    e.stopPropagation();
    navigate("/chat");
  };

  const statusLabel =
    employee.status === "online"
      ? "Active Now"
      : employee.status === "busy"
      ? "In Meeting"
      : employee.status === "away"
      ? "Away"
      : "Offline";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar
            name={employee.name}
            initials={employee.initials}
            status={employee.status}
            size="lg"
            showStatus={true}
          />
        </div>
        <span className={`${styles.statusBadge} ${styles[employee.status || "offline"]}`}>
          <span className={styles.statusDot} />
          {statusLabel}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{employee.name}</h3>
        <p className={styles.role}>{employee.role}</p>
        <span className={styles.department}>{employee.department}</span>

        <button
          className={styles.emailBtn}
          onClick={handleCopyEmail}
          title="Click to copy email"
          aria-label={`Copy email for ${employee.name}`}
        >
          <Mail size={13} />
          <span className={styles.emailText}>{employee.email}</span>
          {copied && <span className={styles.copiedBadge}><Check size={11} /> Copied</span>}
        </button>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.chatActionBtn}
          onClick={handleStartChat}
          aria-label={`Send message to ${employee.name}`}
        >
          <MessageSquare size={14} />
          <span>Message</span>
        </button>
        <a
          href={`mailto:${employee.email}`}
          className={styles.iconBtn}
          title="Send Email"
          aria-label={`Send email to ${employee.name}`}
        >
          <Mail size={14} />
        </a>
        <button
          className={styles.iconBtn}
          onClick={() => navigate("/meetings")}
          title="Schedule Meeting"
          aria-label={`Schedule meeting with ${employee.name}`}
        >
          <Calendar size={14} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
