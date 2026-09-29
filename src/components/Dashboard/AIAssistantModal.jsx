// src/components/Dashboard/AIAssistantModal.jsx
// Interactive conversational AI Assistant modal for HR and workplace questions

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, CheckCircle2, CornerDownLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";
import styles from "./AIAssistantModal.module.css";

const QUICK_PROMPTS = [
  "What is our annual leave & PTO policy?",
  "How do I submit medical insurance claims?",
  "What are the official remote work core hours?",
  "When is payroll processed every month?",
];

const KNOWLEDGE_BASE = {
  leave: "Employees receive 18 days of Paid Leave (PTO), 10 days of Sick Leave, and 12 days of Casual Leave annually. Applications can be submitted via the HR Hub or Calendar.",
  pto: "Employees receive 18 days of Paid Leave (PTO), 10 days of Sick Leave, and 12 days of Casual Leave annually. Applications can be submitted via the HR Hub or Calendar.",
  insurance: "Medical insurance coverage is up to ₹5,00,000 for employees and immediate dependents. Submit claims with hospital discharge summaries through Documents > HR Templates.",
  medical: "Medical insurance coverage is up to ₹5,00,000 for employees and immediate dependents. Submit claims with hospital discharge summaries through Documents > HR Templates.",
  remote: "Hybrid guidelines require 2 mandatory collaboration days in-office per week. Core flexible working hours are 10:00 AM – 4:00 PM IST.",
  hours: "Hybrid guidelines require 2 mandatory collaboration days in-office per week. Core flexible working hours are 10:00 AM – 4:00 PM IST.",
  payroll: "Monthly payroll cutoff is on the 25th of every month. Salary credits occur on the last working day of each calendar month.",
  salary: "Monthly payroll cutoff is on the 25th of every month. Salary credits occur on the last working day of each calendar month.",
};

const INITIAL_CONVERSATION = [
  {
    sender: "ai",
    text: "Hello! I am your TheDayhr AI Assistant. I can help answer HR policy questions, guide you through leave applications, or direct you to company forms. How may I help you today?",
  },
];

function AIAssistantModal() {
  const { aiAssistantOpen, setAiAssistantOpen } = useApp();
  const [messages, setMessages] = useState(INITIAL_CONVERSATION);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && aiAssistantOpen) {
        setAiAssistantOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aiAssistantOpen, setAiAssistantOpen]);

  if (!aiAssistantOpen) return null;

  const handleSendPrompt = (promptText) => {
    const query = (promptText || input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!promptText) setInput("");
    setThinking(true);

    setTimeout(() => {
      let reply = "I found related information in the company handbook. For detailed assistance, you can also raise an HR ticket from the Help & Support page.";
      const lower = query.toLowerCase();

      for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
        if (lower.includes(key)) {
          reply = value;
          break;
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setThinking(false);
    }, 600);
  };

  return (
    <div className={styles.overlay} onClick={() => setAiAssistantOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.avatarIcon}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3>TheDayhr AI Assistant</h3>
              <p>Online • Instant HR & Workplace Support</p>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setAiAssistantOpen(false)}
            aria-label="Close Assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Thread */}
        <div className={styles.messagesBody}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`${styles.msgRow} ${m.sender === "user" ? styles.msgRowUser : styles.msgRowAi}`}
            >
              {m.sender === "ai" && (
                <div className={styles.botAvatar}>
                  <Bot size={15} />
                </div>
              )}
              <div
                className={`${styles.bubble} ${
                  m.sender === "user" ? styles.bubbleUser : styles.bubbleAi
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {thinking && (
            <div className={`${styles.msgRow} ${styles.msgRowAi}`}>
              <div className={styles.botAvatar}><Bot size={15} /></div>
              <div className={`${styles.bubble} ${styles.bubbleAi}`}>
                <div className={styles.typingIndicator}>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className={styles.promptsContainer}>
          <span className={styles.promptsLabel}>Suggested questions:</span>
          <div className={styles.promptsScroll}>
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className={styles.promptPill}
                onClick={() => handleSendPrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <form
          className={styles.inputBar}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
        >
          <input
            type="text"
            placeholder="Ask anything about HR, benefits, policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.inputField}
            autoFocus
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistantModal;
