// src/routes/AppRoutes.jsx
// Central React Router DOM route configuration

import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ChatPage from "../pages/chat/ChatPage";
import TeamsPage from "../components/Teams/TeamsPage";
import MeetingsPage from "../components/Meetings/MeetingsPage";
import EmployeesPage from "../components/Employees/EmployeesPage";
import CalendarPage from "../pages/Calendar/CalendarPage";
import AnnouncementsPage from "../pages/Announcements/AnnouncementsPage";
import Placeholder from "../pages/Placeholder/Placeholder";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index path="/" element={<Dashboard />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/files" element={<Placeholder title="Documents & Files" />} />
      <Route path="/analytics" element={<Placeholder title="Workforce Analytics" />} />
      <Route path="/settings" element={<Placeholder title="Settings & Preferences" />} />
      <Route path="/help" element={<Placeholder title="Help & Support" />} />
    </Route>
  </Routes>
);

export default AppRoutes;
