import chatlist from "../../components/chat/chatlist";
import chatwindow from "../../components/chat/chatwindow";
import messageinput from "../../components/chat/messageinput";
import profilepanel from "../../components/chat/profilepanel";

import "./Chat.module.css";

const Chat = () => {
  return (
    <div className="chat-page">
      <div className="chat-list">
        <ChatList />
      </div>

      <div className="chat-window">
        <ChatWindow />
        <MessageInput />
      </div>

      <div className="profile-panel">
        <ProfilePanel />
      </div>
    </div>
  );
};

export default Chat;