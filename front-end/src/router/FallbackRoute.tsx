import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FallbackRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return null;
};
