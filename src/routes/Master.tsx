import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { PrivateRoute, PublicRoute } from "@/middleware";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as ProviderRoute,
  Routes,
  Route,
} from "react-router-dom";

const PublicRoutes = lazy(() => import("../routes/Public"));
const PrivateRoutes = lazy(() => import("../routes/Private"));

const Master = () => {
  return (
    <Suspense fallback={<Spinner aria-label="Cargando" />}>
      <ProviderRoute>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/*" element={<PublicRoutes />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/tablero/*" element={<PrivateRoutes />} />
          </Route>
        </Routes>
      </ProviderRoute>
    </Suspense>
  );
};

export default Master;
