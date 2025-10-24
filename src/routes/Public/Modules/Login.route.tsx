import LoginPage from "@/pages/Public/Login.page";
import { Routes, Route } from "react-router-dom";

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default LoginRoutes;
