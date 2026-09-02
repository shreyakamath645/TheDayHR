// src/App.jsx
// Root application component — provides context and router

import { BrowserRouter } from "react-router-dom";
import { AppProvider }   from "./context/AppContext";
import AppRoutes         from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
