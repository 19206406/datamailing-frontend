export interface Email {
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
