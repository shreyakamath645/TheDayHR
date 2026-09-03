import { chatUsers } from "../../data/chatData";
import "./chat.module.css";

const chatlist = () => {
  return (
    <div>
      <h3>chats</h3>

      <input placeholder="Search chats..." />

      {chatUsers.map((user) => (
        <div key={user.id}>
          <div>
            <strong>{user.name}</strong>
            {user.online && <span> 🟢</span>}
          </div>

          <small>{user.role}</small>

          <p>{user.lastMessage}</p>

          <div>
            <span>{user.time}</span>

            {user.unread > 0 && <span> ({user.unread})</span>}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default chatlist;