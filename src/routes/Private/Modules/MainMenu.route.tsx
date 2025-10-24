import MainMenu from "@/pages/Private/Home/MainMenu";
import { Routes, Route } from "react-router-dom";

const MainMenuRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
    </Routes>
  );
};

export default MainMenuRoutes;
