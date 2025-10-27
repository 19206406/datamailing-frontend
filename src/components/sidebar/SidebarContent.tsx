import { ScrollArea } from "@radix-ui/react-scroll-area";
import type { SidebarItem } from "./Sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
/* import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip"; */

interface SidebarContentProps {
  items: SidebarItem[];
  isCollapsed?: boolean;
  isMobile?: boolean;
  redirectTo: (href: string) => void;
}

const SidebarContent = ({
  items,
  isCollapsed = false,
  isMobile = false,
  redirectTo,
}: SidebarContentProps) => {
  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <nav className="space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-start text-primaryColor hover:bg-tertiaryColor hover:text-secondaryColor transition-colors cursor-pointer",
                isCollapsed && !isMobile && "justify-center px-2"
              )}
              onClick={() => redirectTo(item.href)}
            >
              <Icon
                className={cn(
                  "h-8 w-8 text-white font-semibold",
                  !isCollapsed || isMobile ? "mr-3" : ""
                )}
              />
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="flex-1 text-left text-white">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-secondaryColor text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>
    </ScrollArea>
  );
};

export default SidebarContent;
