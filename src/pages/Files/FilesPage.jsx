// src/pages/Files/FilesPage.jsx
// Enterprise Documents & Files Management Hub

import { useState, useMemo } from "react";
import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileCode,
  Download,
  Eye,
  Search,
  Plus,
  Upload,
  Filter,
  HardDrive,
  Clock,
  Sparkles,
  CheckCircle,
  File,
} from "lucide-react";
import styles from "./FilesPage.module.css";

const FOLDERS = [
  { id: "all", label: "All Files", count: 8 },
  { id: "policies", label: "Company Policies", count: 3 },
  { id: "benefits", label: "Benefits & Insurance", count: 2 },
  { id: "onboarding", label: "Onboarding Kits", count: 2 },
  { id: "templates", label: "HR Templates", count: 1 },
];

const INITIAL_FILES = [
  {
    id: 1,
    name: "Employee_Handbook_2026_v2.pdf",
    folder: "policies",
    size: "3.4 MB",
    updatedAt: "Sep 01, 2026",
    uploader: "Deepa Krishnan",
    type: "pdf",
  },
  {
    id: 2,
    name: "Medical_Insurance_Coverage_Policy.pdf",
    folder: "benefits",
    size: "1.8 MB",
    updatedAt: "Aug 28, 2026",
    uploader: "Shreya Kamath",
    type: "pdf",
  },
  {
    id: 3,
    name: "Hybrid_Work_Policy_Guidelines.docx",
    folder: "policies",
    size: "520 KB",
    updatedAt: "Aug 20, 2026",
    uploader: "Vikram Singh",
    type: "doc",
  },
  {
    id: 4,
    name: "New_Hire_Orientation_Checklist.xlsx",
    folder: "onboarding",
    size: "840 KB",
    updatedAt: "Sep 02, 2026",
    uploader: "Deepa Krishnan",
    type: "sheet",
  },
  {
    id: 5,
    name: "Travel_Expense_Claim_Template.xlsx",
    folder: "templates",
    size: "620 KB",
    updatedAt: "Aug 15, 2026",
    uploader: "Kavya Nair",
    type: "sheet",
  },
  {
    id: 6,
    name: "Code_of_Conduct_and_Ethics.pdf",
    folder: "policies",
    size: "2.1 MB",
    updatedAt: "Jul 10, 2026",
    uploader: "Shreya Kamath",
    type: "pdf",
  },
  {
    id: 7,
    name: "Dental_and_Vision_Reimbursement_Guide.pdf",
    folder: "benefits",
    size: "1.2 MB",
    updatedAt: "Aug 12, 2026",
    uploader: "Deepa Krishnan",
    type: "pdf",
  },
  {
    id: 8,
    name: "Developer_Setup_and_VPN_Guide.pdf",
    folder: "onboarding",
    size: "4.5 MB",
    updatedAt: "Sep 03, 2026",
    uploader: "Rohan Gupta",
    type: "pdf",
  },
];

const FilesPage = () => {
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState(INITIAL_FILES);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  // Upload Form State
  const [newFileName, setNewFileName] = useState("");
  const [newFileFolder, setNewFileFolder] = useState("policies");

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesFolder =
        selectedFolder === "all" || file.folder === selectedFolder;
      const matchesSearch =
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.uploader.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [files, selectedFolder, searchTerm]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const extension = newFileName.includes(".") ? "" : ".pdf";
    const created = {
      id: Date.now(),
      name: `${newFileName}${extension}`,
      folder: newFileFolder,
      size: "1.5 MB",
      updatedAt: "Just now",
      uploader: "Shreya Kamath",
      type: newFileName.endsWith(".xlsx") ? "sheet" : "pdf",
    };

    setFiles((prev) => [created, ...prev]);
    setNewFileName("");
    setShowUploadModal(false);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "sheet":
        return <FileSpreadsheet size={20} className={styles.sheetIcon} />;
      case "doc":
        return <FileText size={20} className={styles.docIcon} />;
      default:
        return <FileText size={20} className={styles.pdfIcon} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Documents & Shared Files</h1>
            <span className={styles.badge}>{files.length} Documents</span>
          </div>
          <p className={styles.subtitle}>
            Access HR handbooks, policy guides, claim templates, and compliance documents
          </p>
        </div>

        <button
          className={styles.uploadBtn}
          onClick={() => setShowUploadModal(true)}
          aria-label="Upload new file"
        >
          <Upload size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* ── Folder Pills Ribbon ── */}
      <div className={styles.folderRibbon}>
        {FOLDERS.map((f) => (
          <button
            key={f.id}
            className={`${styles.folderPill} ${
              selectedFolder === f.id ? styles.folderActive : ""
            }`}
            onClick={() => setSelectedFolder(f.id)}
          >
            <Folder size={15} />
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* ── Search & Table Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search documents or uploaders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ── Files Table ── */}
      <div className={styles.tableCard}>
        {filteredFiles.length === 0 ? (
          <div className={styles.emptyState}>
            <HardDrive size={36} className={styles.emptyIcon} />
            <h3>No documents found</h3>
            <p>Try searching with another keyword or change your active folder.</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSelectedFolder("all");
                setSearchTerm("");
              }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Category</th>
                  <th>File Size</th>
                  <th>Last Modified</th>
                  <th>Uploaded By</th>
                  <th className={styles.actionsCol}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className={styles.tableRow}>
                    <td>
                      <div className={styles.fileNameCell}>
                        <div className={styles.fileIconWrapper}>
                          {getFileIcon(file.type)}
                        </div>
                        <span className={styles.fileNameText}>{file.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.categoryTag}>
                        {file.folder.replace("-", " ")}
                      </span>
                    </td>
                    <td className={styles.metaText}>{file.size}</td>
                    <td className={styles.metaText}>{file.updatedAt}</td>
                    <td className={styles.uploaderText}>{file.uploader}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          className={styles.iconBtn}
                          onClick={() => setPreviewFile(file)}
                          title="Preview Document"
                          aria-label={`Preview ${file.name}`}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className={styles.iconBtn}
                          onClick={() =>
                            window.alert(`Downloading file: "${file.name}"`)
                          }
                          title="Download Document"
                          aria-label={`Download ${file.name}`}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Upload Modal ── */}
      {showUploadModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap}>
                <Upload size={20} />
              </div>
              <div>
                <h2>Upload Document</h2>
                <p>Upload a policy, template, or guide to the team hub</p>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Document Title / Filename *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leave_Policy_2026.pdf"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Target Category</label>
                <select
                  value={newFileFolder}
                  onChange={(e) => setNewFileFolder(e.target.value)}
                >
                  <option value="policies">Company Policies</option>
                  <option value="benefits">Benefits & Insurance</option>
                  <option value="onboarding">Onboarding Kits</option>
                  <option value="templates">HR Templates</option>
                </select>
              </div>

              <div className={styles.dropZone}>
                <File size={32} className={styles.dropIcon} />
                <p className={styles.dropText}>
                  Drag & drop file here or <span>browse computer</span>
                </p>
                <span className={styles.dropHint}>Supports PDF, DOCX, XLSX (up to 25MB)</span>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Sparkles size={14} />
                  <span>Upload File</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewFile && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPreviewFile(null)}
        >
          <div
            className={styles.previewCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.previewHeader}>
              <div className={styles.previewTitle}>
                {getFileIcon(previewFile.type)}
                <h3>{previewFile.name}</h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setPreviewFile(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewDocPlaceholder}>
                <FileText size={48} className={styles.docLargeIcon} />
                <h4>TheDayHR Secure Document Preview</h4>
                <p>
                  Viewing official version updated on {previewFile.updatedAt} by{" "}
                  {previewFile.uploader}.
                </p>
                <span className={styles.verifiedBadge}>
                  <CheckCircle size={14} /> Verified Corporate Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesPage;
