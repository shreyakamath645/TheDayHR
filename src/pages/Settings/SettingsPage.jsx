// src/pages/Settings/SettingsPage.jsx
// Enterprise Workspace & User Settings Management

import { useState } from "react";
import {
  User,
  Bell,
  Sliders,
  Shield,
  Save,
  Check,
  Sparkles,
  Camera,
  Moon,
  Sun,
  Globe,
  Lock,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Avatar from "../../components/Avatar/Avatar";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const { user, updateUser } = useApp();
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'notifications' | 'preferences' | 'security'
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || "Shreya Kamath",
    role: user?.role || "HR Manager",
    department: user?.department || "Human Resources",
    email: user?.email || "shreya.kamath@thedayhr.com",
    status: user?.status || "online",
    statusMessage: "Focusing on Q3 OKRs and team growth 🚀",
  });

  // Notification Toggles State
  const [notifications, setNotifications] = useState({
    desktopAlerts: true,
    messageSound: true,
    emailDigest: true,
    meetingReminders: true,
    announcementAlerts: true,
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    theme: "light",
    timezone: "Asia/Kolkata (GMT+5:30)",
    dateFormat: "DD/MM/YYYY",
    language: "English (US)",
  });

  const handleSave = (e) => {
    e.preventDefault();
    const initials = profileData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    updateUser({
      name: profileData.name,
      role: profileData.role,
      department: profileData.department,
      status: profileData.status,
      initials,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Workspace Settings</h1>
            <span className={styles.badge}>Account & Workspace</span>
          </div>
          <p className={styles.subtitle}>
            Manage your personal profile, alert preferences, and workspace configuration
          </p>
        </div>

        {savedSuccess && (
          <div className={styles.successToast}>
            <Check size={16} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* ── Settings Layout: Left Nav + Right Form ── */}
      <div className={styles.settingsLayout}>
        {/* Left Nav Pills */}
        <aside className={styles.navCard}>
          <button
            className={`${styles.navItem} ${
              activeTab === "profile" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={16} />
            <span>Profile & Bio</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "notifications" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={16} />
            <span>Notifications</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "preferences" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            <Sliders size={16} />
            <span>Appearance & Region</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "security" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={16} />
            <span>Security & Sessions</span>
          </button>
        </aside>

        {/* Right Form Card */}
        <main className={styles.contentCard}>
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h2>Profile Information</h2>
                <p>Update your public employee card details across TheDayHR</p>
              </div>

              {/* Avatar Row */}
              <div className={styles.avatarRow}>
                <Avatar
                  name={profileData.name}
                  initials={currentUser.initials}
                  size="xl"
                  status={profileData.status}
                  showStatus={true}
                />
                <div className={styles.avatarMeta}>
                  <button
                    type="button"
                    className={styles.changeAvatarBtn}
                    onClick={() => window.alert("Avatar photo upload dialog")}
                  >
                    <Camera size={14} />
                    <span>Upload New Photo</span>
                  </button>
                  <p className={styles.avatarHint}>
                    JPG, PNG or GIF up to 5MB. Square recommended.
                  </p>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role / Job Title</label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) =>
                      setProfileData({ ...profileData, role: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Department</label>
                  <select
                    value={profileData.department}
                    onChange={(e) =>
                      setProfileData({ ...profileData, department: e.target.value })
                    }
                  >
                    <option value="Human Resources">Human Resources</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Active Status Mode</label>
                  <select
                    value={profileData.status}
                    onChange={(e) =>
                      setProfileData({ ...profileData, status: e.target.value })
                    }
                  >
                    <option value="online">🟢 Active / Available</option>
                    <option value="busy">🔴 Busy / In Meeting</option>
                    <option value="away">🟡 Away / Out of Office</option>
                    <option value="offline">⚪ Offline</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Custom Status Message</label>
                <input
                  type="text"
                  placeholder="What are you working on today?"
                  value={profileData.statusMessage}
                  onChange={(e) =>
                    setProfileData({ ...profileData, statusMessage: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Work Email (Corporate SSO)</label>
                <input type="email" disabled value={profileData.email} />
                <span className={styles.fieldHelp}>Managed by IT Administrator</span>
              </div>

              <button type="submit" className={styles.saveBtn}>
                <Save size={15} />
                <span>Save Changes</span>
              </button>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h2>Notification Preferences</h2>
                <p>Choose when and how you receive alerts and communications</p>
              </div>

              <div className={styles.toggleList}>
                <div className={styles.toggleItem}>
                  <div>
                    <h4>Desktop Push Notifications</h4>
                    <p>Receive pop-up alerts for urgent chat mentions and meeting starts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.desktopAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        desktopAlerts: e.target.checked,
                      })
                    }
                    className={styles.checkboxToggle}
                  />
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Sound Effects on Direct Messages</h4>
                    <p>Play a gentle chime when colleagues send 1-on-1 messages</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.messageSound}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        messageSound: e.target.checked,
                      })
                    }
                    className={styles.checkboxToggle}
                  />
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Daily Morning Briefing Email</h4>
                    <p>Summary of upcoming today meetings, announcements, and team leaves</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailDigest}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailDigest: e.target.checked,
                      })
                    }
                    className={styles.checkboxToggle}
                  />
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>HR Announcement Broadcasts</h4>
                    <p>Instant notification for company town halls and important notices</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.announcementAlerts}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        announcementAlerts: e.target.checked,
                      })
                    }
                    className={styles.checkboxToggle}
                  />
                </div>
              </div>

              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
              >
                <Save size={15} />
                <span>Save Alert Preferences</span>
              </button>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h2>Appearance & Regional Preferences</h2>
                <p>Customize timezones, themes, and display formats</p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Primary Timezone</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) =>
                      setPreferences({ ...preferences, timezone: e.target.value })
                    }
                  >
                    <option value="Asia/Kolkata (GMT+5:30)">
                      Asia/Kolkata (GMT+5:30) - Mumbai, New Delhi
                    </option>
                    <option value="America/New_York (GMT-4:00)">
                      America/New_York (GMT-4:00) - Eastern Time
                    </option>
                    <option value="Europe/London (GMT+1:00)">
                      Europe/London (GMT+1:00) - BST
                    </option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Date Format</label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) =>
                      setPreferences({ ...preferences, dateFormat: e.target.value })
                    }
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (29/09/2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (09/29/2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-29)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
              >
                <Save size={15} />
                <span>Save Regional Settings</span>
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h2>Security & Active Sessions</h2>
                <p>Multi-factor authentication, SSO credentials, and device security</p>
              </div>

              <div className={styles.securityBox}>
                <div className={styles.securityIcon}>
                  <Lock size={20} />
                </div>
                <div>
                  <h4>Two-Factor Authentication (2FA)</h4>
                  <p>Secured via Corporate Google Authenticator / Okta SSO</p>
                  <span className={styles.enabledBadge}>Active & Enforced</span>
                </div>
              </div>

              <div className={styles.sessionCard}>
                <h4>Active Login Sessions</h4>
                <div className={styles.sessionRow}>
                  <div>
                    <strong>Windows 11 PC • Chrome 128</strong>
                    <p>Current Session (Bangalore, India)</p>
                  </div>
                  <span className={styles.currentSessionBadge}>Current Device</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
