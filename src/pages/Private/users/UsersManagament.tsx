import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import UserManagamentViewModel from "./UserManagament.viewmodel";
import { Button } from "@/components/ui/button";
import UsersTable from "./elements/UsersTable";
import StatsCards from "./elements/StatsCards";
import UserDialog from "./elements/UserDialog";

const UsersManagament = () => {
  const {
    users,
    isDialogOpen,
    handleDialogClose,
    editingUser,
    handleUpdateUser,
    handleCreateUser,
    searchQuery,
    setSearchQuery,
    setIsDialogOpen,
    filteredUsers,
    handleDeleteUser,
    handleEditUser,
  } = UserManagamentViewModel();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        {/** Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Administración de Usuario
          </h1>
          <p className="mt-2 text-mutted-foreground text-pretty">
            Administración de usuarios, roles y permisos
          </p>
        </div>

        {/** Stats */}
        <StatsCards users={users} />

        {/** Acciones */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Nuevo Usuario
          </Button>
        </div>

        {/** User Table */}
        <UsersTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/** UserDialog */}
        <UserDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          user={editingUser}
        />
      </div>
    </div>
  );
};

export default UsersManagament;
