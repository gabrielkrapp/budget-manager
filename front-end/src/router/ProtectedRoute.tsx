import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("authToken"); 

  if (!isAuthenticated) {
    navigate("/login");
    return <Login />;
  }

  return <>{children}</>;
};
