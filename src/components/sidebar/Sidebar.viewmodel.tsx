import { useNavigate } from "react-router-dom";

const SidebarViewModel = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/login");
  };

  const redirectTo = (href: string): void => {
    navigate(href);
  };

  return {
    handleLogout,
    redirectTo, 
  };
};

export default SidebarViewModel;
