// src/pages/Profile/ProfilePage.jsx
// User Profile — view & edit personal info, leave summary, activity timeline

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Briefcase,
  Building2,
  Shield,
  CalendarDays,
  Edit3,
  Check,
  X,
  Clock,
  TrendingUp,
  FileText,
  MessageSquare,
  Video,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../../components/Avatar/Avatar";
import styles from "./ProfilePage.module.css";

const STATUS_OPTIONS = [
  { id: "online", label: "Available", color: "#22c55e" },
  { id: "busy", label: "Busy", color: "#ef4444" },
  { id: "away", label: "Away", color: "#f59e0b" },
  { id: "offline", label: "Appear Offline", color: "#94a3b8" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, leaveBalances } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    role: user.role,
    department: user.department,
    email: user.email,
  });

  const handleSave = () => {
    const initials = editForm.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    updateUser({ ...editForm, initials });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      role: user.role,
      department: user.department,
      email: user.email,
    });
    setIsEditing(false);
  };

  const activityTimeline = [
    { id: 1, icon: MessageSquare, text: "Sent leave policy document to Arjun Mehta", time: "Today, 10:42 AM", color: "#4f46e5" },
    { id: 2, icon: Video, text: "Joined Q3 Performance Review Kickoff", time: "Today, 10:30 AM", color: "#7c3aed" },
    { id: 3, icon: FileText, text: "Uploaded September attendance report", time: "Yesterday, 4:15 PM", color: "#0891b2" },
    { id: 4, icon: Check, text: "Approved leave request from Sneha Patel", time: "Yesterday, 2:00 PM", color: "#22c55e" },
    { id: 5, icon: TrendingUp, text: "Reviewed workforce analytics dashboard", time: "2 days ago", color: "#f59e0b" },
  ];

  const quickNav = [
    { label: "HR Hub", path: "/hr", icon: Briefcase },
    { label: "Settings", path: "/settings", icon: Shield },
    { label: "My Calendar", path: "/calendar", icon: CalendarDays },
  ];

  return (
    <div className={styles.container}>
      {/* ── Profile Hero ── */}
      <div className={styles.heroCard}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.avatarSection}>
            <Avatar
              initials={user.initials}
              status={user.status}
              size="xl"
              className={styles.heroAvatar}
            />
            <div className={styles.heroInfo}>
              <h1 className={styles.heroName}>{user.name}</h1>
              <p className={styles.heroRole}>{user.role}</p>
              <div className={styles.heroMeta}>
                <span className={styles.metaChip}>
                  <Building2 size={13} /> {user.department}
                </span>
                <span className={styles.metaChip}>
                  <Mail size={13} /> {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            {!isEditing ? (
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className={styles.editActions}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  <Check size={15} />
                  <span>Save</span>
                </button>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  <X size={15} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bodyGrid}>
        {/* ── Left Column ── */}
        <div className={styles.leftCol}>
          {/* Edit Form / Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>
              <User size={16} />
              Personal Information
            </h3>

            {isEditing ? (
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Designation</label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Department</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  >
                    <option>Human Resources</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Operations</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Work Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Full Name</span>
                  <span className={styles.infoValue}>{user.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Designation</span>
                  <span className={styles.infoValue}>{user.role}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Department</span>
                  <span className={styles.infoValue}>{user.department}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Work Email</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Employee ID</span>
                  <span className={styles.infoValue}>EMP-00{user.id}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Joined</span>
                  <span className={styles.infoValue}>March 15, 2023</span>
                </div>
              </div>
            )}
          </div>

          {/* Status Card */}
          <div className={styles.statusCard}>
            <h3 className={styles.cardTitle}>
              <Shield size={16} />
              Availability Status
            </h3>
            <div className={styles.statusPills}>
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.statusPill} ${user.status === s.id ? styles.statusPillActive : ""}`}
                  onClick={() => updateUser({ status: s.id })}
                >
                  <span className={styles.statusDot} style={{ background: s.color }} />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className={styles.quickNavCard}>
            <h3 className={styles.cardTitle}>Quick Navigation</h3>
            {quickNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  className={styles.quickNavBtn}
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  <ChevronRight size={14} className={styles.navArrow} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className={styles.rightCol}>
          {/* Leave Balance Summary */}
          <div className={styles.leaveCard}>
            <h3 className={styles.cardTitle}>
              <CalendarDays size={16} />
              Leave Balance
            </h3>

            <div className={styles.leaveGrid}>
              {[
                { key: "paid", label: "Paid Leave", color: "#22c55e" },
                { key: "sick", label: "Sick Leave", color: "#ef4444" },
                { key: "casual", label: "Casual Leave", color: "#f59e0b" },
              ].map((item) => {
                const bal = leaveBalances[item.key];
                const pct = (bal.remaining / bal.total) * 100;
                return (
                  <div key={item.key} className={styles.leaveItem}>
                    <div className={styles.leaveHeader}>
                      <span className={styles.leaveLabel}>{item.label}</span>
                      <span className={styles.leaveCount}>
                        {bal.remaining} <span className={styles.leaveOf}>/ {bal.total}</span>
                      </span>
                    </div>
                    <div className={styles.leaveTrack}>
                      <div
                        className={styles.leaveFill}
                        style={{ width: `${pct}%`, background: item.color }}
                      />
                    </div>
                    <span className={styles.leaveUsed}>{bal.used} used</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className={styles.activityCard}>
            <h3 className={styles.cardTitle}>
              <Clock size={16} />
              Recent Activity
            </h3>
            <div className={styles.timeline}>
              {activityTimeline.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot} style={{ background: item.color }}>
                      <Icon size={12} color="#fff" />
                    </div>
                    <div className={styles.timelineContent}>
                      <p className={styles.timelineText}>{item.text}</p>
                      <span className={styles.timelineTime}>{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
