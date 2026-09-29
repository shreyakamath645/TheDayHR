import styles from "./AIAssistantCard.module.css";
import { Sparkles, ArrowRight } from "lucide-react";

function AIAssistantCard() {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Sparkles size={28}/>
      </div>

      <h3>TheDayHR AI Assistant</h3>

      <p>
        Ask HR questions, apply leave, find company policies and get meeting
        reminders instantly.
      </p>

      <button>
        Ask AI Assistant
        <ArrowRight size={18}/>
      </button>
    </div>
  );
}

export default AIAssistantCard;