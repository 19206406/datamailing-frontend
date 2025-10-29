export interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  isActive?: boolean;
}

export interface SidebarProps {
  items?: SidebarItem[];
  className?: string;
  defaultCollapsed?: boolean;
}

export interface AppLoyoutProps {
  className?: string;
  sidebarItems?: Array<{
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: string;
  }>;
}

export interface SidebarContentProps {
  items: SidebarItem[];
  isCollapsed?: boolean;
  isMobile?: boolean;
  redirectTo: (href: string) => void;
}