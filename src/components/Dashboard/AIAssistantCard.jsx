// src/components/Dashboard/AIAssistantCard.jsx
// Interactive AI Assistant Card for Dashboard with trigger to open Assistant modal

import { Sparkles, ArrowRight, Bot } from "lucide-react";
import { useApp } from "../../context/AppContext";
import styles from "./AIAssistantCard.module.css";

function AIAssistantCard() {
  const { setAiAssistantOpen } = useApp();

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Sparkles size={24} />
      </div>

      <div className={styles.content}>
        <span className={styles.badge}>Smart Workplace AI</span>
        <h3>TheDayhr AI Assistant</h3>
        <p>
          Ask HR policy questions, apply leaves, review insurance benefits, and draft meeting notes instantly.
        </p>
      </div>

      <button
        className={styles.button}
        onClick={() => setAiAssistantOpen(true)}
        aria-label="Open AI Assistant"
      >
        <span>Ask AI Assistant</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default AIAssistantCard;