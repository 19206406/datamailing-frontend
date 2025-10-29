import MainMenuPage from "@/pages/Private/Home/MainMenu.page";
import { Routes, Route } from "react-router-dom";

const MainMenuRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenuPage />} />
    </Routes>
  );
};

export default MainMenuRoutes;
