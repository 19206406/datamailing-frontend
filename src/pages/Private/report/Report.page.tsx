import { Button } from "@/components/ui/button";
import ReportPageViewmodel from "./Report.page.viewmodel";
import { Download, FileText } from "lucide-react";
import UserStats from "./elements/UserStats";
import TagStats from "./elements/TagStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReportFilters from "./elements/ReportFilters";
import EmailTable from "./elements/EmailTable";
import { mockTags, mockUsers } from "@/utils/data/reportData";
import EmailStats from "./elements/EmailStats";

const ReportPage = () => {
  const { filters, setFilters, filteredEmails } = ReportPageViewmodel();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              Reporte de Correos Electrónicos
            </h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Gestiona y analiza todos los correos contestados y derivados por
              tu equipo
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generar Reporte
            </Button>
          </div>
        </div>

        <EmailStats emails={filteredEmails} />

        <UserStats emails={filteredEmails} users={mockUsers} />

        <TagStats emails={filteredEmails} tags={mockTags} />

        <Card>
          <CardHeader>
            <CardTitle>Historial de Correos</CardTitle>
            <CardDescription>
              Visualiza y filtra todos los correos procesados por tu equipo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ReportFilters filters={filters} onFiltersChange={setFilters} />
            <EmailTable emails={filteredEmails} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;
