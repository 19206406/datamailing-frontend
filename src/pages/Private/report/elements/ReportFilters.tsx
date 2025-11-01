import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import type { ReportFiltersProps, EmailStatus, EmailFilters } from "@/types";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge, Calendar, Filter, Search, X } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mockTags, mockUsers } from "@/utils/data/reportData";
import { useState } from "react";
import { es } from "date-fns/locale";

const ReportFilters = ({ filters, onFiltersChange }: ReportFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const updateFilters = (updates: Partial<EmailFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: { from: null, to: null },
      users: [],
      tags: [],
      status: [],
      searchQuery: "",
    });
  };

  const activeFiltersCount =
    filters.users.length +
    filters.tags.length +
    filters.status.length +
    (filters.dateRange.from ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por asunto, remitente o contenido..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "dd MMM", { locale: es })}{" "}
                      - {format(filters.dateRange.to, "dd MMM", { locale: es })}
                    </>
                  ) : (
                    format(filters.dateRange.from, "dd MMM yyyy", {
                      locale: es,
                    })
                  )
                ) : (
                  "Seleccionar fechas"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="range"
                selected={{
                  from: filters.dateRange.from || undefined,
                  to: filters.dateRange.to || undefined,
                }}
                onSelect={(range) => {
                  updateFilters({
                    dateRange: {
                      from: range?.from || null,
                      to: range?.to || null,
                    },
                  });
                }}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>

          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 px-1.5 py-0.5 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Filtros avanzados</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-auto p-1 text-xs"
                    >
                      Limpiar todo
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-medium mb-2 block">
                      Estado
                    </Label>
                    <div className="space-y-2">
                      {(
                        [
                          "answered",
                          "forwarded",
                          "pending",
                          "closed",
                        ] as EmailStatus[]
                      ).map((status) => (
                        <div
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.status.includes(status)}
                            onCheckedChange={(checked) => {
                              updateFilters({
                                status: checked
                                  ? [...filters.status, status]
                                  : filters.status.filter((s) => s !== status),
                              });
                            }}
                          />
                          <label
                            htmlFor={`status-${status}`}
                            className="text-sm cursor-pointer capitalize"
                          >
                            {status === "answered" && "Respondido"}
                            {status === "forwarded" && "Derivado"}
                            {status === "pending" && "Pendiente"}
                            {status === "closed" && "Cerrado"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">
                      Usuarios
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {mockUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={filters.users.includes(user.id)}
                            onCheckedChange={(checked) => {
                              updateFilters({
                                users: checked
                                  ? [...filters.users, user.id]
                                  : filters.users.filter((u) => u !== user.id),
                              });
                            }}
                          />
                          <label
                            htmlFor={`user-${user.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {user.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-2 block">
                      Etiquetas
                    </Label>
                    <div className="space-y-2">
                      {mockTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={filters.tags.includes(tag.id)}
                            onCheckedChange={(checked) => {
                              updateFilters({
                                tags: checked
                                  ? [...filters.tags, tag.id]
                                  : filters.tags.filter((t) => t !== tag.id),
                              });
                            }}
                          />
                          <label
                            htmlFor={`tag-${tag.id}`}
                            className="text-sm cursor-pointer flex items-center gap-2"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${tag.color}`}
                            />
                            {tag.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="h-9 w-9"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.users.map((userId) => {
            const user = mockUsers.find((u) => u.id === userId);
            return user ? (
              <Badge key={userId} variant="secondary" className="gap-1">
                {user.name}
                <button
                  onClick={() =>
                    updateFilters({
                      users: filters.users.filter((u) => u !== userId),
                    })
                  }
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {filters.tags.map((tagId) => {
            const tag = mockTags.find((t) => t.id === tagId);
            return tag ? (
              <Badge key={tagId} variant="secondary" className="gap-1">
                <span className={`w-2 h-2 rounded-full ${tag.color}`} />
                {tag.name}
                <button
                  onClick={() =>
                    updateFilters({
                      tags: filters.tags.filter((t) => t !== tagId),
                    })
                  }
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="gap-1 capitalize"
            >
              {status === "answered" && "Respondido"}
              {status === "forwarded" && "Derivado"}
              {status === "pending" && "Pendiente"}
              {status === "closed" && "Cerrado"}
              <button
                onClick={() =>
                  updateFilters({
                    status: filters.status.filter((s) => s !== status),
                  })
                }
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportFilters;
