import UsersManagament from "@/pages/Private/users/UsersManagament";
import { Routes, Route } from "react-router-dom";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersManagament />} />
    </Routes>
  );
};

export default UsersRoutes;
