import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRouter";
import { FallbackRoute } from "./FallbackRoute";

export const RouterComponent = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<FallbackRoute />} />
    </Routes>
  );
};
