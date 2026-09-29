// src/layouts/MainLayout.jsx
// Root layout: Sidebar + Topbar + scrollable page content

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar  from "../components/Topbar/Topbar";
import styles  from "./MainLayout.module.css";

const MainLayout = () => {
  const location = useLocation();
  const isChat = location.pathname.startsWith("/chat");

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Topbar />
        <main
          className={`${styles.pageContent} ${isChat ? styles.chatContent : ""}`}
          id="main-content"
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
