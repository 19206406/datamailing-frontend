export interface UserStatsProps {
  emails: EmailRecord[];
  users: User[];
}

export interface TagStatsProps {
  emails: EmailRecord[];
  tags: EmailTag[];
}

interface ReportFiltersProps {
  filters: EmailFilters
  onFiltersChange: (filters: EmailFilters) => void
}