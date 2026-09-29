// src/components/Teams/TeamMembers.jsx
// Team member directory panel with direct chat actions

import { useNavigate } from "react-router-dom";
import { MessageSquare, Users, Plus, ShieldCheck } from "lucide-react";
import Avatar from "../Avatar/Avatar";
import { employees } from "../../data/dummyData";
import styles from "./TeamMembers.module.css";

function TeamMembers() {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <Users size={16} className={styles.headerIcon} />
          <h3>Team Members</h3>
        </div>
        <span className={styles.countBadge}>{employees.length} Active</span>
      </div>

      <p className={styles.subtitle}>Collaborators in this team workspace</p>

      <div className={styles.membersList}>
        {employees.map((member) => (
          <div
            key={member.id}
            className={styles.member}
            onClick={() => navigate("/chat")}
            title={`Message ${member.name}`}
          >
            <div className={styles.avatarWrapper}>
              <Avatar
                name={member.name}
                initials={member.initials}
                size="sm"
                status={member.status}
                showStatus={true}
              />
            </div>

            <div className={styles.memberInfo}>
              <div className={styles.nameRow}>
                <h4>{member.name}</h4>
                {member.role?.includes("Lead") || member.role?.includes("Manager") ? (
                  <span title="Lead / Admin" className={styles.leadBadge}>
                    <ShieldCheck size={11} />
                  </span>
                ) : null}
              </div>
              <p>{member.role}</p>
            </div>

            <button
              className={styles.msgBtn}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/chat");
              }}
              title={`Chat with ${member.name}`}
              aria-label={`Chat with ${member.name}`}
            >
              <MessageSquare size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembers;