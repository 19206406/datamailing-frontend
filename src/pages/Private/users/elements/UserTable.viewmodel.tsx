const UsersTableViewModel = () => {
  const getRoleBadgeVariant = (role: string): string => {
    switch (role) {
      case "admin":
        return "default";
      case "editor":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string): string => {
    return status === "active" ? "default" : "secondary";
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return {
    getRoleBadgeVariant,
    getStatusBadgeVariant,
    getInitials,
  };
};

export default UsersTableViewModel;
