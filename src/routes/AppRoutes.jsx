// src/routes/AppRoutes.jsx
// Central React Router DOM route configuration

import { Routes, Route } from "react-router-dom";
import MainLayout   from "../layouts/MainLayout";
import Dashboard    from "../pages/Dashboard/Dashboard";
import Placeholder  from "../pages/Placeholder/Placeholder";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index path="/"          element={<Dashboard />} />
      <Route path="/chat"            element={<Placeholder title="Chat" />} />
      <Route path="/meetings"        element={<Placeholder title="Meetings" />} />
      <Route path="/employees"       element={<Placeholder title="Employees" />} />
      <Route path="/calendar"        element={<Placeholder title="Calendar" />} />
      <Route path="/files"           element={<Placeholder title="Files" />} />
      <Route path="/analytics"       element={<Placeholder title="Analytics" />} />
      <Route path="/settings"        element={<Placeholder title="Settings" />} />
      <Route path="/help"            element={<Placeholder title="Help & Support" />} />
    </Route>
  </Routes>
);

export default AppRoutes;
