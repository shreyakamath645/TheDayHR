import { messages } from "../../data/chatData";

const chatwindow = () => {
  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-header">
        <div>
          <h3>Priya Sharma 🟢</h3>
          <small>HR Manager • Online</small>
        </div>

        <div className="chat-actions">
          📞 📹 🔍 ⋮
        </div>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.type === "sent" ? "message sent" : "message received"}
          >
            <p>{msg.text}</p>
            <small>{msg.time}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default chatwindow;