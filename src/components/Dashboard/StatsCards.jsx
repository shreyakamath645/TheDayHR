// src/components/Dashboard/StatsCards.jsx
// Premium stat cards using dashboardStats data with icons and trend indicators

import styles from "./StatsCards.module.css";
import { dashboardStats } from "../../data/dummyData";
import { Users, CalendarCheck, UserMinus, Briefcase, TrendingUp, TrendingDown } from "lucide-react";

const ICONS = [Users, CalendarCheck, UserMinus, Briefcase];
const COLORS = [
  { icon: "#4f46e5", bg: "#eef2ff", accent: "#818cf8" },
  { icon: "#059669", bg: "#ecfdf5", accent: "#34d399" },
  { icon: "#d97706", bg: "#fffbeb", accent: "#fbbf24" },
  { icon: "#dc2626", bg: "#fef2f2", accent: "#f87171" },
];

function StatsCards() {
  return (
    <div className={styles.container}>
      {dashboardStats.map((card, index) => {
        const Icon = ICONS[index % ICONS.length];
        const color = COLORS[index % COLORS.length];
        const isUp = card.trend === "up";

        return (
          <div key={index} className={styles.card}>
            <div className={styles.cardTop}>
              <div
                className={styles.iconWrap}
                style={{ background: color.bg, color: color.icon }}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
              <span
                className={`${styles.trend} ${isUp ? styles.trendUp : styles.trendDown}`}
              >
                {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {card.change}
              </span>
            </div>

            <div className={styles.cardBody}>
              <h2 className={styles.value}>{card.value}</h2>
              <p className={styles.label}>{card.label}</p>
            </div>

            <div className={styles.barWrap}>
              <div
                className={styles.bar}
                style={{ background: color.accent, width: isUp ? "72%" : "45%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;