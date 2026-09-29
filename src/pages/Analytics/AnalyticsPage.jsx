// src/pages/Analytics/AnalyticsPage.jsx
// Enterprise Workforce Metrics & HR Insights Dashboard

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Award,
  Clock,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Layers,
  PieChart,
  Activity,
} from "lucide-react";
import styles from "./AnalyticsPage.module.css";

const DEPT_STATS = [
  { name: "Engineering", count: 98, percent: 39.5, color: "#4f46e5" },
  { name: "Product & Design", count: 36, percent: 14.5, color: "#8b5cf6" },
  { name: "Growth & Marketing", count: 42, percent: 16.9, color: "#ec4899" },
  { name: "Human Resources", count: 24, percent: 9.7, color: "#10b981" },
  { name: "Finance & Legal", count: 22, percent: 8.9, color: "#f59e0b" },
  { name: "Operations", count: 26, percent: 10.5, color: "#06b6d4" },
];

const ATTENDANCE_WEEK = [
  { day: "Mon", rate: 94, present: 233 },
  { day: "Tue", rate: 96, present: 238 },
  { day: "Wed", rate: 92, present: 228 },
  { day: "Thu", rate: 95, present: 235 },
  { day: "Fri", rate: 89, present: 220 },
];

const LEAVE_TYPES = [
  { type: "Paid Time Off (PTO)", days: 142, color: "#4f46e5" },
  { type: "Sick Leave", days: 38, color: "#f59e0b" },
  { type: "Casual Leave", days: 54, color: "#10b981" },
  { type: "Maternity / Paternity", days: 20, color: "#ec4899" },
];

const HIRING_FUNNEL = [
  { stage: "Applications Received", count: 420, rate: "100%" },
  { stage: "Screening Passed", count: 184, rate: "43.8%" },
  { stage: "Technical Interview", count: 62, rate: "14.7%" },
  { stage: "Final HR Interview", count: 28, rate: "6.6%" },
  { stage: "Offers Extended", count: 14, rate: "3.3%" },
];

const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Workforce Analytics</h1>
            <span className={styles.badge}>Live Data</span>
          </div>
          <p className={styles.subtitle}>
            Workforce headcounts, attendance health, turnover rate, and recruitment pipeline
          </p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.timeframeSelectWrap}>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className={styles.timeframeSelect}
            >
              <option value="month">This Month (Sep 2026)</option>
              <option value="quarter">Q3 2026</option>
              <option value="ytd">Year to Date (2026)</option>
            </select>
          </div>

          <button
            className={styles.exportBtn}
            onClick={() => window.alert("Exporting full analytics report PDF/CSV...")}
          >
            <Download size={15} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ── Key Metrics KPI Ribbon ── */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Total Headcount</span>
            <div className={`${styles.kpiIcon} ${styles.iconIndigo}`}>
              <Users size={16} />
            </div>
          </div>
          <div className={styles.kpiValue}>248</div>
          <div className={styles.kpiTrendPositive}>
            <ArrowUpRight size={14} />
            <span>+12 hires this month (+5.1%)</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Avg Attendance Rate</span>
            <div className={`${styles.kpiIcon} ${styles.iconGreen}`}>
              <Activity size={16} />
            </div>
          </div>
          <div className={styles.kpiValue}>93.2%</div>
          <div className={styles.kpiTrendPositive}>
            <ArrowUpRight size={14} />
            <span>+1.8% vs last month</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Annual Retention Rate</span>
            <div className={`${styles.kpiIcon} ${styles.iconPurple}`}>
              <Award size={16} />
            </div>
          </div>
          <div className={styles.kpiValue}>96.4%</div>
          <div className={styles.kpiTrendPositive}>
            <ArrowUpRight size={14} />
            <span>Top tier enterprise index</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Avg Time to Hire</span>
            <div className={`${styles.kpiIcon} ${styles.iconAmber}`}>
              <Clock size={16} />
            </div>
          </div>
          <div className={styles.kpiValue}>19 Days</div>
          <div className={styles.kpiTrendPositive}>
            <ArrowDownRight size={14} />
            <span>-3 days faster cycle</span>
          </div>
        </div>
      </div>

      {/* ── Analytics Visualizations 2-Column Grid ── */}
      <div className={styles.chartGrid}>
        {/* Left: Department Distribution */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Department Distribution</h3>
              <p>Headcount split across company divisions</p>
            </div>
            <span className={styles.panelTag}>248 Staff</span>
          </div>

          <div className={styles.deptList}>
            {DEPT_STATS.map((dept) => (
              <div key={dept.name} className={styles.deptRow}>
                <div className={styles.deptInfo}>
                  <span className={styles.deptName}>{dept.name}</span>
                  <span className={styles.deptCount}>
                    {dept.count} members ({dept.percent}%)
                  </span>
                </div>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{
                      width: `${dept.percent}%`,
                      backgroundColor: dept.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weekly Attendance Trend */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Weekly Attendance Health</h3>
              <p>Daily present employee rates for current week</p>
            </div>
            <span className={styles.panelTagGreen}>Healthy</span>
          </div>

          <div className={styles.barChartContainer}>
            {ATTENDANCE_WEEK.map((item) => (
              <div key={item.day} className={styles.barColumn}>
                <div className={styles.barLabelTop}>{item.rate}%</div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ height: `${item.rate}%` }}
                  />
                </div>
                <span className={styles.barDay}>{item.day}</span>
              </div>
            ))}
          </div>

          <div className={styles.chartFootnote}>
            <span>Peak attendance: <strong>Tuesday (96% / 238 present)</strong></span>
          </div>
        </div>
      </div>

      {/* ── Bottom 2-Column: Leave Breakdown & Hiring Funnel ── */}
      <div className={styles.chartGrid}>
        {/* Leave Allocation */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Leave Types Taken (September)</h3>
              <p>Total 254 leave days recorded</p>
            </div>
          </div>

          <div className={styles.leaveList}>
            {LEAVE_TYPES.map((lt) => (
              <div key={lt.type} className={styles.leaveItem}>
                <div
                  className={styles.leaveDot}
                  style={{ background: lt.color }}
                />
                <div className={styles.leaveMeta}>
                  <span className={styles.leaveTitle}>{lt.type}</span>
                  <span className={styles.leaveDays}>{lt.days} Days Total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Pipeline */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Hiring & Recruitment Funnel</h3>
              <p>Q3 Candidate progression status</p>
            </div>
            <span className={styles.panelTag}>14 Openings</span>
          </div>

          <div className={styles.funnelList}>
            {HIRING_FUNNEL.map((f, i) => (
              <div key={f.stage} className={styles.funnelRow}>
                <div className={styles.funnelStage}>
                  <span className={styles.funnelStepNum}>{i + 1}</span>
                  <span className={styles.funnelStepName}>{f.stage}</span>
                </div>
                <div className={styles.funnelNumbers}>
                  <strong>{f.count} candidates</strong>
                  <span>({f.rate})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
