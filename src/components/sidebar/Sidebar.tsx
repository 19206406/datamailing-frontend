import {
  BarChart3,
  FileText,
  Home,
  LogOutIcon,
  Menu,
  PanelLeftOpenIcon,
  PanelRightCloseIcon,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SidebarContent from "./SidebarContent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import SidebarViewModel from "./Sidebar.viewmodel";

export interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: SidebarItem[];
  className?: string;
  defaultCollapsed?: boolean;
}

const defaultItems: SidebarItem[] = [
  { title: "Dashboard", icon: Home, href: "/tablero/home" },
  { title: "Usuarios", icon: User, href: "/tablero/users-managament" },
  { title: "Reportes", icon: BarChart3, href: "/tablero/report", badge: "3" },
  { title: "Documentos", icon: FileText, href: "/#" },
  { title: "Configuración", icon: Settings, href: "/#" },
];

const Sidebar = ({
  items = defaultItems,
  className,
  defaultCollapsed = false,
}: SidebarProps) => {
  const { handleLogout, redirectTo } = SidebarViewModel();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <>
      {/* Sidebar Mobile */}

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-white hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700"
        >
          <div className="flex items-center justify-center p-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h2 className="text-xl font-bold text-white">Datamailing</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <SidebarContent items={items} isMobile />
        </SheetContent>
      </Sheet>

      {/* Sidebar Desktop */}

      <div
        className={cn(
          "hidden md:flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700 h-screen transition-all duration-300 ease-in-out shadow-xl",
          isCollapsed ? "w-20" : "w-80",
          className
        )}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white-font-bold">D</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Datamailing
                </h2>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </div>
          )}

          {/* {isCollapsed && (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white font-bold">D</span>
            </div>
          )} */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-10 w-10 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200"
          >
            {isCollapsed ? (
              <PanelLeftOpenIcon className="h-5 w-5" />
            ) : (
              <PanelRightCloseIcon className="h-5 w-5 rotate-180" />
            )}
          </Button>
        </div>

        <SidebarContent
          items={items}
          isCollapsed={isCollapsed}
          redirectTo={redirectTo}
        />

        {!isCollapsed && (
          <div className="mt-auto p-6 border-t border-slate-700/50">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <Popover>
                    <PopoverTrigger>
                      <User className="w-5 h-5 text-slate-300" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-slate-900/90 text-white hover:bg-slate-800 hover:text-white"
                          onClick={handleLogout}
                        >
                          <LogOutIcon /> Cerrar sesión
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-slate-400">
                    Admin ("Nombre del user")
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
