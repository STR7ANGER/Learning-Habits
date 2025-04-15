
import { Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Include Public Routes */}
        {PublicRoutes()}
        
        {/* Include Protected Routes */}
        {ProtectedRoutes()}
      </Routes>
      {isAuthenticated && <Footer />}
    </>
  );
};

export default AppRoutes;