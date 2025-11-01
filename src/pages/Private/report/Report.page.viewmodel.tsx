import type { EmailFilters } from "@/types";
import { mockEmails } from "@/utils/data/reportData";
import { useMemo, useState } from "react";

const ReportPageViewmodel = () => {
  const [filters, setFilters] = useState<EmailFilters>({
    dateRange: { from: null, to: null },
    users: [],
    tags: [],
    status: [],
    searchQuery: "",
  });

  const filteredEmails = useMemo(() => {
    return mockEmails.filter((email) => {
      // Filtro de búsqueda
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          email.subject.toLowerCase().includes(query) ||
          email.from.toLowerCase().includes(query) ||
          email.content.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Filtro de rango de fechas
      if (filters.dateRange.from) {
        const emailDate = new Date(email.answeredAt);
        if (emailDate < filters.dateRange.from) return false;
      }
      if (filters.dateRange.to) {
        const emailDate = new Date(email.answeredAt);
        if (emailDate > filters.dateRange.to) return false;
      }

      // Filtro de usuarios
      if (filters.users.length > 0) {
        const matchesUser =
          filters.users.includes(email.answeredBy.id) ||
          (email.forwardedTo && filters.users.includes(email.forwardedTo.id));
        if (!matchesUser) return false;
      }

      // Filtro de etiquetas
      if (filters.tags.length > 0) {
        const matchesTags = email.tags.some((tag) =>
          filters.tags.includes(tag.id)
        );
        if (!matchesTags) return false;
      }

      // Filtro de estado
      if (filters.status.length > 0) {
        if (!filters.status.includes(email.status)) return false;
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    filteredEmails,
  };
};

export default ReportPageViewmodel;
