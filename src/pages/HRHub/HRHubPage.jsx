// src/pages/HRHub/HRHubPage.jsx
// Central HR Hub — Leave management, attendance overview, payroll, quick links

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  Users,
  FileText,
  Megaphone,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  BadgeDollarSign,
  ClipboardList,
  Plus,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../../components/Avatar/Avatar";
import styles from "./HRHubPage.module.css";

const LEAVE_TYPES = ["Casual Leave", "Sick Leave", "Paid Leave (PTO)"];

const HRHubPage = () => {
  const navigate = useNavigate();
  const { user, leaveBalances, leaveRequests, applyLeave } = useApp();

  const [activeTab, setActiveTab] = useState("overview"); // overview | requests | apply
  const [localRequests, setLocalRequests] = useState(leaveRequests);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: "Casual Leave",
    dates: "",
    reason: "",
  });

  const handleAction = (id, action) => {
    setLocalRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!newLeave.dates.trim() || !newLeave.reason.trim()) return;
    applyLeave(newLeave);
    setLocalRequests((prev) => [
      {
        id: `lv-${Date.now()}`,
        employee: user.name,
        department: user.department,
        type: newLeave.type,
        dates: newLeave.dates,
        reason: newLeave.reason,
        status: "Pending",
        appliedOn: "Today",
      },
      ...prev,
    ]);
    setNewLeave({ type: "Casual Leave", dates: "", reason: "" });
    setShowApplyModal(false);
  };

  const pendingCount = localRequests.filter((r) => r.status === "Pending").length;
  const approvedCount = localRequests.filter((r) => r.status === "Approved").length;

  const quickLinks = [
    { label: "Employee Directory", icon: Users, path: "/employees", color: "#4f46e5", bg: "#eef2ff" },
    { label: "Announcements", icon: Megaphone, path: "/announcements", color: "#7c3aed", bg: "#f5f3ff" },
    { label: "Documents", icon: FileText, path: "/files", color: "#0891b2", bg: "#ecfeff" },
    { label: "Analytics", icon: TrendingUp, path: "/analytics", color: "#059669", bg: "#ecfdf5" },
  ];

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>HR Hub</h1>
            <span className={styles.badge}>Central Workspace</span>
          </div>
          <p className={styles.subtitle}>
            Manage leaves, track attendance, and access HR tools all in one place
          </p>
        </div>
        <button
          className={styles.applyBtn}
          onClick={() => setShowApplyModal(true)}
        >
          <Plus size={16} />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* ── Leave Balance Cards ── */}
      <div className={styles.balanceGrid}>
        <div className={styles.balanceCard}>
          <div className={`${styles.balanceIcon} ${styles.iconGreen}`}>
            <CalendarCheck size={20} />
          </div>
          <div className={styles.balanceMeta}>
            <span className={styles.balanceType}>Paid Leave</span>
            <div className={styles.balanceNumbers}>
              <span className={styles.balanceRemaining}>{leaveBalances.paid.remaining}</span>
              <span className={styles.balanceTotal}>/ {leaveBalances.paid.total} days</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={`${styles.progressFill} ${styles.fillGreen}`}
                style={{ width: `${(leaveBalances.paid.remaining / leaveBalances.paid.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.balanceCard}>
          <div className={`${styles.balanceIcon} ${styles.iconRed}`}>
            <CalendarX2 size={20} />
          </div>
          <div className={styles.balanceMeta}>
            <span className={styles.balanceType}>Sick Leave</span>
            <div className={styles.balanceNumbers}>
              <span className={styles.balanceRemaining}>{leaveBalances.sick.remaining}</span>
              <span className={styles.balanceTotal}>/ {leaveBalances.sick.total} days</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={`${styles.progressFill} ${styles.fillRed}`}
                style={{ width: `${(leaveBalances.sick.remaining / leaveBalances.sick.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.balanceCard}>
          <div className={`${styles.balanceIcon} ${styles.iconAmber}`}>
            <CalendarClock size={20} />
          </div>
          <div className={styles.balanceMeta}>
            <span className={styles.balanceType}>Casual Leave</span>
            <div className={styles.balanceNumbers}>
              <span className={styles.balanceRemaining}>{leaveBalances.casual.remaining}</span>
              <span className={styles.balanceTotal}>/ {leaveBalances.casual.total} days</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={`${styles.progressFill} ${styles.fillAmber}`}
                style={{ width: `${(leaveBalances.casual.remaining / leaveBalances.casual.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Stat Capsules ── */}
      <div className={styles.capsuleRow}>
        <div className={styles.capsule}>
          <Clock size={16} className={styles.capsuleIconPending} />
          <span className={styles.capsuleVal}>{pendingCount}</span>
          <span className={styles.capsuleLabel}>Pending</span>
        </div>
        <div className={styles.capsule}>
          <CheckCircle2 size={16} className={styles.capsuleIconApproved} />
          <span className={styles.capsuleVal}>{approvedCount}</span>
          <span className={styles.capsuleLabel}>Approved</span>
        </div>
        <div className={styles.capsule}>
          <BadgeDollarSign size={16} className={styles.capsuleIconPayroll} />
          <span className={styles.capsuleVal}>Done</span>
          <span className={styles.capsuleLabel}>Sep Payroll</span>
        </div>
        <div className={styles.capsule}>
          <ClipboardList size={16} className={styles.capsuleIconAttendance} />
          <span className={styles.capsuleVal}>96%</span>
          <span className={styles.capsuleLabel}>Attendance</span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className={styles.tabBar}>
        {[
          { id: "overview", label: "Leave Requests" },
          { id: "attendance", label: "Attendance Summary" },
          { id: "payroll", label: "Payroll Status" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === "overview" && pendingCount > 0 && (
              <span className={styles.tabBadge}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.requestsTable}>
            <div className={styles.tableHeader}>
              <span>Employee</span>
              <span>Type</span>
              <span>Dates</span>
              <span>Reason</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {localRequests.map((req) => {
              const initials = req.employee
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <div key={req.id} className={styles.tableRow}>
                  <div className={styles.empCell}>
                    <Avatar initials={initials} size="sm" />
                    <div>
                      <span className={styles.empName}>{req.employee}</span>
                      <span className={styles.empDept}>{req.department}</span>
                    </div>
                  </div>
                  <span className={styles.typeCell}>{req.type}</span>
                  <span className={styles.datesCell}>{req.dates}</span>
                  <span className={styles.reasonCell}>{req.reason}</span>
                  <span className={`${styles.statusChip} ${styles[`status${req.status}`]}`}>
                    {req.status}
                  </span>
                  <div className={styles.actionsCell}>
                    {req.status === "Pending" ? (
                      <>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleAction(req.id, "Approved")}
                          title="Approve"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          className={styles.rejectBtn}
                          onClick={() => handleAction(req.id, "Rejected")}
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    ) : (
                      <span className={styles.actionDone}>—</span>
                    )}
                  </div>
                </div>
              );
            })}
            {localRequests.length === 0 && (
              <div className={styles.emptyRow}>No leave requests found.</div>
            )}
          </div>
        )}

        {activeTab === "attendance" && (
          <div className={styles.attendanceGrid}>
            {[
              { label: "Present Today", value: "236 / 248", pct: "95.2%", color: "#22c55e" },
              { label: "On Leave", value: "8", pct: "3.2%", color: "#f59e0b" },
              { label: "Half Day", value: "4", pct: "1.6%", color: "#3b82f6" },
              { label: "Absent (Unnotified)", value: "0", pct: "0%", color: "#ef4444" },
              { label: "Late Arrivals (This Week)", value: "12", pct: "—", color: "#8b5cf6" },
              { label: "Avg. Login Time", value: "9:12 AM", pct: "—", color: "#0891b2" },
            ].map((item, i) => (
              <div key={i} className={styles.attendanceCard}>
                <div className={styles.attendanceDot} style={{ background: item.color }} />
                <div className={styles.attendanceMeta}>
                  <span className={styles.attendanceLabel}>{item.label}</span>
                  <span className={styles.attendanceValue}>{item.value}</span>
                </div>
                <span className={styles.attendancePct}>{item.pct}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "payroll" && (
          <div className={styles.payrollGrid}>
            {[
              { month: "September 2026", status: "Processed", date: "Sep 30", amount: "₹42,85,000", statusClass: "done" },
              { month: "August 2026", status: "Processed", date: "Aug 31", amount: "₹41,20,000", statusClass: "done" },
              { month: "October 2026", status: "Upcoming", date: "Oct 31", amount: "Est. ₹43,10,000", statusClass: "upcoming" },
            ].map((item, i) => (
              <div key={i} className={styles.payrollCard}>
                <div>
                  <span className={styles.payrollMonth}>{item.month}</span>
                  <span className={styles.payrollDate}>Processed on {item.date}</span>
                </div>
                <span className={styles.payrollAmount}>{item.amount}</span>
                <span className={`${styles.payrollStatus} ${styles[item.statusClass]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Quick Links ── */}
      <div className={styles.quickLinksSection}>
        <h3 className={styles.sectionTitle}>Quick Access</h3>
        <div className={styles.quickLinksGrid}>
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                className={styles.quickLinkCard}
                onClick={() => navigate(link.path)}
              >
                <div className={styles.qlIcon} style={{ background: link.bg, color: link.color }}>
                  <Icon size={18} />
                </div>
                <span className={styles.qlLabel}>{link.label}</span>
                <ArrowRight size={14} className={styles.qlArrow} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Apply Leave Modal ── */}
      {showApplyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowApplyModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderIcon}>
                <Sparkles size={20} />
              </div>
              <div>
                <h2>Apply for Leave</h2>
                <p>Submit a new leave request for HR approval</p>
              </div>
            </div>

            <form onSubmit={handleApplyLeave} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                >
                  {LEAVE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Date(s) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oct 10 - Oct 12, 2026 (3 days)"
                  value={newLeave.dates}
                  onChange={(e) => setNewLeave({ ...newLeave, dates: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Reason *</label>
                <textarea
                  required
                  placeholder="Brief reason for leave..."
                  rows={3}
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRHubPage;
