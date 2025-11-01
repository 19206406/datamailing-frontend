import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmailRecord } from "@/types";
import { Mail, ArrowRightLeft, Clock, CheckCircle2 } from "lucide-react";

interface EmailStatsProps {
  emails: EmailRecord[];
}

const EmailStats = ({ emails }: EmailStatsProps) => {
  const totalEmails = emails.length;
  const answeredEmails = emails.filter((e) => e.status === "answered").length;
  const forwardedEmails = emails.filter((e) => e.status === "forwarded").length;
  const avgResponseTime =
    emails.length > 0
      ? Math.round(
          emails.reduce((acc, e) => acc + e.responseTime, 0) / emails.length
        )
      : 0;

  const stats = [
    {
      title: "Total de Correos",
      value: totalEmails,
      icon: Mail,
      description: "Correos procesados",
      color: "text-primary",
    },
    {
      title: "Respondidos",
      value: answeredEmails,
      icon: CheckCircle2,
      description: `${
        totalEmails > 0 ? Math.round((answeredEmails / totalEmails) * 100) : 0
      }% del total`,
      color: "text-green-600",
    },
    {
      title: "Derivados",
      value: forwardedEmails,
      icon: ArrowRightLeft,
      description: `${
        totalEmails > 0 ? Math.round((forwardedEmails / totalEmails) * 100) : 0
      }% del total`,
      color: "text-accent",
    },
    {
      title: "Tiempo Promedio",
      value: `${avgResponseTime}m`,
      icon: Clock,
      description: "Tiempo de respuesta",
      color: "text-chart-3",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


export default EmailStats; 