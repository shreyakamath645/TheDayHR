// src/pages/Calendar/CalendarPage.jsx
// Interactive Enterprise Calendar with month grid, today's schedule agenda, and event booking

import { useState } from "react";
import {
  Calendar as CalIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Video,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import styles from "./CalendarPage.module.css";
import { todayMeetings } from "../../data/dummyData";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CALENDAR_EVENTS = [
  { day: 2, title: "HR Induction", time: "10:00 AM", type: "induction", color: "#4f46e5" },
  { day: 2, title: "Sprint Planning", time: "02:00 PM", type: "meeting", color: "#059669" },
  { day: 5, title: "Town Hall All Hands", time: "04:00 PM", type: "event", color: "#7c3aed" },
  { day: 8, title: "Design Critique", time: "11:30 AM", type: "design", color: "#d97706" },
  { day: 12, title: "Payroll Cutoff", time: "05:00 PM", type: "hr", color: "#dc2626" },
  { day: 15, title: "1-on-1 Sync", time: "03:00 PM", type: "meeting", color: "#4f46e5" },
  { day: 20, title: "Benefits Enrollment Closes", time: "11:59 PM", type: "hr", color: "#e11d48" },
  { day: 24, title: "Architecture Review", time: "01:00 PM", type: "tech", color: "#2563eb" },
  { day: 29, title: "Performance Review", time: "10:30 AM", type: "hr", color: "#4f46e5" },
];

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState("September 2026");
  const [selectedDay, setSelectedDay] = useState(29);
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState(CALENDAR_EVENTS);

  // New Event State
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "10:00 AM",
    day: selectedDay,
    type: "meeting",
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    setEvents((prev) => [
      ...prev,
      {
        day: Number(newEvent.day),
        title: newEvent.title,
        time: newEvent.time,
        type: newEvent.type,
        color: "#4f46e5",
      },
    ]);

    setNewEvent({ title: "", time: "10:00 AM", day: selectedDay, type: "meeting" });
    setShowEventModal(false);
  };

  const selectedDayEvents = events.filter((e) => e.day === selectedDay);

  // Simple 30-day grid generator for September (starts on Tuesday = col 3)
  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);
  const startOffset = 2; // Sept 1 2026 is Tuesday

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Company Calendar</h1>
            <span className={styles.badge}>{events.length} Events This Month</span>
          </div>
          <p className={styles.subtitle}>
            Plan team syncs, manage deadlines, and track company-wide milestones
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => {
            setNewEvent((prev) => ({ ...prev, day: selectedDay }));
            setShowEventModal(true);
          }}
          aria-label="Create calendar event"
        >
          <Plus size={16} />
          <span>New Event</span>
        </button>
      </div>

      {/* ── Calendar Layout Grid (Main Month + Agenda Sidebar) ── */}
      <div className={styles.mainGrid}>
        {/* Left: Month Calendar */}
        <div className={styles.calendarCard}>
          <div className={styles.monthNav}>
            <h2>{currentMonth}</h2>
            <div className={styles.navBtns}>
              <button className={styles.navBtn} aria-label="Previous month">
                <ChevronLeft size={16} />
              </button>
              <button
                className={styles.todayBtn}
                onClick={() => setSelectedDay(29)}
              >
                Today
              </button>
              <button className={styles.navBtn} aria-label="Next month">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className={styles.daysHeader}>
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className={styles.dayOfWeek}>
                {d}
              </div>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {/* Empty offset slots */}
            {Array.from({ length: startOffset }).map((_, idx) => (
              <div key={`offset-${idx}`} className={styles.emptyDaySlot} />
            ))}

            {/* Days 1 to 30 */}
            {daysArray.map((d) => {
              const isSelected = selectedDay === d;
              const isToday = d === 29;
              const dayEvents = events.filter((e) => e.day === d);

              return (
                <div
                  key={d}
                  className={`${styles.daySlot} ${
                    isSelected ? styles.daySlotSelected : ""
                  } ${isToday ? styles.daySlotToday : ""}`}
                  onClick={() => setSelectedDay(d)}
                >
                  <div className={styles.dayNumberWrap}>
                    <span className={`${styles.dayNumber} ${isToday ? styles.todayBadge : ""}`}>
                      {d}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className={styles.eventCountDot}>{dayEvents.length}</span>
                    )}
                  </div>

                  <div className={styles.slotEvents}>
                    {dayEvents.slice(0, 2).map((ev, i) => (
                      <div
                        key={i}
                        className={styles.miniEventPill}
                        style={{ borderLeftColor: ev.color }}
                        title={`${ev.time} - ${ev.title}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className={styles.moreEventsText}>+{dayEvents.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Agenda for Selected Day */}
        <div className={styles.agendaCard}>
          <div className={styles.agendaHeader}>
            <div className={styles.agendaDateIcon}>
              <CalIcon size={18} />
            </div>
            <div>
              <h3>Agenda: Sep {selectedDay}, 2026</h3>
              <p>{selectedDay === 29 ? "Today's Schedule" : "Scheduled Activities"}</p>
            </div>
          </div>

          <div className={styles.agendaList}>
            {selectedDayEvents.length === 0 ? (
              <div className={styles.emptyAgenda}>
                <p>No events scheduled for this date.</p>
                <button
                  className={styles.quickAddBtn}
                  onClick={() => {
                    setNewEvent((prev) => ({ ...prev, day: selectedDay }));
                    setShowEventModal(true);
                  }}
                >
                  + Add Event for Sep {selectedDay}
                </button>
              </div>
            ) : (
              selectedDayEvents.map((ev, i) => (
                <div key={i} className={styles.agendaItem}>
                  <div className={styles.agendaLeftBar} style={{ background: ev.color }} />
                  <div className={styles.agendaContent}>
                    <div className={styles.agendaTop}>
                      <h4>{ev.title}</h4>
                      <span className={styles.agendaTag}>{ev.type}</span>
                    </div>
                    <div className={styles.agendaMeta}>
                      <Clock size={12} />
                      <span>{ev.time}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.todayMeetingsSection}>
            <h4 className={styles.sectionHeading}>Active Meetings Today</h4>
            {todayMeetings.map((tm) => (
              <div key={tm.id} className={styles.miniMeetingRow}>
                <div className={styles.miniMeetingIcon}>
                  <Video size={14} />
                </div>
                <div className={styles.miniMeetingInfo}>
                  <h5>{tm.title}</h5>
                  <p>{tm.time} • {tm.totalParticipants} attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Event Modal ── */}
      {showEventModal && (
        <div className={styles.modalOverlay} onClick={() => setShowEventModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap}>
                <CalIcon size={20} />
              </div>
              <div>
                <h2>Create Calendar Event</h2>
                <p>Add event for September {newEvent.day}, 2026</p>
              </div>
            </div>

            <form onSubmit={handleAddEvent} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Kickoff All-Hands"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Day in Sep</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Time Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. 02:30 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                >
                  <option value="meeting">Team Meeting</option>
                  <option value="induction">HR Induction</option>
                  <option value="event">Company Event</option>
                  <option value="design">Design Sprint</option>
                  <option value="tech">Tech Review</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowEventModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Sparkles size={14} />
                  <span>Save Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
