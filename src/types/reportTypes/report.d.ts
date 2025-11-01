export type EmailStatus = "answered" | "forwarded" | "pending" | "closed";
export type UserRole = "admin" | "user" | "support";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface EmailTag {
  id: string;
  name: string;
  color: string;
}

export interface EmailRecord {
  id: string;
  subject: string;
  from: string;
  to: string;
  answeredBy: User;
  answeredAt: Date;
  status: EmailStatus;
  tags: EmailTag[];
  forwardedTo?: User;
  forwardedAt?: Date;
  forwardedReason?: string;
  responseTime: number; // en minutos
  content: string;
}

export interface EmailFilters {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  users: string[];
  tags: string[];
  status: EmailStatus[];
  searchQuery: string;
}
