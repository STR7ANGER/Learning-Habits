import { Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <>
      {<Navbar />}
      <Routes>
        {/* Include Public Routes */}
        {PublicRoutes()}

        {/* Include Protected Routes */}
        {ProtectedRoutes()}
      </Routes>
      {<Footer />}
    </>
  );
};

export default AppRoutes;
