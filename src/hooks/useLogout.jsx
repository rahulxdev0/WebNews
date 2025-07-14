// hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/api/authEndpoints";

const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Clear client-side data
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { handleLogout, isLoggingOut: isLoading };
};

export default useLogout;
