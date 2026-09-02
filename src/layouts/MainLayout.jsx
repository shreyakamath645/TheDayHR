// src/layouts/MainLayout.jsx
// Root layout: Sidebar + Topbar + scrollable page content

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar  from "../components/Topbar/Topbar";
import styles  from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Topbar />
        <main className={styles.pageContent} id="main-content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
