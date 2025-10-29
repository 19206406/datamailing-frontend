import { useState } from "react";

const UserDialogViewModel = ({ onSubmit, onOpenChange, open, user }) => {
  const availablePermissions = [
    { id: "read", label: "Lectura" },
    { id: "write", label: "Escritura" },
    { id: "delete", label: "Eliminación" },
    { id: "manage_users", label: "Gestionar Usuarios" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer" as "admin" | "editor" | "viewer",
    status: "active" as "active" | "inactive",
    permissions: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onsubmit(formData);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return {
    availablePermissions,
    formData,
    setFormData,
    handlePermissionToggle,
    handleSubmit,
  };
};

export default UserDialogViewModel;
