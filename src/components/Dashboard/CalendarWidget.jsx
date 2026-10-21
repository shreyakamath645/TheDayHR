// src/components/Dashboard/CalendarWidget.jsx
// Mini Calendar Widget with event dots and navigation

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarWidget.module.css";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Events for September / October 2026
const EVENTS = {
  // Sep 2026
  "2026-8-2": "HR Induction",
  "2026-8-5": "Town Hall",
  "2026-8-12": "Payroll Cutoff",
  "2026-8-20": "Benefits Closes",
  "2026-8-29": "Performance Review",
  // Oct 2026
  "2026-9-2": "Q4 Kickoff",
  "2026-9-15": "HR Leadership Sync",
  "2026-9-21": "Today - Reviews",
};

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function CalendarWidget() {
  const navigate = useNavigate();
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = getMonthGrid(year, month);

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const hasEvent = (d) => EVENTS[`${year}-${month}-${d}`];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const todayEvents = Object.entries(EVENTS)
    .filter(([key]) => {
      const [y, m, d] = key.split("-").map(Number);
      return y === year && m === month;
    })
    .slice(0, 2);

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrap}>
            <CalendarDays size={15} />
          </div>
          <h3>{MONTHS[month]} {year}</h3>
        </div>
        <div className={styles.navBtns}>
          <button onClick={prevMonth} className={styles.navBtn} aria-label="Previous month">
            <ChevronLeft size={14} />
          </button>
          <button onClick={nextMonth} className={styles.navBtn} aria-label="Next month">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day Labels */}
      <div className={styles.dayLabels}>
        {DAYS_SHORT.map((d) => (
          <span key={d} className={styles.dayLabel}>{d}</span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={styles.grid}>
        {cells.map((day, i) => (
          <button
            key={i}
            className={`${styles.cell} ${day ? styles.cellDay : ""} ${
              day && isToday(day) ? styles.cellToday : ""
            } ${day && hasEvent(day) ? styles.cellHasEvent : ""}`}
            disabled={!day}
            aria-label={day ? `Day ${day}` : undefined}
          >
            {day ?? ""}
            {day && hasEvent(day) && <span className={styles.eventDot} />}
          </button>
        ))}
      </div>

      {/* Today's Events Peek */}
      {todayEvents.length > 0 && (
        <div className={styles.eventsPeek}>
          {todayEvents.map(([key, title]) => (
            <button
              key={key}
              className={styles.eventPill}
              onClick={() => navigate("/calendar")}
              aria-label={title}
            >
              <span className={styles.eventPillDot} />
              <span className={styles.eventPillText}>{title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarWidget;