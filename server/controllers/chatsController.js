// server/controllers/chatsController.js
import { db } from "../data/db.js";

export const getChats = (req, res) => {
  try {
    const chats = db.get("chats") || [];
    res.json({ success: true, count: chats.length, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessagesByChatId = (req, res) => {
  try {
    const { id } = req.params;
    const allMessages = db.get("chatMessages") || {};
    const messages = allMessages[id] || [
      { id: 1, sender: "them", text: "Hello! Feel free to message here.", time: "10:00 AM" },
    ];
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = (req, res) => {
  try {
    const { id } = req.params;
    const { text, sender } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Message text is required" });
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMessage = {
      id: Date.now(),
      sender: sender || "me",
      text: text.trim(),
      time: timeStr,
    };

    const allMessages = db.get("chatMessages") || {};
    if (!allMessages[id]) {
      allMessages[id] = [];
    }
    allMessages[id].push(newMessage);
    db.set("chatMessages", allMessages);

    // Update last message in chats list
    const chats = db.get("chats") || [];
    const chatIdx = chats.findIndex((c) => String(c.id) === String(id));
    if (chatIdx !== -1) {
      chats[chatIdx].message = text.trim();
      chats[chatIdx].time = timeStr;
      db.set("chats", chats);
    }

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = (req, res) => {
  try {
    const { id } = req.params;
    const chats = db.get("chats") || [];
    const chatIdx = chats.findIndex((c) => String(c.id) === String(id));
    if (chatIdx !== -1) {
      chats[chatIdx].unread = 0;
      db.set("chats", chats);
    }
    res.json({ success: true, message: "Chat marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
