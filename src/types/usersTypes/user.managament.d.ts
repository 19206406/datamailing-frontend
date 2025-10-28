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

