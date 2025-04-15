
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return [
    <Route
      key="login"
      path="/login"
      element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
    />,
    <Route
      key="signup"
      path="/signup"
      element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />}
    />,
    <Route
      key="root"
      path="/"
      element={
        isAuthenticated ? (
          <Navigate to="/home" replace />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  ];
};

export default PublicRoutes;