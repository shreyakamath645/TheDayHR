import chatlist from "../../components/chat/ChatList";
import chatwindow from "../../components/chat/ChatWindow";
import messageinput from "../../components/chat/messageinput";
import profilepanel from "../../components/chat/profilepanel";

import "./chat.module.css";

const chat = () => {
  return (
    <div className="chat-page">
      <div className="chat-list">
        <chatlist />
      </div>

      <div className="chat-window">
        <chatwindow />
        <messageinput />
      </div>

      <div className="profile-panel">
        <profilepanel />
      </div>
    </div>
  );
};

export default chat;