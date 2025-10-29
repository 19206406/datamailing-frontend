export interface UserManagament {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  permissions: string[];
  createdAt: string;
  lastLogin: string;
}

export interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    user: Omit<UserManagament, "id" | "createdAt" | "lastLogin">
  ) => void;
  user?: UserManagament | null;
}

export interface StatsCardsProps {
  users: UserManagament[];
}
