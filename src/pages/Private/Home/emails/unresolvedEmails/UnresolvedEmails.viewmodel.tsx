import { useState } from "react";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  fullContent: string;
}

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "GitHub",
    subject: "New pull request on your repository",
    preview:
      "John Doe has opened a new pull request for review. Please check the changes and provide feedback...",
    date: "10:30 AM",
    isRead: false,
    isStarred: true,
    labels: ["Work", "Important"],
    fullContent:
      "John Doe has opened a new pull request for review.\n\nPull Request #234: Add new authentication feature\n\nPlease review the changes and provide your feedback. The changes include:\n- New login component\n- JWT token implementation\n- Updated security measures\n\nThank you!",
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    subject: "Meeting notes from yesterday",
    preview:
      "Hi team, here are the notes from our meeting yesterday. Action items are highlighted...",
    date: "9:15 AM",
    isRead: false,
    isStarred: false,
    labels: ["Work"],
    fullContent:
      "Hi team,\n\nHere are the notes from our meeting yesterday:\n\n1. Q4 Planning review\n2. Budget allocation discussion\n3. New hiring plans\n4. Project timeline adjustments\n\nAction items:\n- Complete budget proposal by Friday\n- Schedule follow-up meeting for next week\n\nBest regards,\nSarah",
  },
  {
    id: "3",
    sender: "Netflix",
    subject: "New shows added this week",
    preview:
      "Check out the latest additions to Netflix. Your favorite genres have new content...",
    date: "Yesterday",
    isRead: true,
    isStarred: false,
    labels: ["Personal"],
    fullContent:
      'Check out the latest additions to Netflix!\n\nNew This Week:\n- Drama series: "The Crown" Season 6\n- Comedy special: Stand-up collection\n- Documentary: Nature\'s wonders\n\nHappy watching!\nThe Netflix Team',
  },
  {
    id: "4",
    sender: "LinkedIn",
    subject: "You have 3 new connection requests",
    preview:
      "Maria Garcia, Carlos Rodriguez, and Ana Martinez want to connect with you...",
    date: "Yesterday",
    isRead: true,
    isStarred: false,
    labels: ["Social"],
    fullContent:
      "You have new connection requests on LinkedIn:\n\n1. Maria Garcia - Senior Developer at Tech Corp\n2. Carlos Rodriguez - Product Manager at StartupXYZ\n3. Ana Martinez - UX Designer at Design Studio\n\nView and respond to connection requests.",
  },
  {
    id: "5",
    sender: "Amazon",
    subject: "Your order has been shipped",
    preview:
      "Your order #12345 has been shipped and will arrive by October 18...",
    date: "Oct 13",
    isRead: true,
    isStarred: false,
    labels: ["Shopping"],
    fullContent:
      "Your Amazon order has been shipped!\n\nOrder #12345\nExpected delivery: October 18, 2025\n\nItems:\n- Wireless Mouse\n- USB-C Cable (2-pack)\n\nTrack your package: [Tracking Link]\n\nThank you for shopping with Amazon!",
  },
];

const UnresolvedEmailsViewModel = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emails, setEmails] = useState<Email[]>(mockEmails); 
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const toggleEmailSelection = (id: string) => {
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const openEmail = (email: Email) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    );
    setSelectedEmail(email);
    setCurrentView("detail");
  };

  const goBackToList = () => {
    setCurrentView("list");
    setSelectedEmail(null);
  };

  const getLabelColor = (label: string): string => {
    const colors: Record<string, string> = {
      Work: "bg-blue-100 text-blue-800",
      Important: "bg-red-100 text-red-800",
      Personal: "bg-green-100 text-green-800",
      Social: "bg-purple-100 text-purple-800",
      Shopping: "bg-yellow-100 text-yellow-800",
    };

    return colors[label] || "bg-gray-100 text-gray-800";
  };

  return {
    selectedEmails,
    emails,
    currentView,
    selectedEmail,
    hoveredRow,
    toggleEmailSelection,
    toggleStar,
    openEmail,
    goBackToList,
    getLabelColor,
    setSelectedEmails,
    setHoveredRow,
  };
};

export default UnresolvedEmailsViewModel;