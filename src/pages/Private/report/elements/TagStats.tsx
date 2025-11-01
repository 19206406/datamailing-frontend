import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TagStatsProps } from "@/types";
import { Tag } from "lucide-react";

const TagStats = ({ emails, tags }: TagStatsProps) => {
  const tagStats = tags
    .map((tag) => {
      const tagEmails = emails.filter((e) =>
        e.tags.some((t) => t.id === tag.id)
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayEmails = tagEmails.filter((e) => {
        const emailDate = new Date(e.answeredAt);
        emailDate.setHours(0, 0, 0, 0);
        return emailDate.getTime() === today.getTime();
      });

      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const weekEmails = tagEmails.filter(
        (e) => new Date(e.answeredAt) >= weekStart
      );

      const answered = tagEmails.filter((e) => e.status === "answered").length;
      const forwarded = tagEmails.filter(
        (e) => e.status === "forwarded"
      ).length;

      return {
        tag,
        total: tagEmails.length,
        today: todayEmails.length,
        week: weekEmails.length,
        answered,
        forwarded,
        percentage:
          emails.length > 0
            ? Math.round((tagEmails.length / emails.length) * 100)
            : 0,
      };
    })
    .filter((stat) => stat.total > 0) // Solo mostrar etiquetas con correos
    .sort((a, b) => b.total - a.total); // Ordenar por total descendente

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Estadísticas por Etiqueta</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tagStats.map((stat) => (
          <Card key={stat.tag.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {stat.tag.name}
                </CardTitle>
                <Badge className={`${stat.tag.color} text-white border-0`}>
                  {stat.percentage}%
                </Badge>
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

export default TagStats;
