import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  /* let condition = 5 > 3;

  if (false) {
    return <Navigate to="/datamailing" replace />;
  } */

  return <Outlet />;
};

export default PublicRoute;
