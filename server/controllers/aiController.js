// server/controllers/aiController.js
import { db } from "../data/db.js";

const KNOWLEDGE_BASE = [
  {
    keywords: ["leave", "pto", "vacation", "holiday", "casual", "sick"],
    answer:
      "Employees receive 18 days of Paid Leave (PTO), 10 days of Sick Leave, and 12 days of Casual Leave annually. Applications can be submitted directly via the HR Hub or Calendar.",
  },
  {
    keywords: ["balance", "remaining leave", "days left"],
    dynamic: true,
    handler: () => {
      const balances = db.get("leaveBalances") || {};
      return `Your current leave balances are: Paid Leave: ${balances.paid?.remaining || 14} days remaining, Sick Leave: ${balances.sick?.remaining || 8} days remaining, Casual Leave: ${balances.casual?.remaining || 7} days remaining.`;
    },
  },
  {
    keywords: ["insurance", "medical", "health", "claim", "hospital"],
    answer:
      "Medical insurance coverage provides up to ₹5,00,000 for employees and immediate dependents. To submit claims, upload hospital discharge summaries via Files > Benefits & Insurance.",
  },
  {
    keywords: ["remote", "wfh", "hybrid", "office", "hours", "timing"],
    answer:
      "TheDayHR hybrid workplace policy requires 2 mandatory collaboration days in-office per week. Core flexible working hours are 10:00 AM – 4:00 PM IST.",
  },
  {
    keywords: ["payroll", "salary", "paycheck", "payslip", "bonus"],
    answer:
      "Monthly payroll cutoff is on the 25th of every month. Salary credits occur on the last working day of each calendar month.",
  },
  {
    keywords: ["meeting", "schedule", "calendar", "call"],
    dynamic: true,
    handler: () => {
      const meetings = db.get("meetings") || [];
      const count = meetings.length;
      return `You have ${count} meetings scheduled. You can view timings and join links directly on the Meetings page or Calendar.`;
    },
  },
  {
    keywords: ["who is", "contact", "employee", "team", "directory"],
    dynamic: true,
    handler: (query) => {
      const employees = db.get("employees") || [];
      const match = employees.find((e) => query.toLowerCase().includes(e.name.toLowerCase()));
      if (match) {
        return `${match.name} is a ${match.role} in ${match.department} (${match.location}). Contact: ${match.email} | Status: ${match.status}.`;
      }
      return `Our company directory has ${employees.length} team members registered. Check the Employees page to search by department or role.`;
    },
  },
];

export const askAI = (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Prompt message is required" });
    }

    const q = message.toLowerCase();
    let reply = null;

    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        if (item.dynamic && item.handler) {
          reply = item.handler(message);
        } else {
          reply = item.answer;
        }
        break;
      }
    }

    if (!reply) {
      reply =
        "I'm here to assist with TheDayHR inquiries! You can ask about our leave balances, medical insurance, hybrid work policies, payroll schedules, or team directory details.";
    }

    res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
