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
import FilesPage from "../pages/Files/FilesPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import HelpPage from "../pages/Help/HelpPage";
import HRHubPage from "../pages/HRHub/HRHubPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

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
      <Route path="/files" element={<FilesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/hr" element={<HRHubPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
