import { useState } from "react";
import type { UserManagament } from "@/types";

const UserManagamentViewModel = () => {

  const [users, setUsers] = useState<UserManagament[]>([
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@example.com",
      role: "admin",
      status: "active",
      permissions: ["read", "write", "delete", "manage_users"],
      createdAt: "2024-01-15",
      lastLogin: "2025-01-20",
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      role: "editor",
      status: "active",
      permissions: ["read", "write"],
      createdAt: "2024-03-22",
      lastLogin: "2025-01-19",
    },
    {
      id: "3",
      name: "María López",
      email: "maria.lopez@example.com",
      role: "viewer",
      status: "inactive",
      permissions: ["read"],
      createdAt: "2024-06-10",
      lastLogin: "2024-12-15",
    },
    {
      id: "4",
      name: "Juan Martínez",
      email: "juan.martinez@example.com",
      role: "editor",
      status: "active",
      permissions: ["read", "write"],
      createdAt: "2024-08-05",
      lastLogin: "2025-01-21",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserManagament | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = (
    userData: Omit<UserManagament, "id" | "createdAt" | "lastLogin">
  ) => {
    const newUser = {
      ...userData,
      id: String(users.length + 1),
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    setIsDialogOpen(false);
  };

  const handleUpdateUser = (
    userData: Omit<UserManagament, "id" | "createdAt" | "lastLogin">
  ) => {
    if (!editingUser) return;
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...user, ...userData } : user
      )
    );
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user: UserManagament) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  return {
    searchQuery, 
    setSearchQuery,
    setIsDialogOpen, 
    filteredUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleDialogClose,
    isDialogOpen,
    handleEditUser,
  };
};

export default UserManagamentViewModel;
