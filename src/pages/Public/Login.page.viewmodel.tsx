import {
  validateLogin,
  type LoginData,
} from "@/utils/validations/LoginPage.validations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPageViewModel = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginData, string>>
  >({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    const validationErrors = validateLogin(user);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);

    navigate("/tablero/home");
  };

  return {
    setUser,
    user,
    errors, 
    handleLogin,
    isLoading,
  };
};

export default LoginPageViewModel;
