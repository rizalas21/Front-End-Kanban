type Status = "todo" | "doing" | "review" | "done" | "rework";

type Label = "feature" | "bug" | "issue" | "undefined";

export interface CheckList {
  id: number;
  text: string;
  done: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  status: Status;
  title: string;
  description: string;
  assignee: User[];
  dueDate: string;
  label: Label;
  priority: boolean;
  checklist: CheckList[];
  attachments: string[];
}

export const USERS: User[] = [
  {
    id: "1",
    name: "Rizal",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Budi",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Andi",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    name: "Sinta",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "5",
    name: "Rizky",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "6",
    name: "Dewi",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: "7",
    name: "Fajar",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
];

export const initialTask: Task[] = [
  {
    id: "1",
    status: "todo",
    title: "Design Landing Page",
    description: "Create modern landing page UI",
    assignee: [USERS[0], USERS[1]],
    dueDate: "2026-05-10",
    label: "feature",
    priority: true,
    checklist: [
      { id: 1, text: "Navbar", done: true },
      { id: 2, text: "Hero Section", done: false },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
      "logo.png",
    ],
  },

  {
    id: "2",
    status: "todo",
    title: "Fix Login Validation",
    description: "Resolve validation issue on login form",
    assignee: [USERS[2]],
    dueDate: "2026-05-12",
    label: "bug",
    priority: false,
    checklist: [
      { id: 1, text: "Check Email Regex", done: false },
      { id: 2, text: "Display Error", done: false },
    ],
    attachments: [],
  },

  {
    id: "3",
    status: "todo",
    title: "Investigate API Delay",
    description: "Find root cause of slow API response",
    assignee: [USERS[3], USERS[1]],
    dueDate: "2026-05-15",
    label: "undefined",
    priority: true,
    checklist: [
      { id: 1, text: "Check Logs", done: true },
      { id: 2, text: "Monitor Database", done: false },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    ],
  },

  {
    id: "4",
    status: "doing",
    title: "Build Kanban UI",
    description: "Create draggable kanban board layout",
    assignee: [USERS[4]],
    dueDate: "2026-05-16",
    label: "issue",
    priority: true,
    checklist: [
      { id: 1, text: "Create Columns", done: true },
      { id: 2, text: "Setup Drag Drop", done: false },
    ],
    attachments: [],
  },

  {
    id: "5",
    status: "doing",
    title: "Fix Mobile Navbar",
    description: "Navbar broken on small screen",
    assignee: [USERS[1]],
    dueDate: "2026-05-17",
    label: "bug",
    priority: false,
    checklist: [
      { id: 1, text: "Fix Padding", done: true },
      { id: 2, text: "Adjust Icon Size", done: false },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200",
    ],
  },

  {
    id: "6",
    status: "doing",
    title: "Notification Requirement",
    description: "Notification behavior still unclear",
    assignee: [USERS[0]],
    dueDate: "2026-05-18",
    label: "feature",
    priority: false,
    checklist: [
      { id: 1, text: "Discuss Requirement", done: false },
      { id: 2, text: "Create Draft Flow", done: false },
    ],
    attachments: [],
  },

  {
    id: "7",
    status: "review",
    title: "Review Dashboard Chart",
    description: "Validate dashboard analytics chart",
    assignee: [USERS[2], USERS[3]],
    dueDate: "2026-05-19",
    label: "feature",
    priority: false,
    checklist: [
      { id: 1, text: "Revenue Chart", done: true },
      { id: 2, text: "Expense Chart", done: true },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
      "chart.xlsx",
    ],
  },

  {
    id: "8",
    status: "review",
    title: "Checkout Flow Testing",
    description: "Review checkout page issue",
    assignee: [USERS[1]],
    dueDate: "2026-05-20",
    label: "issue",
    priority: true,
    checklist: [
      { id: 1, text: "Validate Form", done: true },
      { id: 2, text: "Test Payment", done: false },
    ],
    attachments: [],
  },

  {
    id: "9",
    status: "review",
    title: "Sidebar Collapse Bug",
    description: "Sidebar randomly collapsing",
    assignee: [USERS[0]],
    dueDate: "2026-05-21",
    label: "bug",
    priority: false,
    checklist: [
      { id: 1, text: "Replicate Issue", done: true },
      { id: 2, text: "Debug State", done: false },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
    ],
  },

  {
    id: "10",
    status: "done",
    title: "Setup Prisma",
    description: "Initialize Prisma ORM",
    assignee: [USERS[2]],
    dueDate: "2026-05-01",
    label: "undefined",
    priority: false,
    checklist: [
      { id: 1, text: "Create Schema", done: true },
      { id: 2, text: "Run Migration", done: true },
    ],
    attachments: [],
  },

  {
    id: "11",
    status: "done",
    title: "Fix Login Redirect",
    description: "Redirect after login now works",
    assignee: [USERS[3]],
    dueDate: "2026-05-03",
    label: "bug",
    priority: true,
    checklist: [
      { id: 1, text: "Handle Callback", done: true },
      { id: 2, text: "Test Middleware", done: true },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200",
    ],
  },

  {
    id: "12",
    status: "done",
    title: "Deploy Staging App",
    description: "Deploy app to staging server",
    assignee: [USERS[4]],
    dueDate: "2026-05-05",
    label: "feature",
    priority: false,
    checklist: [
      { id: 1, text: "Build App", done: true },
      { id: 2, text: "Setup Domain", done: true },
    ],
    attachments: [],
  },

  {
    id: "13",
    status: "rework",
    title: "Refactor Sidebar",
    description: "Improve sidebar structure",
    assignee: [USERS[0]],
    dueDate: "2026-05-22",
    label: "issue",
    priority: true,
    checklist: [
      { id: 1, text: "Split Components", done: true },
      { id: 2, text: "Cleanup Code", done: false },
    ],
    attachments: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
      "sidebar.tsx",
    ],
  },

  {
    id: "14",
    status: "rework",
    title: "Fix Dark Mode",
    description: "Dark mode color mismatch",
    assignee: [USERS[1]],
    dueDate: "2026-05-23",
    label: "bug",
    priority: false,
    checklist: [
      { id: 1, text: "Fix Background", done: true },
      { id: 2, text: "Adjust Text", done: false },
    ],
    attachments: [],
  },

  {
    id: "15",
    status: "rework",
    title: "Update User Flow",
    description: "User flow needs redesign discussion",
    assignee: [USERS[2]],
    dueDate: "2026-05-24",
    label: "feature",
    priority: true,
    checklist: [
      { id: 1, text: "Review Requirement", done: true },
      { id: 2, text: "Update Wireframe", done: false },
    ],
    attachments: [],
  },
];
