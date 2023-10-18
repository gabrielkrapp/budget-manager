import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface GuestRouteProps {
  children: ReactNode;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};
