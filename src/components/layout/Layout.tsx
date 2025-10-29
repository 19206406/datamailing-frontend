import { cn } from "@/lib/utils";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import type { AppLoyoutProps } from "@/types";

const LayoutApp = ({className, sidebarItems }: AppLoyoutProps) => {
  return (
    <div className="flex max-h-screen">
      <Sidebar items={sidebarItems} />

      <main className={cn("flex-1 overflow-auto", "md:ml-0", className)}>
        <div className="p-6 pt-16 md:pt-6">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default LayoutApp;
