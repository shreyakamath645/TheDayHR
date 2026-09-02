// src/components/Avatar/Avatar.jsx
// Reusable Avatar component with initials fallback and status indicator

import styles from "./Avatar.module.css";

const PALETTE = [
  ["#4F46E5", "#EEF2FF"],
  ["#7C3AED", "#F5F3FF"],
  ["#0891B2", "#ECFEFF"],
  ["#059669", "#ECFDF5"],
  ["#DC2626", "#FEF2F2"],
  ["#D97706", "#FFFBEB"],
  ["#DB2777", "#FDF2F8"],
];

function getColors(initials = "?") {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const [bg, fg] = PALETTE[code % PALETTE.length];
  return { bg, fg };
}

const statusMap = {
  online: styles.statusOnline,
  busy: styles.statusBusy,
  away: styles.statusAway,
  offline: styles.statusOffline,
};

const Avatar = ({
  initials = "?",
  size = "md",     // sm | md | lg | xl
  status = null,   // online | busy | away | offline | null
  style = {},
  className = "",
}) => {
  const { bg, fg } = getColors(initials);
  const sizeClass = styles[size] || styles.md;
  const dotSizeClass = styles[size] || styles.md;

  return (
    <span
      className={`${styles.avatar} ${sizeClass} ${className}`}
      style={{ backgroundColor: bg, color: fg, ...style }}
      aria-label={`Avatar for ${initials}`}
    >
      {initials}
      {status && (
        <span
          className={`${styles.statusDot} ${dotSizeClass} ${statusMap[status] || ""}`}
          title={status}
        />
      )}
    </span>
  );
};

export default Avatar;
