// src/components/Employees/EmployeesPage.jsx
// Enterprise Directory & Employee Management view

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Grid,
  List,
  UserCheck,
  Clock,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { employees as dummyEmployees, currentUser } from "../../data/dummyData";
import EmployeeCard from "./EmployeeCard";
import styles from "./EmployeesPage.module.css";

const DEPARTMENTS = ["All", "Engineering", "Design", "Marketing", "Finance", "Operations", "Human Resources"];
const STATUSES = ["All", "online", "busy", "away", "offline"];

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [showAddModal, setShowAddModal] = useState(false);
  const [allEmployees, setAllEmployees] = useState([currentUser, ...dummyEmployees]);

  // Form state for adding employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "Engineering",
    email: "",
    status: "online",
  });

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = selectedDept === "All" || emp.department === selectedDept;
      const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [allEmployees, searchTerm, selectedDept, selectedStatus]);

  const stats = useMemo(() => {
    const total = allEmployees.length;
    const online = allEmployees.filter((e) => e.status === "online").length;
    const busy = allEmployees.filter((e) => e.status === "busy").length;
    const away = allEmployees.filter((e) => e.status === "away" || e.status === "offline").length;
    return { total, online, busy, away };
  }, [allEmployees]);

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!newEmployee.name.trim() || !newEmployee.role.trim()) return;

    const initials = newEmployee.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const created = {
      id: Date.now(),
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      email: newEmployee.email || `${newEmployee.name.toLowerCase().replace(/\s+/g, ".")}@thedayhr.com`,
      status: newEmployee.status,
      initials,
    };

    setAllEmployees((prev) => [created, ...prev]);
    setNewEmployee({ name: "", role: "", department: "Engineering", email: "", status: "online" });
    setShowAddModal(false);
  };

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Employee Directory</h1>
            <span className={styles.countBadge}>{allEmployees.length} Total</span>
          </div>
          <p className={styles.subtitle}>
            Explore and connect with team members across departments and roles
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setShowAddModal(true)}
          aria-label="Add new employee"
        >
          <Plus size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* ── Quick Stats Row ── */}
      <div className={styles.statsRow}>
        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconIndigo}`}>
            <Users size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Staff</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconGreen}`}>
            <UserCheck size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.online}</span>
            <span className={styles.statLabel}>Online Now</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconRed}`}>
            <Clock size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.busy}</span>
            <span className={styles.statLabel}>In Meeting</span>
          </div>
        </div>

        <div className={styles.statPill}>
          <div className={`${styles.statIcon} ${styles.iconAmber}`}>
            <Briefcase size={16} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{stats.away}</span>
            <span className={styles.statLabel}>Away / Offline</span>
          </div>
        </div>
      </div>

      {/* ── Controls: Search & Filters ── */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name, role, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.deptSelectWrap}>
            <select
              className={styles.select}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.statusSelectWrap}>
            <select
              className={styles.select}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="online">Online</option>
              <option value="busy">In Meeting</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewBtnActive : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
              aria-label="Switch to grid view"
            >
              <Grid size={15} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewBtnActive : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
              aria-label="Switch to list view"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Employee Cards / Directory ── */}
      {filteredEmployees.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Search size={32} />
          </div>
          <h3>No team members found</h3>
          <p>Try adjusting your search query or department filter.</p>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setSearchTerm("");
              setSelectedDept("All");
              setSelectedStatus("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? styles.employeesGrid : styles.employeesList
          }
        >
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}

      {/* ── Add Employee Modal ── */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderIcon}>
                <Sparkles size={20} />
              </div>
              <div>
                <h2>Add Team Member</h2>
                <p>Add a new employee to the TheDayHR directory</p>
              </div>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Designation / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Manager"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Department</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Initial Status</label>
                  <select
                    value={newEmployee.status}
                    onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                  >
                    <option value="online">Online</option>
                    <option value="busy">Busy / In Meeting</option>
                    <option value="away">Away</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Work Email</label>
                <input
                  type="email"
                  placeholder="priya.sharma@thedayhr.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
