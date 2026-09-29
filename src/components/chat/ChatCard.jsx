import "./ChatList.css";

function ChatCard({ chat, isSelected, onSelect }) {
  return (
    <div
      className={`chat-card ${isSelected ? "active-chat" : ""}`}
      onClick={onSelect}
    >
      <div className="avatar-container">
        <img src={chat.avatar} alt={chat.name} className="avatar" />

        {chat.online && <span className="online-dot"></span>}
      </div>

      <div className="chat-info">
        <div className="chat-top">
          <h4>{chat.name}</h4>
          <span>{chat.time}</span>
        </div>

        <div className="chat-bottom">
          <p>{chat.message}</p>

          {chat.unread > 0 && (
            <div className="unread-badge">{chat.unread}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatCard;