// src/components/chat/ChatWindow.jsx
// Premium Chat Window with header, messages, date separator, and input bar

import { useState } from "react";
import { Video, Phone, Info, Smile, Paperclip, Send, MoreHorizontal } from "lucide-react";
import "./ChatWindow.css";

const SAMPLE_MESSAGES = [
  { id: 1, sender: "them", text: "Hello Shreya! 👋 Hope you're doing well.", time: "09:30 AM" },
  { id: 2, sender: "me",   text: "Hey! Yes, all good. Thanks for reaching out.", time: "09:31 AM" },
  { id: 3, sender: "them", text: "I wanted to discuss the performance review process. Do you have time today?", time: "09:32 AM" },
  { id: 4, sender: "me",   text: "Absolutely! I have a slot at 3 PM. Does that work?", time: "09:34 AM" },
  { id: 5, sender: "them", text: "Perfect. I'll send a calendar invite.", time: "09:35 AM" },
  { id: 6, sender: "me",   text: "Great, see you then! 😊", time: "09:36 AM" },
];

function ChatWindow({ selectedChat }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text: message.trim(),
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-window">

      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="header-avatar-wrap">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="header-avatar"
            />
            {selectedChat.online && <span className="header-online-dot" />}
          </div>

          <div className="header-details">
            <h3>{selectedChat.name}</h3>
            <p className="online-status">
              {selectedChat.online ? "🟢 Online" : "⚫ Offline"}
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button className="header-icon-btn" title="Video call" aria-label="Video call">
            <Video size={18} />
          </button>
          <button className="header-icon-btn" title="Voice call" aria-label="Voice call">
            <Phone size={18} />
          </button>
          <button className="header-icon-btn" title="Info" aria-label="Conversation info">
            <Info size={18} />
          </button>
          <button className="header-icon-btn" title="More" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-area">
        <div className="date-separator">
          <span>Today</span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${msg.sender === "me" ? "message-row-me" : "message-row-them"}`}
          >
            {msg.sender === "them" && (
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="message-avatar"
              />
            )}
            <div className="message-bubble-wrap">
              <div className={`message-bubble ${msg.sender === "me" ? "bubble-me" : "bubble-them"}`}>
                {msg.text}
              </div>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="message-input-bar">
        <button className="input-icon-btn" title="Attach file" aria-label="Attach file">
          <Paperclip size={18} />
        </button>

        <button className="input-icon-btn" title="Emoji" aria-label="Add emoji">
          <Smile size={18} />
        </button>

        <input
          type="text"
          className="message-input"
          placeholder={`Message ${selectedChat.name}…`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type a message"
        />

        <button
          className={`send-btn ${message.trim() ? "send-btn-active" : ""}`}
          onClick={handleSend}
          aria-label="Send message"
          disabled={!message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;