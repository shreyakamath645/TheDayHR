// src/components/Dashboard/RecentChats/RecentChats.jsx
// Premium Recent Chats card with online status, unread badges, and hover effects

import { useNavigate } from "react-router-dom";
import styles from "./RecentChats.module.css";
import { recentChats } from "../../../data/dummyData";
import { MessageCircle, ArrowRight } from "lucide-react";
import Avatar from "../../Avatar/Avatar";

function RecentChats({ chats }) {
  const navigate = useNavigate();
  const data = chats?.length ? chats : recentChats;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MessageCircle size={18} className={styles.headerIcon} />
          <h3>Recent Chats</h3>
        </div>
        <button className={styles.viewAll} onClick={() => navigate("/chat")}>
          View all <ArrowRight size={13} />
        </button>
      </div>

      <div className={styles.list}>
        {data.slice(0, 5).map((chat) => (
          <button
            key={chat.id}
            className={`${styles.chatItem} ${chat.unread > 0 ? styles.hasUnread : ""}`}
            onClick={() => navigate("/chat")}
            aria-label={`Chat with ${chat.name} – ${chat.unread > 0 ? `${chat.unread} unread` : "no unread messages"}`}
          >
            <div className={styles.avatarWrap}>
              <Avatar
                initials={chat.avatarInitials}
                status={chat.isGroup ? null : chat.status}
                size="md"
              />
            </div>

            <div className={styles.info}>
              <div className={styles.topRow}>
                <span className={styles.name}>
                  {chat.name}
                  {chat.isGroup && <span className={styles.groupTag}>Group</span>}
                </span>
                <span className={styles.time}>{chat.time}</span>
              </div>
              <div className={styles.bottomRow}>
                <p className={styles.message}>{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className={styles.badge} aria-label={`${chat.unread} unread`}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentChats;