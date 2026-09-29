// src/components/chat/ChatList.jsx
// Chat page - left conversation list with search and active selection

import { useState } from "react";
import chatData from "../../data/chatData";
import ChatCard from "./ChatCard";
import "./ChatList.css";
import ChatWindow from "./ChatWindow";
import { Search } from "lucide-react";

function ChatList() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(chatData[0]);

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teams-container">

      {/* Left: Chat List */}
      <div className="chat-list-container">
        <div className="chat-list-header">
          <h2>Chats</h2>
          <div className="search-wrap">
            <span className="search-wrap-icon">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search chats"
            />
          </div>
        </div>

        <div className="chat-list">
          {filteredChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              isSelected={selectedChat.id === chat.id}
              onSelect={() => setSelectedChat(chat)}
            />
          ))}
        </div>
      </div>

      {/* Right: Chat Window */}
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}

export default ChatList;