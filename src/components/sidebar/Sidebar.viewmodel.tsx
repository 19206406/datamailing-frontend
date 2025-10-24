import { useNavigate } from "react-router-dom";

const SidebarViewModel = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/login");
  };

  return {
    handleLogout,
  };
};

export default SidebarViewModel;
