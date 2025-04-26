import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the current location they were trying to go to when redirecting to login
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;