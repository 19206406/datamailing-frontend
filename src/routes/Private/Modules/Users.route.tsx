import UsersManagamentPage from "@/pages/Private/users/UsersManagament.page";
import { Routes, Route } from "react-router-dom";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersManagamentPage />} />
    </Routes>
  );
};

export default UsersRoutes;
