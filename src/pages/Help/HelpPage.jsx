// src/pages/Help/HelpPage.jsx
// Enterprise Knowledge Base & Employee Help Center

import { useState } from "react";
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Mail,
  FileQuestion,
  ChevronDown,
  ExternalLink,
  LifeBuoy,
  Send,
  CheckCircle,
} from "lucide-react";
import styles from "./HelpPage.module.css";

const FAQS = [
  {
    q: "How do I apply for casual or medical leave in TheDayHR?",
    a: "Navigate to Dashboard > Quick Actions > Apply Leave (or visit Calendar), select your leave dates, choose the leave category (PTO, Sick, Casual), and submit for manager approval.",
  },
  {
    q: "How do I join or start a scheduled video conference?",
    a: "Go to the Meetings page or click 'Join Meeting' on your Dashboard. All active rooms will display a glowing 'Join Now' button with one-click direct access.",
  },
  {
    q: "Where can I find and download my monthly payslips and tax forms?",
    a: "Open the 'Files' section from the main sidebar and browse into the 'HR Templates' or 'Company Policies' folder to download payroll and tax templates.",
  },
  {
    q: "How do I create a new department channel in Teams?",
    a: "Visit the Teams page, select your department workspace on the left, and click '+ Create Channel'. Fill in the channel name and description to initiate collaboration.",
  },
  {
    q: "How do I update my Slack / Teams status and notification preferences?",
    a: "Visit Settings > Profile & Bio to update your public status message, or Settings > Notifications to customize desktop chimes and morning briefing digests.",
  },
];

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketQuery, setTicketQuery] = useState("");

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    setTicketSubmitted(true);
    setTicketQuery("");
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  return (
    <div className={styles.container}>
      {/* ── Hero Banner ── */}
      <div className={styles.heroBanner}>
        <div className={styles.heroBadge}>
          <LifeBuoy size={14} />
          <span>TheDayHR Help Center</span>
        </div>
        <h1 className={styles.heroTitle}>How can we assist you today?</h1>
        <p className={styles.heroSubtitle}>
          Search our knowledge base for guides, FAQs, and HR policies
        </p>

        <div className={styles.heroSearchWrap}>
          <Search size={18} className={styles.heroSearchIcon} />
          <input
            type="text"
            placeholder="Search FAQs, leaves, video calls, payroll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.heroSearchInput}
          />
        </div>
      </div>

      {/* ── Quick Categories Grid ── */}
      <div className={styles.cardsGrid}>
        <div className={styles.guideCard}>
          <div className={`${styles.cardIcon} ${styles.iconIndigo}`}>
            <BookOpen size={20} />
          </div>
          <h3>Getting Started</h3>
          <p>Learn workspace basics, employee profiles, and sidebar navigation.</p>
        </div>

        <div className={styles.guideCard}>
          <div className={`${styles.cardIcon} ${styles.iconGreen}`}>
            <MessageSquare size={20} />
          </div>
          <h3>Chat & Channels</h3>
          <p>Master direct messages, thread replies, and cross-team channels.</p>
        </div>

        <div className={styles.guideCard}>
          <div className={`${styles.cardIcon} ${styles.iconPurple}`}>
            <FileQuestion size={20} />
          </div>
          <h3>Leaves & Attendance</h3>
          <p>Understand PTO policies, shift attendance, and manager approvals.</p>
        </div>
      </div>

      {/* ── FAQ Accordion Section ── */}
      <div className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>Instant answers to standard workforce and platform questions</p>
        </div>

        <div className={styles.faqList}>
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className={styles.faqQuestionRow}>
                  <h3>{faq.q}</h3>
                  <ChevronDown
                    size={18}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  />
                </div>
                {isOpen && <div className={styles.faqAnswer}><p>{faq.a}</p></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Contact Support Box ── */}
      <div className={styles.supportCard}>
        <div className={styles.supportLeft}>
          <div className={styles.supportIconWrap}>
            <Mail size={24} />
          </div>
          <div>
            <h3>Can't find what you're looking for?</h3>
            <p>Submit a query directly to the HR Help Desk or People Operations team</p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className={styles.ticketSuccess}>
            <CheckCircle size={18} />
            <span>Ticket #HR-4092 created! An HR partner will reply in ~2 hours.</span>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className={styles.supportForm}>
            <input
              type="text"
              required
              placeholder="Describe your question or issue..."
              value={ticketQuery}
              onChange={(e) => setTicketQuery(e.target.value)}
              className={styles.supportInput}
            />
            <button type="submit" className={styles.supportBtn}>
              <Send size={14} />
              <span>Submit Ticket</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
