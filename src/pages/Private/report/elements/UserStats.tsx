import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserStatsProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const UserStats = ({ emails, users }: UserStatsProps) => {
  const userStats = users
    .map((user) => {
      const userEmails = emails.filter((e) => e.answeredBy.id === user.id);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayEmails = userEmails.filter((e) => {
        const emailDate = new Date(e.answeredAt);
        emailDate.setHours(0, 0, 0, 0);
        return emailDate.getTime() === today.getTime();
      });

      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const weekEmails = userEmails.filter(
        (e) => new Date(e.answeredAt) >= weekStart
      );

      const answered = userEmails.filter((e) => e.status === "answered").length;
      const forwarded = userEmails.filter(
        (e) => e.status === "forwarded"
      ).length;

      return {
        user,
        total: userEmails.length,
        today: todayEmails.length,
        week: weekEmails.length,
        answered,
        forwarded,
      };
    })
    .filter((stat) => stat.total > 0); // Solo mostrar usuarios con correos

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Estadísticas por Usuario</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <Card key={stat.user.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={stat.user.avatar || "/placeholder.svg"}
                    alt={stat.user.name}
                  />
                  <AvatarFallback>
                    {stat.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium truncate">
                    {stat.user.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground capitalize">
                    {stat.user.role}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hoy</span>
                <span className="text-sm font-bold text-primary">
                  {stat.today}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Esta semana
                </span>
                <span className="text-sm font-bold text-accent">
                  {stat.week}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-lg font-bold">{stat.total}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-green-600">✓ {stat.answered}</span>
                <span className="text-accent">→ {stat.forwarded}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
