import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "@/components/Home";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";

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
    <Route key="home" path="/home" element={<Home />} />,
    <Route key="about" path="/about" element={<AboutUs />} />,
    <Route key="contact" path="/contact" element={<ContactUs />} />,
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
    />,
  ];
};

export default PublicRoutes;
