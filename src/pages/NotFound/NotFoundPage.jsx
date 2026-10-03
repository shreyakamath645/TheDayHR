// src/pages/NotFound/NotFoundPage.jsx
// Premium 404 page with animated illustration and navigation back

import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <span className={styles.digitCircle}>
            <Search size={32} />
          </span>
          <span className={styles.digit}>4</span>
        </div>

        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/")}
          >
            <Home size={15} />
            <span>Go to Dashboard</span>
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
