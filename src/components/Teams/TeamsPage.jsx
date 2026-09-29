// src/components/Teams/TeamsPage.jsx
// Enterprise Teams and Collaboration channels view

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Hash,
  Sparkles,
  Layers,
  Megaphone,
  Briefcase,
  Code2,
  Palette,
  TrendingUp,
  DollarSign,
  Filter,
} from "lucide-react";
import styles from "./TeamsPage.module.css";
import ChannelCard from "./ChannelCard";
import TeamMembers from "./TeamMembers";

const TEAMS_CATEGORIES = [
  { id: "general", label: "General Workspace", icon: Megaphone, count: 4 },
  { id: "engineering", label: "Engineering", icon: Code2, count: 6 },
  { id: "design", label: "Product & Design", icon: Palette, count: 3 },
  { id: "hr", label: "Human Resources", icon: Briefcase, count: 4 },
  { id: "marketing", label: "Growth & Marketing", icon: TrendingUp, count: 3 },
  { id: "finance", label: "Finance & Operations", icon: DollarSign, count: 2 },
];

const CHANNELS_DATA = {
  general: [
    {
      id: "gen-1",
      title: "company-announcements",
      department: "All Hands",
      members: "248 Members",
      activity: "Updated 10m ago",
      status: "Active",
      description: "Company-wide updates, events, holiday calendars and executive town hall alerts.",
    },
    {
      id: "gen-2",
      title: "watercooler-chat",
      department: "Casual",
      members: "180 Members",
      activity: "Updated 2m ago",
      status: "Active",
      description: "Random banter, pet pictures, coffee chats and non-work discussions.",
    },
    {
      id: "gen-3",
      title: "learning-and-growth",
      department: "L&D",
      members: "95 Members",
      activity: "Yesterday",
      status: "Active",
      description: "Book recommendations, conference tickets, workshops and upskilling webinars.",
    },
  ],
  engineering: [
    {
      id: "eng-1",
      title: "TheDayHR Frontend",
      department: "Engineering",
      members: "12 Members",
      activity: "Updated 5 minutes ago",
      status: "Active",
      description: "React 19 development, component architecture, CSS modules and Vite builds.",
    },
    {
      id: "eng-2",
      title: "UI/UX Design Sprint",
      department: "Engineering & Design",
      members: "8 Members",
      activity: "Updated 20 minutes ago",
      status: "Active",
      description: "Design reviews, interactive prototype handoffs and design token sync.",
    },
    {
      id: "eng-3",
      title: "Payroll Automation",
      department: "Engineering",
      members: "6 Members",
      activity: "Yesterday",
      status: "In Progress",
      description: "Automated salary calculation and tax deduction microservice pipeline.",
    },
    {
      id: "eng-4",
      title: "Recruitment Portal",
      department: "Engineering",
      members: "14 Members",
      activity: "1 hour ago",
      status: "Review",
      description: "Candidate application tracking, automated resume parsing and interviewer scheduling.",
    },
    {
      id: "eng-5",
      title: "Mobile App Team",
      department: "Engineering",
      members: "9 Members",
      activity: "Today 8:45 AM",
      status: "Active",
      description: "iOS and Android employee self-service native client development.",
    },
  ],
  design: [
    {
      id: "des-1",
      title: "TheDayHR Design System",
      department: "Design",
      members: "8 Members",
      activity: "Updated 15m ago",
      status: "Active",
      description: "Figma component tokens, dark theme variants, icon sets and typography scales.",
    },
    {
      id: "des-2",
      title: "Mobile App Wireframes",
      department: "Design",
      members: "5 Members",
      activity: "Today 11:00 AM",
      status: "In Progress",
      description: "Touch interactions, swipeable dashboards, and quick chat overlays.",
    },
  ],
  hr: [
    {
      id: "hr-1",
      title: "Employee Onboarding Q3",
      department: "Human Resources",
      members: "10 Members",
      activity: "Today 9:15 AM",
      status: "Active",
      description: "Welcome kits, laptop provisioning, buddy assignments and initial orientation.",
    },
    {
      id: "hr-2",
      title: "Health Benefits & Policy",
      department: "Human Resources",
      members: "7 Members",
      activity: "2 hours ago",
      status: "Review",
      description: "Corporate medical insurance queries, dental plans and mental health benefits.",
    },
  ],
  marketing: [
    {
      id: "mkt-1",
      title: "Product Launch Campaigns",
      department: "Growth",
      members: "11 Members",
      activity: "Today 1:00 PM",
      status: "Active",
      description: "Social media marketing, press releases and employee brand advocacy.",
    },
  ],
  finance: [
    {
      id: "fin-1",
      title: "Expense Claims & Payroll",
      department: "Finance",
      members: "6 Members",
      activity: "Yesterday",
      status: "Active",
      description: "Monthly reimbursement submissions, travel vouchers and payslip generation.",
    },
  ],
};

function TeamsPage() {
  const [activeCategory, setActiveCategory] = useState("engineering");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [customChannels, setCustomChannels] = useState({});

  // Form for new channel
  const [newChanName, setNewChanName] = useState("");
  const [newChanDesc, setNewChanDesc] = useState("");

  const currentCategoryObj =
    TEAMS_CATEGORIES.find((c) => c.id === activeCategory) || TEAMS_CATEGORIES[1];

  const currentList = useMemo(() => {
    const defaultList = CHANNELS_DATA[activeCategory] || [];
    const addedList = customChannels[activeCategory] || [];
    const combined = [...addedList, ...defaultList];

    return combined.filter((ch) => {
      const matchesSearch =
        ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ch.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || ch.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeCategory, searchTerm, statusFilter, customChannels]);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (!newChanName.trim()) return;

    const created = {
      id: `custom-${Date.now()}`,
      title: newChanName.toLowerCase().replace(/\s+/g, "-"),
      department: currentCategoryObj.label,
      members: "1 Member",
      activity: "Just now",
      status: "Active",
      description: newChanDesc || "Newly created channel for team collaboration.",
    };

    setCustomChannels((prev) => ({
      ...prev,
      [activeCategory]: [created, ...(prev[activeCategory] || [])],
    }));

    setNewChanName("");
    setNewChanDesc("");
    setShowNewChannelModal(false);
  };

  return (
    <div className={styles.page}>
      {/* ── Left Workspace Navigator ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Layers size={18} className={styles.sidebarIcon} />
          <h2>Teams & Hubs</h2>
        </div>

        <p className={styles.sidebarSub}>Select department workspace</p>

        <ul className={styles.teamList}>
          {TEAMS_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <li
                key={cat.id}
                className={`${styles.teamItem} ${isActive ? styles.active : ""}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchTerm("");
                }}
              >
                <div className={styles.teamItemLeft}>
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </div>
                <span className={styles.teamBadge}>{cat.count}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ── Center Channels Stream ── */}
      <main className={styles.channels}>
        <div className={styles.channelsHeader}>
          <div>
            <div className={styles.channelTitleRow}>
              <h2>{currentCategoryObj.label} Channels</h2>
              <span className={styles.channelCountBadge}>{currentList.length} Channels</span>
            </div>
            <p className={styles.channelSubtitle}>
              Browse channels, join active sprint discussions, and collaborate in real-time
            </p>
          </div>

          <button
            className={styles.newChannelBtn}
            onClick={() => setShowNewChannelModal(true)}
            aria-label="Create new channel"
          >
            <Plus size={15} />
            <span>Create Channel</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <Search size={15} className={styles.searchIcon} />
            <input
              type="text"
              placeholder={`Search in #${activeCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.statusFilterWrap}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusSelect}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
            </select>
          </div>
        </div>

        {/* Channels List */}
        <div className={styles.channelsList}>
          {currentList.length === 0 ? (
            <div className={styles.emptyState}>
              <Hash size={32} className={styles.emptyIcon} />
              <h3>No channels found</h3>
              <p>No channels match your current search criteria in this department.</p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            currentList.map((ch) => (
              <ChannelCard
                key={ch.id}
                title={ch.title}
                department={ch.department}
                members={ch.members}
                activity={ch.activity}
                status={ch.status}
                description={ch.description}
              />
            ))
          )}
        </div>
      </main>

      {/* ── Right Sidebar: Members Directory ── */}
      <aside className={styles.rightSidebar}>
        <TeamMembers />
      </aside>

      {/* ── Create Channel Modal ── */}
      {showNewChannelModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowNewChannelModal(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIconCircle}>
                <Hash size={20} />
              </div>
              <div>
                <h3>Create #{currentCategoryObj.label} Channel</h3>
                <p>Add a collaborative channel for your team</p>
              </div>
            </div>

            <form onSubmit={handleCreateChannel} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Channel Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. backend-api-refactor"
                  value={newChanName}
                  onChange={(e) => setNewChanName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Topic / Description</label>
                <textarea
                  rows="3"
                  placeholder="What is this channel about?"
                  value={newChanDesc}
                  onChange={(e) => setNewChanDesc(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowNewChannelModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Sparkles size={14} />
                  <span>Create Channel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsPage;