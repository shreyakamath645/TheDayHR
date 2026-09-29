// src/pages/Announcements/AnnouncementsPage.jsx
// Enterprise Company & HR Announcements board

import { useState, useMemo } from "react";
import {
  Megaphone,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Tag,
  Pin,
  CheckCircle,
  Share2,
  Sparkles,
} from "lucide-react";
import { hrAnnouncements } from "../../data/dummyData";
import styles from "./AnnouncementsPage.module.css";

const EXTRA_ANNOUNCEMENTS = [
  {
    id: 101,
    title: "TheDayHR Annual Hackathon & Innovation Week Announced",
    description:
      "Form teams of 2-5 members to build next-gen AI and productivity features. Submissions open on October 10th with exciting rewards and leadership showcases.",
    date: "Sep 05, 2026",
    category: "Culture",
    priority: "Event",
    author: "Engineering & People Ops",
  },
  {
    id: 102,
    title: "Quarterly Performance Appraisal Process Guidelines",
    description:
      "Managers and employees are requested to complete self-evaluations and 360-degree peer feedback submissions in the portal by September 25th.",
    date: "Sep 03, 2026",
    category: "Policy",
    priority: "Important",
    author: "HR Operations",
  },
];

const CATEGORIES = ["All", "Benefits", "Company Event", "Policy", "Culture"];

const AnnouncementsPage = () => {
  const [announcementsList, setAnnouncementsList] = useState([
    ...hrAnnouncements,
    ...EXTRA_ANNOUNCEMENTS,
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [readIds, setReadIds] = useState(new Set([1]));

  // New announcement form state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "Benefits",
    priority: "Important",
    author: "HR Desk",
  });

  const filteredAnnouncements = useMemo(() => {
    return announcementsList.filter((a) => {
      const matchesCategory =
        selectedCategory === "All" || a.category === selectedCategory;
      const matchesSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [announcementsList, selectedCategory, searchTerm]);

  const toggleRead = (id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.description.trim()) return;

    const created = {
      id: Date.now(),
      title: newPost.title,
      description: newPost.description,
      category: newPost.category,
      priority: newPost.priority,
      author: newPost.author || "HR Management",
      date: "Today",
    };

    setAnnouncementsList((prev) => [created, ...prev]);
    setNewPost({
      title: "",
      description: "",
      category: "Benefits",
      priority: "Important",
      author: "HR Desk",
    });
    setShowPostModal(false);
  };

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Company Announcements</h1>
            <span className={styles.badge}>{announcementsList.length} Updates</span>
          </div>
          <p className={styles.subtitle}>
            Stay informed with company news, policy updates, benefit notices, and event schedules
          </p>
        </div>

        <button
          className={styles.postBtn}
          onClick={() => setShowPostModal(true)}
          aria-label="Post new announcement"
        >
          <Plus size={16} />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* ── Controls Bar ── */}
      <div className={styles.controlsBar}>
        <div className={styles.categoryPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${
                selectedCategory === cat ? styles.catBtnActive : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search news & notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ── Announcements Stream ── */}
      <div className={styles.stream}>
        {filteredAnnouncements.length === 0 ? (
          <div className={styles.emptyState}>
            <Megaphone size={36} className={styles.emptyIcon} />
            <h3>No announcements found</h3>
            <p>Try searching for a different keyword or select another category.</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAnnouncements.map((item) => {
            const isRead = readIds.has(item.id);
            const isImportant = item.priority === "Important";

            return (
              <article
                key={item.id}
                className={`${styles.card} ${
                  isImportant ? styles.cardImportant : ""
                } ${isRead ? styles.cardRead : ""}`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.tagsRow}>
                    <span
                      className={`${styles.priorityBadge} ${
                        isImportant
                          ? styles.badgeImp
                          : item.priority === "Event"
                          ? styles.badgeEvent
                          : styles.badgeNotice
                      }`}
                    >
                      <span className={styles.dot} />
                      {item.priority}
                    </span>

                    <span className={styles.catBadge}>{item.category}</span>
                  </div>

                  <div className={styles.dateMeta}>
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className={styles.announcementTitle}>{item.title}</h3>
                <p className={styles.announcementDesc}>{item.description}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.authorMeta}>
                    <User size={13} className={styles.authorIcon} />
                    <span>Posted by <strong>{item.author}</strong></span>
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={`${styles.readToggleBtn} ${
                        isRead ? styles.readActive : ""
                      }`}
                      onClick={() => toggleRead(item.id)}
                      title={isRead ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCircle size={14} />
                      <span>{isRead ? "Read" : "Mark as Read"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* ── Post Announcement Modal ── */}
      {showPostModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowPostModal(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIconCircle}>
                <Megaphone size={20} />
              </div>
              <div>
                <h2>Create Announcement</h2>
                <p>Broadcast news to the entire company or team</p>
              </div>
            </div>

            <form onSubmit={handlePostSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Announcement Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Company Offsite 2026 Details"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                  >
                    <option value="Benefits">Benefits</option>
                    <option value="Company Event">Company Event</option>
                    <option value="Policy">Policy</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Priority Tag</label>
                  <select
                    value={newPost.priority}
                    onChange={(e) =>
                      setNewPost({ ...newPost, priority: e.target.value })
                    }
                  >
                    <option value="Important">Important</option>
                    <option value="Event">Event</option>
                    <option value="Notice">Notice</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Author / Department</label>
                <input
                  type="text"
                  placeholder="e.g. People & Culture Team"
                  value={newPost.author}
                  onChange={(e) =>
                    setNewPost({ ...newPost, author: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Announcement Details *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Type the full announcement message here..."
                  value={newPost.description}
                  onChange={(e) =>
                    setNewPost({ ...newPost, description: e.target.value })
                  }
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowPostModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Sparkles size={14} />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
