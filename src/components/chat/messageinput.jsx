import {
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaPaperPlane,
  FaImage,
} from "react-icons/fa";

const messageinput = () => {
  return (
    <div className="message-input">
      <div className="input-icons">
        <FaSmile />
        <FaPaperclip />
        <FaImage />
      </div>

      <input type="text" placeholder="Type a message..." />

      <div className="send-icons">
        <FaMicrophone />
        <button>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default messageinput;