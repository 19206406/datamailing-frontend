import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserManagament } from "@/types";
import UsersTableViewModel from "./UserTable.viewmodel";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { permission } from "process";

export interface UsersTableProps {
  users: UserManagament[];
  onEdit: (user: UserManagament) => void;
  onDelete: (userId: string) => void;
}

const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  const { getInitials, getStatusBadgeVariant } = UsersTableViewModel();

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuarios</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Permisos</TableHead>
            <TableHead>Último acceso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24">
                No se encontraron usuarios
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-secondaryColor text-white text-xs font-medium">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>
                    {user.role === "admin" && (
                      <Shield className="mr-1 size-3" />
                    )}
                    {user.role === "admin"
                      ? "Administrador"
                      : user.role === "editor"
                      ? "Editor"
                      : "Visualizador"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status == "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.slice(0, 2).map((permission) => (
                      <Badge
                        key={permission}
                        variant="outline"
                        className="text-xs"
                      >
                        {permission}
                      </Badge>
                    ))}
                    {user.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.permissions.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(user.lastLogin).toLocaleDateString("es-ES")}
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
