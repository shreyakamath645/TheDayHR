// src/services/api.js
// Centralized API client for TheDayHR frontend communicating with the Express backend

const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || `HTTP error! Status: ${response.status}`);
    }
    return result;
  } catch (error) {
    console.warn(`[API] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth & Profile
  auth: {
    getProfile: () => request("/auth/me"),
    updateProfile: (data) => request("/auth/profile", { method: "PUT", body: JSON.stringify(data) }),
    updateStatus: (status) => request("/auth/status", { method: "PATCH", body: JSON.stringify({ status }) }),
  },

  // Employees Directory
  employees: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/employees${query ? `?${query}` : ""}`);
    },
    getById: (id) => request(`/employees/${id}`),
    create: (data) => request("/employees", { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => request(`/employees/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => request(`/employees/${id}`, { method: "DELETE" }),
  },

  // Attendance
  attendance: {
    getToday: () => request("/attendance/today"),
    checkIn: (workMode) => request("/attendance/check-in", { method: "POST", body: JSON.stringify({ workMode }) }),
    checkOut: () => request("/attendance/check-out", { method: "POST" }),
    getHistory: () => request("/attendance/history"),
  },

  // Leaves & HR
  leaves: {
    getBalances: () => request("/leaves/balances"),
    getRequests: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/leaves/requests${query ? `?${query}` : ""}`);
    },
    apply: (data) => request("/leaves/apply", { method: "POST", body: JSON.stringify(data) }),
    updateStatus: (id, status) =>
      request(`/leaves/requests/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  },

  // Meetings
  meetings: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/meetings${query ? `?${query}` : ""}`);
    },
    getById: (id) => request(`/meetings/${id}`),
    create: (data) => request("/meetings", { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) => request(`/meetings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id) => request(`/meetings/${id}`, { method: "DELETE" }),
  },

  // Chat & Messaging
  chats: {
    getAll: () => request("/chats"),
    getMessages: (chatId) => request(`/chats/${chatId}/messages`),
    sendMessage: (chatId, text, sender = "me") =>
      request(`/chats/${chatId}/messages`, { method: "POST", body: JSON.stringify({ text, sender }) }),
    markRead: (chatId) => request(`/chats/${chatId}/read`, { method: "PATCH" }),
  },

  // Teams & Channels
  teams: {
    getCategories: () => request("/teams/categories"),
    getChannels: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/teams/channels${query ? `?${query}` : ""}`);
    },
    createChannel: (data) => request("/teams/channels", { method: "POST", body: JSON.stringify(data) }),
    getMembers: () => request("/teams/members"),
  },

  // Announcements
  announcements: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/announcements${query ? `?${query}` : ""}`);
    },
    create: (data) => request("/announcements", { method: "POST", body: JSON.stringify(data) }),
    markRead: (id) => request(`/announcements/${id}/read`, { method: "PATCH" }),
  },

  // Notifications
  notifications: {
    getAll: () => request("/notifications"),
    markRead: (id) => request(`/notifications/${id}/read`, { method: "PATCH" }),
    markAllRead: () => request("/notifications/mark-all-read", { method: "POST" }),
  },

  // Dashboard Overview & Stats
  dashboard: {
    getStats: () => request("/dashboard/stats"),
    getOverview: () => request("/dashboard/overview"),
  },

  // Calendar
  calendar: {
    getEvents: () => request("/calendar/events"),
    createEvent: (data) => request("/calendar/events", { method: "POST", body: JSON.stringify(data) }),
    deleteEvent: (id) => request(`/calendar/events/${id}`, { method: "DELETE" }),
  },

  // Documents & Files
  files: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/files${query ? `?${query}` : ""}`);
    },
    upload: (data) => request("/files", { method: "POST", body: JSON.stringify(data) }),
    delete: (id) => request(`/files/${id}`, { method: "DELETE" }),
  },

  // AI Assistant
  ai: {
    chat: (message) => request("/ai/chat", { method: "POST", body: JSON.stringify({ message }) }),
  },
};

export default api;
