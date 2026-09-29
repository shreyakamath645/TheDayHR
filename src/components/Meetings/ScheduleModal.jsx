// src/components/Meetings/ScheduleModal.jsx
// Interactive modal for scheduling a new Teams video / HR meeting

import { useState } from "react";
import { X, Calendar, Clock, Video, Users, Sparkles } from "lucide-react";
import styles from "./ScheduleModal.module.css";

const ScheduleModal = ({ isOpen, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "Shreya Kamath",
    time: "11:00 AM – 11:45 AM",
    duration: "45 mins",
    type: "Teams Video",
    totalParticipants: 4,
    status: "Scheduled",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSchedule({
      id: Date.now(),
      ...formData,
      participants: [
        { id: 1, name: "Shreya Kamath", initials: "SK", status: "online" },
        { id: 2, name: "Arjun Mehta", initials: "AM", status: "online" },
      ],
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleInfo}>
            <div className={styles.iconCircle}>
              <Video size={20} />
            </div>
            <div>
              <h2 className={styles.title}>Schedule New Meeting</h2>
              <p className={styles.subtitle}>Set up a video conference or team sync</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Meeting Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Q4 Strategy & Product Roadmap"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Meeting Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Teams Video">Teams Video Call</option>
                <option value="HR Induction">HR Induction</option>
                <option value="Leadership Sync">Leadership Sync</option>
                <option value="Sprint Planning">Sprint Planning</option>
                <option value="1-on-1 Review">1-on-1 Review</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              >
                <option value="15 mins">15 Minutes</option>
                <option value="30 mins">30 Minutes</option>
                <option value="45 mins">45 Minutes</option>
                <option value="60 mins">60 Minutes</option>
                <option value="90 mins">90 Minutes</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Time Slot</label>
              <input
                type="text"
                placeholder="e.g. 03:00 PM – 03:45 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Est. Attendees</label>
              <input
                type="number"
                min="2"
                max="50"
                value={formData.totalParticipants}
                onChange={(e) =>
                  setFormData({ ...formData, totalParticipants: parseInt(e.target.value, 10) || 2 })
                }
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              <Sparkles size={15} />
              <span>Create Meeting</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
