import styles from "./CalendarWidget.module.css";

function CalendarWidget() {

  const dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  return (
    <div className={styles.calendar}>

      <h3>September 2026</h3>

      <div className={styles.grid}>
        {dates.map((day)=>(
          <div
            key={day}
            className={day===18 ? styles.today : styles.date}
          >
            {day}
          </div>
        ))}
      </div>

      <div className={styles.event}>
        🔵 Design Review – 3 PM
      </div>

      <div className={styles.event}>
        🟢 HR Standup – 10 AM
      </div>

    </div>
  );
}

export default CalendarWidget;