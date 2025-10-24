import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPageRoutes = lazy(() => import("./Modules/Login.route"));

const index = () => {
  return (
    <Suspense
      fallback={
        <Spinner variant="circle-filled" aria-label="Cargando pagina" />
      }
    >
      <Routes>
        <Route path="*" element={<Navigate to="login" replace />} />
        <Route path="/login/*" element={<LoginPageRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default index;
