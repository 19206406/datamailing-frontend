import LayoutApp from "@/components/layout/Layout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UsersRoutes from "./Modules/Users.route";

const MainMenuPageRoutes = lazy(() => import("./Modules/MainMenu.route"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<Spinner aria-label="Cargando pagina" />}>
      <Routes>
        // aqui va el layout en el primer route me falta crearlo
        <Route element={<LayoutApp />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home/*" element={<MainMenuPageRoutes />} />
          <Route path="users-managament/*" element={<UsersRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
