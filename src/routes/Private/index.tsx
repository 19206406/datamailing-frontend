import LayoutApp from "@/components/layout/Layout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const MainMenuPageRoutes = lazy(() => import("./Modules/MainMenu.route"));
const UsersPageRoutes = lazy(() => import("./Modules/Users.route"));
const ReportPageRoutes = lazy(() => import("./Modules/Report.route"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<Spinner aria-label="Cargando pagina" />}>
      <Routes>
        // aqui va el layout en el primer route me falta crearlo
        <Route element={<LayoutApp />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home/*" element={<MainMenuPageRoutes />} />
          <Route path="users-managament/*" element={<UsersPageRoutes />} />
          <Route path="report/*" element={<ReportPageRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
