// src/components/Dashboard/RecentChats/RecentChats.jsx
// Recent Chats Preview showing 5 recent conversations with status, unread badges, and time

import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Avatar from "../../Avatar/Avatar";
import styles from "./RecentChats.module.css";

const RecentChats = ({ chats = [] }) => {
  const navigate = useNavigate();

  // Show 5 recent conversations
  const displayChats = chats.slice(0, 5);

  const handleOpenChat = (chatId) => {
    navigate(`/chat?id=${chatId}`);
  };

  return (
    <section className={styles.container} aria-label="Recent Chats Preview">
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.headerIconBox}>
            <HiOutlineChatBubbleLeftRight className={styles.headerIcon} />
          </span>
          <div>
            <h2 className={styles.title}>Recent Chats</h2>
            <span className={styles.subtitle}>Direct messages & team channels</span>
          </div>
        </div>
        <button
          className={styles.viewAllBtn}
          onClick={() => navigate("/chat")}
          aria-label="View all chats"
        >
          <span>Open chat</span>
          <FiExternalLink className={styles.linkIcon} />
        </button>
      </div>

      <div className={styles.chatList} role="list">
        {displayChats.map((chat) => (
          <div
            key={chat.id}
            className={`${styles.chatItem} ${chat.unread > 0 ? styles.unreadItem : ""}`}
            onClick={() => handleOpenChat(chat.id)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpenChat(chat.id)}
          >
            {/* Avatar */}
            <div className={styles.avatarWrap}>
              <Avatar
                initials={chat.avatarInitials || chat.name.slice(0, 2).toUpperCase()}
                status={chat.isGroup ? null : chat.status}
                size="md"
              />
            </div>

            {/* Chat Details */}
            <div className={styles.chatDetails}>
              <div className={styles.chatTopRow}>
                <span className={styles.chatName}>
                  {chat.name}
                  {chat.isGroup && <span className={styles.groupBadge}>Group</span>}
                </span>
                <span className={`${styles.chatTime} ${chat.unread > 0 ? styles.unreadTime : ""}`}>
                  {chat.time}
                </span>
              </div>

              <div className={styles.chatBottomRow}>
                <p className={styles.lastMessage}>{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className={styles.unreadBadge} aria-label={`${chat.unread} unread messages`}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentChats;
