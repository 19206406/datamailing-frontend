import type { StatsCardsProps } from "@/types";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

const StatsCards = ({ users }: StatsCardsProps) => {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  const stats = [
    {
      title: "Total Usuarios",
      value: totalUsers,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Usuarios Activos",
      value: activeUsers,
      icon: UserCheck,
      color: "text-accent",
    },
    {
      title: "Usuarios Inactivos",
      value: inactiveUsers,
      icon: UserX,
      color: "text-muted-foreground",
    },
    {
      title: "Administradores",
      value: adminUsers,
      icon: Shield,
      color: "text-primary",
    },
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`size-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
